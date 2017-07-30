 'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let search = this.get('search');
    let searchType = this.get('searchType');
    let themeList = {};
    if(search){
      let searchText = '%'+search+'%';
      if(searchType === 'tags')
      themeList.data = await this._listModel.where({theme_tags: ['like', searchText]}).select();
      else
      themeList.data = await this._listModel.where({'theme_name|theme_tags|theme_description|theme_authorname':['like',searchText]}).select();
      this.assign({search:{state:true,length:themeList.data.length}})
    }
    else{
      let type = this.get('type')?this.get('type'):'theme_downloadtimes';
      let page = this.get('page')?this.get('page'):'1';
      themeList = await this._listModel.page(this.get('page'),9).order([type+' DESC']).countSelect();
      let array = [];
      for(let i = 1;i <= themeList.totalPages;i++){
        array.push(i);
      }
      this.assign({page:array});
    }
    this.assign({themelist:themeList,CurrentPageName:'Theme List'});
    return this.display();
  }

  async detailAction(){
    //auto render template file index_index.html
    let themename = this.get('themename');
    let pagestate = this.get('pagestate');//方便详情页返回上一页用
    let data = this._listModel.getData(themename);
    this.assign({data: data,pagestate:pagestate,CurrentPageName:themename}); 
    return this.display();
  }

  async downloadAction(){
    let themename = this.get('themename');
    let times = parseInt(this.get('times'))+1;
    let file = think.RESOURCE_PATH + '/static/theme/'+themename;
    let affectedRows = await this._listModel.where({theme_filesrc:themename}).update({theme_downloadtimes:times})
    this.download(file);
  }
}