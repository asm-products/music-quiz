// Build both the source that can run directly locally and the distribution package to release to a production environment.
module.exports = function (grunt) {
    grunt.config.init({

        // Concatenate the javascript files.
        concat: {
            options: {
                separator: ';'
            },
            js: {
                files: {
                    './src/js/dependencies.concat.js' : [
                        './bower_components/angular/angular.js',
                        './bower_components/angular-mocks/angular-mocks.js',
                        './bower_components/angular-route/angular-route.js',
                        './bower_components/jquery/dist/jquery.js',
                        './bower_components/bootstrap-sass/dist/js/bootstrap.js',
                        './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        './bower_components/spin.js/spin.js',
                        './bower_components/angular-spinner/angular-spinner.js',
                        './bower_components/angular-facebook/lib/angular-facebook.js'
                        // Update ./unit-tests/karma.conf.js when adding new dependencies.
                    ],
                    './src/js/app.concat.js': [
                        './src/js/app.js',
                        './src/js/*Config.js',
                        './src/js/models/*.js',
                        './src/js/controllers/*.js',
                        './src/js/directives/*.js'
                    ]
                }
            }
        },

        // Minify the javascript files.
        uglify: {
            options: {
                compress: false,
                preserveComments: false
            },
            js: {
                files: {
                    './dist/js/dependencies.min.js': [
                        './src/js/dependencies.concat.js'
                    ],
                    './dist/js/app.min.js': [
                        './src/js/app.concat.js'
                    ]
                }
            }
        },

        // Minify the css files.
        cssmin: {
            options: {
                keepSpecialComments: '0'
            },
            combine: {
                files: {
                    './dist/css/screen.min.css': [
                        './src/css/screen.css'
                    ],
                }
            }
        },

        // Copy certain files.
        copy: {
            main: {
                files: [
                    {
                        // Copy bootstrap fonts to this website source directory.
                        expand: true, 
                        flatten: true, 
                        src: [
                            './bower_components/bootstrap-sass/fonts/**',
                            './bower_components/open-sans-fontface/fonts/Light/**',
                            './bower_components/open-sans-fontface/fonts/Semibold/**'
                        ], 
                        dest: './src/fonts/', 
                        filter: 'isFile'
                    },
                    {
                        // Copy bootstrap fonts to this website distribution package.
                        expand: true, 
                        flatten: true, 
                        src: [
                            './bower_components/bootstrap-sass/fonts/**',
                            './bower_components/open-sans-fontface/fonts/Light/**',
                            './bower_components/open-sans-fontface/fonts/Semibold/**'
                        ], 
                        dest: './dist/fonts/', 
                        filter: 'isFile'
                    }
                ]
            }
        },

        // Re-run these automated tasks each time certain files are modified.
        watch: {
            scripts: {
                files: ['./Gruntfile.js', './src/js/**/*.js', '!./src/js/**/*.concat.js'],
                tasks: ['default']
            }
        }

    });

    // Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register which tasks to run.
    grunt.registerTask('default', [
        'concat',
        'uglify', 
        'cssmin',
        'copy',
        'watch'
    ]);
};