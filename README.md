©Rob Bartlett 


npm i# PostCSS and JS Build Workflow 
Setup of a PostCSS workflow, color opacity, cssnext (and more) that has all the functionality and fallbacks used frequently from Sass and Compass to accomodate an IE8 project.

## Setup & Install

1. Use of node and grunt, install each plugin one at a time. You'll have to do the same and your needs will vary.
2. https://nodejs.org/download/
3. http://gruntjs.com/getting-started
4. https://github.com/nDmitry/grunt-postcss

### Dependencies

1. npm
2. grunt 
3. grunt-postcss
4. Plugin names can be found in package.json and the Gruntfile.js

### Installation

This can be used on a production project with all the necessary fallbacks for IE8 - and future proofing. 


## PostCSS and other plugins used for the project:

```
//-------------------------------
CSS Build
require('postcss-cssnext')(),                           // use the latest CSS syntax, includes autoprefixer to fix all the webkit, moz extensions, prerequisite for postCSS
require('postcss-will-change')(),                       // forces will-change as backface-visibility for unsupported browsers
require('precss')(),                                    // Use Sass-like markup in your CSS
require('postcss-import')(),                            // resolve path of an @import rule  
require('pixrem')(),                                    // User rem measurements and it writes fallback/current/future compliant sizes
require('rucksack-css')(),                              // A little bag of CSS superpowers - https://goo.gl/nGID5e
require('postcss-color-function')(),                    // Replicates sass's lighten() and darken() plus more
require('postcss-simple-extend')(),                     // sass extend
require('postcss-merge-rules')(),                       // Duplicate selector styles are combined
require('postcss-pseudoelements')(),                    // add single-colon CSS 2.1 syntax pseudo selectors (i.e. :before)
require('postcss-center')(),                            // center elements   
require('postcss-position')(),                          // shorthand attributes for position (ie : position: absolute 10px 0 10px 20px)
require('postcss-animation')(),                         // adds @keyframes from animate.css                  
require('css-mqpacker')(),                              // Pack media queries into one rule                    
require('lost')(),                                      // responsive grids 
require('postcss-discard-comments')({removeAll: true}), // Remove comments
require('postcss-colorblind')({method: 'protanopia'})   // Colorblind testing
require('cssnano')()                                    // Minify


## Quick install via Command Line

//-----
npm i postcss-cssnext postcss-will-change postcss-import pixrem rucksack-css postcss-color-fuction postcss-simple-extend postcss-merge-rules postcss-pseudoelements postcss-center postcss-position postcss-animation css-mqpacker lost postcss-discard-comments postcss-colorblind cssnano -D

//-------------------------------

JS Build
"load grunt tasks":     "^3.4.1",   // Load multiple grunt tasks using globbing patterns
"grunt-contrib-concat": "^0.5.1",   // Put them all together now
"grunt-contrib-jshint": "^1.0.0",   // Learn better coding practices
"grunt-contrib-uglify": "^0.9.1",   // Compress and rebuild
"grunt-contrib-watch":  "^0.6.1",   // Run tasks whenever watched files change
"grunt-postcss":        "^0.8.0",   // Apply post-processors to the CSS   
"time-grunt":           "^1.3.0",   // Display the elapsed execution time of grunt tasks 
"grunticon":            "^2.2.2",   // Convert SVGs into CSS icons
"grunt-contrib-clean":  "^1.0.0",   // Clean SVG directory 
"grunt-svgmin":         "^3.2.0",   // Minimize SVG files


//-------------------------------
