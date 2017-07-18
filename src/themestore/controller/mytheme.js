'use strict';

import Base from './loginbase.js';
import fs from 'fs';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let listModel = this.model('list');
    let userInfo = await this.session('userInfo');
    let themelist = await listModel.where({theme_authoruid: userInfo.user_uid}).select();
    this.assign({themelist: themelist});
    return this.display();
  }

  async downloadAction(){
    let themename = this.get('themename');
    let times = parseInt(this.get('times'))+1;
    let file = think.RESOURCE_PATH + '/static/theme/'+themename;
    let affectedRows = await this._listModel.where({theme_filesrc:themename}).update({theme_downloadtimes:times})
    this.download(file);
  }

  async deleteAction(){
    let fileSrc = this.post('filesrc');
    let listModel = this.model('list');
    let currentPath = think.RESOURCE_PATH + '/static/theme/' + fileSrc;
    fs.unlinkSync(currentPath);
    let affectedRows = await listModel.where({theme_filesrc: fileSrc}).delete();
    if (affectedRows) this.success();
    else this.fail();
  }
}