var util = require( '../lib/util' );
var path = require( 'path' );
var assert = require( 'assert' );

module.exports = function ( grunt ) {
    grunt.registerMultiTask( 'abspath', 'Change the relative path to absolute path', function () {
        var opt = this.options();
        assert( opt.devRoot, 'Please provide `devRoot` parameter.' );
        assert( opt.releaseRoot, 'Please provide `releaseRoot` parameter.' );
        assert( opt.resourceFilter, 'Please provide `resourceFilter` parameter.' );

        this.filesSrc.forEach( function ( hostFileAbsPath, i ) {
            util.replacePath(
                hostFileAbsPath,
                opt.devRoot,
                opt.releaseRoot,
                opt.resourceFilter,
                this.files[ i ].dest
            );
        }.bind(this) );
    } );

};