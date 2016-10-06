/**
 * @author zyx
 */

var maxCourseNum = 10;
var courseLoad = new Array();

function sqlSet() {
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
					alert("不存在校区信息，请在后台管理中设置校长设置！");
				} else {
					info = eval(ret);
					
					appendRowHeader(sqlSetTable);

					var i = 0;
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
	var url = "sqlSet.php";
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

	newTd0.innerHTML = "序号";
	newTd1.innerHTML = "ID";
	newTd2.innerHTML = "校区名";
	newTd3.innerHTML = "校区负责人";
	newTd4.innerHTML = "产品1";
	newTd5.innerHTML = "产品2";
	newTd6.innerHTML = "产品3";
	newTd7.innerHTML = "产品4";
	newTd8.innerHTML = "产品5";
	newTd9.innerHTML = "科目1";
	newTd10.innerHTML = "科目2";
	newTd11.innerHTML = "科目3";
	newTd12.innerHTML = "科目4";
	newTd13.innerHTML = "科目5";
	newTd14.innerHTML = "科目6";
	newTd15.innerHTML = "科目7";
	newTd16.innerHTML = "科目8";
	newTd17.innerHTML = "科目9";
	newTd18.innerHTML = "科目10";
	newTd19.innerHTML = "年级1";
	newTd20.innerHTML = "年级2";
	newTd21.innerHTML = "年级3";
	newTd22.innerHTML = "年级4";
	newTd23.innerHTML = "年级5";
	newTd24.innerHTML = "年级6";
	newTd25.innerHTML = "扣费项目1";
	newTd26.innerHTML = "扣费项目2";
	newTd27.innerHTML = "扣费项目3";
	newTd28.innerHTML = "扣费项目4";
	newTd29.innerHTML = "扣费项目5";
	newTd30.innerHTML = "班课单价初一";
	newTd31.innerHTML = "初二";
	newTd32.innerHTML = "初三";
	newTd33.innerHTML = "高一";
	newTd34.innerHTML = "高二";
	newTd35.innerHTML = "高三";
	newTd36.innerHTML = "一对一单价时间1";
	newTd37.innerHTML = "一对一单价时间2";
	newTd38.innerHTML = "初一1";
	newTd39.innerHTML = "初一2";
	newTd40.innerHTML = "初一3";
	newTd41.innerHTML = "初一单小时工资";
	newTd42.innerHTML = "初二1";
	newTd43.innerHTML = "初二2";
	newTd44.innerHTML = "初二3";
	newTd45.innerHTML = "初二单小时工资";
	newTd46.innerHTML = "初三1";
	newTd47.innerHTML = "初三2";
	newTd48.innerHTML = "初三3";
	newTd49.innerHTML = "初三单小时工资";
	newTd50.innerHTML = "高一1";
	newTd51.innerHTML = "高一2";
	newTd52.innerHTML = "高一3";
	newTd53.innerHTML = "高一单小时工资";
	newTd54.innerHTML = "高二1";
	newTd55.innerHTML = "高二2";
	newTd56.innerHTML = "高二3";
	newTd57.innerHTML = "高二单小时工资";
	newTd58.innerHTML = "高三1";
	newTd59.innerHTML = "高三2";
	newTd60.innerHTML = "高三3";
	newTd61.innerHTML = "高三单小时工资";
	newTd62.innerHTML = "设置时间";
}

