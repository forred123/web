/**
 * @author zyx
 */

var info;
var i = 0;
var len = 0;
var tableRowCount = 0;
var productLoad = new Array;
var timer;// 全部扣费中的定时器
var indexLine = -1;// 全部扣费中的第几个学生的标志，初始值必须为－1，因为后面有＋＋操作
// 各科所有考勤时间数组
/*
var attMathTime = new Array();
var attChineseTime = new Array();
var attEnglishTime = new Array();
var attPhysicsTime = new Array();
var attChemistryTime = new Array();
*/

// 考勤中的试听操作,与学生表中一致，type=3是试听后留班，即试听成功，type=4为试听后出班，即试听失败
function btnTest(studentID,objOperate,type){
		var xmlhttp;
		
		// 提交按钮在表格中的行数，从0开始，用于区分提交的是第几行的数据，很重要
		var index = -1;
		
		var obj;
		if(type == "3"){
			obj = document.getElementsByName("btnTestYes");
		}
		if(type == "4"){
			obj = document.getElementsByName("btnTestNo");
		}
		for(var i=0;i<obj.length;i++){
			if(objOperate == obj[i]){
				index = i;
			}
		}
				
		// 字符串中查找要扣费的科目
		var objSubFeeCourse = document.getElementsByName("gradeResult")[0];
		var str = objSubFeeCourse.options[objSubFeeCourse.selectedIndex].text;
		var courseIndex = 0;
		if(str.indexOf("数学") != -1){
			courseIndex = 1;
		}else if(str.indexOf("语文") != -1){
			courseIndex = 2;
		}else if(str.indexOf("英语") != -1){
			courseIndex = 3;
		}else if(str.indexOf("物理") != -1){
			courseIndex = 4;
		}else if(str.indexOf("化学") != -1){
			courseIndex = 5;
		}else{
			courseIndex = 0;
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
					//alert(ret);
					var btnTestYes = document.getElementsByName("btnTestYes")[index];
					var btnTestNo = document.getElementsByName("btnTestNo")[index];
							
					if (ret == "0"){
						alert("扣费失败！");
					} else{
						btnTestYes.disabled = "true";
						btnTestNo.disabled = "true";
						
						// 按试听成功后，更新该行“试听状态testState”由试听变为非试听，防止先按试听成功后不刷新页面后连续按提交，否则这样可能会产生testState状态没更新
						if(type == "3"){
							document.getElementsByName("testState")[index].value = "非试听";
						}
					}
					
				} else {
					alert("错误，请求页面异常！");
				}
			}
	
		};
		
		// 3发出http请求			
		var obj = document.getElementsByName("gradeResult")[0];
		var str = obj.options[obj.selectedIndex].text;
		var strData =str.split("-");
		var priceStateTmp ="";
		if(type=="3"){
			priceStateTmp = "1";
		}else if(type=="4"){
			priceStateTmp = "0";
		}
		//alert(document.getElementsByName("testState")[index].value);
		var url = "classRecord.php";
		url = url + "?testStudentID=" + studentID
					+ "&subFeeCourse=" + courseIndex
					// 不使用classIdInMLS，是因为这是个ajax关键词，会触发别的ajax开始查询
					+ "&classInMLS=" + document.getElementsByName("gradeResult")[0].value
					+ "&testResult=" + type
					+ "&priceState=" + priceStateTmp
					+ "&testResultTime=" + document.getElementsByName("attandenceTime")[0].value;
		
		// 很重要，必须有的
		url = url + "&sid=" + Math.random();
		xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
}
// 更新考勤内容
function freshAttandence(){
	var index=0;
	var obj = document.getElementsByName("attendance");
	
	// 先清零再计算数量
	document.getElementsByName("attendanceNum")[0].value = 0;
	document.getElementsByName("qjNum")[0].value = 0;
	document.getElementsByName("kkNum")[0].value = 0;
	
	for(index=0;index<obj.length;index++){
		// 更新 0旷课 1请假2出勤 人数
		if(document.getElementsByName("attendance")[index].value == "2"){
			document.getElementsByName("attendanceNum")[0].value++;
		}
		if(document.getElementsByName("attendance")[index].value == "1"){
			document.getElementsByName("qjNum")[0].value++;
		}
		if(document.getElementsByName("attendance")[index].value == "0"){
			document.getElementsByName("kkNum")[0].value++;
		}
	}
	// 表格行中填出勤人数
	for(index=0;index<obj.length;index++){
		document.getElementsByName("attendNumTableCell")[index].value = document.getElementsByName("attendanceNum")[0].value;	
	}
}

// 一次性把考勤扣费操作全做了
function subFeeAll(){
	var pass = false;
	
	if(document.getElementsByName("endAttandenceTime")[0].value ==""){
		pass = false;
		alert('请填写"结束时间"！');
	}else{
		if(confirm('请确认填写的考勤内容"全部"正确再提交！\n\n确认要"全部"提交吗？')){
			pass = true;
		}else{
			pass = false;	
		}
	}
	
	if(pass){
			
		// 出勤情况人数填写??????????
		//fillAttandenceNum(objOperate);
				
		// 周期性一个一个学生提交上课考勤扣费
		indexLine = -1;
		timer = setInterval("subFeeAllSun()",500);
		document.getElementsByName('subFeeAll')[0].disabled = true;
	}
}

