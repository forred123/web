/**
 * @author zyx
 */
var uid = 0;
var resultsIndex = 0;
var resultsLen = 0;
var resultBasicStudent;
var maxCourseNum = 10;
var courseLoad = new Array();

function sqlSome() {
	sqlBasic();
}

function sqlClass(uid) {
	// 顺序为：出勤次数－请假次数－旷课次数－扣费总额
	var staticResultClass = new Array(0, 0, 0, 0);

	var timeStart = document.getElementsByName("timeStart")[0].value;
	if (timeStart == "") {
		timeStart = "%";
	}
	var timeEnd = document.getElementsByName("timeEnd")[0].value;
	if (timeEnd == "") {
		timeEnd = "%";
	}
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

				removeRow('sqlClassTable');

				if (ret == "0") {
					alert("该学生无上课记录，请核对查询条件！");
				} else {
					info = eval(ret);

					appendRowHeaderClass(sqlClassTable);

					var i = 0;
					for (var tmp in info) {
						appendRowClass(info[i], i);

						if (info[i].attendance == "出勤") {
							staticResultClass[0] += 1;
						} else if (info[i].attendance == "请假") {
							staticResultClass[1] += 1;
						} else if (info[i].attendance == "旷课") {
							staticResultClass[2] += 1;
						}

						// 扣费总额
						if (info[i].product == "一对一") {
							staticResultClass[3] += parseInt(info[i].price) * parseInt(info[i].period) / 60.0;
						} else if (info[i].product == "班课") {
							staticResultClass[3] += parseInt(info[i].price);
						}

						//staticResultClass[3] += parseInt(info[i].price);

						i++;
					}

					appendRowStatisticClass(sqlClassTable, staticResultClass);
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlSome.php";
	url = url + "?sqlClass=1" + "&uid=" + uid.toString() + "&timeStart=" + timeStart + "&timeEnd=" + timeEnd;

	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function sqlFee(uid) {
	// 顺序为：记录条数－总费用－数学费用－语文费用－英语费用－物理费用－化学费用
	var staticResultFee = new Array();
	for (var i = 0; i < 2 + 10; i++) {
		staticResultFee[i] = 0;
	}

	var timeStart = document.getElementsByName("timeStart")[0].value;
	if (timeStart == "") {
		timeStart = "%";
	}
	var timeEnd = document.getElementsByName("timeEnd")[0].value;
	if (timeEnd == "") {
		timeEnd = "%";
	}
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

				removeRow('sqlFeeTable');

				if (ret == "0") {
					alert("该学生目前没有费用记录！");
				} else {
					info = eval(ret);

					appendRowHeaderFee(info[0], sqlFeeTable);

					var i = 0;
					for (var tmp in info) {
						appendRowFee(info[i], i);
						staticResultFee[0] = i + 1;
						staticResultFee[1] += parseInt(info[i].feeSum);
						// 总额
						staticResultFee[2] += parseInt(info[i].course1);
						staticResultFee[3] += parseInt(info[i].course2);
						staticResultFee[4] += parseInt(info[i].course3);
						staticResultFee[5] += parseInt(info[i].course4);
						staticResultFee[6] += parseInt(info[i].course5);
						staticResultFee[7] += parseInt(info[i].course6);
						staticResultFee[8] += parseInt(info[i].course7);
						staticResultFee[9] += parseInt(info[i].course8);
						staticResultFee[10] += parseInt(info[i].course9);
						staticResultFee[11] += parseInt(info[i].course10);
						i++;
					}

					appendRowStatisticFee(sqlFeeTable, info[0], staticResultFee);

					// 查询上课考勤内容
					sqlClass(uid);
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlSome.php";
	url = url + "?sqlFee=1" + "&uid=" + uid.toString() + "&timeStart=" + timeStart + "&timeEnd=" + timeEnd;

	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function sqlBasic() {
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

				removeRow("sqlBasicTable");

				if (ret == "0") {
					alert("该学生信息不存在！请核对！");
				} else {
					resultBasicStudent = eval(ret);

					// 看是否有重名学生
					resultsLen = 0;
					for (var tmp in resultBasicStudent) {
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

					// 载入一个学生信息
					resultsIndex = 0;
					var i = resultsIndex;
					var schoolZoneStr1 = "", schoolZoneStr2 = "", schoolZoneStr3 = "";
					//for (var tmp in resultBasicStudent) {
					uid = resultBasicStudent[i].uid;
					if (resultBasicStudent[i].name2 == "") {
						appendRowBasic(sqlBasicTable, "学生ID", resultBasicStudent[i].uid, "姓名1", resultBasicStudent[i].name1, "姓名2", "/");
					} else {
						appendRowBasic(sqlBasicTable, "学生ID", resultBasicStudent[i].uid, "姓名1", resultBasicStudent[i].name1, "姓名2", resultBasicStudent[i].name2);
					}

					schoolZoneStr1 = resultBasicStudent[i].schoolZone1;
					schoolZoneStr1 = schoolZoneStr1.substring(0, schoolZoneStr1.length - 1);

					if (resultBasicStudent[i].schoolZone2 == "") {
						schoolZoneStr2 = "/";
					} else {
						schoolZoneStr2 = resultBasicStudent[i].schoolZone2;
						schoolZoneStr2.substring(0, schoolZoneStr2.length - 1);
					}
					if (resultBasicStudent[i].schoolZone3 == "") {
						schoolZoneStr3 = "/";
					} else {
						schoolZoneStr3 = resultBasicStudent[i].schoolZone3;
						schoolZoneStr3.substring(0, schoolZoneStr3.length - 1);
					}

					appendRowBasic(sqlBasicTable, "校区1", schoolZoneStr1, "校区2", schoolZoneStr2, "校区3", schoolZoneStr3);

					if (resultBasicStudent[i].school2 == "") {
						if (resultBasicStudent[i].sex == "1") {
							appendRowBasic(sqlBasicTable, "性别", "男", "学校1", resultBasicStudent[i].school1, "学校2", "/");
						} else if (resultBasicStudent[i].sex == "2") {
							appendRowBasic(sqlBasicTable, "性别", "女", "学校1", resultBasicStudent[i].school1, "学校2", "/");
						} else {
							appendRowBasic(sqlBasicTable, "性别", "未填写", "学校1", resultBasicStudent[i].school1, "学校2", "/");
						}
					} else {
						if (resultBasicStudent[i].sex == "1") {
							appendRowBasic(sqlBasicTable, "性别", "男", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
						} else if (resultBasicStudent[i].sex == "2") {
							appendRowBasic(sqlBasicTable, "性别", "女", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
						} else {
							appendRowBasic(sqlBasicTable, "性别", "未填写", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
						}
					}

					var outTime = dateJS("Y-m-d", resultBasicStudent[i].outTime);
					if (resultBasicStudent[i].outTime == "") {
						outTime = "未退学";
					}

					appendRowBasic(sqlBasicTable, "年级", resultBasicStudent[i].grade, "班级", resultBasicStudent[i].class, "家庭住址", resultBasicStudent[i].address);
					appendRowBasic(sqlBasicTable, "学生电话", resultBasicStudent[i].studentTel, "学生微信", resultBasicStudent[i].studentWX, "学生QQ", resultBasicStudent[i].studentQQ);
					appendRowBasic(sqlBasicTable, "母亲电话", resultBasicStudent[i].motherTel, "母亲微信", resultBasicStudent[i].motherWX, "报名时间", dateJS("Y-m-d", resultBasicStudent[i].inTime));
					appendRowBasic(sqlBasicTable, "父亲电话", resultBasicStudent[i].fatherTel, "父亲微信", resultBasicStudent[i].fatherWX, "退学时间", outTime);

					// 查询费用内容
					sqlFee(resultBasicStudent[i].uid);
					//i++;
					//}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlSome.php";

	// 查询学生姓名为空时不能查询
	if (document.getElementsByName('sqlName')[0].value == "") {
		alert("请填写查询姓名先！");
		return;
	}

	url = url + "?sqlName=" + encodeURIComponent(document.getElementsByName('sqlName')[0].value);
	// 很重要，必须有的
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

	removeRow("sqlBasicTable");

	// 载入一个学生信息
	var i = resultsIndex;
	var schoolZoneStr1 = "", schoolZoneStr2 = "", schoolZoneStr3 = "";
	//for (var tmp in resultBasicStudent) {
	uid = resultBasicStudent[i].uid;
	if (resultBasicStudent[i].name2 == "") {
		appendRowBasic(sqlBasicTable, "学生ID", resultBasicStudent[i].uid, "姓名1", resultBasicStudent[i].name1, "姓名2", "/");
	} else {
		appendRowBasic(sqlBasicTable, "学生ID", resultBasicStudent[i].uid, "姓名1", resultBasicStudent[i].name1, "姓名2", resultBasicStudent[i].name2);
	}

	schoolZoneStr1 = resultBasicStudent[i].schoolZone1;
	schoolZoneStr1 = schoolZoneStr1.substring(0, schoolZoneStr1.length - 1);

	if (resultBasicStudent[i].schoolZone2 == "") {
		schoolZoneStr2 = "/";
	} else {
		schoolZoneStr2 = resultBasicStudent[i].schoolZone2;
		schoolZoneStr2.substring(0, schoolZoneStr2.length - 1);
	}
	if (resultBasicStudent[i].schoolZone3 == "") {
		schoolZoneStr3 = "/";
	} else {
		schoolZoneStr3 = resultBasicStudent[i].schoolZone3;
		schoolZoneStr3.substring(0, schoolZoneStr3.length - 1);
	}

	appendRowBasic(sqlBasicTable, "校区1", schoolZoneStr1, "校区2", schoolZoneStr2, "校区3", schoolZoneStr3);

	if (resultBasicStudent[i].school2 == "") {
		if (resultBasicStudent[i].sex == "1") {
			appendRowBasic(sqlBasicTable, "性别", "男", "学校1", resultBasicStudent[i].school1, "学校2", "/");
		} else if (resultBasicStudent[i].sex == "2") {
			appendRowBasic(sqlBasicTable, "性别", "女", "学校1", resultBasicStudent[i].school1, "学校2", "/");
		} else {
			appendRowBasic(sqlBasicTable, "性别", "未填写", "学校1", resultBasicStudent[i].school1, "学校2", "/");
		}
	} else {
		if (resultBasicStudent[i].sex == "1") {
			appendRowBasic(sqlBasicTable, "性别", "男", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
		} else if (resultBasicStudent[i].sex == "2") {
			appendRowBasic(sqlBasicTable, "性别", "女", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
		} else {
			appendRowBasic(sqlBasicTable, "性别", "未填写", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
		}
	}

	appendRowBasic(sqlBasicTable, "年级", resultBasicStudent[i].grade, "班级", resultBasicStudent[i].class, "/", "/");
	appendRowBasic(sqlBasicTable, "学生电话", resultBasicStudent[i].studentTel, "学生微信", resultBasicStudent[i].studentWX, "学生QQ", resultBasicStudent[i].studentQQ);
	appendRowBasic(sqlBasicTable, "母亲电话", resultBasicStudent[i].motherTel, "母亲微信", resultBasicStudent[i].motherWX, "家庭住址", resultBasicStudent[i].address);
	appendRowBasic(sqlBasicTable, "父亲电话", resultBasicStudent[i].fatherTel, "父亲微信", resultBasicStudent[i].fatherWX, "报名时间", dateJS("Y-m-d", resultBasicStudent[i].time));

	sqlClass(resultBasicStudent[i].uid);

}

// 插入班课查询结果
function appendRowBasic(TableID, colName1, colValue1, colName2, colValue2, colName3, colValue3) {
	// 添加一行
	var newTr = TableID.insertRow(-1);
	// 添加两列
	var newTd0 = newTr.insertCell(-1);
	var newTd1 = newTr.insertCell(-1);
	var newTd2 = newTr.insertCell(-1);
	var newTd3 = newTr.insertCell(-1);
	var newTd4 = newTr.insertCell(-1);
	var newTd5 = newTr.insertCell(-1);

	// 设置列内容和属性
	newTd0.align = 'center';
	newTd2.align = 'center';
	newTd4.align = 'center';

	newTd0.innerHTML = colName1;
	newTd1.innerHTML = colValue1;
	newTd2.innerHTML = colName2;
	newTd3.innerHTML = colValue2;
	newTd4.innerHTML = colName3;
	newTd5.innerHTML = colValue3;

	// 添加表格样式
	$("#sqlBasicTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlBasicTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlBasicTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlBasicTable tr:even").addClass("rowBgColorEven");
}

// 插入查询结果表头
function appendRowHeaderFee(obj, TableID) {
	// 添加一行
	var newTr = TableID.insertRow(-1);
	// 添加两列
	var newTd0 = newTr.insertCell(-1);
	var newTd1 = newTr.insertCell(-1);
	var newTd2 = newTr.insertCell(-1);
	var newTd3 = newTr.insertCell(-1);
	var newTd4 = newTr.insertCell(-1);
	var newTd5 = newTr.insertCell(-1);
	var newTd6 = newTr.insertCell(-1);
	var newTd7 = newTr.insertCell(-1);
	var newTd8 = newTr.insertCell(-1);
	var newTd9 = newTr.insertCell(-1);
	var newTd10 = newTr.insertCell(-1);
	var newTd11 = newTr.insertCell(-1);
	var newTd12 = newTr.insertCell(-1);
	var newTd13 = newTr.insertCell(-1);
	var newTd14 = newTr.insertCell(-1);
	var newTd15 = newTr.insertCell(-1);
	var newTd16 = newTr.insertCell(-1);
	var newTd17 = newTr.insertCell(-1);
	var newTd18 = newTr.insertCell(-1);
	var newTd19 = newTr.insertCell(-1);
	var newTd20 = newTr.insertCell(-1);
	var newTd21 = newTr.insertCell(-1);
	var newTd22 = newTr.insertCell(-1);
	var newTd23 = newTr.insertCell(-1);
	var newTd24 = newTr.insertCell(-1);
	var newTd25 = newTr.insertCell(-1);
	var newTd26 = newTr.insertCell(-1);
	var newTd27 = newTr.insertCell(-1);
	var newTd28 = newTr.insertCell(-1);
	var newTd29 = newTr.insertCell(-1);
	var newTd30 = newTr.insertCell(-1);
	var newTd31 = newTr.insertCell(-1);
	var newTd32 = newTr.insertCell(-1);
	var newTd33 = newTr.insertCell(-1);
	var newTd34 = newTr.insertCell(-1);
	var newTd35 = newTr.insertCell(-1);
	var newTd36 = newTr.insertCell(-1);
	var newTd37 = newTr.insertCell(-1);
	var newTd38 = newTr.insertCell(-1);
	var newTd39 = newTr.insertCell(-1);
	var newTd40 = newTr.insertCell(-1);
	var newTd41 = newTr.insertCell(-1);
	var newTd42 = newTr.insertCell(-1);
	var newTd43 = newTr.insertCell(-1);
	var newTd44 = newTr.insertCell(-1);
	var newTd45 = newTr.insertCell(-1);
	var newTd46 = newTr.insertCell(-1);
	var newTd47 = newTr.insertCell(-1);
	var newTd48 = newTr.insertCell(-1);
	var newTd49 = newTr.insertCell(-1);
	var newTd50 = newTr.insertCell(-1);
	var newTd51 = newTr.insertCell(-1);
	var newTd52 = newTr.insertCell(-1);
	var newTd53 = newTr.insertCell(-1);
	var newTd54 = newTr.insertCell(-1);
	var newTd55 = newTr.insertCell(-1);
	var newTd56 = newTr.insertCell(-1);
	var newTd57 = newTr.insertCell(-1);
	var newTd58 = newTr.insertCell(-1);
	var newTd59 = newTr.insertCell(-1);
	var newTd60 = newTr.insertCell(-1);
	var newTd61 = newTr.insertCell(-1);
	var newTd62 = newTr.insertCell(-1);
	var newTd63 = newTr.insertCell(-1);
	var newTd64 = newTr.insertCell(-1);
	var newTd65 = newTr.insertCell(-1);
	var newTd66 = newTr.insertCell(-1);
	var newTd67 = newTr.insertCell(-1);
	var newTd68 = newTr.insertCell(-1);
	var newTd69 = newTr.insertCell(-1);
	var newTd70 = newTr.insertCell(-1);
	var newTd71 = newTr.insertCell(-1);
	var newTd72 = newTr.insertCell(-1);
	var newTd73 = newTr.insertCell(-1);
	var newTd74 = newTr.insertCell(-1);
	var newTd75 = newTr.insertCell(-1);

	// 设置列内容和属性
	newTd0.align = 'center';
	newTd1.align = 'center';
	newTd2.align = 'center';
	newTd3.align = 'center';
	newTd4.align = 'center';
	newTd5.align = 'center';
	newTd6.align = 'center';
	newTd7.align = 'center';
	newTd8.align = 'center';
	newTd9.align = 'center';
	newTd10.align = 'center';
	newTd11.align = 'center';
	newTd12.align = 'center';
	newTd13.align = 'center';
	newTd14.align = 'center';
	newTd15.align = 'center';
	newTd16.align = 'center';
	newTd17.align = 'center';
	newTd18.align = 'center';
	newTd19.align = 'center';
	newTd20.align = 'center';
	newTd21.align = 'center';
	newTd22.align = 'center';
	newTd23.align = 'center';
	newTd24.align = 'center';
	newTd25.align = 'center';
	newTd26.align = 'center';
	newTd27.align = 'center';
	newTd28.align = 'center';
	newTd29.align = 'center';
	newTd30.align = 'center';
	newTd31.align = 'center';
	newTd32.align = 'center';
	newTd33.align = 'center';
	newTd34.align = 'center';
	newTd35.align = 'center';
	newTd36.align = 'center';
	newTd37.align = 'center';
	newTd38.align = 'center';
	newTd39.align = 'center';
	newTd40.align = 'center';
	newTd41.align = 'center';
	newTd42.align = 'center';
	newTd43.align = 'center';
	newTd44.align = 'center';
	newTd45.align = 'center';
	newTd46.align = 'center';
	newTd47.align = 'center';
	newTd48.align = 'center';
	newTd49.align = 'center';
	newTd50.align = 'center';
	newTd51.align = 'center';
	newTd52.align = 'center';
	newTd53.align = 'center';
	newTd54.align = 'center';
	newTd55.align = 'center';
	newTd56.align = 'center';
	newTd57.align = 'center';
	newTd58.align = 'center';
	newTd59.align = 'center';
	newTd60.align = 'center';
	newTd61.align = 'center';
	newTd62.align = 'center';
	newTd63.align = 'center';
	newTd64.align = 'center';
	newTd65.align = 'center';
	newTd66.align = 'center';
	newTd67.align = 'center';
	newTd68.align = 'center';
	newTd69.align = 'center';
	newTd70.align = 'center';
	newTd71.align = 'center';
	newTd72.align = 'center';
	newTd73.align = 'center';
	newTd74.align = 'center';
	newTd75.align = 'center';

	newTd0.innerHTML = "序号";
	newTd1.innerHTML = "类别";
	newTd2.innerHTML = "收据编号";
	newTd3.innerHTML = "收据票号";
	newTd4.innerHTML = "单页费用";
	newTd5.innerHTML = "记录时间";
	newTd6.innerHTML = courseLoad[0] + "产品";
	newTd7.innerHTML = courseLoad[0] + "学费";
	newTd8.innerHTML = obj.subFee1Name;
	newTd9.innerHTML = obj.subFee2Name;
	newTd10.innerHTML = obj.subFee3Name;
	newTd11.innerHTML = obj.subFee4Name;
	newTd12.innerHTML = obj.subFee5Name;
	newTd13.innerHTML = courseLoad[1] + "产品";
	newTd14.innerHTML = courseLoad[1] + "学费";
	newTd15.innerHTML = obj.subFee1Name;
	newTd16.innerHTML = obj.subFee2Name;
	newTd17.innerHTML = obj.subFee3Name;
	newTd18.innerHTML = obj.subFee4Name;
	newTd19.innerHTML = obj.subFee5Name;
	newTd20.innerHTML = courseLoad[2] + "产品";
	newTd21.innerHTML = courseLoad[2] + "学费";
	newTd22.innerHTML = obj.subFee1Name;
	newTd23.innerHTML = obj.subFee2Name;
	newTd24.innerHTML = obj.subFee3Name;
	newTd25.innerHTML = obj.subFee4Name;
	newTd26.innerHTML = obj.subFee5Name;
	newTd27.innerHTML = courseLoad[3] + "产品";
	newTd28.innerHTML = courseLoad[3] + "学费";
	newTd29.innerHTML = obj.subFee1Name;
	newTd30.innerHTML = obj.subFee2Name;
	newTd31.innerHTML = obj.subFee3Name;
	newTd32.innerHTML = obj.subFee4Name;
	newTd33.innerHTML = obj.subFee5Name;
	newTd34.innerHTML = courseLoad[4] + "产品";
	newTd35.innerHTML = courseLoad[4] + "学费";
	newTd36.innerHTML = obj.subFee1Name;
	newTd37.innerHTML = obj.subFee2Name;
	newTd38.innerHTML = obj.subFee3Name;
	newTd39.innerHTML = obj.subFee4Name;
	newTd40.innerHTML = obj.subFee5Name;
	newTd41.innerHTML = courseLoad[5] + "产品";
	newTd42.innerHTML = courseLoad[5] + "学费";
	newTd43.innerHTML = obj.subFee1Name;
	newTd44.innerHTML = obj.subFee2Name;
	newTd45.innerHTML = obj.subFee3Name;
	newTd46.innerHTML = obj.subFee4Name;
	newTd47.innerHTML = obj.subFee5Name;
	newTd48.innerHTML = courseLoad[6] + "产品";
	newTd49.innerHTML = courseLoad[6] + "学费";
	newTd50.innerHTML = obj.subFee1Name;
	newTd51.innerHTML = obj.subFee2Name;
	newTd52.innerHTML = obj.subFee3Name;
	newTd53.innerHTML = obj.subFee4Name;
	newTd54.innerHTML = obj.subFee5Name;
	newTd55.innerHTML = courseLoad[7] + "产品";
	newTd56.innerHTML = courseLoad[7] + "学费";
	newTd57.innerHTML = obj.subFee1Name;
	newTd58.innerHTML = obj.subFee2Name;
	newTd59.innerHTML = obj.subFee3Name;
	newTd60.innerHTML = obj.subFee4Name;
	newTd61.innerHTML = obj.subFee5Name;
	newTd62.innerHTML = courseLoad[8] + "产品";
	newTd63.innerHTML = courseLoad[8] + "学费";
	newTd64.innerHTML = obj.subFee1Name;
	newTd65.innerHTML = obj.subFee2Name;
	newTd66.innerHTML = obj.subFee3Name;
	newTd67.innerHTML = obj.subFee4Name;
	newTd68.innerHTML = obj.subFee5Name;
	newTd69.innerHTML = courseLoad[9] + "产品";
	newTd70.innerHTML = courseLoad[9] + "学费";
	newTd71.innerHTML = obj.subFee1Name;
	newTd72.innerHTML = obj.subFee2Name;
	newTd73.innerHTML = obj.subFee3Name;
	newTd74.innerHTML = obj.subFee4Name;
	newTd75.innerHTML = obj.subFee5Name;
}

// 插入班课表格相关函数
function appendRowFee(obj, index) {
	// 序号从1开始
	index = index + 1;

	var TableID = sqlFeeTable;

	// 添加一行
	var newTr = TableID.insertRow(-1);
	// 添加两列
	var newTd0 = newTr.insertCell(-1);
	var newTd1 = newTr.insertCell(-1);
	var newTd2 = newTr.insertCell(-1);
	var newTd3 = newTr.insertCell(-1);
	var newTd4 = newTr.insertCell(-1);
	var newTd5 = newTr.insertCell(-1);
	var newTd6 = newTr.insertCell(-1);
	var newTd7 = newTr.insertCell(-1);
	var newTd8 = newTr.insertCell(-1);
	var newTd9 = newTr.insertCell(-1);
	var newTd10 = newTr.insertCell(-1);
	var newTd11 = newTr.insertCell(-1);
	var newTd12 = newTr.insertCell(-1);
	var newTd13 = newTr.insertCell(-1);
	var newTd14 = newTr.insertCell(-1);
	var newTd15 = newTr.insertCell(-1);
	var newTd16 = newTr.insertCell(-1);
	var newTd17 = newTr.insertCell(-1);
	var newTd18 = newTr.insertCell(-1);
	var newTd19 = newTr.insertCell(-1);
	var newTd20 = newTr.insertCell(-1);
	var newTd21 = newTr.insertCell(-1);
	var newTd22 = newTr.insertCell(-1);
	var newTd23 = newTr.insertCell(-1);
	var newTd24 = newTr.insertCell(-1);
	var newTd25 = newTr.insertCell(-1);
	var newTd26 = newTr.insertCell(-1);
	var newTd27 = newTr.insertCell(-1);
	var newTd28 = newTr.insertCell(-1);
	var newTd29 = newTr.insertCell(-1);
	var newTd30 = newTr.insertCell(-1);
	var newTd31 = newTr.insertCell(-1);
	var newTd32 = newTr.insertCell(-1);
	var newTd33 = newTr.insertCell(-1);
	var newTd34 = newTr.insertCell(-1);
	var newTd35 = newTr.insertCell(-1);
	var newTd36 = newTr.insertCell(-1);
	var newTd37 = newTr.insertCell(-1);
	var newTd38 = newTr.insertCell(-1);
	var newTd39 = newTr.insertCell(-1);
	var newTd40 = newTr.insertCell(-1);
	var newTd41 = newTr.insertCell(-1);
	var newTd42 = newTr.insertCell(-1);
	var newTd43 = newTr.insertCell(-1);
	var newTd44 = newTr.insertCell(-1);
	var newTd45 = newTr.insertCell(-1);
	var newTd46 = newTr.insertCell(-1);
	var newTd47 = newTr.insertCell(-1);
	var newTd48 = newTr.insertCell(-1);
	var newTd49 = newTr.insertCell(-1);
	var newTd50 = newTr.insertCell(-1);
	var newTd51 = newTr.insertCell(-1);
	var newTd52 = newTr.insertCell(-1);
	var newTd53 = newTr.insertCell(-1);
	var newTd54 = newTr.insertCell(-1);
	var newTd55 = newTr.insertCell(-1);
	var newTd56 = newTr.insertCell(-1);
	var newTd57 = newTr.insertCell(-1);
	var newTd58 = newTr.insertCell(-1);
	var newTd59 = newTr.insertCell(-1);
	var newTd60 = newTr.insertCell(-1);
	var newTd61 = newTr.insertCell(-1);
	var newTd62 = newTr.insertCell(-1);
	var newTd63 = newTr.insertCell(-1);
	var newTd64 = newTr.insertCell(-1);
	var newTd65 = newTr.insertCell(-1);
	var newTd66 = newTr.insertCell(-1);
	var newTd67 = newTr.insertCell(-1);
	var newTd68 = newTr.insertCell(-1);
	var newTd69 = newTr.insertCell(-1);
	var newTd70 = newTr.insertCell(-1);
	var newTd71 = newTr.insertCell(-1);
	var newTd72 = newTr.insertCell(-1);
	var newTd73 = newTr.insertCell(-1);
	var newTd74 = newTr.insertCell(-1);
	var newTd75 = newTr.insertCell(-1);

	// 设置列内容和属性
	newTd0.align = 'center';
	newTd1.align = 'center';
	newTd2.align = 'center';
	newTd3.align = 'center';
	newTd4.align = 'center';
	newTd5.align = 'center';
	newTd6.align = 'center';
	newTd7.align = 'center';
	newTd8.align = 'center';
	newTd9.align = 'center';
	newTd10.align = 'center';
	newTd11.align = 'center';
	newTd12.align = 'center';
	newTd13.align = 'center';
	newTd14.align = 'center';
	newTd15.align = 'center';
	newTd16.align = 'center';
	newTd17.align = 'center';
	newTd18.align = 'center';
	newTd19.align = 'center';
	newTd20.align = 'center';
	newTd21.align = 'center';
	newTd22.align = 'center';
	newTd23.align = 'center';
	newTd24.align = 'center';
	newTd25.align = 'center';
	newTd26.align = 'center';
	newTd27.align = 'center';
	newTd28.align = 'center';
	newTd29.align = 'center';
	newTd30.align = 'center';
	newTd31.align = 'center';
	newTd32.align = 'center';
	newTd33.align = 'center';
	newTd34.align = 'center';
	newTd35.align = 'center';
	newTd36.align = 'center';
	newTd37.align = 'center';
	newTd38.align = 'center';
	newTd39.align = 'center';
	newTd40.align = 'center';
	newTd41.align = 'center';
	newTd42.align = 'center';
	newTd43.align = 'center';
	newTd44.align = 'center';
	newTd45.align = 'center';
	newTd46.align = 'center';
	newTd47.align = 'center';
	newTd48.align = 'center';
	newTd49.align = 'center';
	newTd50.align = 'center';
	newTd51.align = 'center';
	newTd52.align = 'center';
	newTd53.align = 'center';
	newTd54.align = 'center';
	newTd55.align = 'center';
	newTd56.align = 'center';
	newTd57.align = 'center';
	newTd58.align = 'center';
	newTd59.align = 'center';
	newTd60.align = 'center';
	newTd61.align = 'center';
	newTd62.align = 'center';
	newTd63.align = 'center';
	newTd64.align = 'center';
	newTd65.align = 'center';
	newTd66.align = 'center';
	newTd67.align = 'center';
	newTd68.align = 'center';
	newTd69.align = 'center';
	newTd70.align = 'center';
	newTd71.align = 'center';
	newTd72.align = 'center';
	newTd73.align = 'center';
	newTd74.align = 'center';
	newTd75.align = 'center';

	newTd0.innerHTML = index;
	if (obj.mode == "j") {
		newTd1.innerHTML = "交费";
	} else if (obj.mode == "z") {
		newTd1.innerHTML = "转费";
	} else if (obj.mode == "t") {
		newTd1.innerHTML = "退费";
	}
	newTd2.innerHTML = obj.receiptNum;
	newTd3.innerHTML = obj.billNum;
	newTd4.innerHTML = obj.feeSum;
	newTd5.innerHTML = dateJS("Y-m-d", obj.time);
	if (obj.course1Product == "") {
		newTd6.innerHTML = "/";
	} else {
		newTd6.innerHTML = obj.course1Product;
	}
	newTd7.innerHTML = obj.course1;
	newTd8.innerHTML = obj.course1SubFee1;
	newTd9.innerHTML = obj.course1SubFee2;
	newTd10.innerHTML = obj.course1SubFee3;
	newTd11.innerHTML = obj.course1SubFee4;
	newTd12.innerHTML = obj.course1SubFee5;
	if (obj.course2Product == "") {
		newTd13.innerHTML = "/";
	} else {
		newTd13.innerHTML = obj.course2Product;
	}
	newTd14.innerHTML = obj.course2;
	newTd15.innerHTML = obj.course2SubFee1;
	newTd16.innerHTML = obj.course2SubFee2;
	newTd17.innerHTML = obj.course2SubFee3;
	newTd18.innerHTML = obj.course2SubFee4;
	newTd19.innerHTML = obj.course2SubFee5;
	if (obj.course3Product == "") {
		newTd20.innerHTML = "/";
	} else {
		newTd20.innerHTML = obj.course3Product;
	}
	newTd21.innerHTML = obj.course3;
	newTd22.innerHTML = obj.course3SubFee1;
	newTd23.innerHTML = obj.course3SubFee2;
	newTd24.innerHTML = obj.course3SubFee3;
	newTd25.innerHTML = obj.course3SubFee4;
	newTd26.innerHTML = obj.course3SubFee5;
	if (obj.course4Product == "") {
		newTd27.innerHTML = "/";
	} else {
		newTd27.innerHTML = obj.course4Product;
	}
	newTd28.innerHTML = obj.course4;
	newTd29.innerHTML = obj.course4SubFee1;
	newTd30.innerHTML = obj.course4SubFee2;
	newTd31.innerHTML = obj.course4SubFee3;
	newTd32.innerHTML = obj.course4SubFee4;
	newTd33.innerHTML = obj.course4SubFee5;
	if (obj.course5Product == "") {
		newTd34.innerHTML = "/";
	} else {
		newTd34.innerHTML = obj.course5Product;
	}
	newTd35.innerHTML = obj.course5;
	newTd36.innerHTML = obj.course5SubFee1;
	newTd37.innerHTML = obj.course5SubFee2;
	newTd38.innerHTML = obj.course5SubFee3;
	newTd39.innerHTML = obj.course5SubFee4;
	newTd40.innerHTML = obj.course5SubFee5;

	if (obj.course6Product == "") {
		newTd41.innerHTML = "/";
	} else {
		newTd41.innerHTML = obj.course6Product;
	}
	newTd42.innerHTML = obj.course6;
	newTd43.innerHTML = obj.course6SubFee1;
	newTd44.innerHTML = obj.course6SubFee2;
	newTd45.innerHTML = obj.course6SubFee3;
	newTd46.innerHTML = obj.course6SubFee4;
	newTd47.innerHTML = obj.course6SubFee5;
	if (obj.course7Product == "") {
		newTd48.innerHTML = "/";
	} else {
		newTd48.innerHTML = obj.course7Product;
	}
	newTd49.innerHTML = obj.course7;
	newTd50.innerHTML = obj.course7SubFee1;
	newTd51.innerHTML = obj.course7SubFee2;
	newTd52.innerHTML = obj.course7SubFee3;
	newTd53.innerHTML = obj.course7SubFee4;
	newTd54.innerHTML = obj.course7SubFee5;
	if (obj.course8Product == "") {
		newTd55.innerHTML = "/";
	} else {
		newTd55.innerHTML = obj.course8Product;
	}
	newTd56.innerHTML = obj.course8;
	newTd57.innerHTML = obj.course8SubFee1;
	newTd58.innerHTML = obj.course8SubFee2;
	newTd59.innerHTML = obj.course8SubFee3;
	newTd60.innerHTML = obj.course8SubFee4;
	newTd61.innerHTML = obj.course8SubFee5;
	if (obj.course9Product == "") {
		newTd62.innerHTML = "/";
	} else {
		newTd62.innerHTML = obj.course9Product;
	}
	newTd63.innerHTML = obj.course9;
	newTd64.innerHTML = obj.course9SubFee1;
	newTd65.innerHTML = obj.course9SubFee2;
	newTd66.innerHTML = obj.course9SubFee3;
	newTd67.innerHTML = obj.course9SubFee4;
	newTd68.innerHTML = obj.course9SubFee5;
	if (obj.course10Product == "") {
		newTd69.innerHTML = "/";
	} else {
		newTd69.innerHTML = obj.course10Product;
	}
	newTd70.innerHTML = obj.course10;
	newTd71nnerHTML = obj.course10SubFee1;
	newTd72.innerHTML = obj.course10SubFee2;
	newTd73.innerHTML = obj.course10SubFee3;
	newTd74.innerHTML = obj.course10SubFee4;
	newTd75.innerHTML = obj.course10SubFee5;

	// 对没有的扣费项目进行隐藏，
	if (obj.subFee1Name == "费用1") {
		for (var i = 8; i < 8 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee2Name == "费用2") {
		for (var i = 9; i < 9 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee3Name == "费用3") {
		for (var i = 10; i < 10 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee4Name == "费用4") {
		for (var i = 11; i < 11 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee5Name == "费用5") {
		for (var i = 12; i < 12 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}

	// 添加表格样式
	$("#sqlFeeTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlFeeTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlFeeTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlFeeTable tr:even").addClass("rowBgColorEven");
}

//插入查询统计结果
function appendRowStatisticFee(TableID, obj, data) {
	// 添加一行
	var newTr = TableID.insertRow(0);
	// 添加两列
	var newTd0 = newTr.insertCell(-1);
	var newTd1 = newTr.insertCell(-1);
	var newTd2 = newTr.insertCell(-1);
	var newTd3 = newTr.insertCell(-1);
	var newTd4 = newTr.insertCell(-1);
	var newTd5 = newTr.insertCell(-1);
	var newTd6 = newTr.insertCell(-1);
	var newTd7 = newTr.insertCell(-1);
	var newTd8 = newTr.insertCell(-1);
	var newTd9 = newTr.insertCell(-1);
	var newTd10 = newTr.insertCell(-1);
	var newTd11 = newTr.insertCell(-1);
	var newTd12 = newTr.insertCell(-1);
	var newTd13 = newTr.insertCell(-1);
	var newTd14 = newTr.insertCell(-1);
	var newTd15 = newTr.insertCell(-1);
	var newTd16 = newTr.insertCell(-1);
	var newTd17 = newTr.insertCell(-1);
	var newTd18 = newTr.insertCell(-1);
	var newTd19 = newTr.insertCell(-1);
	var newTd20 = newTr.insertCell(-1);
	var newTd21 = newTr.insertCell(-1);
	var newTd22 = newTr.insertCell(-1);
	var newTd23 = newTr.insertCell(-1);
	var newTd24 = newTr.insertCell(-1);
	var newTd25 = newTr.insertCell(-1);
	var newTd26 = newTr.insertCell(-1);
	var newTd27 = newTr.insertCell(-1);
	var newTd28 = newTr.insertCell(-1);
	var newTd29 = newTr.insertCell(-1);
	var newTd30 = newTr.insertCell(-1);
	var newTd31 = newTr.insertCell(-1);
	var newTd32 = newTr.insertCell(-1);
	var newTd33 = newTr.insertCell(-1);
	var newTd34 = newTr.insertCell(-1);
	var newTd35 = newTr.insertCell(-1);
	var newTd36 = newTr.insertCell(-1);
	var newTd37 = newTr.insertCell(-1);
	var newTd38 = newTr.insertCell(-1);
	var newTd39 = newTr.insertCell(-1);
	var newTd40 = newTr.insertCell(-1);
	var newTd41 = newTr.insertCell(-1);
	var newTd42 = newTr.insertCell(-1);
	var newTd43 = newTr.insertCell(-1);
	var newTd44 = newTr.insertCell(-1);
	var newTd45 = newTr.insertCell(-1);
	var newTd46 = newTr.insertCell(-1);
	var newTd47 = newTr.insertCell(-1);
	var newTd48 = newTr.insertCell(-1);
	var newTd49 = newTr.insertCell(-1);
	var newTd50 = newTr.insertCell(-1);
	var newTd51 = newTr.insertCell(-1);
	var newTd52 = newTr.insertCell(-1);
	var newTd53 = newTr.insertCell(-1);
	var newTd54 = newTr.insertCell(-1);
	var newTd55 = newTr.insertCell(-1);
	var newTd56 = newTr.insertCell(-1);
	var newTd57 = newTr.insertCell(-1);
	var newTd58 = newTr.insertCell(-1);
	var newTd59 = newTr.insertCell(-1);
	var newTd60 = newTr.insertCell(-1);
	var newTd61 = newTr.insertCell(-1);
	var newTd62 = newTr.insertCell(-1);
	var newTd63 = newTr.insertCell(-1);
	var newTd64 = newTr.insertCell(-1);
	var newTd65 = newTr.insertCell(-1);
	var newTd66 = newTr.insertCell(-1);
	var newTd67 = newTr.insertCell(-1);
	var newTd68 = newTr.insertCell(-1);
	var newTd69 = newTr.insertCell(-1);
	var newTd70 = newTr.insertCell(-1);
	var newTd71 = newTr.insertCell(-1);
	var newTd72 = newTr.insertCell(-1);
	var newTd73 = newTr.insertCell(-1);
	var newTd74 = newTr.insertCell(-1);
	var newTd75 = newTr.insertCell(-1);

	// 设置列内容和属性
	newTd0.align = 'center';
	newTd1.align = 'center';
	newTd2.align = 'center';
	newTd3.align = 'center';
	newTd4.align = 'center';
	newTd5.align = 'center';
	newTd6.align = 'center';
	newTd7.align = 'center';
	newTd8.align = 'center';
	newTd9.align = 'center';
	newTd10.align = 'center';
	newTd11.align = 'center';
	newTd12.align = 'center';
	newTd13.align = 'center';
	newTd14.align = 'center';
	newTd15.align = 'center';
	newTd16.align = 'center';
	newTd17.align = 'center';
	newTd18.align = 'center';
	newTd19.align = 'center';
	newTd20.align = 'center';
	newTd21.align = 'center';
	newTd22.align = 'center';
	newTd23.align = 'center';
	newTd24.align = 'center';
	newTd25.align = 'center';
	newTd26.align = 'center';
	newTd27.align = 'center';
	newTd28.align = 'center';
	newTd29.align = 'center';
	newTd30.align = 'center';
	newTd31.align = 'center';
	newTd32.align = 'center';
	newTd33.align = 'center';
	newTd34.align = 'center';
	newTd35.align = 'center';
	newTd36.align = 'center';
	newTd37.align = 'center';
	newTd38.align = 'center';
	newTd39.align = 'center';
	newTd40.align = 'center';
	newTd41.align = 'center';
	newTd42.align = 'center';
	newTd43.align = 'center';
	newTd44.align = 'center';
	newTd45.align = 'center';
	newTd46.align = 'center';
	newTd47.align = 'center';
	newTd48.align = 'center';
	newTd49.align = 'center';
	newTd50.align = 'center';
	newTd51.align = 'center';
	newTd52.align = 'center';
	newTd53.align = 'center';
	newTd54.align = 'center';
	newTd55.align = 'center';
	newTd56.align = 'center';
	newTd57.align = 'center';
	newTd58.align = 'center';
	newTd59.align = 'center';
	newTd60.align = 'center';
	newTd61.align = 'center';
	newTd62.align = 'center';
	newTd63.align = 'center';
	newTd64.align = 'center';
	newTd65.align = 'center';
	newTd66.align = 'center';
	newTd67.align = 'center';
	newTd68.align = 'center';
	newTd69.align = 'center';
	newTd70.align = 'center';
	newTd71.align = 'center';
	newTd72.align = 'center';
	newTd73.align = 'center';
	newTd74.align = 'center';
	newTd75.align = 'center';

	newTd0.innerHTML = "统计结果";
	newTd1.innerHTML = "费用次数";
	newTd2.innerHTML = data[0];
	newTd3.innerHTML = "费用总额";
	newTd4.innerHTML = data[1];
	newTd5.innerHTML = "";
	newTd6.innerHTML = courseLoad[0] + "费用";
	newTd7.innerHTML = data[2];
	newTd8.innerHTML = "";
	newTd9.innerHTML = "";
	newTd10.innerHTML = "";
	newTd11.innerHTML = "";
	newTd12.innerHTML = "";
	newTd13.innerHTML = courseLoad[1] + "费用";
	newTd14.innerHTML = data[3];
	newTd15.innerHTML = "";
	newTd16.innerHTML = "";
	newTd17.innerHTML = "";
	newTd18.innerHTML = "";
	newTd19.innerHTML = "";
	newTd20.innerHTML = courseLoad[2] + "费用";
	newTd21.innerHTML = data[4];
	newTd22.innerHTML = "";
	newTd23.innerHTML = "";
	newTd24.innerHTML = "";
	newTd25.innerHTML = "";
	newTd26.innerHTML = "";
	newTd27.innerHTML = courseLoad[3] + "费用";
	newTd28.innerHTML = data[5];
	newTd29.innerHTML = "";
	newTd30.innerHTML = "";
	newTd31.innerHTML = "";
	newTd32.innerHTML = "";
	newTd33.innerHTML = "";
	newTd34.innerHTML = courseLoad[4] + "费用";
	newTd35.innerHTML = data[6];
	newTd36.innerHTML = "";
	newTd37.innerHTML = "";
	newTd38.innerHTML = "";
	newTd39.innerHTML = "";
	newTd40.innerHTML = "";
	newTd41.innerHTML = courseLoad[5] + "费用";
	newTd42.innerHTML = data[7];
	newTd43.innerHTML = "";
	newTd44.innerHTML = "";
	newTd45.innerHTML = "";
	newTd46.innerHTML = "";
	newTd47.innerHTML = "";
	newTd48.innerHTML = courseLoad[6] + "费用";
	newTd49.innerHTML = data[8];
	newTd50.innerHTML = "";
	newTd51.innerHTML = "";
	newTd52.innerHTML = "";
	newTd53.innerHTML = "";
	newTd54.innerHTML = "";
	newTd55.innerHTML = courseLoad[7] + "费用";
	newTd56.innerHTML = data[9];
	newTd57.innerHTML = "";
	newTd58.innerHTML = "";
	newTd59.innerHTML = "";
	newTd60.innerHTML = "";
	newTd61.innerHTML = "";
	newTd62.innerHTML = courseLoad[8] + "费用";
	newTd63.innerHTML = data[10];
	newTd64.innerHTML = "";
	newTd65.innerHTML = "";
	newTd66.innerHTML = "";
	newTd67.innerHTML = "";
	newTd68.innerHTML = "";
	newTd69.innerHTML = courseLoad[9] + "费用";
	newTd70.innerHTML = data[11];
	newTd71.innerHTML = "";
	newTd72.innerHTML = "";
	newTd73.innerHTML = "";
	newTd74.innerHTML = "";
	newTd75.innerHTML = "";

	// 对没有的扣费项目进行隐藏，与appendRowFee中的一致
	if (obj.subFee1Name == "费用1") {
		for (var i = 8; i < 8 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee2Name == "费用2") {
		for (var i = 9; i < 9 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee3Name == "费用3") {
		for (var i = 10; i < 10 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee4Name == "费用4") {
		for (var i = 11; i < 11 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee5Name == "费用5") {
		for (var i = 12; i < 12 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
}

function appendRowHeaderClass(TableID) {
	// 添加一行
	var newTr = TableID.insertRow(-1);
	// 添加两列
	var newTd0 = newTr.insertCell(-1);
	var newTd1 = newTr.insertCell(-1);
	var newTd2 = newTr.insertCell(-1);
	var newTd3 = newTr.insertCell(-1);
	var newTd4 = newTr.insertCell(-1);
	var newTd5 = newTr.insertCell(-1);
	var newTd6 = newTr.insertCell(-1);
	var newTd7 = newTr.insertCell(-1);
	var newTd8 = newTr.insertCell(-1);
	var newTd9 = newTr.insertCell(-1);

	// 设置列内容和属性
	newTd0.align = 'center';
	newTd1.align = 'center';
	newTd2.align = 'center';
	newTd3.align = 'center';
	newTd4.align = 'center';
	newTd5.align = 'center';
	newTd6.align = 'center';
	newTd7.align = 'center';
	newTd8.align = 'center';
	newTd9.align = 'center';

	newTd0.innerHTML = "序号";
	newTd1.innerHTML = "科目";
	newTd2.innerHTML = "产品";
	newTd3.innerHTML = "教师";
	newTd4.innerHTML = "班级";
	newTd5.innerHTML = "上课日期";
	newTd6.innerHTML = "上课时间";
	newTd7.innerHTML = "考勤";
	newTd8.innerHTML = "缺勤原因";
	newTd9.innerHTML = "扣费";
}

function appendRowClass(obj, i) {
	var coursetmp = "";
	// 添加一行
	var newTr = sqlClassTable.insertRow(-1);
	// 添加两列
	var newTd0 = newTr.insertCell(-1);
	var newTd1 = newTr.insertCell(-1);
	var newTd2 = newTr.insertCell(-1);
	var newTd3 = newTr.insertCell(-1);
	var newTd4 = newTr.insertCell(-1);
	var newTd5 = newTr.insertCell(-1);
	var newTd6 = newTr.insertCell(-1);
	var newTd7 = newTr.insertCell(-1);
	var newTd8 = newTr.insertCell(-1);
	var newTd9 = newTr.insertCell(-1);

	// 设置列内容和属性
	newTd0.align = 'center';
	newTd1.align = 'center';
	newTd2.align = 'center';
	newTd3.align = 'center';
	newTd4.align = 'center';
	newTd5.align = 'center';
	newTd6.align = 'center';
	newTd7.align = 'center';
	newTd8.align = 'center';
	newTd9.align = 'center';

	newTd0.innerHTML = (i + 1).toString();
	if (obj.subFeeCourse == "1") {
		coursetmp = courseLoad[0];
	} else if (obj.subFeeCourse == "2") {
		coursetmp = courseLoad[1];
	} else if (obj.subFeeCourse == "3") {
		coursetmp = courseLoad[2];
	} else if (obj.subFeeCourse == "4") {
		coursetmp = courseLoad[3];
	} else if (obj.subFeeCourse == "5") {
		coursetmp = courseLoad[4];
	} else if (obj.subFeeCourse == "6") {
		coursetmp = courseLoad[5];
	} else if (obj.subFeeCourse == "7") {
		coursetmp = courseLoad[6];
	} else if (obj.subFeeCourse == "8") {
		coursetmp = courseLoad[7];
	} else if (obj.subFeeCourse == "9") {
		coursetmp = courseLoad[8];
	} else if (obj.subFeeCourse == "10") {
		coursetmp = courseLoad[9];
	}

	newTd1.innerHTML = coursetmp;
	newTd2.innerHTML = obj.product;
	newTd3.innerHTML = obj.teacher;
	newTd4.innerHTML = obj.className;
	newTd5.innerHTML = dateJS("Y-M-d", obj.attandenceTime);
	newTd6.innerHTML = dateJS("H:i", obj.attandenceTime).toString() + "~" + dateJS("H:i", parseInt(obj.attandenceTime) + parseInt(obj.period * 60)).toString();
	newTd7.innerHTML = obj.attendance;
	if (obj.notAttendanceReason == "") {
		newTd8.innerHTML = "/";
	} else {
		newTd8.innerHTML = obj.notAttendanceReason;
	}
	if (obj.product == "一对一") {
		newTd9.innerHTML = parseInt(obj.price) * parseInt(obj.period) / 60.0;
	} else if (obj.product == "班课") {
		newTd9.innerHTML = obj.price;
	}

	// 添加表格样式
	$("#sqlClassTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlClassTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlClassTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlClassTable tr:even").addClass("rowBgColorEven");
}

function appendRowStatisticClass(TableID, data) {
	// 添加一行
	var newTr = TableID.insertRow(0);
	// 添加两列
	var newTd0 = newTr.insertCell(-1);
	var newTd1 = newTr.insertCell(-1);
	var newTd2 = newTr.insertCell(-1);
	var newTd3 = newTr.insertCell(-1);
	var newTd4 = newTr.insertCell(-1);
	var newTd5 = newTr.insertCell(-1);
	var newTd6 = newTr.insertCell(-1);
	var newTd7 = newTr.insertCell(-1);
	var newTd8 = newTr.insertCell(-1);
	var newTd9 = newTr.insertCell(-1);

	// 设置列内容和属性
	newTd0.align = 'center';
	newTd1.align = 'center';
	newTd2.align = 'center';
	newTd3.align = 'center';
	newTd4.align = 'center';
	newTd5.align = 'center';
	newTd6.align = 'center';
	newTd7.align = 'center';
	newTd8.align = 'center';
	newTd9.align = 'center';

	newTd0.innerHTML = "统计结果";
	newTd1.innerHTML = "";
	newTd2.innerHTML = "出勤次数";
	newTd3.innerHTML = data[0];
	newTd4.innerHTML = "请假次数";
	newTd5.innerHTML = data[1];
	newTd6.innerHTML = "旷课次数";
	newTd7.innerHTML = data[2];
	newTd8.innerHTML = "扣费总额";
	newTd9.innerHTML = data[3];
}

// 窗口表格删除一行
function removeRow(TableID) {
	var tabObj = document.getElementById(TableID);
	tableRowCount = document.getElementById(TableID).rows.length;
	for (var j = 0; j < tableRowCount; j++) {
		// 从表格首行开始删除，所以使用0，如果要保留首行则使用1
		tabObj.deleteRow(0);
	}
	tableRowCount = 0;
}

function GetCookie(sName) {
	var aCookie = document.cookie.split("; ");
	for (var i = 0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
			return unescape(aCrumb[1]);
	}
	return null;
}

// 页面初始化
function initPage() {
	// 默认填写当前日期
	document.getElementsByName("timeStart")[0].value = getYear0FormatDate();
	document.getElementsByName("timeEnd")[0].value = getNowFormatDate();

	// 查询校长设置中的所有科目，用于载入查询条件中的科目
	sqlCourse();

	// 如果是学生自动填充姓名，然后自动查询
	if (GetCookie('role') == '0') {
		document.getElementsByName("sqlName")[0].value = decodeURIComponent(GetCookie('userName'));
		document.getElementsByName("sqlName")[0].disabled = 'true';
		sqlSome();
	}

}

//oTable为表的id，iRow和iCol是从0开始的，iRow=0表示的是第一行，iCol=0表示的是第一列。
function setHiddenCol(oTable, iCol) {
	for (var i = 0; i < oTable.rows.length; i++) {
		oTable.rows[i].cells[iCol].style.display = "none";
		//如果该列隐藏则让其显示，反之则让其隐藏
		//oTable.rows[i].cells[iCol].style.display=="none"?"block":"none";
		//oTable.rows[i].deleteCell(iCol);
	}
}

function showTable(flag) {
	if (flag == 1) {
		document.getElementById("sqlBasicTable").style.display = '';
		document.getElementById("sqlClassTable").style.display = 'none';
		document.getElementById("sqlFeeTable").style.display = 'none';
	}
	if (flag == 2) {
		document.getElementById("sqlBasicTable").style.display = 'none';
		document.getElementById("sqlClassTable").style.display = '';
		document.getElementById("sqlFeeTable").style.display = 'none';
	}
	if (flag == 3) {
		document.getElementById("sqlBasicTable").style.display = 'none';
		document.getElementById("sqlClassTable").style.display = 'none';
		document.getElementById("sqlFeeTable").style.display = 'block';
	}
	if (flag == 4) {
		document.getElementById("sqlBasicTable").style.display = '';
		document.getElementById("sqlClassTable").style.display = '';
		document.getElementById("sqlFeeTable").style.display = 'block';
	}
}

// 导出表格到CSV
function exportToCSVsqlSome(aLink) {
	// var str = "栏位1,栏位2,栏位3\n值1,值2,值3";
	//var str = "报表类型,一对一查询,";
	var str = GetInfoFromTableSqlSome();
	str = encodeURIComponent(str);
	aLink.href = "data:text/csv;charset=utf-8,\ufeff" + str;
}

// 获得整个表格的具体内容并返回字符串
function GetInfoFromTableSqlSome(tableid) {
	var tableInfo = "";
	var strtmp = "";
	var tableObj = document.getElementById("sqlBasicTable");

	// 基本信息表1
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
	tableInfo += "\n";

	// 考勤记录表2
	tableObj = document.getElementById("sqlClassTable");
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
	tableInfo += "\n";

	var str = GetInfoFromTableFee("sqlFeeTable");
	tableInfo += str;
	//alert(tableInfo);
	return tableInfo;
}

// 获得非隐藏列的费用表格内容
function GetInfoFromTableFee(tableid) {
	var tableInfo = "";
	var strtmp = "";
	var str;
	var index = new Array();
	var k = -1;
	var flagInArray = 0;
	var tableObj = document.getElementById(tableid);

	// 获得隐藏列的列号保存到index数组中
	for (var i = 0; i < tableObj.rows.length; i++) {//遍历Table的所有Row
		for (var j = 0; j < tableObj.rows[i].cells.length; j++) {//遍历Row中的每一列
			str = tableObj.rows[i].cells[j].innerHTML;
			if ((str.indexOf("费用1") == -1) && (str.indexOf("费用2") == -1) && (str.indexOf("费用3") == -1) && (str.indexOf("费用4") == -1) && (str.indexOf("费用5") == -1)) {

			} else {
				k = k + 1;
				index[k] = j;
			}
		}
	}

	// 真正遍历table当遇到index中的列时不取其内容，即获得非隐藏列的表格内容
	for (var i = 0; i < tableObj.rows.length; i++) {//遍历Table的所有Row
		for (var j = 0; j < tableObj.rows[i].cells.length; j++) {//遍历Row中的每一列
			flagInArray = 0;
			for (var a = 0; a <= k; a++) {
				if (j == index[a]) {
					flagInArray = 1;
					break;
				}
			}

			if (flagInArray == 0) {
				strtmp = tableObj.rows[i].cells[j].innerHTML;

				tableInfo += strtmp;
				//获取Table中单元格的内容

				tableInfo += ",";
			}
		}

		// 一行结束后要加换行，否则表格不换行
		tableInfo += "\n";
	}
	// alert(index);
	//alert(tableInfo);
	return tableInfo;
}

function sqlCourse() {
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
					// alert("");
				} else if (ret == "2") {
					// document.getElementsByName("submitAdd")[0].disabled =
					// true;
					// alert("检查到该校区名有多条记录，请联系管理员！");
				} else {
					// document.getElementsByName("submitAdd")[0].disabled =
					// true;

					// var info = eval(ret);
					info = eval(ret);

					// var len = 0;
					len = 0;
					for (var tmp in info) {
						len++;
					}

					// 根据所选校区自动加载相应的科目
					// 根据所选校区自动加载相应的科目
					var courseNameIndex = new Array();
					for (var i = 0; i < maxCourseNum; i++) {
						courseNameIndex[i] = 0;
					}
					for (var i = 0; i < len; i++) {
						if (info[i].course1 != "") {
							courseNameIndex[0] = i;
						}
						if (info[i].course2 != "") {
							courseNameIndex[1] = i;
						}
						if (info[i].course3 != "") {
							courseNameIndex[2] = i;
						}
						if (info[i].course4 != "") {
							courseNameIndex[3] = i;
						}
						if (info[i].course5 != "") {
							courseNameIndex[4] = i;
						}
						if (info[i].course6 != "") {
							courseNameIndex[5] = i;
						}
						if (info[i].course7 != "") {
							courseNameIndex[6] = i;
						}
						if (info[i].course8 != "") {
							courseNameIndex[7] = i;
						}
						if (info[i].course9 != "") {
							courseNameIndex[8] = i;
						}
						if (info[i].course10 != "") {
							courseNameIndex[9] = i;
						}
					}

					courseLoad[0] = info[courseNameIndex[0]].course1;
					courseLoad[1] = info[courseNameIndex[1]].course2;
					courseLoad[2] = info[courseNameIndex[2]].course3;
					courseLoad[3] = info[courseNameIndex[3]].course4;
					courseLoad[4] = info[courseNameIndex[4]].course5;
					courseLoad[5] = info[courseNameIndex[5]].course6;
					courseLoad[6] = info[courseNameIndex[6]].course7;
					courseLoad[7] = info[courseNameIndex[7]].course8;
					courseLoad[8] = info[courseNameIndex[8]].course9;
					courseLoad[9] = info[courseNameIndex[9]].course10;
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "../admin/principalSet.php";
	url = url + '?noValue=""';
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}