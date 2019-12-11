#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

let cwd = process.cwd();

let cdFiles = [];
let testFiles = [];
let fileCab;

fs.readdir(process.cwd(), (err, files) => {
  if(err) {console.log(err);}

  if(files) {
    cdFiles = files;
    removeFileExtensions(cdFiles);
    fileCab = sortFiles(cdFiles);
    let toDo = matchFiles(fileCab);
    console.log(toDo);
  }
})

function removeFileExtensions(fileArray) {
  for(let i = 0; i < fileArray.length; i++) {
    fileArray[i] = fileArray[i].split('.')[0];
  }
}

function sortFiles(fileArray){
  let sortedFiles = {testFiles:[],classFiles:[]};
  for(let i = 0; i < fileArray.length; i++) {
    if(fileArray[i].toLowerCase().includes('test')) {
      sortedFiles.testFiles.push(fileArray[i]);
    } else {
      sortedFiles.classFiles.push(fileArray[i]);
    }
  }
  return sortedFiles;
}

function matchFiles(sortedFiles) {
  let toDo = [];
  for(let i = 0; i < sortedFiles.classFiles.length; i++) {
    if(!matchFile(sortedFiles.classFiles[i], sortedFiles.testFiles)) {
      toDo.push(sortedFiles.classFiles[i]);
    }
  }
  return toDo;
}

function matchFile(file, testFiles) {
  let found = false;
  for(let i = 0; i < testFiles.length; i++) {
    if(testFiles[i].toLowerCase().includes(file.toLowerCase())) {
      found = true;
      break;
    }
  }
  return found;
}
