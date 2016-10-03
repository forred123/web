/**
 * @author zyx
 */

var info;
var teacherInfo;
var i = 0;
var len = 0;
var maxCourseNum = 10;
var courseLoad = new Array();
var productLoad = new Array();
var greadeSetResultLoad = new Array();
var flagSubmitType = false;

function checkGradeSetResult(){
	return flagSubmitType;
}

// 检查班级名称设置是否有冲突
function checkGradeSet(obj){
	// 只是填写停班时间时不检测班级设置是否有冲突
	if(obj.name=="submitUpdate"){
		if(document.getElementsByName("endTime")[0].value!=""){
			flagSubmitType = true;
			return;
		}
	}
	
	// 增加班级时检查班级设置是否有冲突
	var i = 0;
	var gradeSetResultTmp = document.getElementsByName("greadeSetResult")[0].value;
	gradeSetResultTmp = gradeSetResultTmp.replace(/[ ]/g,"");
	for(i=0;i<greadeSetResultLoad.length;i++){
		if(gradeSetResultTmp == greadeSetResultLoad[i]){
			alert('设置的"班级属性"已经被使用，请重新输入一个新的"班级名称"');
			flagSubmitType = false;
			break;
		}
	}
	if(i==greadeSetResultLoad.length){
		flagSubmitType = true;
	}
}

function checkHiddenValueGrade(value) {
	switch(value){
	case 7:
		document.getElementsByName("gradeCopy")[0].value = "初一";
		break;
	case 8:
		document.getElementsByName("gradeCopy")[0].value = "初二";
		break;
	case 9:
		document.getElementsByName("gradeCopy")[0].value = "初三";
		break;
	case 10:
		document.getElementsByName("gradeCopy")[0].value = "高一";
		break;
	case 11:
		document.getElementsByName("gradeCopy")[0].value = "高二";
		break;
	case 12:
		document.getElementsByName("gradeCopy")[0].value = "高三";
		break;
	default:
		break;
	}
}

function checkHiddenValueCourse(value) {
	document.getElementsByName("courseCopy")[0].value = courseLoad[value-1];
}

function checkHiddenValueProduct(value) {
	document.getElementsByName("productCopy")[0].value = value;
}

function updateResult() {
	// 检查班级名称设置是否有冲突
	// var classNameTmp = document.getElementsByName("className")[0].value;
	// classNameTmp = classNameTmp.replace(/[ ]/g,"");
	// for(var i=0;i<greadeSetResultLoad.length;i++){
		// if(classNameTmp == greadeSetResultLoad[i]){
			// alert('输入的班级名称已经被使用，请重新输入一个新的"班级名称"');
			// return;
		// }
	// }
	document.getElementsByName("submitAdd")[0].disabled = "";
	// 真正更新输入的内容
	var result = "";
	result = document.getElementById("dateStart").value.substr(0, 4);
	result += "-" + document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;
	var temp = document.getElementsByName("grade");

	for (var i = 0; i < temp.length; i++) {
		if (temp[i].checked)
			var grade = temp[i].value;
	}

	if (grade == 7) {
		result += "-" + "初一";
	} else if (grade == 8) {
		result += "-" + "初二";
	} else if (grade == 9) {
		result += "-" + "初三";
	} else if (grade == 10) {
		result += "-" + "高一";
	} else if (grade == 11) {
		result += "-" + "高二";
	} else if (grade == 12) {
		result += "-" + "高三";
	} else {
		result += "-" + "?";
	}

	temp = document.getElementsByName("course");

	for (var i = 0; i < temp.length; i++) {
		if (temp[i].checked)
			var course = temp[i].value;
	}
	if (course == 1) {
		result += "-" + courseLoad[0];
	} else if (course == 2) {
		result += "-" + courseLoad[1];
	} else if (course == 3) {
		result += "-" + courseLoad[2];
	} else if (course == 4) {
		result += "-" + courseLoad[3];
	} else if (course == 5) {
		result += "-" + courseLoad[4];
	} else if (course == 6) {
		result += "-" + courseLoad[5];
	} else if (course == 7) {
		result += "-" + courseLoad[6];
	} else if (course == 8) {
		result += "-" + courseLoad[7];
	} else if (course == 9) {
		result += "-" + courseLoad[8];
	} else if (course == 10) {
		result += "-" + courseLoad[9];
	} else {
		result += "-" + "?";
	}
	temp = document.getElementsByName("product");
	for (var i = 0; i < temp.length; i++) {
		if (temp[i].checked)
			var product = temp[i].value;
	}
	if (product == 1) {
		result += "-" + productLoad[0];
	} else if (product == 2) {
		result += "-" + productLoad[1];
	} else if (product == 3) {
		result += "-" + productLoad[2];
	} else if (product == 4) {
		result += "-" + productLoad[3];
	} else if (product == 5) {
		result += "-" + productLoad[4];
	} else {
		result += "-" + "?";
	}

	result += "-" + document.getElementsByName("teacher")[0].options[document.getElementsByName("teacher")[0].value].text;

	result += "-" + document.getElementsByName("className")[0].value;

	document.getElementsByName("greadeSetResult")[0].value = result;
}

