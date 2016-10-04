/**
 * JS之间其实不用包含，在php页面中先后包含两个js文件即可
 */

// 有多条记录的查询，共用变量，使用上一个下一个进行选择
var resultsWithSomeRecord = "";
var resultsIndex = 0;
var resultsLen = 0;

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentDate = year + seperator1 + month + seperator1 + strDate;
	var currentDateTime = year + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes();
	var currentDateTimeWithSecond = year + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
	return currentDate;
}

function getYear0FormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var year = date.getFullYear();
	/*
	 var month = date.getMonth() + 1;
	 var strDate = date.getDate();
	 if (month >= 1 && month <= 9) {
	 month = "0" + month;
	 }
	 if (strDate >= 0 && strDate <= 9) {
	 strDate = "0" + strDate;
	 }
	 */
	var currentDate = year + seperator1 + "01" + seperator1 + "01";
	return currentDate;
}

function getNowFormatDateTime() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentDate = year + seperator1 + month + seperator1 + strDate;
	var currentDateTime = year + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes();
	var currentDateTimeWithSecond = year + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
	return currentDateTime;
}

// 自定义时间显示
function getCustomFormatDateTime(tagName, timePeriod) {
	var dateStr = document.getElementsByName(tagName)[0].value;

	var newstr = dateStr.replace(/-/g, '/');
	var date = new Date(newstr);
	var time = parseInt(date.getTime().toString().substr(0, 10)) + timePeriod * 60;
	var timeStr = time.toString();

	var str = dateJS('Y-m-d H:i', timeStr);

	return str;
}

// function sqlClassStudentInfo() {
// alert("d");
// document.getElementsByName("backtoGradeName")[0].disabled = false;
// }

function checkClassRecord() {
	var id = document.getElementsByName("userID")[0].value;
	if (id == "") {
		alert("<学生ID>为必填项，请重新输入");
		return false;
	}
	if (parseInt(id) <= 1000) {
		alert("<学生ID>须大于1000，请重新输入");
		return false;
	}
	var userName = document.getElementsByName("userName")[0].value;
	if (userName == "") {
		alert("<姓名>为必填项，请重新输入");
		return false;
	}
	var schoolZone = document.getElementsByName("schoolZone")[0].value;
	if (parseInt(schoolZone) == 0) {
		alert("<校区>为必填项，请重新输入");
		return false;
	}
	var classTimePeriod = document.getElementsByName("classTimePeriod")[0].value;
	if (classTimePeriod == 0) {
		alert("<课时长>为必填项，请重新输入");
		return false;
	}
	var time = document.getElementsByName("time")[0].value;
	if (time == "") {
		alert("<签到时间>为必填项，请重新输入");
		return false;
	}
	var course = document.getElementsByName("course")[0].value;
	if (parseInt(course) == 0) {
		alert("<科目>为必填项，请重新输入");
		return false;
	}
	var teacherName = document.getElementsByName("teacherName")[0].value;
	if (teacherName == "") {
		alert("<教师姓名>为必填项，请重新输入");
		return false;
	}
	var attendence = document.getElementsByName("attendence")[0].value;
	if (parseInt(attendence) == 0) {
		alert("<考勤情况>为必填项，请重新输入");
		return false;
	}
}

