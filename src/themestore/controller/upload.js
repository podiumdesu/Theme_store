'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip'

let uid = new GUID();

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    return this.display();
  }    

  async themeAction(){

    let themeList = this.model('list');
    let user = this.model('user');
    let userInfo = await this.session('userInfo');
    let currentUser = await user.where({user_loginname:userInfo.login}).find();//当前用户信息


    let themefile = this.file('themename');
    let filepath = themefile.path;//为防止上传的时候因文件名重复而覆盖同名已上传文件，path是MD5方式产生的随机名称
    let uploadpath = think.RESOURCE_PATH + '/static/theme';
    //let imgpath = think.RESOURCE_PATH + '/static/img';
    think.mkdir(uploadpath);//如果没有，创建该目录
    //think.mkdir(imgpath);
    //提取出用 ‘/' 隔开的path的最后一部分。

    let fileArr =  ['screenshot.png','package.json','index.html','post.html','page.html','tag.html','search.html','archive.html'];
    let fileObj = await getFileObj(filepath);
    let originalFilename = themefile.originalFilename;
    let end = originalFilename.length - 4;
    let themeName = originalFilename.slice(0,end);
    //我觉得不应该用themeName，要不然在上传文件处说明:请将您的主题文件放在一个以您主题名命名文件夹内，并压缩成*.zip格式上传
    //或者在页面里再单独添加一个字段，主题名，单独验证
    //验证是否存在同名主题
    let theme = await themeList.where({theme_name:themeName}).find();
    if(theme) this.fail(1000,'已存在同名主题！')

    let aa = true;
    fileArr.forEach((item,index,arr)=>{
      if(!fileObj.hasOwnProperty(themeName+'/'+item)) return aa = false;
    });
    if(!aa) this.fail(1000,'缺少必要的文件！');
    else {
      //添加数据
      let jsonFile = fileObj[themeName+'/package.json'];
      let jsonContent = await getFileContent(jsonFile,'string');//读json文件
      let jsonObj = JSON.parse(jsonContent);
      let name =jsonObj.name;

      
      //读取图片信息，图片另存
      let imgFile = fileObj[themeName+'/screenshot.png'];
      let imgContent = await getFileContent(imgFile,'nodebuffer');
      fs.writeFileSync(think.RESOURCE_PATH + '/static/img/'+name+'.png', imgContent);
      let myDate = new Date();
      let insertId = await themeList.add({theme_uid:uid.newGUID(),theme_authoruid:currentUser.user_uid,
        theme_version:jsonObj.version,theme_filesrc:name+'.zip',theme_name:name,theme_imgsrc:name,theme_marking:0.0,theme_tags:jsonObj.tags,
        theme_description:jsonObj.description,theme_downloadtimes:0,theme_lastupdated:myDate.toLocaleDateString()});

      //let basename = themefile.originalFilename;//因为本系统不允许上传同名主题，所以文件名就直接使用主题名
      //将上传的文件（路径为filepath的文件）移动到第二个参数所在的路径，并改为第二个参数的文件名。
      fs.renameSync(filepath, uploadpath + '/' + name+'.zip');
      themefile.path = uploadpath + '/' + name;
    // //img buffer对象形式
    // let jsonBuffer = fileObj[themeName+'/firekylin.png']._data.compressedContent;
    // this.type('image/png');
    // this.end(jsonBuffer);
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
//获取某个文件信息
function getFileContent(zipObject,type){
  return new Promise(function(resolve,reject){
    zipObject.async(type).then(function(content){
      resolve(content);
    });
  });
}
function GUID() {
 this.date = new Date();
 /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
 if (typeof this.newGUID != 'function') {
   /* 生成GUID码 */
   GUID.prototype.newGUID = function() {
     this.date = new Date();
     var guidStr = '';
     var sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
     var sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
     for (var i = 0; i < 9; i++) {
       guidStr += Math.floor(Math.random()*16).toString(16);
     }
     guidStr += sexadecimalDate;
     guidStr += sexadecimalTime;
     while(guidStr.length < 32) {
       guidStr += Math.floor(Math.random()*16).toString(16);
     }
     return this.formatGUID(guidStr);
   }

   /*
    * 功能：获取当前日期的GUID格式，即8位数的日期：19700101
    * 返回值：返回GUID日期格式的字条串
    */
   GUID.prototype.getGUIDDate = function() {
     return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
   }

   /*
    * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
    * 返回值：返回GUID日期格式的字条串
    */
   GUID.prototype.getGUIDTime = function() {
     return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero( parseInt(this.date.getMilliseconds() / 10 ));
   }

   /*
   * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现
    * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串
    * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串
    */
   GUID.prototype.addZero = function(num) {
     if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
       return '0' + Math.floor(num);
     } else {
       return num.toString();
     }
   }

   /* 
    * 功能：将y进制的数值，转换为x进制的数值
    * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10
    * 返回值：返回转换后的字符串
    */
   GUID.prototype.hexadecimal = function(num, x, y) {
     if (y != undefined) {
       return parseInt(num.toString(), y).toString(x);
     } else {
       return parseInt(num.toString()).toString(x);
     }
   }

   /*
    * 功能：格式化32位的字符串为GUID模式的字符串
    * 参数：第1个参数表示32位的字符串
    * 返回值：标准GUID格式的字符串
    */
   GUID.prototype.formatGUID = function(guidStr) {
     var str1 = guidStr.slice(0, 8) + '-',
       str2 = guidStr.slice(8, 12) + '-',
       str3 = guidStr.slice(12, 16) + '-',
       str4 = guidStr.slice(16, 20) + '-',
       str5 = guidStr.slice(20);
     return str1 + str2 + str3 + str4 + str5;
   }
 }
}