// 全部提交的子函数，周期执行
function subFeeAllSun(){	
	// 字符串中查找要扣费的科目
	var objSubFeeCourse = document.getElementsByName("gradeResult")[0];
	var str = objSubFeeCourse.options[objSubFeeCourse.selectedIndex].text;
	var courseIndex = 0;
	if(str.indexOf("数学") != -1){
		courseIndex = 1;
	}else if(str.indexOf("语文") != -1){
		courseIndex = 2;
	}else if(str.indexOf("英语") != -1){
		courseIndex = 3;
	}else if(str.indexOf("物理") != -1){
		courseIndex = 4;
	}else if(str.indexOf("化学") != -1){
		courseIndex = 5;
	}else{
		courseIndex = 0;
	}
		
	var obj = document.getElementsByName("subFeeName");
	// 提交按钮在表格中的行数，从0开始，用于区分提交的是第几行的数据，很重要
	if(indexLine < obj.length-1){
		indexLine++;
		//fillAttandenceNumAll(indexLine);
	}else{
		clearInterval(timer);
		return;
	}
	
	
	// 增加判断考勤时间冲突的学生在“提交全部考勤”时不能再次提交，直接跳过
	if(document.getElementsByName("subFeeName")[indexLine].disabled==true){
		if(indexLine == document.getElementsByName("subFeeName").length-1){
			alert('"提交全部考勤"操作完毕！请核对！');
		}
		return;
	}
	
	
	
		
	var strtmp;
	strtmp = document.getElementsByName('studentID')[indexLine].value;
	// 去掉字母x，只留真正的数字学号
	studentID = strtmp.substring(1);
	
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
						var objBtn = document.getElementsByName("subFeeName")[indexLine];
								
						if (ret == "0"){
							alert("扣费失败！");
						} else {
							objBtn.disabled = "true";
						}
						
						if(indexLine == document.getElementsByName("subFeeName").length-1){
							alert('"提交全部考勤"操作完毕！请核对！');
						}
						
					} else {
						alert("错误，请求页面异常！");
					}
				}
		
			};
			
			// 3发出http请求	
			
			// 出勤情况
			var tmp = parseInt(document.getElementsByName("attendance")[indexLine].value);
			var attendance="";
			switch(tmp){
			case 0:
				attendance = "旷课";
				break;
			case 1:
				attendance = "请假";
				break;
			case 2:
				attendance = "出勤";
				break;
			default:
				break;
			}
			
			if(document.getElementsByName("studentName2")[indexLine].value == "/"){
				var name2 = "";
			}else{
				var name2 = document.getElementsByName("studentName2")[indexLine].value;
			}
			
			var obj = document.getElementsByName("gradeResult")[0];
			var str = obj.options[obj.selectedIndex].text;
			var strData =str.split("-");
			
			var priceState = "0";
			var tmp = document.getElementsByName("testState")[indexLine].value;
			if(tmp == "试听"){
				priceState = "0";
			}else if(tmp == "非试听"){
				priceState = "1";
			}	 
			
			var url = "classRecord.php";
			url = url + "?subFeeStudentID=" + studentID
						+ "&subFeeCourse=" + courseIndex
						+ "&studentName1=" + encodeURIComponent(document.getElementsByName("studentName1")[indexLine].value)
						+ "&studentName2=" + encodeURIComponent(name2)
						+ "&attendance=" + encodeURIComponent(attendance)
						+ "&attandenceTime=" + document.getElementsByName("attandenceTime")[0].value					
						+ "&endAttandenceTime=" + document.getElementsByName("endAttandenceTime")[0].value
						+ "&price=" + document.getElementsByName("price")[indexLine].value
						+ "&notAttendanceReason=" + encodeURIComponent(document.getElementsByName("notAttendanceReason")[indexLine].value)
						+ "&schoolZone=" + encodeURIComponent(strData[3])
						+ "&grade=" + encodeURIComponent(strData[4])
						+ "&product=" + encodeURIComponent(strData[6])
						+ "&teacher=" + encodeURIComponent(strData[7])
						+ "&className=" + encodeURIComponent(strData[8])
						// 不使用classIdInMLS，是因为这是个ajax关键词，会触发别的ajax开始查询
						+ "&classInMLS=" + document.getElementsByName("gradeResult")[0].value
						+ "&pay=" + document.getElementsByName("pay")[indexLine].value
						+ "&priceState=" + priceState;
	
			// 很重要，必须有的
			url = url + "&sid=" + Math.random();
			xmlhttp.open("GET", url, true);
			xmlhttp.send(null);
}

