module.exports = function (grunt) {
    // 项目配置

    var cp = 'static/compiled/'
    grunt.initConfig({
        clean: {
            dest: ['dist/**/*']
        },
        transport: {
            options: {
                paths: ['static/js'],
                debug: false
            },
            js: {
                files: [
                    {
                        cwd: 'static/js',
                        src: ['!seajs/sea.js','**/*.js'],
                        dest: 'static/compiled/',
                        expand: true
                    }
                ]
            },
            tpl: {
                files: [
                    {
                        cwd: 'static/',
                        src: [
                            'tpl/**/*.tpl',
                            '!tpl/index.tpl'
                        ],
                        dest: 'static/js/',
                        expand: true
                    }
                ]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/js/app.js': ['static/js/seajs/sea.js',cp + '**/*.js'],
                    'dist/js/netCache_diff.js': ['static/js/widget/netCache_diff.js']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['static/img/**/*'],
                        dest: 'dist/img/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['static/fonts/**/*'],
                        dest: 'dist/fonts/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['static/*.php'],
                        dest: 'dist/'
                    },
                    {expand: false, src: ['static/index_fn.html'], dest: 'dist/index.html'},


                    // includes files within path and its sub-directories
                    /*{expand: true, src: ['path*//**'], dest: 'dest/'},

                 // makes all src relative to cwd
                 {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

                 // flattens results to a single level
                 {expand: true, flatten: true, src: ['path*//**'], dest: 'dest/', filter: 'isFile'}*/
                ]
            }
        },
        cssmin: {
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'static/css/',
                        src: ['**/*.css'],
                        dest: 'dist/css/'
                    }
                ]
            }
        },
        watch: {
            tpl: {
                files: ['static/tpl/**/*.tpl'],
                tasks: ['transport:tpl']
            }
        }
    });
    // 加载任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认任务
    grunt.registerTask('default', ['clean','transport','uglify','copy','cssmin']);
}