<?php
/**
 * Created by PhpStorm.
 * User: way
 * Date: 15/4/29
 * Time: 上午9:57
 *
 * 微信类
 * @net
 */

include_once 'net.php';
class wx extends net {
    //配置变量
    private $config = array();

    //获取JS接口配置信息
    public function get_js_config(){
        $config = $this -> config;
        $appid = $config['appid'];
        $access_token = $this -> get_accessToken();
        $jsapi_ticket = $this -> get_jsapi_ticket($access_token['access_token']);
        $jsapi_ticket = $jsapi_ticket['ticket'];
        $noncestr = $this -> get_randChar(16);
        $timestamp = time();
        $url = $_REQUEST['cur_href'];
        //$url = 'http://m.ucaihua.cn';
        $signature = $this -> get_signature(array(
            jsapi_ticket => $jsapi_ticket,
            noncestr => $noncestr,
            timestamp => $timestamp,
            url => $url
        ));
        $rst = array(
            appId =>  $appid,
            timestamp => $timestamp,
            nonceStr => $noncestr,
            signature => $signature
        );
        return $rst;
    }

    //获取access_token
    public function get_accessToken(){
        $access_token = $_COOKIE['wx_access_token'];

        if (!empty($access_token)){
            return array(
                access_token  => $access_token
            );
        }
        $config = $this -> config;
        $appid = $config['appid'];
        $secret = $config['secret'];
        if (empty($appid) || empty($secret)){
            $res = array(
                status => '400',
                error_msg => '缺少必要参数',
                data => array()
            );
        }else{
            $res = $this -> send(array(
                url =>  'https://api.weixin.qq.com/cgi-bin/token',
                data => array(
                    grant_type => 'client_credential',
                    appid => $appid,
                    secret => $secret
                )
            ));
        }
        setcookie('wx_access_token',$res['access_token'],time()+$res['expires_in'],'/',$_SERVER['HTTP_HOST']);
        return $res;
    }



    //生成签名
    public function get_signature($opt){
        $signature = '';
        foreach($opt as $k => $v){
            $signature = $signature.$k.'='.$v.'&';
        }
        $signature = substr($signature, 0, -1);
        $signature = sha1($signature);
        return $signature;
    }

    //获取jsapi_ticket
    public function get_jsapi_ticket($access_token){
        $jsapi_ticket = $_COOKIE['wx_jsapi_ticket'];
        if (!empty($jsapi_ticket)){
            return array(
                ticket  => $jsapi_ticket,
                errcode => 0,
                errmsg => 'ok'
            );
        }
        if (empty($access_token)){
            $res = array(
                status => '400',
                error_msg => '缺少必要参数',
                data => array()
            );
        }else{
            $res = $this -> send(array(
                url =>  'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
                data => array(
                    access_token => $access_token,
                    type => 'jsapi'
                )
            ));
        }
        setcookie('wx_jsapi_ticket',$res['ticket'],time()+$res['expires_in'],'/',$_SERVER['HTTP_HOST']);
        return $res;
    }

    //生成随机字符串
    public function get_randChar($length){
        $str = null;
        $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        $max = strlen($strPol)-1;
        for($i=0;$i<$length;$i++){
            //rand($min,$max)生成介于min和max两个数之间的一个随机整数
            $str.=$strPol[rand(0,$max)];
        }
        return $str;
    }






    //配置基础信息
    public function config($opt){
        $config = $this -> config;
        $this -> config = array_merge($config,$opt);
    }
}