// 考勤后扣费操作
function subFee(studentID,objOperate){
	var pass = false;
	var tmpStr = "";
	// 提交按钮在表格中的行数，从0开始，用于区分提交的是第几行的数据，很重要
	var index = -1;
	
	var obj = document.getElementsByName("subFeeName");
	for(var i=0;i<obj.length;i++){
		if(objOperate == obj[i]){
			index = i;
		}
	}
	
	if(document.getElementsByName("endAttandenceTime")[0].value ==""){
		pass = false;
		alert('请填写"结束时间"！');
	}else{
		if(document.getElementsByName("studentName2")[index].value=="/"){
			tmpStr = '"' + document.getElementsByName("studentName1")[index].value + '"';
		}else{
			tmpStr = '"' + document.getElementsByName("studentName2")[index].value + '"';
		}
		if(confirm("请确认"+ tmpStr +"的考勤内容填写正确再提交！\n\n确认要提交吗？")){
			pass = true;
		}else{
			pass = false;	
		}
	}
	
	if(pass){
		var xmlhttp;
		
		// 出勤情况人数填写
		//fillAttandenceNum(objOperate);
		
		// 字符串中查找要扣费的科目
		var objSubFeeCourse = document.getElementsByName("gradeResult")[0];
		var str = objSubFeeCourse.options[objSubFeeCourse.selectedIndex].text;
		var courseIndex = 0;
		if(str.indexOf("数学") != -1){
			courseIndex = 1;
		}else if(str.indexOf("语文") != -1){
			courseIndex = 2;
		}else if(str.indexOf("英语") != -1){
			courseIndex = 3;
		}else if(str.indexOf("物理") != -1){
			courseIndex = 4;
		}else if(str.indexOf("化学") != -1){
			courseIndex = 5;
		}else{
			courseIndex = 0;
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
					//alert(ret);
					var objBtn = document.getElementsByName("subFeeName")[index];
							
					if (ret == "0"){
						alert("扣费失败！");
					} else {
						objBtn.disabled = "true";
					}
				} else {
					alert("错误，请求页面异常！");
				}
			}
	
		};
		
		// 3发出http请求	
		
		// 出勤情况
		var tmp = parseInt(document.getElementsByName("attendance")[index].value);
		var attendance="";
		switch(tmp){
		case 0:
			attendance = "旷课";
			break;
		case 1:
			attendance = "请假";
			break;
		case 2:
			attendance = "出勤";
			break;
		default:
			break;
		}
		
		if(document.getElementsByName("studentName2")[index].value == "/"){
			var name2 = "";
		}else{
			var name2 = document.getElementsByName("studentName2")[index].value;
		}
		
		var obj = document.getElementsByName("gradeResult")[0];
		var str = obj.options[obj.selectedIndex].text;
		var strData =str.split("-");
		
		var priceState = "0";
		var tmp = document.getElementsByName("testState")[index].value;
		if(tmp == "试听"){
			priceState = "0";
		}else if(tmp == "非试听"){
			priceState = "1";
		}	 
		
		var url = "classRecord.php";		
		url = url + "?subFeeStudentID=" + studentID
					+ "&subFeeCourse=" + courseIndex
                    + "&studentName1=" + encodeURIComponent(document.getElementsByName("studentName1")[index].value)
					+ "&studentName2=" + encodeURIComponent(name2)
					+ "&attendance=" + encodeURIComponent(attendance)
					+ "&attandenceTime=" + document.getElementsByName("attandenceTime")[0].value					
					+ "&endAttandenceTime=" + document.getElementsByName("endAttandenceTime")[0].value
					+ "&price=" + document.getElementsByName("price")[index].value
					+ "&notAttendanceReason=" + encodeURIComponent(document.getElementsByName("notAttendanceReason")[index].value)
					+ "&schoolZone=" + encodeURIComponent(strData[3])
					+ "&grade=" + encodeURIComponent(strData[4])
					+ "&product=" + encodeURIComponent(strData[6])
					+ "&teacher=" + encodeURIComponent(strData[7])
					+ "&className=" + encodeURIComponent(strData[8])
					// 不使用classIdInMLS，是因为这是个ajax关键词，会触发别的ajax开始查询
					+ "&classInMLS=" + document.getElementsByName("gradeResult")[0].value
					+ "&pay=" + document.getElementsByName("pay")[index].value
					+ "&priceState=" + priceState;
					

		// 很重要，必须有的
		url = url + "&sid=" + Math.random();
		xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
	}
}

