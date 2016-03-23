# grunt-path-absolutely

A grunt plugin for convert relative path to absolutely.

## Feature

This tool is used to change a resource's path from relative to absolute. 

eg:
```html
<img src='./dev/pic1.jpg'/>
```
converts to:
```html
<img src='https://cdn.xxx.com/img/pic1.jpg'/>
```

File type is configurable, both main file and resource file.

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [`gruntfile.js`](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-path-absolutely --save-dev
```

Once the plugin has been installed, it may be enabled inside your `gruntfile.js` with this line:

```js
grunt.loadNpmTasks('grunt-path-absolutely');
```
Then, add and configure it to your Gruntfile.js:

```js
grunt.initConfig( {
    abspath:{
        dist:{
            options:{
                //resource file's rootdir,which will be replace by 'releaseRoot'
                devRoot:'path/to/dev',
                //the absolute root you wanted
                releaseRoot:'http://cdn.xxx.com',
                //what resource need to change the root
                resourceFilter:['*.{jpg,png,css,js}']
            },
            files: [ {
                expand: true,
                //main file's rootdir
                cwd: 'test/dev',
                //main file's type
                src: [ '**/*.html' ],
                //output main file
                dest: 'test/out'
            } ]
        }
    }
    } );
```