function loadPrincipalSetAndTeacher(flag) {
	if(document.getElementsByName("schoolZone")[0].value > 0){
		var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;
		loadPrincipalSet(schoolZone);
		// ajax 获得教师信息，人工用鼠标选时载入教师设置，人工查询时不再加载教师信息，否则看似行得通，但实际有问题（教师姓名不更新显示）
		if(flag==1){
			loadTeacher(schoolZone);
		}
	
		// 更新的隐藏域中的内容为校区名和value值
		document.getElementsByName("schoolZoneCopy")[0].value = schoolZone;
		// + document.getElementsByName("schoolZone")[0].value;
		document.getElementsByName("teacherCopy")[0].value = "";
		document.getElementsByName("gradeCopy")[0].value = "";
		document.getElementsByName("courseCopy")[0].value = "";
		document.getElementsByName("productCopy")[0].value = "";
		// 获得班级ID，用于修改数据库，添加停班时间 
		document.getElementsByName("gradeIDCopy")[0].value = document.getElementsByName("schoolZone")[0].value;
		
	}else{
		location.reload();
	}
}

function loadPrincipalSet(schoolZone) {
	loadProduct(schoolZone);
	loadGrade(schoolZone);
	loadCourse(schoolZone);
}

function loadCourse(schoolZone) {
	// 根据所选校区自动加载相应的科目

	for ( i = 0; i < len; i++) {
		if (schoolZone == info[i].schoolZone) {
			break;
		}
	}

	if (info[i].course1 != "") {
		document.getElementsByName("courseLabel")[0].innerHTML = '<input type="radio" name="course" id="course1" value="1">' + courseLoad[0];
	} else {
		document.getElementsByName("courseLabel")[0].innerHTML = "";
	}
	if (info[i].course2 != "") {
		document.getElementsByName("courseLabel")[1].innerHTML = '<input type="radio" name="course" id="course2" value="2">' + courseLoad[1];
	} else {
		document.getElementsByName("courseLabel")[1].innerHTML = "";
	}
	if (info[i].course3 != "") {
		document.getElementsByName("courseLabel")[2].innerHTML = '<input type="radio" name="course" id="course3"  value="3">' + courseLoad[2];
	} else {
		document.getElementsByName("courseLabel")[2].innerHTML = "";
	}
	if (info[i].course4 != "") {
		document.getElementsByName("courseLabel")[3].innerHTML = '<input type="radio" name="course" id="course4"  value="4">' + courseLoad[3];
	} else {
		document.getElementsByName("courseLabel")[3].innerHTML = "";
	}
	if (info[i].course5 != "") {
		document.getElementsByName("courseLabel")[4].innerHTML = '<input type="radio" name="course" id="course5"  value="5">' + courseLoad[4];
	} else {
		document.getElementsByName("courseLabel")[4].innerHTML = "";
	}
	if (info[i].course6 != "") {
		document.getElementsByName("courseLabel")[5].innerHTML = '<input type="radio" name="course" id="course6"  value="5">' + courseLoad[5];
	} else {
		document.getElementsByName("courseLabel")[5].innerHTML = "";
	}
	if (info[i].course7 != "") {
		document.getElementsByName("courseLabel")[6].innerHTML = '<input type="radio" name="course" id="course7"  value="5">' + courseLoad[6];
	} else {
		document.getElementsByName("courseLabel")[6].innerHTML = "";
	}
	if (info[i].course8 != "") {
		document.getElementsByName("courseLabel")[7].innerHTML = '<input type="radio" name="course" id="course8"  value="5">' + courseLoad[7];
	} else {
		document.getElementsByName("courseLabel")[7].innerHTML = "";
	}
	if (info[i].course9 != "") {
		document.getElementsByName("courseLabel")[8].innerHTML = '<input type="radio" name="course" id="course9"  value="5">' + courseLoad[8];
	} else {
		document.getElementsByName("courseLabel")[8].innerHTML = "";
	}
	if (info[i].course10 != "") {
		document.getElementsByName("courseLabel")[9].innerHTML = '<input type="radio" name="course" id="course10"  value="5">' + courseLoad[9];
	} else {
		document.getElementsByName("courseLabel")[9].innerHTML = "";
	}
}

