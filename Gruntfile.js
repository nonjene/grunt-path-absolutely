'use strict';

module.exports = function ( grunt ) {

    grunt.initConfig( {
        abspath:{
            dist:{
                options:{
                    devRoot:'test/dev',
                    releaseRoot:'http://cdn.xxx.com/',
                    sourceFilter:['*.{jpg,png,css,js}']
                },
                files: [ {
                    expand: true,
                    cwd: 'test/dev',
                    src: [ '**/*.html' ],
                    dest: 'test/out'
                } ]
            }
        },
        test: {
            dist: {
                files: [ {
                    expand: true,
                    cwd:'test',
                    src: [ '**/*', '*.html' ],
                    dest:"lib/"
                } ]
            }
        }
    } );

    grunt.registerMultiTask( 'test', function () {
        //this.async();
        //require('./lib/util').test( "xx" );

        
        //console.log()
        this.filesSrc.forEach(function ( fileDir, i ) {
            //this.data.files[ i ].dest //输出的目录
            util.replacePath( fileDir )
        })
        

    } );

    grunt.loadTasks('./tasks');
};