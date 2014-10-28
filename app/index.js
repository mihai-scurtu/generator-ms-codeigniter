'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
// var sys = require('sys');
var exec = require('child_process').exec;
var async = require('async');
var fs = require('fs');

var MsCodeigniterGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.copyRecursive = function(src, dest) {
      this.src.recurse(src, function(abspath, rootdir, subdir, filename) {
        var filePath = (subdir ? subdir + '/' : '') + filename
        this.src.copy(src + filePath, dest + filePath);
      }.bind(this));
    }
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  // prompting: function () {
  //   var done = this.async();

  //   // Have Yeoman greet the user.
  //   this.log(yosay(
  //     'Welcome to the wondrous MsCodeigniter generator!'
  //   ));

  //   var prompts = [{
  //     type: 'confirm',
  //     name: 'someOption',
  //     message: 'Would you like to enable this option?',
  //     default: true
  //   }];

  //   this.prompt(prompts, function (props) {
  //     this.someOption = props.someOption;

  //     done();
  //   }.bind(this));
  // },

  writing: {
    codeigniter: function() {
      this.copyRecursive('codeigniter/application/', 'application/');
      this.copyRecursive('codeigniter/system/', 'system/');
      this.copyRecursive('codeigniter/static/', 'static/');
      this.src.copy('codeigniter/index.php', 'index.php');
      this.src.copy('codeigniter/.htaccess', '.htaccess');
    },

    app: function () {
      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      // this.src.copy('editorconfig', '.editorconfig');
      // this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = MsCodeigniterGenerator;
