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
    let userInfo = await this.session('userInfo');
    let affectedRows = await userList.where({user_loginname: userInfo.user_loginname}).update({user_name:formInfo.inputNickname,user_mailbox:formInfo.inputEmail,user_tellphone:formInfo.inputTell,user_city:formInfo.inputCity});
    //更新缓存
    let user = await userList.where({user_loginname: userInfo.user_loginname}).find();
    await this.session('userInfo',user);
    let user = await this.session('userInfo');
    this.success();
  }
}