function loadGrade(schoolZone) {
	// 根据所选校区自动加载相应的产品
	for ( i = 0; i < len; i++) {
		if (schoolZone == info[i].schoolZone) {
			break;
		}
	}

	if (info[i].grade7 != "") {
		document.getElementsByName("gradeLabel")[0].innerHTML = '<input type="radio" name="grade" id="grade7" value="7" />' + '初一';
	} else {
		document.getElementsByName("gradeLabel")[0].innerHTML = "";
	}
	if (info[i].grade8 != "") {
		document.getElementsByName("gradeLabel")[1].innerHTML = '<input type="radio" name="grade" id="grade8" value="8" />' + '初二';
	} else {
		document.getElementsByName("gradeLabel")[1].innerHTML = "";
	}
	if (info[i].grade9 != "") {
		document.getElementsByName("gradeLabel")[2].innerHTML = '<input type="radio" name="grade" id="grade9" value="9" />' + '初三';

	} else {
		document.getElementsByName("gradeLabel")[2].innerHTML = "";
	}
	if (info[i].grade10 != "") {
		document.getElementsByName("gradeLabel")[3].innerHTML = '<input type="radio" name="grade" id="grade10" value="10" />' + '高一';
	} else {
		document.getElementsByName("gradeLabel")[3].innerHTML = "";
	}
	if (info[i].grade11 != "") {
		document.getElementsByName("gradeLabel")[4].innerHTML = '<input type="radio" name="grade" id="grade11" value="11" />' + '高二';
	} else {
		document.getElementsByName("gradeLabel")[4].innerHTML = "";
	}
	if (info[i].grade12 != "") {
		document.getElementsByName("gradeLabel")[5].innerHTML = '<input type="radio" name="grade" id="grade12" value="12" />' + '高三';
	} else {
		document.getElementsByName("gradeLabel")[5].innerHTML = "";
	}
}

function loadProduct(schoolZone) {
	// 根据所选校区自动加载相应的产品
	for ( i = 0; i < len; i++) {
		if (schoolZone == info[i].schoolZone) {
			break;
		}
	}

	if (info[i].product1 != "") {
		document.getElementsByName("productLabel")[0].innerHTML = '<input type="radio" name="product" id="product1" value="1">' + info[0].product1;
		productLoad[0] = info[i].product1;
	} else {
		document.getElementsByName("productLabel")[0].innerHTML = "";
	}
	if (info[i].product2 != "") {
		document.getElementsByName("productLabel")[1].innerHTML = '<input type="radio" name="product" id="product2" value="2">' + info[0].product2;
		productLoad[1] = info[i].product2;
	} else {
		document.getElementsByName("productLabel")[1].innerHTML = "";
	}
	if (info[i].product3 != "") {
		document.getElementsByName("productLabel")[2].innerHTML = '<input type="radio" name="product" id="product3" value="3">' + info[0].product3;
		productLoad[2] = info[i].product3;
	} else {
		document.getElementsByName("productLabel")[2].innerHTML = "";
	}
	if (info[i].product4 != "") {
		document.getElementsByName("productLabel")[3].innerHTML = '<input type="radio" name="product" id="product4" value="4">' + info[0].product4;
		productLoad[3] = info[i].product4;
	} else {
		document.getElementsByName("productLabel")[3].innerHTML = "";
	}
	if (info[i].product5 != "") {
		document.getElementsByName("productLabel")[4].innerHTML = '<input type="radio" name="product" id="product5" value="5">' + info[0].product5;
		productLoad[4] = info[i].product5;
	} else {
		document.getElementsByName("productLabel")[4].innerHTML = "";
	}
}

