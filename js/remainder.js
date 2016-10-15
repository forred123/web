/**
 * @author zyx
 */

var info;
var principalSetObj;
var i = 0;
var len = 0;
var maxCourseNum = 10;
var courseLoad = new Array();
var productLoad = new Array;
var timer;
// 全部扣费中的定时器
var indexLine = -1;
// 全部扣费中的第几个学生的标志，初始值必须为－1，因为后面有＋＋操作
var colIndex = 0;
//表格第一列序号

// 最多1000个校区，1000个班级名称
var MaxSchoolZone = 1000;
var MaxClassName = 1000;
var className = new Array();
//根据ID查询出来的班级名称
for (var j = 0; j < MaxClassName; j++) {
	className[j] = new Array();
}
var assistant = new Array();
//校区负责人
for ( j = 0; j < MaxSchoolZone; j++) {
	assistant[j] = new Array();
}

function freshRemainCourse(objOperate) {
	// 提交按钮在表格中的行数，从0开始，用于区分提交的是第几行的数据，很重要
	var index = -1;
	var price = 1, remainFee = 0, remainCourseNum = 0;

	var obj = document.getElementsByName("price");
	for (var i = 0; i < obj.length; i++) {
		if (objOperate == obj[i]) {
			index = i;
		}
	}

	remainFee = document.getElementsByName("remainFee")[index].value;
	price = document.getElementsByName("price")[index].value;
	remainCourseNum = remainFee / price;

	document.getElementsByName("remainCourseNum")[index].value = remainCourseNum.toFixed(1);
}

// ajax 查询学生余额
function sqlRemainderInfo() {
	var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].options.selectedIndex].text;
	if (schoolZone == "-请选择-") {
		schoolZone = "%";
	} else {
		schoolZone += "_";
	}
	var gradeID = document.getElementsByName("grade")[0].value;
	if (gradeID == "0") {
		gradeID = "%";
	}
	var courseID = document.getElementsByName("course")[0].value;
	var product = document.getElementsByName("product")[0].options[document.getElementsByName("product")[0].options.selectedIndex].text;
	if ((courseID == "0") && (product == "-请选择-")) {
		alert('请选择"科目"和"产品名称"后重新查询！');
		return;
	}
	if (courseID == "0") {
		alert('请选择"科目"后重新查询！');
		return;
	}
	if (product == "-请选择-") {
		alert('请选择"产品名称"后重新查询！');
		return;
	}
	var teacher = document.getElementsByName("teacher")[0].value;
	if (teacher == "0") {
		teacher = "%";
	}
	var classID = document.getElementsByName("class")[0].value;
	if (classID == "0") {
		classID = "%";
	}
	var feeState = document.getElementsByName("feeState")[0].value;

	var timeStart = document.getElementsByName("startDate")[0].value;
	if (timeStart == "") {
		timeStart = "%";
	}
	var timeEnd = document.getElementsByName("endDate")[0].value;
	if (timeEnd == "") {
		timeEnd = "%";
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
				//alert(ret);

				// 先清除表格第二行及以后的行
				removeRow('remainderTable');
				// 表格第一列序号清零
				colIndex = 0;

				if (ret == "0") {
					alert("没有符合查询条件的学生信息，请核对查询条件！");
				} else {

					var info = eval(ret);
					//alert(ret);
					var obj = document.getElementById("remainderTable");

					// 添加学生信息到表格行
					i = 0;
					for (var tmp in info) {
						// 查询学生余额，然后在其中查询学生交费表中的单价和时间，最后插入表格
						//courseID = 3;
						sqlStudentRemainFee(info[i], courseID, feeState);
						i++;
					}
				}
			} else {
				alert("错误，请求页面异常！");
			}
		}

	};

	// 3发出http请求
	// 使用encodeURIComponent，是为了浏览器兼容
	var url = "remainder.php";
	url = url + "?sqlRemainder=0" + "&schoolZone=" + encodeURIComponent(schoolZone) + "&gradeID=" + gradeID + "&courseID=" + courseID + "&product=" + encodeURIComponent(product) + "&teacher=" + encodeURIComponent(teacher) + "&classID=" + classID + "&feeState=" + feeState + "&dateStart=" + timeStart + "&dateEnd=" + timeEnd;
	//alert(url);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

