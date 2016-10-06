/**
 * @author zyx
 */

var info;
var i = 0;
var len = 0;
var flagSubmit = false;
var productLoad = new Array();
var strtmp = "";
var maxCourseNum = 10;
var courseLoad = new Array();

function sqlStudent() {
	var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].options.selectedIndex].text;
	if (schoolZone == "-请选择-") {
		schoolZone = "%";
	}
	var grade = document.getElementsByName("grade")[0].value;
	if (grade == "0") {
		grade = "%";
	}
	var course = document.getElementsByName("course")[0].value;
	if (course == "0") {
		course = "%";
	}
	var state = document.getElementsByName("state")[0].value;
	if (state == "0") {
		state = "%";
	}
	var product = document.getElementsByName("product")[0].options[document.getElementsByName("product")[0].options.selectedIndex].text;
	if (product == "-请选择-") {
		product = "%";
	}
	var sex = document.getElementsByName("sex")[0].value;
	if (sex == "0") {
		sex = "%";
	}
	var classInMLS = document.getElementsByName("classInMLS")[0].value;
	if (classInMLS == "0") {
		classInMLS = "%";
	}
	var timeStart = document.getElementsByName("timeStart")[0].value;
	if (timeStart == "") {
		timeStart = "%";
	}
	var timeEnd = document.getElementsByName("timeEnd")[0].value;
	if (timeEnd == "") {
		timeEnd = "%";
	}
	var name = document.getElementsByName("name")[0].value;
	if (name == "") {
		name = "%";
	}
	var studyState = document.getElementsByName("studyState")[0].value;

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

				removeRow('sqlStudentTable');

				if (ret == "0") {
					alert("该查询条件下无学生信息记录，请核对查询条件！");
				} else {
					var infoStudent = eval(ret);

					appendRowHeader(sqlStudentTable);

					i = 0;
					for (var tmp in infoStudent) {
						appendRow(infoStudent[i], i);
						i++;
					}

				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlStudent.php";
	url = url + "?sqlStudent=1" + "&schoolZone=" + encodeURIComponent(schoolZone) + "&grade=" + grade + "&course=" + course + "&state=" + state + "&product=" + encodeURIComponent(product) + "&sex=" + sex + "&classIDInMLS=" + classInMLS + "&timeStart=" + timeStart + "&timeEnd=" + timeEnd + "&name=" + name + "&studyState=" + studyState;

	// alert(url);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadPrincipalSetAndTeacher() {
	if (document.getElementsByName("schoolZone")[0].value > 0) {
		var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;

		loadPrincipalSet(schoolZone);
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

					var obj = document.getElementsByName("classInMLS")[0];

					// 先清除所有以前选择加进来的，只保留第一个选择的内容
					for ( i = 1; i < obj.options.length; ) {
						obj.removeChild(obj.options[i]);
					}

					// 再增加数据库中的教师姓名
					//alert(ret);
					i = 0;
					for (var tmp in info) {
						//obj.options.add(new Option(info[i].class, i + 1));
						obj.options.add(new Option(info[i].class, info[i].id));
						i++;
					}

				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};

	// 3发出http请求
	var url = "sqlStudent.php";
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
		obj.options.add(new Option(courseLoad[0], i));
		i++;
	}
	if (info[index].course2 != "") {
		obj.options.add(new Option(courseLoad[1], i));
		i++;
	}
	if (info[index].course3 != "") {
		obj.options.add(new Option(courseLoad[2], i));
		i++;
	}
	if (info[index].course4 != "") {
		obj.options.add(new Option(courseLoad[3], i));
		i++;
	}
	if (info[index].course5 != "") {
		obj.options.add(new Option(courseLoad[4], i));
		i++;
	}
	if (info[index].course6 != "") {
		obj.options.add(new Option(courseLoad[5], i));
		i++;
	}
	if (info[index].course7 != "") {
		obj.options.add(new Option(courseLoad[6], i));
		i++;
	}
	if (info[index].course8 != "") {
		obj.options.add(new Option(courseLoad[7], i));
		i++;
	}
	if (info[index].course9 != "") {
		obj.options.add(new Option(courseLoad[8], i));
		i++;
	}
	if (info[index].course10 != "") {
		obj.options.add(new Option(courseLoad[9], i));
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
	if (info[index].grade7 != "") {
		obj.options.add(new Option("初一", 7));
	}
	if (info[index].grade8 != "") {
		obj.options.add(new Option("初二", 8));
	}
	if (info[index].grade9 != "") {
		obj.options.add(new Option("初三", 9));
	}
	if (info[index].grade10 != "") {
		obj.options.add(new Option("高一", 10));
	}
	if (info[index].grade11 != "") {
		obj.options.add(new Option("高二", 11));
	}
	if (info[index].grade12 != "") {
		obj.options.add(new Option("高三", 12));
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

					// 查询校长设置中的所有科目，用于载入查询条件中的科目
					sqlCourse();
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlStudent.php";
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

	newTd0.innerHTML = "序号";
	newTd1.innerHTML = "ID";
	newTd2.innerHTML = "姓名1";
	newTd3.innerHTML = "姓名2";
	newTd4.innerHTML = "性别";
	newTd5.innerHTML = "校区1";
	newTd6.innerHTML = "校区2";
	newTd7.innerHTML = "校区3";
	newTd8.innerHTML = "学校1";
	newTd9.innerHTML = "学校2";
	newTd10.innerHTML = "年级";
	newTd11.innerHTML = "班级";
	newTd12.innerHTML = "学生电话";
	newTd13.innerHTML = "学生微信";
	newTd14.innerHTML = "学生QQ";
	newTd15.innerHTML = "妈妈电话";
	newTd16.innerHTML = "妈妈微信";
	newTd17.innerHTML = "爸爸电话";
	newTd18.innerHTML = "爸爸微信";
	newTd19.innerHTML = "家庭地址";
	newTd20.innerHTML = "报名时间";
	newTd21.innerHTML = "退学时间";
	newTd22.innerHTML = courseLoad[0];
	newTd23.innerHTML = courseLoad[0] + "状态";
	newTd24.innerHTML = courseLoad[0] + "产品";
	newTd25.innerHTML = courseLoad[1];
	newTd26.innerHTML = courseLoad[1] + "状态";
	newTd27.innerHTML = courseLoad[1] + "产品";
	newTd28.innerHTML = courseLoad[2];
	newTd29.innerHTML = courseLoad[2] + "状态";
	newTd30.innerHTML = courseLoad[2] + "产品";
	newTd31.innerHTML = courseLoad[3];
	newTd32.innerHTML = courseLoad[3] + "状态";
	newTd33.innerHTML = courseLoad[3] + "产品";
	newTd34.innerHTML = courseLoad[4];
	newTd35.innerHTML = courseLoad[4] + "状态";
	newTd36.innerHTML = courseLoad[4] + "产品";
	newTd37.innerHTML = courseLoad[5];
	newTd38.innerHTML = courseLoad[5] + "状态";
	newTd39.innerHTML = courseLoad[5] + "产品";
	newTd40.innerHTML = courseLoad[6];
	newTd41.innerHTML = courseLoad[6] + "状态";
	newTd42.innerHTML = courseLoad[6] + "产品";
	newTd43.innerHTML = courseLoad[7];
	newTd44.innerHTML = courseLoad[7] + "状态";
	newTd45.innerHTML = courseLoad[7] + "产品";
	newTd46.innerHTML = courseLoad[8];
	newTd47.innerHTML = courseLoad[8] + "状态";
	newTd48.innerHTML = courseLoad[8] + "产品";
	newTd49.innerHTML = courseLoad[9];
	newTd50.innerHTML = courseLoad[9] + "状态";
	newTd51.innerHTML = courseLoad[9] + "产品";
}

// 插入班课表格相关函数
function appendRow(obj, index) {
	// 序号从1开始
	index = index + 1;

	var TableID = sqlStudentTable;

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

	/*
	 var attandenceDate = dateJS("Y-M-d", mat[5]);
	 var attandenceTimeStart = dateJS("H:i", mat[5]);

	 var attandenceTimeEnd = dateJS("H:i", parseInt(mat[5])+mat[11]*60);
	 var strTimePeriod = attandenceTimeStart +"~"+ attandenceTimeEnd;
	 var nameTmp = "";
	 */
	newTd0.innerHTML = index;
	newTd1.innerHTML = obj.uid;
	newTd2.innerHTML = obj.name1;
	if (obj.name2 == "") {
		newTd3.innerHTML = "/";
	} else {
		newTd3.innerHTML = obj.name2;
	}

	if (obj.sex == "1") {
		newTd4.innerHTML = "男";
	} else if (obj.sex == "2") {
		newTd4.innerHTML = "女";
	} else {
		newTd4.innerHTML = "未填写";
	}
	strtmp = obj.schoolZone1;
	newTd5.innerHTML = strtmp.substr(0, strtmp.length - 1);
	if (obj.schoolZone2 == "") {
		newTd6.innerHTML = "/";
	} else {
		strtmp = obj.schoolZone2;
		newTd6.innerHTML = strtmp.substr(0, strtmp.length - 1);
	}
	if (obj.schoolZone3 == "") {
		newTd7.innerHTML = "/";
	} else {
		strtmp = obj.schoolZone3;
		newTd7.innerHTML = strtmp.substr(0, strtmp.length - 1);
	}
	newTd8.innerHTML = obj.school1;
	if (obj.schoolZone3 == "") {
		newTd9.innerHTML = "/";
	} else {
		newTd9.innerHTML = obj.school2;
	}
	if (obj.grade == "7") {
		newTd10.innerHTML = "初一";
	}
	if (obj.grade == "8") {
		newTd10.innerHTML = "初二";
	}
	if (obj.grade == "9") {
		newTd10.innerHTML = "初三";
	}
	if (obj.grade == "10") {
		newTd10.innerHTML = "高一";
	}
	if (obj.grade == "11") {
		newTd10.innerHTML = "高二";
	}
	if (obj.grade == "12") {
		newTd10.innerHTML = "高三";
	}
	if (parseInt(obj.grade) >= 13) {
		newTd10.innerHTML = "大学";
	}

	newTd11.innerHTML = obj.class;
	newTd12.innerHTML = obj.studentTel;
	newTd13.innerHTML = obj.studentWX;
	newTd14.innerHTML = obj.studentQQ;
	newTd15.innerHTML = obj.motherTel;
	newTd16.innerHTML = obj.motherWX;
	newTd17.innerHTML = obj.fatherTel;
	newTd18.innerHTML = obj.fatherWX;
	newTd19.innerHTML = obj.address;
	newTd20.innerHTML = dateJS("Y-m-d", obj.inTime);
	if (obj.outTime == "") {
		newTd21.innerHTML = "未退学";
	} else {
		newTd21.innerHTML = dateJS("Y-m-d", obj.outTime);
	}

	if ((obj.course1StateInGrade == "1") || (obj.course1StateInGrade == "3")) {
		newTd22.innerHTML = courseLoad[0];
		newTd23.innerHTML = "在班";
	} else if (obj.course1StateInGrade == "2") {
		newTd22.innerHTML = courseLoad[0];
		newTd23.innerHTML = "试听";
	}
	newTd24.innerHTML = obj.course1Product;
	if ((obj.course1StateInGrade == "0") || (obj.course1StateInGrade == "4") || (obj.course1Product == "")) {
		newTd22.innerHTML = "/";
		newTd23.innerHTML = "/";
		newTd24.innerHTML = "/";
	}
	if ((obj.course1StateInGrade == "5") && (obj.course1Product != "")) {
		newTd22.innerHTML = courseLoad[0];
		newTd23.innerHTML = "退学";
	}

	if ((obj.course2StateInGrade == "1") || ((obj.course2StateInGrade == "3"))) {
		newTd25.innerHTML = courseLoad[1];
		newTd26.innerHTML = "在班";
	} else if (obj.course2StateInGrade == "2") {
		newTd25.innerHTML = courseLoad[1];
		newTd26.innerHTML = "试听";
	}
	newTd27.innerHTML = obj.course2Product;

	if ((obj.course2StateInGrade == "0") || (obj.course2StateInGrade == "4") || (obj.course2Product == "")) {
		newTd25.innerHTML = "/";
		newTd26.innerHTML = "/";
		newTd27.innerHTML = "/";
	}
	if ((obj.course2StateInGrade == "5") && (obj.course2Product != "")) {
		newTd25.innerHTML = courseLoad[1];
		newTd26.innerHTML = "退学";
	}

	if ((obj.course3StateInGrade == "1") || ((obj.course3StateInGrade == "3"))) {
		newTd28.innerHTML = courseLoad[2];
		newTd29.innerHTML = "在班";
	} else if (obj.course3StateInGrade == "2") {
		newTd28.innerHTML = courseLoad[2];
		newTd29.innerHTML = "试听";
	}
	newTd30.innerHTML = obj.course3Product;
	if ((obj.course3StateInGrade == "0") || (obj.course3StateInGrade == "4") || (obj.course3Product == "")) {
		newTd28.innerHTML = "/";
		newTd29.innerHTML = "/";
		newTd30.innerHTML = "/";
	}
	if ((obj.course3StateInGrade == "5") && (obj.course3Product != "")) {
		newTd28.innerHTML = courseLoad[2];
		newTd29.innerHTML = "退学";
	}

	if ((obj.course4StateInGrade == "1") || ((obj.course4StateInGrade == "3"))) {
		newTd31.innerHTML = courseLoad[3];
		newTd32.innerHTML = "在班";
	} else if (obj.course4StateInGrade == "2") {
		newTd31.innerHTML = courseLoad[3];
		newTd32.innerHTML = "试听";
	}
	newTd33.innerHTML = obj.course4Product;
	if ((obj.course4StateInGrade == "0") || (obj.course4StateInGrade == "4") || (obj.course4Product == "")) {
		newTd31.innerHTML = "/";
		newTd32.innerHTML = "/";
		newTd33.innerHTML = "/";
	}
	if ((obj.course4StateInGrade == "5") && (obj.course4Product != "")) {
		newTd31.innerHTML = courseLoad[3];
		newTd32.innerHTML = "退学";
	}

	if ((obj.course5StateInGrade == "1") || ((obj.course5StateInGrade == "3"))) {
		newTd34.innerHTML = courseLoad[4];
		newTd35.innerHTML = "在班";
	} else if (obj.course5StateInGrade == "2") {
		newTd34.innerHTML = courseLoad[4];
		newTd35.innerHTML = "试听";
	}
	newTd36.innerHTML = obj.course5Product;
	if ((obj.course5StateInGrade == "0") || (obj.course5StateInGrade == "4") || (obj.course5Product == "")) {
		newTd34.innerHTML = "/";
		newTd35.innerHTML = "/";
		newTd36.innerHTML = "/";
	}
	if ((obj.course5StateInGrade == "5") && (obj.course5Product != "")) {
		newTd34.innerHTML = courseLoad[4];
		newTd35.innerHTML = "退学";
	}

	if ((obj.course6StateInGrade == "1") || ((obj.course6StateInGrade == "3"))) {
		newTd37.innerHTML = courseLoad[5];
		newTd38.innerHTML = "在班";
	} else if (obj.course6StateInGrade == "2") {
		newTd37.innerHTML = courseLoad[5];
		newTd38.innerHTML = "试听";
	}
	newTd36.innerHTML = obj.course6Product;
	if ((obj.course6StateInGrade == "0") || (obj.course6StateInGrade == "4") || (obj.course6Product == "")) {
		newTd37.innerHTML = "/";
		newTd38.innerHTML = "/";
		newTd39.innerHTML = "/";
	}
	if ((obj.course6StateInGrade == "5") && (obj.course6Product != "")) {
		newTd37.innerHTML = courseLoad[5];
		newTd38.innerHTML = "退学";
	}

	if ((obj.course7StateInGrade == "1") || ((obj.course7StateInGrade == "3"))) {
		newTd40.innerHTML = courseLoad[6];
		newTd41.innerHTML = "在班";
	} else if (obj.course7StateInGrade == "2") {
		newTd40.innerHTML = courseLoad[6];
		newTd41.innerHTML = "试听";
	}
	newTd36.innerHTML = obj.course7Product;
	if ((obj.course7StateInGrade == "0") || (obj.course7StateInGrade == "4") || (obj.course7Product == "")) {
		newTd40.innerHTML = "/";
		newTd41.innerHTML = "/";
		newTd42.innerHTML = "/";
	}
	if ((obj.course7StateInGrade == "5") && (obj.course7Product != "")) {
		newTd40.innerHTML = courseLoad[6];
		newTd41.innerHTML = "退学";
	}

	if ((obj.course8StateInGrade == "1") || ((obj.course8StateInGrade == "3"))) {
		newTd43.innerHTML = courseLoad[7];
		newTd44.innerHTML = "在班";
	} else if (obj.course8StateInGrade == "2") {
		newTd43.innerHTML = courseLoad[47];
		newTd44.innerHTML = "试听";
	}
	newTd36.innerHTML = obj.course8Product;
	if ((obj.course8StateInGrade == "0") || (obj.course8StateInGrade == "4") || (obj.course8Product == "")) {
		newTd43.innerHTML = "/";
		newTd44.innerHTML = "/";
		newTd45.innerHTML = "/";
	}
	if ((obj.course8StateInGrade == "5") && (obj.course8Product != "")) {
		newTd43.innerHTML = courseLoad[7];
		newTd44.innerHTML = "退学";
	}

	if ((obj.course9StateInGrade == "1") || ((obj.course9StateInGrade == "3"))) {
		newTd46.innerHTML = courseLoad[8];
		newTd47.innerHTML = "在班";
	} else if (obj.course9StateInGrade == "2") {
		newTd46.innerHTML = courseLoad[8];
		newTd47.innerHTML = "试听";
	}
	newTd36.innerHTML = obj.course9Product;
	if ((obj.course9StateInGrade == "0") || (obj.course9StateInGrade == "4") || (obj.course9Product == "")) {
		newTd46.innerHTML = "/";
		newTd47.innerHTML = "/";
		newTd48.innerHTML = "/";
	}
	if ((obj.course9StateInGrade == "5") && (obj.course9Product != "")) {
		newTd46.innerHTML = courseLoad[8];
		newTd47.innerHTML = "退学";
	}

	if ((obj.course10StateInGrade == "1") || ((obj.course10StateInGrade == "3"))) {
		newTd49.innerHTML = courseLoad[9];
		newTd50.innerHTML = "在班";
	} else if (obj.course10StateInGrade == "2") {
		newTd49.innerHTML = courseLoad[9];
		newTd50.innerHTML = "试听";
	}
	newTd36.innerHTML = obj.course10Product;
	if ((obj.course10StateInGrade == "0") || (obj.course10StateInGrade == "4") || (obj.course10Product == "")) {
		newTd49.innerHTML = "/";
		newTd50.innerHTML = "/";
		newTd51.innerHTML = "/";
	}
	if ((obj.course10StateInGrade == "5") && (obj.course10Product != "")) {
		newTd49.innerHTML = courseLoad[9];
		newTd50.innerHTML = "退学";
	}

	// 添加表格样式
	$("#sqlStudentTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlStudentTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlStudentTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlStudentTable tr:even").addClass("rowBgColorEven");

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