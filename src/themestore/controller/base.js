'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
   async __before(){
   	this._userInfo = await this.session('userInfo');
    this._listModel = this.model('list');
    this._clientId = 'efaf9351830c99050b36';
   	this.assign('userInfo',this._userInfo);
   	this.assign({clientId:this._clientId,state:encodeURIComponent(this.http.url)});
   }

}