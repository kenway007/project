


<?php

class upload_file {
    public function save($name,$dest){
        if (move_uploaded_file($_FILES[$name]['tmp_name'], $dest.$this-> get_ext_name())){
            return true;
        }else{
            return false;
        }
    }

    public function save_temp($name,$dest){
        if ($this-> save($name,$dest)){
            return true;
        }else{
            return false;
        }

    }


    public function get_ext_name(){
        preg_match('/\/.*/',$_FILES['face']['type'],$ext_name);
        $ext_name = '.'.substr($ext_name[0],1);
        return $ext_name;
    }
}
