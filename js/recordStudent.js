/**
 * @author zyx
 */
//var resultsWithSomeRecord = "";
//var resultsIndex = 0;
//var resultsLen = 0;

function checkAndSubmit() {
	if (document.getElementsByName("schoolZone1")[0].value == 0) {
		alert("请选择校区！");
		return false;
	}
	if (document.getElementsByName("grade")[0].value == 0) {
		alert("请选择年级！");
		return false;
	}
	return true;
}

function clearOutTime() {
	document.getElementsByName("outTime")[0].value = "";
}

function getSchoolZone(index) {
	var num = 0;
	var text = "";

	// 多校区只有校长才能够设置，其它人不允许操作
	if (GetCookie('role') != '9') {
		document.getElementsByName("schoolZone2")[0].value = 0;
		document.getElementsByName("schoolZone3")[0].value = 0;
	}

	if (index == 1) {
		num = document.getElementsByName("schoolZone1")[0].value;
		if (num > 0) {
			text = document.getElementsByName("schoolZone1")[0].options[num].text + num;
			document.getElementsByName("schoolZone1Copy")[0].value = text;
		} else {
			document.getElementsByName("schoolZone1Copy")[0].value = "";
		}
	}
	if (index == 2) {
		num = document.getElementsByName("schoolZone2")[0].value;
		if (num > 0) {
			text = document.getElementsByName("schoolZone2")[0].options[num].text + num;
			document.getElementsByName("schoolZone2Copy")[0].value = text;
		} else {
			document.getElementsByName("schoolZone2Copy")[0].value = "";
		}
	}
	if (index == 3) {
		num = document.getElementsByName("schoolZone3")[0].value;
		if (num > 0) {
			text = document.getElementsByName("schoolZone3")[0].options[num].text + num;
			document.getElementsByName("schoolZone3Copy")[0].value = text;
		} else {
			document.getElementsByName("schoolZone3Copy")[0].value = "";
		}
	}
}

function sqlRecord() {
	var xmlhttp;
	if (document.getElementsByName("userName1")[0].value == "") {
		alert("学生姓名为空，不能查询！");
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

				var ret = xmlhttp.responseText;

				if (ret == "0") {
					document.getElementsByName("submitAdd")[0].disabled = false;
					document.getElementsByName("submitDelete")[0].disabled = true;
					document.getElementsByName("submitUpdate")[0].disabled = true;
					alert("该学生姓名不存在，可以创建一个新学生信息！");
				}
				/* else
				  if (ret == "2") {
				 document.getElementsByName("submitAdd")[0].disabled = true;
				 document.getElementsByName("submitUpdate")[0].disabled = true;
				 document.getElementsByName("submitDelete")[0].disabled = true;
				 alert("检查到该学生姓名有多条记录，请联系管理员！");
				 } */
				else {
					document.getElementsByName("submitAdd")[0].disabled = false;
					document.getElementsByName("submitUpdate")[0].disabled = false;
					document.getElementsByName("submitDelete")[0].disabled = false;
					document.getElementsByName("previous")[0].disabled = true;
					document.getElementsByName("next")[0].disabled = true;

					var info = eval(ret);

					resultsWithSomeRecord = info;
					resultsIndex = 0;
					resultsLen = 0;
					for (var tmp in resultsWithSomeRecord) {
						resultsLen++;
					}

					if (resultsLen == 1) {
						document.getElementsByName("previous")[0].disabled = true;
						document.getElementsByName("next")[0].disabled = true;
					} else if (resultsLen > 1) {
						alert("查询到有多名同名学生存在，请使用“上一个”“下一个”进行选择！");
						document.getElementsByName("previous")[0].disabled = false;
						document.getElementsByName("next")[0].disabled = false;
					}

					document.getElementsByName("userID")[0].value = 'x' + info[0].uid;
					document.getElementsByName("userName1")[0].value = info[0].name1;
					document.getElementsByName("userName2")[0].value = info[0].name2;
					document.getElementsByName("password")[0].value = info[0].passWD;
					document.getElementsByName("sex")[0].options[info[0].sex].selected = true;
					if (info[0].schoolZone1 != "") {
						var index = info[0].schoolZone1.substr(-1, 1);
						document.getElementsByName("schoolZone1")[0].options[index].selected = true;
					}
					getSchoolZone(1);
					if (info[0].schoolZone2 != "") {
						index = info[0].schoolZone2.substr(-1, 1);
						document.getElementsByName("schoolZone2")[0].options[index].selected = true;
					}
					getSchoolZone(2);
					if (info[0].schoolZone3 != "") {
						index = info[0].schoolZone3.substr(-1, 1);
						document.getElementsByName("schoolZone3")[0].options[index].selected = true;
					}
					getSchoolZone(3);
					document.getElementsByName("school1")[0].value = info[0].school1;
					document.getElementsByName("school2")[0].value = info[0].school2;
					document.getElementsByName("grade")[0].value = info[0].grade;
					if (parseInt(info[0].grade) >= 13) {
						document.getElementsByName("grade")[0].value = 13;
					}
					document.getElementsByName("class")[0].value = info[0].class;
					document.getElementsByName("studentWX")[0].value = info[0].studentWX;
					document.getElementsByName("studentQQ")[0].value = info[0].studentQQ;
					document.getElementsByName("studentTel")[0].value = info[0].studentTel;
					document.getElementsByName("motherTel")[0].value = info[0].motherTel;
					document.getElementsByName("motherWX")[0].value = info[0].motherWX;
					document.getElementsByName("fatherTel")[0].value = info[0].fatherTel;
					document.getElementsByName("fatherWX")[0].value = info[0].fatherWX;
					document.getElementsByName("address")[0].value = info[0].address;

					var inTime = dateJS("Y-M-d", info[0].inTime);
					document.getElementsByName("inTime")[0].value = inTime;
					var outTime = dateJS("Y-M-d", info[0].outTime);
					document.getElementsByName("outTime")[0].value = outTime;
					if (info[0].outTime == "") {
						document.getElementsByName("outTime")[0].value = "";
					}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}
	};
	// 3发出http请求
	// 去除姓名中的所有空格
	var str = document.getElementsByName("userName1")[0].value;
	str = str.replace(/\s+/g, "");
	var url = "recordStudent.php";
	url = url + "?userName1=" + encodeURIComponent(str);
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);

}