//插入表格相关函数
function appendRow(TableID, course, obj, price, remainFee) {
	var i = 0, j = 0;
	var strtmp = "";
	// 插入表格
	var tmpNum = 0;
	// 序号从1开始
	colIndex++;
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

	newTd0.innerHTML = colIndex;
	strtmp = obj.schoolZone1;
	newTd1.innerHTML = strtmp.substr(0, strtmp.length - 1);

	if (obj.schoolZone2 == "") {
		newTd2.innerHTML = "/";
	} else {
		strtmp = obj.schoolZone2;
		newTd2.innerHTML = strtmp.substr(0, strtmp.length - 1);
	}
	if (obj.schoolZone3 == "") {
		newTd3.innerHTML = "/";
	} else {
		strtmp = obj.schoolZone3;
		newTd3.innerHTML = strtmp.substr(0, strtmp.length - 1);
	}
	// 校区负责人
	strtmp = obj.schoolZone1;
	if (obj.schoolZone1 != "") {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (assistant[i][0] == strtmp.substr(0, strtmp.length - 1)) {
				newTd4.innerHTML = assistant[i][1];
				break;
			}
		}
	}
	strtmp = obj.schoolZone2;
	if (obj.schoolZone2 != "") {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (assistant[i][0] == strtmp.substr(0, strtmp.length - 1)) {
				newTd4.innerHTML = assistant[i][1];
				break;
			}
		}
	}
	strtmp = obj.schoolZone3;
	if (obj.schoolZone3 != "") {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (assistant[i][0] == strtmp.substr(0, strtmp.length - 1)) {
				newTd4.innerHTML = assistant[i][1];
				break;
			}
		}
	}

	if (obj.grade == 7) {
		newTd5.innerHTML = "初一";
	}
	if (obj.grade == 8) {
		newTd5.innerHTML = "初二";
	}
	if (obj.grade == 9) {
		newTd5.innerHTML = "初三";
	}
	if (obj.grade == 10) {
		newTd5.innerHTML = "高一";
	}
	if (obj.grade == 11) {
		newTd5.innerHTML = "高二";
	}
	if (obj.grade == 12) {
		newTd5.innerHTML = "高三";
	}

	if (course == 1) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course1ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}

	if (course == 2) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course2ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}
	if (course == 3) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course3ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}
	if (course == 4) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course4ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}
	if (course == 5) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course5ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}

	if (course == 6) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course6ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}
	if (course == 7) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course7ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}
	if (course == 8) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course8ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}
	if (course == 9) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course9ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}
	if (course == 10) {
		for ( i = 0; i < MaxSchoolZone; i++) {
			if (className[i][0] == obj.course10ClassIdInMLS) {
				newTd6.innerHTML = className[i][1];
				break;
			}
		}
	}

	newTd7.innerHTML = 'x' + obj.uid;
	newTd8.innerHTML = obj.name1;
	newTd9.innerHTML = obj.name2;
	if (obj.name2 == "") {
		newTd9.innerHTML = "/";
	}
	newTd10.innerHTML = price;

	var objtmp = document.getElementsByName("product")[0];
	var product = objtmp.options[objtmp.options.selectedIndex].text;

	newTd11.innerHTML = remainFee;

	tmpNum = remainFee / price;
	newTd12.innerHTML = tmpNum.toFixed(1);

	// 0为不在班（可回班），1为在班（不试听直接交费上课的，可退班），2为试听，3为试听后留班的，4为试听后出班的（试听失败）
	// 0为不在班状态 ，1为在班状态，不在班时，退班按钮为灰色不能使用，与学生表中一致，3是试听后留班，即试听成功，4为试听后出班，即试听失败
	// 0和4为不在班状态，可以重新分班，1，2，3为在班状态，不能重新分班（即除非有退班操作）

	if (course == 1) {
		if (obj.MathStateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}

	if (course == 2) {
		if (obj.course2StateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}

	if (course == 3) {
		if (obj.course3StateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}

	if (course == 4) {
		if (obj.course4StateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}

	if (course == 5) {
		if (obj.course5StateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}

	if (course == 6) {
		if (obj.course6StateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}
	if (course == 7) {
		if (obj.course7StateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}
	if (course == 8) {
		if (obj.course8StateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}
	if (course == 9) {
		if (obj.course9StateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}
	if (course == 10) {
		if (obj.course10StateInGrade == "2") {
			newTd13.innerHTML = '试听';
		} else {
			newTd13.innerHTML = '非试听';
		}
	}

	//添加表格样式
	$("#remainderTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#remainderTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#remainderTable tr:odd").addClass("rowBgColorOdd");
	$("#remainderTable tr:even").addClass("rowBgColorEven");

}

// 窗口表格删除一行
function removeRow(TableID) {
	var tabObj = document.getElementById(TableID);
	// 从表格首行开始删除，使用0，如果要保留首行则使用1
	var tableRowCount = document.getElementById(TableID).rows.length;
	for (var j = 1; j < tableRowCount; j++) {
		tabObj.deleteRow(1);
	}
}

//加载学生交费表中的单价和上课时间
function loadPriceAndAddRow(obj, flagCourse, remainFee, feeState) {
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
				var price = 0;
				var pay = 0;
				// 确定缺勤原因，
				var notAttendanceReason = "";
				// 出勤情况
				var attendance = "出勤";
				// 确定单价和工资
				if (ret == "0") {
					// 扣费表中没有扣费记录，表明该学生是第一次扣费（上课考勤），载入分班时确定的单价和工资
					//alert("该学生还没有交过费，没有单价信息！");

					var objtmp = document.getElementsByName("product")[0];
					//objtmp.options[objtmp.options.selectedIndex].text;
					var product = objtmp.options[objtmp.options.selectedIndex].text;
					if (product == "班课") {
						price = obj.priceBK;
						pay = 0;
						//待确认
					} else if (product == "一对一") {
						price = obj.priceHour1YDY;
						pay = obj.pay1;
					}

				} else {
					// 第二次及以后扣费，载入最后一次（也就是上一次）的单价和工资
					var info = eval(ret);
					// 在扣费表中有扣费记录，根据扣费记录载入单价和工资

					// 载入最后一次（也就是上一次）的单价和工资	(在学生表中)	，扣费表info[info.length-1].price,学生表obj.lastPrice;
					//if(flagCourse=="1"){

					if (info[info.length - 1].product == "班课") {
						//price = info[info.length-1].priceBK;
						//price = info[info.length-1].price;
						//pay = 0;//待确认
						price = obj.lastPrice;
						pay = 0;
						//待确认
					} else if (info[info.length - 1].product == "一对一") {
						var sumHour = 0;
						for ( j = 0; j < info.length; j++) {
							sumHour += info[j].period / 60.0;
						}
						var sumHourLessLast = sumHour - info[info.length - 1].period / 60;

						//price = info[info.length-1].price;
						//pay = info[info.length-1].pay;
						price = obj.lastPrice;
						pay = info[info.length - 1].pay;
						//alert(sumHour);
						//alert(sumHourLessLast);
						// 发生按段收费时当次载入分班时设置好的分段单价
						if ((sumHourLessLast <= obj.hour1) && (sumHour >= obj.hour1) && (sumHour <= obj.hour2)) {
							price = obj.priceHour2YDY;
						}
						if ((sumHourLessLast <= obj.hour2) && (sumHour >= obj.hour3)) {
							price = obj.priceHour3YDY;
						}

					}
					notAttendanceReason = info[info.length - 1].notAttendanceReason;
					attendance = info[info.length - 1].attendance;
					//}
				}

				// 确定完单价和工资后，插入表格
				var conditiontmp = 0;
				if (price != 0) {
					conditiontmp = remainFee / price;
				}
				// 余额状态满足时才插入
				if (conditiontmp < feeState) {
					appendRow(remainderTable, flagCourse, obj, price, remainFee);
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	//发出AJAX查询subFeeTable一对一时间和，来确定一对一单价是哪个
	// 3发出http请求
	var url = "remainder.php";
	url = url + "?sqlPriceByUid=" + obj.uid;

	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// ajax 查询学生余额，从fee.php中mysql复用代码
function sqlStudentRemainFee(obj, courseIndex, feeState) {
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
					//alert("该校区名不存在，可以创建一个新校区信息！");
				} else {
					var info = eval(ret);
					var remainFee = info[0].remainFee;

					// 载入学生交费表中的单价和时间
					// 并且插入表格
					loadPriceAndAddRow(obj, courseIndex, remainFee, feeState);
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "remainder.php";
	url = url + "?sqlRemainFeeByStudentUID=" + obj.uid + "&subFeeCourse=" + courseIndex;

	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadPrincipalSetAndTeacher() {
	var schoolZone = document.getElementsByName("schoolZone")[0].options[document
	.getElementsByName("schoolZone")[0].value].text;
	// 有真正的选择的时候才操作
	if (document.getElementsByName("schoolZone")[0].value > 0) {
		loadPrincipalSet(schoolZone);
		// ajax 获得教师姓名
		loadTeacher(schoolZone);
		// ajax 获得班级名称
		loadGradeSetName(schoolZone);
	}
}

//根据校区名载入该校区的班级名
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
	var url = "remainder.php";
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
	for ( i = 1; i < obj.options.length; ) {
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
	var url = "remainder.php";
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
					principalSetObj = eval(ret);

					var obj1 = document.getElementsByName("schoolZone")[0];
					i = 0;
					for (var tmp in principalSetObj) {
						obj1.options.add(new Option(principalSetObj[i].schoolZone, i + 1));
						assistant[i][0] = principalSetObj[i].schoolZone;
						assistant[i][1] = principalSetObj[i].assistant;
						i++;
					}
					len = i;

					// 默认填写当前日期
					document.getElementsByName("startDate")[0].value = getYear0FormatDate();
					document.getElementsByName("endDate")[0].value = getNowFormatDate();

					// ajax 查询班级名称
					loadClassName();

					// 查询校长设置中的所有科目，用于载入查询条件中的科目
					sqlCourse();
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "remainder.php";
	url = url + "?noValue=1";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadClassName() {
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
					alert("查询的班级ID不存在！");
				} else {
					var obj = eval(ret);

					i = 0;
					for (var tmp in obj) {
						className[i][0] = obj[i].id;
						className[i][1] = obj[i].class;
						i++;
					}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "remainder.php";
	url = url + "?loadClassName=0";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
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