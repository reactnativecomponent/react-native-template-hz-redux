import React from 'react';
import {Linking,Dimensions} from 'react-native';
import moment from 'moment';
require('moment/locale/zh-cn.js');
const colors = ['#E74C3C', '#C0392B', '#1ABC9C',
	'#16A085', '#2ECC71', '#27AE60', '#3498DB',
	'#2980B9', '#9B59B6', '#8E44AD', '#34495E',
	'#2C3E50', '#E67E22',
	'#D35400', '#7F8C8D'];


function getRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}


export function parseImgUrl(url) {
	if (/^\/\/.*/.test(url)) {
		url = 'http:' + url
	}
	return url
}


export function genColor() {
	return colors[getRandomNum(0, colors.length - 1)];
}


export function link(url) {
	Linking.canOpenURL(url).then(supported=> {
			if (supported) {
				return Linking.openURL(url)
			}
		})
		.catch(err=> {
			console.error('An error occurred', err);
		})
}
export function getFaceAction(size=3) {
	//let arr = [];
	let arr = [1,2,3,4];
	//if(Platform.OS === '')
	//	let arr = [1,2,3,4];
	let out = [];
	while(out.length < size){
		var temp = (Math.random()*arr.length) >> 0;
		out.push(arr.splice(temp,1)[0]);
	}
	return out;
}
export function toDecimal2(x) { //格式化
	var f = parseFloat(x);
	if (isNaN(f)) {
		return '0.00';
	}
	var f = Math.round(x*100)/100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
}
export function MillisecondToTime(msd) {
	let s = parseInt(msd % 60);
	var m = parseInt(msd/60);
	return m+':'+s;
}
export function formatMoney(v) {
	if(v<10000){
		return v;
	}else{
		let rv = (v/10000);
		let s = rv.toString();
		if(s.indexOf('.') < 0){
			return rv + "万";
		}else{
			return rv.toFixed(2)+"万";
		}
	}
}
export  function isNum(v){
	if(!!v && v.indexOf(".") > -1){
		let fv = v.substring(v.indexOf(".")+1);
		if(fv.length > 0){
			if(fv.length > 2){
				return v.substring(0,v.indexOf(".")+3);
			}
			let t = v.substring(0,v.indexOf("."));
			if(!/[\d]{1,2}/.test(fv)){
				if(isNaN(parseInt(t))){
					return '0.';
				}
				return t+'.';
			}
			if(!/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(v)){
				return toDecimal2(v);
			}
		}
		return parseFloat(v);
	}
	return v.replace(/[^\d]/g,'');
	//if(/^d*(?:.d{0,2})?$/.test(v)){
	//	return v;
	//}
	//return '0.00';
	//if(!!v){
	//	return v == 0 || new RegExp("^[1-9]{1}[0-9]{0,8}$|^[1-9]{1}[0-9]{0,8}\\.[0-9]{1,2}$|^0\\.[0-9]{1,2}$").test(v);
	//}
	//return false;

}
export function getRouterByName(key,routers = []){
	let name = '';
	routers.map(res=>{
		if(res.routeName === key){
			name =  res.routeName;
		}
	});
	return name;
}
export function getLength(str){
    return str.replace(/[^\x00-\xff]/g,"aa").length;
}


const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

const basePx = 375;

export function px2dp(px) {
	return px *  deviceW / basePx;
}
export function showTime(msgDate){
	let nowDate = new Date();
	let result = "";
	let startTime = nowDate.getDay();
	let endTime = msgDate.getDay();

	//let dates = startTime - endTime;

	let d = moment.duration(moment(nowDate,'YYYYMMDD').diff(moment(msgDate,"YYYYMMDD")));
	let dates = Math.round(d.asDays());
	if(dates <= 1 && startTime === endTime) //同一天,显示时间
	{
		result = moment(msgDate).format("HH:mm");
	}
	else if(dates === 1)//昨天
	{
		result = moment(msgDate).format("昨天 HH:mm");
	}
	//else if(nowDateComponents.day == (msgDateComponents.day+2)) //前天
	//{
	//	result = moment(msgDate).format("ddd, hA");
	//}
	else if(dates < 7)//一周内
	{
		result = moment(msgDate).locale("zh-cn").format("dddd HH:mm");
	}else//显示日期
	{
		result = moment(msgDate).format("YYYY年MM月DD HH:mm");
	}
	return result;

}

