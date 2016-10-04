/**
 * @author zyx
 */

var info;
var i = 0;
var len = 0;
var productLoad = new Array;

//根据筛选条件进行查找班级，然后添加到班级查询结果中
function sqlClassInfo() {
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

				removeRow('sqlGradeTable');

				if (ret == "0") {
					alert("没有符合该条件的班级！");
				} else {
					var info = eval(ret);

					appendRowHeader(sqlGradeTable);
					// 再增加数据库中的教师姓名
					var i = 0;
					for (var tmp in info) {
						appendRow(sqlGradeTable, info[i], i);
						i++;
					}
				}
			} else {
				alert("错误，请求页面异常！");
			}
		}

	};

	// mysql 查询通配符
	var str1 = "%";
	var str2 = "%";
	var str3 = "%";
	var str4 = "%";
	var str5 = "%";
	var str6 = "%";

	if (document.getElementsByName("schoolZone")[0].value != 0) {
		str1 = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;
		str1 = encodeURIComponent(str1);
	}
	if (document.getElementsByName("grade")[0].value != 0) {
		str2 = document.getElementsByName("grade")[0].options[document.getElementsByName("grade")[0].value].text;
		str2 = encodeURIComponent(str2);
	}
	if (document.getElementsByName("course")[0].value != 0) {
		str3 = document.getElementsByName("course")[0].options[document.getElementsByName("course")[0].value].text;
		str3 = encodeURIComponent(str3);
	}
	if (document.getElementsByName("product")[0].value != 0) {
		str4 = document.getElementsByName("product")[0].options[document.getElementsByName("product")[0].value].text;
		str4 = encodeURIComponent(str4);
	}
	if (document.getElementsByName("teacher")[0].value != 0) {
		str5 = document.getElementsByName("teacher")[0].options[document.getElementsByName("teacher")[0].value].text;
		str5 = encodeURIComponent(str5);
	}
	if (document.getElementsByName("class")[0].value != 0) {
		str6 = document.getElementsByName("class")[0].options[document.getElementsByName("class")[0].value].text;
		str6 = encodeURIComponent(str6);
	}

	// 3发出http请求
	var startTimeTmp = document.getElementsByName("timeStart")[0].value;
	var endTimeTmp = document.getElementsByName("timeEnd")[0].value;
	var url = "sqlGrade.php";
	url = url + "?sqlGrade=1" + "&startTime=" + startTimeTmp + "&endTime=" + endTimeTmp + "&schoolZone=" + str1 + "&grade=" + str2 + "&course=" + str3 + "&product=" + str4 + "&teacher=" + str5 + "&class=" + str6;
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	//alert(url);
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadPrincipalSetAndTeacher() {
	var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;
	if (document.getElementsByName("schoolZone")[0].value > 0) {
		loadPrincipalSet(schoolZone);
		// ajax 获得教师姓名
		loadTeacher(schoolZone);
		// ajax 获得班级名称
		loadGradeSetName(schoolZone);
	}
}

// 根据校区名载入该校区的班级名
function loadGradeSetName(schoolZone) {
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
					alert("该校区目前没有班级！");
				} else {
					var info = eval(ret);

					var obj = document.getElementsByName("class")[0];

					// 先清除所有以前选择加进来的，只保留第一个选择的内容
					for ( i = 1; i < obj.options.length; ) {
						obj.removeChild(obj.options[i]);
					}

					// 再增加数据库中的教师姓名
					i = 0;
					for (var tmp in info) {
						obj.options.add(new Option(info[i].class, i + 1));
						i++;
					}

				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};

	// 3发出http请求
	var url = "sqlGrade.php";
	url = url + "?sqlClassNameBySchoolZone=" + encodeURIComponent(schoolZone);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
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
		if (schoolZone == info[i].schoolZone) {
			index = i;
			break;
		}
	}

	var obj = document.getElementsByName("course")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 1; i < obj.options.length; ) {
		obj.removeChild(obj.options[i]);
	}
	i = 1;
	if (info[index].course1 != "") {
		obj.options.add(new Option("数学", i));
		i++;
	}
	if (info[index].course2 != "") {
		obj.options.add(new Option("语文", i));
		i++;
	}
	if (info[index].course3 != "") {
		obj.options.add(new Option("英语", i));
		i++;
	}
	if (info[index].course4 != "") {
		obj.options.add(new Option("物理", i));
		i++;
	}
	if (info[index].course5 != "") {
		obj.options.add(new Option("化学", i));
		i++;
	}
}

function loadGrade(schoolZone) {
	var index = 0;
	// 根据所选校区自动加载相应的产品
	for ( i = 0; i < len; i++) {
		if (schoolZone == info[i].schoolZone) {
			index = i;
			break;
		}
	}

	var obj = document.getElementsByName("grade")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 1; i < obj.options.length; ) {
		obj.removeChild(obj.options[i]);
	}
	i = 1;
	if (info[index].grade7 != "") {
		obj.options.add(new Option("初一", i));
		i++;
	}
	if (info[index].grade8 != "") {
		obj.options.add(new Option("初二", i));
		i++;
	}
	if (info[index].grade9 != "") {
		obj.options.add(new Option("初三", i));
		i++;
	}
	if (info[index].grade10 != "") {
		obj.options.add(new Option("高一", i));
		i++;
	}
	if (info[index].grade11 != "") {
		obj.options.add(new Option("高二", i));
		i++;
	}
	if (info[index].grade12 != "") {
		obj.options.add(new Option("高三", i));
		i++;
	}
}

