'use strict';
/**
 * model
 */
export default class extends think.model.base {
	async getData(themename,mmuid){
		let data = await this.where({themename: themename,mumuid:mmuid}).find();
		return data;
	}
}