export function getTimeStr(msgDate) {
	let tpInt =  parseInt(msgDate.getTime())
	let tp=new Date(tpInt);
	let now = new Date();
	let nowInt = now.getTime()

	let hour = tp.getHours()
	let minute = tp.getMinutes()
	let hmstr = ' ';
	if(hour < 10)
		hmstr += "0";
	hmstr += hour + ":";
	if (minute < 10)
		hmstr += '0';
	hmstr += minute;
	let result = '';

	let onedayTimeIntervalValue = 24*60*60*1000
	let gapTime = nowInt - tpInt;

	if (gapTime < onedayTimeIntervalValue * 3 && gapTime > 0) {

		if(gapTime <=onedayTimeIntervalValue){
			var isSameDay = tp.getDay() === now.getDay();
			result = isSameDay ?result+hmstr
				:'昨天'+result+hmstr;
		}
		else if(gapTime <=onedayTimeIntervalValue*2)//昨天
		{

			result =  '昨天 '+result+hmstr
		}
		else if(gapTime <=onedayTimeIntervalValue*3) //前天
		{
			result = '前天 '+result+hmstr
		}
	}else if(gapTime <=onedayTimeIntervalValue*7 && gapTime > 0){

		switch (tp.getDay()){
			case 0:
				result = '星期日';
				break;
			case 1:
				result =  '星期一';
				break;
			case 2:
				result =  '星期二';
				break;
			case 3:
				result =  '星期三';
				break;
			case 4:
				result =  '星期四';
				break;
			case 5:
				result =  '星期五';
				break;
			case 6:
				result =  '星期六';
				break;
		}
		result = result + hmstr;
	}else{
		// result =showDetail?Format(tp,"yyyy-MM-dd hh:mm"): Format(tp,"yyyy/MM/dd");
		result = Format(now,"yyyy-MM-dd hh:mm")

	}
	return result
}


function  Format(date,fmt)
{ //author: meizz
	var o = {
		"M+" : date.getMonth()+1,                 //月份
		"d+" : date.getDate(),                    //日
		"h+" : date.getHours(),                   //小时
		"m+" : date.getMinutes(),                 //分
		"s+" : date.getSeconds(),                 //秒
		"q+" : Math.floor((date.getMonth()+3)/3), //季度
		"S"  : date.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	return fmt;
}

// 示例用法
/*

 var str1 = "tie, mao, 55";
 var str2 = "tie, mao, csdn";
 var result = diff(str1, str2, ','); // 对象
 var rs = "" + result;   // " 55, csdn"
 var df1 = result.diff1; // [" 55"]
 var df2 = result.diff2; // [" csdn"]

 */

// 比较2个字符串内元素的不同(字符1, 字符2, 分隔符可选)
export function diff(str1, str2, separator){
	//
	str1 = str1 || "";
	str2 = str2 || "";
	separator = separator || ",";
	// arr中有ele元素
	function hasElement(arr, ele){
		// 内存循环
		var hasItem1 = false;
		for(var i2=0; i2 < arr.length; i2++){
			//
			var item2 = arr[i2] || "";
			if(!item2){
				continue;
			}
			//
			if(ele == item2){
				hasItem1 = true;
				break;
			}
		}
		return hasItem1;
	};
	function inAnotB(a, b){ // 在A中，不在B中
		var res = [];
		for(var i1=0; i1 < a.length; i1++){
			var item1 = a[i1] || "";
			if(!item1){
				continue;
			}
			var hasItem1 = hasElement(b, item1);
			if(!hasItem1){
				res.push(item1);
			}
		}
		return res;
	};
	//
	var list1 = str1.split(",");
	var list2 = str2.split(",");
	//
	var diff1 = inAnotB(list1, list2);
	var diff2 = inAnotB(list2, list1);

	// 返回结果
	var result = {
		diff1 : diff1
		,
		diff2 : diff2
		,
		separator : separator
		,
		toString : function(){
			//
			var res = this["diff1"].slice(0);
			res = res.concat(this["diff2"]);
			//
			return res.join(this["separator"]);
		}
	};
	//
	return result;
};
export function getMonthData(){
    let arr = [];
    for(let i = 1;i<=28;i++){
        arr.push(
			<Picker.Item key={i} label={'每月'+i+'日'} value={i} />
        );
    }
    return arr;
}