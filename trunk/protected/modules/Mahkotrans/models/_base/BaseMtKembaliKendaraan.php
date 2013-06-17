<?php

/**
 * This is the model base class for the table "mt_kembali_kendaraan".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtKembaliKendaraan".
 *
 * Columns in table "mt_kembali_kendaraan" available as properties of the model,
 * followed by relations of table "mt_kembali_kendaraan" available as properties of the model.
 *
 * @property integer $id_kembali
 * @property integer $id_pinjam
 * @property string $trans_date
 * @property string $tgl_kembali
 * @property integer $extend_bln
 * @property integer $extend_hari
 * @property integer $extend_jam
 * @property double $overtime_jam
 * @property double $pelunasan
 * @property double $ongkos_sewa
 * @property double $ongkos_driver
 * @property double $ongkos_bbm
 * @property double $total_ongkos
 * @property double $dp
 * @property double $disc
 * @property double $total
 * @property integer $users_id
 * @property string $trans_via
 * @property string $no_bukti_bayar
 * @property string $notes
 * @property integer $is_void
 * @property double $ongkos_extend
 * @property string $entry_time
 *
 * @property MtPinjamKendaraan $idPinjam
 * @property Users $users
 */
abstract class BaseMtKembaliKendaraan extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'mt_kembali_kendaraan';
	}

	public static function representingColumn() {
		return 'trans_date';
	}

	public function rules() {
		return array(
			array('id_pinjam', 'required'),
			array('id_pinjam, extend_bln, extend_hari, extend_jam, users_id, is_void', 'numerical', 'integerOnly'=>true),
			array('overtime_jam, pelunasan, ongkos_sewa, ongkos_driver, ongkos_bbm, total_ongkos, dp, disc, total, ongkos_extend', 'numerical'),
			array('trans_via', 'length', 'max'=>30),
			array('no_bukti_bayar', 'length', 'max'=>50),
			array('notes', 'length', 'max'=>600),
			array('trans_date, tgl_kembali, entry_time', 'safe'),
			array('trans_date, tgl_kembali, extend_bln, extend_hari, extend_jam, overtime_jam, pelunasan, ongkos_sewa, ongkos_driver, ongkos_bbm, total_ongkos, dp, disc, total, users_id, trans_via, no_bukti_bayar, notes, is_void, ongkos_extend, entry_time', 'default', 'setOnEmpty' => true, 'value' => null),
			array('id_kembali, id_pinjam, trans_date, tgl_kembali, extend_bln, extend_hari, extend_jam, overtime_jam, pelunasan, ongkos_sewa, ongkos_driver, ongkos_bbm, total_ongkos, dp, disc, total, users_id, trans_via, no_bukti_bayar, notes, is_void, ongkos_extend, entry_time', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'idPinjam' => array(self::BELONGS_TO, 'MtPinjamKendaraan', 'id_pinjam'),
			'users' => array(self::BELONGS_TO, 'Users', 'users_id'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'id_kembali' => Yii::t('app', 'Id Kembali'),
			'id_pinjam' => Yii::t('app', 'Id Pinjam'),
			'trans_date' => Yii::t('app', 'Trans Date'),
			'tgl_kembali' => Yii::t('app', 'Tgl Kembali'),
			'extend_bln' => Yii::t('app', 'Extend Bln'),
			'extend_hari' => Yii::t('app', 'Extend Hari'),
			'extend_jam' => Yii::t('app', 'Extend Jam'),
			'overtime_jam' => Yii::t('app', 'Overtime Jam'),
			'pelunasan' => Yii::t('app', 'Pelunasan'),
			'ongkos_sewa' => Yii::t('app', 'Ongkos Sewa'),
			'ongkos_driver' => Yii::t('app', 'Ongkos Driver'),
			'ongkos_bbm' => Yii::t('app', 'Ongkos Bbm'),
			'total_ongkos' => Yii::t('app', 'Total Ongkos'),
			'dp' => Yii::t('app', 'Dp'),
			'disc' => Yii::t('app', 'Disc'),
			'total' => Yii::t('app', 'Total'),
			'users_id' => Yii::t('app', 'Users'),
			'trans_via' => Yii::t('app', 'Trans Via'),
			'no_bukti_bayar' => Yii::t('app', 'No Bukti Bayar'),
			'notes' => Yii::t('app', 'Notes'),
			'is_void' => Yii::t('app', 'Is Void'),
			'ongkos_extend' => Yii::t('app', 'Ongkos Extend'),
			'entry_time' => Yii::t('app', 'Entry Time'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('id_kembali', $this->id_kembali);
		$criteria->compare('id_pinjam', $this->id_pinjam);
		$criteria->compare('trans_date', $this->trans_date, true);
		$criteria->compare('tgl_kembali', $this->tgl_kembali, true);
		$criteria->compare('extend_bln', $this->extend_bln);
		$criteria->compare('extend_hari', $this->extend_hari);
		$criteria->compare('extend_jam', $this->extend_jam);
		$criteria->compare('overtime_jam', $this->overtime_jam);
		$criteria->compare('pelunasan', $this->pelunasan);
		$criteria->compare('ongkos_sewa', $this->ongkos_sewa);
		$criteria->compare('ongkos_driver', $this->ongkos_driver);
		$criteria->compare('ongkos_bbm', $this->ongkos_bbm);
		$criteria->compare('total_ongkos', $this->total_ongkos);
		$criteria->compare('dp', $this->dp);
		$criteria->compare('disc', $this->disc);
		$criteria->compare('total', $this->total);
		$criteria->compare('users_id', $this->users_id);
		$criteria->compare('trans_via', $this->trans_via, true);
		$criteria->compare('no_bukti_bayar', $this->no_bukti_bayar, true);
		$criteria->compare('notes', $this->notes, true);
		$criteria->compare('is_void', $this->is_void);
		$criteria->compare('ongkos_extend', $this->ongkos_extend);
		$criteria->compare('entry_time', $this->entry_time, true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}