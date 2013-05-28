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
 * @property string $jam_kembali
 * @property integer $extend_bln
 * @property integer $extend_hari
 * @property integer $extend_jam
 * @property double $overtime_jam
 * @property string $pelunasan
 * @property string $ongkos_sewa
 * @property string $ongkos_driver
 * @property string $ongkos_bbm
 * @property string $total_ongkos
 * @property string $dp
 * @property string $sisa_tagihan
 * @property string $disc
 * @property string $total
 *
 * @property MtPinjamKendaraan $idPinjam
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
			array('id_pinjam, extend_bln, extend_hari, extend_jam', 'numerical', 'integerOnly'=>true),
			array('overtime_jam', 'numerical'),
			array('pelunasan, ongkos_sewa, ongkos_driver, ongkos_bbm, total_ongkos, dp, sisa_tagihan, disc, total', 'length', 'max'=>30),
			array('trans_date, tgl_kembali, jam_kembali', 'safe'),
			array('trans_date, tgl_kembali, jam_kembali, extend_bln, extend_hari, extend_jam, overtime_jam, pelunasan, ongkos_sewa, ongkos_driver, ongkos_bbm, total_ongkos, dp, sisa_tagihan, disc, total', 'default', 'setOnEmpty' => true, 'value' => null),
			array('id_kembali, id_pinjam, trans_date, tgl_kembali, jam_kembali, extend_bln, extend_hari, extend_jam, overtime_jam, pelunasan, ongkos_sewa, ongkos_driver, ongkos_bbm, total_ongkos, dp, sisa_tagihan, disc, total', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'idPinjam' => array(self::BELONGS_TO, 'MtPinjamKendaraan', 'id_pinjam'),
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
			'jam_kembali' => Yii::t('app', 'Jam Kembali'),
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
			'sisa_tagihan' => Yii::t('app', 'Sisa Tagihan'),
			'disc' => Yii::t('app', 'Disc'),
			'total' => Yii::t('app', 'Total'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('id_kembali', $this->id_kembali);
		$criteria->compare('id_pinjam', $this->id_pinjam);
		$criteria->compare('trans_date', $this->trans_date, true);
		$criteria->compare('tgl_kembali', $this->tgl_kembali, true);
		$criteria->compare('jam_kembali', $this->jam_kembali, true);
		$criteria->compare('extend_bln', $this->extend_bln);
		$criteria->compare('extend_hari', $this->extend_hari);
		$criteria->compare('extend_jam', $this->extend_jam);
		$criteria->compare('overtime_jam', $this->overtime_jam);
		$criteria->compare('pelunasan', $this->pelunasan, true);
		$criteria->compare('ongkos_sewa', $this->ongkos_sewa, true);
		$criteria->compare('ongkos_driver', $this->ongkos_driver, true);
		$criteria->compare('ongkos_bbm', $this->ongkos_bbm, true);
		$criteria->compare('total_ongkos', $this->total_ongkos, true);
		$criteria->compare('dp', $this->dp, true);
		$criteria->compare('sisa_tagihan', $this->sisa_tagihan, true);
		$criteria->compare('disc', $this->disc, true);
		$criteria->compare('total', $this->total, true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}