function checkFee() {
	var id = document.getElementsByName("userID")[0].value;
	if (id == "") {
		alert("<学生ID>为必填项，请重新输入");
		return false;
	}
	if (parseInt(id) <= 1000) {
		alert("<学生ID>须大于1000，请重新输入");
		return false;
	}
	var userName = document.getElementsByName("userName")[0].value;
	if (userName == "") {
		alert("<姓名>为必填项，请重新输入");
		return false;
	}

	var fee = document.getElementsByName("fee")[0].value;
	if (fee == "") {
		alert("<交费金额>为必填项，请重新输入");
		return false;
	}
	if (isNaN(fee)) {
		alert("<交费金额>为全数字，请重新输入");
	}

	var time = document.getElementsByName("time")[0].value;
	if (time == "") {
		alert("<交费时间>为必填项，请重新输入");
		return false;
	}
	var receiptNum = document.getElementsByName("receiptNum")[0].value;
	if (receiptNum == "") {
		alert("<收据编号>为必填项，请重新输入");
		return false;
	}
	if (isNaN(receiptNum)) {
		alert("<收据编号>为全数字，请重新输入");
	}
	var billNum = document.getElementsByName("billNum")[0].value;
	if (billNum == "") {
		alert("<票号>为必填项，请重新输入");
		return false;
	}
	if (isNaN(billNum)) {
		alert("<票号>为全数字，请重新输入");
	}

	var schoolZone = document.getElementsByName("schoolZone")[0].value;
	if (parseInt(schoolZone) == 0) {
		alert("<校区>为必填项，请重新输入");
		return false;
	}
	var classType = document.getElementsByName("classType")[0].value;
	if (parseInt(classType) == 0) {
		alert("<班课类型>为必填项，请重新输入");
		return false;
	}

	var fee = document.getElementsByName("fee")[0].value;
	var feeMath = document.getElementsByName("feeMath")[0].value;
	var feeMathDoc = document.getElementsByName("feeMathDoc")[0].value;
	var feeChinese = document.getElementsByName("feeChinese")[0].value;
	var feeChineseDoc = document.getElementsByName("feeChineseDoc")[0].value;
	var feeEnglish = document.getElementsByName("feeEnglish")[0].value;
	var feeEnglishDoc = document.getElementsByName("feeEnglishDoc")[0].value;
	var feePhysics = document.getElementsByName("feePhysics")[0].value;
	var feePhysicsDoc = document.getElementsByName("feePhysicsDoc")[0].value;
	var feeChemistry = document.getElementsByName("feeChemistry")[0].value;
	var feeChemistryDoc = document.getElementsByName("feeChemistryDoc")[0].value;

	//document.writeln(fee);
	var feeSum = (parseFloat(feeMath) + parseFloat(feeMathDoc)) + (parseFloat(feeChinese) + parseFloat(feeChineseDoc)) + (parseFloat(feeEnglish) + parseFloat(feeEnglishDoc)) + (parseFloat(feePhysics) + parseFloat(feePhysicsDoc)) + (parseFloat(feeChemistry) + parseFloat(feeChemistryDoc));
	//document.writeln(feeSum);
	if (feeSum <= 0) {
		alert("<分科>至少填写一项");
		return false;
	}

	if (parseFloat(fee) == feeSum) {
		//alert("金额核对正确，已提交");
		return true;
	} else {
		alert("金额核对错误，未提交");
		return false;
	}
}

function checkRecordTeacher() {
	var id = document.getElementsByName("userID")[0].value;
	if (id == "") {
		alert("<教师ID>为必填项，请重新输入");
		return false;
	}
	if (parseInt(id) > 1000) {
		alert("<教师ID>须小于1000，请重新输入");
		return false;
	}
	var userName = document.getElementsByName("userName")[0].value;
	if (userName == "") {
		alert("<姓名>为必填项，请重新输入");
		return false;
	}
	var sex = document.getElementsByName("sex")[0].value;
	if (parseInt(sex) == 0) {
		alert("<性别>为必填项，请重新输入");
		return false;
	}
	var schoolZone = document.getElementsByName("schoolZone")[0].value;
	if (parseInt(schoolZone) == 0) {
		alert("<校区>为必填项，请重新输入");
		return false;
	}
	var bankCardNumber = document.getElementsByName("bankCardNumber")[0].value;
	if (bankCardNumber == "") {
		alert("<工资卡卡号>为必填项，请重新输入");
		return false;
	}
	if (isNaN(bankCardNumber)) {
		alert("<工资卡卡号>为全数字，请重新输入");
	}
	var bank = document.getElementsByName("bank")[0].value;
	if (bank == "") {
		alert("<工资卡银行>为必填项，请重新输入");
		return false;
	}
	var bankCardUser = document.getElementsByName("bankCardUser")[0].value;
	if (bankCardUser == "") {
		alert("<工资卡持卡人>为必填项，请重新输入");
		return false;
	}
	var teacherTel = document.getElementsByName("teacherTel")[0].value;
	if (teacherTel == "") {
		alert("<教师电话>为必填项，请重新输入");
		return false;
	}
	if (isNaN(teacherTel)) {
		alert("<教师电话>为全数字，请重新输入");
	}
	var time = document.getElementsByName("time")[0].value;
	if (time == "") {
		alert("<报名时间>为必填项，请重新输入");
		return false;
	}

	var Math = document.getElementsByName("courseMath")[0];
	var Chinese = document.getElementsByName("courseChinese")[0];
	var English = document.getElementsByName("courseEnglish")[0];
	var Physics = document.getElementsByName("coursePhysics")[0];
	var Chemistry = document.getElementsByName("courseChemistry")[0];

	if ((!Math.checked) && (!Chinese.checked) && (!English.checked) && (!Physics.checked) && (!Chemistry.checked)) {
		alert("<班课种类>为至少选择一项，请重新输入");
		return false;
	}
}

