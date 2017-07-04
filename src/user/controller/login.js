'use strict';

import Base from './base.js';
import request from 'request';
import qs from 'qs';
let oauth = {
  client_id:'efaf9351830c99050b36',
  client_secret:'de4650427964ecce1b35cd41ccbed8907b7e5fd4',
  redirect_uri:'http://127.0.0.1:8360/user/login/callback'
};
let url = 'https://github.com/login/oauth/access_token';
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
  async callbackAction(){
    //auto render template file index_index.html
    oauth.code = this.get('code');
    oauth.state = this.get('state');

    let token = await getAccessToken();
    let userInfo = await getUserInfo(token);
    //设置session
    await this.session('userInfo',userInfo);
	this.assign({userInfo:userInfo});
	return this.display();
	
  }

  async logoutAction(){
    //清除session
    await this.session('userInfo','');
    this.success();
  }
}
function getUserInfo(token){
	return new Promise(function(resolve, reject) {
		return request.get({
			url: "https://api.github.com/user?access_token="+token.access_token+"&scope=public_repo%2Cuser&token_type=bearer",
			headers: {
				"User-Agent": "@KateLee"
			}
		}, function(err, httpResponse, body) {
			if(err) reject(Error(err));
			var res=JSON.parse(body);
			//if(!(res = JSON.parse(body))) reject(Error(body));
			return resolve(res);
		});
	})
}
function getAccessToken(){
	return new Promise(function(resolve, reject) {
		request.post({
			url:url,
			headers: { "Accept": "application/json" },
			form:oauth
	    },function(err,res,body){
	    	if(err) reject(Error(err));
			var res = JSON.parse(body);
			if(res.access_token) resolve(res);
			else reject(Error(res));    	
	    });
	});
}