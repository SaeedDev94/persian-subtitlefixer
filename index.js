#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

const subtitlePath = process.argv[2];
const fixedName = process.argv[3];

const cli = {
  fixedName,
  validate: function () {
    // arg
    if (!subtitlePath) {
      console.log('Usage: subtitlefixer subtitle.srt [fixed_name.str]');
      return false;
    }
    // path
    if (!fs.existsSync(subtitlePath)) {
      console.log('Subtitle not found!');
      return false;
    }
    // extension
    if (path.extname(subtitlePath) !== '.srt') {
      console.log('Subtitle must be srt!');
      return false;
    }
    return true;
  },
  setFixedName: function () {
    if (!this.fixedName) {
      const subtitleName = subtitlePath.split('/').pop();
      this.fixedName = `fixed_${subtitleName}`;
    }
  },
  fixSubtitle: function () {
    const fixedContent = iconv.decode(fs.readFileSync(subtitlePath), 'windows-1256');
    fs.writeFileSync(this.fixedName, fixedContent);
    console.log(`Fixed:`, this.fixedName);
  },
  run: function () {
    if (!this.validate()) {
      return;
    }
    this.setFixedName();
    this.fixSubtitle();
  }
};

cli.run();
