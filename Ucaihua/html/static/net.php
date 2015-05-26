<?php
/**
 * Created by PhpStorm.
 * User: way
 * Date: 15/4/29
 * Time: 上午9:57
 *
 * 网络请求类
 */
Session_start();
class net {
    static function send($opt){
        $url = $opt['url'];
        $type = $opt['type'] ? $opt['type'] :  'get';
        $data = $opt['data'] ? $opt['data'] :  array();
        $cookieTime = $opt['$cookieTime'] ? $opt['$cookieTime'] : time()+3600*24;
        if ($url == false){
            return;
        }

        $data = str_replace('\\','',$data);
        //GET

        if ($type == 'get'){
            if (empty($data)){
                $data = $_GET;
            }
            $p='';
            foreach($data as $key => $value){
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

        $curl = curl_init(); //初始化
        curl_setopt ( $curl,CURLOPT_URL,$url );

        if ($type == 'post'){
            if (empty($data)){
                $data = $_POST;
            }
            /*if ($opt['file']){
                $data = array_merge($data,$opt['file']);
            }
            if (!is_string($data)){
                $data = http_build_query($data);
            }else{
                $data = json_encode($data);
            }*/
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl,CURLOPT_POSTFIELDS,$data);
        }

        curl_setopt($curl,CURLOPT_HEADER,1); //将头文件的信息作为数据流输出

        curl_setopt($curl,CURLOPT_RETURNTRANSFER,1); //返回获取的输出文本流

        curl_setopt($curl,CURLOPT_COOKIE,$_COOKIE['kw_php_cookies']);

        $rst = curl_exec($curl); //执行curl并赋值给$content
        /*
        print_r($rst);
        exit;*/

        preg_match_all('/^Set-Cookie:\s(.*);/m',$rst,$str); //正则匹配
        $cookies = '';
        if (count($str[1]) > 0){
            foreach ($str[1] as $v) {
                $cookies .= $v.';';
            }
        }
        //关闭连接
        curl_close($curl);

        $rst = self::resolve_res($rst,'de');
        if ($rst == false){
            $rst = array();
        }
        $rst = array_merge($rst,array(
            kw_php_res  =>  array(
                url  => $url,
                data => ($data),
                type => $type,
                cookies  => $cookies
            )
        ));
        if ($rst['kw_php_res']['cookies']){
            setcookie('kw_php_cookies',$rst['php_res']['cookies'],$cookieTime,'/',$_SERVER['HTTP_HOST']);
        }
        return $rst;
    }
    //解析send请求的返回值
    static function resolve_res($data,$json_type){
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
}