function checkRecordStudent() {
	var id = document.getElementsByName("userID")[0].value;
	if (id == "") {
		alert("<学生ID>为必填项，请重新输入");
		return false;
	}
	if (parseInt(id) <= 1000) {
		alert("<学生ID>须大于1000，请重新输入");
		return false;
	}
	var userName = document.getElementsByName("userName")[0].value;
	if (userName == "") {
		alert("<姓名>为必填项，请重新输入");
		return false;
	}
	var sex = document.getElementsByName("sex")[0].value;
	if (parseInt(sex) == 0) {
		alert("<性别>为必填项，请重新输入");
		return false;
	}
	var schoolZone = document.getElementsByName("schoolZone")[0].value;
	if (parseInt(schoolZone) == 0) {
		alert("<校区>为必填项，请重新输入");
		return false;
	}
	var classTime = document.getElementsByName("classTime")[0].value;
	if (parseInt(classTime) == 0) {
		alert("<课时类型>为必填项，请重新输入");
		return false;
	}
	var classType = document.getElementsByName("classType")[0].value;
	if (parseInt(classType) == 0) {
		alert("<班课类型>为必填项，请重新输入");
		return false;
	}

	var time = document.getElementsByName("time")[0].value;
	if (time == "") {
		alert("<报名时间>为必填项，请重新输入");
		return false;
	}

	var Math = document.getElementsByName("courseMath")[0];
	var Chinese = document.getElementsByName("courseChinese")[0];
	var English = document.getElementsByName("courseEnglish")[0];
	var Physics = document.getElementsByName("coursePhysics")[0];
	var Chemistry = document.getElementsByName("courseChemistry")[0];

	if ((!Math.checked) && (!Chinese.checked) && (!English.checked) && (!Physics.checked) && (!Chemistry.checked)) {
		alert("<班课种类>为至少选择一项，请重新输入");
		return false;
	}

	//setTimeout('alert("sss")',200);
	//setTimeout(showName(),2000);
}

