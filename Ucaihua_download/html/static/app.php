<?php
/**
 * Created by PhpStorm.
 * User: way
 * Date: 15/4/8
 * Time: 下午11:51
 */


error_reporting(E_ALL & ~E_NOTICE);
//header('Access-Control-Allow-Origin:*');
$host = 'www.pccn.com.cn';
$req_host = $_SERVER['HTTP_HOST'];
Session_start();
$dir_app = '/app.php';
include_once 'net.php';
include_once 'wx.php';
$net = new net();
$wx = new wx();

$wx -> config(array(
    appid => 'wx21e0de0bfa12aad9',
    secret => 'c209a08a1a8fdc33224a6cfec7b7a66b'

));

switch ($_GET['act']){
    case "login" :
        if ($_GET['op'] != false){
            $login_op = '&op='.$_GET['op'] ;
        }else{
            $login_op = '';
        }
        $data = curl_send($host.$dir_app.'?act=login'.$login_op,$_POST,'post');
        _echo($data);
        break;

    case "attention" :
        $data = curl_send($host.$dir_app.'?act=attention',$_POST,'post');
        _echo($data);
        break;

    case "person_list" :
        $data = curl_send($host.$dir_app.'?act=person_list',$_GET);
        _echo($data);
        break;
    case "get_userinfo" :
        $data = curl_send($host.$dir_app.'?act=get_userinfo',$_GET);
        _echo($data);
        break;
    case "step" :
        $data = curl_send($host.$dir_app.'?act=step',$_GET);
        _echo($data);
        break;
    case "lianxiren_pl" :
        $data = curl_send($host.$dir_app.'?act=lianxiren_pl',$_GET);
        _echo($data);
        break;
    case "favorite" :
        $data = curl_send($host.$dir_app.'?act=favorite',$_POST,'post');
        _echo($data);
        break;
    case "subject" :
        $data = curl_send($host.$dir_app.'?act=subject',$_GET);
        _echo($data);
        break;
    case "get_demand_list" :
        $data = curl_send($host.$dir_app.'?act=get_demand_list',$_GET);
        _echo($data);
        break;
    case "demand_comment" :
        if ($_REQUEST['op'] == 'add'){
            $net_type = 'post';
        }else{
            $net_type = 'get';
        }
        $data = curl_send($host.$dir_app.'?act=demand_comment',$_REQUEST,$net_type);
        _echo($data);
        break;
    case "subject_list" :
        $data = curl_send($host.$dir_app.'?act=subject_list',$_GET);
        _echo($data);
        break;
    case "modify_mobile" :
        $data = curl_send($host.$dir_app.'?act=modify_mobile&op='.$_GET['op'],$_POST,'post');
        _echo($data);
        break;
    case "register" :
        $data = curl_send($host.$dir_app.'?act=register&op='.$_GET['op'],$_POST,'post');
        _echo($data);
        break;
    case "get_password" :
        $data = curl_send($host.$dir_app.'?act=get_password&op='.$_GET['op'],$_POST,'post');
        _echo($data);
        break;
    case "myproduct" :
        $data = curl_send($host.$dir_app.'?act=myproduct',$_GET);
        _echo($data);
        break;
    case "c_type" :
        $data = curl_send($host.$dir_app,$_GET);
        _echo($data);
        break;
    case "category_new" :
        $data = curl_send($host.$dir_app,$_GET);
        _echo($data);
        break;
    case "category" :
        $data = curl_send($host.$dir_app,$_GET);
        _echo($data);
        break;
    case "get_city_list1" :
        $data = curl_send($host.$dir_app,$_GET);
        _echo($data);
        break;
    case "userinfo" :
        $data = curl_send($host.$dir_app.'?act=userinfo?op='.$_GET['op'],$_GET);
        _echo($data);
        break;
    case "custom_made" :
        $data = curl_send($host.$dir_app.'?act=custom_made&op='.$_GET['op'].'&uid='.$_GET['uid'],$_POST,'post');
        _echo($data);
        break;
    case "subject_brand" :
        $data = curl_send($host.$dir_app.'?act=subject_brand&op='.$_GET['op'],$_POST,'post');
        _echo($data);
        break;
    //获取微信js配置
    case "wx_get_js_config" :
        $data = $wx -> get_js_config();
        _echo($data);
        break;
    default :
        echo file_get_contents('index.html');
        break;
}


if ($host.$dir_app == 'wx_get_access_token'){
    
}

//输出
function _echo($data){
    /*foreach($data['php_res']['cookies'] as $v){
        setcookie($v['key'],$v['val'], time()+3600*24,'/',$_SERVER['HTTP_HOST']);
    }*/
    if ($data['php_res']['cookies']){
        setcookie('php_cookies',$data['php_res']['cookies'],time()+3600*24,'/',$_SERVER['HTTP_HOST']);
    }

    exit(json_encode($data));
}

//获取json
function get_jsonData(){
    $json = file_get_contents("php://input");
    return $json;
}



//网络发送
function curl_send($url, $param=array(), $type='get'){

    if ($type == 'get'){
        $p='';
        foreach($param as $key => $value){
            $p=$p.$key.'='.$value.'&';
        }
        if(preg_match('/\?[\d\D]+/',$url)){//matched ?c
            $p='&'.$p;
        }else if(preg_match('/\?$/',$url)){//matched ?$
            $p=$p;
        }else{
            $p='?'.$p;
        }
        $p=preg_replace('/&$/','',$p);
        $url=$url.$p;
    }

    $curl = curl_init($url); //初始化
    $param = str_replace('\\','',$param);
    if ($type == 'post'){
        if (!is_string($param)){
            $post = http_build_query($param);
        }else{
            $post = json_encode($param);
        }
        curl_setopt($curl,CURLOPT_POSTFIELDS,$post);
    }
    curl_setopt($curl,CURLOPT_HEADER,1); //将头文件的信息作为数据流输出

    curl_setopt($curl,CURLOPT_RETURNTRANSFER,1); //返回获取的输出文本流

    curl_setopt($curl,CURLOPT_COOKIE,$_COOKIE['php_cookies']);

    $rst = curl_exec($curl); //执行curl并赋值给$content
    preg_match_all('/^Set-Cookie:\s(.*);/m',$rst,$str); //正则匹配
    $cookies = '';
    if (count($str[1]) > 0){
        foreach ($str[1] as $v) {
            /*$arr = explode('=',$v);
            array_push($cookies,array(
                key => $arr[0],
                val => $arr[1]
            ));*/
            $cookies .= $v.'; ';
        }
    }
    curl_close($curl);
    $rst = resolve_res($rst,'de');
    //print_r($rst);
    if ($rst == false){
        $rst = array();
    }
    $rst = array_merge($rst,array(
        php_res  =>  array(
            url  => $url,
            data => $param,
            type => $type,
            cookies  => $cookies
        )
    ));


    return $rst;
}

//解析send请求的返回值
function resolve_res($data,$json_type){
    preg_match('/{.*}/', $data, $matches, PREG_OFFSET_CAPTURE);
    $matche = $matches[0][0];
    if (!$json_type){
        $results = $matche;
    }elseif($json_type == 'en'){
        $results = json_encode($matche);
    }else{
        $results = json_decode($matche,true);
    }
    if (!$results['access_token']){
        //exit(dump($matches));
    }
    return $results;
}


