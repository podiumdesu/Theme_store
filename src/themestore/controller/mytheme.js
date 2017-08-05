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
    this.assign({themelist: themelist,CurrentPageName:'My Theme'});
    return this.display();
  }

  async deleteAction(){
    let fileSrc = decodeURIComponent(this.post('filesrc'));
    let listModel = this.model('list');
    let currentPath = think.RESOURCE_PATH + '/static/theme/' + fileSrc;
    fs.unlinkSync(currentPath);
    let affectedRows = await listModel.where({theme_filesrc: fileSrc}).delete();
    if (affectedRows) this.success();
    else this.fail();
  }

  async rankAction(){
    let markModel = this.model('mark');
    let rank = parseInt(this.post('rank'));
    let themename = this.post('themename');
    let mmuid = this.post('mmuid');
    let data = await this._listModel.getData(themename);
    let markInfo = await markModel.getData(themename,mmuid);
    ++data.theme_markingnum;
    if(!think.isEmpty(markInfo)){
      return this.fail('You have marked this theme!');
    }
    rank = (data.theme_marking*data.theme_markingnum+rank)/(data.theme_markingnum);
    rank = rank.toFixed(1);
    let affectedRows = await markModel.add({themename: themename,mumuid:mmuid,marking: rank});
    await this._listModel.where({theme_name:themename}).update({theme_marking:rank,theme_markingnum:data.theme_markingnum});
    this.success({rank:rank,markingnum:data.theme_markingnum});
  }
}