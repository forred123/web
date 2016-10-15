/**
 * @author zyx
 */

var info;
var principalSetObj;
var i = 0;
var len = 0;
var flagSubmit = false;
var productLoad = new Array();
var maxCourseNum = 10;
var courseLoad = new Array();

function sqlTeacher() {
	var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].options.selectedIndex].text;
	if (schoolZone == "-请选择-") {
		schoolZone = "%";
	}
	var grade = document.getElementsByName("grade")[0].options[document.getElementsByName("grade")[0].options.selectedIndex].text;
	if (grade == "-请选择-") {
		grade = "%";
	}
	var course = document.getElementsByName("course")[0].options[document.getElementsByName("course")[0].options.selectedIndex].text;
	if (course == "-请选择-") {
		course = "%";
	}
	var product = document.getElementsByName("product")[0].options[document.getElementsByName("product")[0].options.selectedIndex].text;
	if (product == "-请选择-") {
		product = "%";
	}
	var sex = document.getElementsByName("sex")[0].value;
	if (sex == "0") {
		sex = "%";
	}
	var workCondition = document.getElementsByName("workCondition")[0].value;
	if (workCondition == "0") {
		workCondition = "%";
	}
	var workTime = document.getElementsByName("workTime")[0].value;
	if (workTime == "0") {
		workTime = "%";
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

				removeRow('sqlTeacherTable');

				if (ret == "0") {
					alert("该查询条件下无教师信息记录，请核对查询条件！");
				} else {
					info = eval(ret);

					appendRowHeader(sqlTeacherTable);

					var obj1 = document.getElementsByName("schoolZone")[0];
					i = 0;
					for (var tmp in info) {
						appendRow(info[i], i);
						i++;
					}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlTeacher.php";
	url = url + "?sqlTeacher=1" + "&schoolZone=" + encodeURIComponent(schoolZone) + "&grade=" + encodeURIComponent(grade) + "&course=" + encodeURIComponent(course) + "&product=" + encodeURIComponent(product) + "&workCondition=" + workCondition + "&workTime=" + workTime + "&sex=" + sex + "&timeStart=" + timeStart + "&timeEnd=" + timeEnd;

	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadPrincipalSetAndTeacher() {
	if (document.getElementsByName("schoolZone")[0].value > 0) {
		var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;
		loadPrincipalSet(schoolZone);
	}
}

function loadPrincipalSet(schoolZone) {
	loadProduct(schoolZone);
	loadGrade(schoolZone);
	loadCourse(schoolZone);
}

function loadCourse(schoolZone) {
	var index = 0;
	// 根据所选校区自动加载相应的产品
	for ( i = 0; i < len; i++) {
		if (schoolZone == principalSetObj[i].schoolZone) {
			index = i;
			break;
		}
	}

	var obj = document.getElementsByName("course")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 1; i < obj.options.length; ) {
		obj.removeChild(obj.options[i]);
	}

	if (principalSetObj[index].course1 != "") {
		obj.options.add(new Option(courseLoad[0], 1));
	}
	if (principalSetObj[index].course2 != "") {
		obj.options.add(new Option(courseLoad[1], 2));
	}
	if (principalSetObj[index].course3 != "") {
		obj.options.add(new Option(courseLoad[2], 3));
	}
	if (principalSetObj[index].course4 != "") {
		obj.options.add(new Option(courseLoad[3], 4));
	}
	if (principalSetObj[index].course5 != "") {
		obj.options.add(new Option(courseLoad[4], 5));
	}
	if (principalSetObj[index].course6 != "") {
		obj.options.add(new Option(courseLoad[5], 6));
	}
	if (principalSetObj[index].course7 != "") {
		obj.options.add(new Option(courseLoad[6], 7));
	}
	if (principalSetObj[index].course8 != "") {
		obj.options.add(new Option(courseLoad[7], 8));
	}
	if (principalSetObj[index].course9 != "") {
		obj.options.add(new Option(courseLoad[8], 9));
	}
	if (principalSetObj[index].course10 != "") {
		obj.options.add(new Option(courseLoad[9], 10));
	}
}

function loadGrade(schoolZone) {
	var index = 0;
	// 根据所选校区自动加载相应的产品
	for ( i = 0; i < len; i++) {
		if (schoolZone == principalSetObj[i].schoolZone) {
			index = i;
			break;
		}
	}

	var obj = document.getElementsByName("grade")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 3; i < obj.options.length; ) {
		obj.removeChild(obj.options[i]);
	}

	if (principalSetObj[index].grade7 != "") {
		obj.options.add(new Option("初一", 7));
	}
	if (principalSetObj[index].grade8 != "") {
		obj.options.add(new Option("初二", 8));
	}
	if (principalSetObj[index].grade9 != "") {
		obj.options.add(new Option("初三", 9));
	}
	if (principalSetObj[index].grade10 != "") {
		obj.options.add(new Option("高一", 10));
	}
	if (principalSetObj[index].grade11 != "") {
		obj.options.add(new Option("高二", 11));
	}
	if (principalSetObj[index].grade12 != "") {
		obj.options.add(new Option("高三", 12));
	}
}

