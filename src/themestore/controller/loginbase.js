'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
   async __before(){
   	this._userInfo = await this.session('userInfo');
      this._listModel = this.model('list');
      this._clientId = 'efaf9351830c99050b36';
      this.assign({clientId:this._clientId,state:this.http.url});
       if(think.isEmpty(this._userInfo)){
         return this.fail();
       }
      this.assign('userInfo',this._userInfo);
   }

}