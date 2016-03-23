/**
 * ( ._.)
 */
var grunt = require( 'grunt' );
var path = require( 'path' );

/**
 * @regMatchRelativeFile
 *
 * @a   ('|"|\()    ->  3个前提:  ' 或 " 或 (
 * @b   \.*         ->  ./path/to的"."
 * @c   [\/\w+]*    ->  ./path/to的"/path/to"
 * @d   \/*         ->  /
 * @e   [a-zA-Z0-9-_\.]+\.[a-zA-Z]{2,3} ->  xxx.yy
 */
var regMatchRelativeFile = exports.regMatchRelativeFile = /('|"|\()(\.*[\/\w+]*\/*[a-zA-Z0-9-_\.]+\.[a-zA-Z]{2,3})/g;

var regFirstSlash = /^\//;

exports.replacePath = function ( hostFileAbsPath, devRoot, releaseRoot, resourceFilter, outputFileAbsPath ) {

    //去掉路径的绝对路径斜杠, 因为grunt本来就是在根目录运行.
    hostFileAbsPath = hostFileAbsPath.replace( regFirstSlash, '' );
    devRoot = devRoot.replace( regFirstSlash, '' );


    var contents = grunt.file.read( hostFileAbsPath );
    var hostFileRootdir = path.dirname( hostFileAbsPath );

    contents = contents.replace( regMatchRelativeFile, function () {
        /**
         * arg[0]:all match
         * arg[1]:"|'|(
         * arg[2]:file path
         */
        var arg = grunt.util.toArray( arguments );
        var fileRelativePath = arg[ 2 ];

        //path.resolve假如第一个参数不是绝对路径, 它会自动把第一个参数转化为系统绝对路径,所以加'/'欺骗
        var fileAbsolutepath = path.resolve( '/' + hostFileRootdir, fileRelativePath ).replace( regFirstSlash, '');

        //console.log( fileAbsolutepath );//debug

        if ( !grunt.file.isFile( fileAbsolutepath ) ) { return arg[ 0 ] }

        //过滤文件类型
        if ( grunt.file.match( { matchBase: true }, resourceFilter, fileAbsolutepath ).length === 0 ) { return arg[ 0 ] }
        
        fileAbsolutepath = fileAbsolutepath.replace( new RegExp( '^' + devRoot ), releaseRoot );

        return arg[ 1 ] + fileAbsolutepath;

    } );
    grunt.file.write( outputFileAbsPath, contents );
    grunt.log.writeln('File create: ' + outputFileAbsPath.green)

};
