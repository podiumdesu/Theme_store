 'use strict';

import Base from './base.js';
import linq from 'linq';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let currentUrl = this.http.url;//方便详情页返回
    let search = this.get('search');
    let searchType = this.get('searchType');
    let themeList = {},sessionList;
    let type = this.get('type')?this.get('type'):'theme_downloadtimes';
    let page = this.get('page')?this.get('page'):'1';
    if(search){
      let searchText = '%'+search+'%';
      if(searchType === 'tags'){
        themeList = await this._listModel.where({theme_tags: ['like', searchText]}).page(page,9).order([type+' DESC']).countSelect();
        sessionList = await this._listModel.where({theme_tags: ['like', searchText]}).order([type+' DESC']).select();
      }
      else{
        themeList = await this._listModel.where({'theme_name|theme_tags|theme_description|theme_authorname':['like',searchText]}).page(page,9).order([type+' DESC']).countSelect();
        sessionList = await this._listModel.where({'theme_name|theme_tags|theme_description|theme_authorname':['like',searchText]}).order([type+' DESC']).select();
        this.assign({search:{state:true,length:themeList.data.length}})
      }
    }
    else{
      themeList = await this._listModel.page(page,9).order([type+' DESC']).countSelect();
      sessionList = await this._listModel.order([type+' DESC']).select();
      let array = [];
      for(let i = 1;i <= themeList.totalPages;i++){
        array.push(i);
      }
      this.assign({page:array});
    }
    await this.session('type',type);
    await this.session('sessionList',sessionList);
    this.assign({themelist:themeList,CurrentPageName:'Theme List',currentUrl:encodeURIComponent(currentUrl)});
    return this.display();
  }

  async detailAction(){
    //获取当前排序下的所有列表
    let type = await this.session('type') || 'theme_downloadtimes',
        sessionList = await this.session('sessionList'),
        list = sessionList || await this._listModel.order([type+' DESC']).select();
    //获取跳转前的url
    let url = this.get('state') || '/themestore/theme/index/type/'+type;
    let themename = encodeURIComponent(this.get('themename'));
    let data = await this._listModel.getData(themename);//当前页面的data
    let min = list[list.length-1].theme_name,max = list[0].theme_name,minstr='',maxstr='';
    if(min===themename) data.step='last';
    if(max===themename) data.step='first';

    //let pagestate = this.get('pagestate');//方便详情页返回上一页用
    await this.session('data',data);// /mytheme/rank中使用
    this.assign({data: data,CurrentPageName:themename,type:type,url:url}); 
    return this.display();
  }

  async stepAction(){
    //获取当前排序下的所有列表
    let type = await this.session('type') || 'theme_downloadtimes',
        sessionList = await this.session('sessionList'),
        list = sessionList || await this._listModel.order([type+' DESC']).select();

    let param = this.get();
    let {themename,step,id} = param;
    let data = await this.session('data');
    if(think.isEmpty(data)){
      data = await this._listModel.getData(themename);
    }
    if(step === 'before'){
      data =  linq.from(list).where("x=>x."+type+">"+data[type]+" || x."+type+"==="+data[type]+" && x.theme_id < "+id).orderBy("x=>x."+type).thenByDescending("x=>x.theme_id").toArray()[0];
      //data = await this._listModel.where(type+'>'+data[type]+' or '+type+'='+data[type]+' and theme_id <'+id).order([type+' ASC,theme_id DESC']).find();
    }
    else if(step === 'next'){
      data =  linq.from(list).where("x=>x."+type+"<"+data[type]+" || x."+type+"==="+data[type]+" && x.theme_id > "+id).orderByDescending("x=>x."+type).thenBy("x=>x.theme_id").toArray()[0];
      //data = await this._listModel.where(type+'<'+data[type]+' or '+type+'='+data[type]+' and theme_id >'+id).order([type+' DESC,theme_id ASC']).find();
    }
    themename = data.theme_name;
    return this.redirect('/themestore/theme/detail/themename/'+encodeURIComponent(themename));
  }

  async downloadAction(){
    let filename = this.get('filename');
    let times = parseInt(this.get('times'))+1;
    let file = think.RESOURCE_PATH + '/static/theme/'+encodeURIComponent(filename);
    let affectedRows = await this._listModel.where({theme_filesrc:encodeURIComponent(filename)}).update({theme_downloadtimes:times})
    this.download(file);
  }
}
//线上版本存在问题：
//上传中文主题不行
//日期默认是0000-00-00，然后自动变成NAN
//线上版本如何长期运行