function recordWithSameName(flag) {

	if (flag == 'next') {
		if (resultsIndex < resultsLen - 1) {
			resultsIndex++;
		} else {
			alert("已经是最后一位同名学生！");
		}
	} else if (flag == 'previous') {
		if (resultsIndex > 0) {
			resultsIndex--;
		} else {
			alert("已经是第一位同名学生！");
		}
	}
	document.getElementsByName("userID")[0].value = 'x' + resultsWithSomeRecord[resultsIndex].uid;
	document.getElementsByName("userName1")[0].value = resultsWithSomeRecord[resultsIndex].name1;
	document.getElementsByName("userName2")[0].value = resultsWithSomeRecord[resultsIndex].name2;
	document.getElementsByName("sex")[0].options[resultsWithSomeRecord[resultsIndex].sex].selected = true;
	if (resultsWithSomeRecord[resultsIndex].schoolZone1 != "") {
		var index = resultsWithSomeRecord[resultsIndex].schoolZone1.substr(-1, 1);
		document.getElementsByName("schoolZone1")[0].options[index].selected = true;
	}
	getSchoolZone(1);
	if (resultsWithSomeRecord[resultsIndex].schoolZone2 != "") {
		index = resultsWithSomeRecord[resultsIndex].schoolZone2.substr(-1, 1);
		document.getElementsByName("schoolZone2")[0].options[index].selected = true;
	}
	getSchoolZone(2);
	if (resultsWithSomeRecord[resultsIndex].schoolZone3 != "") {
		index = resultsWithSomeRecord[resultsIndex].schoolZone3.substr(-1, 1);
		document.getElementsByName("schoolZone3")[0].options[index].selected = true;
	}
	getSchoolZone(3);
	document.getElementsByName("school1")[0].value = resultsWithSomeRecord[resultsIndex].school1;
	document.getElementsByName("school2")[0].value = resultsWithSomeRecord[resultsIndex].school2;
	document.getElementsByName("grade")[0].value = resultsWithSomeRecord[resultsIndex].grade;
	document.getElementsByName("class")[0].value = resultsWithSomeRecord[resultsIndex].class;
	document.getElementsByName("studentWX")[0].value = resultsWithSomeRecord[resultsIndex].studentWX;
	document.getElementsByName("studentQQ")[0].value = resultsWithSomeRecord[resultsIndex].studentQQ;
	document.getElementsByName("studentTel")[0].value = resultsWithSomeRecord[resultsIndex].studentTel;
	document.getElementsByName("motherTel")[0].value = resultsWithSomeRecord[resultsIndex].motherTel;
	document.getElementsByName("motherWX")[0].value = resultsWithSomeRecord[resultsIndex].motherWX;
	document.getElementsByName("fatherTel")[0].value = resultsWithSomeRecord[resultsIndex].fatherTel;
	document.getElementsByName("fatherWX")[0].value = resultsWithSomeRecord[resultsIndex].fatherWX;
	document.getElementsByName("address")[0].value = resultsWithSomeRecord[resultsIndex].address;

	var time = dateJS("Y-M-d", resultsWithSomeRecord[resultsIndex].time);
	document.getElementsByName("time")[0].value = time;
}

