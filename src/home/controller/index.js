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

    //读用户缓存
    let userInfo = await this.session('userInfo');
    this.assign({userInfo:userInfo});
    return this.display();
  }
}