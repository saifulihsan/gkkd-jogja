<?php

/**
 * GiixCrudCode class file.
 *
 * @author Rodrigo Coelho <giix@rodrigocoelho.com.br>
 * @link http://rodrigocoelho.com.br/giix/
 * @copyright Copyright &copy; 2010 Rodrigo Coelho
 * @license http://rodrigocoelho.com.br/giix/license/ New BSD License
 */
Yii::import('system.gii.generators.crud.CrudCode');
Yii::import('ext.giix-core.helpers.*');
//@todo benerin controller template
//@todo 
/**
 * GiixCrudCode is the model for giix crud generator.
 *
 * @author Rodrigo Coelho <giix@rodrigocoelho.com.br>
 * @since 1.0
 */
class GiixCrudjsCode extends CrudCode
{
    /**
     * @var string The type of authentication.
     */
    public $authtype = 'auth_none';
    /**
     * @var int Specifies if ajax validation is enabled. 0 represents false, 1 represents true.
     */
    public $enable_ajax_validation = 0;
    /**
     * @var string The controller base class name.
     */
    public $baseControllerClass = 'GxController';
    public $generateLayouts = true;
    public $layoutPrefix = '_';
    public $path = 'js/view/';

    public function getLayoutPath()
    {
        return rtrim($this->path . $this->getControllerID() . $this->layoutPrefix);
    }

    public function getRelativeLayoutPath()
    {
        return rtrim('layouts/' . str_replace('.', '/', $this->layoutPrefix), '/');
    }

    public function prepare()
    {
        $this->files = array();
        $templatePath = $this->templatePath;
        $controllerTemplateFile = $templatePath . DIRECTORY_SEPARATOR . 'controller.php';
        $this->files[] = new CCodeFile(
            $this->controllerFile,
            $this->render($controllerTemplateFile)
        );
        $files = scandir($templatePath);
        foreach ($files as $file) {
            if (is_file($templatePath . '/' . $file) && CFileHelper::getExtension($file) === 'php' && $file !== 'controller.php') {
                $this->files[] = new CCodeFile(
                    $this->viewPath . DIRECTORY_SEPARATOR . $file,
                    $this->render($templatePath . '/' . $file)
                );
            }
        }
        if ($this->generateLayouts) {
            $templatePath = $this->templatePath . DIRECTORY_SEPARATOR . 'layouts';
            $templatePathz = $this->layoutPath;
            $files = scandir($templatePath);
            foreach ($files as $file) {
                if (is_file($templatePath . '/' . $file) && CFileHelper::getExtension($file) === 'js') {
                    $this->files[] = new CCodeFile(
                        $this->layoutPath . $file,
                        $this->render($templatePath . '/' . $file)
                    );
                }
            }
        }
    }

    /**
     * Adds the new model attributes (class properties) to the rules.
     * Overrides CrudCode::rules.
     */
    public function rules()
    {
        return array_merge(parent::rules(), array(
            array('authtype, enable_ajax_validation, path', 'required'),
        ));
    }

    /**
     * Sets the labels for the new model attributes (class properties).
     * Overrides CrudCode::attributeLabels.
     */
    public function attributeLabels()
    {
        return array_merge(parent::attributeLabels(), array(
            'authtype' => 'Authentication type',
            'enable_ajax_validateion' => 'Enable ajax Validation',
            'path' => 'Result Crud js path'
        ));
    }

