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
    return this.display();
  }
  async detailAction(themeName){
    //auto render template file index_index.html
    let listModel = this.model('list');
    //let guid = listModel.newGUID();
    //let insertId = await listModel.add({theme_uid:guid,theme_name:'test',theme_imgsrc:'test',theme_marking:5.0,theme_tags:'test-a,test-b', theme_description:'test', theme_downloadtimes:2, theme_lastupdated:'2017-06-25'});
    let themelist = await listModel.select();
    this.assign({themelist: themelist});
    return this.display();
  }
}