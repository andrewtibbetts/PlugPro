var gulp = require('gulp');
var config = require('../config');

var concat = require('gulp-concat');
var template = require('gulp-template-compile');

gulp.task('jst', function() {
	gulp.src( config.jst.src )
		.pipe(
			template({
				namespace: 'plugPro"]["JST' // This is completely ridiculous
			})
		)
		.pipe( concat("templates.js") )
		.pipe( gulp.dest( config.js.src ) );
});