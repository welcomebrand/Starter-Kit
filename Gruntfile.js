module.exports = function(grunt) {

    // All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concatenate all scripts to one file
        concat: {
            dist: {
                src: [
                    'assets/js/app/*.js'//, // All JS within app folder
                    // 'assets/js/global.js'  // If we need to isolate specific file, do that here
                ],
                dest: 'assets/js/build/production.js',
            }
        }
        ,

        // Use things from Modernizr
        modernizr: {
            dist: {
                devFile: 'assets/js/libs/modernizr.custom.70803.js',
                outputFile: 'assets/js/build/custom-modernizr.js',
                files: {
                src: [
                    'assets/js/**/*.js',
                    'assets/css/**/*.css',
                    ]
                }
            }
        }
        ,

        // Minify that script file
        uglify: {
            build: {
                src: 'assets/js/build/production.js',
                dest: 'assets/js/build/production.min.js'
            }
        }
        ,

        // Generate all required favicons from favicon.png file
        favicons: {
            options: {
                trueColor: true,
                precomposed: true,
                appleTouchBackgroundColor: "#ffffff",
                coast: true,
                windowsTile: true,
                tileBlackWhite: false,
                tileColor: "auto"
            },
            icons: {
                src: 'favicon.png',
                dest: ''
            }
        }
        ,

        // Create fallback PNG's from any SVG files
        svg2png: {
            all: {
                files: [
                    {
                        cwd: 'assets/images/svg/',
                        src: ['**/*.svg'],
                        dest: 'assets/images/'
                    }
                ]
            }
        }
        ,

        // Optimise all image assets
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/images/'
                }]
            }
        }
        ,


        // Auto prefix any CSS3 properties in CSS file
        autoprefixer: {
            options: {
               browsers: ['last 2 versions']
            },
            dist: { // Target
                files: {
                    'assets/css/screen.css': 'assets/css/screen.css'
                }
            }
        }
        ,

        // Compile Sass
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'assets/css/screen.css': 'assets/sass/screen.scss'
                }
            }
        }
        ,

        // Run PerfBudget checker over the site
        perfbudget: {
          default: {
            options: {
              url: 'PUBLIC SITE URL',
              key: 'db8137cdafb84d36b02778d325a9d5ff',
              budget: {
                SpeedIndex: '1500'
              }
            }
          }
        }
        ,

        // Monitor these files for any changes
        watch: {
            scripts: {
                files: ['assets/js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-favicons');
    grunt.loadNpmTasks('grunt-svg2png');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-perfbudget');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Where we tell Grunt what to do when we type "grunt" into the terminal (register them in the order we want them to run).
    grunt.registerTask('default',
        [
            'concat',
            'modernizr',
            'uglify',
            'favicons',
            'svg2png',
            'imagemin',
            'autoprefixer',
            'sass',
            'watch'
        ]);

};