/**
 * Created by way on 15/4/23.
 * 
 * 表单处理类
 * @fn.js -> toggle
 * @fontAwesome
 * @zepto
 */


define(function(require, exports, module){
    'use strict';

    
    
    function getFormData($obj){
        var $form,data={},$input,$radio,radio_list = {},$select;
        $form = $($obj);
        $input = $form.find('input');
        function getval($obj){
            if ($obj.length > 0){
                $obj.each(function (k,v){
                    var $cur = $obj.eq(k),
                        key = $cur.attr("name")
                    if ($cur.attr('type') == 'file'){
                        data[key] = $cur[0].files[0]
                    }else{
                        data[key] = $cur.val()
                    }
                })
            }
        }
        //文本类型处理
        getval($input.filter('[type=text]'));
        //密码类型处理
        getval($input.filter('[type=password]'));
        //复选框框处理
        getval($input.filter('[type=checkbox]'));
        //隐藏类处理
        getval($input.filter('[type=hidden]'));
        //数字类处理
        getval($input.filter('[type=number]'));
        //电话类处理
        getval($input.filter('[type=tel]'));
        //日期处理
        getval($input.filter('[type=date]'));
        //文件处理
        getval($input.filter('[type=file]'));
        //文本框处理
        getval($form.find('textarea'));

        //单选框类型处理
        $radio = $input.filter('[type=radio]');
        if ($radio.length > 0){
            $radio.each(function (k,v){
                var $cur = $radio.eq(k),
                    cur_name = $cur.attr('name');
                if (!radio_list[cur_name]){
                    radio_list[cur_name] =[];
                }
                radio_list[cur_name].push($cur);
            });
            (function (){
                var i,cur,val;
                for(i in radio_list){
                    cur = radio_list[i];
                    for (var w = 0, len = cur.length; w < len; w++){
                        if (cur[w][0].checked){
                            val = w
                        }
                    }
                    data[i] = val
                }
            }());
        }

        //下拉框处理
        $select = $form.find('select');
        if ($select.length > 0){
            $select.each(function (k,v){
                var $cur = $select.eq(k),
                    val,
                    $option,
                    key = $cur.attr("name");
                $option = $cur.find('option')
                $option.each(function (k,v){
                    var $cur = $option.eq(k);
                    if ($cur[0].selected){
                        //获取下标值
                        //val = k
                        //获取value值
                        val = $option.eq(k).val()
                    }
                })
                data[key] = val;
            })
        }


        return data;

    }
    
    function ui(root){
        var $form,$input;
        $form = $(root)
        $input = $form.find('input');
        ui_radio($form,$input.filter('[type=radio]'));
    }



    function ui_radio($root,$radio){
        var labels = {},i;
        $radio.each(function (k,v){
            var $cur = $radio.eq(k),label
            $cur.hide();
            $cur.wrap('<div class="fa fa-circle-o kw-radio">');
            label = $cur.attr('ui_label') || '.kw-radio';
            if (!labels[label]){
                labels[label] = label;
            }
        })
        for(i in labels){
            $root.on('click',labels[i],function (){
                var $this = $(this),
                    $name,
                    name,
                    $radio,
                    $input = $this.find('input');
                name = $input.attr('name');
                $name = $root.find('[name='+name+']');
                $radio = $input.closest('.kw-radio');
                $name.each(function (k,v){
                    var $cur = $name.eq(k);
                    $cur[0].checked = false;
                    $cur.closest('.kw-radio').removeClass('fa-dot-circle-o');
                })
                $input[0].checked = true;
                $radio.addClass('fa-dot-circle-o');
            })

        }
    }



    

    exports.getFormData = getFormData
    exports.ui = ui
    
})
