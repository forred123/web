/**
 * @author zyx
 */

var info;
var i = 0;
var len = 0;
var tableRowCount = 0;
var productLoad = new Array;
var maxCourseNum = 10;
var courseLoad = new Array();

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

				var obj = document.getElementsByName("gradeResult")[0];

				// 先清除所有以前选择加进来的，只保留第一个选择的内容
				for ( i = 1; i < obj.options.length; ) {
					obj.removeChild(obj.options[i]);
				}

				if (ret == "0") {
					alert("没有符合该条件的班级！");
				} else {
					var info = eval(ret);

					// 再增加数据库中的教师姓名
					i = 0;
					var result = "";
					var time = "";
					time = dateJS("Y-M-d", info[i].startTime);
					for (var tmp in info) {
						result = time + "-" + info[i].schoolZone + "-" + info[i].grade + "-" + info[i].course + "-" + info[i].product + "-" + info[i].teacher + "-" + info[i].class;
						obj.options.add(new Option(result, info[i].id));
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
	var url = "grade.php";
	url = url + "?noValueA=1" + "&schoolZone=" + str1 + "&grade=" + str2 + "&course=" + str3 + "&product=" + str4 + "&teacher=" + str5 + "&class=" + str6;
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
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
	var url = "grade.php";
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
	var url = "grade.php";
	url = url + "?schoolZoneSQL=" + encodeURIComponent(schoolZone);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadNotInClassStudent(flag, schoolZone, product) {
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
				//alert(ret);

				if (ret == "0") {
					alert("没有交过费待分班学生！");
				} else {

					var info = eval(ret);
					var obj = document.getElementById("studentNotGradeTable");

					i = 0;
					//alert(ret);
					for (var tmp in info) {
						loadstudentNotInGrade(info[i], flag, product);
						i++;
					}

				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "grade.php";
	//url = url + "?classIdInMLS=0";
	url = url + "?stateInGrade=0" + "&schoolZone=" + schoolZone;
	//alert(url);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadstudentNotInGrade(recordStudentObj, flag, product) {
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
					// 只有页面初始化时才显示全部学科交过费待分班学生，其它都是显示某一学科待分班学生，此时不显示提示，否则每个学生都提示一次
					// 以上只是针对某一个学生的，不能得出没有交费但没分班的学生结论，所以不提示有无交费但没分班学生的提示，有就载入，没有也不提示，如果没有提示就是真的没有学生交过费待分班
					//if(flag == 0){
					//alert("没有交过费待分班学生43！");
					//}
				} else {

					var info = eval(ret);
					var obj = document.getElementById("studentNotGradeTable");

					var i = 0;

					//alert(ret);
					// 下面载入的是交过费待分班的学生，针对各个学科，如果该学科交过费待分班则显示出来，交过费已经分班则不显示，
					// 例如某个学生交了两科学费，未分班前显示两个待分班结果，一个一个分班，如果其中一个分完班，则以后不显示这个学科的待分班记录，直到第二个也分班后则不显示有该学生的待分班信息
					for (var tmp in info) {
						if (flag == 0) {
							if ((info[i].course1Product != "") && ((recordStudentObj.course1StateInGrade == "0") || (recordStudentObj.course1StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[0], tableRowCount);
								tableRowCount++;
							}
							if ((info[i].course2Product != "") && ((recordStudentObj.course2StateInGrade == "0") || (recordStudentObj.course2StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[1], tableRowCount);
								tableRowCount++;
							}
							if ((info[i].course3Product != "") && ((recordStudentObj.course3StateInGrade == "0") || (recordStudentObj.course3StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[2], tableRowCount);
								tableRowCount++;
							}
							if ((info[i].course4Product != "") && ((recordStudentObj.course4StateInGrade == "0") || (recordStudentObj.course4StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[3], tableRowCount);
								tableRowCount++;
							}
							if ((info[i].course5Product != "") && ((recordStudentObj.course5StateInGrade == "0") || (recordStudentObj.course5StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[4], tableRowCount);
								tableRowCount++;
							}
							if ((info[i].course6Product != "") && ((recordStudentObj.course6StateInGrade == "0") || (recordStudentObj.course6StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[5], tableRowCount);
								tableRowCount++;
							}
							if ((info[i].course7Product != "") && ((recordStudentObj.course7StateInGrade == "0") || (recordStudentObj.course7StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[6], tableRowCount);
								tableRowCount++;
							}
							if ((info[i].course8Product != "") && ((recordStudentObj.course8StateInGrade == "0") || (recordStudentObj.course8StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[7], tableRowCount);
								tableRowCount++;
							}
							if ((info[i].course9Product != "") && ((recordStudentObj.course9StateInGrade == "0") || (recordStudentObj.course9StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[8], tableRowCount);
								tableRowCount++;
							}
							if ((info[i].course10Product != "") && ((recordStudentObj.course10StateInGrade == "0") || (recordStudentObj.course10StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[9], tableRowCount);
								tableRowCount++;
							}

						}
						if (flag == 1) {
							if ((info[i].course1Product != "") && ((recordStudentObj.course1StateInGrade == "0") || (recordStudentObj.course1StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[0], tableRowCount);
								tableRowCount++;
							}
						}
						if (flag == 2) {
							if ((info[i].course2Product != "") && ((recordStudentObj.course2StateInGrade == "0") || (recordStudentObj.course2StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[1], tableRowCount);
								tableRowCount++;
							}
						}
						if (flag == 3) {
							if ((info[i].course3Product != "") && ((recordStudentObj.course3StateInGrade == "0") || (recordStudentObj.course3StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[2], tableRowCount);
								tableRowCount++;
							}
						}
						if (flag == 4) {
							if ((info[i].course4Product != "") && ((recordStudentObj.course4StateInGrade == "0") || (recordStudentObj.course4StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[3], tableRowCount);
								tableRowCount++;
							}
						}
						if (flag == 5) {
							if ((info[i].course5Product != "") && ((recordStudentObj.course5StateInGrade == "0") || (recordStudentObj.course5StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[4], tableRowCount);
								tableRowCount++;
							}
						}
						if (flag == 6) {
							if ((info[i].course6Product != "") && ((recordStudentObj.course6StateInGrade == "0") || (recordStudentObj.course6StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[5], tableRowCount);
								tableRowCount++;
							}
						}
						if (flag == 7) {
							if ((info[i].course7Product != "") && ((recordStudentObj.course7StateInGrade == "0") || (recordStudentObj.course7StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[6], tableRowCount);
								tableRowCount++;
							}
						}
						if (flag == 8) {
							if ((info[i].course8Product != "") && ((recordStudentObj.course8StateInGrade == "0") || (recordStudentObj.course8StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[7], tableRowCount);
								tableRowCount++;
							}
						}
						if (flag == 9) {
							if ((info[i].course9Product != "") && ((recordStudentObj.course9StateInGrade == "0") || (recordStudentObj.course9StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[8], tableRowCount);
								tableRowCount++;
							}
						}
						if (flag == 10) {
							if ((info[i].course10Product != "") && ((recordStudentObj.course10StateInGrade == "0") || (recordStudentObj.course10StateInGrade == "4"))) {
								appendRow(studentNotGradeTable, recordStudentObj.uid, info[i], courseLoad[9], tableRowCount);
								tableRowCount++;
							}
						}
						i++;
					}

				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "grade.php";
	url = url + "?loadstudentDataInFeeTable=" + recordStudentObj.uid + "&operateCourse=" + encodeURIComponent(document.getElementsByName("operateCourse")[0].value) + "&operateGrade=" + encodeURIComponent(document.getElementsByName("operateGrade")[0].value) + "&operateProduct=" + product;
	//alert(url);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	//false 同步，true异步
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

					// 校区负责人只负责自己校区的事
					if (GetCookie('role') == '8') {
						// 先清除原来的
						var obj = document.getElementsByName("schoolZone")[0];
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
									document.getElementsByName("schoolZone")[0].options.add(new Option(info[i].schoolZone, info[i].id));
								}
							}
							i++;
						};

						// 默认第一个,可能有多个
						document.getElementsByName("schoolZone")[0].value = 1;

						loadPrincipalSetAndTeacher();
					}

					// 默认填写当前日期
					// document.getElementById("dateStart").value =
					// getNowFormatDate();
					// alert(len);

					// ajax 加载交过费还未分班的所有学科学生
					loadNotInClassStudent(0, "%");

					// 查询校长设置中的所有科目，用于载入查询条件中的科目
					sqlCourse();
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "gradeSet.php";
	url = url + "?noValue=1";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// 插入表格相关函数
function appendRow(TableID, studentID, obj, course, index) {
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
	// 设置列内容和属性
	newTd0.align = 'center';
	newTd1.align = 'center';
	newTd2.align = 'center';
	newTd3.align = 'center';
	newTd4.align = 'center';
	newTd5.align = 'center';

	newTd0.innerHTML = '<input type="number" style="width:5em" name="numInTable" value=' + index + ' ' + 'readonly/>';
	newTd1.innerHTML = '<input type="text" style="width: 6em" name="studentID" value=' + 'x' + studentID + ' ' + 'readonly/>';
	newTd2.innerHTML = '<input type="text" style="width: 6em" name="studentName" value=' + obj.name1 + ' ' + ' readonly/>';
	;
	newTd3.innerHTML = '<input type="text" style="width: 6em" name="course" value=' + course + ' readonly/>';

	/*
	 if(obj.product=="班课"){
	 newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index +' ' +'value=' + obj.priceBK + ' />元';
	 //'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
	 }else if(obj.product=="一对一"){
	 newTd4.innerHTML = '一对一'  + '<br/>'
	 + '<input type="number" style="width:2em"' + 'name='+"hour1_" + index +' ' +'value=' + obj.hour1 + ' readonly/>'	 + '小时以内'
	 + '<input type="number" style="width:2em"' + 'name='+"priceHour1YDY" + index +' ' +'value=' + obj.priceHour1YDY + ' />元' + '<br/>'
	 + '<input type="number" style="width:2em"' + 'name='+"hour2_" + index +' ' +'value=' + obj.hour2 + ' readonly/>'	 + '小时以内'
	 + '<input type="number" style="width:2em"' + 'name='+"priceHour2YDY" + index +' ' +'value=' + obj.priceHour2YDY + ' />元' + '<br/>'
	 + '<input type="number" style="width:2em"' + 'name='+"hour3_" + index +' ' +'value=' + obj.hour3 + ' readonly/>'	 + '小时以外'
	 + '<input type="number" style="width:2em"' + 'name='+"priceHour3YDY" + index +' ' +'value=' + obj.priceHour3YDY + ' />元';
	 }
	 */

	if (course == courseLoad[0]) {
		if (obj.course1Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course1Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	if (course == courseLoad[1]) {
		if (obj.course2Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course2Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	if (course == courseLoad[2]) {
		if (obj.course3Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course3Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	if (course == courseLoad[3]) {
		if (obj.course4Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course4Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	if (course == courseLoad[4]) {
		if (obj.course5Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course5Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	if (course == courseLoad[5]) {
		if (obj.course6Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course6Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	if (course == courseLoad[6]) {
		if (obj.course7Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course7Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	if (course == courseLoad[7]) {
		if (obj.course8Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course8Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	if (course == courseLoad[8]) {
		if (obj.course9Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course9Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	if (course == courseLoad[9]) {
		if (obj.course10Product == "班课") {
			newTd4.innerHTML = '班课：<input type="number" style="width: 6em"' + 'name=' + "priceBK" + index + ' ' + 'value=' + obj.priceBK + ' />元';
			//'班课：<input type="number" style="width: 6em" name="priceBK" value=' + obj.priceBK + ' />元';
		} else if (obj.course10Product == "一对一") {
			newTd4.innerHTML = '一对一' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour1_" + index + ' ' + 'value=' + obj.hour1 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour1YDY" + index + ' ' + 'value=' + obj.priceHour1YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay1" + index + ' ' + 'value=' + obj.pay1 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour2_" + index + ' ' + 'value=' + obj.hour2 + ' readonly/>' + '小时以内' + '<input type="number" style="width:4em"' + 'name=' + "priceHour2YDY" + index + ' ' + 'value=' + obj.priceHour2YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay2" + index + ' ' + 'value=' + obj.pay2 + ' />' + '<br/>' + '<input type="number" style="width:4em"' + 'name=' + "hour3_" + index + ' ' + 'value=' + obj.hour3 + ' readonly/>' + '小时以外' + '<input type="number" style="width:4em"' + 'name=' + "priceHour3YDY" + index + ' ' + 'value=' + obj.priceHour3YDY + ' />元' + '，工资<input type="number" style="width: 4em"' + 'name=' + "pay3" + index + ' ' + 'value=' + obj.pay3 + ' />';
		}
	}

	// 提交类型，2为试听入班，1为直接入班，与学生表中定义一致
	//newTd5.innerHTML = '<input type="submit" class="btn" name="submitBTNgrade" value="入班" onclick="submitGrade(' + studentID +',this' +')" />';
	newTd5.innerHTML = '<input type="button" name="submitBTNgradeTest" value="试听入班" onclick="submitGrade(' + studentID + ', this ,2)" />' + '&nbsp&nbsp&nbsp&nbsp <input type="button" name="submitBTNgrade" value="直接入班" onclick="submitGrade(' + studentID + ', this ,1)" />';

	//添加表格样式
	$("tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
	});
	$("tr").mouseout(function() {
		$(this).css("background-color", "");
	});
	$("tr:odd").addClass("rowBgColorOdd");
	$("tr:even").addClass("rowBgColorEven");
}

// 窗口表格删除一行
function removeRow(TableID) {
	var tabObj = document.getElementById(TableID);
	for (var j = 0; j < tableRowCount; j++) {
		tabObj.deleteRow(1);
	}
	tableRowCount = 0;
}

function copyConditionToHidden() {
	var obj = document.getElementsByName("gradeResult")[0];
	if (obj.value == 0) {
		location.reload();
	} else {
		document.getElementsByName("operateGradeID")[0].value = obj.value;

		var str = obj.options[obj.selectedIndex].text;
		var courseIndex = 0;
		if (str.indexOf(courseLoad[0]) != -1) {
			courseIndex = 1;
		} else if (str.indexOf(courseLoad[1]) != -1) {
			courseIndex = 2;
		} else if (str.indexOf(courseLoad[2]) != -1) {
			courseIndex = 3;
		} else if (str.indexOf(courseLoad[3]) != -1) {
			courseIndex = 4;
		} else if (str.indexOf(courseLoad[4]) != -1) {
			courseIndex = 5;
		} else if (str.indexOf(courseLoad[5]) != -1) {
			courseIndex = 6;
		} else if (str.indexOf(courseLoad[6]) != -1) {
			courseIndex = 7;
		} else if (str.indexOf(courseLoad[7]) != -1) {
			courseIndex = 8;
		} else if (str.indexOf(courseLoad[8]) != -1) {
			courseIndex = 9;
		} else if (str.indexOf(courseLoad[9]) != -1) {
			courseIndex = 10;
		} else {
			courseIndex = 0;
		}
		document.getElementsByName("operateCourse")[0].value = courseIndex;

		var gradeIndex = "初一";

		if (str.indexOf("初一") != -1) {
			gradeIndex = "初一";
		} else if (str.indexOf("初二") != -1) {
			gradeIndex = "初二";
		} else if (str.indexOf("初三") != -1) {
			gradeIndex = "初三";
		} else if (str.indexOf("高一") != -1) {
			gradeIndex = "高一";
		} else if (str.indexOf("高二") != -1) {
			gradeIndex = "高二";
		} else if (str.indexOf("高三") != -1) {
			gradeIndex = "高三";
		} else {
			gradeIndex = "";
		}

		document.getElementsByName("operateGrade")[0].value = gradeIndex;

		// 操作的校区
		var str = obj.options[obj.selectedIndex].text;
		var strtemp = str.split("-");

		//document.getElementsByName("operateSchoolZone")[0].value = strtemp[3];

		// ajax 加载交过费还未分班的与选中结果班级的学科一样的学生
		// 先清除表格第二行及以后的行
		removeRow('studentNotGradeTable');

		loadNotInClassStudent(courseIndex, strtemp[3], strtemp[6]);
	}
}

//ajax 提交分班
function submitGrade(studentID, obj, type) {
	document.getElementsByName("operateStudentID")[0].value = studentID;
	var index = -1;
	// 提交按钮在表格中的行数，从0开始，用于区分提交的是第几行的数据，很重要
	// 提交类型，2为试听入班，1为直接入班，与学生表中定义一致
	var objtmp;
	if (type == "1") {
		objtmp = document.getElementsByName("submitBTNgrade");
	} else if (type == "2") {
		objtmp = document.getElementsByName("submitBTNgradeTest");
	}
	//var objtmp = document.getElementsByName("submitBTNgrade");
	for (var i = 0; i < objtmp.length; i++) {
		if (obj == objtmp[i]) {
			index = i + 1;
			break;
		}
	}

	// 更新要提交到学生档案中的班课和一对一单价用于提交
	if (document.getElementsByName("priceBK" + index)[0]) {
		document.getElementsByName("priceBKCopy")[0].value = document.getElementsByName("priceBK" + index)[0].value;
	} else {
		document.getElementsByName("priceBKCopy")[0].value = "0";
	}

	if (document.getElementsByName("hour1_" + index)[0]) {
		document.getElementsByName("hour1Copy")[0].value = document.getElementsByName("hour1_" + index)[0].value;
	} else {
		document.getElementsByName("hour1Copy")[0].value = "0";
	}

	if (document.getElementsByName("priceHour1YDY" + index)[0]) {
		document.getElementsByName("priceHour1YDYCopy")[0].value = document.getElementsByName("priceHour1YDY" + index)[0].value;
	} else {
		document.getElementsByName("priceHour1YDYCopy")[0].value = "0";
	}

	if (document.getElementsByName("pay1" + index)[0]) {
		document.getElementsByName("pay1Copy")[0].value = document.getElementsByName("pay1" + index)[0].value;
	} else {
		document.getElementsByName("pay1Copy")[0].value = "0";
	}

	if (document.getElementsByName("hour2_" + index)[0]) {
		document.getElementsByName("hour2Copy")[0].value = document.getElementsByName("hour2_" + index)[0].value;
	} else {
		document.getElementsByName("hour2Copy")[0].value = "0";
	}

	if (document.getElementsByName("priceHour2YDY" + index)[0]) {
		document.getElementsByName("priceHour2YDYCopy")[0].value = document.getElementsByName("priceHour2YDY" + index)[0].value;
	} else {
		document.getElementsByName("priceHour2YDYCopy")[0].value = "0";
	}

	if (document.getElementsByName("pay2" + index)[0]) {
		document.getElementsByName("pay2Copy")[0].value = document.getElementsByName("pay2" + index)[0].value;
	} else {
		document.getElementsByName("pay2Copy")[0].value = "0";
	}

	if (document.getElementsByName("hour3_" + index)[0]) {
		document.getElementsByName("hour3Copy")[0].value = document.getElementsByName("hour3_" + index)[0].value;
	} else {
		document.getElementsByName("hour3Copy")[0].value = "0";
	}

	if (document.getElementsByName("priceHour3YDY" + index)[0]) {
		document.getElementsByName("priceHour3YDYCopy")[0].value = document.getElementsByName("priceHour3YDY" + index)[0].value;
	} else {
		document.getElementsByName("priceHour3YDYCopy")[0].value = "0";
	}

	if (document.getElementsByName("pay3" + index)[0]) {
		document.getElementsByName("pay3Copy")[0].value = document.getElementsByName("pay3" + index)[0].value;
	} else {
		document.getElementsByName("pay3Copy")[0].value = "0";
	}

	// 提交类型，2为试听入班，1为直接入班，与学生表中定义一致
	document.getElementsByName("testType")[0].value = type;

	// 提交产品类型到表中
	var obj = document.getElementsByName("gradeResult")[0];
	var str = obj.options[obj.selectedIndex].text;
	var strData = str.split("-");
	document.getElementsByName("productCopy")[0].value = strData[6];

	// 使用js提交表单，表单中必须有type=submit的按钮
	var operateName = document.getElementsByName("studentName")[index - 1].value;
	var str = "请确认" + "'" + operateName + "'" + "的分班内容正确再提交！\n\n确认要提交分班操作吗？";
	if (document.getElementsByName("gradeResult")[0].value > 0) {
		//if(confirm('请确认填写的分班内容正确再提交！\n\n确认要提交分班操作吗？')){
		if (confirm(str)) {

		} else {
			return;
		}
	} else {
		alert("请先在查询结果中选择班级，后入班！");
		return;
	}

	// ajax
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

				var objBtn1 = document.getElementsByName("submitBTNgrade")[index - 1];
				var objBtn2 = document.getElementsByName("submitBTNgradeTest")[index - 1];

				if (ret == "0") {
					alert("分班失败，请重新操作！");
				} else {
					objBtn1.disabled = "true";
					objBtn2.disabled = "true";
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};

	// 3发出http请求
	var url = "grade.php";
	url = url + "?submitGrade=1" + "&operateCourse=" + document.getElementsByName("operateCourse")[0].value + "&operateGradeID=" + document.getElementsByName("operateGradeID")[0].value + "&testType=" + document.getElementsByName("testType")[0].value + "&productCopy=" + document.getElementsByName("productCopy")[0].value + "&priceBKCopy=" + document.getElementsByName("priceBKCopy")[0].value + "&hour1Copy=" + document.getElementsByName("hour1Copy")[0].value + "&priceHour1YDYCopy=" + document.getElementsByName("priceHour1YDYCopy")[0].value + "&pay1Copy=" + document.getElementsByName("pay1Copy")[0].value + "&hour2Copy=" + document.getElementsByName("hour2Copy")[0].value + "&priceHour2YDYCopy=" + document.getElementsByName("priceHour2YDYCopy")[0].value + "&pay2Copy=" + document.getElementsByName("pay2Copy")[0].value + "&hour3Copy=" + document.getElementsByName("hour3Copy")[0].value + "&priceHour3YDYCopy=" + document.getElementsByName("priceHour3YDYCopy")[0].value + "&pay3Copy=" + document.getElementsByName("pay3Copy")[0].value + "&operateStudentID=" + document.getElementsByName("operateStudentID")[0].value;

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
	var url = "principalSet.php";
	url = url + '?noValue=""';
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}