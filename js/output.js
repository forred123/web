/**
 * @author zyx
 */

var info;
var i = 0;
var len = 0;
var tableRowCount = 0;
var flagSubmit = false;
var productLoad = new Array();
var BKClassifyMatrix;
//=  new Array();
// 试听成功和试听失败学生名单
var testSuc = new Array();
var testFail = new Array();

function loadPrincipalSetAndTeacher() {
	if (document.getElementsByName("schoolZone")[0].value > 0) {
		var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;
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
	var url = "output.php";
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

	if (info[index].course1 != "") {
		obj.options.add(new Option("数学", 1));
	}
	if (info[index].course2 != "") {
		obj.options.add(new Option("语文", 2));
	}
	if (info[index].course3 != "") {
		obj.options.add(new Option("英语", 3));
	}
	if (info[index].course4 != "") {
		obj.options.add(new Option("物理", 4));
	}
	if (info[index].course5 != "") {
		obj.options.add(new Option("化学", 5));
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

					// 如果是教师自动填充姓名，然后自动查询
					if (GetCookie('role') == '1') {
						// 先清除所有以前选择加进来的，只保留已经登录的教师姓名
						for ( i = 1; i < obj.options.length; ) {
							obj.removeChild(obj.options[i]);
						}
						var teacher = decodeURIComponent(GetCookie('userName'));
						document.getElementsByName("teacher")[0].options.add(new Option(teacher, 1));
						document.getElementsByName("teacher")[0].value = 1;
					}

				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};

	// 3发出http请求
	var url = "output.php";
	url = url + "?schoolZoneSQL=" + encodeURIComponent(schoolZone);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function sqlOut() {
	var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].options.selectedIndex].text;
	if (schoolZone == "-请选择-") {
		schoolZone = "%";
	}
	var grade = document.getElementsByName("grade")[0].options[document.getElementsByName("grade")[0].options.selectedIndex].text;
	if (grade == "-请选择-") {
		grade = "%";
	}
	var course = document.getElementsByName("course")[0].value;
	if (course == "0") {
		course = "%";
	}
	var product = document.getElementsByName("product")[0].options[document.getElementsByName("product")[0].options.selectedIndex].text;
	if (product == "-请选择-") {
		product = "%";
	}
	var teacher = document.getElementsByName("teacher")[0].options[document.getElementsByName("teacher")[0].options.selectedIndex].text;
	if (teacher == "-请选择-") {
		teacher = "%";
	}
	var classInMLS = document.getElementsByName("class")[0].value;
	if (classInMLS == "0") {
		classInMLS = "%";
	}

	// 最少填写这三个条件才能查询
	if (document.getElementsByName("timeStart")[0].value == "") {
		alert('请选择"开始时间"！');
		return;
	}
	if (document.getElementsByName("timeEnd")[0].value == "") {
		alert('请选择"结束时间"！');
		return;
	}
	if (document.getElementsByName("product")[0].value == 0) {
		alert('请选择"产品名称"！');
		return;
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
				//alert(ret);
				removeRow("sqlOutTable");
				if (ret == "0") {
					alert("该条件下无产出！请核对查找条件！");
				} else {

					var info = eval(ret);
					var obj = document.getElementById("sqlOutTable");

					if (product == "一对一") {
						// 插入一对一查询结果表头
						i = 0;
						var sumOutYDY = 0, sumHour = 0, sumPay = 0;
						for (var tmp in info) {
							sumOutYDY += info[i].price * info[i].period / 60.0;
							sumHour += info[i].period / 60.0;
							sumPay += info[i].period / 60.0 * info[i].pay / 1.0;
							i++;
						}
						appendRowYDYHeader(sqlOutTable, sumOutYDY.toFixed(2), sumHour.toFixed(2), sumPay.toFixed(2));
					}

					i = 0;
					for (var tmp in info) {
						// 插入一对一查询结果具体内容
						if (product == "一对一") {
							appendRowYDY(info[i], i);
						}
						i++;
					}

					// 插入班课查询结果
					if (product == "班课") {
						// 把班课查询的数据库放到一个二维数组中，
						var BKMatrix;

						BKMatrix = loadBKMatrix(info);
						// 把二维数组进行分类处理,
						// 顺序为：0校区－1教师－2年级－3课程－4班级名称－5出勤时间（-6单价－7工资（这两个是计算使用））＋8本次课学生总数＋9总产出（本次课学生单价的总和）－10班级ID -11班课时长
						// 12试听学生人数－（13本学生姓名1－14本学生姓名2－15本学生单价-16学生priceState）－（17本类学生姓名1－18本类学生姓名2－19本类学生单价-20本类学生priceState）这三个是一组，后面还有不定个这样的组
						BKClassifyMatrix = loadBKClassifyMatrix(BKMatrix);

						// 把分类后的数组插入到统计表格中
						//alert(BKClassifyMatrix.length);
						//alert(BKClassifyMatrix);
						// 插入班课查询结果表头
						if (product == "班课") {
							var sumOutBK = 0;
							for ( i = 0; i < BKClassifyMatrix.length; i++) {
								sumOutBK += BKClassifyMatrix[i][9];
							}
							appendRowBKHeader(sqlOutTable, sumOutBK);
						}

						// 插入班课查询具体数据入表
						for ( i = 0; i < BKClassifyMatrix.length; i++) {
							//alert(BKClassifyMatrix[i]);
							appendRowBK(BKClassifyMatrix[i], i);
						}
					}

				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};

	// 3发出http请求
	var url = "output.php";
	url = url + "?sqlOut=0" + "&schoolZone=" + encodeURIComponent(schoolZone) + "&grade=" + encodeURIComponent(grade) + "&course=" + encodeURIComponent(course) + "&product=" + encodeURIComponent(product) + "&teacher=" + encodeURIComponent(teacher) + "&classInMLS=" + classInMLS + "&timeStart=" + document.getElementsByName("timeStart")[0].value + "&timeEnd=" + document.getElementsByName("timeEnd")[0].value;
	//alert(url);
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
				}

				// 默认填写当前日期
				document.getElementsByName("timeStart")[0].value = getYear0FormatDate();
				document.getElementsByName("timeEnd")[0].value = getNowFormatDate();

				// 如果是教师自动填充姓名，然后自动查询
				if (GetCookie('role') == '1') {
					// 填写教师姓名
					//document.getElementsByName("teacher")[0].value = decodeURIComponent(GetCookie('userName'));
					var teacher = decodeURIComponent(GetCookie('userName'));
					document.getElementsByName("teacher")[0].options.add(new Option(teacher, 1));
					document.getElementsByName("teacher")[0].value = 1;
					document.getElementsByName("teacher")[0].disabled = 'true';
					// 设置产品为一对一
					document.getElementsByName("product")[0].options.add(new Option("一对一", 1));
					document.getElementsByName("product")[0].value = 1;
					// 查询
					sqlOut();
				}

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

					// 设置产品为一对一
					document.getElementsByName("product")[0].options.add(new Option("一对一", 1));
					document.getElementsByName("product")[0].value = 1;
					// 查询
					sqlOut();
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "output.php";
	url = url + "?noValue=1";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// 插入一对一查询结果表头
function appendRowYDYHeader(TableID, sumOut, sumHour, sumPay) {
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

	newTd0.innerHTML = "";
	newTd1.innerHTML = "<b>报表类型</b>";
	newTd2.innerHTML = "一对一";
	newTd3.innerHTML = "<b>起始时间</b>";
	newTd4.innerHTML = document.getElementsByName("timeStart")[0].value;
	newTd5.innerHTML = "<b>结束时间</b>";
	newTd6.innerHTML = document.getElementsByName("timeEnd")[0].value;
	newTd7.innerHTML = "<b>总产出</b>";
	newTd8.innerHTML = sumOut;
	newTd9.innerHTML = "<b>总小时数</b>";
	newTd10.innerHTML = sumHour;
	newTd11.innerHTML = "<b>总工资</b>";
	newTd12.innerHTML = sumPay;
	newTd13.innerHTML = '<a id="test" onclick="exportToCSVOutput(this)" download="一对一查询报表.csv" href="#">导出Excel</a>';

	// 添加一行
	var newTrt = TableID.insertRow(-1);
	// 添加两列
	var newTd0t = newTrt.insertCell(-1);
	var newTd1t = newTrt.insertCell(-1);
	var newTd2t = newTrt.insertCell(-1);
	var newTd3t = newTrt.insertCell(-1);
	var newTd4t = newTrt.insertCell(-1);
	var newTd5t = newTrt.insertCell(-1);
	var newTd6t = newTrt.insertCell(-1);
	var newTd7t = newTrt.insertCell(-1);
	var newTd8t = newTrt.insertCell(-1);
	var newTd9t = newTrt.insertCell(-1);
	var newTd10t = newTrt.insertCell(-1);
	var newTd11t = newTrt.insertCell(-1);
	var newTd12t = newTrt.insertCell(-1);
	var newTd13t = newTrt.insertCell(-1);
	// 设置列内容和属性
	newTd0t.align = 'center';
	newTd1t.align = 'center';
	newTd2t.align = 'center';
	newTd3t.align = 'center';
	newTd4t.align = 'center';
	newTd5t.align = 'center';
	newTd6t.align = 'center';
	newTd7t.align = 'center';
	newTd8t.align = 'center';
	newTd9t.align = 'center';
	newTd10t.align = 'center';
	newTd11t.align = 'center';
	newTd12t.align = 'center';
	newTd13t.align = 'center';

	newTd0t.innerHTML = "序号";
	newTd1t.innerHTML = "校区";
	newTd2t.innerHTML = "教师姓名";
	newTd3t.innerHTML = "年级";
	newTd4t.innerHTML = "科目";
	newTd5t.innerHTML = "上课日期";
	newTd6t.innerHTML = "上课时间段";
	newTd7t.innerHTML = "学生姓名1";
	newTd8t.innerHTML = "学生姓名2";
	newTd9t.innerHTML = "上课小时数";
	newTd10t.innerHTML = "单小时工资";
	newTd11t.innerHTML = "本节课工资";
	newTd12t.innerHTML = "本节课单价";
	newTd13t.innerHTML = "本节课产出";
}

// 插入一对一表格相关函数
function appendRowYDY(obj, index) {
	// 序号从1开始
	index = index + 1;

	var TableID = sqlOutTable;
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

	var course;
	if (obj.subFeeCourse == 1) {
		course = "数学";
	}
	if (obj.subFeeCourse == 2) {
		course = "语文";
	}
	if (obj.subFeeCourse == 3) {
		course = "英语";
	}
	if (obj.subFeeCourse == 4) {
		course = "物理";
	}
	if (obj.subFeeCourse == 5) {
		course = "化学";
	}
	var name2;
	if (obj.name2 == "") {
		name2 = "/";
	}
	//var attandenceTime = date("Y-M-d H:i:s", obj.attandenceTime);
	var attandenceDate = dateJS("Y-M-d", obj.attandenceTime);
	var attandenceTimeStart = dateJS("H:i", obj.attandenceTime);
	var attandenceTimeEnd = dateJS("H:i", parseInt(obj.attandenceTime) + parseInt(obj.period * 60));
	var strTimePeriod = attandenceTimeStart + "~" + attandenceTimeEnd;

	newTd0.innerHTML = index;
	newTd1.innerHTML = obj.schoolZone;
	newTd2.innerHTML = obj.teacher;
	newTd3.innerHTML = obj.grade;
	newTd4.innerHTML = course;
	newTd5.innerHTML = attandenceDate;
	newTd6.innerHTML = attandenceTimeStart + '~' + attandenceTimeEnd;
	newTd7.innerHTML = obj.name1;
	newTd8.innerHTML = name2;
	newTd9.innerHTML = obj.period / 60;
	newTd10.innerHTML = obj.pay;
	newTd11.innerHTML = obj.period / 60 * obj.pay;
	newTd12.innerHTML = obj.price;
	newTd13.innerHTML = obj.price * obj.period / 60;

	// 添加表格样式
	$("#sqlOutTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlOutTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlOutTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlOutTable tr:even").addClass("rowBgColorEven");

}

// 插入班课查询结果表头
function appendRowBKHeader(TableID, sumOutBK) {
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

	newTd0.innerHTML = "";
	newTd1.innerHTML = "<b>报表类型</b>";
	newTd2.innerHTML = "班课";
	newTd3.innerHTML = "<b>起始时间</b>";
	newTd4.innerHTML = document.getElementsByName("timeStart")[0].value;
	newTd5.innerHTML = "<b>结束时间</b>";
	newTd6.innerHTML = document.getElementsByName("timeEnd")[0].value;
	newTd7.innerHTML = "<b>总产出</b>";
	newTd8.innerHTML = sumOutBK;
	newTd9.innerHTML = "";
	newTd10.innerHTML = "";
	newTd11.innerHTML = "";
	newTd12.innerHTML = "";
	newTd13.innerHTML = '<a id="test" onclick="exportToCSVOutput(this)" download="班课查询报表.csv" href="#">导出Excel</a>';
	newTd14.innerHTML = "";

	// 添加一行
	var newTrt = TableID.insertRow(-1);
	// 添加两列
	var newTd0t = newTrt.insertCell(-1);
	var newTd1t = newTrt.insertCell(-1);
	var newTd2t = newTrt.insertCell(-1);
	var newTd3t = newTrt.insertCell(-1);
	var newTd4t = newTrt.insertCell(-1);
	var newTd5t = newTrt.insertCell(-1);
	var newTd6t = newTrt.insertCell(-1);
	var newTd7t = newTrt.insertCell(-1);
	var newTd8t = newTrt.insertCell(-1);
	var newTd9t = newTrt.insertCell(-1);
	var newTd10t = newTrt.insertCell(-1);
	var newTd11t = newTrt.insertCell(-1);
	var newTd12t = newTrt.insertCell(-1);
	var newTd13t = newTrt.insertCell(-1);
	var newTd14t = newTrt.insertCell(-1);

	// 设置列内容和属性
	newTd0t.align = 'center';
	newTd1t.align = 'center';
	newTd2t.align = 'center';
	newTd3t.align = 'center';
	newTd4t.align = 'center';
	newTd5t.align = 'center';
	newTd6t.align = 'center';
	newTd7t.align = 'center';
	newTd8t.align = 'center';
	newTd9t.align = 'center';
	newTd10t.align = 'center';
	newTd11t.align = 'center';
	newTd12t.align = 'center';
	newTd13t.align = 'center';
	newTd14t.align = 'center';

	newTd0t.innerHTML = "序号";
	newTd1t.innerHTML = "校区";
	newTd2t.innerHTML = "教师";
	newTd3t.innerHTML = "年级";
	newTd4t.innerHTML = "科目";
	newTd5t.innerHTML = "班级";
	newTd6t.innerHTML = "上课日期";
	newTd7t.innerHTML = "上课时间段";
	newTd8t.innerHTML = "本节课产出";
	newTd9t.innerHTML = "出勤人数";
	newTd10t.innerHTML = "试听成功";
	newTd11t.innerHTML = "成功名单";
	newTd12t.innerHTML = "试听失败";
	newTd13t.innerHTML = "失败名单";
	newTd14t.innerHTML = "扣费人数";
}

// 插入班课表格相关函数
function appendRowBK(mat, index) {
	// 序号从1开始
	index = index + 1;

	var TableID = sqlOutTable;

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

	//var attandenceTime = date("Y-M-d H:i:s", obj.attandenceTime);
	var attandenceDate = dateJS("Y-M-d", mat[5]);
	var attandenceTimeStart = dateJS("H:i", mat[5]);

	var attandenceTimeEnd = dateJS("H:i", parseInt(mat[5]) + mat[11] * 60);
	var strTimePeriod = attandenceTimeStart + "~" + attandenceTimeEnd;
	var nameSuc = "";
	var nameFail = "";
	// 试听成功和试听失败学生人数
	var testSucNum = 0;
	var testFailNum = 0;

	newTd0.innerHTML = index;
	newTd1.innerHTML = mat[0];
	//obj.schoolZone;
	newTd2.innerHTML = mat[1];
	//obj.teacher;
	newTd3.innerHTML = mat[2];
	//obj.grade;
	newTd4.innerHTML = mat[3];
	//科目
	newTd5.innerHTML = mat[4];
	//obj.classInMLS;
	newTd6.innerHTML = attandenceDate;
	newTd7.innerHTML = attandenceTimeStart + '~' + attandenceTimeEnd;
	newTd8.innerHTML = mat[9];
	//总产出（本次课学生单价的总和）
	newTd9.innerHTML = mat[8];
	//出勤人数

	//if(mat[14]==0){
	//	newTd11.innerHTML="无";
	//}else{
	for (var i = 13; i < mat.length; i = i + 4) {
		if ( typeof (mat[i + 3]) != "undefined") {
			if (mat[i + 3] == 0) {
				if (mat[i + 1] == "") {
					//nameTmp += "{" + mat[i] + "-" + "/" +"}";
					//nameTmp += mat[i] + "-" + "/" +"; ";
					//nameFail += mat[i] +"; ";
					nameFail += mat[i] + "、";
				} else {
					//nameTmp += "{" + mat[i] +"-", mat[i+1] +"}";
					//nameFail += mat[i] +"-", mat[i+1] +"; ";
					nameFail += mat[i] + "-", mat[i + 1] + "、";
				}
			}

			if (mat[i + 3] == 2) {
				testSucNum++;
				if (mat[i + 1] == "") {
					//nameSuc += mat[i] + "; ";
					nameSuc += mat[i] + "、";
				} else {
					//nameSuc += mat[i] + "-", mat[i + 1] + "; ";
					nameSuc += mat[i] + "-", mat[i + 1] + "、";
				}
			}
		}
	}
	newTd10.innerHTML = testSucNum;
	// mat[12];///////////////////////////????????????
	if (nameSuc == "") {
		newTd11.innerHTML = "无";
	} else {
		newTd11.innerHTML = nameSuc;
		sqlOutTable.rows[index-1].cells[11].style.width = "100px";
	}

	if (nameFail == "") {
		newTd13.innerHTML = "无";
	} else {
		newTd13.innerHTML = nameFail;
		sqlOutTable.rows[index-1].cells[13].style.width = "100px";
	}
	sqlOutTable.rows[index-1].cells[2].style.width = "50px";
	//}

	newTd12.innerHTML = mat[12] - testSucNum;
	newTd14.innerHTML = mat[8] - (mat[12] - testSucNum);
	//本次上课同一个班级的扣费人数
	testSucNum = 0;

	// 添加表格样式
	$("#sqlOutTable tr").mouseover(function() {
		$(this).css("background-color", "#e9eaec");
		$(this).css("line-height", "49px");
	});
	$("#sqlOutTable tr").mouseout(function() {
		$(this).css("background-color", "");
		$(this).css("line-height", "19px");
	});
	$("#sqlOutTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlOutTable tr:even").addClass("rowBgColorEven");

}

// 窗口表格删除一行
function removeRow(TableID) {
	var tabObj = document.getElementById(TableID);
	tableRowCount = document.getElementById(TableID).rows.length;
	// 从表格首行开始删除，所以使用0，如果要保留首行则使用1
	for (var j = 0; j < tableRowCount; j++) {
		tabObj.deleteRow(0);
	}
	tableRowCount = 0;
}

// BKClassifyMatrix为obj的实际矩阵，
// 顺序为：0校区－1教师－2年级－3课程－4班级名称－5出勤时间（-6单价－7工资（这两个是计算使用））＋8本次课学生总数＋9总产出（本次课学生单价的总和）－10班级ID -11班课时长
// 12试听学生人数－（13本学生姓名1－14本学生姓名2－15本学生单价-16学生priceState）－（17本类学生姓名1－18本类学生姓名2－19本类学生单价-20本类学生priceState）这三个是一组，后面还有不定个这样的组
function loadBKMatrix(obj) {
	// 定义二级数组
	var tmpMatrx = new Array();
	for (var i = 0; i < obj.length; i++) {
		tmpMatrx[i] = new Array();
	}
	var attandenceTime;
	var course;
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].subFeeCourse == 1) {
			course = "数学";
		}
		if (obj[i].subFeeCourse == 2) {
			course = "语文";
		}
		if (obj[i].subFeeCourse == 3) {
			course = "英语";
		}
		if (obj[i].subFeeCourse == 4) {
			course = "物理";
		}
		if (obj[i].subFeeCourse == 5) {
			course = "化学";
		}

		//attandenceTime = date("Y-M-d H:i:s", obj[i].attandenceTime);
		//alert(attandenceTime);
		tmpMatrx[i][0] = obj[i].schoolZone;
		tmpMatrx[i][1] = obj[i].teacher;
		tmpMatrx[i][2] = obj[i].grade;
		tmpMatrx[i][3] = course;
		tmpMatrx[i][4] = obj[i].className;
		// 班级名称
		tmpMatrx[i][5] = obj[i].attandenceTime;
		tmpMatrx[i][6] = obj[i].price;
		tmpMatrx[i][7] = obj[i].pay;
		tmpMatrx[i][8] = 1;
		//本次课学生总
		if (obj[i].priceState == "0") {
			tmpMatrx[i][9] = 0;
		} else {
			tmpMatrx[i][9] = parseFloat(obj[i].price);
			//总产出（本次课学生单价的总和）
		}

		tmpMatrx[i][10] = obj[i].classInMLS;
		//班级ID
		tmpMatrx[i][11] = obj[i].period;
		// 班课时长

		if (obj[i].priceState == "0") {
			tmpMatrx[i][12] = 1;
			// 自己就是试听学生
		} else {
			tmpMatrx[i][12] = 0;
			// 自己不是试听学生或试听失败的
		}

		tmpMatrx[i][13] = obj[i].name1;
		//扣费学生姓名1
		tmpMatrx[i][14] = obj[i].name2;
		//扣费学生姓名2
		tmpMatrx[i][15] = obj[i].price;
		//扣费学生班课单价
		tmpMatrx[i][16] = obj[i].priceState;
		//扣费学生priceState

		if (obj[i].priceState == "1") {
			// 在确认试听成功或失败之前都是试听中，试听成功后的时间上课都不是试听
			if ((obj[i].testResultTime > obj[i].attandenceTime + obj[i].period * 60) && (obj[i].testResultTime != 0)) {
				tmpMatrx[i][16] = 2;
				// 自己是试听学生试听成功的
			}
		}
		//alert(tmpMatrx);
	}
	return tmpMatrx;
}

