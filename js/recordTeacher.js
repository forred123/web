var info;
var i = 0;
var len = 0;
var maxCourseNum = 10;
var schoolZoneLoad = new Array();
var productLoad = new Array();
var courseLoad = new Array();

function getCookie(name){
	if(document.cookie.length>0){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr !=null){
			return unescape(arr[2]);
		}else{
			return null;
		}
	}
}

function submitImg() {
	document.getElementById("myform").submit();
}

function checkHiddenValueSchoolZone() {
	if (document.getElementById("schoolZone1")) {
		if (document.getElementById("schoolZone1").checked == true) {
			document.getElementsByName("schoolZone1copy")[0].value = schoolZoneLoad[0];
		} else {
			document.getElementsByName("schoolZone1copy")[0].value = "";
		}
	}
	if (document.getElementById("schoolZone2")) {
		if (document.getElementById("schoolZone2").checked == true) {
			document.getElementsByName("schoolZone2copy")[0].value = schoolZoneLoad[1];
		} else {
			document.getElementsByName("schoolZone2copy")[0].value = "";
		}
	}

	if (document.getElementById("schoolZone3")) {
		if (document.getElementById("schoolZone3").checked == true) {
			document.getElementsByName("schoolZone3copy")[0].value = schoolZoneLoad[2];
		} else {
			document.getElementsByName("schoolZone3copy")[0].value = "";
		}
	}

	if (document.getElementById("schoolZone4")) {
		if (document.getElementById("schoolZone4").checked == true) {
			document.getElementsByName("schoolZone4copy")[0].value = schoolZoneLoad[3];
		} else {
			document.getElementsByName("schoolZone4copy")[0].value = "";
		}
	}

	if (document.getElementById("schoolZone5")) {
		if (document.getElementById("schoolZone5").checked == true) {
			document.getElementsByName("schoolZone5copy")[0].value = schoolZoneLoad[4];
		} else {
			document.getElementsByName("schoolZone5copy")[0].value = "";
		}
	}
}

function checkHiddenValueGrade() {
	if (document.getElementById("grade7")) {
		if (document.getElementById("grade7").checked == true) {
			document.getElementsByName("grade7copy")[0].value = "初一";
		} else {
			document.getElementsByName("grade7copy")[0].value = "";
		}
	}
	
	if (document.getElementById("grade8")) {
		if (document.getElementById("grade8").checked == true) {
			document.getElementsByName("grade8copy")[0].value = "初二";
		} else {
			document.getElementsByName("grade8copy")[0].value = "";
		}
	}
	if (document.getElementById("grade9")) {
		if (document.getElementById("grade9").checked == true) {
			document.getElementsByName("grade9copy")[0].value = "初三";
		} else {
			document.getElementsByName("grade9copy")[0].value = "";
		}
	}
	if (document.getElementById("grade10")) {
		if (document.getElementById("grade10").checked == true) {
			document.getElementsByName("grade10copy")[0].value = "高一";
		} else {
			document.getElementsByName("grade10copy")[0].value = "";
		}
	}
	if (document.getElementById("grade11")) {
		if (document.getElementById("grade11").checked == true) {
			document.getElementsByName("grade11copy")[0].value = "高二";
		} else {
			document.getElementsByName("grade11copy")[0].value = "";
		}
	}
	if (document.getElementById("grade12")) {
		if (document.getElementById("grade12").checked == true) {
			document.getElementsByName("grade12copy")[0].value = "高三";
		} else {
			document.getElementsByName("grade12copy")[0].value = "";
		}
	}
}

function checkHiddenValueCourse() {
	if (document.getElementById("course1")) {
		if (document.getElementById("course1").checked == true) {
			document.getElementsByName("course1copy")[0].value = courseLoad[0];
		} else {
			document.getElementsByName("course1copy")[0].value = "";
		}
	}
	if (document.getElementById("course2")) {
		if (document.getElementById("course2").checked == true) {
			document.getElementsByName("course2copy")[0].value = courseLoad[1];
		} else {
			document.getElementsByName("course2copy")[0].value = "";
		}
	}
	if (document.getElementById("course3")) {
		if (document.getElementById("course3").checked == true) {
			document.getElementsByName("course3copy")[0].value = courseLoad[2];
		} else {
			document.getElementsByName("course3copy")[0].value = "";
		}
	}
	if (document.getElementById("course4")) {
		if (document.getElementById("course4").checked == true) {
			document.getElementsByName("course4copy")[0].value = courseLoad[3];
		} else {
			document.getElementsByName("course4copy")[0].value = "";
		}
	}
	if (document.getElementById("course5")) {
		if (document.getElementById("course5").checked == true) {
			document.getElementsByName("course5copy")[0].value = courseLoad[4];
		} else {
			document.getElementsByName("course5copy")[0].value = "";
		}
	}
	if (document.getElementById("course6")) {
		if (document.getElementById("course6").checked == true) {
			document.getElementsByName("course6copy")[0].value = courseLoad[5];
		} else {
			document.getElementsByName("course6copy")[0].value = "";
		}
	}
	if (document.getElementById("course7")) {
		if (document.getElementById("course7").checked == true) {
			document.getElementsByName("course7copy")[0].value = courseLoad[6];
		} else {
			document.getElementsByName("course7copy")[0].value = "";
		}
	}
	if (document.getElementById("course8")) {
		if (document.getElementById("course8").checked == true) {
			document.getElementsByName("course8copy")[0].value = courseLoad[7];
		} else {
			document.getElementsByName("course8copy")[0].value = "";
		}
	}
	if (document.getElementById("course9")) {
		if (document.getElementById("course9").checked == true) {
			document.getElementsByName("course9copy")[0].value = courseLoad[8];
		} else {
			document.getElementsByName("course9copy")[0].value = "";
		}
	}
	if (document.getElementById("course10")) {
		if (document.getElementById("course10").checked == true) {
			document.getElementsByName("course10copy")[0].value = courseLoad[9];
		} else {
			document.getElementsByName("course10copy")[0].value = "";
		}
	}
}