// 插入班课表格相关函数
function appendRow(obj, index) {
	// 序号从1开始
	index = index + 1;

	var TableID = sqlSetTable;

	// 添加一行
	var newTr = TableID.insertRow(-1);
	// 添加列
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

	newTd0.innerHTML = index;
	newTd1.innerHTML = obj.id;
	newTd2.innerHTML = obj.schoolZone;
	newTd3.innerHTML = obj.assistant;
	if (obj.product1 != "") {
		newTd4.innerHTML = obj.product1;
	} else {
		newTd4.innerHTML = "/";
	}
	if (obj.product2 != "") {
		newTd5.innerHTML = obj.product2;
	} else {
		newTd5.innerHTML = "/";
	}

	if (obj.product3 != "") {
		newTd6.innerHTML = obj.product3;
	} else {
		newTd6.innerHTML = "/";
	}

	if (obj.product4 != "") {
		newTd7.innerHTML = obj.product4;
	} else {
		newTd7.innerHTML = "/";
	}

	if (obj.product5 != "") {
		newTd8.innerHTML = obj.product5;
	} else {
		newTd8.innerHTML = "/";
	}

	if (obj.course1 !="") {
		newTd9.innerHTML = courseLoad[0];
	} else {
		newTd9.innerHTML = "/";
	}
	if (obj.course2 !="") {
		newTd10.innerHTML = courseLoad[1];
	} else {
		newTd10.innerHTML = "/";
	}
	if (obj.course3 !="") {
		newTd11.innerHTML = courseLoad[2];
	} else {
		newTd11.innerHTML = "/";
	}
	if (obj.course4 !="") {
		newTd12.innerHTML = courseLoad[3];
	} else {
		newTd12.innerHTML = "/";
	}
	if (obj.course5 !="") {
		newTd13.innerHTML = courseLoad[4];
	} else {
		newTd13.innerHTML = "/";
	}
	if (obj.course6 !="") {
		newTd14.innerHTML = courseLoad[5];
	} else {
		newTd14.innerHTML = "/";
	}
	if (obj.course7 !="") {
		newTd15.innerHTML = courseLoad[6];
	} else {
		newTd15.innerHTML = "/";
	}
	if (obj.course8 !="") {
		newTd16.innerHTML = courseLoad[7];
	} else {
		newTd16.innerHTML = "/";
	}
	if (obj.course9 !="") {
		newTd17.innerHTML = courseLoad[8];
	} else {
		newTd17.innerHTML = "/";
	}
	if (obj.course10 !="") {
		newTd18.innerHTML = courseLoad[9];
	} else {
		newTd18.innerHTML = "/";
	}

	if (obj.grade7 == "on") {
		newTd19.innerHTML = "初一";
	} else {
		newTd19.innerHTML = "/";
	}
	if (obj.grade8 == "on") {
		newTd20.innerHTML = "初二";
	} else {
		newTd20.innerHTML = "/";
	}
	if (obj.grade9 == "on") {
		newTd21.innerHTML = "初三";
	} else {
		newTd21.innerHTML = "/";
	}
	if (obj.grade10 == "on") {
		newTd22.innerHTML = "高一";
	} else {
		newTd22.innerHTML = "/";
	}
	if (obj.grade11 == "on") {
		newTd23.innerHTML = "高二";
	} else {
		newTd23.innerHTML = "/";
	}
	if (obj.grade12 == "on") {
		newTd24.innerHTML = "高三";
	} else {
		newTd24.innerHTML = "/";
	}
	if (obj.subFeeItem1 != "") {
		newTd25.innerHTML = obj.subFeeItem1;
	} else {
		newTd25.innerHTML = "/";
	}
	if (obj.subFeeItem2 != "") {
		newTd26.innerHTML = obj.subFeeItem2;
	} else {
		newTd26.innerHTML = "/";
	}
	if (obj.subFeeItem3 != "") {
		newTd27.innerHTML = obj.subFeeItem3;
	} else {
		newTd27.innerHTML = "/";
	}
	if (obj.subFeeItem4 != "") {
		newTd28.innerHTML = obj.subFeeItem4;
	} else {
		newTd28.innerHTML = "/";
	}
	if (obj.subFeeItem5 != "") {
		newTd29.innerHTML = obj.subFeeItem5;
	} else {
		newTd29.innerHTML = "/";
	}
	newTd30.innerHTML = obj.priceBKgrade7;
	newTd31.innerHTML = obj.priceBKgrade8;
	newTd32.innerHTML = obj.priceBKgrade9;
	newTd33.innerHTML = obj.priceBKgrade10;
	newTd34.innerHTML = obj.priceBKgrade11;
	newTd35.innerHTML = obj.priceBKgrade12;
	newTd36.innerHTML = obj.hour1;
	newTd37.innerHTML = obj.hour2;
	newTd38.innerHTML = obj.price7hour1YDY;
	newTd39.innerHTML = obj.price7hour2YDY;
	newTd40.innerHTML = obj.price7hour3YDY;
	newTd41.innerHTML = obj.pay7;
	newTd42.innerHTML = obj.price8hour1YDY;
	newTd43.innerHTML = obj.price8hour2YDY;
	newTd44.innerHTML = obj.price8hour3YDY;
	newTd45.innerHTML = obj.pay8;
	newTd46.innerHTML = obj.price9hour1YDY;
	newTd47.innerHTML = obj.price9hour2YDY;
	newTd48.innerHTML = obj.price9hour3YDY;
	newTd49.innerHTML = obj.pay9;
	newTd50.innerHTML = obj.price10hour1YDY;
	newTd51.innerHTML = obj.price10hour2YDY;
	newTd52.innerHTML = obj.price10hour3YDY;
	newTd53.innerHTML = obj.pay10;
	newTd54.innerHTML = obj.price11hour1YDY;
	newTd55.innerHTML = obj.price11hour2YDY;
	newTd56.innerHTML = obj.price11hour3YDY;
	newTd57.innerHTML = obj.pay11;
	newTd58.innerHTML = obj.price12hour1YDY;
	newTd59.innerHTML = obj.price12hour2YDY;
	newTd60.innerHTML = obj.price12hour3YDY;
	newTd61.innerHTML = obj.pay12;
	newTd62.innerHTML = dateJS("Y-m-d", obj.time);

	// 添加表格样式
	$("#sqlSetTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlSetTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlSetTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlSetTable tr:even").addClass("rowBgColorEven");
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
					// alert("");
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
					
					// 载入校长设置
					sqlSet();
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