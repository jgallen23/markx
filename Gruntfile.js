module.exports = function(grunt) {

  require('grunt-load-config')(grunt);

  grunt.registerTask('default', ['jshint', 'simplemocha']);
};
