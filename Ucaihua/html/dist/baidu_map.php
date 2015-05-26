<?php
/**
 * Created by PhpStorm.
 * User: way
 * Date: 15/4/29
 * Time: 上午9:57
 *
 * 百度地图
 * @net
 */

include_once 'net.php';

class baidu_map extends net {
    //配置变量
    private $config = array();

    /*
     * 坐标作换
     * 该接口适用于需将非百度地图坐标的坐标进行转化，进而将其运用到百度地图开发的用户。该接口还支持批量坐标转化，一次最多可转换100个坐标点。
     * */
    public function change_coords($coords){
        $config = $this -> config;
        $key = $config-> key;
        $data = $this-> send(array(
            url =>  'http://api.map.baidu.com/geoconv/v1',
            coords => $coords
        ));
        return $data;
    }
    
    public function get_city($opt){
        $lat = $opt['lat'];
        $lng = $opt['lng'];
        if (empty($lat) || empty($lng)){

        }
    }




    //配置基础信息
    public function config($opt){
        $config = $this -> config;
        $this -> config = array_merge($config,$opt);
    }
}