function initPage() {
	var xmlhttp;

	// 1创建AJAX对象
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 2指定回调函数
	xmlhttp.onreadystatechange = function() {
		// 4接收响应数据，处理服务器返回的信息
		// 判断对象状态是否交互完成，如果为4则交互完成
		if (xmlhttp.readyState == 4) {
			// 判断对象状态是否交互成功,如果成功则为200
			if (xmlhttp.status == 200) {
				// 接收数据,得到服务器输出的XML数据

				var ret = xmlhttp.responseText;

				if (ret == "0") {
					// document.getElementsByName("submitAdd")[0].disabled =
					// false;
					// document.getElementsByName("schoolZone")[0].readOnly =
					// true;
					// document.getElementsByName("submitDelete")[0].disabled =
					// true;
					// document.getElementsByName("submitUpdate")[0].disabled =
					// true;
					alert("系统内无校区信息，请在[校长设置]中录入后重新查看！");
				} else if (ret == "2") {
					// document.getElementsByName("submitAdd")[0].disabled =
					// true;
					alert("检查到该校区名有多条记录，请联系管理员！");
				} else {
					// document.getElementsByName("submitAdd")[0].disabled =
					// true;
					var info = eval(ret);

					var obj1 = document.getElementsByName("schoolZone1")[0];
					var obj2 = document.getElementsByName("schoolZone2")[0];
					var obj3 = document.getElementsByName("schoolZone3")[0];
					var i = 0;
					for (var tmp in info) {
						obj1.options.add(new Option(info[i].schoolZone, i + 1));
						obj2.options.add(new Option(info[i].schoolZone, i + 1));
						obj3.options.add(new Option(info[i].schoolZone, i + 1));
						i++;
					}

					// obj.options.add(new Option(info[0].schoolZone, "value"));
					// obj.options.add(new Option(info[1].schoolZone, "value"));
					// obj.options.add(new Option(info[2].schoolZone, "value"));
					// 默认填写当前日期
					document.getElementsByName("inTime").value = getNowFormatDate();

					// 校区负责人只负责自己校区的事
					if (GetCookie('role') == '8') {
						// 先清除原来的
						var obj = document.getElementsByName("schoolZone1")[0];
						for ( i = 1; i < obj.options.length; ) {
							obj.removeChild(obj.options[i]);
						}
						// 填写教师姓名
						//document.getElementsByName("teacher")[0].value = decodeURIComponent(GetCookie('userName'));
						var schoolZone = new Array();
						schoolZone[0] = decodeURIComponent(GetCookie('schoolZone1'));
						schoolZone[1] = decodeURIComponent(GetCookie('schoolZone2'));
						schoolZone[2] = decodeURIComponent(GetCookie('schoolZone3'));
						schoolZone[3] = decodeURIComponent(GetCookie('schoolZone4'));
						schoolZone[4] = decodeURIComponent(GetCookie('schoolZone5'));
						i = 0;
						for (var tmp in info) {
							for (var j = 0; j < 5; j++) {
								if (schoolZone[j] == info[i].schoolZone) {
									document.getElementsByName("schoolZone1")[0].options.add(new Option(info[i].schoolZone, info[i].id));
								}
							}
							i++;
						};
					}

				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "recordStudent.php";
	url = url + "?school1=1";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function GetCookie(sName) {
	var aCookie = document.cookie.split("; ");
	for (var i = 0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
			//return unescape(aCrumb[1]);
			return (aCrumb[1]);
	}
	return null;
}