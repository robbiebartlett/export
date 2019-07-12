module.exports = function(grunt) {

//load tasks      
require('time-grunt')(grunt);
require('load-grunt-tasks')(grunt);

grunt.initConfig({

pkg: grunt.file.readJSON('package.json'),

  //PostCSS  
  postcss: {
    options: {
      map: {
          inline: true, 
          annotation: 'dist/css/maps/'
      },
      processors: [
        require('postcss-cssnext')(), 
        require('postcss-will-change')(),   
        require('precss')(),
        require('postcss-import')(), 
        require('pixrem')(),
        require('rucksack-css')(),                            
        require('postcss-color-function')(),                              
        require('postcss-simple-extend')(),             
        require('postcss-merge-rules')(),                            
        require('postcss-pseudoelements')(),                                 
        require('postcss-center')(),                                          
        require('postcss-animation')(),
        require('css-mqpacker')(),                                       
        require('lost')(),
        require('postcss-discard-comments')({removeAll: true}),                                                      
      //require('postcss-colorblind')({method: 'protanopia'}) 
      //require('cssnano')()   
      ]
    },
    dist: {
      src:  'source/css/**/*.css',
      dest: 'dist/css/style.css'
        }
    },

    //Javascript build 
    

    //JShint
    jshint: {
      all: ['source/js/*.js']
    },
    
    //Concatenate
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['source/js/**/*.js'],
        // the location of the resulting JS file
        dest: 'dist/js/actions.js'
      }
    },  
    
    //Uglify
     uglify: { 
         options: {
           banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> <%= grunt.template.today("longTime") %> */\n'
         },
          my_target: {
                 files: {
                     'dist/js/actions.js': ['source/js/**/*.js']
                   } 
                } 
            },

     // SVG icons
    
       //removes old data
       clean: ['source/icons/compressed', 'dist/icons'], 
    
       //minimize SVG files
       svgmin: {
        options: {
            plugins: [
                {removeViewBox: false}, 
                {removeUselessStrokeAndFill: false}
             ]
          },
          dist: {
              files:[{
                expand: true,
                cwd: 'source/icons',
                src: ['*.svg'],
                dest: 'source/icons/compressed'
            }]  
         }
     },

        // Convert SVG icons to CSS
		grunticon: {
			icons: {
					files: [{
						expand: true,
						cwd: 'source/icons/compressed',
						src: ['*.svg'],
						dest:'dist/icons'
					}],
				options:{
					enhanceSVG:true,
                    compresssPNG: true,
                    cssprefix: '.icon-'
				}
			}
		},


// Server Run
  connect: {
      server: {
        options: {
          port: 9000,
          // base: 'www-root'
        }
      }
    },

   livereload: {
        options: {
            port: 9000,
            base: 'index.htm'
      },
    },

    watch: {
       options: { livereload: true },
       scripts: {
          files: ['source/js/*.js'],
          tasks: ['uglify']
       }, //script     
       postcss: {
            files: ['**/*.css', '**/**/*.css'],
            tasks: ['postcss']
       },
       html: {
         files: ['dist/*.html']
       }
                 
     } //watch
    
    // serve: {
    //     options: {
    //         port: 9000,
    //         base: '/'
    //   },
    // },

});



//register tasks,
grunt.registerTask('default', ['postcss', 'jshint', 'concat', 'clean', 'svgmin', 'uglify', 'grunticon:icons', 'connect', 'watch']);

};