    /**
     * Generates and returns the view source code line
     * to create the appropriate active input field based on
     * the model attribute field type on the database.
     * Contains code from {@link CrudCode::generateActiveField}.
     * Changes: all styling is removed.
     * Overrides CrudCode::generateActiveField.
     * @param string $modelClass The model class name.
     * @param CDbColumnSchema $column The column.
     * @return string The source code line for the active field.
     */
    public function generateActiveField($modelClass, $column)
    {
        if ($column->isForeignKey) {
            $relation = $this->findRelation($modelClass, $column);
            $relatedModelClass = $relation[3];
            return "echo \$form->dropDownList(\$model, '{$column->name}', GxHtml::listDataEx({$relatedModelClass}::model()->findAllAttributes(null, true)))";
        }
        if (strtoupper($column->dbType) == 'TINYINT(1)'
            || strtoupper($column->dbType) == 'BIT'
            || strtoupper($column->dbType) == 'BOOL'
            || strtoupper($column->dbType) == 'BOOLEAN'
        ) {
            return "echo \$form->checkBox(\$model, '{$column->name}')";
        } else if (strtoupper($column->dbType) == 'DATE') {
            return "\$form->widget('zii.widgets.jui.CJuiDatePicker', array(
			'model' => \$model,
			'attribute' => '{$column->name}',
			'value' => \$model->{$column->name},
			'options' => array(
				'showButtonPanel' => true,
				'changeYear' => true,
				'dateFormat' => 'yy-mm-dd',
				),
			));\n";
        } else if (stripos($column->dbType, 'text') !== false) { // Start of CrudCode::generateActiveField code.
            return "echo \$form->textArea(\$model, '{$column->name}')";
        } else {
            $passwordI18n = Yii::t('app', 'password');
            $passwordI18n = (isset($passwordI18n) && $passwordI18n !== '') ? '|' . $passwordI18n : '';
            $pattern = '/^(password|pass|passwd|passcode' . $passwordI18n . ')$/i';
            if (preg_match($pattern, $column->name))
                $inputField = 'passwordField';
            else
                $inputField = 'textField';
            if ($column->type !== 'string' || $column->size === null)
                return "echo \$form->{$inputField}(\$model, '{$column->name}')";
            else
                return "echo \$form->{$inputField}(\$model, '{$column->name}', array('maxlength' => {$column->size}))";
        } // End of CrudCode::generateActiveField code.
    }

    /**
     * Generates and returns the view source code line
     * to create the appropriate active input field based on
     * the model attribute field type on the database.
     * Contains code from {@link CrudCode::generateActiveField}.
     * Changes: all styling is removed.
     * Overrides CrudCode::generateActiveField.
     * @param string $modelClass The model class name.
     * @param CDbColumnSchema $column The column.
     * @return string The source code line for the active field.
     */
    public function generateExtField($modelClass, $column)
    {
        if ($column->isForeignKey) {
            $relation = $this->findRelation($modelClass, $column);
            $relatedModelClass = $relation[3];
            $zink = new $relatedModelClass;
            //$displayField = $relatedModelClass::model()->representingColumn;
            //print_r($zink);
            $valueField = $zink->tableSchema->primaryKey;
            $displayField = $zink->representingColumn();
            //$displayField = $zink->sequenceName;
            $output = "{
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:true,
                            mode: 'local',                            
                            fieldLabel: '{$column->name}',
                            store: jun.rzt{$relatedModelClass},
                            hiddenName:'{$column->name}',
                            hiddenValue:'{$column->name}',
                            valueField: '{$valueField}',
                            //displayField: '{$relatedModelClass}::model()->representingColumn()',
                            displayField: '{$displayField}',
                            //allowBlank:false,
                            anchor: '100%'
                        },";
            //return "echo \$form->dropDownList(\$model, '{$column->name}', GxHtml::listDataEx({$relatedModelClass}::model()->findAllAttributes(null, true)))";
            /*
            $output = "{
                xtype: 'textfield',
                fieldLabel: '{$column->name}',
                hideLabel:false,
                //hidden:true,
                name:'{$column->name}',
                id:'{$column->name}id',
                ref:'../{$column->name}',
                allowBlank: {$column->allowNull},
                anchor: '100%'
            },";*/
            return "$output";
        }
        if (strtoupper($column->dbType) == 'TINYINT(1)'
            || strtoupper($column->dbType) == 'CHAR'
            || strtoupper($column->dbType) == 'BIT'
            || strtoupper($column->dbType) == 'BOOL'
            || strtoupper($column->dbType) == 'BOOLEAN'
        ) {
            //return "echo \$form->checkBox(\$model, '{$column->name}')";
            $output = "{
                            xtype: 'textfield',
                            fieldLabel: '{$column->name}',
                            hideLabel:false,
                            //hidden:true,
                            name:'{$column->name}',
                            id:'{$column->name}id',
                            ref:'../{$column->name}',
                            //allowBlank: {$column->allowNull},
                            anchor: '100%'
                        },";
            return "$output";
        } else if (strtoupper($column->dbType) == 'DATE'
            || strtoupper($column->dbType) == 'DATETIME'
        ) {
            /*
    return "\$form->widget('zii.widgets.jui.CJuiDatePicker', array(
    'model' => \$model,
    'attribute' => '{$column->name}',
    'value' => \$model->{$column->name},
    'options' => array(
        'showButtonPanel' => true,
        'changeYear' => true,
        'dateFormat' => 'yy-mm-dd',
        ),
    ));\n";*/
            /*
            $output = "{
                xtype: 'textfield',
                fieldLabel: '{$column->name}',
                hideLabel:false,
                //hidden:true,
                name:'{$column->name}',
                id:'{$column->name}id',
                ref:'../{$column->name}',
                anchor: '100%'
            },";	*/
            $output = "{
                            xtype: 'xdatefield',
                            ref:'../{$column->name}',
                            fieldLabel: '{$column->name}',
                            name:'{$column->name}',
                            id:'{$column->name}id',
                            format: 'd M Y',
                            //allowBlank: {$column->allowNull},
                            anchor: '100%'                            
                        },";
            return "$output";
        } else if (stripos($column->dbType, 'text') !== false) { // Start of CrudCode::generateActiveField code.
            //return "echo \$form->textArea(\$model, '{$column->name}')";
            $output = "{
                            xtype: 'textfield',
                            fieldLabel: '{$column->name}',
                            hideLabel:false,
                            //hidden:true,
                            name:'{$column->name}',
                            id:'{$column->name}id',
                            ref:'../{$column->name}',
                            anchor: '100%'
                            //allowBlank: {$column->allowNull}
                        },";
            return "$output";
        } else {
            //$passwordI18n = Yii::t('app', 'password');
            //$passwordI18n = (isset($passwordI18n) && $passwordI18n !== '') ? '|' . $passwordI18n : '';
            //$pattern = '/^(password|pass|passwd|passcode' . $passwordI18n . ')$/i';
            //if (preg_match($pattern, $column->name))
            //	$inputField = 'passwordField';
            //else
            //	$inputField='textField';
            //if ($column->type !== 'string' || $column->size === null) {
            //	//return "echo \$form->{$inputField}(\$model, '{$column->name}')";
            //        $output = "{
            //            xtype: 'textfield',
            //            fieldLabel: '{$column->name}',
            //            hideLabel:false,
            //            hidden:true,
            //            name:'{$column->name}',
            //            id:'{$column->name}id',
            //            ref:'../{$column->name}',
            //            anchor: '100%'
            //        },";
            //          return "$output";}
            //else
            //return "echo \$form->{$inputField}(\$model, '{$column->name}', array('maxlength' => {$column->size}))";
            //{
            $output = "{
                                    xtype: 'textfield',
                                    fieldLabel: '{$column->name}',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'{$column->name}',
                                    id:'{$column->name}id',
                                    ref:'../{$column->name}',
                                    maxLength: {$column->size},
                                    //allowBlank: {$column->allowNull},
                                    anchor: '100%'
                                },";
            return "$output";
            //}
        } // End of CrudCode::generateExtField code.
    }

    /**
     * Generates and returns the view source code line
     * to create the appropriate active input field based on
     * the model relation.
     * @param string $modelClass The model class name.
     * @param array $relation The relation details in the same format
     * used by {@link getRelations()}.
     * @return string The source code line for the relation field.
     */
    public function generateActiveRelationField($modelClass, $relation)
    {
        $relationName = $relation[0];
        $relationType = $relation[1];
        $relationField = $relation[2]; // The FK.
        $relationModel = $relation[3];
        // The relation type must be HAS_ONE, HAS_MANY or MANY_MANY.
        // Other types (BELONGS_TO) should be generated by generateActiveField.
        if ($relationType != GxActiveRecord::HAS_ONE && $relationType != GxActiveRecord::HAS_MANY && $relationType != GxActiveRecord::MANY_MANY)
            throw new InvalidArgumentException('The argument $relationName must have a relation type of HAS_ONE, HAS_MANY or MANY_MANY.');
        // Generate the field according to the relation type.
        switch ($relationType) {
            case GxActiveRecord::HAS_ONE:
                return "echo \$form->dropDownList(\$model, '{$relationName}', GxHtml::listDataEx({$relationModel}::model()->findAllAttributes(null, true)))";
                break;
            case GxActiveRecord::HAS_MANY:
            case GxActiveRecord::MANY_MANY:
                return "echo \$form->checkBoxList(\$model, '{$relationName}', GxHtml::encodeEx(GxHtml::listDataEx({$relationModel}::model()->findAllAttributes(null, true)), false, true))";
                break;
        }
    }

    public function generateInputField($modelClass, $column)
    {
        return 'echo ' . parent::generateInputField($modelClass, $column);
    }

    /**
     * Generates and returns the view source code line
     * to create the appropriate attribute configuration for a CDetailView.
     * @param string $modelClass The model class name.
     * @param CDbColumnSchema $column The column.
     * @return string The source code line for the attribute.
     */
    public function generateDetailViewAttribute($modelClass, $column)
    {
        if (!$column->isForeignKey)
            return "'{$column->name}'";
        else {
            // Find the relation name for this column.
            $relation = $this->findRelation($modelClass, $column);
            $relationName = $relation[0];
            $relatedModelClass = $relation[3];
            $relatedControllerName = strtolower($relatedModelClass[0]) . substr($relatedModelClass, 1);
            return "array(
			'label' => '{$relatedModelClass}',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx(\$model->{$relationName})), array('{$relatedControllerName}/view', 'id' => GxActiveRecord::extractPkValue(\$model->{$relationName}, true))),
			)";
        }
    }

    /**
     * Generates and returns the view source code line
     * to create the CGridView column definition.
     * @param string $modelClass The model class name.
     * @param CDbColumnSchema $column The column.
     * @return string The source code line for the column definition.
     */
    public function generateGridViewColumn($modelClass, $column)
    {
        if (!$column->isForeignKey) {
            // Boolean or bit.
            if (strtoupper($column->dbType) == 'TINYINT(1)'
                || strtoupper($column->dbType) == 'BIT'
                || strtoupper($column->dbType) == 'BOOL'
                || strtoupper($column->dbType) == 'BOOLEAN'
            ) {
                return "array(
					'name' => '{$column->name}',
					'value' => '(\$data->{$column->name} === 0) ? Yii::t(\\'app\\', \\'No\\') : Yii::t(\\'app\\', \\'Yes\\')',
					'filter' => array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')),
					)";
            } else // Common column.
                return "'{$column->name}'";
        } else { // FK.
            // Find the related model for this column.
            $relation = $this->findRelation($modelClass, $column);
            $relationName = $relation[0];
            $relatedModelClass = $relation[3];
            return "array(
				'name'=>'{$column->name}',
				'value'=>'GxHtml::valueEx(\$data->{$relationName})',
				'filter'=>GxHtml::listDataEx({$relatedModelClass}::model()->findAllAttributes(null, true)),
				)";
        }
    }

    /**
     * Generates and returns the view source code line
     * to create the advanced search.
     * @param string $modelClass The model class name.
     * @param CDbColumnSchema $column The column.
     * @return string The source code line for the column definition.
     */
    public function generateSearchField($modelClass, $column)
    {
        if (!$column->isForeignKey) {
            // Boolean or bit.
            if (strtoupper($column->dbType) == 'TINYINT(1)'
                || strtoupper($column->dbType) == 'BIT'
                || strtoupper($column->dbType) == 'BOOL'
                || strtoupper($column->dbType) == 'BOOLEAN'
            )
                return "echo \$form->dropDownList(\$model, '{$column->name}', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All')))";
            else // Common column. generateActiveField method will add 'echo' when necessary.
                return $this->generateActiveField($this->modelClass, $column);
        } else { // FK.
            // Find the related model for this column.
            $relation = $this->findRelation($modelClass, $column);
            $relatedModelClass = $relation[3];
            return "echo \$form->dropDownList(\$model, '{$column->name}', GxHtml::listDataEx({$relatedModelClass}::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All')))";
        }
    }

    /**
     * Generates and returns the array (as a PHP source code string)
     * to collect the MANY_MANY related data from the POST.
     * @param string $modelClass The model class name.
     * @return string The source code to collect the MANY_MANY related
     * data from the POST.
     */
    public function generateGetPostRelatedData($modelClass, $indent = 1)
    {
        $result = array();
        $relations = $this->getRelations($modelClass);
        foreach ($relations as $relationData) {
            $relationName = $relationData[0];
            $relationType = $relationData[1];
            if ($relationType == GxActiveRecord::MANY_MANY)
                $result[$relationData[0]] = "php:\$_POST['{$modelClass}']['{$relationName}'] === '' ? null : \$_POST['{$modelClass}']['{$relationName}']";
        }
        return GxCoreHelper::ArrayToPhpSource($result, $indent);
    }

    /**
     * Checks whether this AR has a MANY_MANY relation.
     * @param string $modelClass The model class name.
     * @return boolean Whether this AR has a MANY_MANY relation.
     */
    public function hasManyManyRelation($modelClass)
    {
        $relations = $this->getRelations($modelClass);
        foreach ($relations as $relationData) {
            if ($relationData[1] == GxActiveRecord::MANY_MANY) {
                return true;
            }
        }
        return false;
    }

    /**
     * Finds the relation of the specified column.
     * @param string $modelClass The model class name.
     * @param CDbColumnSchema $column The column.
     * @return array The relation. The array will have 3 values:
     * 0: the relation name,
     * 1: the relation type (will always be GxActiveRecord::BELONGS_TO),
     * 2: the foreign key (will always be the specified column),
     * 3: the related active record class name.
     * Or null if no matching relation was found.
     */
    public function findRelation($modelClass, $column)
    {
        if (!$column->isForeignKey)
            return null;
        $relations = GxActiveRecord::model($modelClass)->relations();
        // Find the relation for this attribute.
        foreach ($relations as $relationName => $relation) {
            // For attributes on this model, relation must be BELONGS_TO.
            if ($relation[0] == GxActiveRecord::BELONGS_TO && $relation[2] == $column->name) {
                return array(
                    $relationName, // the relation name
                    $relation[0], // the relation type
                    $relation[2], // the foreign key
                    $relation[1] // the related active record class name
                );
            }
        }
        // None found.
        return null;
    }

    /**
     * Returns all the relations of the specified model.
     * @param string $modelClass The model class name.
     * @return array The relations. Each array item is
     * a relation as an array, having 3 items:
     * 0: the relation name,
     * 1: the relation type,
     * 2: the foreign key,
     * 3: the related active record class name.
     * Or an empty array if no relations were found.
     */
    public function getRelations($modelClass)
    {
        $relations = GxActiveRecord::model($modelClass)->relations();
        $result = array();
        foreach ($relations as $relationName => $relation) {
            $result[] = array(
                $relationName, // the relation name
                $relation[0], // the relation type
                $relation[2], // the foreign key
                $relation[1] // the related active record class name
            );
        }
        return $result;
    }
}