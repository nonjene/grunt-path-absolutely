/**
 * ( ._.)
 */
var grunt = require( 'grunt' );
var path = require( 'path' );

/**
 * @regMatchRelativeFile
 *
 * @a   ('|"|\()    ->  3个前提:  ' 或 " 或 (
 * @b   \.*         ->  ./path的"."
 * @c   (\/\w+)*    ->  ./path的"path"
 * @d   \/*         ->  /
 * @e   [a-zA-Z0-9-_\.]+\.[a-zA-Z]{2,3} ->  xx.yy
 */
var regMatchRelativeFile = exports.regMatchRelativeFile = /('|"|\()\.*(\/\w+)*\/*[a-zA-Z0-9-_\.]+\.[a-zA-Z]{2,3}/g;

var regFirstSlash = /^\//;

exports.replacePath = function ( hostFileAbsPath, devRoot, releaseRoot, sourceFilter, outputFileAbsPath ) {

    //去掉路径的绝对路径斜杠, 因为grunt本来就是在根目录运行.
    hostFileAbsPath = hostFileAbsPath.replace( regFirstSlash, "" );
    devRoot = devRoot.replace( regFirstSlash, "" );


    var contents = grunt.file.read( hostFileAbsPath );
    var flagIsHit = false;

    contents = contents.replace( regMatchRelativeFile, function () {
        /**
         * arg[0]:all match
         * arg[1]:"|'|(
         * arg[2]:file path
         */
        var arg = grunt.util.toArray( arguments );
        var fileRelativePath = arg[ 2 ];
        var fileAbsolutepath = path.resolve( hostFileAbsPath, fileRelativePath );

        console.log( fileAbsolutepath );//debug

        if ( !grunt.file.isFile( fileAbsolutepath ) ) { return arg[ 0 ] }

        //过滤文件类型
        if ( grunt.file.match( { matchBase: true }, sourceFilter, fileAbsolutepath ).length === 0 ) { return arg[ 0 ] }
        
        fileAbsolutepath = fileAbsolutepath.replace( new RegExp( '^' + devRoot ), releaseRoot );

        flagIsHit = true;
        return arg[ 1 ] + fileAbsolutepath;

    } );
    if ( flagIsHit ) {
        grunt.file.write( outputFileAbsPath, contents );
    }


};