// 把二维数组进行分类处理，后面是无穷个扣费学生
function loadBKClassifyMatrix(mat) {
	var mattmp = new Array();
	//alert(mat);
	//for(var i=0;i<mat.length;i++){
	//	mattmp[i] = new Array();
	//}
	// 第一类
	// 顺序为：0校区－1教师－2年级－3课程－4班级名称－5出勤时间（-6单价－7工资（这两个是计算使用））＋8本次课学生总数＋9总产出（本次课学生单价的总和）－10班级ID -11班课时长
	// 12试听学生人数－（13本学生姓名1－14本学生姓名2－15本学生单价-16学生priceState）－（17本类学生姓名1－18本类学生姓名2－19本类学生单价-20本类学生priceState）这三个是一组，后面还有不定个这样的组
	var index = 0, flagOnce = 0, flagStartIndex = 0;
	var feeIndex = 17;
	mattmp[0] = mat[0];
	for (var i = 1; i < mat.length; i++) {
		// 比对查找的第一个元素为该新类的下一个元素所以加1，否则把自己新类的学生个数和单价加了两次，这样不对
		for (var j = flagStartIndex + 1; j < mat.length; j++) {
			// 如果属于同一类，则把学生总数加1，把学生单价相加上变成总产出
			if ((mat[j][0] == mattmp[index][0]) && (mat[j][1] == mattmp[index][1]) && (mat[j][2] == mattmp[index][2]) && (mat[j][3] == mattmp[index][3]) && (mat[j][4] == mattmp[index][4]) && (mat[j][5] == mattmp[index][5])) {
				// 听课总人数加1
				mattmp[index][8]++;
				// 试听总人数加1
				if ((mat[j][16] == 0) || (mat[j][16] == 2)) {
					mattmp[index][12]++;
				}
				// 总产出相加(0为试听中或试听失败不算产出，1为算产出，2表示试听成功，也算产出)
				if (mat[j][16] != 0) {
					mattmp[index][9] += parseFloat(mat[j][6]);
				}
				// 学生姓名1
				mattmp[index][feeIndex++] = mat[j][13];
				// 学生姓名2
				mattmp[index][feeIndex++] = mat[j][14];
				// 该学生班课单价
				mattmp[index][feeIndex++] = mat[j][15];
				// 该学生priceState
				mattmp[index][feeIndex++] = mat[j][16];
			} else if (flagOnce == 0) {
				// 产生一个新类别
				flagOnce = 1;
				// 保存第一次不同时的下标，方便下一循环查找新类
				flagStartIndex = j;
				// 产生新类时，要把学生姓名和单价的数组下标复位，否则不是从14开始而是接着上一个继续
				feeIndex = 17;
				//alert(mat[j]);
				//index++;
				//mattmp[index] = mat[j];
			}
		}
		// 如要本该循环完成后，没有发现新类，则跳出外层循环，类别寻找结束。
		if (flagOnce == 0) {
			break;
		}
		// 本该循环结束后，如果有新类，则把新类复制给mat，方便下次循环查找比对
		if ((j == mat.length) && (flagOnce == 1)) {
			flagOnce = 0;
			index++;
			mattmp[index] = mat[flagStartIndex];
		}
	}
	//alert(mattmp);
	//alert(index+1);
	return mattmp;
}

