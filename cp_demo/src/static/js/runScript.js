/**
 * 脚本注入工具
 * Created by way on 15/2/7.
 */
;(function (){
    var _runScript = function(){
        window.runScript = function (){}

        //运行
        runScript.run = function (code,type){
            var script,body
            script = document.createElement('script');
            body = document.body;
            body.appendChild(script);
            script.innerHTML = ';(function (){'+ (type ? code : runScript.filter(code) )+'}())';
            runScript.debug ? '' : body.removeChild(script);
        }

        //过滤
        runScript.filter = function (obj){
            return typeof obj != 'string' ? obj.toString().match(/\{(.|\n)*/g)[0].slice(1,-1) : obj;
        }

        //替换
        runScript.replace = function (path,match,code){
            var rst,filter
            filter = runScript.filter;
            rst = filter(path).replace(match,filter(code));
            runScript.run(rst);
        }


        runScript._replace = function (type,path,code){
            var rst,filter;
            filter = runScript.filter;
            switch (type){
                case('before'): rst = filter(code) + filter(path)  ;break;
                case('after'): rst = filter(path) + filter(code)   ;break;
                default :
            }
            runScript.run(rst);
        }

        //前置替换
        runScript.in_replace = function (path,code){
            runScript._replace('before',path,code);
        }

        //后置置替换
        runScript.replace_in = function (path,code){
            runScript._replace('after',path,code);
        }


        //植入到页面
        runScript.toPage = function (){
            runScript.run(_runScript);
        }

    }
    _runScript();
}());









