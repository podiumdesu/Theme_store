'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
   async __before(){
   	this._userInfo = await this.session('userInfo');
    this._listModel = this.model('list');
   	this.assign('userInfo',this._userInfo);
   }

}