//考勤退班操作
function outGrade(studentID,objOperate){
	var xmlhttp;
	
	// 提交按钮在表格中的行数，从0开始，用于区分提交的是第几行的数据，很重要
	var index = -1;
	
	var obj = document.getElementsByName("outGradeName");
	for(var i=0;i<obj.length;i++){
		if(objOperate == obj[i]){
			index = i;
		}
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
				//alert(ret);
				var objBtn = document.getElementsByName("outGradeName")[index];
						
					if (ret == "0"){
						alert("退班失败！");
					} else {
						objBtn.disabled = "true";
					}
			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	
	// 3发出http请求	
	if(document.getElementsByName("studentName2")[index].value == "/"){
		var name2 = "";
	}else{
		var name2 = document.getElementsByName("studentName2")[index].value;
	}
	
	var url = "classRecord.php";
	url = url + "?outGradeStudentID=" + studentID	
				+ "&outOrBackGradeTime=" + document.getElementsByName("attandenceTime")[0].value
				+ "&outGradeReason=" + document.getElementsByName("outGradeReason")[index].value
				+ "&course=" + document.getElementsByName("operateCourse")[0].value;
				
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

//考勤回班操作
function backGrade(studentID,objOperate){
	var xmlhttp;
	
	// 提交按钮在表格中的行数，从0开始，用于区分提交的是第几行的数据，很重要
	var index = -1;
	
	var obj = document.getElementsByName("backGradeName");
	for(var i=0;i<obj.length;i++){
		if(objOperate == obj[i]){
			index = i;
			break;//
		}
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
				//alert(ret);
				var objBtn = document.getElementsByName("backGradeName")[index];
						
					if (ret == "0"){
						alert("回班失败！");
					} else {
						objBtn.disabled = "true";
					}
			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	
	// 3发出http请求	
	if(document.getElementsByName("studentName2")[index].value == "/"){
		var name2 = "";
	}else{
		var name2 = document.getElementsByName("studentName2")[index].value;
	}
	
	var url = "classRecord.php";
	url = url + "?backGradeStudentID=" + studentID
			   + "&course=" + document.getElementsByName("operateCourse")[0].value;
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function freshRemainCourse(objOperate){
	// 提交按钮在表格中的行数，从0开始，用于区分提交的是第几行的数据，很重要
	var index = -1;
	var price = 1,remainFee = 0,remainCourseNum=0;

	var obj = document.getElementsByName("price");
	for(var i=0;i<obj.length;i++){
		if(objOperate == obj[i]){
			index = i;
		}
	}
	
	remainFee = document.getElementsByName("remainFee")[index].value;
	price = document.getElementsByName("price")[index].value;
	remainCourseNum = remainFee/price;
	
	document.getElementsByName("remainCourseNum")[index].value = remainCourseNum.toFixed(1);
}

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
		str1 = document.getElementsByName("schoolZone")[0].options[document.getElementsByName("schoolZone")[0].selectedIndex].text;
		str1 = encodeURIComponent(str1);
	}
	if (document.getElementsByName("grade")[0].value != 0) {
		str2 = document.getElementsByName("grade")[0].options[document.getElementsByName("grade")[0].selectedIndex].text;
		str2 = encodeURIComponent(str2);
	}
	if (document.getElementsByName("course")[0].value != 0) {
		str3 = document.getElementsByName("course")[0].options[document.getElementsByName("course")[0].selectedIndex].text;
		str3 = encodeURIComponent(str3);
	}
	if (document.getElementsByName("product")[0].value != 0) {
		str4 = document.getElementsByName("product")[0].options[document.getElementsByName("product")[0].selectedIndex].text;
		str4 = encodeURIComponent(str4);
	}
	if (document.getElementsByName("teacher")[0].value != 0) {
		str5 = document.getElementsByName("teacher")[0].options[document.getElementsByName("teacher")[0].selectedIndex].text;
		str5 = encodeURIComponent(str5);
	}
	if (document.getElementsByName("class")[0].value != 0) {
		str6 = document.getElementsByName("class")[0].options[document.getElementsByName("class")[0].selectedIndex].text;
		str6 = encodeURIComponent(str6);
	}

	// 3发出http请求
	var url = "classRecord.php";
	url = url + "?noValueA=1" + "&schoolZone=" + str1 + "&grade=" + str2 + "&course=" + str3 + "&product=" + str4 + "&teacher=" + str5 + "&class=" + str6;
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function copyCourseToHidden(){
	var obj = document.getElementsByName("gradeResult")[0];
	
	var str = obj.options[obj.selectedIndex].text;
	var courseIndex = 0;
	if(str.indexOf("数学") != -1){
		courseIndex = 1;
	}else if(str.indexOf("语文") != -1){
		courseIndex = 2;
	}else if(str.indexOf("英语") != -1){
		courseIndex = 3;
	}else if(str.indexOf("物理") != -1){
		courseIndex = 4;
	}else if(str.indexOf("化学") != -1){
		courseIndex = 5;
	}else{
		courseIndex = 0;
	}
	document.getElementsByName("operateCourse")[0].value = courseIndex;
}

// 核对本次考勤时间和上次考勤时间的冲突问题
function checkTime(){
	var obj = document.getElementsByName("subFeeName");
	var time1 = datetime_to_unix(document.getElementsByName("attandenceTime")[0].value + ":00");
	var time2 = datetime_to_unix(document.getElementsByName("endAttandenceTime")[0].value + ":00");
	if(time2<=time1){
		alert('"结束时间"应大于"开始时间！"');
		document.getElementsByName("endAttandenceTime")[0].value = "";
		return;
	}
	
	var str="",strtemp="";
	var lastTime1 = 0;
	var lastTime2 = 0;
	var lastTime1,lastTime2;
	var confliction = false;
	for(var i=0;i<obj.length;i++){
		strtemp = document.getElementsByName("startTime")[i].value + ":00";
		strtemp=strtemp.split("_");
		str = strtemp[0]+" "+strtemp[1];
		lastTime1 = datetime_to_unix(str);
		
		strtemp = document.getElementsByName("endTime")[i].value + ":00";
		strtemp=strtemp.split("_");
		str = strtemp[0]+" "+strtemp[1];
		lastTime2 = datetime_to_unix(str);
		
		//判断本次考勤时间与上次考勤时间是否冲突，如果有冲突则把提交考勤按钮变灰
		if ((time2 <= lastTime2)// 考勤应来自上次以后
		|| (time1 <= lastTime2)//考勤应来自上次以后
		|| (time2 <= lastTime1)//考勤应来自上次以后
		|| ((time1 <= lastTime2) && (time1 >= lastTime1))//开始时间在上次考勤区间中不可以
		|| ((time2 <= lastTime2) && (time2 >= lastTime1))//结束时间在上次考勤区间中不可以
		) {
			//confliction = true;
			// 临时方便测试不使用冲突检测机制，待测试完毕后找开即可
			confliction = false;
		}else{
			confliction = false;
		}
		
		if (confliction) {
			document.getElementsByName("subFeeName")[i].disabled = true;
			document.getElementsByName("btnTestYes")[i].disabled = true;
			document.getElementsByName("btnTestNo")[i].disabled = true;
		}else{
			document.getElementsByName("subFeeName")[i].disabled = false;
			document.getElementsByName("btnTestYes")[i].disabled = false;
			document.getElementsByName("btnTestNo")[i].disabled = false;
		}

	}
}

function fillEndAttandenceTime() {
	var obj = document.getElementsByName("gradeResult")[0];
	var str = obj.options[obj.selectedIndex].text;
	var strData = str.split("-");
	var timePeriod = 0;//秒钟
	
	// 默认一对一2小时，其它都认为是班课1.5小时
	if(strData[6]=="一对一"){
		timePeriod = 2*60;
	}else {
		timePeriod = 1.5*60;
	}
	
	// 更新提交全部考勤按钮状态
	document.getElementsByName('subFeeAll')[0].disabled = false;
	
	document.getElementsByName("endAttandenceTime")[0].value = getCustomFormatDateTime("attandenceTime", timePeriod);
	
	checkTime();
}

/*
// 全部提交时填写出勤情况人数
function fillAttandenceNumAll(index){
	var num1 = parseInt(document.getElementsByName("attendanceNum")[0].value);
	var num2 = parseInt(document.getElementsByName("qjNum")[0].value);
	var num3 = parseInt(document.getElementsByName("kkNum")[0].value);
		
	// 0旷课 1请假2出勤
	if(document.getElementsByName("attendance")[index].value==2){
		num1++;
	}
	if(document.getElementsByName("attendance")[index].value==1){
		num2++;
	}
	if(document.getElementsByName("attendance")[index].value==0){
		num3++;
	}
	document.getElementsByName("attendanceNum")[0].value = num1.toString();
	document.getElementsByName("qjNum")[0].value = num2.toString();
	document.getElementsByName("kkNum")[0].value = num3.toString();
}
*/


// 单独提交时填写出勤情况人数
/*
function fillAttandenceNum(objOperate){
	var num1 = parseInt(document.getElementsByName("attendanceNum")[0].value);
	var num2 = parseInt(document.getElementsByName("qjNum")[0].value);
	var num3 = parseInt(document.getElementsByName("kkNum")[0].value);
	
	var index =0;
	var obj = document.getElementsByName("subFeeName");
	for(var i=0;i<obj.length;i++){
		if(objOperate == obj[i]){
			index = i;
		}
	}
	
	// 0旷课 1请假2出勤
	if(document.getElementsByName("attendance")[index].value==2){
		num1++;
	}
	if(document.getElementsByName("attendance")[index].value==1){
		num2++;
	}
	if(document.getElementsByName("attendance")[index].value==0){
		num3++;
	}
	document.getElementsByName("attendanceNum")[0].value = num1.toString();
	document.getElementsByName("qjNum")[0].value = num2.toString();
	document.getElementsByName("kkNum")[0].value = num3.toString();
}
*/

// ajax 加载在一个班级里的所有学生
function loadStudentInOneGrade(flag){	
	// 班级选择为“－－请选择－－”时，不操作
	if (document.getElementsByName("gradeResult")[0].value == 0) {
		return ;
	}
	var xmlhttp;
	
	// 考勤时间清空，防止时间用上一次选择的时间，这样就不能检测考勤时间冲突了
	document.getElementsByName("attandenceTime")[0].value = "";
	document.getElementsByName("endAttandenceTime")[0].value = "";
	
	
	// 考勤情况人数清零
	document.getElementsByName("attendanceNum")[0].value = "0";
	document.getElementsByName("qjNum")[0].value = "0";
	document.getElementsByName("kkNum")[0].value = "0";

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
				
				// 全部提交按钮使能
				document.getElementsByName('subFeeAll')[0].disabled = false;
				// 先清除表格第二行及以后的行
				removeRow('studentInOneGradeTable');
				
				// 班级选择为“－－请选择－－”时，不操作
				//if (document.getElementsByName("gradeResult")[0].value > 0) {

					if (ret == "0") {
						switch(flag) {
						case 0:
							// 一个班级内不在班的学生（已退班学生）
							alert("该班级没有退班学生！");
							break;
						case 1:
							// 一个班级内在班的学生
							alert("该班级没有在班学生！");
							break;
						case 2:
							// 所有在一个班的学生
							alert("该班级没有学生！");
							break;
						default:
							break;
						}						
					} else {

						var info = eval(ret);
						//alert(ret);						
						var obj = document.getElementById("studentInOneGradeTable");
	
						// 添加学生信息到表格行
						var course = document.getElementsByName("operateCourse")[0].value;
						i = 0;
						//alert(ret);
						for ( var tmp in info) {
							// 查询学生余额，然后在其中查询学生交费表中的单价和时间，最后插入表格
							sqlStudentRemainFee(info[i],course,i);														
							i++;
						}
						tableRowCount = i;

						// 添加相关提交按钮
						// appendRowBtn(studentInOneGradeTable);
					}
				//}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	
	// 3发出http请求
	// 与学生表中一致，0为不在班（可回班），1为在班（不试听直接交费上课的，可退班），2为试听，3为试听后留班的，4为试听后出班的（试听失败）
	var stateInGrade = "%";
	switch(flag){
		case 0: // 一个班级内不在班的学生（已退班学生）0,4
			stateInGrade = "0";//对应stateInGrade＝0，4
			break;
		case 1: // 一个班级内在班的学生123
			stateInGrade = "1";// 对应stateInGrade＝1，2，3
			// 把选择操作的科目标志放到隐藏域中，用来查询某一科目在同一个班级中的学生
			copyCourseToHidden();
			break;
		case 2: // 所有在一个班的学生01234
			stateInGrade = "%";	// 对应stateInGrade＝0，1，2，3，4所有
	
			/*
			var obj = document.getElementsByName("gradeResult")[0];
			var str = obj.options[obj.selectedIndex].text;
			
			var st;
			st=str.split("-");
			
			alert(st[3]);
			*/		
			break;
		default:
			break;
	}
	
	var url = "classRecord.php";
	url = url + "?classIdInMLS=" + document.getElementsByName("gradeResult")[0].value
				+ "&stateInGrade=" + stateInGrade
				+ "&course=" + document.getElementsByName("operateCourse")[0].value;
	//alert(url);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);
}

//插入表格相关函数
//appendRow(studentInOneGradeTable, obj.uid,	obj.name1, obj.name2, obj.ChineseStateInGrade,price, i);
function appendRow(TableID,studentID,name1,name2,startTime,endTime,stateInGrade,outGradeReason,notAttendanceReason,attendance,price,pay,remainFee,index){
//function appendRow(TableID,obj,course,index){
	// 更新 0旷课 1请假2出勤 人数
	if(attendance == "出勤"){
		document.getElementsByName("attendanceNum")[0].value++;
	}
	if(attendance == "请假"){
		document.getElementsByName("qjNum")[0].value++;
	}
	if(attendance == "旷课"){
		document.getElementsByName("kkNum")[0].value++;
	}
	
	// 插入表格
	var tmpNum = 0;
	// 序号从1开始
	index = index +1;
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
	
	newTd0.innerHTML = '<input type="number" style="width:3em" name="numInTable" value=' + index  + ' ' +'readonly/>';
	newTd1.innerHTML = '<input type="text" style="width: 3em" name="studentID" value=' + 'x' + studentID + ' ' +'readonly/>';
	newTd4.innerHTML = '<input type="text" style="width: 5em" name="studentName1" value=' + name1 + ' ' +' readonly/>';
	newTd5.innerHTML = '<input type="text" style="width: 5em" name="studentName2" readonly value=' + name2 + ' />';
	newTd6.innerHTML = '<input type="number" name="price" style="width: 4em" value=' + price +' min="0" max="200" step="0.1" onchange="freshRemainCourse(this)" />';
	var obj = document.getElementsByName("gradeResult")[0];
	var str = obj.options[obj.selectedIndex].text;
	var strData = str.split("-");
	var timePeriod = 0;//秒钟

	// 班课时不显示工资
	if(strData[6]=="班课"){
		newTd7.innerHTML = '<input type="number" name="pay" style="width: 4em"' + ' readonly/>';//工资
	}else{
		newTd7.innerHTML = '<input type="number" name="pay" style="width: 4em" value=' +pay+ ' />';//工资
	}
	
	newTd8.innerHTML = '<input type="text" name="attendNumTableCell" style="width: 4em" value=""' +' />';
	
	// 表格行中填出勤人数
	for(var i=0;i<index;i++){
		document.getElementsByName("attendNumTableCell")[i].value = document.getElementsByName("attendanceNum")[0].value;
	}
	
	newTd9.innerHTML = '<select name="attendance" style="width: 5em" onchange=freshAttandence()>'
							+ '<option value="2">出勤</option>'
							+ '<option value="1">请假</option>'
							+ '<option value="0" style="display: none" >旷课</option>'
							+ '</select>';
	if(attendance == "旷课"){
		document.getElementsByName("attendance")[index-1].value = 0;
	}
	if(attendance == "请假"){
		document.getElementsByName("attendance")[index-1].value = 1;
	}
	if(attendance == "出勤"){
		document.getElementsByName("attendance")[index-1].value = 2;
	}
		
	if(notAttendanceReason==""){
		newTd10.innerHTML = '<input type="text" name="notAttendanceReason" style="width: 6ex" />';
	}else{
		newTd10.innerHTML = '<input type="text" name="notAttendanceReason" value= ' + notAttendanceReason + ' style="width: 6ex" />';
	}
	
	newTd11.innerHTML = '<input type="number" name="remainFee" step="0.1" value=' + remainFee + ' style="width: 4em" readonly/>';
	tmpNum = remainFee/price;
	newTd12.innerHTML = '<input type="number" name="remainCourseNum" value=' + tmpNum.toFixed(1) + ' style="width: 4em" readonly/>';
	
	// 0为不在班（可回班），1为在班（不试听直接交费上课的，可退班），2为试听，3为试听后留班的，4为试听后出班的（试听失败）
	// 0为不在班状态 ，1为在班状态，不在班时，退班按钮为灰色不能使用，与学生表中一致，3是试听后留班，即试听成功，4为试听后出班，即试听失败
	// 0和4为不在班状态，可以重新分班，1，2，3为在班状态，不能重新分班（即除非有退班操作）
	if((stateInGrade == "0")||(stateInGrade == "4")){
		newTd13.innerHTML = '<input type="text" name="outGradeReason" style="width: 6ex" value=' + outGradeReason + ' readonly/>' 
						+ '<input type="button" class="btn" name="outGradeName" value="退班" onclick="outGrade(' + studentID +', this )" disabled />';
		newTd14.innerHTML = '<input type="button" class="btn" name="backGradeName" value="回班" onclick="backGrade(' + studentID +', this )"/>';
		//newTd12.innerHTML = '<input type="button" name="btnTestYes" value="试听成功" onclick="btnTest(' + studentID + ', this ,3)" disabled/>'
		//				  + '<input type="button" name="btnTestNo" value="试听失败" onclick="btnTest(' + studentID + ', this ,4)" disabled/>';
		newTd3.innerHTML = '<input type="button" class="btn" name="subFeeName" value="提交" onclick="subFee(' + studentID + ', this )" disabled/>';
	}else{
		newTd13.innerHTML = '<input type="text" name="outGradeReason" style="width: 6ex" />' 
						+ '<input type="button" class="btn" name="outGradeName" value="退班" onclick="outGrade(' + studentID +', this )"/>';
		newTd14.innerHTML = '<input type="button" class="btn" name="backGradeName" value="回班" onclick="backGrade(' + studentID +', this )" disabled/>';
		
		
		//newTd12.innerHTML = '<input type="button" name="btnTestYes" value="试听成功" onclick="btnTest(' + studentID + ', this ,3)"/>'
		//				+ '<input type="button" name="btnTestNo" value="试听失败" onclick="btnTest(' + studentID + ', this ,4)"/>';
		newTd3.innerHTML = '<input type="button" class="btn" name="subFeeName" value="提交" onclick="subFee(' + studentID + ', this )"/>';
	}
	
	if(stateInGrade == "2"){
		newTd15.innerHTML = '<input type="hidden" name="testState" value="试听"/>'
						+ '<input type="button" name="btnTestYes" value="试听成功" onclick="btnTest(' + studentID + ', this ,3)"/>'
						+ '<input type="button" name="btnTestNo" value="试听失败" onclick="btnTest(' + studentID + ', this ,4)"/>';
	}else{
		newTd15.innerHTML = '<input type="hidden" name="testState" value="非试听"/>'
						+ '<input type="button" name="btnTestYes" value="试听成功" onclick="btnTest(' + studentID + ', this ,3)" disabled/>'
						+ '<input type="button" name="btnTestNo" value="试听失败" onclick="btnTest(' + studentID + ', this ,4)" disabled/>';
	}
	
	var str1 = dateJS("Y-M-d_H:i", startTime);
	var str2 = dateJS("Y-M-d_H:i", endTime);
	
	newTd2.innerHTML = '<input type="text" name="startTime" value='+ str1 +' style="width: 18ex" readonly="true"/>' +"</br>"
						+'<input type="text" name="endTime" value='+ str2 +' style="width: 18ex" readonly="true"/>';
	
	//添加表格样式
	$("tr").mouseover(function(){
		$(this).css("background-color","#e9eaec");
	});
	$("tr").mouseout(function(){
		$(this).css("background-color","");
	});
	$("tr:odd").addClass("rowBgColorOdd");
	$("tr:even").addClass("rowBgColorEven");
	
	// 隐藏学生ID列
	setHiddenCol(studentInOneGradeTable,1);
}

//插入表格之，增加相关按钮
function appendRowBtn(TableID){
	// 添加一行
	var newTr = TableID.insertRow(-1);
	// 添加一列
	var newTd0 = newTr.insertCell(-1);
	// 设置列内容和属性
	newTd0.align='center';
	newTd0.colSpan="11";

	newTd0.innerHTML ="";

	/*
	newTd0.innerHTML = '<input type="hidden" name="submitType" />'
		+ '<input type="button" class="btnPre" name="buttonSql" value="上一个" onclick=""/>'
		+ '<input type="button" class="btnNext" name="buttonSql" value="下一个" onclick=""/>'
		+ '<input type="button" class="btn" name="buttonSql" value="查询" onclick=""/>'
		+ '<input type="submit" class="btn" name="submitUpdate" disabled="true" value="修改" onclick="return checkRecordStudent()"/>'
		+ '<input type="submit" class="btn"	name="submitDelete" disabled="true" value="删除" onclick="return checkRecordStudent()"/>'
		+ '<input type="submit" class="btn" name="submitAdd" value="提交" onclick="return checkRecordStudent()"/>';
	*/
}

// 窗口表格删除一行
function removeRow(TableID) {
	var tabObj = document.getElementById(TableID);
		for(var j=0;j<tableRowCount;j++){
			// 从表格首行开始删除，使用0，如果要保留首行则使用1
				tabObj.deleteRow(1);
		}
	tableRowCount = 0;
}

//oTable为表的id，iRow和iCol是从0开始的，iRow=0表示的是第一行，iCol=0表示的是第一列。
function setHiddenCol(oTable,iCol)
{
    for (var i=0;i < oTable.rows.length ; i++)
    {    
       oTable.rows[i].cells[iCol].style.display="none";
		//如果该列隐藏则让其显示，反之则让其隐藏
		//oTable.rows[i].cells[iCol].style.display=="none"?"block":"none";
		//oTable.rows[i].deleteCell(iCol);
    }
}

//加载学生交费表中的单价和上课时间
function loadPriceAndAddRow(obj,flagCourse,remainFee,i) {
	var strtmpGrade;
	var objtmp = document.getElementsByName("gradeResult")[0];
	var strtmp = objtmp.options[objtmp.selectedIndex].text;
	strtmpGrade = strtmp.split("-");

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
					if(strtmpGrade[6]=="班课"){
						price = obj.priceBK;
						pay = 0;//待确认
					}else if(strtmpGrade[6]=="一对一"){
						price = obj.priceHour1YDY;
						pay = obj.pay1;
					}							
				
				} else {
					// 第二次及以后扣费，载入最后一次（也就是上一次）的单价和工资	
					var info = eval(ret);
					// 在扣费表中有扣费记录，根据扣费记录载入单价和工资	
					//alert(flagCourse);	
					//alert(info[0].MathProduct);	
					//alert(info.length);
					
					// 载入最后一次（也就是上一次）的单价和工资	(在学生表中)	，扣费表info[info.length-1].price,学生表obj.lastPrice;
					//if(flagCourse=="1"){
						
						if(info[info.length-1].product=="班课"){
							//price = info[info.length-1].priceBK;
							//price = info[info.length-1].price;
							//pay = 0;//待确认
							price = obj.lastPrice;
							pay = 0;//待确认
						}else if(info[info.length-1].product=="一对一"){
							var sumHour = 0;							
							for(j=0;j<info.length;j++){
								sumHour+=info[j].period/60.0;
							}
							var sumHourLessLast = sumHour - info[info.length-1].period/60;
								
							//price = info[info.length-1].price;
							//pay = info[info.length-1].pay;
							price = obj.lastPrice;
							pay = info[info.length-1].pay;
							//alert(sumHour);
							//alert(sumHourLessLast);
							// 发生按段收费时当次载入分班时设置好的分段单价
							if((sumHourLessLast<= obj.hour1)&&(sumHour>=obj.hour1)&&(sumHour<=obj.hour2)){
								price = obj.priceHour2YDY;
							}							
							if((sumHourLessLast<= obj.hour2)&&(sumHour>=obj.hour3)){
								price = obj.priceHour3YDY;
							}			
										
						}
						notAttendanceReason = info[info.length-1].notAttendanceReason;	
						attendance = info[info.length-1].attendance;			
					//}
				}			
				
				// 确定完单价和工资后，插入表格
				if(flagCourse=="1"){
					appendRow(studentInOneGradeTable, obj.uid, obj.name1, obj.name2,obj.MathAttendanceStartTime,obj.MathAttendanceEndTime, obj.MathStateInGrade,obj.MathOutGradeReason,notAttendanceReason,attendance,price,pay,remainFee,i);
				}
				if(flagCourse=="2"){
					appendRow(studentInOneGradeTable, obj.uid, obj.name1, obj.name2,obj.ChineseAttendanceStartTime,obj.ChineseAttendanceEndTime, obj.ChineseStateInGrade,obj.ChineseOutGradeReason,notAttendanceReason,attendance,price,pay,remainFee,i);
				}
				if(flagCourse=="3"){
					appendRow(studentInOneGradeTable, obj.uid, obj.name1, obj.name2,obj.EnglishAttendanceStartTime,obj.EnglishAttendanceEndTime, obj.EnglishStateInGrade,obj.EnglishOutGradeReason,notAttendanceReason,attendance,price,pay,remainFee,i);
				}
				if(flagCourse=="4"){
					appendRow(studentInOneGradeTable, obj.uid, obj.name1, obj.name2,obj.PhysicsAttendanceStartTime,obj.PhysicsAttendanceEndTime, obj.PhysicsStateInGrade,obj.PhysicsOutGradeReason,notAttendanceReason,attendance,price,pay,remainFee,i);
				}
				if(flagCourse=="5"){
					appendRow(studentInOneGradeTable, obj.uid, obj.name1, obj.name2,obj.ChemistryAttendanceStartTime,obj.ChemistryAttendanceEndTime, obj.ChemistryStateInGrade,obj.ChemistryOutGradeReason,notAttendanceReason,attendance,price,pay,remainFee,i);
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
//发出AJAX查询subFeeTable一对一时间和，来确定一对一单价是哪个
	// 3发出http请求
	var url = "classRecord.php";
	url = url + "?sqlPriceByUid=" + obj.uid
			  + "&course=" + flagCourse.toString
			  + "&product=" + strtmpGrade[6];

	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);
}

// ajax 查询学生余额，从fee.php中mysql复用代码
function sqlStudentRemainFee(obj,courseIndex,index) {
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
					loadPriceAndAddRow(obj,courseIndex,remainFee,index);
					/*
					// 显示学生余额
					switch(courseIndex) {
					case 1:
						if (document.getElementsByName("remainFee1")[0]) {
							document.getElementsByName("remainFee1")[0].value = info[0].remainFee;
						}
						break;
					case 2:
						if (document.getElementsByName("remainFee2")[0]) {
							document.getElementsByName("remainFee2")[0].value = info[0].remainFee;
						}
						break;
					case 3:
						if (document.getElementsByName("remainFee3")[0]) {
							document.getElementsByName("remainFee3")[0].value = info[0].remainFee;
						}
						break;
					case 4:
						if (document.getElementsByName("remainFee4")[0]) {
							document.getElementsByName("remainFee4")[0].value = info[0].remainFee;
						}
						break;
					case 5:
						if (document.getElementsByName("remainFee5")[0]) {
							document.getElementsByName("remainFee5")[0].value = info[0].remainFee;
						}
						break;
					default:
						break;
					}
					*/
			
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "classRecord.php";
	url = url + "?sqlRemainFeeByStudentUID=" + obj.uid + "&subFeeCourse=" + courseIndex;

	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);
}

function loadPrincipalSetAndTeacher() {
	var schoolZone = document.getElementsByName("schoolZone")[0].options[document
			.getElementsByName("schoolZone")[0].value].text;
	// 有真正的选择的时候才操作
	if(document.getElementsByName("schoolZone")[0].value>0){
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
	var url = "classRecord.php";
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
	for (i = 0; i < len; i++) {
		if (schoolZone == info[i].schoolZone) {
			index = i;
			break;
		}
	}
	
	var obj = document.getElementsByName("course")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 1; i < obj.options.length;) {
		obj.removeChild(obj.options[i]);
	}
	
	if (info[index].course1 !="") {
		obj.options.add(new Option("数学", 1));
	}
	if (info[index].course2 !="") {
		obj.options.add(new Option("语文", 2));
	}
	if (info[index].course3 !="") {
		obj.options.add(new Option("英语", 3));
	}
	if (info[index].course4 !="") {
		obj.options.add(new Option("物理", 4));
	}
	if (info[index].course5 !="") {
		obj.options.add(new Option("化学", 5));
	}
}

function loadGrade(schoolZone) {
	var index = 0;
	// 根据所选校区自动加载相应的产品
	for (i = 0; i < len; i++) {
		if (schoolZone == info[i].schoolZone) {
			index = i;
			break;
		}
	}
	
	var obj = document.getElementsByName("grade")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 1; i < obj.options.length;) {
		obj.removeChild(obj.options[i]);
	}
	
	if (info[index].grade7 !="") {
		obj.options.add(new Option("初一", 7));
	}
	if (info[index].grade8 !="") {
		obj.options.add(new Option("初二", 8));
	}
	if (info[index].grade9 !="") {
		obj.options.add(new Option("初三", 9));
	}
	if (info[index].grade10 !="") {
		obj.options.add(new Option("高一", 10));
	}
	if (info[index].grade11 !="") {
		obj.options.add(new Option("高二", 11));
	}
	if (info[index].grade12 !="") {
		obj.options.add(new Option("高三", 12));
	}	
}

