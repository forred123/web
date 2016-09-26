/**
 * @author zyx
 */

var info;
var sqlInfo;
var i = 0;
var len = 0;
var flagSubmit = false;
var productLoad = new Array();

function sqlFee() {
	// 顺序为：记录条数－总费用－数学费用－语文费用－英语费用－物理费用－化学费用
	var staticResult = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

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
	}else if(mode == "1"){
		mode = "j";
	}else if(mode == "2"){
		mode = "z";
	}else if(mode == "3"){
		mode = "t";
	}	
	
	var name = document.getElementsByName("name")[0].value;
	if(name==""){
		name="%";
	}	
	var receiptNum = document.getElementsByName("receiptNum")[0].value;
	if(receiptNum==""){
		receiptNum="%";
	}
	
	var timeStart = document.getElementsByName("timeStart")[0].value;
	if(timeStart ==""){
		timeStart = "%";
	}	
	var timeEnd = document.getElementsByName("timeEnd")[0].value;
	if(timeEnd ==""){
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
	
					appendRowHeader(info[0],sqlFeeTable);
					
					var obj1 = document.getElementsByName("schoolZone")[0];
					i = 0;
					for (var tmp in info) {
						
						appendRow(info[i],i);
						
						staticResult[1]+= parseInt(info[i].feeSum);// 总额
						staticResult[2]+= parseInt(info[i].Math);
						staticResult[3]+= parseInt(info[i].MathSubFee1);
						staticResult[4]+= parseInt(info[i].MathSubFee2);
						staticResult[5]+= parseInt(info[i].MathSubFee3);
						staticResult[6]+= parseInt(info[i].MathSubFee4);
						staticResult[7]+= parseInt(info[i].MathSubFee5);
						staticResult[8]+= parseInt(info[i].Chinese);
						staticResult[9]+= parseInt(info[i].ChineseSubFee1);
						staticResult[10]+= parseInt(info[i].ChineseSubFee2);
						staticResult[11]+= parseInt(info[i].ChineseSubFee3);
						staticResult[12]+= parseInt(info[i].ChineseSubFee4);
						staticResult[13]+= parseInt(info[i].ChineseSubFee5);
						staticResult[14]+= parseInt(info[i].English);
						staticResult[15]+= parseInt(info[i].EnglishSubFee1);
						staticResult[16]+= parseInt(info[i].EnglishSubFee2);
						staticResult[17]+= parseInt(info[i].EnglishSubFee3);
						staticResult[18]+= parseInt(info[i].EnglishSubFee4);
						staticResult[19]+= parseInt(info[i].EnglishSubFee5);
						staticResult[20]+= parseInt(info[i].Physics);
						staticResult[21]+= parseInt(info[i].PhysicsSubFee1);
						staticResult[22]+= parseInt(info[i].PhysicsSubFee2);
						staticResult[23]+= parseInt(info[i].PhysicsSubFee3);
						staticResult[24]+= parseInt(info[i].PhysicsSubFee4);
						staticResult[25]+= parseInt(info[i].PhysicsSubFee5);
						staticResult[26]+= parseInt(info[i].Chemistry);
						staticResult[27]+= parseInt(info[i].ChemistrySubFee1);
						staticResult[28]+= parseInt(info[i].ChemistrySubFee2);
						staticResult[29]+= parseInt(info[i].ChemistrySubFee3);
						staticResult[30]+= parseInt(info[i].ChemistrySubFee4);
						staticResult[31]+= parseInt(info[i].ChemistrySubFee5);
						i++;
					}
					staticResult[0] = i;
					
					appendRowStatistic(info[0],sqlFeeTable,staticResult);
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求		
	// 使用encodeURIComponent，是为了浏览器兼容
	var url = "sqlFee.php";
	url = url + "?sqlFee=1"
			  + "&schoolZone=" + encodeURIComponent(schoolZone)
			  + "&grade=" + encodeURIComponent(grade)
			  + "&course=" + course
			  + "&product=" + encodeURIComponent(product)
			  + "&mode=" + mode
			  + "&name=" + encodeURIComponent(name)
			  + "&receiptNum=" + receiptNum
			  + "&timeStart=" + timeStart
			  + "&timeEnd="+ timeEnd;
	
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function loadPrincipalSetAndTeacher() {
	if(document.getElementsByName("schoolZone")[0].value>0){
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
	
	if (sqlInfo[index].course1 != "") {
		obj.options.add(new Option("数学", 1));
	}
	if (sqlInfo[index].course2 != "") {
		obj.options.add(new Option("语文", 2));
	}
	if (sqlInfo[index].course3 != "") {
		obj.options.add(new Option("英语", 3));
	}
	if (sqlInfo[index].course4 != "") {
		obj.options.add(new Option("物理", 4));
	}
	if (sqlInfo[index].course5 != "") {
		obj.options.add(new Option("化学", 5));
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
	
	i=1;
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
function appendRowHeader(obj,TableID){
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
	newTd37.align='center';
	newTd38.align='center';
	newTd39.align='center';
	newTd40.align='center';
	newTd41.align='center';
	newTd42.align='center';
	newTd43.align='center';
	newTd44.align='center';
	newTd45.align='center';
	newTd46.align='center';
	newTd47.align='center';
	newTd48.align='center';
	
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
	newTd14.innerHTML = "数学产品";
	newTd15.innerHTML = "数学学费";
	newTd16.innerHTML = obj.subFee1Name;
	newTd17.innerHTML = obj.subFee2Name;
	newTd18.innerHTML = obj.subFee3Name;
	newTd19.innerHTML = obj.subFee4Name;
	newTd20.innerHTML = obj.subFee5Name;
	newTd21.innerHTML = "语文产品";
	newTd22.innerHTML = "语文学费";
	newTd23.innerHTML = obj.subFee1Name;
	newTd24.innerHTML = obj.subFee2Name;
	newTd25.innerHTML = obj.subFee3Name;
	newTd26.innerHTML = obj.subFee4Name;
	newTd27.innerHTML = obj.subFee5Name;
	newTd28.innerHTML = "英语产品";
	newTd29.innerHTML = "英语学费";
	newTd30.innerHTML = obj.subFee1Name;
	newTd31.innerHTML = obj.subFee2Name;
	newTd32.innerHTML = obj.subFee3Name;
	newTd33.innerHTML = obj.subFee4Name;
	newTd34.innerHTML = obj.subFee5Name;
	newTd35.innerHTML = "物理产品";
	newTd36.innerHTML = "物理学费";
	newTd37.innerHTML = obj.subFee1Name;
	newTd38.innerHTML = obj.subFee2Name;
	newTd39.innerHTML = obj.subFee3Name;
	newTd40.innerHTML = obj.subFee4Name;
	newTd41.innerHTML = obj.subFee5Name;
	newTd42.innerHTML = "化学产品";
	newTd43.innerHTML = "化学学费";
	newTd44.innerHTML = obj.subFee1Name;
	newTd45.innerHTML = obj.subFee2Name;
	newTd46.innerHTML = obj.subFee3Name;
	newTd47.innerHTML = obj.subFee4Name;
	newTd48.innerHTML = obj.subFee5Name;
	
	// 对没有的扣费项目进行隐藏，
	if(obj.subFee1Name=="费用1"){
		setHiddenCol(sqlFeeTable,16);
		setHiddenCol(sqlFeeTable,23);
		setHiddenCol(sqlFeeTable,30);
		setHiddenCol(sqlFeeTable,37);
		setHiddenCol(sqlFeeTable,44);
	}
	if(obj.subFee2Name=="费用2"){
		setHiddenCol(sqlFeeTable,17);
		setHiddenCol(sqlFeeTable,24);
		setHiddenCol(sqlFeeTable,31);
		setHiddenCol(sqlFeeTable,38);
		setHiddenCol(sqlFeeTable,45);
	}
	if(obj.subFee3Name=="费用3"){
		setHiddenCol(sqlFeeTable,18);
		setHiddenCol(sqlFeeTable,25);
		setHiddenCol(sqlFeeTable,32);
		setHiddenCol(sqlFeeTable,39);
		setHiddenCol(sqlFeeTable,46);
	}
	if(obj.subFee4Name=="费用4"){
		setHiddenCol(sqlFeeTable,19);
		setHiddenCol(sqlFeeTable,26);
		setHiddenCol(sqlFeeTable,33);
		setHiddenCol(sqlFeeTable,40);
		setHiddenCol(sqlFeeTable,47);
	}
	if(obj.subFee5Name=="费用5"){
		setHiddenCol(sqlFeeTable,20);
		setHiddenCol(sqlFeeTable,27);
		setHiddenCol(sqlFeeTable,34);
		setHiddenCol(sqlFeeTable,41);
		setHiddenCol(sqlFeeTable,48);
	}
}

// 插入班课表格相关函数
function appendRow(obj,index){
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
	newTd37.align='center';
	newTd38.align='center';
	newTd39.align='center';
	newTd40.align='center';
	newTd41.align='center';
	newTd42.align='center';
	newTd43.align='center';
	newTd44.align='center';
	newTd45.align='center';
	newTd46.align='center';
	newTd47.align='center';
	newTd48.align='center';
		
		
	newTd0.innerHTML = index;
	newTd1.innerHTML = obj.uid;
	newTd2.innerHTML = obj.name1;
	if(obj.name2==""){
		newTd3.innerHTML = "/";
	}else{
		newTd3.innerHTML = obj.name2;
	}	
	newTd4.innerHTML = obj.sex;
	newTd5.innerHTML = obj.schoolZone1;
	if(obj.schoolZone2==""){
		newTd6.innerHTML = "/";
	}else{
		newTd6.innerHTML = obj.schoolZone2;
	}
	if(obj.schoolZone3==""){
		newTd7.innerHTML = "/";
	}else{
		newTd7.innerHTML = obj.schoolZone3;
	}
	newTd8.innerHTML = obj.grade;
	if(obj.mode=="j"){
		newTd9.innerHTML = "交费";
	}else if(obj.mode=="z"){
		newTd9.innerHTML = "转费";
	}else if(obj.mode=="t"){
		newTd9.innerHTML = "退费";
	}
	newTd10.innerHTML = obj.receiptNum;
	newTd11.innerHTML = obj.billNum;	
	newTd12.innerHTML = obj.feeSum;
	newTd13.innerHTML = dateJS("Y-m-d",obj.time); 
	if(obj.MathProduct==""){
		newTd14.innerHTML = "/";
	}else{
		newTd14.innerHTML = obj.MathProduct;
	}	
	newTd15.innerHTML = obj.Math;
	newTd16.innerHTML = obj.MathSubFee1;
	newTd17.innerHTML = obj.MathSubFee2;
	newTd18.innerHTML = obj.MathSubFee3;
	newTd19.innerHTML = obj.MathSubFee4;
	newTd20.innerHTML = obj.MathSubFee5;
	if(obj.ChineseProduct==""){
		newTd21.innerHTML = "/";
	}else{
		newTd21.innerHTML = obj.ChineseProduct;
	}	
	newTd22.innerHTML = obj.Chinese;
	newTd23.innerHTML = obj.ChineseSubFee1;
	newTd24.innerHTML = obj.ChineseSubFee2;
	newTd25.innerHTML = obj.ChineseSubFee3;
	newTd26.innerHTML = obj.ChineseSubFee4;
	newTd27.innerHTML = obj.ChineseSubFee5;
	if(obj.EnglishProduct==""){
		newTd28.innerHTML = "/";
	}else{
		newTd28.innerHTML = obj.EnglishProduct;
	}	
	newTd29.innerHTML = obj.English;
	newTd30.innerHTML = obj.EnglishSubFee1;
	newTd31.innerHTML = obj.EnglishSubFee2;
	newTd32.innerHTML = obj.EnglishSubFee3;
	newTd33.innerHTML = obj.EnglishSubFee4;
	newTd34.innerHTML = obj.EnglishSubFee5;
	if(obj.PhysicsProduct==""){
		newTd35.innerHTML = "/";
	}else{
		newTd35.innerHTML = obj.PhysicsProduct;
	}	
	newTd36.innerHTML = obj.Physics;
	newTd37.innerHTML = obj.PhysicsSubFee1;
	newTd38.innerHTML = obj.PhysicsSubFee2;
	newTd39.innerHTML = obj.PhysicsSubFee3;
	newTd40.innerHTML = obj.PhysicsSubFee4;
	newTd41.innerHTML = obj.PhysicsSubFee5;
	if(obj.ChemistryProduct==""){
		newTd42.innerHTML = "/";
	}else{
		newTd42.innerHTML = obj.ChemistryProduct;
	}	
	newTd43.innerHTML = obj.Chemistry;
	newTd44.innerHTML = obj.ChemistrySubFee1;
	newTd45.innerHTML = obj.ChemistrySubFee2;
	newTd46.innerHTML = obj.ChemistrySubFee3;
	newTd47.innerHTML = obj.ChemistrySubFee4;
	newTd48.innerHTML = obj.ChemistrySubFee5;
	
	// 对没有的扣费项目进行隐藏，
	if(obj.subFee1Name=="费用1"){
		setHiddenCol(sqlFeeTable,16);
		setHiddenCol(sqlFeeTable,23);
		setHiddenCol(sqlFeeTable,30);
		setHiddenCol(sqlFeeTable,37);
		setHiddenCol(sqlFeeTable,44);
	}
	if(obj.subFee2Name=="费用2"){
		setHiddenCol(sqlFeeTable,17);
		setHiddenCol(sqlFeeTable,24);
		setHiddenCol(sqlFeeTable,31);
		setHiddenCol(sqlFeeTable,38);
		setHiddenCol(sqlFeeTable,45);
	}
	if(obj.subFee3Name=="费用3"){
		setHiddenCol(sqlFeeTable,18);
		setHiddenCol(sqlFeeTable,25);
		setHiddenCol(sqlFeeTable,32);
		setHiddenCol(sqlFeeTable,39);
		setHiddenCol(sqlFeeTable,46);
	}
	if(obj.subFee4Name=="费用4"){
		setHiddenCol(sqlFeeTable,19);
		setHiddenCol(sqlFeeTable,26);
		setHiddenCol(sqlFeeTable,33);
		setHiddenCol(sqlFeeTable,40);
		setHiddenCol(sqlFeeTable,47);
	}
	if(obj.subFee5Name=="费用5"){
		setHiddenCol(sqlFeeTable,20);
		setHiddenCol(sqlFeeTable,27);
		setHiddenCol(sqlFeeTable,34);
		setHiddenCol(sqlFeeTable,41);
		setHiddenCol(sqlFeeTable,48);
	}
	
	// 添加表格样式
	$("#sqlFeeTable tr").mouseover(function(){
		$(this).css("background-color","#e9eaec");
		$(this).css("line-height","49px");
	});
	$("#sqlFeeTable tr").mouseout(function(){
		$(this).css("background-color","");
		$(this).css("line-height","19px");
	});
	$("#sqlFeeTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlFeeTable tr:even").addClass("rowBgColorEven");
}

// 插入查询结果统计
function appendRowStatistic(obj,TableID,data){
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
	newTd37.align='center';
	newTd38.align='center';
	newTd39.align='center';
	newTd40.align='center';
	newTd41.align='center';
	newTd42.align='center';
	newTd43.align='center';
	newTd44.align='center';
	newTd45.align='center';
	newTd46.align='center';
	newTd47.align='center';
	newTd48.align='center';
	
	newTd0.innerHTML = "统计结果";
	newTd1.innerHTML = "";
	newTd2.innerHTML = "";
	newTd3.innerHTML = "";
	newTd4.innerHTML = "";
	newTd5.innerHTML = "";
	newTd6.innerHTML = "";
	newTd7.innerHTML = "费用次数";
	newTd8.innerHTML = data[0];
	newTd9.innerHTML = "";
	newTd10.innerHTML = "";
	newTd11.innerHTML = "费用总额";
	newTd12.innerHTML = data[1];
	newTd13.innerHTML = "";
	newTd14.innerHTML = "数学费用";
	newTd15.innerHTML = data[2];
	newTd16.innerHTML = data[3];
	newTd17.innerHTML = data[4];
	newTd18.innerHTML = data[5];
	newTd19.innerHTML = data[6];
	newTd20.innerHTML = data[7];
	newTd21.innerHTML = "语文费用";
	newTd22.innerHTML = data[8];
	newTd23.innerHTML = data[9];
	newTd24.innerHTML = data[10];
	newTd25.innerHTML = data[11];
	newTd26.innerHTML = data[12];
	newTd27.innerHTML = data[13];
	newTd28.innerHTML = "英语费用";
	newTd29.innerHTML = data[14];
	newTd30.innerHTML = data[15];
	newTd31.innerHTML = data[16];
	newTd32.innerHTML = data[17];
	newTd33.innerHTML = data[18];
	newTd34.innerHTML = data[19];
	newTd35.innerHTML = "物理费用";
	newTd36.innerHTML = data[20];
	newTd37.innerHTML = data[21];
	newTd38.innerHTML = data[22];
	newTd39.innerHTML = data[23];
	newTd40.innerHTML = data[24];
	newTd41.innerHTML = data[25];
	newTd42.innerHTML = "化学费用";
	newTd43.innerHTML = data[26];
	newTd44.innerHTML = data[27];
	newTd45.innerHTML = data[28];
	newTd46.innerHTML = data[29];
	newTd47.innerHTML = data[30];
	newTd48.innerHTML = data[31];
	
	// 对没有的扣费项目进行隐藏，
	if(obj.subFee1Name=="费用1"){
		setHiddenCol(sqlFeeTable,16);
		setHiddenCol(sqlFeeTable,23);
		setHiddenCol(sqlFeeTable,30);
		setHiddenCol(sqlFeeTable,37);
		setHiddenCol(sqlFeeTable,44);
	}
	if(obj.subFee2Name=="费用2"){
		setHiddenCol(sqlFeeTable,17);
		setHiddenCol(sqlFeeTable,24);
		setHiddenCol(sqlFeeTable,31);
		setHiddenCol(sqlFeeTable,38);
		setHiddenCol(sqlFeeTable,45);
	}
	if(obj.subFee3Name=="费用3"){
		setHiddenCol(sqlFeeTable,18);
		setHiddenCol(sqlFeeTable,25);
		setHiddenCol(sqlFeeTable,32);
		setHiddenCol(sqlFeeTable,39);
		setHiddenCol(sqlFeeTable,46);
	}
	if(obj.subFee4Name=="费用4"){
		setHiddenCol(sqlFeeTable,19);
		setHiddenCol(sqlFeeTable,26);
		setHiddenCol(sqlFeeTable,33);
		setHiddenCol(sqlFeeTable,40);
		setHiddenCol(sqlFeeTable,47);
	}
	if(obj.subFee5Name=="费用5"){
		setHiddenCol(sqlFeeTable,20);
		setHiddenCol(sqlFeeTable,27);
		setHiddenCol(sqlFeeTable,34);
		setHiddenCol(sqlFeeTable,41);
		setHiddenCol(sqlFeeTable,48);
	}
	
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

//oTable为表的id，iRow和iCol是从0开始的，iRow=0表示的是第一行，iCol=0表示的是第一列。
function setHiddenCol(oTable,iCol)
{
    for (var i=0;i < oTable.rows.length ; i++)
    {    
       oTable.rows[i].cells[iCol].style.display="none";
		//如果该列隐藏则让其显示，反之则让其隐藏
		//oTable.rows[i].cells[iCol].style.display=="none"?"block":"none";
    }
}
