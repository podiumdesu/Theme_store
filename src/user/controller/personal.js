'use strict';

import Base from './base.js';
import request from 'request';
import qs from 'qs';
//var request = require("request");

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  // indexAction(){
  //   //auto render template file index_index.html
  //   this.end('<a href="'+github.getAuthorizeUrl()+'">Login with Github</a>');
// }
  async indexAction(){
  	
	return this.display();
	
  }

}