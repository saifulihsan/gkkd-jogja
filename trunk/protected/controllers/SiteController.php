<?php

class SiteController extends Controller
{
//    public function accessRules() {
//        return array(
//            array('allow',
//                'users' => array('*'),
//                'actions' => array('login'),
//            )           
//        );
//    }
    /**
     * Declares class-based actions.
     */
    public function actions()
    {
        return array(
            // captcha action renders the CAPTCHA image displayed on the contact page
            'captcha' => array(
                'class' => 'CCaptchaAction',
                'backColor' => 0xFFFFFF,
                ),
            // page action renders "static" pages stored under 'protected/views/site/pages'
            // They can be accessed via: index.php?r=site/page&view=FileName
            'page' => array('class' => 'CViewAction', ),
            );
    }

    /**
     * This is the default 'index' action that is invoked
     * when an action is not explicitly requested by users.
     */
    public function actionIndex()
    {
        // renders the view file 'protected/views/site/index.php'
        // using the default layout 'protected/views/layouts/main.php'
        $this->layout = 'main';
        $this->render('index');
    }

    /**
     * This is the action to handle external exceptions.
     */
    public function actionError()
    {
        if ($error = Yii::app()->errorHandler->error)
        {
            if (Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', $error);
        }
    }

    /**
     * Displays the contact page
     */
    public function actionContact()
    {
        $model = new ContactForm;
        if (isset($_POST['ContactForm']))
        {
            $model->attributes = $_POST['ContactForm'];
            if ($model->validate())
            {
                $name = '=?UTF-8?B?' . base64_encode($model->name) . '?=';
                $subject = '=?UTF-8?B?' . base64_encode($model->subject) . '?=';
                $headers = "From: $name <{$model->email}>\r\n" . "Reply-To: {$model->email}\r\n" .
                    "MIME-Version: 1.0\r\n" . "Content-type: text/plain; charset=UTF-8";

                mail(Yii::app()->params['adminEmail'], $subject, $model->body, $headers);
                Yii::app()->user->setFlash('contact',
                    'Thank you for contacting us. We will respond to you as soon as possible.');
                $this->refresh();
            }
        }
        $this->render('contact', array('model' => $model));
    }

    /**
     * Displays the login page
     */
  //  public function actionLogin()
//    {
//        $model = new LoginForm;
//
//        // if it is ajax validation request
//        if (isset($_POST['ajax']) && $_POST['ajax'] === 'login-form')
//        {
//            echo CActiveForm::validate($model);
//            Yii::app()->end();
//        }
//
//        // collect user input data
//        if (isset($_POST['LoginForm']))
//        {
//            $model->attributes = $_POST['LoginForm'];
//            // validate user input and redirect to the previous page if valid
//            if ($model->validate() && $model->login())
//                $this->redirect(Yii::app()->user->returnUrl);
//        }
//        // display the login form
//        $this->render('login', array('model' => $model));
//    }

    /**
     * Logs out the current user and redirect to homepage.
     */
    public function actionLogout()
    {
        Yii::app()->user->logout();
        $this->redirect(Yii::app()->homeUrl);
    }

    public function actionLogin()
    {
        if (!Yii::app()->request->isAjaxRequest){
            $this->layout = 'login';
            $this->render('login');
        }else{
            $model = new LoginForm;
            $loginUsername = isset($_POST["loginUsername"]) ? $_POST["loginUsername"]
                        : "";
            $loginPassword = isset($_POST["loginPassword"]) ? $_POST["loginPassword"]
                        : "";
            if ($loginUsername != "") {
                //$model->attributes = $_POST['LoginForm'];
                $model->username = $loginUsername;
                $model->password = $loginPassword;
                // validate user input and redirect to the previous page if valid
                if ($model->validate() && $model->login())
                        echo "{success: true}";
                else
                        echo "{success: false, errors: { reason: 'Login failed. Try again.' }}";
            }
            else {
                echo "{success: false, errors: { reason: 'Login failed. Try again' }}";
            }
        }
        
        

        //$loginUsername = "f";
        //if ($loginUsername == "f")
//        {
//            echo "{success: true}";
//        } else
//        {
//            echo "{success: false, errors: { reason: 'Login failed. Try again.' }}";
//        }
    }

//    public function actionEncrypt($value){
//        $enc = NEW bCrypt();
//        echo $enc->hash($value);
//    }
//
//    public function actionSalt(){
//        $enc = NEW bCrypt();
//        echo $enc->getSalt();
//    }


    public function actionGenerate(){
        $templatePath = './css/silk_v013/icons';
        $files = scandir($templatePath);
        $txt = "";
        foreach ($files as $file) {
            if (is_file($templatePath . '/' . $file)) {
                $basename = explode(".",$file);
                $name = $basename[0];
                $txt .= ".silk13-$name { background-image: url(icons/$file) !important; background-repeat: no-repeat; }\n";
            }
        }
        $myFile = "silk013.css";
        $fh = fopen($myFile, 'w') or die("can't open file");
        fwrite($fh, $txt);
        fclose($fh);
    }

    public function actionTree()
    {
        $user = Users::model()->findByPk(user()->getId());
        $menu = new MenuTree($user->security_roles_id);
        $data = $menu->get_menu();

//        $data = "[{text: 'Penjualan',
//                  expanded: false,
//                  children:[{
//                  text: 'Faktur Penjualan',
//                  id: 'jun.NotaGrid',
//                  leaf: true
//                  },
//                  {
//                  text: 'Sales dan Pelanggan',
//                  expanded: false,
//                  children:[{
//                    text: 'Managemen Pelanggan',
//                    id: 'jun.CustomersGrid',
//                    leaf: true
//                    }]
//                  }]
//                  },
//                  {text: 'Pembelian',
//                  expanded: false,
//                  children:[{
//                    text: 'Pembelian Kredit',
//                    id: 'jun.NotaGrid',
//                    leaf: true
//                    },
//                    {
//                    text: 'Pembelian Tunai',
//                    id: 'jun.NotaGrid',
//                    leaf: true
//                    },
//                    {
//                    text: 'Supplier',
//                    expanded: false,
//                    children:[{
//                        text: 'Managemen Supplier',
//                        id: 'jun.SuppliersGrid',
//                        leaf: true
//                        }]
//                    }]
//                  },
//                  {text: 'Item',
//                  expanded: false,
//                  children:[{
//                    text: 'Item',
//                    id: 'jun.StockMasterGrid',
//                    leaf: true
//                    },
//                    {
//                    text: 'Satuan Item',
//                    id: 'jun.ItemUnitsGrid',
//                    leaf: true
//                    },
//                    {
//                    text: 'Kategori Stok',
//                    id: 'jun.StockCategoryGrid',
//                    leaf: true
//                    }]
//                  },
//                  {text: 'Kas/Bank',
//                    expanded: false,
//                    children:[{
//                        text: 'Kas Keluar',
//                        id: 'jun.NotaGrid',
//                        leaf: true
//                        },{
//                        text: 'Kas Masuk',
//                        id: 'jun.NotaGrid',
//                        leaf: true
//                        },{
//                        text: 'Transfer Antar Bank',
//                        id: 'jun.TranferBankWin',
//                        leaf: true
//                        },{
//                        text: 'Penyesuain Bank',
//                        id: 'jun.NotaGrid',
//                        leaf: true
//                        },{
//                         text: 'Bank Statement',
//                            id: 'jun.BankTransGrid',
//                           leaf: true
//                        },
//                        {
//                        text: 'Managemen',
//                        expanded: false,
//                        children:[{
//                            text: 'Akun Bank',
//                            id: 'jun.BankAccountsGrid',
//                            leaf: true
//                            }]
//                        }]},
//                  {
//                    text:'Akuntansi',
//                    expanded: false,
//                    children:[{
//                    text: 'Input Jurnal',
//                    id: 'jun.TblUserGrid',
//                    leaf: true
//                    },{
//                    text: 'GL Inquiry',
//                    id: 'jun.GlTransGrid',
//                    leaf: true
//                    },{
//                        text: 'Managemen',
//                        expanded: false,
//                        children:[{
//                            text: 'Quick Entries',
//                            id: 'jun.NotaGrid',
//                            leaf: true
//                            },{
//                            text: 'Akun Rekening',
//                            id: 'jun.ChartMasterGrid',
//                            leaf: true
//                            },{
//                            text: 'Grup Akun Rekening',
//                            id: 'jun.ChartTypesGrid',
//                            leaf: true
//                            },{
//                            text: 'Kelas Akun Rekening',
//                            id: 'jun.ChartClassGrid',
//                            leaf: true
//                            }]
//                        }
//                    ]},
//                    {
//                                text: 'Setting',
//                                expanded: false,
//                                children:[{
//                                    text: 'Forms Setup',
//                                    id: 'jun.SysTypesGrid',
//                                    leaf: true
//                                },{
//                                    text: 'Profile',
//                                    id: 'jun.KlasfikasiDetailManfaatGrid',
//                                    leaf: true
//                                },{
//                                    text: 'Ubah Password',
//                                    id: 'jun.KlasfikasiDetailManfaatGrid',
//                                    leaf: true
//                                },{
//                                    text: 'Users',
//                                    id: 'jun.UsersGrid',
//                                    leaf: true
//                                }]
//
//                            }]";


        Yii::app()->end($data);
    }
}
