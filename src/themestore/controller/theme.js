'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let listModel = this.model('list');
    //let guid = listModel.newGUID();
    //let insertId = await listModel.add({theme_uid:guid,theme_name:'test',theme_imgsrc:'test',theme_marking:5.0,theme_tags:'test-a,test-b', theme_description:'test', theme_downloadtimes:2, theme_lastupdated:'2017-06-25'});
    let themelist = await listModel.select();
    this.assign({themelist: themelist});

    //读用户缓存
    let userInfo = await this.session('userInfo');
    this.assign({userInfo:userInfo});

    return this.display();
  }
  async detailAction(){
    //auto render template file index_index.html
    let id = this.get('themename');
    let listModel = this.model('list');
    //let guid = listModel.newGUID();
    //let insertId = await listModel.add({theme_uid:guid,theme_name:'test',theme_imgsrc:'test',theme_marking:5.0,theme_tags:'test-a,test-b', theme_description:'test', theme_downloadtimes:2, theme_lastupdated:'2017-06-25'});
    let data = await listModel.where({theme_name: id}).find();
    var d = new Date(data.theme_lastupdated);  
    data.theme_lastupdated = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
    data.theme_tags = data.theme_tags.split(',');
    data.theme_lastTags = data.theme_tags.pop();
    this.assign({data: data});

    //读用户缓存
    let userInfo = await this.session('userInfo');
    this.assign({userInfo:userInfo});
    
    return this.display();
  }
  downloadAction(){
    let themename = this.get('themename');
    let file = think.RESOURCE_PATH + '/static/theme/'+themename;
    this.download(file);
  }

}