<?php
class MtKembaliKendaraanController extends GxController {
    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'MtKembaliKendaraan')
        ));
    }
    public function actionDateDiff() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $date_rencana = $_POST['tgl_rencana'];
            $date_kembali = $_POST['tgl_kembali'];
            $res = $this->otherDiffDate($date_rencana, $date_kembali, true);
            echo CJSON::encode(
                    array(
                        'status' => true,
                        'msg' => $res
            ));
            Yii::app()->end();
        }
    }
    public function actionCreate() {
        $model = new MtKembaliKendaraan();
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Peminjaman kendaraan berhasil disimpan.';
            $transaction = app()->db->beginTransaction();
            $id = -1;
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(KEMBALI_KENDARAAN);
                $user = app()->user->getId();
                foreach ($_POST as $k => $v) {
                    if ($k == 'ongkos_sewa' || $k == 'ongkos_driver' || $k == 'ongkos_bbm'
                            || $k == 'total_ongkos' || $k == 'dp' || $k == 'ongkos_extend'
                            || $k == 'disc' || $k == 'total' || $k == 'pelunasan') {
                        $v = get_number($v);
                    }
                    $_POST['MtKembaliKendaraan'][$k] = $v;
                }
                $_POST['MtKembaliKendaraan']['entry_time'] = Now();
                $_POST['MtKembaliKendaraan']['users_id'] = $user;
                $_POST['MtKembaliKendaraan']['doc_ref_kembali'] = $docref;
                $model->attributes = $_POST['MtKembaliKendaraan'];
                $msg = "Data gagal disimpan";
                if ($model->save()) {
                    $status = true;
                    $msg = "Data berhasil di simpan dengan id " . $model->id_kembali;
                } else {
                    $status = false;
                }
                $id = $docref;
                $date = $model->trans_date;
                $ref->save(KEMBALI_KENDARAAN, $model->id_kembali, $docref);
                if ($model->pelunasan > 0) {
                    $bank_account = '0';
                    if ($model->trans_via == "Tunai")
                            $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_ditangan'));
                    else
                            $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_dibank'));
                    
                    Mt::add_gl(KEMBALI_KENDARAAN, $model->id_kembali, $date,
                            $docref, $bank_account, '-', $model->pelunasan,
                            $user, $model->idPinjam->id_mobil);
                    Mt::add_gl(KEMBALI_KENDARAAN, $model->id_kembali, $date, $docref,
                            Mt::get_prefs('akun_uang_muka'),"-", $model->dp,
                            $user, $model->idPinjam->id_mobil);
                    Mt::add_gl(KEMBALI_KENDARAAN, $model->id_kembali, $date,
                            $docref, Mt::get_prefs('akun_pendapatan_sewa'), '-',
                            -$model->total, $user,
                            $model->idPinjam->id_mobil);
                    Mt::add_gl(KEMBALI_KENDARAAN, $model->id_kembali, $date,
                            $docref, Mt::get_prefs('akun_diskon'), "-",
                            $model->disc, $user, $model->idPinjam->id_mobil);
                }
                $pinjam = $this->loadModel($model->id_pinjam,
                        'MtPinjamKendaraan');
                $pinjam->is_back = 1;
                $pinjam->save();
                $transaction->commit();
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
            echo CJSON::encode(
                    array(
                        'success' => $status,
                        'msg' => $msg,
                        'id' => $id
            ));
            Yii::app()->end();
        }
    }
    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'MtKembaliKendaraan');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtKembaliKendaraan'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['MtKembaliKendaraan'];
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_kembali;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(
                        array(
                            'success' => $status,
                            'msg' => $msg
                ));
                Yii::app()->end();
            } else {
                $this->redirect(array(
                    'view',
                    'id' => $model->id_kembali
                ));
            }
        }
        $this->render('update', array(
            'model' => $model
        ));
    }
    public function actionDelete() {
        if (Yii::app()->request->isPostRequest) {
            if (isset($_POST) && !empty($_POST)) {
                $msg = 'Data berhasil divoid.';
                $status = true;
                $id = $_POST['id'];
                $memo_ = $_POST['memo_'];
                $transaction = app()->db->beginTransaction();
                try {
                    $user = app()->user->getId();
                    $model = $this->loadModel($id, 'MtKembaliKendaraan');
                    $date = $model->trans_date;
                    $docref = $model->doc_ref_kembali;
                    $msg = "Pengembalian kendaraan dengan referensi $docref berhasil divoid.";
                    $void = new MtVoided();
                    $void->type = KEMBALI_KENDARAAN;
                    $void->id = $id;
                    $void->date_ = $date;
                    $void->memo_ = $memo_;
                    $void->save();
                    if ($model->pelunasan > 0) {
                        $bank_account = Mt::get_act_code_from_bank_act(
                                        Mt::get_prefs('akun_kas_ditangan'));
                        // void gl
                        // debit penjualan , kredit kas
                        Mt::add_gl(VOID, $void->id_voided, $date, $docref,
                                Mt::get_prefs('akun_pendapatan_sewa'),
                                "VOID Pengembalian Kendaraan $docref",
                                $model->pelunasan, $user,
                                $model->idPinjam->id_mobil);
                        Mt::add_gl(VOID, $void->id_voided, $date, $docref,
                                $bank_account,
                                "VOID Pengembalian Kendaraan $docref",
                                -$model->pelunasan, $user,
                                $model->idPinjam->id_mobil);
                    }
                    $pinjam = $this->loadModel($model->id_pinjam,
                            'MtPinjamKendaraan');
                    $pinjam->is_back = 0;
                    $pinjam->save();
                    $status = true;
                    $transaction->commit();
                } catch (Exception $e) {
                    $transaction->rollback();
                    $status = false;
                    $msg = $ex;
                }
                echo CJSON::encode(
                        array(
                            'success' => $status,
                            'msg' => $msg
                ));
                Yii::app()->end();
            }
        }
        else
                throw new CHttpException(400,
            Yii::t('app',
                    'Invalid request. Please do not repeat this request again.'));
    }
    /*
     * public function actionAdmin() { $dataProvider = new CActiveDataProvider('MtKembaliKendaraan'); $this->render('index', array( 'dataProvider' => $dataProvider, )); }
     */
    public function actionAdmin() {
        $model = new MtKembaliKendaraan('search');
        $model->unsetAttributes();
        if (isset($_GET['MtKembaliKendaraan']))
                $model->attributes = $_GET['MtKembaliKendaraan'];
        $this->render('admin', array(
            'model' => $model
        ));
    }
    public function actionIndex() {
        if (isset($_POST['limit'])) {
            $limit = $_POST['limit'];
        } else {
            $limit = 20;
        }
        if (isset($_POST['start'])) {
            $start = $_POST['start'];
        } else {
            $start = 0;
        }
        // $model = new MtKembaliKendaraan('search');
        // $model->unsetAttributes();
        $void = Mt::get_voided(KEMBALI_KENDARAAN);
        $criteria = new CDbCriteria();
        $criteria->addNotInCondition('id_kembali', $void);
        $model = MtKembaliKendaraan::model()->findAll($criteria);
        $total = MtKembaliKendaraan::model()->count($criteria);
        if (isset($_GET['MtKembaliKendaraan']))
                $model->attributes = $_GET['MtKembaliKendaraan'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtKembaliKendaraan('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model
            ));
        }
    }
    private function otherDiffDate($begin, $end = '2020-06-09 10:30:00',
            $out_in_array = false) {
        $intervalo = date_diff(date_create($begin), date_create($end));
        $out = $intervalo->format("Years:%Y,Months:%M,Days:%d,Hours:%H,Minutes:%i,Seconds:%s");
        if (!$out_in_array) return $out;
        $a_out = array();
        array_walk(explode(',', $out),
                function ($val, $key) use(&$a_out) {
                    $v = explode(':', $val);
                    $a_out[$v[0]] = $v[1];
                });
        return $a_out;
    }
}