function sqlRecord() {
	var xmlhttp;
	var obj = document.getElementsByName("schoolZone")[0];
	if (obj.value == 0) {
		alert("请选择校区后再查询！");
		return;
	}
	// 1创建AJAX对象
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 2指定回调函数
	xmlhttp.onreadystatechange = function() {
		// 4接收响应数据，处理服务器返回的信息
		//判断对象状态是否交互完成，如果为4则交互完成
		if (xmlhttp.readyState == 4) {
			//判断对象状态是否交互成功,如果成功则为200
			if (xmlhttp.status == 200) {
				//接收数据,得到服务器输出的XML数据

				var ret = xmlhttp.responseText;

				if (ret == "0") {
					//document.getElementsByName("submitAdd")[0].disabled = false;
					document.getElementsByName("previous")[0].disabled = true;
					document.getElementsByName("next")[0].disabled = true;
					alert("查询信息不存在！");
				} else {					
					//document.getElementsByName("submitAdd")[0].disabled = false;

					var info = eval(ret);
					
					resultsWithSomeRecord = info;
					resultsIndex = 0;
					resultsLen = 0;
					for(var tmp in resultsWithSomeRecord){
						resultsLen++;
					}					
					
					if(resultsLen==1){
						document.getElementsByName("previous")[0].disabled = true;
						document.getElementsByName("next")[0].disabled = true;
					}else if(resultsLen>1){
						alert("检查到该校区有多个班级记录，请使用“上一个”“下一个”选择！");
						document.getElementsByName("previous")[0].disabled = false;
						document.getElementsByName("next")[0].disabled = false;
					}
					
					var time;
					if (info[0].startTime != "") {
						time = dateJS("Y-M-d", info[0].startTime);
						document.getElementsByName("startTime")[0].value = time;
					}

					if (info[0].endTime != "") {
						time = dateJS("Y-M-d", info[0].endTime);
						document.getElementsByName("endTime")[0].value = time;
					}

					var objtmp = document.getElementsByName("teacher")[0];
					//alert(info[0].teacher);
					for ( i = 0; i < objtmp.options.length; i++) {
						if (objtmp.options[i].text == info[0].teacher) {
							objtmp.options[i].selected = true;
							break;
						}
					}

					loadTeacherProperty();

					// 查询后，把相关隐藏或也相应更新，为先查询后修改部分内容再增加做准备，
					// 否则就等于是没有点击相关checkBox，就会导致相关隐藏域内容为空的bug
					var value = -1;
					var str = "";

					str = info[0].grade;
					if(str =="初一"){
						value = 7;
					}
					if(str =="初二"){
						value = 8;
					}
					if(str =="初三"){
						value = 9;
					}
					if(str =="高一"){
						value = 10;
					}
					if(str =="高二"){
						value = 11;
					}
					if(str =="高三"){
						value = 12;
					}
					document.getElementById("grade" + value).checked = true;
					checkHiddenValueGrade(value);
					value = info[0].course;
					
					str = info[0].course;
					if(str == courseLoad[0]){
						value = 1;
					}
					if(str == courseLoad[1]){
						value = 2;
					}
					if(str == courseLoad[2]){
						value = 3;
					}
					if(str == courseLoad[3]){
						value = 4;
					}
					if(str == courseLoad[4]){
						value = 5;
					}
					if(str == courseLoad[5]){
						value = 6;
					}
					if(str == courseLoad[6]){
						value = 7;
					}
					if(str == courseLoad[7]){
						value = 8;
					}
					if(str == courseLoad[8]){
						value = 9;
					}
					if(str == courseLoad[9]){
						value = 10;
					}
					document.getElementById("course" + value).checked = true;
					checkHiddenValueCourse(value);
					value = info[0].product;
					var j =0;
					for ( j = 1; j <= maxCourseNum; j++) {						
						if (productLoad[j - 1] == value) {
							document.getElementById("product" + j.toString()).checked = true;
							break;
						}
					}
					
					checkHiddenValueProduct(value);

					document.getElementsByName("className")[0].value = info[0].class;

					updateResult();
					// 查询时增加按钮为灰色
					document.getElementsByName("submitAdd")[0].disabled = "true";
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}
	};
	// 3发出http请求
	// 去除姓名中的所有空格
	var str = obj.options[obj.value].text;
	str = str.replace(/\s+/g, "");
	var url = "gradeSet.php";
	url = url + "?schoolZoneSQLRecord=" + encodeURIComponent(str);
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);

}

function recordWithSameName(flag) {
	
	if (flag == 'next') {
		if(resultsIndex< resultsLen -1){
			resultsIndex++;
		}else{
			alert("已经是该校区设置的最后一个班级！");
		}
	} else if (flag == 'previous') {
		if(resultsIndex > 0){
			resultsIndex--;
		}else{			
			alert("已经是该校区设置的第一个班级！");
		}
	}

	//alert("b");
	loadPrincipalSetAndTeacher(0);
	//alert("a");
	/*
	var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;
	loadPrincipalSet(schoolZone);
	// ajax 获得教师信息
	loadTeacher(schoolZone);

	// 更新的隐藏域中的内容为校区名和value值
	document.getElementsByName("schoolZoneCopy")[0].value = schoolZone;
	// + document.getElementsByName("schoolZone")[0].value;
	document.getElementsByName("teacherCopy")[0].value = "";
	document.getElementsByName("gradeCopy")[0].value = "";
	document.getElementsByName("courseCopy")[0].value = "";
	document.getElementsByName("productCopy")[0].value = "";	
	*/
	
	var time;
	if (resultsWithSomeRecord[resultsIndex].startTime != "") {
		time = dateJS("Y-M-d", resultsWithSomeRecord[resultsIndex].startTime);
		document.getElementsByName("startTime")[0].value = time;
	}else{
		document.getElementsByName("startTime")[0].value = "";
	}

	if (resultsWithSomeRecord[resultsIndex].endTime != "") {
		time = dateJS("Y-M-d", resultsWithSomeRecord[resultsIndex].endTime);
		document.getElementsByName("endTime")[0].value = time;
	}else{
		document.getElementsByName("endTime")[0].value = "";
	}
	
	var objtmp = document.getElementsByName("teacher")[0];

	for ( i = 0; i < objtmp.options.length; i++) {
		//alert(i);
		if (objtmp.options[i].text == resultsWithSomeRecord[resultsIndex].teacher) {
			objtmp.options[i].selected = true;
			break;
		}
	}
	
	// 加载教师个人设置 
	loadTeacherProperty();
	

	// 查询后，把相关隐藏或也相应更新，为先查询后修改部分内容再增加做准备，
	// 否则就等于是没有点击相关checkBox，就会导致相关隐藏域内容为空的bug
	var value = -1;
	var str = "";

	str = resultsWithSomeRecord[resultsIndex].grade;
	if(str =="初一"){
		value = 7;
	}
	if(str =="初二"){
		value = 8;
	}
	if(str =="初三"){
		value = 9;
	}
	if(str =="高一"){
		value = 10;
	}
	if(str =="高二"){
		value = 11;
	}
	if(str =="高三"){
		value = 12;
	}

	document.getElementById("grade" + value.toString()).checked = true;
	checkHiddenValueGrade(value);
	value = resultsWithSomeRecord[resultsIndex].course;
	
	str = resultsWithSomeRecord[resultsIndex].course;
	if(str == courseLoad[0]){
		value = 1;
	}
	if(str == courseLoad[1]){
		value = 2;
	}
	if(str == courseLoad[2]){
		value = 3;
	}
	if(str == courseLoad[3]){
		value = 4;
	}
	if(str == courseLoad[4]){
		value = 5;
	}
	if(str == courseLoad[5]){
		value = 6;
	}
	if(str == courseLoad[6]){
		value = 7;
	}
	if(str == courseLoad[7]){
		value = 8;
	}
	if(str == courseLoad[8]){
		value = 9;
	}
	if(str == courseLoad[9]){
		value = 10;
	}

	document.getElementById("course" + value).checked = true;
	checkHiddenValueCourse(value);
	value = resultsWithSomeRecord[resultsIndex].product;
	var j =0;
	for ( j = 1; j < 6; j++) {						
		if (productLoad[j - 1] == value) {
			document.getElementById("product" + j.toString()).checked = true;
			break;
		}
	}
	
	checkHiddenValueProduct(value);

	document.getElementsByName("className")[0].value = resultsWithSomeRecord[resultsIndex].class;
	
	updateResult();
	// 查询时增加按钮为灰色
	document.getElementsByName("submitAdd")[0].disabled = "true";
}

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
						obj1.options.add(new Option(teacherInfo[i].name, i + 1));
						i++;
					};		
		
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "gradeSet.php";
	url = url + "?schoolZoneSQL=" + encodeURIComponent(Name);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadTeacherProperty() {
	// 这两句是重新加载校长设置，目的是选择教师可能会多次改变选择，这样就必须加载校长设置，否则找不到两者的交集
	var schoolZone = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].value].text;
	loadPrincipalSet(schoolZone);

	// 此函数以下所有代码是加载所有在校长设置和教师属性的交集显示到网页上，没交集的显示空
	if(document.getElementsByName("teacher")[0].selectedIndex > 0){
		var teacher = document.getElementsByName("teacher")[0].options[document.getElementsByName("teacher")[0].value].text;
	
		for ( i = 0; i < document.getElementsByName("teacher")[0].options.length; i++) {
			if (teacher == teacherInfo[i].name) {
				break;
			}
	
		}

		// 教师产品属性
		if ((teacherInfo[i].product1 != "") && (document.getElementById("product1"))) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="radio" name="product" id="product1" value="1" onclick="checkHiddenValueProduct(teacherInfo[i].product1)">' + teacherInfo[i].product1;
			productLoad[0] = teacherInfo[i].product1;
		} else {
			document.getElementsByName("productLabel")[0].innerHTML = "";
		}
		if ((teacherInfo[i].product2 != "") && (document.getElementById("product2"))) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="radio" name="product" id="product2" value="2" onclick="checkHiddenValueProduct(teacherInfo[i].product2)">' + teacherInfo[i].product2;
			productLoad[1] = teacherInfo[i].product2;
		} else {
			document.getElementsByName("productLabel")[1].innerHTML = "";
		}
		if ((teacherInfo[i].product3 != "") && (document.getElementById("product3"))) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="radio" name="product" id="product3" value="3" onclick="checkHiddenValueProduct(teacherInfo[i].product3)">' + teacherInfo[i].product3;
			productLoad[2] = teacherInfo[i].product3;
		} else {
			document.getElementsByName("productLabel")[2].innerHTML = "";
		}
		if ((teacherInfo[i].product4 != "") && (document.getElementById("product4"))) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="radio" name="product" id="product4" value="4" onclick="checkHiddenValueProduct(teacherInfo[i].product4)">' + teacherInfo[i].product4;
			productLoad[3] = teacherInfo[i].product4;
		} else {
			document.getElementsByName("productLabel")[3].innerHTML = "";
		}
		if ((teacherInfo[i].product5 != "") && (document.getElementById("product5"))) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="radio" name="product" id="product5" value="5" onclick="checkHiddenValueProduct(teacherInfo[i].product5)">' + teacherInfo[i].product5;
			productLoad[4] = teacherInfo[i].product5;
		} else {
			document.getElementsByName("productLabel")[4].innerHTML = "";
		}
	
		// 教师年级属性
		if ((teacherInfo[i].grade7 != "") && (document.getElementById("grade7"))) {
			document.getElementsByName("gradeLabel")[0].innerHTML = '<input type="radio" name="grade" id="grade7" value="7" onclick="checkHiddenValueGrade(7)">' + '初一';
		} else {
			document.getElementsByName("gradeLabel")[0].innerHTML = "";
		}
		if ((teacherInfo[i].grade8 != "") && (document.getElementById("grade8"))) {
			document.getElementsByName("gradeLabel")[1].innerHTML = '<input type="radio" name="grade" id="grade8" value="8" onclick="checkHiddenValueGrade(8)">' + '初二';
		} else {
			document.getElementsByName("gradeLabel")[1].innerHTML = "";
		}
		if ((teacherInfo[i].grade9 != "") && (document.getElementById("grade9"))) {
			document.getElementsByName("gradeLabel")[2].innerHTML = '<input type="radio" name="grade" id="grade9" value="9" onclick="checkHiddenValueGrade(9)">' + '初三';
		} else {
			document.getElementsByName("gradeLabel")[2].innerHTML = "";
		}
		if ((teacherInfo[i].grade10 != "") && (document.getElementById("grade10"))) {
			document.getElementsByName("gradeLabel")[3].innerHTML = '<input type="radio" name="grade" id="grade10" value="10" onclick="checkHiddenValueGrade(10)">' + '高一';
		} else {
			document.getElementsByName("gradeLabel")[3].innerHTML = "";
		}
		if ((teacherInfo[i].grade11 != "") && (document.getElementById("grade11"))) {
			document.getElementsByName("gradeLabel")[4].innerHTML = '<input type="radio" name="grade" id="grade11" value="11" onclick="checkHiddenValueGrade(11)">' + '高二';
		} else {
			document.getElementsByName("gradeLabel")[4].innerHTML = "";
		}
		if ((teacherInfo[i].grade12 != "") && (document.getElementById("grade12"))) {
			document.getElementsByName("gradeLabel")[5].innerHTML = '<input type="radio" name="grade" id="grade12" value="12" onclick="checkHiddenValueGrade(12)">' + '高三';
		} else {
			document.getElementsByName("gradeLabel")[5].innerHTML = "";
		}
	
		// 教师科目属性
		if ((teacherInfo[i].course1 != "") && (document.getElementById("course1"))) {
			document.getElementsByName("courseLabel")[0].innerHTML = '<input type="radio" name="course" id="course1" value="1" onclick="checkHiddenValueCourse(1)">' + courseLoad[0];
		} else {
			document.getElementsByName("courseLabel")[0].innerHTML = "";
		}
		if ((teacherInfo[i].course2 != "") && (document.getElementById("course2"))) {
			document.getElementsByName("courseLabel")[1].innerHTML = '<input type="radio" name="course" id="course2" value="2" onclick="checkHiddenValueCourse(2)">' + courseLoad[1];
		} else {
			document.getElementsByName("courseLabel")[1].innerHTML = "";
		}
		if ((teacherInfo[i].course3 != "") && (document.getElementById("course3"))) {
			document.getElementsByName("courseLabel")[2].innerHTML = '<input type="radio" name="course" id="course3"  value="3" onclick="checkHiddenValueCourse(3)">' + courseLoad[2];
		} else {
			document.getElementsByName("courseLabel")[2].innerHTML = "";
		}
		if ((teacherInfo[i].course4 != "") && (document.getElementById("course4"))) {
			document.getElementsByName("courseLabel")[3].innerHTML = '<input type="radio" name="course" id="course4"  value="4" onclick="checkHiddenValueCourse(4)">' + courseLoad[3];
		} else {
			document.getElementsByName("courseLabel")[3].innerHTML = "";
		}
		if ((teacherInfo[i].course5 != "") && (document.getElementById("course5"))) {
			document.getElementsByName("courseLabel")[4].innerHTML = '<input type="radio" name="course" id="course5"  value="5" onclick="checkHiddenValueCourse(5)">' + courseLoad[4];
		} else {
			document.getElementsByName("courseLabel")[4].innerHTML = "";
		}
		if ((teacherInfo[i].course6 != "") && (document.getElementById("course6"))) {
			document.getElementsByName("courseLabel")[5].innerHTML = '<input type="radio" name="course" id="course6"  value="6" onclick="checkHiddenValueCourse(6)">' + courseLoad[5];
		} else {
			document.getElementsByName("courseLabel")[5].innerHTML = "";
		}
		if ((teacherInfo[i].course7 != "") && (document.getElementById("course7"))) {
			document.getElementsByName("courseLabel")[6].innerHTML = '<input type="radio" name="course" id="course7"  value="7" onclick="checkHiddenValueCourse(7)">' + courseLoad[6];
		} else {
			document.getElementsByName("courseLabel")[6].innerHTML = "";
		}
		if ((teacherInfo[i].course8 != "") && (document.getElementById("course8"))) {
			document.getElementsByName("courseLabel")[7].innerHTML = '<input type="radio" name="course" id="course8"  value="8" onclick="checkHiddenValueCourse(8)">' + courseLoad[7];
		} else {
			document.getElementsByName("courseLabel")[7].innerHTML = "";
		}
		if ((teacherInfo[i].course9 != "") && (document.getElementById("course9"))) {
			document.getElementsByName("courseLabel")[8].innerHTML = '<input type="radio" name="course" id="course9"  value="9" onclick="checkHiddenValueCourse(9)">' + courseLoad[8];
		} else {
			document.getElementsByName("courseLabel")[8].innerHTML = "";
		}
		if ((teacherInfo[i].course10 != "") && (document.getElementById("course10"))) {
			document.getElementsByName("courseLabel")[9].innerHTML = '<input type="radio" name="course" id="course10"  value="10" onclick="checkHiddenValueCourse(10)">' + courseLoad[9];
		} else {
			document.getElementsByName("courseLabel")[9].innerHTML = "";
		}
	
		// 更新的隐藏域中的内容为教师姓名和value值
		document.getElementsByName("teacherCopy")[0].value = teacher;
		// + document.getElementsByName("teacher")[0].value;
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
						obj1.options.add(new Option(info[i].schoolZone, info[i].id));
						i++;
					};
					len = i;

					// 默认填写当前日期
					document.getElementById("dateStart").value = getNowFormatDate();
					
					// 载入所有设立的班级名称，为提示用户不能输入已经存在的班级名称使用
					loadClassName();
					
					// 载入校长设置中科目名称
					sqlCourse();
					
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
							for(var j=0;j<5;j++){
								if(schoolZone[j] == info[i].schoolZone){
									document.getElementsByName("schoolZone")[0].options.add(new Option(info[i].schoolZone, info[i].id));
								}	
							}
							i++;
						};											
						
						// 默认第一个,可能有多个
						document.getElementsByName("schoolZone")[0].value = 1;
																		
						loadPrincipalSetAndTeacher(1);					
					}
					
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

