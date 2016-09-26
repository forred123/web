/**
 * @author zyx
 */

var info;
var i = 0;
var len = 0;
var flagSubmit = false;
var productLoad = new Array();
var strtmp = "";
// 最多1000个校区，1000个班级名称
var MaxClassName = 1000;
var classIDandTeacher = new Array();
	for(var j=0;j<MaxClassName;j++){
		classIDandTeacher[j] = new Array();
	}

var testingNum = 0;// 试听中人数
var testFailNum = 0; // 试听结束人数
var testSuccessNum = 0; //
var testRate = 0.0;// 试听率

function sqlTest() {
	// 试听统计数据请零
	testingNum = 0;// 试听中人数
	testFailNum = 0; // 试听结束人数
	testSuccessNum = 0; //
	testRate = 0.0;// 试听率

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
	if(timeStart ==""){
		timeStart = "%";
	}	
	var timeEnd = document.getElementsByName("timeEnd")[0].value;
	if(timeEnd ==""){
		timeEnd = "%";
	}	
	var name = document.getElementsByName("name")[0].value;
	if(name ==""){
		name = "%";
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
				
				removeRow('sqlStudentTable');
				
				if (ret == "0") {
					alert("该查询条件下无学生信息记录，请核对查询条件！");
				} else {
					var infoStudent = eval(ret);

					appendRowHeader(sqlStudentTable);
					
					i = 0;
					for (var tmp in infoStudent) {
						appendRow(infoStudent[i],i);
						i++;
					}
					
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求		
	var url = "sqlTest.php";
	url = url + "?sqlTest=1"
			  + "&schoolZone=" + encodeURIComponent(schoolZone)
			  + "&grade=" + grade
			  + "&course=" + course
			  + "&product=" + encodeURIComponent(product)
			  + "&sex=" + sex
			  + "&classIDInMLS=" + classInMLS
			  + "&timeStart=" + timeStart
			  + "&timeEnd="+ timeEnd
			  + "&name=" + name;
	//alert(url);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadPrincipalSetAndTeacher() {
	if(document.getElementsByName("schoolZone")[0].value>0){
		var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;
		
		loadPrincipalSet(schoolZone);
		// ajax 获得班级名称
		loadGradeSetName(schoolZone);
		
		// ajax 获得该校区中的教师
		loadTeacher(schoolZone);
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
	var url = "sqlTest.php";
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
	
	i=1;
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

// ajax 查询一个校区中的教师
function loadTeacher(Name) {
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
					teacherInfo = eval(ret);

					var obj1 = document.getElementsByName("teacher")[0];

					// 先清除所有以前选择加进来的，只保留第一个选择的内容，故意不加i++
					for(i=1;i<obj1.options.length;){
						obj1.removeChild(obj1.options[i]);
					}
					
					// 再增加数据库中的教师姓名
					i = 0;
					for (var tmp in teacherInfo) {
						obj1.options.add(new Option(teacherInfo[i].name, teacherInfo[i].uid));
						i++;
					};		
		
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlTest.php";
	url = url + "?schoolZoneSQL=" + encodeURIComponent(Name);
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
					
					// 默认填写当前日期
					document.getElementsByName("timeStart")[0].value = getYear0FormatDate();
					document.getElementsByName("timeEnd")[0].value = getNowFormatDate();
					
					// 载入所有设立的班级ID和教师姓名，用于关联试听中班级ID和教师姓名对应上，最后用于统计某教师的试听率
					loadClassIDandTeacher();
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlTest.php";
	url = url + "?noValue=1";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// 载入所有设立的班级ID和教师姓名，用于关联试听中班级ID和教师姓名对应上，最后用于统计某教师的试听率
function loadClassIDandTeacher() {
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
					
				} else {
					var obj = eval(ret);

					i = 0;
					for (var tmp in obj) {
						classIDandTeacher[i][0] = obj[i].id;
						classIDandTeacher[i][1] = obj[i].teacher;
						i++;
					};
					
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlTest.php";
	url = url + "?loadClassIDandTeacher=1";
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// 插入班课查询结果表头
function appendRowHeader(TableID){
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

	// 设置列内容和属性
	newTd0.align='center';
	newTd1.align='center';
	newTd2.align='center';
	newTd3.align='center';
	newTd4.align='center';
	newTd5.align='center';
	newTd6.align='center';
	newTd7.align='center';
	newTd8.align='center';
	newTd9.align='center';
	newTd10.align='center';
	newTd11.align='center';
	newTd12.align='center';
	newTd13.align='center';
	newTd14.align='center';
	newTd15.align='center';
	newTd16.align='center';
	newTd17.align='center';
	newTd18.align='center';
	newTd19.align='center';
	newTd20.align='center';
	newTd21.align='center';
	newTd22.align='center';
	newTd23.align='center';
	newTd24.align='center';
	newTd25.align='center';
	newTd26.align='center';
	newTd27.align='center';
	newTd28.align='center';
	newTd29.align='center';
	newTd30.align='center';
	newTd31.align='center';
	newTd32.align='center';
	newTd33.align='center';
	newTd34.align='center';
	newTd35.align='center';
	newTd36.align='center';
	
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
	newTd22.innerHTML = "数学";
	newTd23.innerHTML = "数学状态";
	newTd24.innerHTML = "数学产品";
	newTd25.innerHTML = "语文";
	newTd26.innerHTML = "语文状态";
	newTd27.innerHTML = "语文产品";
	newTd28.innerHTML = "英语";
	newTd29.innerHTML = "英语状态";
	newTd30.innerHTML = "英语产品";
	newTd31.innerHTML = "物理";
	newTd32.innerHTML = "物理状态";
	newTd33.innerHTML = "物理产品";
	newTd34.innerHTML = "化学";
	newTd35.innerHTML = "化学状态";	
	newTd36.innerHTML = "化学产品";
}

// 插入班课表格相关函数
function appendRow(obj,index){
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

	// 设置列内容和属性
	newTd0.align='center';
	newTd1.align='center';
	newTd2.align='center';
	newTd3.align='center';
	newTd4.align='center';
	newTd5.align='center';
	newTd6.align='center';
	newTd7.align='center';
	newTd8.align='center';
	newTd9.align='center';
	newTd10.align='center';
	newTd11.align='center';
	newTd12.align='center';
	newTd13.align='center';
	newTd14.align='center';
	newTd15.align='center';
	newTd16.align='center';
	newTd17.align='center';
	newTd18.align='center';
	newTd19.align='center';
	newTd20.align='center';
	newTd21.align='center';	
	newTd22.align='center';	
	newTd23.align='center';	
	newTd24.align='center';	
	newTd25.align='center';	
	newTd26.align='center';	
	newTd27.align='center';	
	newTd28.align='center';	
	newTd29.align='center';	
	newTd30.align='center';	
	newTd31.align='center';	
	newTd32.align='center';	
	newTd33.align='center';	
	newTd34.align='center';	
	newTd35.align='center';	
	newTd36.align='center';	
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
	if(obj.name2 == ""){
		newTd3.innerHTML = "/";
	}else{
		newTd3.innerHTML = obj.name2;
	}
	
	if(obj.sex=="1"){
		newTd4.innerHTML = "男";
	}else if(obj.sex=="2"){
		newTd4.innerHTML = "女";
	}else{
		newTd4.innerHTML = "未填写";
	}
	strtmp = obj.schoolZone1;
	newTd5.innerHTML = strtmp.substr(0,strtmp.length-1);
	if(obj.schoolZone2==""){
		newTd6.innerHTML ="/";
	}else{
		strtmp = obj.schoolZone2;
		newTd6.innerHTML = strtmp.substr(0,strtmp.length-1);
	}
	if(obj.schoolZone3==""){
		newTd7.innerHTML ="/";
	}else{
		strtmp = obj.schoolZone3;
		newTd7.innerHTML = strtmp.substr(0,strtmp.length-1);
	}
	newTd8.innerHTML = obj.school1;
	if(obj.schoolZone3==""){
		newTd9.innerHTML ="/";
	}else{
		newTd9.innerHTML = obj.school2;
	}
	if(obj.grade == "7"){
		newTd10.innerHTML = "初一";
	}
	if(obj.grade == "8"){
		newTd10.innerHTML = "初二";
	}
	if(obj.grade == "9"){
		newTd10.innerHTML = "初三";
	}
	if(obj.grade == "10"){
		newTd10.innerHTML = "高一";
	}
	if(obj.grade == "11"){
		newTd10.innerHTML = "高二";
	}
	if(obj.grade == "12"){
		newTd10.innerHTML = "高三";
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
	newTd20.innerHTML = dateJS("Y-m-d",obj.inTime);
	newTd21.innerHTML = dateJS("Y-m-d",obj.outTime);
	if(obj.outTime==""){
		newTd21.innerHTML = "未退学";
	}

	if(obj.MathStateInGrade=="2"){
		newTd22.innerHTML = "数学";	
		newTd23.innerHTML = "试听中";
		testingNum++;	
	}else if(obj.MathStateInGrade=="3"){
		newTd22.innerHTML = "数学";
		newTd23.innerHTML = "试听成功";
		testSuccessNum++;
	}else if(obj.MathStateInGrade=="4"){
		newTd22.innerHTML = "数学";
		newTd23.innerHTML = "试听失败";
		testFailNum++;
	}
	newTd24.innerHTML = obj.MathProduct;
	if(obj.MathStateInGrade=="0"){
		newTd22.innerHTML = "/";
		newTd23.innerHTML = "/";
		newTd24.innerHTML = "/";
	}

	if(obj.ChineseStateInGrade=="2"){
		newTd25.innerHTML = "语文";	
		newTd26.innerHTML = "试听中";
		testingNum++;
	}else if(obj.ChineseStateInGrade=="3"){
		newTd25.innerHTML = "语文";
		newTd26.innerHTML = "试听成功";
		testSuccessNum++;
	}else if(obj.ChineseStateInGrade=="4"){
		newTd25.innerHTML = "语文";
		newTd26.innerHTML = "试听失败";
		testFailNum++;
	}
	newTd27.innerHTML = obj.ChineseProduct;
	
	if(obj.ChineseStateInGrade=="0"){
		newTd25.innerHTML = "/";
		newTd26.innerHTML = "/";
		newTd27.innerHTML = "/";
	}

	if(obj.EnglishStateInGrade=="2"){
		newTd28.innerHTML = "英语";	
		newTd29.innerHTML = "试听中";
		testingNum++;
	}else if(obj.EnglishStateInGrade=="3"){
		newTd28.innerHTML = "英语";
		newTd29.innerHTML = "试听成功";
		testSuccessNum++;
	}else if(obj.EnglishStateInGrade=="4"){
		newTd28.innerHTML = "英语";
		newTd29.innerHTML = "试听失败";
		testFailNum++;
	}
	newTd30.innerHTML = obj.EnglishProduct;
	if(obj.EnglishStateInGrade=="0"){
		newTd28.innerHTML = "/";
		newTd29.innerHTML = "/";
		newTd30.innerHTML = "/";
	}
	
	if(obj.PhysicsStateInGrade=="2"){
		newTd31.innerHTML = "物理";	
		newTd32.innerHTML = "试听中";
		testingNum++;	
	}else if(obj.PhysicsStateInGrade=="3"){
		newTd31.innerHTML = "物理";
		newTd32.innerHTML = "试听成功";
		testSuccessNum++;
	}else if(obj.PhysicsStateInGrade=="4"){
		newTd31.innerHTML = "物理";
		newTd32.innerHTML = "试听失败";
		testFailNum++;
	}
	newTd33.innerHTML = obj.PhysicsProduct;
	if(obj.PhysicsStateInGrade=="0"){
		newTd31.innerHTML = "/";
		newTd32.innerHTML = "/";
		newTd33.innerHTML = "/";
	}
	
	if(obj.ChemistryStateInGrade=="2"){
		newTd34.innerHTML = "化学";	
		newTd35.innerHTML = "试听中";
		testingNum++;	
	}else if(obj.ChemistryStateInGrade=="3"){
		newTd34.innerHTML = "化学";
		newTd35.innerHTML = "试听成功";
		testSuccessNum++;
	}else if(obj.ChemistryStateInGrade=="4"){
		newTd34.innerHTML = "化学";
		newTd35.innerHTML = "试听失败";
		testFailNum++;
	}
	newTd36.innerHTML = obj.ChemistryProduct;
	if(obj.ChemistryStateInGrade=="0"){
		newTd34.innerHTML = "/";
		newTd35.innerHTML = "/";
		newTd36.innerHTML = "/";
	}
	
	// 计算试听统计 
	testRate = testSuccessNum/(parseInt(testFailNum) + parseInt(testSuccessNum));
	document.getElementsByName("testingNum")[0].value = testingNum;
	document.getElementsByName("testFailNum")[0].value = testFailNum;
	document.getElementsByName("testSuccessNum")[0].value = testSuccessNum;
	document.getElementsByName("testRate")[0].value = testRate.toFixed(2);
	
	// 添加表格样式
	$("#sqlStudentTable tr").mouseover(function(){
		$(this).css("background-color","#e9eaec");
		$(this).css("line-height","49px");
	});
	$("#sqlStudentTable tr").mouseout(function(){
		$(this).css("background-color","");
		$(this).css("line-height","19px");
	});
	$("#sqlStudentTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlStudentTable tr:even").addClass("rowBgColorEven");

}

// 窗口表格删除一行
function removeRow(TableID) {
	var tabObj = document.getElementById(TableID);	
	tableRowCount = document.getElementById(TableID).rows.length;
		for(var j=0;j<tableRowCount;j++){
			// 从表格首行开始删除，所以使用0，如果要保留首行则使用1
				tabObj.deleteRow(0);
		}
	tableRowCount = 0;
}