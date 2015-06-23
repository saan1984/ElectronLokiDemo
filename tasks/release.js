'use strict';

var gulp = require('gulp');
var utils = require('./utils');

var releaseForOs = {
    windows: require('./release_windows'),
};

gulp.task('release', ['build'], function () {
    return releaseForOs[utils.os()]();
});
