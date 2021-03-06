'use strict';
module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		config: {
			// Configurable paths
			lib: 'bower_components', // lib dir
			docs: 'docs',
			src: 'src',
			dist: 'dist',
			docs_server: 'docs_server' // docs server
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			docs_js: {
				files: [
					'<%= config.docs %>/static/js/{,*/}*.js'
				],
				tasks: [
					'concat:docs',
					'uglify:docs'
				],
				options: {
					livereload: 35729
				}
			},

			src_js: {
				files: [
					'<%= config.src %>/{,*/}*.js'
				],
				tasks: [
					'gravity-dist',
					'copy:gravity_docs'
				],
				options: {
					livereload: 35729
				}
			},

			docs: {
				files: [
					'<%= config.docs %>/index.html',
					'<%= config.docs %>/views/**',
					'<%= config.docs %>/static/images/{,*/}*',
					'<%= config.docs %>/static/fonts/{,*/}*'
				],
				tasks: [
					'copy:docs_html',
					'copy:docs_static'
				],
				options: {
					livereload: 35729
				}
			},

			less: {
				files: [
					'<%= config.docs %>/static/less/{,*/}*.less'
				],
				tasks: [
					'less:gravity_docs'
				],
				options: {
					livereload: 35729
				}
			}

			// livereload: {
			// 	options: {
			// 		livereload: '<%= connect.options.livereload %>'
			// 	},
			// 	files: [
			// 		'<%= config.docs_server %>/{,*/}*.html',
			// 		'<%= config.docs_server %>/static/css/{,*/}*.css',
			// 		'<%= config.docs_server %>/static/js/{,*/}*.js',
			// 		'<%= config.docs_server %>/static/images/{,*/}*',
			// 		'<%= config.docs_server %>/static/fonts/{,*/}*'
			// 	]
			// }
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9007,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'<%= config.docs_server %>'
					]
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [
					{
						dot: true,
						src: [
							'<%= config.dist %>/*',
							'!<%= config.dist %>/.git*'
						]
					}
				]
			},
			docs: {
				files: [
					{
						dot: true,
						src: [
							'<%= config.docs_server %>/*',
							'!<%= config.docs_server %>/.git*'
						]
					}
				]
			}
		},

		// compiles LESS files
		less: {
			gravity_docs: {
				options: {
					relativeUrls: true
				},
				files: {
					'<%= config.docs_server %>/static/gravity-docs/css/docs.css': '<%= config.docs %>/static/less/docs.less'
				}
			}
		},

		// minifies CSS
		cssmin: {
			docs: {
				files: {
					'<%= config.docs_server %>/static/gravity-docs/css/docs.css': [ // target file name
						'<%= config.docs_server %>/static/gravity-docs/css/{,*/}*.css' // source files
					]
				}
			}
		},

		// minifies JS files
		uglify: {
			dist: {
				files: {
					'<%= config.dist %>/gravity.min.js': [ // target file name
						'<%= config.dist %>/gravity.js' // source files
					]
				}
			},
			docs: {
				files: {
					'<%= config.docs_server %>/static/gravity-docs/js/docs-all.min.js': [ // target file name
						'<%= config.docs %>/static/js/{,*/}*.js' // source files
					]
				}
			}
		},

		// concatenates JS files
		concat: {
			gravity: {
				files: {
					'<%= config.dist %>/gravity.js': [ // target file name
						'<%= config.src %>/gravity.js',
						'<%= config.src %>/config.js',
						'<%= config.src %>/{,*/}*.js' // source files
					]
				}
			},
			docs: {
				files: {
					'<%= config.docs_server %>/static/gravity-docs/js/docs-all.js': [ // target file name
						'<%= config.docs %>/static/js/docs.js',
						'<%= config.docs %>/static/js/config.js',
						'<%= config.docs %>/static/js//modules/{,*/}*.js' // source files
					]
				}
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			gravity_dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= config.src %>',
						dest: '<%= config.dist %>',
						src: [ '**' ]
					}
				]
			},
			gravity_docs: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= config.dist %>',
						dest: '<%= config.docs_server %>/static/gravity',
						src: [ '**' ]
					}
				]
			},
			jquery: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= config.lib %>/jquery/dist',
						dest: '<%= config.docs_server %>/static/jquery',
						src: [ '**' ]
					}
				]
			},
			lodash: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= config.lib %>/lodash/dist',
						dest: '<%= config.docs_server %>/static/lodash',
						src: [ '**' ]
					}
				]
			},
			bootstrap: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= config.lib %>/bootstrap/dist',
						dest: '<%= config.docs_server %>/static/bootstrap',
						src: [ '**' ]
					}
				]
			},
			ejspeed: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= config.lib %>/ejspeed',
						dest: '<%= config.docs_server %>/static/ejspeed',
						src: [ 'ejspeed.js' ]
					}
				]
			},
			docs_html: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= config.docs %>',
						dest: '<%= config.docs_server %>',
						src: [
							'index.html',
							'views/**',
							'*.{ico,png,txt,js,json}'
						]
					}
				]
			},
			docs_static: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= config.docs %>/static',
						dest: '<%= config.docs_server %>/static/gravity-docs/',
						src: [
							'images/{,*/}*.*',
							'fonts/{,*/}*.*'
						]
					}
				]
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			docs: [
				'imagemin',
				'svgmin'
			]
		},

		compress: {
			docs: {
				options: {
					mode: 'tgz',
					archive: '<%= config.docs %>/docs.tar.gz'
				},
				files: [
					{src: ['**', '!docs.tar.gz'], dest: 'docs/', cwd: '<%= config.docs %>', expand: true},
					{src: ['**'], dest: 'docs/', cwd: '<%= config.lib %>', expand: true},
					{src: ['**'], dest: 'docs/', cwd: '<%= config.docs_server %>', expand: true}
				]
			}
		}
	});

	grunt.registerTask('gravity-dev', function (target) {
		grunt.task.run([
			'gravity-dist',
			'gravity-docs',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('gravity-docs', function (target) {
		grunt.task.run([
			'clean:docs',
			'copy:gravity_docs',
			'copy:docs_static',
			'copy:docs_html',
			'copy:jquery',
			'copy:ejspeed',
			'copy:lodash',
			'copy:bootstrap',
			'concat:docs',
			'uglify:docs',
			'less:gravity_docs',
			'cssmin:docs'
		]);
	});

	grunt.registerTask('gravity-dist', function (target) {
		grunt.task.run([
			'clean:dist',
			'concat:gravity',
			'uglify:dist'
		]);
	});

	grunt.registerTask('generateSitemap', function () {
		/*
			SITEMAP GENERATOR
			Generates a usable sitemap.js file, with the ability to drive navigations, lists of pages, search, and more :)
			By @joshlangner

			Note: Only supports 2 levels of folders presently. E.g. /primary/Secondary/page.html
		*/
		var done = this.async();
		var fs = require('fs');
		var sitemap = {};
		var output_directory = './docs/static/js/';
		var pages_directory = './docs/pages';

		function walk (dir, callback) {
			var results = [];
			fs.readdir(dir, function (err, list) {
				if (err) return callback(err);

				var pending = list.length;
				if (!pending) return callback(null, results);

				list.forEach(function(file) {
					var fullpath = dir + '/' + file;

					fs.stat(fullpath, function(err, stat) {
						var parentDir = fullpath.substring(pages_directory.length+1, fullpath.indexOf(file)-1);

						if (stat && stat.isDirectory()) {
							if (typeof sitemap[file] === 'undefined') {
								if (parentDir != '/') {
									if (typeof sitemap[parentDir][file] === 'undefined') {
										sitemap[parentDir][file] = {};
									}
								} else {
									sitemap[file] = {};
								}
							}

							var newdir = dir + '/' + file;
							walk(newdir, function(err, res) {
								results = results.concat(res);
								if (!--pending) callback(null, results);
							});

						} else {

							// ALL FILES MUST BE UTF8 encoding
							// meta scripts must be placed at top of file
							var fileText = fs.readFileSync(dir + '/' + file, 'utf8');
							var metatag = '<script type="text/meta">';
							var meta = {};

							var cutfile;
							if (file.indexOf('.html') > -1) {
								cutfile = file.substring(0, file.indexOf('.html'));
							}

							if (fileText.indexOf(metatag) > -1) {
								var metatext = fileText.substring(fileText.indexOf(metatag)+metatag.length*1, fileText.indexOf('</script>'));
								meta = JSON.parse(metatext);
							}

							if (typeof meta.title === 'undefined') { meta.title = cutfile };
							if (typeof meta.desc === 'undefined') { meta.desc = 'No description available.' };
							if (typeof meta.status === 'undefined') { meta.desc = 'unchanged' };

							var objectTempate = {
								'url': fullpath.substring(pages_directory.length+1, fullpath.length),
								'title': meta.title,
								'desc': meta.desc,
								'status': meta.status
							}


							if (parentDir != '/') {
								if (parentDir.indexOf('/') > -1) {
									var currentDir = parentDir.split('/');
									sitemap[currentDir[0]][currentDir[1]][cutfile+''] = objectTempate;
								} else {
									sitemap[parentDir][cutfile+''] = objectTempate;
								}
							}

							file = dir + '/' + file;
							results.push(file);
							if (!--pending) callback(null, results);
						}
					});

				});
			});
		}
		function outputSitemap (data, callback) {
			var sitemapdata = JSON.stringify(data, '', 4);
			var sitemapdata = "var sitemap = " + sitemapdata;
			fs.writeFile(output_directory+'sitemap.js', sitemapdata, function (err) {
				if (err) {
					console.log('There was an error writing the Sitemap file.');
				} else {
					callback();
				}
			});
		}
		walk(pages_directory, function(a, r) {
			outputSitemap(sitemap, function () {
				done();
			});
		});

	});

	grunt.loadNpmTasks('grunt-contrib-less');
	// grunt.loadNpmTasks('grunt-express-server');
};