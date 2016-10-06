/**
 * @author zyx
 */

var info;
var sqlInfo;
var i = 0;
var len = 0;
var flagSubmit = false;
var productLoad = new Array();
var maxCourseNum = 10;
var courseLoad = new Array();

function sqlFee() {
	// 顺序为：记录条数－总费用－数学费用－语文费用－英语费用－物理费用－化学费用  1*6
	var staticResult = new Array();
	// 2+6*5->2+6*10
	for (var i = 0; i < 62; i++) {
		staticResult[i] = 0;
	}
	//(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

	var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].options.selectedIndex].text;
	if (schoolZone == "-请选择-") {
		schoolZone = "%";
	}
	var grade = document.getElementsByName("grade")[0].options[document.getElementsByName("grade")[0].options.selectedIndex].text;
	if (grade == "-请选择-") {
		grade = "%";
	}
	var product = document.getElementsByName("product")[0].options[document.getElementsByName("product")[0].options.selectedIndex].text;
	if (product == "-请选择-") {
		product = "%";
	}
	var course = document.getElementsByName("course")[0].value;
	if (course == "0") {
		course = "%";
	}
	var mode = document.getElementsByName("mode")[0].value;
	if (mode == "0") {
		mode = "%";
	} else if (mode == "1") {
		mode = "j";
	} else if (mode == "2") {
		mode = "z";
	} else if (mode == "3") {
		mode = "t";
	}

	var name = document.getElementsByName("name")[0].value;
	if (name == "") {
		name = "%";
	}
	var receiptNum = document.getElementsByName("receiptNum")[0].value;
	if (receiptNum == "") {
		receiptNum = "%";
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
					alert("该查询条件下无费用记录，请核对查询条件！");
				} else {
					info = eval(ret);

					appendRowHeader(info[0], sqlFeeTable);

					var obj1 = document.getElementsByName("schoolZone")[0];
					i = 0;
					for (var tmp in info) {

						appendRow(info[i], i);

						staticResult[1] += parseInt(info[i].feeSum);
						// 总额
						staticResult[2] += parseInt(info[i].course1);
						staticResult[3] += parseInt(info[i].course1SubFee1);
						staticResult[4] += parseInt(info[i].course1SubFee2);
						staticResult[5] += parseInt(info[i].course1SubFee3);
						staticResult[6] += parseInt(info[i].course1SubFee4);
						staticResult[7] += parseInt(info[i].course1SubFee5);
						staticResult[8] += parseInt(info[i].course2);
						staticResult[9] += parseInt(info[i].course2SubFee1);
						staticResult[10] += parseInt(info[i].course2SubFee2);
						staticResult[11] += parseInt(info[i].course2SubFee3);
						staticResult[12] += parseInt(info[i].course2SubFee4);
						staticResult[13] += parseInt(info[i].course2SubFee5);
						staticResult[14] += parseInt(info[i].course3);
						staticResult[15] += parseInt(info[i].course3SubFee1);
						staticResult[16] += parseInt(info[i].course3SubFee2);
						staticResult[17] += parseInt(info[i].course3SubFee3);
						staticResult[18] += parseInt(info[i].course3SubFee4);
						staticResult[19] += parseInt(info[i].course3SubFee5);
						staticResult[20] += parseInt(info[i].course4);
						staticResult[21] += parseInt(info[i].course4SubFee1);
						staticResult[22] += parseInt(info[i].course4SubFee2);
						staticResult[23] += parseInt(info[i].course4SubFee3);
						staticResult[24] += parseInt(info[i].course4SubFee4);
						staticResult[25] += parseInt(info[i].course4SubFee5);
						staticResult[26] += parseInt(info[i].course5);
						staticResult[27] += parseInt(info[i].course5SubFee1);
						staticResult[28] += parseInt(info[i].course5SubFee2);
						staticResult[29] += parseInt(info[i].course5SubFee3);
						staticResult[30] += parseInt(info[i].course5SubFee4);
						staticResult[31] += parseInt(info[i].course5SubFee5);
						staticResult[32] += parseInt(info[i].course6);
						staticResult[33] += parseInt(info[i].course6SubFee1);
						staticResult[34] += parseInt(info[i].course6SubFee2);
						staticResult[35] += parseInt(info[i].course6SubFee3);
						staticResult[36] += parseInt(info[i].course6SubFee4);
						staticResult[37] += parseInt(info[i].course6SubFee5);
						staticResult[38] += parseInt(info[i].course7);
						staticResult[39] += parseInt(info[i].course7SubFee1);
						staticResult[40] += parseInt(info[i].course7SubFee2);
						staticResult[41] += parseInt(info[i].course7SubFee3);
						staticResult[42] += parseInt(info[i].course7SubFee4);
						staticResult[43] += parseInt(info[i].course7SubFee5);
						staticResult[44] += parseInt(info[i].course8);
						staticResult[45] += parseInt(info[i].course8SubFee1);
						staticResult[46] += parseInt(info[i].course8SubFee2);
						staticResult[47] += parseInt(info[i].course8SubFee3);
						staticResult[48] += parseInt(info[i].course8SubFee4);
						staticResult[49] += parseInt(info[i].course8SubFee5);
						staticResult[50] += parseInt(info[i].course9);
						staticResult[51] += parseInt(info[i].course9SubFee1);
						staticResult[52] += parseInt(info[i].course9SubFee2);
						staticResult[53] += parseInt(info[i].course9SubFee3);
						staticResult[54] += parseInt(info[i].course9SubFee4);
						staticResult[55] += parseInt(info[i].course9SubFee5);
						staticResult[56] += parseInt(info[i].course10);
						staticResult[57] += parseInt(info[i].course10SubFee1);
						staticResult[58] += parseInt(info[i].course10SubFee2);
						staticResult[59] += parseInt(info[i].course10SubFee3);
						staticResult[60] += parseInt(info[i].course10SubFee4);
						staticResult[61] += parseInt(info[i].course10SubFee5);
						i++;
					}
					staticResult[0] = i;

					appendRowStatistic(info[0], sqlFeeTable, staticResult);
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	// 使用encodeURIComponent，是为了浏览器兼容
	var url = "sqlFee.php";
	url = url + "?sqlFee=1" + "&schoolZone=" + encodeURIComponent(schoolZone) + "&grade=" + encodeURIComponent(grade) + "&course=" + course + "&product=" + encodeURIComponent(product) + "&mode=" + mode + "&name=" + encodeURIComponent(name) + "&receiptNum=" + receiptNum + "&timeStart=" + timeStart + "&timeEnd=" + timeEnd;

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
		if (schoolZone == sqlInfo[i].schoolZone) {
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
	if (sqlInfo[index].course1 != "") {
		obj.options.add(new Option(courseLoad[0], i));
		i++;
	}
	if (sqlInfo[index].course2 != "") {
		obj.options.add(new Option(courseLoad[1], i));
		i++;
	}
	if (sqlInfo[index].course3 != "") {
		obj.options.add(new Option(courseLoad[2], i));
		i++;
	}
	if (sqlInfo[index].course4 != "") {
		obj.options.add(new Option(courseLoad[3], i));
		i++;
	}
	if (sqlInfo[index].course5 != "") {
		obj.options.add(new Option(courseLoad[4], i));
		i++;
	}
	if (sqlInfo[index].course6 != "") {
		obj.options.add(new Option(courseLoad[5], i));
		i++;
	}
	if (sqlInfo[index].course7 != "") {
		obj.options.add(new Option(courseLoad[6], i));
		i++;
	}
	if (sqlInfo[index].course8 != "") {
		obj.options.add(new Option(courseLoad[7], i));
		i++;
	}
	if (sqlInfo[index].course9 != "") {
		obj.options.add(new Option(courseLoad[8], i));
		i++;
	}
	if (sqlInfo[index].course10 != "") {
		obj.options.add(new Option(courseLoad[9], i));
		i++;
	}
}

function loadGrade(schoolZone) {
	var index = 0;
	// 根据所选校区自动加载相应的产品
	for ( i = 0; i < len; i++) {
		if (schoolZone == sqlInfo[i].schoolZone) {
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
	if (sqlInfo[index].grade7 != "") {
		obj.options.add(new Option("初一", i));
		i++;
	}
	if (sqlInfo[index].grade8 != "") {
		obj.options.add(new Option("初二", i));
		i++;
	}
	if (sqlInfo[index].grade9 != "") {
		obj.options.add(new Option("初三", i));
		i++;
	}
	if (sqlInfo[index].grade10 != "") {
		obj.options.add(new Option("高一", i));
		i++;
	}
	if (sqlInfo[index].grade11 != "") {
		obj.options.add(new Option("高二", i));
		i++;
	}
	if (sqlInfo[index].grade12 != "") {
		obj.options.add(new Option("高三", i));
		i++;
	}
}

function loadProduct(schoolZone) {
	var index = 0;
	// 根据所选校区自动加载相应的产品
	for ( i = 0; i < len; i++) {
		if (schoolZone == sqlInfo[i].schoolZone) {
			index = i;
			break;
		}
	}

	for ( i = 0; i < len; i++) {
		if (sqlInfo[i].product1 != "") {
			productLoad[0] = sqlInfo[i].product1;
		}
		if (sqlInfo[i].product2 != "") {
			productLoad[1] = sqlInfo[i].product2;
		}
		if (sqlInfo[i].product3 != "") {
			productLoad[2] = sqlInfo[i].product3;
		}
		if (sqlInfo[i].product4 != "") {
			productLoad[3] = sqlInfo[i].product4;
		}
		if (sqlInfo[i].product5 != "") {
			productLoad[4] = sqlInfo[i].product5;
		}
	}

	var obj = document.getElementsByName("product")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 1; i < obj.options.length; ) {
		obj.removeChild(obj.options[i]);
	}

	i = 1;
	if (sqlInfo[index].product1 != "") {
		obj.options.add(new Option(productLoad[0], i));
		i++;
	}
	if (sqlInfo[index].product2 != "") {
		obj.options.add(new Option(productLoad[1], i));
		i++;
	}
	if (sqlInfo[index].product3 != "") {
		obj.options.add(new Option(productLoad[2], i));
		i++;
	}
	if (sqlInfo[index].product4 != "") {
		obj.options.add(new Option(productLoad[3], i));
		i++;
	}
	if (sqlInfo[index].product5 != "") {
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
					sqlInfo = eval(ret);

					var obj1 = document.getElementsByName("schoolZone")[0];
					i = 0;
					for (var tmp in sqlInfo) {
						obj1.options.add(new Option(sqlInfo[i].schoolZone, i + 1));
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
	var url = "sqlFee.php";
	url = url + "?noValue=1";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// 插入查询结果表头
function appendRowHeader(obj, TableID) {
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
	var newTd76 = newTr.insertCell(-1);
	var newTd77 = newTr.insertCell(-1);
	var newTd78 = newTr.insertCell(-1);
	var newTd79 = newTr.insertCell(-1);
	var newTd80 = newTr.insertCell(-1);
	var newTd81 = newTr.insertCell(-1);
	var newTd82 = newTr.insertCell(-1);
	var newTd83 = newTr.insertCell(-1);

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
	newTd76.align = 'center';
	newTd77.align = 'center';
	newTd78.align = 'center';
	newTd79.align = 'center';
	newTd80.align = 'center';
	newTd81.align = 'center';
	newTd82.align = 'center';
	newTd83.align = 'center';

	newTd0.innerHTML = "序号";
	newTd1.innerHTML = "ID";
	newTd2.innerHTML = "姓名1";
	newTd3.innerHTML = "姓名2";
	newTd4.innerHTML = "性别";
	newTd5.innerHTML = "校区1";
	newTd6.innerHTML = "校区2";
	newTd7.innerHTML = "校区3";
	newTd8.innerHTML = "年级";
	newTd9.innerHTML = "类别";
	newTd10.innerHTML = "收据编号";
	newTd11.innerHTML = "收据票号";
	newTd12.innerHTML = "单页费用";
	newTd13.innerHTML = "记录时间";
	newTd14.innerHTML = courseLoad[0] + "产品";
	newTd15.innerHTML = courseLoad[0] + "学费";
	newTd16.innerHTML = obj.subFee1Name;
	newTd17.innerHTML = obj.subFee2Name;
	newTd18.innerHTML = obj.subFee3Name;
	newTd19.innerHTML = obj.subFee4Name;
	newTd20.innerHTML = obj.subFee5Name;
	newTd21.innerHTML = courseLoad[1] + "产品";
	newTd22.innerHTML = courseLoad[1] + "学费";
	newTd23.innerHTML = obj.subFee1Name;
	newTd24.innerHTML = obj.subFee2Name;
	newTd25.innerHTML = obj.subFee3Name;
	newTd26.innerHTML = obj.subFee4Name;
	newTd27.innerHTML = obj.subFee5Name;
	newTd28.innerHTML = courseLoad[2] + "产品";
	newTd29.innerHTML = courseLoad[2] + "学费";
	newTd30.innerHTML = obj.subFee1Name;
	newTd31.innerHTML = obj.subFee2Name;
	newTd32.innerHTML = obj.subFee3Name;
	newTd33.innerHTML = obj.subFee4Name;
	newTd34.innerHTML = obj.subFee5Name;
	newTd35.innerHTML = courseLoad[3] + "产品";
	newTd36.innerHTML = courseLoad[3] + "学费";
	newTd37.innerHTML = obj.subFee1Name;
	newTd38.innerHTML = obj.subFee2Name;
	newTd39.innerHTML = obj.subFee3Name;
	newTd40.innerHTML = obj.subFee4Name;
	newTd41.innerHTML = obj.subFee5Name;
	newTd42.innerHTML = courseLoad[4] + "产品";
	newTd43.innerHTML = courseLoad[4] + "学费";
	newTd44.innerHTML = obj.subFee1Name;
	newTd45.innerHTML = obj.subFee2Name;
	newTd46.innerHTML = obj.subFee3Name;
	newTd47.innerHTML = obj.subFee4Name;
	newTd48.innerHTML = obj.subFee5Name;
	newTd49.innerHTML = courseLoad[5] + "产品";
	newTd50.innerHTML = courseLoad[5] + "学费";
	newTd51.innerHTML = obj.subFee1Name;
	newTd52.innerHTML = obj.subFee2Name;
	newTd53.innerHTML = obj.subFee3Name;
	newTd54.innerHTML = obj.subFee4Name;
	newTd55.innerHTML = obj.subFee5Name;
	newTd56.innerHTML = courseLoad[6] + "产品";
	newTd57.innerHTML = courseLoad[6] + "学费";
	newTd58.innerHTML = obj.subFee1Name;
	newTd59.innerHTML = obj.subFee2Name;
	newTd60.innerHTML = obj.subFee3Name;
	newTd61.innerHTML = obj.subFee4Name;
	newTd62.innerHTML = obj.subFee5Name;
	newTd63.innerHTML = courseLoad[7] + "产品";
	newTd64.innerHTML = courseLoad[7] + "学费";
	newTd65.innerHTML = obj.subFee1Name;
	newTd66.innerHTML = obj.subFee2Name;
	newTd67.innerHTML = obj.subFee3Name;
	newTd68.innerHTML = obj.subFee4Name;
	newTd69.innerHTML = obj.subFee5Name;
	newTd70.innerHTML = courseLoad[8] + "产品";
	newTd71.innerHTML = courseLoad[8] + "学费";
	newTd72.innerHTML = obj.subFee1Name;
	newTd73.innerHTML = obj.subFee2Name;
	newTd74.innerHTML = obj.subFee3Name;
	newTd75.innerHTML = obj.subFee4Name;
	newTd76.innerHTML = obj.subFee5Name;
	newTd77.innerHTML = courseLoad[9] + "产品";
	newTd78.innerHTML = courseLoad[9] + "学费";
	newTd79.innerHTML = obj.subFee1Name;
	newTd80.innerHTML = obj.subFee2Name;
	newTd81.innerHTML = obj.subFee3Name;
	newTd82.innerHTML = obj.subFee4Name;
	newTd83.innerHTML = obj.subFee5Name;

	// 对没有的扣费项目进行隐藏，
	if (obj.subFee1Name == "费用1") {
		for (var i = 16; i < 16 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee2Name == "费用2") {
		for (var i = 17; i < 17 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee3Name == "费用3") {
		for (var i = 18; i < 18 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee4Name == "费用4") {
		for (var i = 19; i < 19 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee5Name == "费用5") {
		for (var i = 20; i < 20 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
}

// 插入班课表格相关函数
function appendRow(obj, index) {
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
	var newTd76 = newTr.insertCell(-1);
	var newTd77 = newTr.insertCell(-1);
	var newTd78 = newTr.insertCell(-1);
	var newTd79 = newTr.insertCell(-1);
	var newTd80 = newTr.insertCell(-1);
	var newTd81 = newTr.insertCell(-1);
	var newTd82 = newTr.insertCell(-1);
	var newTd83 = newTr.insertCell(-1);

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
	newTd76.align = 'center';
	newTd77.align = 'center';
	newTd78.align = 'center';
	newTd79.align = 'center';
	newTd80.align = 'center';
	newTd81.align = 'center';
	newTd82.align = 'center';
	newTd83.align = 'center';

	newTd0.innerHTML = index;
	newTd1.innerHTML = obj.uid;
	newTd2.innerHTML = obj.name1;
	if (obj.name2 == "") {
		newTd3.innerHTML = "/";
	} else {
		newTd3.innerHTML = obj.name2;
	}
	newTd4.innerHTML = obj.sex;
	newTd5.innerHTML = obj.schoolZone1;
	if (obj.schoolZone2 == "") {
		newTd6.innerHTML = "/";
	} else {
		newTd6.innerHTML = obj.schoolZone2;
	}
	if (obj.schoolZone3 == "") {
		newTd7.innerHTML = "/";
	} else {
		newTd7.innerHTML = obj.schoolZone3;
	}
	newTd8.innerHTML = obj.grade;
	if (obj.mode == "j") {
		newTd9.innerHTML = "交费";
	} else if (obj.mode == "z") {
		newTd9.innerHTML = "转费";
	} else if (obj.mode == "t") {
		newTd9.innerHTML = "退费";
	}
	newTd10.innerHTML = obj.receiptNum;
	newTd11.innerHTML = obj.billNum;
	newTd12.innerHTML = obj.feeSum;
	newTd13.innerHTML = dateJS("Y-m-d", obj.time);
	if (obj.course1Product == "") {
		newTd14.innerHTML = "/";
	} else {
		newTd14.innerHTML = obj.course1Product;
	}
	newTd15.innerHTML = obj.course1;
	newTd16.innerHTML = obj.course1SubFee1;
	newTd17.innerHTML = obj.course1SubFee2;
	newTd18.innerHTML = obj.course1SubFee3;
	newTd19.innerHTML = obj.course1SubFee4;
	newTd20.innerHTML = obj.course1SubFee5;
	if (obj.course2Product == "") {
		newTd21.innerHTML = "/";
	} else {
		newTd21.innerHTML = obj.course2Product;
	}
	newTd22.innerHTML = obj.course2;
	newTd23.innerHTML = obj.course2SubFee1;
	newTd24.innerHTML = obj.course2SubFee2;
	newTd25.innerHTML = obj.course2SubFee3;
	newTd26.innerHTML = obj.course2SubFee4;
	newTd27.innerHTML = obj.course2SubFee5;
	if (obj.course3Product == "") {
		newTd28.innerHTML = "/";
	} else {
		newTd28.innerHTML = obj.course3Product;
	}
	newTd29.innerHTML = obj.course3;
	newTd30.innerHTML = obj.course3SubFee1;
	newTd31.innerHTML = obj.course3SubFee2;
	newTd32.innerHTML = obj.course3SubFee3;
	newTd33.innerHTML = obj.course3SubFee4;
	newTd34.innerHTML = obj.course3SubFee5;
	if (obj.course4Product == "") {
		newTd35.innerHTML = "/";
	} else {
		newTd35.innerHTML = obj.course4Product;
	}
	newTd36.innerHTML = obj.course4;
	newTd37.innerHTML = obj.course4SubFee1;
	newTd38.innerHTML = obj.course4SubFee2;
	newTd39.innerHTML = obj.course4SubFee3;
	newTd40.innerHTML = obj.course4SubFee4;
	newTd41.innerHTML = obj.course4SubFee5;
	if (obj.course5Product == "") {
		newTd42.innerHTML = "/";
	} else {
		newTd42.innerHTML = obj.course5Product;
	}
	newTd43.innerHTML = obj.course5;
	newTd44.innerHTML = obj.course5SubFee1;
	newTd45.innerHTML = obj.course5SubFee2;
	newTd46.innerHTML = obj.course5SubFee3;
	newTd47.innerHTML = obj.course5SubFee4;
	newTd48.innerHTML = obj.course5SubFee5;

	if (obj.course6Product == "") {
		newTd49.innerHTML = "/";
	} else {
		newTd49.innerHTML = obj.course6Product;
	}
	newTd50.innerHTML = obj.course6;
	newTd51.innerHTML = obj.course6SubFee1;
	newTd52.innerHTML = obj.course6SubFee2;
	newTd53.innerHTML = obj.course6SubFee3;
	newTd54.innerHTML = obj.course6SubFee4;
	newTd55.innerHTML = obj.course6SubFee5;

	if (obj.course7Product == "") {
		newTd56.innerHTML = "/";
	} else {
		newTd56.innerHTML = obj.course7Product;
	}
	newTd57.innerHTML = obj.course7;
	newTd58.innerHTML = obj.course7SubFee1;
	newTd59.innerHTML = obj.course7SubFee2;
	newTd60.innerHTML = obj.course7SubFee3;
	newTd61.innerHTML = obj.course7SubFee4;
	newTd62.innerHTML = obj.course7SubFee5;

	if (obj.course8Product == "") {
		newTd63.innerHTML = "/";
	} else {
		newTd63.innerHTML = obj.course8Product;
	}
	newTd64.innerHTML = obj.course8;
	newTd65.innerHTML = obj.course8SubFee1;
	newTd66.innerHTML = obj.course8SubFee2;
	newTd67.innerHTML = obj.course8SubFee3;
	newTd68.innerHTML = obj.course8SubFee4;
	newTd69.innerHTML = obj.course8SubFee5;

	if (obj.course9Product == "") {
		newTd70.innerHTML = "/";
	} else {
		newTd70.innerHTML = obj.course9Product;
	}
	newTd71.innerHTML = obj.course9;
	newTd72.innerHTML = obj.course9SubFee1;
	newTd73.innerHTML = obj.course9SubFee2;
	newTd74.innerHTML = obj.course9SubFee3;
	newTd75.innerHTML = obj.course9SubFee4;
	newTd76.innerHTML = obj.course9SubFee5;

	if (obj.course10Product == "") {
		newTd77.innerHTML = "/";
	} else {
		newTd7.innerHTML = obj.course10Product;
	}
	newTd78.innerHTML = obj.course10;
	newTd79.innerHTML = obj.course10SubFee1;
	newTd80.innerHTML = obj.course10SubFee2;
	newTd81.innerHTML = obj.course10SubFee3;
	newTd82.innerHTML = obj.course10SubFee4;
	newTd83.innerHTML = obj.course10SubFee5;

	// 对没有的扣费项目进行隐藏，
	if (obj.subFee1Name == "费用1") {
		for (var i = 16; i < 16 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee2Name == "费用2") {
		for (var i = 17; i < 17 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee3Name == "费用3") {
		for (var i = 18; i < 18 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee4Name == "费用4") {
		for (var i = 19; i < 19 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee5Name == "费用5") {
		for (var i = 20; i < 20 + 7 * 10; i = i + 7) {
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

// 插入查询结果统计
function appendRowStatistic(obj, TableID, data) {
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
	var newTd76 = newTr.insertCell(-1);
	var newTd77 = newTr.insertCell(-1);
	var newTd78 = newTr.insertCell(-1);
	var newTd79 = newTr.insertCell(-1);
	var newTd80 = newTr.insertCell(-1);
	var newTd81 = newTr.insertCell(-1);
	var newTd82 = newTr.insertCell(-1);
	var newTd83 = newTr.insertCell(-1);

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
	newTd76.align = 'center';
	newTd77.align = 'center';
	newTd78.align = 'center';
	newTd79.align = 'center';
	newTd80.align = 'center';
	newTd81.align = 'center';
	newTd82.align = 'center';
	newTd83.align = 'center';

	var index = 0;
	newTd0.innerHTML = "统计结果";
	newTd1.innerHTML = "";
	newTd2.innerHTML = "";
	newTd3.innerHTML = "";
	newTd4.innerHTML = "";
	newTd5.innerHTML = "";
	newTd6.innerHTML = "";
	newTd7.innerHTML = "费用次数";
	newTd8.innerHTML = data[index++];
	newTd9.innerHTML = "";
	newTd10.innerHTML = "";
	newTd11.innerHTML = "费用总额";
	newTd12.innerHTML = data[index++];
	newTd13.innerHTML = "";
	newTd14.innerHTML = courseLoad[0] + "费用";
	newTd15.innerHTML = data[index++];
	newTd16.innerHTML = data[index++];
	newTd17.innerHTML = data[index++];
	newTd18.innerHTML = data[index++];
	newTd19.innerHTML = data[index++];
	newTd20.innerHTML = data[index++];
	newTd21.innerHTML = courseLoad[1] + "费用";
	newTd22.innerHTML = data[index++];
	newTd23.innerHTML = data[index++];
	newTd24.innerHTML = data[index++];
	newTd25.innerHTML = data[index++];
	newTd26.innerHTML = data[index++];
	newTd27.innerHTML = data[index++];
	newTd28.innerHTML = courseLoad[2] + "费用";
	newTd29.innerHTML = data[index++];
	newTd30.innerHTML = data[index++];
	newTd31.innerHTML = data[index++];
	newTd32.innerHTML = data[index++];
	newTd33.innerHTML = data[index++];
	newTd34.innerHTML = data[index++];
	newTd35.innerHTML = courseLoad[3] + "费用";
	newTd36.innerHTML = data[index++];
	newTd37.innerHTML = data[index++];
	newTd38.innerHTML = data[index++];
	newTd39.innerHTML = data[index++];
	newTd40.innerHTML = data[index++];
	newTd41.innerHTML = data[index++];
	newTd42.innerHTML = courseLoad[4] + "费用";
	newTd43.innerHTML = data[index++];
	newTd44.innerHTML = data[index++];
	newTd45.innerHTML = data[index++];
	newTd46.innerHTML = data[index++];
	newTd47.innerHTML = data[index++];
	newTd48.innerHTML = data[index++];
	newTd49.innerHTML = courseLoad[5] + "费用";
	newTd50.innerHTML = data[index++];
	newTd51.innerHTML = data[index++];
	newTd52.innerHTML = data[index++];
	newTd53.innerHTML = data[index++];
	newTd54.innerHTML = data[index++];
	newTd55.innerHTML = data[index++];
	newTd56.innerHTML = courseLoad[6] + "费用";
	newTd57.innerHTML = data[index++];
	newTd58.innerHTML = data[index++];
	newTd59.innerHTML = data[index++];
	newTd60.innerHTML = data[index++];
	newTd61.innerHTML = data[index++];
	newTd62.innerHTML = data[index++];
	newTd63.innerHTML = courseLoad[7] + "费用";
	newTd64.innerHTML = data[index++];
	newTd65.innerHTML = data[index++];
	newTd66.innerHTML = data[index++];
	newTd67.innerHTML = data[index++];
	newTd68.innerHTML = data[index++];
	newTd69.innerHTML = data[index++];
	newTd70.innerHTML = courseLoad[8] + "费用";
	newTd71.innerHTML = data[index++];
	newTd72.innerHTML = data[index++];
	newTd73.innerHTML = data[index++];
	newTd74.innerHTML = data[index++];
	newTd75.innerHTML = data[index++];
	newTd76.innerHTML = data[index++];
	newTd77.innerHTML = courseLoad[9] + "费用";
	newTd78.innerHTML = data[index++];
	newTd79.innerHTML = data[index++];
	newTd80.innerHTML = data[index++];
	newTd81.innerHTML = data[index++];
	newTd82.innerHTML = data[index++];
	newTd83.innerHTML = data[index++];

	// 对没有的扣费项目进行隐藏，
	if (obj.subFee1Name == "费用1") {
		for (var i = 16; i < 16 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee2Name == "费用2") {
		for (var i = 17; i < 17 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee3Name == "费用3") {
		for (var i = 18; i < 18 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee4Name == "费用4") {
		for (var i = 19; i < 19 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}
	if (obj.subFee5Name == "费用5") {
		for (var i = 20; i < 20 + 7 * 10; i = i + 7) {
			setHiddenCol(sqlFeeTable, i);
		}
	}

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

//oTable为表的id，iRow和iCol是从0开始的，iRow=0表示的是第一行，iCol=0表示的是第一列。
function setHiddenCol(oTable, iCol) {
	for (var i = 0; i < oTable.rows.length; i++) {
		oTable.rows[i].cells[iCol].style.display = "none";
		//如果该列隐藏则让其显示，反之则让其隐藏
		//oTable.rows[i].cells[iCol].style.display=="none"?"block":"none";
	}
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