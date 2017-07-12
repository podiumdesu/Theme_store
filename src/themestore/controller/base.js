'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
   async __before(){
   	let userInfo = await this.session('userInfo');
   	// if(think.isEmpty(userInfo)){
   	// 	return this.redirect('/user/login/index')
   	// }
   	this.assign('userInfo',userInfo);
   }

}