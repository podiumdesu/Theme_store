'use strict';

import Base from '../../themestore/controller/loginbase.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    this.assign({CurrentPageName:'Personal Center'});
    return this.display();
  }
  async updateAction(){
    let formInfo = this.post();
    let userList = this.model('user');
    let list = this.model('list');
    let userInfo = await this.session('userInfo');
    let affectedRows = await userList.where({user_uid: userInfo.user_uid}).update({user_name:formInfo.inputNickname,user_mailbox:formInfo.inputEmail,user_tellphone:formInfo.inputTell,user_city:formInfo.inputCity});
    //更新ts_list中对应的theme_authorname
    let affectedRows2 = await list.where({theme_authoruid:userInfo.user_uid}).update({theme_authorname:formInfo.inputNickname});
    //更新缓存
    let user = await userList.where({user_loginname: userInfo.user_loginname}).find();
    //user.user_name = decodeURIComponent(user.user_name);
    //user.user_city = decodeURIComponent(user.user_city);
    await this.session('userInfo',user);
    //let user = await this.session('userInfo');
    this.success();
  }
}
