#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var iconv = require('iconv-lite');
if (typeof process.argv[2] === 'undefined') {
	return console.log('usage: subtitlefixer subtitle.srt [fixed_subtitle.str]');
}
var subtitlePath = process.argv[2];
if (!path.isAbsolute(subtitlePath)) {
	subtitlePath = process.cwd() + '/' + subtitlePath;
}
try {
	fs.accessSync(subtitlePath, fs.constants.F_OK);
} catch (err) {
	return console.log('subtitle not found!');
}
if (path.extname(subtitlePath) !== '.srt') {
	return console.log('file format must be srt!');
}
var content = fs.readFileSync(subtitlePath);
content = iconv.decode(content, 'windows-1256');
if (typeof process.argv[3] !== 'undefined') {
	var subtitleName = process.argv[3];
}
else {
	var subtitleName = subtitlePath.split("/").pop();
	subtitleName = 'fixed_' + subtitleName;
}
fs.writeFileSync(subtitleName, content);
