/**
 * Created by way on 15/5/5.
 *
 * 上传组件
 *
 * @lang
 * @jpeg_encoder_basic
 *
 */


define(function(require, exports, module){
    'use strict';


    var $doc = $(document)
    var extend = lang.extend;
    
    function upload(opt){
        if (opt){
            this.init(opt)
        }
    }

    upload.prototype.init = function (opt){
        var root_opt = extend({
            imgCut : {},
            imgType : 0,
            fileType : 'img'
        },opt)
        var that = this
        this.upload_num = 1;


        var $root = root_opt.$root
        var $upload_box = $root.find('.kw-upload-box');



        $doc.on('change',root_opt.input,function (){
            try{
                that.rst = [];
                if (root_opt.imgType == 0){
                    $upload_box.html('');
                }
                var _that = this,
                    files = this.files
                upload.onFronts ? upload.onFronts():'';
                root_opt.onFront ? root_opt.onFront():'';
                _that.upload_num = 1;
                var maxNum = root_opt.maxNum,
                    filesLen =  files.length
                var len = root_opt.taskLen =  maxNum && filesLen >= maxNum ? maxNum : filesLen;
                //debugger
                for (var i = 0; i < len; i++){
                    var type = files[i].type;
                    if (!type){
                        end();
                        return;
                    }
                    ;(function (opt){
                        var fr = new FileReader();
                        fr.onload = function (e){
                            var rst = e.target.result;
                            opt.rst = rst;
                            switch (opt.type.match(/.*\//i)[0].slice(0,-1)){
                                case('image'):
                                    file_img(opt);
                                    break;
                                default :
                                    end();
                            }
                            fr = null;
                        }
                        fr.readAsDataURL(_that.files[i]);
                    }({
                        i:i,
                        type:type
                    }));
                }
            }catch(e){
                end(e)
            }


            function end(e){
                console.error(e.message)
                upload.onNotypes ? upload.onNotypes() : '';
                root_opt.onNotype ? root_opt.onNotype() : '';
                root_opt.taskLen = 0;
                compItem();
            }
        })

        function compItem(opt){
            var opt = opt || null;
            //单个完成事件
            upload.onCompItems ? upload.onCompItems(opt) : '';
            root_opt.onCompItem ? root_opt.onCompItem(opt) : '';

            if (that.upload_num >= root_opt.taskLen){
                //全部完成事件
                upload.onCompletes ? upload.onCompletes(opt) : '';
                root_opt.onComplete ? root_opt.onComplete(opt) : '';
            }
            that.upload_num++;

        }

        
        function file_img(opt){
            var $img;
            //0 不存在 1已存在
            if (root_opt.imgType == 0){
                var img = new Image();
                img.src = opt.rst;
                img.className+=' kw-upload-img';
                $img = $(img)
                $upload_box.append($img);
            }else{
                $img = $root.find('.kw-upload-img').eq(opt.i);
                setTimeout(function(){
                    $img.attr('src',opt.rst);
                },50)
            }

            if (root_opt.imgCut){
                $img.off('load');
                $img.on('load',function (){
                    that.rst.push(cutIMG(this));
                    //console.log(that.rst[0])
                    compItem(opt);
                })
            }

            function cutIMG(img){
                var canvas  = document.createElement('canvas'),
                    nw = img.naturalWidth,
                    nh =  img.naturalHeight

                var d = {
                    sx : 0,
                    sy : 0,
                    sw : nw,
                    sh : nh,
                    dx : 0,
                    dy : 0,
                    dw : 100,
                    dh : 100
                }
                extend(d,root_opt.imgCut);
                var per = nw / nh;
                if (!d.dw){
                    d.dw = d.dh * per
                }
                if (!d.dh){
                    d.dh = d.dw / per
                }
                canvas.width = d.dw;
                canvas.height = d.dh;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, d.sx, d.sy, d.sw, d.sh, d.dx, d.dy, d.dw, d.dh);
                return canvas.toDataURL();
            }
        }
        return this;
    }

    upload.prototype.config = function (opt){
        extend(upload,opt);
    }


    module.exports = upload;

})

