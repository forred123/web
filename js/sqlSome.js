/**
 * @author zyx
 */
var uid = 0;
var resultsIndex = 0;
var resultsLen = 0;
var resultBasicStudent;

function sqlSome() {
	sqlBasic();
}

function sqlClass(uid) {
	// 顺序为：出勤次数－请假次数－旷课次数－扣费总额
	var staticResultClass = new Array(0,0,0,0);
	
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
				
				removeRow('sqlClassTable');
				
				if (ret == "0") {
					alert("该学生无上课记录，请核对查询条件！");
				} else {
					info = eval(ret);
					
					appendRowHeaderClass(sqlClassTable);
					
					var i = 0;
					for (var tmp in info) {
						appendRowClass(info[i],i);
						
						if(info[i].attendance=="出勤"){
							staticResultClass[0] += 1;
						}else if(info[i].attendance=="请假"){
							staticResultClass[1] += 1;
						}else if(info[i].attendance=="旷课"){
							staticResultClass[2] += 1;
						}
						
						// 扣费总额
						if(info[i].product=="一对一"){
							staticResultClass[3] += parseInt(info[i].price) * parseInt(info[i].period)/60.0;
						}else if(info[i].product=="班课"){
							staticResultClass[3] += parseInt(info[i].price);	
						}
						
						//staticResultClass[3] += parseInt(info[i].price);
						
						i++;
					}
					
					appendRowStatisticClass(sqlClassTable,staticResultClass);
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求		
	var url = "sqlSome.php";
	url = url + "?sqlClass=1"
			  + "&uid=" + uid.toString()
			  + "&timeStart=" + timeStart
			  + "&timeEnd="+ timeEnd;

	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function sqlFee(uid) {
	// 顺序为：记录条数－总费用－数学费用－语文费用－英语费用－物理费用－化学费用
	var staticResultFee = new Array(0,0,0,0,0,0,0);
	
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
					alert("该学生目前没有费用记录！");
				} else {
					info = eval(ret);
					
					appendRowHeaderFee(info[0],sqlFeeTable);
					
					var i = 0;
					for (var tmp in info) {
						appendRowFee(info[i],i);
						staticResultFee[0]= i+1;
						staticResultFee[1]+= parseInt(info[i].feeSum);// 总额
						staticResultFee[2]+= parseInt(info[i].Math);
						staticResultFee[3]+= parseInt(info[i].Chinese);
						staticResultFee[4]+= parseInt(info[i].English);
						staticResultFee[5]+= parseInt(info[i].Physics);
						staticResultFee[6]+= parseInt(info[i].Chemistry);
						i++;
					}
					
					appendRowStatisticFee(sqlFeeTable,info[0],staticResultFee);
					
					// 查询上课考勤内容 
					sqlClass(uid);
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求		
	var url = "sqlSome.php";
	url = url + "?sqlFee=1"
			  + "&uid=" + uid.toString()
			  + "&timeStart=" + timeStart
			  + "&timeEnd="+ timeEnd;
	
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function sqlBasic() {
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

				removeRow("sqlBasicTable");
				
				if (ret == "0") {
					alert("该学生信息不存在！请核对！");
				} else {
					resultBasicStudent = eval(ret);
					
					// 看是否有重名学生
					resultsLen = 0;
					for(var tmp in resultBasicStudent){
						resultsLen++;
					}
					
					if(resultsLen==1){
						document.getElementsByName("previous")[0].disabled = true;
						document.getElementsByName("next")[0].disabled = true;
					}else if(resultsLen>1){
						alert("查询到有多名同名学生存在，请使用“上一个”“下一个”进行选择！");
						document.getElementsByName("previous")[0].disabled = false;
						document.getElementsByName("next")[0].disabled = false;
					}					
					
					// 载入一个学生信息
					resultsIndex = 0;
					var i = resultsIndex;
					var schoolZoneStr1 = "",schoolZoneStr2 = "",schoolZoneStr3 = "";
					//for (var tmp in resultBasicStudent) {
					uid = resultBasicStudent[i].uid;
					if(resultBasicStudent[i].name2==""){
						appendRowBasic(sqlBasicTable, "学生ID", resultBasicStudent[i].uid,"姓名1", resultBasicStudent[i].name1,"姓名2", "/");
					}else{
						appendRowBasic(sqlBasicTable, "学生ID", resultBasicStudent[i].uid,"姓名1", resultBasicStudent[i].name1,"姓名2", resultBasicStudent[i].name2);
					}
					
					schoolZoneStr1 = resultBasicStudent[i].schoolZone1;
					schoolZoneStr1 = schoolZoneStr1.substring(0,schoolZoneStr1.length-1);
					
					if(resultBasicStudent[i].schoolZone2==""){
						schoolZoneStr2 = "/";
					}else{
						schoolZoneStr2 = resultBasicStudent[i].schoolZone2;
						schoolZoneStr2.substring(0,schoolZoneStr2.length-1);
					}
					if(resultBasicStudent[i].schoolZone3==""){
						schoolZoneStr3 = "/";
					}else{
						schoolZoneStr3 = resultBasicStudent[i].schoolZone3;
						schoolZoneStr3.substring(0,schoolZoneStr3.length-1);
					}
					
					appendRowBasic(sqlBasicTable, "校区1", schoolZoneStr1,"校区2", schoolZoneStr2, "校区3", schoolZoneStr3);
					
					if (resultBasicStudent[i].school2 == "") {
						if (resultBasicStudent[i].sex == "1") {
							appendRowBasic(sqlBasicTable, "性别", "男", "学校1", resultBasicStudent[i].school1, "学校2", "/");
						} else if (resultBasicStudent[i].sex == "2") {
							appendRowBasic(sqlBasicTable, "性别", "女", "学校1", resultBasicStudent[i].school1, "学校2", "/");
						} else {
							appendRowBasic(sqlBasicTable, "性别", "未填写", "学校1", resultBasicStudent[i].school1, "学校2", "/");
						}
					}else{
						if (resultBasicStudent[i].sex == "1") {
							appendRowBasic(sqlBasicTable, "性别", "男", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
						} else if (resultBasicStudent[i].sex == "2") {
							appendRowBasic(sqlBasicTable, "性别", "女", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
						} else {
							appendRowBasic(sqlBasicTable, "性别", "未填写", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
						}
					}
					
					var outTime = dateJS("Y-m-d", resultBasicStudent[i].outTime);
					if(resultBasicStudent[i].outTime==""){
						outTime = "未退学";
					}
									
					appendRowBasic(sqlBasicTable, "年级", resultBasicStudent[i].grade, "班级", resultBasicStudent[i].class,"家庭住址", resultBasicStudent[i].address);
					appendRowBasic(sqlBasicTable, "学生电话", resultBasicStudent[i].studentTel, "学生微信", resultBasicStudent[i].studentWX,"学生QQ", resultBasicStudent[i].studentQQ);
					appendRowBasic(sqlBasicTable, "母亲电话", resultBasicStudent[i].motherTel, "母亲微信", resultBasicStudent[i].motherWX, "报名时间", dateJS("Y-m-d", resultBasicStudent[i].inTime));
					appendRowBasic(sqlBasicTable, "父亲电话", resultBasicStudent[i].fatherTel, "父亲微信", resultBasicStudent[i].fatherWX,"退学时间", outTime);
					
					// 查询费用内容
					sqlFee(resultBasicStudent[i].uid);
					//i++;
					//}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "sqlSome.php";
	
	// 查询学生姓名为空时不能查询
	if (document.getElementsByName('sqlName')[0].value == "") {
		alert("请填写查询姓名先！");
		return;
	}
 
	url = url + "?sqlName=" + encodeURIComponent(document.getElementsByName('sqlName')[0].value);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function recordWithSameName(flag) {
	if (flag == 'next') {
		if(resultsIndex< resultsLen -1){
			resultsIndex++;
		}else{
			alert("已经是最后一位同名学生！");
		}
	} else if (flag == 'previous') {
		if(resultsIndex > 0){
			resultsIndex--;
		}else{
			alert("已经是第一位同名学生！");
		}
	}
	
	removeRow("sqlBasicTable");
	
	// 载入一个学生信息
	var i = resultsIndex;
	var schoolZoneStr1 = "",schoolZoneStr2 = "",schoolZoneStr3 = "";
	//for (var tmp in resultBasicStudent) {
	uid = resultBasicStudent[i].uid;
	if(resultBasicStudent[i].name2==""){
		appendRowBasic(sqlBasicTable, "学生ID", resultBasicStudent[i].uid,"姓名1", resultBasicStudent[i].name1,"姓名2", "/");
	}else{
		appendRowBasic(sqlBasicTable, "学生ID", resultBasicStudent[i].uid,"姓名1", resultBasicStudent[i].name1,"姓名2", resultBasicStudent[i].name2);
	}
	
	schoolZoneStr1 = resultBasicStudent[i].schoolZone1;
	schoolZoneStr1 = schoolZoneStr1.substring(0,schoolZoneStr1.length-1);
	
	if(resultBasicStudent[i].schoolZone2==""){
		schoolZoneStr2 = "/";
	}else{
		schoolZoneStr2 = resultBasicStudent[i].schoolZone2;
		schoolZoneStr2.substring(0,schoolZoneStr2.length-1);
	}
	if(resultBasicStudent[i].schoolZone3==""){
		schoolZoneStr3 = "/";
	}else{
		schoolZoneStr3 = resultBasicStudent[i].schoolZone3;
		schoolZoneStr3.substring(0,schoolZoneStr3.length-1);
	}
	
	appendRowBasic(sqlBasicTable, "校区1", schoolZoneStr1,"校区2", schoolZoneStr2, "校区3", schoolZoneStr3);
	
	if (resultBasicStudent[i].school2 == "") {
		if (resultBasicStudent[i].sex == "1") {
			appendRowBasic(sqlBasicTable, "性别", "男", "学校1", resultBasicStudent[i].school1, "学校2", "/");
		} else if (resultBasicStudent[i].sex == "2") {
			appendRowBasic(sqlBasicTable, "性别", "女", "学校1", resultBasicStudent[i].school1, "学校2", "/");
		} else {
			appendRowBasic(sqlBasicTable, "性别", "未填写", "学校1", resultBasicStudent[i].school1, "学校2", "/");
		}
	}else{
		if (resultBasicStudent[i].sex == "1") {
			appendRowBasic(sqlBasicTable, "性别", "男", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
		} else if (resultBasicStudent[i].sex == "2") {
			appendRowBasic(sqlBasicTable, "性别", "女", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
		} else {
			appendRowBasic(sqlBasicTable, "性别", "未填写", "学校1", resultBasicStudent[i].school1, "学校2", resultBasicStudent[i].school2);
		}
	}

						
	appendRowBasic(sqlBasicTable, "年级", resultBasicStudent[i].grade, "班级", resultBasicStudent[i].class,"/","/");
	appendRowBasic(sqlBasicTable, "学生电话", resultBasicStudent[i].studentTel, "学生微信", resultBasicStudent[i].studentWX,"学生QQ", resultBasicStudent[i].studentQQ);
	appendRowBasic(sqlBasicTable, "母亲电话", resultBasicStudent[i].motherTel, "母亲微信", resultBasicStudent[i].motherWX, "家庭住址", resultBasicStudent[i].address);
	appendRowBasic(sqlBasicTable, "父亲电话", resultBasicStudent[i].fatherTel, "父亲微信", resultBasicStudent[i].fatherWX,"报名时间", dateJS("Y-m-d", resultBasicStudent[i].time));
	
	sqlClass(resultBasicStudent[i].uid);
	
}
// 插入班课查询结果
function appendRowBasic(TableID, colName1, colValue1, colName2, colValue2, colName3, colValue3) {
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
	newTd2.align = 'center';
	newTd4.align = 'center';

	newTd0.innerHTML = colName1;
	newTd1.innerHTML = colValue1;
	newTd2.innerHTML = colName2;
	newTd3.innerHTML = colValue2;
	newTd4.innerHTML = colName3;
	newTd5.innerHTML = colValue3;
	
	// 添加表格样式
	$("#sqlBasicTable tr").mouseover(function(){
		$(this).css("background-color","#e9eaec");
		$(this).css("line-height","49px");
	});
	$("#sqlBasicTable tr").mouseout(function(){
		$(this).css("background-color","");
		$(this).css("line-height","19px");
	});
	$("#sqlBasicTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlBasicTable tr:even").addClass("rowBgColorEven");
}

// 插入查询结果表头
function appendRowHeaderFee(obj,TableID){
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
	
	newTd0.innerHTML = "序号";
	newTd1.innerHTML = "类别";
	newTd2.innerHTML = "收据编号";
	newTd3.innerHTML = "收据票号";
	newTd4.innerHTML = "单页费用";
	newTd5.innerHTML = "记录时间";
	newTd6.innerHTML = "数学产品";
	newTd7.innerHTML = "数学学费";
	newTd8.innerHTML = obj.subFee1Name;
	newTd9.innerHTML = obj.subFee2Name;
	newTd10.innerHTML = obj.subFee3Name;
	newTd11.innerHTML = obj.subFee4Name;
	newTd12.innerHTML = obj.subFee5Name;
	newTd13.innerHTML = "语文产品";
	newTd14.innerHTML = "语文学费";
	newTd15.innerHTML = obj.subFee1Name;
	newTd16.innerHTML = obj.subFee2Name;
	newTd17.innerHTML = obj.subFee3Name;
	newTd18.innerHTML = obj.subFee4Name;
	newTd19.innerHTML = obj.subFee5Name;
	newTd20.innerHTML = "英语产品";
	newTd21.innerHTML = "英语学费";
	newTd22.innerHTML = obj.subFee1Name;
	newTd23.innerHTML = obj.subFee2Name;
	newTd24.innerHTML = obj.subFee3Name;
	newTd25.innerHTML = obj.subFee4Name;
	newTd26.innerHTML = obj.subFee5Name;
	newTd27.innerHTML = "物理产品";
	newTd28.innerHTML = "物理学费";
	newTd29.innerHTML = obj.subFee1Name;
	newTd30.innerHTML = obj.subFee2Name;
	newTd31.innerHTML = obj.subFee3Name;
	newTd32.innerHTML = obj.subFee4Name;
	newTd33.innerHTML = obj.subFee5Name;
	newTd34.innerHTML = "化学产品";
	newTd35.innerHTML = "化学学费";
	newTd36.innerHTML = obj.subFee1Name;
	newTd37.innerHTML = obj.subFee2Name;
	newTd38.innerHTML = obj.subFee3Name;
	newTd39.innerHTML = obj.subFee4Name;
	newTd40.innerHTML = obj.subFee5Name;		
}

// 插入班课表格相关函数
function appendRowFee(obj,index){
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
		
	newTd0.innerHTML = index;
	if(obj.mode=="j"){
		newTd1.innerHTML = "交费";
	}else if(obj.mode=="z"){
		newTd1.innerHTML = "转费";
	}else if(obj.mode=="t"){
		newTd1.innerHTML = "退费";
	}
	newTd2.innerHTML = obj.receiptNum;
	newTd3.innerHTML = obj.billNum;	
	newTd4.innerHTML = obj.feeSum;
	newTd5.innerHTML = dateJS("Y-m-d",obj.time); 
	if(obj.MathProduct==""){
		newTd6.innerHTML = "/";
	}else{
		newTd6.innerHTML = obj.MathProduct;
	}	
	newTd7.innerHTML = obj.Math;
	newTd8.innerHTML = obj.MathSubFee1;
	newTd9.innerHTML = obj.MathSubFee2;
	newTd10.innerHTML = obj.MathSubFee3;
	newTd11.innerHTML = obj.MathSubFee4;
	newTd12.innerHTML = obj.MathSubFee5;
	if(obj.ChineseProduct==""){
		newTd13.innerHTML = "/";
	}else{
		newTd13.innerHTML = obj.ChineseProduct;
	}	
	newTd14.innerHTML = obj.Chinese;
	newTd15.innerHTML = obj.ChineseSubFee1;
	newTd16.innerHTML = obj.ChineseSubFee2;
	newTd17.innerHTML = obj.ChineseSubFee3;
	newTd18.innerHTML = obj.ChineseSubFee4;
	newTd19.innerHTML = obj.ChineseSubFee5;
	if(obj.EnglishProduct==""){
		newTd20.innerHTML = "/";
	}else{
		newTd20.innerHTML = obj.EnglishProduct;
	}	
	newTd21.innerHTML = obj.English;
	newTd22.innerHTML = obj.EnglishSubFee1;
	newTd23.innerHTML = obj.EnglishSubFee2;
	newTd24.innerHTML = obj.EnglishSubFee3;
	newTd25.innerHTML = obj.EnglishSubFee4;
	newTd26.innerHTML = obj.EnglishSubFee5;
	if(obj.PhysicsProduct==""){
		newTd27.innerHTML = "/";
	}else{
		newTd27.innerHTML = obj.PhysicsProduct;
	}	
	newTd28.innerHTML = obj.Physics;
	newTd29.innerHTML = obj.PhysicsSubFee1;
	newTd30.innerHTML = obj.PhysicsSubFee2;
	newTd31.innerHTML = obj.PhysicsSubFee3;
	newTd32.innerHTML = obj.PhysicsSubFee4;
	newTd33.innerHTML = obj.PhysicsSubFee5;
	if(obj.ChemistryProduct==""){
		newTd34.innerHTML = "/";
	}else{
		newTd34.innerHTML = obj.ChemistryProduct;
	}	
	newTd35.innerHTML = obj.Chemistry;
	newTd36.innerHTML = obj.ChemistrySubFee1;
	newTd37.innerHTML = obj.ChemistrySubFee2;
	newTd38.innerHTML = obj.ChemistrySubFee3;
	newTd39.innerHTML = obj.ChemistrySubFee4;
	newTd40.innerHTML = obj.ChemistrySubFee5;
	
	// 对没有的扣费项目进行隐藏，
	if(obj.subFee1Name=="费用1"){
		setHiddenCol(sqlFeeTable,8);
		setHiddenCol(sqlFeeTable,15);
		setHiddenCol(sqlFeeTable,22);
		setHiddenCol(sqlFeeTable,29);
		setHiddenCol(sqlFeeTable,26);
	}
	if(obj.subFee2Name=="费用2"){
		setHiddenCol(sqlFeeTable,9);
		setHiddenCol(sqlFeeTable,16);
		setHiddenCol(sqlFeeTable,23);
		setHiddenCol(sqlFeeTable,30);
		setHiddenCol(sqlFeeTable,37);
	}
	if(obj.subFee3Name=="费用3"){
		setHiddenCol(sqlFeeTable,10);
		setHiddenCol(sqlFeeTable,17);
		setHiddenCol(sqlFeeTable,24);
		setHiddenCol(sqlFeeTable,31);
		setHiddenCol(sqlFeeTable,38);
	}
	if(obj.subFee4Name=="费用4"){
		setHiddenCol(sqlFeeTable,11);
		setHiddenCol(sqlFeeTable,18);
		setHiddenCol(sqlFeeTable,25);
		setHiddenCol(sqlFeeTable,32);
		setHiddenCol(sqlFeeTable,39);
	}
	if(obj.subFee5Name=="费用5"){
		setHiddenCol(sqlFeeTable,12);
		setHiddenCol(sqlFeeTable,19);
		setHiddenCol(sqlFeeTable,26);
		setHiddenCol(sqlFeeTable,33);
		setHiddenCol(sqlFeeTable,40);
	}
	
	// 科目
	/*
	if(obj.MathProduct==""){
		for(var i=6;i<=12;i++){
			setHiddenCol(sqlFeeTable,i);
		}
	}
	if(obj.ChinsesProduct==""){
		for(var i=13;i<=19;i++){
			setHiddenCol(sqlFeeTable,i);
		}
	}
	if(obj.EnglishProduct==""){
		for(var i=20;i<=26;i++){
			setHiddenCol(sqlFeeTable,i);
		}
	}
	if(obj.PhysicsProduct==""){
		for(var i=27;i<=33;i++){
			setHiddenCol(sqlFeeTable,i);
		}
	}
	if(obj.ChemistryProduct==""){
		for(var i=34;i<=40;i++){
			setHiddenCol(sqlFeeTable,i);
		}
	}	
	*/
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

//插入查询统计结果
function appendRowStatisticFee(TableID,obj,data){
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
	
	newTd0.innerHTML = "统计结果";
	newTd1.innerHTML = "费用次数";
	newTd2.innerHTML = data[0];
	newTd3.innerHTML = "费用总额";
	newTd4.innerHTML = data[1];
	newTd5.innerHTML = "";
	newTd6.innerHTML = "数学费用";
	newTd7.innerHTML = data[2];
	newTd8.innerHTML = "";
	newTd9.innerHTML = "";
	newTd10.innerHTML = "";
	newTd11.innerHTML = "";
	newTd12.innerHTML = "";
	newTd13.innerHTML = "语文费用";
	newTd14.innerHTML = data[3];
	newTd15.innerHTML = "";
	newTd16.innerHTML = "";
	newTd17.innerHTML = "";
	newTd18.innerHTML = "";
	newTd19.innerHTML = "";
	newTd20.innerHTML = "英语费用";
	newTd21.innerHTML = data[4];
	newTd22.innerHTML = "";
	newTd23.innerHTML = "";
	newTd24.innerHTML = "";
	newTd25.innerHTML = "";
	newTd26.innerHTML = "";
	newTd27.innerHTML = "物理费用";
	newTd28.innerHTML = data[5];
	newTd29.innerHTML = "";
	newTd30.innerHTML = "";
	newTd31.innerHTML = "";
	newTd32.innerHTML = "";
	newTd33.innerHTML = "";
	newTd34.innerHTML = "化学费用";
	newTd35.innerHTML = data[6];
	newTd36.innerHTML = "";
	newTd37.innerHTML = "";
	newTd38.innerHTML = "";
	newTd39.innerHTML = "";
	newTd40.innerHTML = "";	
	
	// 对没有的扣费项目进行隐藏，与appendRowFee中的一致
	if(obj.subFee1Name=="费用1"){
		setHiddenCol(sqlFeeTable,8);
		setHiddenCol(sqlFeeTable,15);
		setHiddenCol(sqlFeeTable,22);
		setHiddenCol(sqlFeeTable,29);
		setHiddenCol(sqlFeeTable,26);
	}
	if(obj.subFee2Name=="费用2"){
		setHiddenCol(sqlFeeTable,9);
		setHiddenCol(sqlFeeTable,16);
		setHiddenCol(sqlFeeTable,23);
		setHiddenCol(sqlFeeTable,30);
		setHiddenCol(sqlFeeTable,37);
	}
	if(obj.subFee3Name=="费用3"){
		setHiddenCol(sqlFeeTable,10);
		setHiddenCol(sqlFeeTable,17);
		setHiddenCol(sqlFeeTable,24);
		setHiddenCol(sqlFeeTable,31);
		setHiddenCol(sqlFeeTable,38);
	}
	if(obj.subFee4Name=="费用4"){
		setHiddenCol(sqlFeeTable,11);
		setHiddenCol(sqlFeeTable,18);
		setHiddenCol(sqlFeeTable,25);
		setHiddenCol(sqlFeeTable,32);
		setHiddenCol(sqlFeeTable,39);
	}
	if(obj.subFee5Name=="费用5"){
		setHiddenCol(sqlFeeTable,12);
		setHiddenCol(sqlFeeTable,19);
		setHiddenCol(sqlFeeTable,26);
		setHiddenCol(sqlFeeTable,33);
		setHiddenCol(sqlFeeTable,40);
	}
}

function appendRowHeaderClass(TableID){
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
	
	newTd0.innerHTML = "序号";
	newTd1.innerHTML = "科目";
	newTd2.innerHTML = "产品";
	newTd3.innerHTML = "教师";
	newTd4.innerHTML = "班级";
	newTd5.innerHTML = "上课日期";
	newTd6.innerHTML = "上课时间";
	newTd7.innerHTML = "考勤";
	newTd8.innerHTML = "缺勤原因";
	newTd9.innerHTML = "扣费";
}

function appendRowClass(obj,i){
	var coursetmp = "";
	// 添加一行
	var newTr = sqlClassTable.insertRow(-1);
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
	
	newTd0.innerHTML = (i+1).toString();
	if(obj.subFeeCourse=="1"){
		coursetmp = "数学";
	}else if(obj.subFeeCourse=="2"){
		coursetmp = "语文";
	}else if(obj.subFeeCourse=="3"){
		coursetmp = "英语";
	}else if(obj.subFeeCourse=="4"){
		coursetmp = "物理";
	}else if(obj.subFeeCourse=="5"){
		coursetmp = "化学";
	}
	
	newTd1.innerHTML = coursetmp;
	newTd2.innerHTML = obj.product;
	newTd3.innerHTML = obj.teacher;
	newTd4.innerHTML = obj.className;
	newTd5.innerHTML = dateJS("Y-M-d", obj.attandenceTime);
	newTd6.innerHTML = dateJS("H:i", obj.attandenceTime).toString()+"~"+dateJS("H:i",parseInt(obj.attandenceTime)+parseInt(obj.period*60)).toString();
	newTd7.innerHTML = obj.attendance;
	if(obj.notAttendanceReason==""){
		newTd8.innerHTML = "/";
	}else{
		newTd8.innerHTML = obj.notAttendanceReason;
	}
	if(obj.product=="一对一"){
		newTd9.innerHTML = parseInt(obj.price) * parseInt(obj.period)/60.0;
	}else if(obj.product=="班课"){
		newTd9.innerHTML = obj.price;	
	}
	
	
	// 添加表格样式
	$("#sqlClassTable tr").mouseover(function(){
		$(this).css("background-color","#e9eaec");
		$(this).css("line-height","49px");
	});
	$("#sqlClassTable tr").mouseout(function(){
		$(this).css("background-color","");
		$(this).css("line-height","19px");
	});
	$("#sqlClassTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlClassTable tr:even").addClass("rowBgColorEven");
}

function appendRowStatisticClass(TableID,data){
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
	
	newTd0.innerHTML = "统计结果";
	newTd1.innerHTML = "";
	newTd2.innerHTML = "出勤次数";
	newTd3.innerHTML = data[0];
	newTd4.innerHTML = "请假次数";
	newTd5.innerHTML = data[1];
	newTd6.innerHTML = "旷课次数";
	newTd7.innerHTML = data[2];
	newTd8.innerHTML = "扣费总额";
	newTd9.innerHTML = data[3];
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

function GetCookie(sName) {
	var aCookie = document.cookie.split("; ");
	for (var i = 0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
			return unescape(aCrumb[1]);
	}
	return null;
}

// 页面初始化
function initPage() {
	// 默认填写当前日期
	document.getElementsByName("timeStart")[0].value = getYear0FormatDate();
	document.getElementsByName("timeEnd")[0].value = getNowFormatDate();

	// 如果是学生自动填充姓名，然后自动查询
	if (GetCookie('role') == '0') {
		document.getElementsByName("sqlName")[0].value = decodeURIComponent(GetCookie('userName'));
		document.getElementsByName("sqlName")[0].disabled = 'true';
		sqlSome();
	}
	
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

function showTable(flag){
	if(flag==1){
		document.getElementById("sqlBasicTable").style.display = '';
		document.getElementById("sqlClassTable").style.display = 'none';
		document.getElementById("sqlFeeTable").style.display = 'none';
	}
	if(flag==2){
		document.getElementById("sqlBasicTable").style.display = 'none';
		document.getElementById("sqlClassTable").style.display = '';
		document.getElementById("sqlFeeTable").style.display = 'none';
	}
	if(flag==3){
		document.getElementById("sqlBasicTable").style.display = 'none';
		document.getElementById("sqlClassTable").style.display = 'none';
		document.getElementById("sqlFeeTable").style.display = 'block';
	}
	if(flag==4){
		document.getElementById("sqlBasicTable").style.display = '';
		document.getElementById("sqlClassTable").style.display = '';
		document.getElementById("sqlFeeTable").style.display = 'block';
	}
}

// 导出表格到CSV
function exportToCSVsqlSome(aLink){
	// var str = "栏位1,栏位2,栏位3\n值1,值2,值3";
	//var str = "报表类型,一对一查询,";
	var str = GetInfoFromTableSqlSome();
	str = encodeURIComponent(str);
	aLink.href = "data:text/csv;charset=utf-8,\ufeff" + str;
}

// 获得整个表格的具体内容并返回字符串
function GetInfoFromTableSqlSome(tableid){
    var tableInfo = "";
    var strtmp="";
    var tableObj = document.getElementById("sqlBasicTable");
    
    // 基本信息表1
    for (var i = 0; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
        for (var j = 0; j < tableObj.rows[i].cells.length; j++) {   //遍历Row中的每一列
        	strtmp = tableObj.rows[i].cells[j].innerHTML;
        	
            tableInfo += strtmp;   //获取Table中单元格的内容
           
            tableInfo += ",";
        }
        
        // 一行结束后要加换行，否则表格不换行
        tableInfo += "\n";
    }
    tableInfo += "\n";
    
    // 考勤记录表2
    tableObj = document.getElementById("sqlClassTable");
    for (var i = 0; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
        for (var j = 0; j < tableObj.rows[i].cells.length; j++) {   //遍历Row中的每一列
        	strtmp = tableObj.rows[i].cells[j].innerHTML;
        	
            tableInfo += strtmp;   //获取Table中单元格的内容
           
            tableInfo += ",";
        }
        
        // 一行结束后要加换行，否则表格不换行
        tableInfo += "\n";
    }
    tableInfo += "\n";
    
    // 费用表3
    /*
    tableObj = document.getElementById("sqlFeeTable");
    for (var i = 0; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
        for (var j = 0; j < tableObj.rows[i].cells.length; j++) {   //遍历Row中的每一列
        	strtmp = tableObj.rows[i].cells[j].innerHTML;
        	
            tableInfo += strtmp;   //获取Table中单元格的内容
           
            tableInfo += ",";
        }
        
        // 一行结束后要加换行，否则表格不换行
        tableInfo += "\n";
    }
    */
   
    var str = GetInfoFromTableFee("sqlFeeTable");
    tableInfo += str;
    //alert(tableInfo);
    return tableInfo;
}

// 获得非隐藏列的费用表格内容
function GetInfoFromTableFee(tableid){
    var tableInfo = "";
    var strtmp="";
    var str;
    var index = new Array();
    var k = -1;
    var flagInArray = 0;
    var tableObj = document.getElementById(tableid);
    
    // 获得隐藏列的列号保存到index数组中
    for (var i = 0; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
        for (var j = 0; j < tableObj.rows[i].cells.length; j++) {   //遍历Row中的每一列
        	str = tableObj.rows[i].cells[j].innerHTML;
        	if((str.indexOf("费用1")==-1)&&(str.indexOf("费用2")==-1)&&(str.indexOf("费用3")==-1)&&(str.indexOf("费用4")==-1)&&(str.indexOf("费用5")==-1)){
        		        		    		
        	}else{        		
        		k = k+1;
           		index[k] = j;
        	} 
        }
	}

	// 真正遍历table当遇到index中的列时不取其内容，即获得非隐藏列的表格内容
	for (var i = 0; i < tableObj.rows.length; i++) {//遍历Table的所有Row
		for (var j = 0; j < tableObj.rows[i].cells.length; j++) {//遍历Row中的每一列
			flagInArray = 0;
			for(var a=0;a<=k;a++){
				if(j==index[a]){
					flagInArray = 1;
					break;
				}	
			}
			
			if(flagInArray==0){
				strtmp = tableObj.rows[i].cells[j].innerHTML;

				tableInfo += strtmp;
				//获取Table中单元格的内容
	
				tableInfo += ",";
			}		
		}

		// 一行结束后要加换行，否则表格不换行
		tableInfo += "\n";
	}
	// alert(index);
	//alert(tableInfo);
	return tableInfo;
	}