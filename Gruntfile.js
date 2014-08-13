'use strict';
module.exports = function (grunt) {
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
		var output_directory = './app/static/js/';
		var pages_directory = './app/pages';

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
