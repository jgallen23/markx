module.exports = function(grunt) {

  require('load-grunt-config')(grunt);

  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('dev', ['default', 'watch']);
};