function loadProduct(schoolZone) {
	var index = 0;
	// 根据所选校区自动加载相应的产品
	for (i = 0; i < len; i++) {
		if (schoolZone == info[i].schoolZone) {
			index = i;
			break;
		}
	}

	for(i=0;i<len;i++){
		if(info[i].product1 !=""){
			productLoad[0] = info[i].product1;
		}
		if(info[i].product2 !=""){
			productLoad[1] = info[i].product2;
		}
		if(info[i].product3 !=""){
			productLoad[2] = info[i].product3;
		}
		if(info[i].product4 !=""){
			productLoad[3] = info[i].product4;
		}
		if(info[i].product5 !=""){
			productLoad[4] = info[i].product5;
		}
	}

	var obj = document.getElementsByName("product")[0];
	// 先清除所有以前选择加进来的，只保留第一个选择的内容
	for ( i = 1; i < obj.options.length;) {
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
					for (i = 1; i < obj.options.length;) {
						obj.removeChild(obj.options[i]);
					}

					// 再增加数据库中的教师姓名
					i = 0;
					for ( var tmp in teacher) {
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
	var url = "classRecord.php";
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
					for ( var tmp in info) {
						obj1.options.add(new Option(info[i].schoolZone, i + 1));
						i++;
					}
					len = i;

					// 默认填写当前日期
					document.getElementsByName("attandenceTime")[0].value = getNowFormatDateTime();
					//document.getElementsByName("endAttandenceTime")[0].value = getNowFormatDateTime();
					
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
						
						loadPrincipalSetAndTeacher();
					}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "classRecord.php";
	url = url + "?noValue=1";
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