function loadProduct(schoolZone) {
	var index = 0;
	// 根据所选校区自动加载相应的产品
	for ( i = 0; i < len; i++) {
		if (schoolZone == principalSetObj[i].schoolZone) {
			index = i;
			break;
		}
	}

	for ( i = 0; i < len; i++) {
		if (principalSetObj[i].product1 != "") {
			productLoad[0] = principalSetObj[i].product1;
		}
		if (principalSetObj[i].product2 != "") {
			productLoad[1] = principalSetObj[i].product2;
		}
		if (principalSetObj[i].product3 != "") {
			productLoad[2] = principalSetObj[i].product3;
		}
		if (principalSetObj[i].product4 != "") {
			productLoad[3] = principalSetObj[i].product4;
		}
		if (principalSetObj[i].product5 != "") {
			productLoad[4] = principalSetObj[i].product5;
		}
	}

	var obj = document.getElementsByName("product")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 1; i < obj.options.length; ) {
		obj.removeChild(obj.options[i]);
	}

	i = 1;
	if (principalSetObj[index].product1 != "") {
		obj.options.add(new Option(productLoad[0], i));
		i++;
	}
	if (principalSetObj[index].product2 != "") {
		obj.options.add(new Option(productLoad[1], i));
		i++;
	}
	if (principalSetObj[index].product3 != "") {
		obj.options.add(new Option(productLoad[2], i));
		i++;
	}
	if (principalSetObj[index].product4 != "") {
		obj.options.add(new Option(productLoad[3], i));
		i++;
	}
	if (principalSetObj[index].product5 != "") {
		obj.options.add(new Option(productLoad[4], i));
		i++;
	}
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
					alert("系统内无校区信息，请录入后重新查看！");
				} else if (ret == "2") {
					alert("检查到该校区名有多条记录，请联系管理员！");
				} else {
					principalSetObj = eval(ret);

					var obj1 = document.getElementsByName("schoolZone")[0];
					i = 0;
					for (var tmp in principalSetObj) {
						obj1.options.add(new Option(principalSetObj[i].schoolZone, i + 1));
						i++;
					}
					len = i;

					// 默认填写当前日期
					document.getElementsByName("timeStart")[0].value = getYear0FormatDate();
					document.getElementsByName("timeEnd")[0].value = getNowFormatDate();

					// 查询校长设置中的所有科目，用于载入查询条件中的科目
					sqlCourse();
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlTeacher.php";
	url = url + "?noValue=1";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// 插入班课查询结果表头
function appendRowHeader(TableID) {
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

	newTd0.innerHTML = "序号";
	newTd1.innerHTML = "ID";
	newTd2.innerHTML = "姓名";
	newTd3.innerHTML = "性别";
	newTd4.innerHTML = "校区";
	newTd5.innerHTML = "工资卡卡号";
	newTd6.innerHTML = "工资卡银行";
	newTd7.innerHTML = "工资卡持卡人";
	newTd8.innerHTML = "特殊需求";
	newTd9.innerHTML = "产品名称";
	newTd10.innerHTML = "科目";
	newTd11.innerHTML = "年级";
	newTd12.innerHTML = "毕业学校";
	newTd13.innerHTML = "教师微信";
	newTd14.innerHTML = "教师QQ";
	newTd15.innerHTML = "教师电话";
	newTd16.innerHTML = "邮 箱";
	newTd17.innerHTML = "家庭地址";
	newTd18.innerHTML = "身份证号码";
	newTd19.innerHTML = "在职＆离职";
	newTd20.innerHTML = "全职＆兼职";
	newTd21.innerHTML = "入职时间";
	newTd22.innerHTML = "离职时间";
}

// 插入班课表格相关函数
function appendRow(obj, index) {
	// 序号从1开始
	index = index + 1;

	var TableID = sqlTeacherTable;

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

	/*
	 var attandenceDate = dateJS("Y-M-d", mat[5]);
	 var attandenceTimeStart = dateJS("H:i", mat[5]);

	 var attandenceTimeEnd = dateJS("H:i", parseInt(mat[5])+mat[11]*60);
	 var strTimePeriod = attandenceTimeStart +"~"+ attandenceTimeEnd;
	 var nameTmp = "";
	 */
	newTd0.innerHTML = index;
	newTd1.innerHTML = obj.uid;
	newTd2.innerHTML = obj.name;
	if (obj.sex == "1") {
		newTd3.innerHTML = "男";
	} else if (obj.sex == "2") {
		newTd3.innerHTML = "女";
	} else {
		newTd3.innerHTML = "未填写";
	}
	newTd4.innerHTML = obj.schoolZone1 + "-" + obj.schoolZone2 + "-" + obj.schoolZone3 + "-" + obj.schoolZone4 + "-" + obj.schoolZone5;
	newTd5.innerHTML = obj.bankCardNumber;
	newTd6.innerHTML = obj.bank;
	newTd7.innerHTML = obj.bankCardUser;
	newTd8.innerHTML = obj.requireConditon;
	newTd9.innerHTML = obj.product1 + "-" + obj.product2 + "-" + obj.product3 + "-" + obj.product4 + "-" + obj.product5;
	newTd10.innerHTML = obj.course1 + "-" + obj.course2 + "-" + obj.course3 + "-" + obj.course4 + "-" + obj.course5;
	newTd11.innerHTML = obj.grade7 + "-" + obj.grade8 + "-" + obj.grade9 + "-" + obj.grade10 + "-" + obj.grade11 + "-" + obj.grade12;
	newTd12.innerHTML = obj.school;
	newTd13.innerHTML = obj.teacherWX;
	newTd14.innerHTML = obj.teacherQQ;
	newTd15.innerHTML = obj.teacherTel;
	newTd16.innerHTML = obj.teacherEmail;
	newTd17.innerHTML = obj.address;
	newTd18.innerHTML = obj.idCardNum;
	if (obj.workCondition == "1") {
		newTd19.innerHTML = "在职";
	} else if (obj.workCondition == "2") {
		newTd19.innerHTML = "离职";
	} else {
		newTd19.innerHTML = "未填写";
	}

	if (obj.workTime == "1") {
		newTd20.innerHTML = "全职";
	} else if (obj.workTime == "2") {
		newTd20.innerHTML = "兼职";
	} else {
		newTd20.innerHTML = "未填写";
	}
	if (obj.inTime == "") {
		newTd21.innerHTML = "未填写";
	} else {
		newTd21.innerHTML = dateJS("Y-m-d", obj.inTime);
	}

	if (obj.outTime == "") {
		newTd22.innerHTML = "未离职";
	} else {
		newTd22.innerHTML = dateJS("Y-m-d", obj.outTime);
	}

	// 添加表格样式
	$("#sqlTeacherTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlTeacherTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlTeacherTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlTeacherTable tr:even").addClass("rowBgColorEven");

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