function checkHiddenValueProduct() {
	if (document.getElementById("product1")) {
		if (document.getElementById("product1").checked == true) {
			document.getElementsByName("product1copy")[0].value = productLoad[0];
		} else {
			document.getElementsByName("product1copy")[0].value = "";
		}
	}
	
	if (document.getElementById("product2")) {
		if (document.getElementById("product2").checked == true) {
			document.getElementsByName("product2copy")[0].value = productLoad[1];
		} else {
			document.getElementsByName("product2copy")[0].value = "";
		}
	}
	if (document.getElementById("product3")) {
		if (document.getElementById("product3").checked == true) {
			document.getElementsByName("product3copy")[0].value = productLoad[2];
		} else {
			document.getElementsByName("product3copy")[0].value = "";
		}
	}
	if (document.getElementById("product4")) {
		if (document.getElementById("product4").checked == true) {
			document.getElementsByName("product4copy")[0].value = productLoad[3];
		} else {
			document.getElementsByName("product4copy")[0].value = "";
		}
	}
	if (document.getElementById("product5")) {
		if (document.getElementById("product5").checked == true) {
			document.getElementsByName("product5copy")[0].value = productLoad[4];
		} else {
			document.getElementsByName("product5copy")[0].value = "";
		}
	}
}

function sqlRecord() {
	var imgUrl = "";
	var xmlhttp;
	if (document.getElementsByName("userName")[0].value == "") {
		alert("校区名为空，不能查询！");
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
		// 判断对象状态是否交互完成，如果为4则交互完成
		if (xmlhttp.readyState == 4) {
			// 判断对象状态是否交互成功,如果成功则为200
			if (xmlhttp.status == 200) {
				// 接收数据,得到服务器输出的XML数据

				var ret = xmlhttp.responseText;

				if (ret == "0") {
					document.getElementsByName("submitAdd")[0].disabled = false;
					// document.getElementsByName("submitDelete")[0].disabled =
					// false;
					// document.getElementsByName("submitUpdate")[0].disabled =
					// false;
					alert("该校姓名教师不存在, 可以增加一名新教师档案！");
				} else if (ret == "2") {
					document.getElementsByName("submitAdd")[0].disabled = true;
					alert("检查到该教师有多条记录，请联系管理员！");
				} else {
					document.getElementsByName("submitAdd")[0].disabled = true;
					document.getElementsByName("submitDelete")[0].disabled = false;
					document.getElementsByName("submitUpdate")[0].disabled = false;
					//info = eval(ret);
					var info = eval(ret); //  如果去掉 var 则查询时出错
					
					document.getElementsByName("userID")[0].value = 'j'+ info[0].uid;
					document.getElementsByName("userName")[0].value = info[0].name;
					document.getElementsByName("sex")[0].options[info[0].sex].selected = true;
					document.getElementsByName("password")[0].value = info[0].passWD;
					
					// 角色
					if(parseInt(info[0].role)==8){
						document.getElementsByName("role")[0].value = 1;
					}
					if(parseInt(info[0].role)==1){
						document.getElementsByName("role")[0].value = 0;
					}					
					
					// 更新头像			 
				    imgUrl = "../uploadImg/" + info[0].name + ".jpg";
					document.getElementById("Img0").innerHTML = '<img alt="照片 (小于3M) *.jpg 150px*200px "'
					    + 'src='+ imgUrl +' width="150px" height="200px" />';		
					
					// 先取消所有之前选中的校区
					if(document.getElementById("schoolZone1")){
						document.getElementById("schoolZone1").checked = false;
					}
					if(document.getElementById("schoolZone2")){
						document.getElementById("schoolZone2").checked = false;
					}
					if(document.getElementById("schoolZone3")){
						document.getElementById("schoolZone3").checked = false;
					}
					if(document.getElementById("schoolZone4")){
						document.getElementById("schoolZone4").checked = false;
					}
					if(document.getElementById("schoolZone5")){
						document.getElementById("schoolZone5").checked = false;
					}
					// 再根据查询结果勾选
					if (info[0].schoolZone1 != "") {
						document.getElementById("schoolZone1").checked = true;
					}
					if (info[0].schoolZone2 != "") {
						document.getElementById("schoolZone2").checked = true;
					}
					if (info[0].schoolZone3 != "") {
						document.getElementById("schoolZone3").checked = true;
					}
					if (info[0].schoolZone4 != "") {
						document.getElementById("schoolZone4").checked = true;
					}
					if (info[0].schoolZone5 != "") {
						document.getElementById("schoolZone5").checked = true;
					}

					document.getElementsByName("bankCardNumber")[0].value = info[0].bankCardNumber;
					document.getElementsByName("bank")[0].value = info[0].bank;
					document.getElementsByName("bankCardUser")[0].value = info[0].bankCardUser;
					document.getElementsByName("requireCondition")[0].value = info[0].requireConditon;
		
					loadPrincipalSet();
					
					if (info[0].product1 != "") {
						document.getElementById("product1").checked = true;
					}
					if (info[0].product2 != "") {
						document.getElementById("product2").checked = true;
					}
					if (info[0].product3 != "") {
						document.getElementById("product3").checked = true;
					}
					if (info[0].product4 != "") {
						document.getElementById("product4").checked = true;
					}
					if (info[0].product5 != "") {
						document.getElementById("product5").checked = true;
					}

					if (info[0].course1 != "") {
						document.getElementById("course1").checked = true;
					}
					if (info[0].course2 != "") {
						document.getElementById("course2").checked = true;
					}
					if (info[0].course3 != "") {
						document.getElementById("course3").checked = true;
					}
					if (info[0].course4 != "") {
						document.getElementById("course4").checked = true;
					}
					if (info[0].course5 != "") {
						document.getElementById("course5").checked = true;
					}
					if (info[0].course6 != "") {
						document.getElementById("course6").checked = true;
					}
					if (info[0].course7 != "") {
						document.getElementById("course7").checked = true;
					}
					if (info[0].course8 != "") {
						document.getElementById("course8").checked = true;
					}
					if (info[0].course9 != "") {
						document.getElementById("course9").checked = true;
					}
					if (info[0].course10 != "") {
						document.getElementById("course10").checked = true;
					}

					if (info[0].grade7 != "") {
						document.getElementById("grade7").checked = true;
					}
					if (info[0].grade8 != "") {
						document.getElementById("grade8").checked = true;
					}
					if (info[0].grade9 != "") {
						document.getElementById("grade9").checked = true;
					}
					if (info[0].grade10 != "") {
						document.getElementById("grade10").checked = true;
					}
					if (info[0].grade11 != "") {
						document.getElementById("grade11").checked = true;
					}
					if (info[0].grade12 != "") {
						document.getElementById("grade12").checked = true;
					}
					
					// 查询后，把相关隐藏或也相应更新，为先查询后修改部分内容再增加做准备，
					// 否则就等于是没有点击相关checkBox，就会导致相关隐藏域内容为空的bug
					checkHiddenValueProduct();
					checkHiddenValueCourse();
					checkHiddenValueGrade();
					checkHiddenValueSchoolZone();

					document.getElementsByName("school")[0].value = info[0].school;
					document.getElementsByName("teacherWX")[0].value = info[0].teacherWX;
					document.getElementsByName("teacherQQ")[0].value = info[0].teacherQQ;
					document.getElementsByName("teacherTel")[0].value = info[0].teacherTel;
					document.getElementsByName("teacherEmail")[0].value = info[0].teacherEmail;
					document.getElementsByName("address")[0].value = info[0].address;
					document.getElementsByName("idCardNum")[0].value = info[0].idCardNum;

					document.getElementsByName("workCondition")[0].options[info[0].workCondition].selected = true;
					document.getElementsByName("workTime")[0].options[info[0].workTime].selected = true;

					if(info[0].inTime !=""){
						var inTime = dateJS("Y-M-d", info[0].inTime);
						document.getElementsByName("inTime")[0].value = inTime;
					}
					if(info[0].outTime !=""){
						var outTime = dateJS("Y-M-d", info[0].outTime);
						document.getElementsByName("outTime")[0].value = outTime;
					}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}
	};
	// 3发出http请求
	// 去除姓名中的所有空格
	var str = document.getElementsByName("userName")[0].value;
	str = str.replace(/\s+/g, "");
	var url = "recordTeacher.php";
	url = url + "?userName=" + encodeURIComponent(str);
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadPrincipalSet() {
	loadProduct();
	loadCourse();
	loadGrade();
	checkHiddenValueSchoolZone();
}

function loadGrade() {
	switch (len) {
	case 1:
		if ((info[0].grade7 == "on") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("gradeLabel")[0].innerHTML = '<input type="checkbox" name="grade[]" id="grade7" onclick="checkHiddenValueGrade()">' + '初一';
		} else {
			document.getElementsByName("gradeLabel")[0].innerHTML = "";
		}
		if ((info[0].grade8 == "on") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("gradeLabel")[1].innerHTML = '<input type="checkbox" name="grade[]" id="grade8" onclick="checkHiddenValueGrade()">' + '初二';
		} else {
			document.getElementsByName("gradeLabel")[1].innerHTML = "";
		}
		if ((info[0].grade9 == "on") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("gradeLabel")[2].innerHTML = '<input type="checkbox" name="grade[]" id="grade9" onclick="checkHiddenValueGrade()">' + '初三';
		} else {
			document.getElementsByName("gradeLabel")[2].innerHTML = "";
		}
		if ((info[0].grade10 == "on") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("gradeLabel")[3].innerHTML = '<input type="checkbox" name="grade[]" id="grade10" onclick="checkHiddenValueGrade()">' + '高一';
		} else {
			document.getElementsByName("gradeLabel")[3].innerHTML = "";
		}
		if ((info[0].grade11 == "on") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("gradeLabel")[4].innerHTML = '<input type="checkbox" name="grade[]" id="grade11" onclick="checkHiddenValueGrade()">' + '高二';
		} else {
			document.getElementsByName("gradeLabel")[4].innerHTML = "";
		}
		if ((info[0].grade12 == "on") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("gradeLabel")[5].innerHTML = '<input type="checkbox" name="grade[]" id="grade12" onclick="checkHiddenValueGrade()">' + '高三';
		} else {
			document.getElementsByName("gradeLabel")[5].innerHTML = "";
		}
		break;
	case 2:
		if ((info[0].grade7 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade7 == "on") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("gradeLabel")[0].innerHTML = '<input type="checkbox" name="grade[]" id="grade7" onclick="checkHiddenValueGrade()">' + '初一';
		} else {
			document.getElementsByName("gradeLabel")[0].innerHTML = "";
		}
		if ((info[0].grade8 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade8 == "on") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("gradeLabel")[1].innerHTML = '<input type="checkbox" name="grade[]" id="grade8" onclick="checkHiddenValueGrade()">' + '初二';
		} else {
			document.getElementsByName("gradeLabel")[1].innerHTML = "";
		}
		if ((info[0].grade9 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade9 == "on") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("gradeLabel")[2].innerHTML = '<input type="checkbox" name="grade[]" id="grade9" onclick="checkHiddenValueGrade()">' + '初三';
		} else {
			document.getElementsByName("gradeLabel")[2].innerHTML = "";
		}
		if ((info[0].grade10 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade10 == "on") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("gradeLabel")[3].innerHTML = '<input type="checkbox" name="grade[]" id="grade10" onclick="checkHiddenValueGrade()">' + '高一';
		} else {
			document.getElementsByName("gradeLabel")[3].innerHTML = "";
		}
		if ((info[0].grade11 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade11 == "on") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("gradeLabel")[4].innerHTML = '<input type="checkbox" name="grade[]" id="grade11" onclick="checkHiddenValueGrade()">' + '高二';
		} else {
			document.getElementsByName("gradeLabel")[4].innerHTML = "";
		}
		if ((info[0].grade12 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade12 == "on") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("gradeLabel")[5].innerHTML = '<input type="checkbox" name="grade[]" id="grade12" onclick="checkHiddenValueGrade()">' + '高三';
		} else {
			document.getElementsByName("gradeLabel")[5].innerHTML = "";
		}
		break;
	case 3:
		if ((info[0].grade7 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade7 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade7 == "on") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("gradeLabel")[0].innerHTML = '<input type="checkbox" name="grade[]" id="grade7" onclick="checkHiddenValueGrade()">' + '初一';
		} else {
			document.getElementsByName("gradeLabel")[0].innerHTML = "";
		}
		if ((info[0].grade8 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade8 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade8 == "on") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("gradeLabel")[1].innerHTML = '<input type="checkbox" name="grade[]" id="grade8" onclick="checkHiddenValueGrade()">' + '初二';
		} else {
			document.getElementsByName("gradeLabel")[1].innerHTML = "";
		}
		if ((info[0].grade9 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade9 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade9 == "on") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("gradeLabel")[2].innerHTML = '<input type="checkbox" name="grade[]" id="grade9" onclick="checkHiddenValueGrade()">' + '初三';
		} else {
			document.getElementsByName("gradeLabel")[2].innerHTML = "";
		}
		if ((info[0].grade10 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade10 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade10 == "on") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("gradeLabel")[3].innerHTML = '<input type="checkbox" name="grade[]" id="grade10" onclick="checkHiddenValueGrade()">' + '高一';
		} else {
			document.getElementsByName("gradeLabel")[3].innerHTML = "";
		}
		if ((info[0].grade11 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade11 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade11 == "on") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("gradeLabel")[4].innerHTML = '<input type="checkbox" name="grade[]" id="grade11" onclick="checkHiddenValueGrade()">' + '高二';
		} else {
			document.getElementsByName("gradeLabel")[4].innerHTML = "";
		}
		if ((info[0].grade12 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade12 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade12 == "on") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("gradeLabel")[5].innerHTML = '<input type="checkbox" name="grade[]" id="grade12" onclick="checkHiddenValueGrade()">' + '高三';
		} else {
			document.getElementsByName("gradeLabel")[5].innerHTML = "";
		}
		break;
	case 4:
		if ((info[0].grade7 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade7 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade7 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade7 == "on") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("gradeLabel")[0].innerHTML = '<input type="checkbox" name="grade[]" id="grade7" onclick="checkHiddenValueGrade()">' + '初一';
		} else {
			document.getElementsByName("gradeLabel")[0].innerHTML = "";
		}
		if ((info[0].grade8 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade8 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade8 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade8 == "on") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("gradeLabel")[1].innerHTML = '<input type="checkbox" name="grade[]" id="grade8" onclick="checkHiddenValueGrade()">' + '初二';
		} else {
			document.getElementsByName("gradeLabel")[1].innerHTML = "";
		}
		if ((info[0].grade9 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade9 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade9 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade9 == "on") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("gradeLabel")[2].innerHTML = '<input type="checkbox" name="grade[]" id="grade9" onclick="checkHiddenValueGrade()">' + '初三';
		} else {
			document.getElementsByName("gradeLabel")[2].innerHTML = "";
		}
		if ((info[0].grade10 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade10 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade10 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade10 == "on") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("gradeLabel")[3].innerHTML = '<input type="checkbox" name="grade[]" id="grade10" onclick="checkHiddenValueGrade()">' + '高一';
		} else {
			document.getElementsByName("gradeLabel")[3].innerHTML = "";
		}
		if ((info[0].grade11 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade11 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade11 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade11 == "on") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("gradeLabel")[4].innerHTML = '<input type="checkbox" name="grade[]" id="grade11" onclick="checkHiddenValueGrade()">' + '高二';
		} else {
			document.getElementsByName("gradeLabel")[4].innerHTML = "";
		}
		if ((info[0].grade12 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade12 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade12 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade12 == "on") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("gradeLabel")[5].innerHTML = '<input type="checkbox" name="grade[]" id="grade12" onclick="checkHiddenValueGrade()">' + '高三';
		} else {
			document.getElementsByName("gradeLabel")[5].innerHTML = "";
		}
		break;
	case 5:
		if ((info[0].grade7 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade7 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade7 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade7 == "on") && (document.getElementById("schoolZone4").checked == true) || (info[4].grade7 == "on") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("gradeLabel")[0].innerHTML = '<input type="checkbox" name="grade[]" id="grade7" onclick="checkHiddenValueGrade()">' + '初一';
		} else {
			document.getElementsByName("gradeLabel")[0].innerHTML = "";
		}
		if ((info[0].grade8 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade8 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade8 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade8 == "on") && (document.getElementById("schoolZone4").checked == true) || (info[4].grade8 == "on") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("gradeLabel")[1].innerHTML = '<input type="checkbox" name="grade[]" id="grade8" onclick="checkHiddenValueGrade()">' + '初二';
		} else {
			document.getElementsByName("gradeLabel")[1].innerHTML = "";
		}
		if ((info[0].grade9 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade9 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade9 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade9 == "on") && (document.getElementById("schoolZone4").checked == true) || (info[4].grade9 == "on") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("gradeLabel")[2].innerHTML = '<input type="checkbox" name="grade[]" id="grade9" onclick="checkHiddenValueGrade()">' + '初三';
		} else {
			document.getElementsByName("gradeLabel")[2].innerHTML = "";
		}
		if ((info[0].grade10 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade10 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade10 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade10 == "on") && (document.getElementById("schoolZone4").checked == true) || (info[4].grade10 == "on") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("gradeLabel")[3].innerHTML = '<input type="checkbox" name="grade[]" id="grade10" onclick="checkHiddenValueGrade()">' + '高一';
		} else {
			document.getElementsByName("gradeLabel")[3].innerHTML = "";
		}
		if ((info[0].grade11 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade11 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade11 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade11 == "on") && (document.getElementById("schoolZone4").checked == true) || (info[4].grade11 == "on") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("gradeLabel")[4].innerHTML = '<input type="checkbox" name="grade[]" id="grade11" onclick="checkHiddenValueGrade()">' + '高二';
		} else {
			document.getElementsByName("gradeLabel")[4].innerHTML = "";
		}
		if ((info[0].grade12 == "on") && (document.getElementById("schoolZone1").checked == true) || (info[1].grade12 == "on") && (document.getElementById("schoolZone2").checked == true) || (info[2].grade12 == "on") && (document.getElementById("schoolZone3").checked == true) || (info[3].grade12 == "on") && (document.getElementById("schoolZone4").checked == true) || (info[4].grade12 == "on") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("gradeLabel")[5].innerHTML = '<input type="checkbox" name="grade[]" id="grade12" onclick="checkHiddenValueGrade()">' + '高三';
		} else {
			document.getElementsByName("gradeLabel")[5].innerHTML = "";
		}
		break;
	default:
		break;
	}
}

function loadProduct() {
	
	// 获得数据库中所有的产品
	for(i=0;i<len;i++){
		if(info[i].product1!=""){
			productLoad[0]=info[i].product1;
		}
		if(info[i].product2!=""){
			productLoad[1]=info[i].product2;
		}
		if(info[i].product3!=""){
			productLoad[2]=info[i].product3;
		}
		if(info[i].product4!=""){
			productLoad[3]=info[i].product4;
		}
		if(info[i].product5!=""){
			productLoad[4]=info[i].product5;
		}
	}

	// 根据所选校区自动加载相应的产品
	switch (len) {
	case 1:
		if ((info[0].product1 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()"/>' + info[0].product1;
		} else {
			document.getElementsByName("productLabel")[0].innerHTML = "";
		}
		if ((info[0].product2 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[0].product2;
		} else {
			document.getElementsByName("productLabel")[1].innerHTML = "";
		}
		if ((info[0].product3 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[0].product3;
		} else {
			document.getElementsByName("productLabel")[2].innerHTML = "";
		}
		if ((info[0].product4 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[0].product4;
		} else {
			document.getElementsByName("productLabel")[3].innerHTML = "";
		}
		if ((info[0].product5 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[0].product5;
		} else {
			document.getElementsByName("productLabel")[4].innerHTML = "";
		}
		break;
	case 2:
		if ((info[0].product1 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[0].product1;
		} else if ((info[1].product1 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[1].product1;
		} else {
			document.getElementsByName("productLabel")[0].innerHTML = "";
		}
		if ((info[0].product2 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[0].product2;
		} else if ((info[1].product2 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[1].product2;
		} else {
			document.getElementsByName("productLabel")[1].innerHTML = "";
		}
		if ((info[0].product3 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[0].product3;
		} else if ((info[1].product3 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[1].product3;
		} else {
			document.getElementsByName("productLabel")[2].innerHTML = "";
		}
		if ((info[0].product4 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[0].product4;
		} else if ((info[1].product4 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[1].product4;
		} else {
			document.getElementsByName("productLabel")[3].innerHTML = "";
		}
		if ((info[0].product5 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[0].product5;
		} else if ((info[1].product5 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[1].product5;
		} else {
			document.getElementsByName("productLabel")[4].innerHTML = "";
		}
		break;
	case 3:
		if ((info[0].product1 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[0].product1;
		} else if ((info[1].product1 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[1].product1;
		} else if ((info[2].product1 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[2].product1;
		} else {
			document.getElementsByName("productLabel")[0].innerHTML = "";
		}
		if ((info[0].product2 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[0].product2;
		} else if ((info[1].product2 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[1].product2;
		} else if ((info[2].product2 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[2].product2;
		} else {
			document.getElementsByName("productLabel")[1].innerHTML = "";
		}
		if ((info[0].product3 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[0].product3;
		} else if ((info[1].product3 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[1].product3;
		} else if ((info[2].product3 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[2].product3;
		} else {
			document.getElementsByName("productLabel")[2].innerHTML = "";
		}
		if ((info[0].product4 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[0].product4;
		} else if ((info[1].product4 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[1].product4;
		} else if ((info[2].product4 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[2].product4;
		} else {
			document.getElementsByName("productLabel")[3].innerHTML = "";
		}
		if ((info[0].product5 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[0].product5;
		} else if ((info[1].product5 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[1].product5;
		} else if ((info[2].product5 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[2].product5;
		} else {
			document.getElementsByName("productLabel")[4].innerHTML = "";
		}
		break;
	case 4:
		if ((info[0].product1 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[0].product1;
		} else if ((info[1].product1 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[1].product1;
		} else if ((info[2].product1 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[2].product1;
		} else if ((info[3].product1 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[3].product1;
		} else {
			document.getElementsByName("productLabel")[0].innerHTML = "";
		}
		if ((info[0].product2 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[0].product2;
		} else if ((info[1].product2 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[1].product2;
		} else if ((info[2].product2 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[2].product2;
		} else if ((info[3].product2 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[3].product2;
		} else {
			document.getElementsByName("productLabel")[1].innerHTML = "";
		}
		if ((info[0].product3 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[0].product3;
		} else if ((info[1].product3 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[1].product3;
		} else if ((info[2].product3 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[2].product3;
		} else if ((info[3].product3 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[3].product3;
		} else {
			document.getElementsByName("productLabel")[2].innerHTML = "";
		}
		if ((info[0].product4 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[0].product4;
		} else if ((info[1].product4 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[1].product4;
		} else if ((info[2].product4 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[2].product4;
		} else if ((info[3].product4 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[3].product4;
		} else {
			document.getElementsByName("productLabel")[3].innerHTML = "";
		}
		if ((info[0].product5 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[0].product5;
		} else if ((info[1].product5 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[1].product5;
		} else if ((info[2].product5 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[2].product5;
		} else if ((info[3].product5 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[3].product5;
		} else {
			document.getElementsByName("productLabel")[4].innerHTML = "";
		}
		break;
	case 5:
		if ((info[0].product1 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[0].product1;
		} else if ((info[1].product1 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[1].product1;
		} else if ((info[2].product1 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[2].product1;
		} else if ((info[3].product1 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[3].product1;
		} else if ((info[4].product1 != "") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("productLabel")[0].innerHTML = '<input type="checkbox" name="product[]" id="product1" onclick="checkHiddenValueProduct()">' + info[4].product1;
		} else {
			document.getElementsByName("productLabel")[0].innerHTML = "";
		}
		if ((info[0].product2 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[0].product2;
		} else if ((info[1].product2 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[1].product2;
		} else if ((info[2].product2 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[2].product2;
		} else if ((info[3].product2 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[3].product2;
		} else if ((info[4].product2 != "") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("productLabel")[1].innerHTML = '<input type="checkbox" name="product[]" id="product2" onclick="checkHiddenValueProduct()">' + info[4].product2;
		} else {
			document.getElementsByName("productLabel")[1].innerHTML = "";
		}
		if ((info[0].product3 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[0].product3;
		} else if ((info[1].product3 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[1].product3;
		} else if ((info[2].product3 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[2].product3;
		} else if ((info[3].product3 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[3].product3;
		} else if ((info[4].product3 != "") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("productLabel")[2].innerHTML = '<input type="checkbox" name="product[]" id="product3" onclick="checkHiddenValueProduct()">' + info[4].product3;
		} else {
			document.getElementsByName("productLabel")[2].innerHTML = "";
		}
		if ((info[0].product4 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[0].product4;
		} else if ((info[1].product4 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[1].product4;
		} else if ((info[2].product4 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[2].product4;
		} else if ((info[3].product4 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[3].product4;
		} else if ((info[4].product4 != "") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("productLabel")[3].innerHTML = '<input type="checkbox" name="product[]" id="product4" onclick="checkHiddenValueProduct()">' + info[4].product4;
		} else {
			document.getElementsByName("productLabel")[3].innerHTML = "";
		}
		if ((info[0].product5 != "") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[0].product5;
		} else if ((info[1].product5 != "") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[1].product5;
		} else if ((info[2].product5 != "") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[2].product5;
		} else if ((info[3].product5 != "") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[3].product5;
		} else if ((info[4].product5 != "") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("productLabel")[4].innerHTML = '<input type="checkbox" name="product[]" id="product5" onclick="checkHiddenValueProduct()">' + info[4].product5;
		} else {
			document.getElementsByName("productLabel")[4].innerHTML = "";
		}
		break;
	default:
		break;
	}

}

function loadCourse() {
	// 根据所选校区自动加载相应的科目
	if ((info[0].course1 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[0].innerHTML = '<input type="checkbox" name="course[]" id="course1" onclick="checkHiddenValueCourse()">' + courseLoad[0];
	} else {
		document.getElementsByName("courseLabel")[0].innerHTML = "";
	}
	if ((info[0].course2 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[1].innerHTML = '<input type="checkbox" name="course[]" id="course2" onclick="checkHiddenValueCourse()">' + courseLoad[1];
	} else {
		document.getElementsByName("courseLabel")[1].innerHTML = "";
	}
	if ((info[0].course3 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[2].innerHTML = '<input type="checkbox" name="course[]" id="course3" onclick="checkHiddenValueCourse()">' + courseLoad[2];
	} else {
		document.getElementsByName("courseLabel")[2].innerHTML = "";
	}
	if ((info[0].course4 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[3].innerHTML = '<input type="checkbox" name="course[]" id="course4" onclick="checkHiddenValueCourse()">' + courseLoad[3];
	} else {
		document.getElementsByName("courseLabel")[3].innerHTML = "";
	}
	if ((info[0].course5 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[4].innerHTML = '<input type="checkbox" name="course[]" id="course5" onclick="checkHiddenValueCourse()">' + courseLoad[4];
	} else {
		document.getElementsByName("courseLabel")[4].innerHTML = "";
	}
	if ((info[0].course6 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[5].innerHTML = '<input type="checkbox" name="course[]" id="course6" onclick="checkHiddenValueCourse()">' + courseLoad[5];
	} else {
		document.getElementsByName("courseLabel")[5].innerHTML = "";
	}
	if ((info[0].course7 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[6].innerHTML = '<input type="checkbox" name="course[]" id="course7" onclick="checkHiddenValueCourse()">' + courseLoad[6];
	} else {
		document.getElementsByName("courseLabel")[6].innerHTML = "";
	}
	if ((info[0].course8 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[7].innerHTML = '<input type="checkbox" name="course[]" id="course8" onclick="checkHiddenValueCourse()">' + courseLoad[7];
	} else {
		document.getElementsByName("courseLabel")[7].innerHTML = "";
	}
	if ((info[0].course9 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[8].innerHTML = '<input type="checkbox" name="course[]" id="course9" onclick="checkHiddenValueCourse()">' + courseLoad[8];
	} else {
		document.getElementsByName("courseLabel")[8].innerHTML = "";
	}
	if ((info[0].course10 != "") && (document.getElementById("schoolZone1").checked == true)) {
		document.getElementsByName("courseLabel")[9].innerHTML = '<input type="checkbox" name="course[]" id="course10" onclick="checkHiddenValueCourse()">' + courseLoad[9];
	} else {
		document.getElementsByName("courseLabel")[9].innerHTML = "";
	}

	
	/*
	switch (len) {
	case 1:
		if ((info[0].course1 !="") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("courseLabel")[0].innerHTML = '<input type="checkbox" name="course[]" id="course1" onclick="checkHiddenValueCourse()">' + '数学';
		} else {
			document.getElementsByName("courseLabel")[0].innerHTML = "";
		}
		if ((info[0].course2 !="") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("courseLabel")[1].innerHTML = '<input type="checkbox" name="course[]" id="course2" onclick="checkHiddenValueCourse()">' + '语文';
		} else {
			document.getElementsByName("courseLabel")[1].innerHTML = "";
		}
		if ((info[0].course3 !="") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("courseLabel")[2].innerHTML = '<input type="checkbox" name="course[]" id="course3" onclick="checkHiddenValueCourse()">' + '英语';
		} else {
			document.getElementsByName("courseLabel")[2].innerHTML = "";
		}
		if ((info[0].course4 !="") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("courseLabel")[3].innerHTML = '<input type="checkbox" name="course[]" id="course4" onclick="checkHiddenValueCourse()">' + '物理';
		} else {
			document.getElementsByName("courseLabel")[3].innerHTML = "";
		}
		if ((info[0].course5 !="") && (document.getElementById("schoolZone1").checked == true)) {
			document.getElementsByName("courseLabel")[4].innerHTML = '<input type="checkbox" name="course[]" id="course5" onclick="checkHiddenValueCourse()">' + '化学';
		} else {
			document.getElementsByName("courseLabel")[4].innerHTML = "";
		}
		break;
	case 2:
		if ((info[0].course1 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course1 !="") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("courseLabel")[0].innerHTML = '<input type="checkbox" name="course[]" id="course1" onclick="checkHiddenValueCourse()">' + '数学';
		} else {
			document.getElementsByName("courseLabel")[0].innerHTML = "";
		}
		if ((info[0].course2 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course2 !="") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("courseLabel")[1].innerHTML = '<input type="checkbox" name="course[]" id="course2" onclick="checkHiddenValueCourse()">' + '语文';
		} else {
			document.getElementsByName("courseLabel")[1].innerHTML = "";
		}
		if ((info[0].course3 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course3 !="") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("courseLabel")[2].innerHTML = '<input type="checkbox" name="course[]" id="course3" onclick="checkHiddenValueCourse()">' + '英语';
		} else {
			document.getElementsByName("courseLabel")[2].innerHTML = "";
		}
		if ((info[0].course4 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course4 !="") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("courseLabel")[3].innerHTML = '<input type="checkbox" name="course[]" id="course4" onclick="checkHiddenValueCourse()">' + '物理';
		} else {
			document.getElementsByName("courseLabel")[3].innerHTML = "";
		}
		if ((info[0].course5 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course5 !="") && (document.getElementById("schoolZone2").checked == true)) {
			document.getElementsByName("courseLabel")[4].innerHTML = '<input type="checkbox" name="course[]" id="course5" onclick="checkHiddenValueCourse()">' + '化学';
		} else {
			document.getElementsByName("courseLabel")[4].innerHTML = "";
		}
		break;
	case 3:
		if ((info[0].course1 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course1 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course1 !="") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("courseLabel")[0].innerHTML = '<input type="checkbox" name="course[]" id="course1" onclick="checkHiddenValueCourse()">' + '数学';
		} else {
			document.getElementsByName("courseLabel")[0].innerHTML = "";
		}
		if ((info[0].course2 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course2 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course2 !="") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("courseLabel")[1].innerHTML = '<input type="checkbox" name="course[]" id="course2" onclick="checkHiddenValueCourse()">' + '语文';
		} else {
			document.getElementsByName("courseLabel")[1].innerHTML = "";
		}
		if ((info[0].course3 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course3 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course3 !="") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("courseLabel")[2].innerHTML = '<input type="checkbox" name="course[]" id="course3" onclick="checkHiddenValueCourse()">' + '英语';
		} else {
			document.getElementsByName("courseLabel")[2].innerHTML = "";
		}
		if ((info[0].course4 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course4 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course4 !="") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("courseLabel")[3].innerHTML = '<input type="checkbox" name="course[]" id="course4" onclick="checkHiddenValueCourse()">' + '物理';
		} else {
			document.getElementsByName("courseLabel")[3].innerHTML = "";
		}
		if ((info[0].course5 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course5 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course5 !="") && (document.getElementById("schoolZone3").checked == true)) {
			document.getElementsByName("courseLabel")[4].innerHTML = '<input type="checkbox" name="course[]" id="course5" onclick="checkHiddenValueCourse()">' + '化学';
		} else {
			document.getElementsByName("courseLabel")[4].innerHTML = "";
		}
		break;
	case 4:
		if ((info[0].course1 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course1 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course1 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course1 !="") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("courseLabel")[0].innerHTML = '<input type="checkbox" name="course[]" id="course1" onclick="checkHiddenValueCourse()">' + '数学';
		} else {
			document.getElementsByName("courseLabel")[0].innerHTML = "";
		}
		if ((info[0].course2 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course2 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course2 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course2 !="") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("courseLabel")[1].innerHTML = '<input type="checkbox" name="course[]" id="course2" onclick="checkHiddenValueCourse()">' + '语文';
		} else {
			document.getElementsByName("courseLabel")[1].innerHTML = "";
		}
		if ((info[0].course3 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course3 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course3 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course3 !="") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("courseLabel")[2].innerHTML = '<input type="checkbox" name="course[]" id="course3" onclick="checkHiddenValueCourse()">' + '英语';
		} else {
			document.getElementsByName("courseLabel")[2].innerHTML = "";
		}
		if ((info[0].course4 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course4 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course4 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course4 !="") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("courseLabel")[3].innerHTML = '<input type="checkbox" name="course[]" id="course4" onclick="checkHiddenValueCourse()">' + '物理';
		} else {
			document.getElementsByName("courseLabel")[3].innerHTML = "";
		}
		if ((info[0].course5 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course5 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course5 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course5 !="") && (document.getElementById("schoolZone4").checked == true)) {
			document.getElementsByName("courseLabel")[4].innerHTML = '<input type="checkbox" name="course[]" id="course5" onclick="checkHiddenValueCourse()">' + '化学';
		} else {
			document.getElementsByName("courseLabel")[4].innerHTML = "";
		}
		break;
	case 5:
		if ((info[0].course1 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course1 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course1 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course1 !="") && (document.getElementById("schoolZone4").checked == true) || (info[4].course1 !="") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("courseLabel")[0].innerHTML = '<input type="checkbox" name="course[]" id="course1" onclick="checkHiddenValueCourse()">' + '数学';
		} else {
			document.getElementsByName("courseLabel")[0].innerHTML = "";
		}
		if ((info[0].course2 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course2 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course2 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course2 !="") && (document.getElementById("schoolZone4").checked == true) || (info[4].course2 !="") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("courseLabel")[1].innerHTML = '<input type="checkbox" name="course[]" id="course2" onclick="checkHiddenValueCourse()">' + '语文';
		} else {
			document.getElementsByName("courseLabel")[1].innerHTML = "";
		}
		if ((info[0].course3 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course3 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course3 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course3 !="") && (document.getElementById("schoolZone4").checked == true) || (info[4].course3 !="") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("courseLabel")[2].innerHTML = '<input type="checkbox" name="course[]" id="course3" onclick="checkHiddenValueCourse()">' + '英语';
		} else {
			document.getElementsByName("courseLabel")[2].innerHTML = "";
		}
		if ((info[0].course4 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course4 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course4 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course4 !="") && (document.getElementById("schoolZone4").checked == true) || (info[4].course4 !="") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("courseLabel")[3].innerHTML = '<input type="checkbox" name="course[]" id="course4" onclick="checkHiddenValueCourse()">' + '物理';
		} else {
			document.getElementsByName("courseLabel")[3].innerHTML = "";
		}
		if ((info[0].course5 !="") && (document.getElementById("schoolZone1").checked == true) || (info[1].course5 !="") && (document.getElementById("schoolZone2").checked == true) || (info[2].course5 !="") && (document.getElementById("schoolZone3").checked == true) || (info[3].course5 !="") && (document.getElementById("schoolZone4").checked == true) || (info[4].course5 !="") && (document.getElementById("schoolZone5").checked == true)) {
			document.getElementsByName("courseLabel")[4].innerHTML = '<input type="checkbox" name="course[]" id="course5" onclick="checkHiddenValueCourse()">' + '化学';
		} else {
			document.getElementsByName("courseLabel")[4].innerHTML = "";
		}
		break;
	default:
		break;
	}
*/
}

function checkPrinciple(){
	if(getCookie('role')=="8"){
		document.getElementsByName('role')[0].value = 0;
	}
}

function initPage() {	
	// 只有校长才能设置校区负责人
	checkPrinciple();
	
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
					// document.getElementsByName("submitAdd")[0].disabled =
					// false;
					// document.getElementsByName("schoolZone")[0].readOnly =
					// true;
					// document.getElementsByName("submitDelete")[0].disabled =
					// true;
					// document.getElementsByName("submitUpdate")[0].disabled =
					// true;
					alert("系统内无校区信息，请在[校长设置]中录入后重新查看！");
				} else if (ret == "2") {
					// document.getElementsByName("submitAdd")[0].disabled =
					// true;
					alert("检查到该校区名有多条记录，请联系管理员！");
				} else {
					// document.getElementsByName("submitAdd")[0].disabled =
					// true;

					// var info = eval(ret);
					info = eval(ret);

					// var i = 0;
					i = 0;
					for ( i = 0; i < 5; i++) {
						document.getElementsByName("schoolZoneLabel")[i].innerHTML = "";
					}
					// var len = 0;
					len = 0;
					for (var tmp in info) {
						len++;
					}

					switch (len) {
					case 0:
						break;
					case 1:
						document.getElementsByName("schoolZoneLabel")[0].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone1" onchange="loadPrincipalSet()">' + info[0].schoolZone;
						schoolZoneLoad[0]=info[0].schoolZone;
						break;
					case 2:
						document.getElementsByName("schoolZoneLabel")[0].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone1" onchange="loadPrincipalSet()">' + info[0].schoolZone;
						document.getElementsByName("schoolZoneLabel")[1].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone2" onchange="loadPrincipalSet()">' + info[1].schoolZone;
						schoolZoneLoad[0]=info[0].schoolZone;
						schoolZoneLoad[1]=info[1].schoolZone;
						break;
					case 3:
						document.getElementsByName("schoolZoneLabel")[0].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone1" onchange="loadPrincipalSet()">' + info[0].schoolZone;
						document.getElementsByName("schoolZoneLabel")[1].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone2" onchange="loadPrincipalSet()">' + info[1].schoolZone;
						document.getElementsByName("schoolZoneLabel")[2].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone3" onchange="loadPrincipalSet()">' + info[2].schoolZone;
						schoolZoneLoad[0]=info[0].schoolZone;
						schoolZoneLoad[1]=info[1].schoolZone;
						schoolZoneLoad[2]=info[2].schoolZone;
						break;
					case 4:
						document.getElementsByName("schoolZoneLabel")[0].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone1" onchange="loadPrincipalSet()">' + info[0].schoolZone;
						document.getElementsByName("schoolZoneLabel")[1].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone2" onchange="loadPrincipalSet()">' + info[1].schoolZone;
						document.getElementsByName("schoolZoneLabel")[2].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone3" onchange="loadPrincipalSet()">' + info[2].schoolZone;
						document.getElementsByName("schoolZoneLabel")[3].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone4" onchange="loadPrincipalSet()">' + info[3].schoolZone;
						schoolZoneLoad[0]=info[0].schoolZone;
						schoolZoneLoad[1]=info[1].schoolZone;
						schoolZoneLoad[2]=info[2].schoolZone;
						schoolZoneLoad[3]=info[3].schoolZone;
						break;
					case 5:
						document.getElementsByName("schoolZoneLabel")[0].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone1" onchange="loadPrincipalSet()">' + info[0].schoolZone;
						document.getElementsByName("schoolZoneLabel")[1].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone2" onchange="loadPrincipalSet()">' + info[1].schoolZone;
						document.getElementsByName("schoolZoneLabel")[2].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone3" onchange="loadPrincipalSet()">' + info[2].schoolZone;
						document.getElementsByName("schoolZoneLabel")[3].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone4" onchange="loadPrincipalSet()">' + info[3].schoolZone;
						document.getElementsByName("schoolZoneLabel")[4].innerHTML = '<input type="checkbox" name="schoolZone[]" id="schoolZone5" onchange="loadPrincipalSet()">' + info[4].schoolZone;
						schoolZoneLoad[0]=info[0].schoolZone;
						schoolZoneLoad[1]=info[1].schoolZone;
						schoolZoneLoad[2]=info[2].schoolZone;
						schoolZoneLoad[3]=info[3].schoolZone;
						schoolZoneLoad[4]=info[4].schoolZone;
						break;
					default:
						break;
					}
					
					// 默认填写当前日期
					document.getElementsByName("inTime")[0].value = getNowFormatDate();
					
					// 载入校长设置中科目名称
					sqlCourse();
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "recordTeacher.php";
	url = url + "?noValue=0";
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