// 查询教师姓名是否存在
function sqlExistTeacherName() {
	var xmlhttp;
	if (document.getElementsByName("teacherName")[0].value == "") {
		return;
	}
	// 1创建AJAX对象
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 2指定回调函数
	xmlhttp.onreadystatechange = function() {
		// 4接收响应数据，处理服务器返回的信息
		//判断对象状态是否交互完成，如果为4则交互完成
		if (xmlhttp.readyState == 4) {
			//判断对象状态是否交互成功,如果成功则为200
			if (xmlhttp.status == 200) {
				//接收数据,得到服务器输出的XML数据
				var response = xmlhttp.responseXML;

				if (response.getElementsByTagName("teacherName")[0].childNodes[0].nodeValue == 0) {
					document.getElementsByName("submitAdd")[0].disabled = true;
					document.getElementsByName("submitDelete")[0].disabled = true;
					document.getElementsByName("submitUpdate")[0].disabled = true;
					alert("查询无此教师姓名，请核对");
				} else if (response.getElementsByTagName("teacherName")[0].childNodes[0].nodeValue > 1) {
					document.getElementsByName("submitAdd")[0].disabled = true;
					document.getElementsByName("submitDelete")[0].disabled = true;
					document.getElementsByName("submitUpdate")[0].disabled = true;
					alert("教师档案有错，有多个人的姓名相同！请去《教师档案》中处理！");
				} else {
					// 教师姓名存在且唯一的话，不提示，直接输入到数据库中
					document.getElementsByName("teacherName")[0].value = response.getElementsByTagName("teacherName")[0].childNodes[0].nodeValue;
					document.getElementsByName("submitAdd")[0].disabled = false;
					document.getElementsByName("submitDelete")[0].disabled = false;
					document.getElementsByName("submitUpdate")[0].disabled = false;
					alert("教师姓名存在于数据库中，可以填写！");
				}
			}
		}
	};
	// 3发出http请求
	// 去除姓名中的所有空格
	var str = document.getElementsByName("teacherName")[0].value;
	str = str.replace(/\s+/g, "");
	var url = "classRecord.php";
	url = url + "?name=" + str;
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function sqlNameByID() {
	var xmlhttp;
	if (document.getElementsByName("userID")[0].value == "") {
		return;
	}
	// 1创建AJAX对象
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 2指定回调函数
	xmlhttp.onreadystatechange = function() {
		// 4接收响应数据，处理服务器返回的信息
		//判断对象状态是否交互完成，如果为4则交互完成
		if (xmlhttp.readyState == 4) {
			//判断对象状态是否交互成功,如果成功则为200
			if (xmlhttp.status == 200) {
				//接收数据,得到服务器输出的XML数据
				var response = xmlhttp.responseXML;

				if (response.getElementsByTagName("userName")[0].childNodes[0].nodeValue == 0) {
					document.getElementsByName("userName")[0].value = "";
					alert("查询无此ID，请核对");
				} else if (response.getElementsByTagName("userName")[0].childNodes[0].nodeValue > 1) {
					alert("学生档案有错，有多个人的ID相同！请去《学生档案》中处理！");
				} else {
					//得到姓名后，显示在姓名表单中
					document.getElementsByName("userName")[0].value = response.getElementsByTagName("userName")[0].childNodes[0].nodeValue;
				}
			}
		}
	};
	// 3发出http请求
	var url = "classRecord.php";
	url = url + "?uid=" + document.getElementsByName("userID")[0].value;
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// 导出表格到CSV
function exportToCSV(aLink, tableID) {
	// var str = "栏位1,栏位2,栏位3\n值1,值2,值3";
	//var str = "报表类型,一对一查询,";

	var str = GetInfoFromTable(tableID);
	str = encodeURIComponent(str);
	aLink.href = "data:text/csv;charset=utf-8,\ufeff" + str;

	/*
	 var str = GetInfoFromTable(tableID);

	 if (window.navigator.msSaveOrOpenBlob) {
	 var csvContent = "data:text/csv;charset=utf-8,\ufeff" + str;

	 var blob = new Blob([ decodeURIComponent(encodeURI(csvContent))], {
	 //type : "text/csv;charset=utf-8,;"
	 });
	 navigator.msSaveBlob(blob, 'subject.csv');
	 } else {
	 var str = GetInfoFromTable(tableID);
	 str = encodeURIComponent(str);
	 aLink.href = "data:text/csv;charset=utf-8,\ufeff" + str;
	 }
	 */
}

// 获得整个表格的具体内容并返回字符串
function GetInfoFromTable(tableid) {
	var tableInfo = "";
	var strtmp = "";
	var tableObj = document.getElementById(tableid);

	for (var i = 0; i < tableObj.rows.length; i++) {//遍历Table的所有Row
		for (var j = 0; j < tableObj.rows[i].cells.length; j++) {//遍历Row中的每一列
			strtmp = tableObj.rows[i].cells[j].innerHTML;

			tableInfo += strtmp;
			//获取Table中单元格的内容
			tableInfo += ",";
		}

		// 一行结束后要加换行，否则表格不换行
		tableInfo += "\n";
	}
	// alert(index);
	//alert(tableInfo);
	return tableInfo;
}

function showName() {
	//document.getElementsByName('userName')[0].value = "中工";
}

// JS中，日期时间格式转Unix时间戳
function datetime_to_unix(datetime) {
	var tmp_datetime = datetime.replace(/:/g, '-');
	tmp_datetime = tmp_datetime.replace(/ /g, '-');
	var arr = tmp_datetime.split("-");
	var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
	return parseInt(now.getTime() / 1000);
}

/*
// JS中，日期时间格式转Unix时间戳
function unix_to_datetime(unix) {
var now = new Date(parseInt(unix) * 1000);
return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}
*/

/**
 * 和PHP一样的时间戳格式化函数
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 * dateJS('Y-m-d','1350052653');//很方便的将时间戳转换成了2012-10-11
 * dateJS('Y-m-d H:i:s','1350052653');//得到的结果是2012-10-12 22:37:33
 */
function dateJS(format, timestamp) {
	var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
	var pad = function(n, c) {
		if (( n = n + "").length < c) {
			return new Array(++c - n.length).join("0") + n;
		} else {
			return n;
		}
	};
	var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var txt_ordin = {
		1 : "st",
		2 : "nd",
		3 : "rd",
		21 : "st",
		22 : "nd",
		23 : "rd",
		31 : "st"
	};
	// var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var txt_months = ["", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	var f = {
		// Day
		d : function() {
			return pad(f.j(), 2)
		},
		D : function() {
			return f.l().substr(0, 3)
		},
		j : function() {
			return jsdate.getDate()
		},
		l : function() {
			return txt_weekdays[f.w()]
		},
		N : function() {
			return f.w() + 1
		},
		S : function() {
			return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
		},
		w : function() {
			return jsdate.getDay()
		},
		z : function() {
			return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
		},
		// Week
		W : function() {
			var a = f.z(), b = 364 + f.L() - a;
			var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
			if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
				return 1;
			} else {
				if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
					nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
					return date("W", Math.round(nd2.getTime() / 1000));
				} else {
					return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
				}
			}
		},
		// Month
		F : function() {
			return txt_months[f.n()]
		},
		m : function() {
			return pad(f.n(), 2)
		},
		M : function() {
			return f.F().substr(0, 3)
		},
		n : function() {
			return jsdate.getMonth() + 1
		},
		t : function() {
			var n;
			if (( n = jsdate.getMonth() + 1) == 2) {
				return 28 + f.L();
			} else {
				if (n & 1 && n < 8 || !(n & 1) && n > 7) {
					return 31;
				} else {
					return 30;
				}
			}
		},
		// Year
		L : function() {
			var y = f.Y();
			return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
		},
		//o not supported yet
		Y : function() {
			return jsdate.getFullYear()
		},
		y : function() {
			return (jsdate.getFullYear() + "").slice(2)
		},
		// Time
		a : function() {
			return jsdate.getHours() > 11 ? "pm" : "am"
		},
		A : function() {
			return f.a().toUpperCase()
		},
		B : function() {
			// peter paul koch:
			var off = (jsdate.getTimezoneOffset() + 60) * 60;
			var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
			var beat = Math.floor(theSeconds / 86.4);
			if (beat > 1000)
				beat -= 1000;
			if (beat < 0)
				beat += 1000;
			if ((String(beat)).length == 1)
				beat = "00" + beat;
			if ((String(beat)).length == 2)
				beat = "0" + beat;
			return beat;
		},
		g : function() {
			return jsdate.getHours() % 12 || 12
		},
		G : function() {
			return jsdate.getHours()
		},
		h : function() {
			return pad(f.g(), 2)
		},
		H : function() {
			return pad(jsdate.getHours(), 2)
		},
		i : function() {
			return pad(jsdate.getMinutes(), 2)
		},
		s : function() {
			return pad(jsdate.getSeconds(), 2)
		},
		//u not supported yet
		// Timezone
		//e not supported yet
		//I not supported yet
		O : function() {
			var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
			if (jsdate.getTimezoneOffset() > 0)
				t = "-" + t;
			else
				t = "+" + t;
			return t;
		},
		P : function() {
			var O = f.O();
			return (O.substr(0, 3) + ":" + O.substr(3, 2))
		},
		//T not supported yet
		//Z not supported yet
		// Full Date/Time
		c : function() {
			return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
		},
		//r not supported yet
		U : function() {
			return Math.round(jsdate.getTime() / 1000)
		}
	};
	return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
		if (t != s) {
			// escaped
			ret = s;
		} else if (f[s]) {
			// a date function exists
			ret = f[s]();
		} else {
			// nothing special
			ret = s;
		}
		return ret;
	});
}