function loadProduct(schoolZone) {
	var index = 0;
	// 根据所选校区自动加载相应的产品
	for ( i = 0; i < len; i++) {
		if (schoolZone == info[i].schoolZone) {
			index = i;
			break;
		}
	}

	for ( i = 0; i < len; i++) {
		if (info[i].product1 != "") {
			productLoad[0] = info[i].product1;
		}
		if (info[i].product2 != "") {
			productLoad[1] = info[i].product2;
		}
		if (info[i].product3 != "") {
			productLoad[2] = info[i].product3;
		}
		if (info[i].product4 != "") {
			productLoad[3] = info[i].product4;
		}
		if (info[i].product5 != "") {
			productLoad[4] = info[i].product5;
		}
	}

	var obj = document.getElementsByName("product")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 1; i < obj.options.length; ) {
		obj.removeChild(obj.options[i]);
	}

	i = 1;
	if (info[index].product1 != "") {
		obj.options.add(new Option(productLoad[0], i));
		i++;
	}
	if (info[index].product2 != "") {
		obj.options.add(new Option(productLoad[1], i));
		i++;
	}
	if (info[index].product3 != "") {
		obj.options.add(new Option(productLoad[2], i));
		i++;
	}
	if (info[index].product4 != "") {
		obj.options.add(new Option(productLoad[3], i));
		i++;
	}
	if (info[index].product5 != "") {
		obj.options.add(new Option(productLoad[4], i));
		i++;
	}
}

function loadTeacher(schoolZone) {
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
					alert("该校区目前没有教师！");
				} else if (ret == "2") {
					alert("检查到该校区名有多条记录，请联系管理员！");
				} else {
					var teacher = eval(ret);

					var obj = document.getElementsByName("teacher")[0];

					// 先清除所有以前选择加进来的，只保留第一个选择的内容
					for ( i = 1; i < obj.options.length; ) {
						obj.removeChild(obj.options[i]);
					}

					// 再增加数据库中的教师姓名
					i = 0;
					for (var tmp in teacher) {
						obj.options.add(new Option(teacher[i].name, i + 1));
						i++;
					}

				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};

	// 3发出http请求
	var url = "sqlGrade.php";
	url = url + "?schoolZoneSQL=" + encodeURIComponent(schoolZone);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
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
					alert("系统内无校区信息，请在[校长设置]中录入后重新查看！");
				} else if (ret == "2") {
					alert("检查到该校区名有多条记录，请联系管理员！");
				} else {
					// document.getElementsByName("submitAdd")[0].disabled =
					// true;
					info = eval(ret);

					var obj1 = document.getElementsByName("schoolZone")[0];
					i = 0;
					for (var tmp in info) {
						obj1.options.add(new Option(info[i].schoolZone, i + 1));
						i++;
					}
					len = i;

					// 默认填写当前日期
					document.getElementsByName("timeStart")[0].value = getYear0FormatDate();
					document.getElementsByName("timeEnd")[0].value = getNowFormatDate();

					// ajax 加载交过费还未分班的所有学科学生
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "../admin/gradeSet.php";
	url = url + "?noValue=1";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// 插入查询结果表头
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

	newTd0.innerHTML = "序号";
	newTd1.innerHTML = "开班时间";
	newTd2.innerHTML = "停班时间";
	newTd3.innerHTML = "校区";
	newTd4.innerHTML = "年级";
	newTd5.innerHTML = "科目";
	newTd6.innerHTML = "产品名称";
	newTd7.innerHTML = "任课教师";
	newTd8.innerHTML = "班级名称";

	//添加表格样式
	$("#sqlGradeTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlGradeTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlGradeTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlGradeTable tr:even").addClass("rowBgColorEven");
}

// 插入表格相关函数
function appendRow(TableID, obj, index) {
	// 序号从1开始
	index = index + 1;

	//alert(product);
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

	newTd0.innerHTML = index;
	if (obj.startTime == "") {
		newTd1.innerHTML = "/";
	} else {
		newTd1.innerHTML = dateJS("Y-M-d", obj.startTime);
	}

	if (obj.endTime == "") {
		newTd2.innerHTML = "/";
	} else {
		newTd2.innerHTML = dateJS("Y-M-d", obj.endTime);
	}
	newTd3.innerHTML = obj.schoolZone;
	newTd4.innerHTML = obj.grade;
	newTd5.innerHTML = obj.course;
	newTd6.innerHTML = obj.product;
	newTd7.innerHTML = obj.teacher;
	newTd8.innerHTML = obj.class;

	//添加表格样式
	$("#sqlGradeTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlGradeTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlGradeTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlGradeTable tr:even").addClass("rowBgColorEven");
}

// 窗口表格删除一行
function removeRow(TableID) {
	var tabObj = document.getElementById(TableID);
	var tableRowCount = tabObj.rows.length;
	// 从表格首行开始删除，所以使用0，如果要保留首行则使用1
	for (var j = 0; j < tableRowCount; j++) {
		tabObj.deleteRow(0);
	}
}