// 载入所有设立的班级名称，为提示用户不能输入已经存在的班级名称使用
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
					
				} else {
					var greadeSetResultObj = eval(ret);

					i = 0;
					for (var tmp in greadeSetResultObj) {
						greadeSetResultLoad[i] = greadeSetResultObj[i].greadeSetResult;
						i++;
					};
					
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "gradeSet.php";
	url = url + "?loadClassName=1";
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
					for(var i=0;i<maxCourseNum;i++){
						courseNameIndex[i] = 0;
					}
						for(var i=0;i<len;i++){
							if(info[i].course1 != ""){
								courseNameIndex[0] = i;
							}
							if(info[i].course2 != ""){
								courseNameIndex[1] = i;
							}	
							if(info[i].course3 != ""){
								courseNameIndex[2] = i;
							}	
							if(info[i].course4 != ""){
								courseNameIndex[3] = i;
							}	
							if(info[i].course5 != ""){
								courseNameIndex[4] = i;
							}
							if(info[i].course6 != ""){
								courseNameIndex[5] = i;
							}
							if(info[i].course7 != ""){
								courseNameIndex[6] = i;
							}	
							if(info[i].course8 != ""){
								courseNameIndex[7] = i;
							}	
							if(info[i].course9 != ""){
								courseNameIndex[8] = i;
							}	
							if(info[i].course10 != ""){
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
