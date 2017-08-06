/*
 *使用jsonp获取外部数据
 */
 import originJsonp from 'jsonp'
 // var originJsonp=require("jsonp");
 //向外抛出方法
export default function jsonp(url,data,option){
 	url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
 	return new Promise((resolve,reject) => {
 		originJsonp(url,option,(err,data) => {
 			if(!err){
 				resolve(data)
 			}else{
 				reject(err)
 			}
 		})
 	})
 }	
 //处理地址
export function param(data) {
	let url = ''
	for (var k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += '&' + k + '=' + encodeURIComponent(value)
	}
	return url ? url.substring(1) : ''
 }
