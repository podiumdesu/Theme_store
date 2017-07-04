'use strict';

import Base from './base.js';
import path from 'path';
import fs from 'fs';
import qs from 'qs';

const readFileAsync = think.promisify(fs.readFile, fs);

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let release = path.join(think.RESOURCE_PATH, 'release/.latest');
    let version = false;
    let themeModel = this.model('theme');
    version = await readFileAsync(release).catch(() => false);
    this.assign({latest: version});


    //auto render template file index_index.html

    let param = qs.stringify({
      client_id: 'efaf9351830c99050b36',
      redirect_uri: 'http://127.0.0.1:8360/user/login/callback',
      scope: 'user,public_repo',
      state: "true" || ""
    });
    this.assign({param:param});

    //读缓存
    let userInfo = await this.session('userInfo');
    this.assign({userInfo:userInfo})
    return this.display();
  }
}