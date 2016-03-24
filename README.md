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

Suppose the project deployment is something like this:
```
|--project/
   |----dev/
   |------module/
   |--------style.css
   |--------srcipt.js
   |--------pic.jpg
   |--------index.html
   |----release/
   |------cdn.xxx.com/
   |--------module/
   |----------style.css
   |----------srcipt.js
   |----------pic.jpg
   |------view/
   |--------module/
   |----------index.html
```

Then, add and configure it to your Gruntfile.js:

```js
grunt.initConfig( {
    abspath:{
        dist:{
            options:{
                //resource file's actual root, which part you want it to replaced by 'releaseRoot'
                devRoot:'dev',
                //the absolute root you wanted
                releaseRoot:'http://cdn.xxx.com',
                //what resource need in  to change the root
                resourceFilter:['*.{jpg,png,css,js}']
            },
            files: [ {
                expand: true,
                //main file(eg:index.html) rootdir
                src: [ 'dev/**/*.html' ],
                //output main file
                dest: 'release/view'
            } ]
        }
    }
    } );
```
## Abspath task
Run this task with the `grunt abspath` command.