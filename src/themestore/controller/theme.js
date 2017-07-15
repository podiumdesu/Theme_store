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
    let themelist = await listModel.select();
    this.assign({themelist: themelist});
    return this.display();
  }
  async detailAction(){
    //auto render template file index_index.html
    let id = this.get('themename');
    let listModel = this.model('list');
    let data = await listModel.where({theme_name: id}).find();
    var d = new Date(data.theme_lastupdated);  
    data.theme_lastupdated = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
    data.theme_tags = data.theme_tags.split(',');
    data.theme_lastTags = data.theme_tags.pop();
    this.assign({data: data}); 
    return this.display();
  }
  downloadAction(){
    let themename = this.get('themename');
    let file = think.RESOURCE_PATH + '/static/theme/'+themename;
    this.download(file);
  }

}