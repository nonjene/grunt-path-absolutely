'use strict';

module.exports = function ( grunt ) {

    grunt.initConfig( {
        abspath:{
            dist:{
                options:{
                    devRoot:'test/dev',
                    releaseRoot:'http://cdn.xxx.com',
                    resourceFilter:['*.{jpg,png,css,js}']
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
        grunt.task.run(['abspath:dist'])
    });

    grunt.loadTasks('./tasks');
};