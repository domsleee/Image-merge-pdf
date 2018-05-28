module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist/js/bundle.js': ['src/js/*.js']
        }
      }
    },
    cssmin: {
      my_target: {
        files: [{
          expand:true,
          cwd:"src/css",
          src:["*.css"],
          dest:"dist/css/",
          ext:".min.css"
        }]
      }
    },
    shell: {
      deploy: {
        command: './deploy.sh'
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*.js", "src/**/*.css"],
        tasks: ["default"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("default", ["browserify", "cssmin"]);
  grunt.registerTask("deploy", ["browserify", "cssmin", "shell"]);
};