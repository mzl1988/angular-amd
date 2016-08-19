var SRC = 'app'
    REQUIREJS  = 'build-requirejs' ,
    DIST       = 'build' ,
    RELEASE = 'release',

    paths      = {

        // 默认情况下所有 js 文件都是由 requireJS 加载的是不需要加前缀的，所以这里要列出不是由 requireJS 加载的 js 文件
        jsNotLoadByRequireJS : [ 'main.js' , 'scripts/ext/require.js' ] ,

        // 默认情况下所有 css 文件都是要加前缀的，但是由 requireJS 加载的 css 文件不用加
        cssLoadByRequireJS : [ /^styles\/.*/ ] ,

        js : [
            REQUIREJS + '/**/*.js'
        ] ,
        cssFiles : [ REQUIREJS + '/**/*.css' ] ,
        htmlFiles : REQUIREJS + '/**/*.html' ,
        imageFiles : REQUIREJS + '/**/*.{png,jpg,gif}' ,
        copyFiles : [
            REQUIREJS + '/**/*' ,
            '!' + REQUIREJS + '/**/*.{js,css,html}' ,
            '!' + REQUIREJS + '/build.txt'
        ]
    } ,

    gulp = require('gulp'),
    minifyJS   = require( 'gulp-uglify' ) ,
    minifyCSS  = require( 'gulp-minify-css' ) ,
    minifyHTML = require( 'gulp-htmlmin' ) ,
    concat     = require( 'gulp-concat' ) ,
    deleteFile = require( 'del' ) ,
    webserver = require('gulp-webserver'),
    config = require('./config'),

    revall     = new (require( 'gulp-rev-all' ))( {
        dontRenameFile : [ /^\/index\.html$/g ] ,
        dontSearchFile : [ /^\/ext\/angular\/.*/g , /^\/ext\/require\/.*/g ] ,
        transformFilename : function ( file , hash ) {
            return hash + file.path.slice( file.path.lastIndexOf( '.' ) );
        } ,
        transformPath : function ( rev , source , file ) {
            //if ( rev !== file.revPath ) {
            //    console.log( 'debugger here' );
            //}
            return rev;
        }
    } );

gulp.task( 'clean' , clean );

gulp.task( 'requirejs' , [ 'clean' ] , requirejs ); //第一步： 从 SRC 把文件合并至 REQUIREJS 文件夹

// 第二步：下面四个操作是并行的，用于将 REQUIREJS 文件夹下的文件精简至 DIST 文件夹
gulp.task( 'js' , [ 'requirejs' ] , js );

gulp.task( 'css' , [ 'requirejs' ] , css );

gulp.task( 'html' , [ 'requirejs' ] , html );

gulp.task( 'copy' , [ 'requirejs' ] , copy );

// 第三步：将 DIST 文件夹下的文件打上 md5 签名并输出到 RELEASE 文件夹
gulp.task( 'build' , [ 'js' , 'css' , 'html' , 'copy' ] , md5 );

function clean() {
    return deleteFile( [ DIST , REQUIREJS , RELEASE ] );
}

function js() {
    return gulp.src( paths.js )
        //.pipe( changed( DIST ) )
        .pipe( minifyJS() )
        .pipe( gulp.dest( DIST ) );
}

function css() {
    return gulp.src( paths.cssFiles )
        //.pipe( changed( DIST ) )
        .pipe( minifyCSS() )
        .pipe( gulp.dest( DIST ) );
}

function html() {
    return gulp.src( paths.htmlFiles , { base : REQUIREJS } )
        //.pipe( changed( DIST ) )
        .pipe( minifyHTML( {
            removeComments : true ,
            collapseWhitespace : true
        } ) )
        .pipe( gulp.dest( DIST ) );
}
function copy() {
    return gulp.src( paths.copyFiles )
        //.pipe( changed( DIST ) )
        .pipe( gulp.dest( DIST ) );
}

function md5() {
    return gulp.src( DIST + '/**' )
        .pipe( revall.revision() )
        .pipe( gulp.dest( RELEASE ) );
    //.pipe( revall.manifestFile() )
    //.pipe( gulp.dest( RELEASE ) );
}

function requirejs( done ) {
    var r = require( 'requirejs' );
    r.optimize( {
        appDir : SRC ,
        baseUrl : './' ,
        dir : REQUIREJS ,
        optimize : 'none' ,
        optimizeCss : 'none' ,
        removeCombined : true ,
        mainConfigFile : SRC + '/main.js' ,
        modules : [
            {
                name :  'main'
            }
        ] ,
        logLevel : 1
    } , function () {
        done();
    } );
}


gulp.task('watch', function() {
  gulp.src('app')
    .pipe(webserver({
        host: '0.0.0.0',
        port: config.port,
        livereload: config.livereload
    }));
});

gulp.task('test', function() {
  gulp.src('release')
    .pipe(webserver({
        host: '0.0.0.0',
        port: config.port
    }));
});

gulp.task('default', ['watch']);