'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
// var sys = require('sys');
var exec = require('child_process').exec;
var async = require('async');
var fs = require('fs');

var DsCodeigniterGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  // prompting: function () {
  //   var done = this.async();

  //   // Have Yeoman greet the user.
  //   this.log(yosay(
  //     'Welcome to the wondrous DsCodeigniter generator!'
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
    app: function () {
      this.log('Cloning modded codeignter files..');

      var done = this.async();
      var isUpdate = fs.existsSync('.git');

      if(!isUpdate) {
        // async.series([
        //   function(callback) {
        //     exec('git init');
        //     this.log('Repository initialized');

        //     callback(null);
        //   }.bind(this),
        //   function(callback) {
        //     exec('git submodule add https://github.com/mihai-scurtu/base-codeigniter.git modules/codeigniter');
        //     this.log('Submodule added');

        //     callback(null);
        //   }.bind(this),
        //   function(callback) {
        //     exec('git submodule init');
        //     this.log('Submodules initialized');

        //     callback(null);
        //   }.bind(this),
        //   function(callback) {
        //     exec('git submodule update');
        //     this.log('Submodules added');

        //     callback(null);
        //   }.bind(this),
        //   function(callback) {
        //     this.dest.mkdir('application');
        //     // this.dest.copy('modules/codeigniter/application', 'application');

        //     this.dest.mkdir('system');
        //     this.dest.copy('modules/codeigniter/system', 'system');

        //     this.dest.copy('modules/codeigniter/index.php', 'index.php');

        //     done();
        //     callback(null);
        //   }.bind(this)
        // ]);
        exec('git init');
        this.log('Repository initialized');

        exec('git submodule add https://github.com/mihai-scurtu/base-codeigniter.git modules/codeigniter');
        this.log('Submodule added');

        exec('git submodule init');
        this.log('Submodules initialized');

        exec('git submodule update');
        this.log('Submodules added');

        this.log(fs.existsSync('modules'));

        this.dest.mkdir('application');
        // this.dest.copy('modules/codeigniter/application', 'application');

        this.dest.mkdir('system');
        this.dest.copy('modules/codeigniter/system', 'system');

        this.dest.copy('modules/codeigniter/index.php', 'index.php');
      }

      // exec('git clone https://github.com/mihai-scurtu/base-codeigniter.git .', function(error, stdout, stderr) {
      //   if(error !== null) {
      //     this.log('Error: ' + stderr);
      //   } else {
      //     this.log('Cloning successful');
      //   }

      //   done();
      // }.bind(this));

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = DsCodeigniterGenerator;
