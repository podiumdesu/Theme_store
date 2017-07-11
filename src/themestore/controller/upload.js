'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip'

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html

    //读用户缓存
    let userInfo = await this.session('userInfo');
    this.assign({userInfo:userInfo});
    return this.display();
  }    

  async themeAction(){
    let themefile = this.file('themename');
    let filepath = themefile.path;//为防止上传的时候因文件名重复而覆盖同名已上传文件，path是MD5方式产生的随机名称
    let uploadpath = think.RESOURCE_PATH + '/static/theme';
    let that = this;
    think.mkdir(uploadpath);//创建该目录
    //提取出用 ‘/' 隔开的path的最后一部分。

    let fileArr =  ['screenshot.png','package.json','index.html','post.html','page.html','tag.html','search.html','archive.html'];
    let fileObj = await getFileObj(filepath);
    let originalFilename = themefile.originalFilename;
    let end = originalFilename.length - 4;
    let themename = originalFilename.slice(0,end).toLowerCase();
    let aa = true;
    fileArr.forEach((item,index,arr)=>{
      if(!fileObj.hasOwnProperty(themename+'/'+item)) return aa = false;
    });
    if(!aa) this.fail(1000,'缺少必要的文件！');
    else {
      //let basename = themefile.originalFilename;//因为本系统不允许上传同名主题，所以文件名就直接使用主题名
      //将上传的文件（路径为filepath的文件）移动到第二个参数所在的路径，并改为第二个参数的文件名。
      fs.renameSync(filepath, uploadpath + '/' + originalFilename);
      themefile.path = uploadpath + '/' + originalFilename;
      this.success();
    } 
  }
}
//获取压缩文件信息
function getFileObj(path){
  return new Promise(function (resolve,reject){
    fs.readFile(path, function(err, data) {
      if (err) throw err;
      JSZip.loadAsync(data).then(function (zip) {
          let fileObj = zip.files;
          resolve(fileObj);
      });
    });
  });
}