// 导出表格到CSV
function exportToCSVOutput(aLink) {
	// var str = "栏位1,栏位2,栏位3\n值1,值2,值3";
	//var str = "报表类型,一对一查询,";
	var str = GetInfoFromTableOutput("sqlOutTable");
	str = encodeURIComponent(str);
	//aLink.href = "data:text/csv;charset=gbk,\ufeff" + str;
	aLink.href = "data:text/csv;charset=utf-8,\ufeff" + str;
	//aLink.click();
}

// 获得整个表格的具体内容并返回字符串
function GetInfoFromTableOutput(tableid) {
	var tableInfo = "";
	var strtmp = "";
	var tableObj = document.getElementById(tableid);

	for (var i = 0; i < tableObj.rows.length; i++) {//遍历Table的所有Row
		for (var j = 0; j < tableObj.rows[i].cells.length; j++) {//遍历Row中的每一列
			strtmp = tableObj.rows[i].cells[j].innerHTML;
			// 表头特殊处理
			if (strtmp == "<b>报表类型</b>") {
				strtmp = "报表类型";
			}
			if (strtmp == "<b>起始时间</b>") {
				strtmp = "起始时间";
			}
			if (strtmp == "<b>结束时间</b>") {
				strtmp = "结束时间";
			}
			if (strtmp == "<b>结总产出</b>") {
				strtmp = "总产出";
			}
			if (strtmp == "<b>总产出</b>") {
				strtmp = "总产出";
			}
			if (strtmp == "<b>总小时数</b>") {
				strtmp = "总小时数";
			}
			if (strtmp == "<b>总工资</b>") {
				strtmp = "总工资";
			}
			if (strtmp.indexOf("exportToCSV") != -1) {
				strtmp = "";
			}
			if (strtmp.indexOf("writeClassIdInMLSCookie") != -1) {
				strtmp = "";
			}
			//
			tableInfo += strtmp;
			//获取Table中单元格的内容

			tableInfo += ",";
		}
		// 班课时导出文件多加了扣费学生信息，一对一没有这项
		if (tableObj.rows[0].cells[2].innerHTML == "班课") {
			// 表头要加入学生姓名和单价
			if (i == 1) {
				// 求最大列数，用于确定添加多少个学生姓名和单价
				// 顺序为：0校区－1教师－2年级－3课程－4班级名称－5出勤时间（-6单价－7工资（这两个是计算使用））＋8本次课学生总数＋9总产出（本次课学生单价的总和）－10班级ID -11班课时长
				// 12试听学生人数－（13本学生姓名1－14本学生姓名2－15本学生单价-16学生priceState）－（17本类学生姓名1－18本类学生姓名2－19本类学生单价-20本类学生priceState）这三个是一组，后面还有不定个这样的组
				var addColLen = 0;
				for (var a = 0; a < BKClassifyMatrix.length; a++) {
					if (BKClassifyMatrix[a][8] - BKClassifyMatrix[a][12] > addColLen) {
						addColLen = BKClassifyMatrix[a][8] - BKClassifyMatrix[a][12];
					}
				}
				//alert(BKClassifyMatrix);

				//alert(addColLen);
				for (var a = 1; a <= addColLen; a++) {
					tableInfo += "学生姓名1,学生姓名2,单价,";
				}
			}
			// 添加具体学生姓名和单价
			if (i >= 2) {
				for (var k = 13; k < BKClassifyMatrix[i - 2].length; k = k + 4) {
					if ( typeof (BKClassifyMatrix[i-2][k + 3]) != "undefined") {
						if (BKClassifyMatrix[i-2][k + 3] != "0") {
							strtmp = BKClassifyMatrix[i-2][k + 2];
							if (BKClassifyMatrix[i-2][k + 1] == "") {
								strtmp = '/';
							}
							tableInfo += BKClassifyMatrix[i-2][k] + "," + strtmp + "," + BKClassifyMatrix[i-2][k + 2] + ",";
						}
					}
				}
			}
		}
		//

		// 一行结束后要加换行，否则表格不换行
		tableInfo += "\n";
	}
	//alert(tableInfo);
	return tableInfo;
}

function initPageStudentBKPrice() {
	alert(BKClassifyMatrix);
}

//写入cookie，为了在sqlStudentBKPrice.php中初始化查询使用
function writeClassIdInMLSCookie(classIDInMLS) {
	SetCookie("sqlStudentPriceByclassIDInMLS", classIDInMLS);
}

//写入cookie
function SetCookie(name, value) {
	var Days = 1;
	//此 cookie 将被保存 1 天
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
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