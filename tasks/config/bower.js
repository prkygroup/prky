/**
 * Loads bower installed packages into the dependency positions that sails
 * expects depencies to be in for dynamically including them in html files where
 * <!--SCRIPTS-->
 * <!--SCRIPTS END->
 * is specified
 */
module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
        dest: '.tmp/public',
        js_dest: '.tmp/public/js/dependencies',
        css_dest: '.tmp/public/styles'
    }
  });

  grunt.loadNpmTasks('grunt-bower');

};