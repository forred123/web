/**
 * @author zyx
 */

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
					alert("不存在校区信息，请在后台管理中设置校长设置！");
				} else {
					info = eval(ret);
						
					appendRowHeader(sqlSetTable);
					
					var i = 0;
					for (var tmp in info) {
						appendRow(info[i],i);
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
	newTd49.align='center';
	newTd50.align='center';
	newTd51.align='center';
	newTd52.align='center';
	newTd53.align='center';
	newTd54.align='center';
	newTd55.align='center';
	newTd56.align='center';
	newTd57.align='center';
	
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
	newTd14.innerHTML = "年级1";
	newTd15.innerHTML = "年级2";
	newTd16.innerHTML = "年级3";
	newTd17.innerHTML = "年级4";
	newTd18.innerHTML = "年级5";
	newTd19.innerHTML = "年级6";
	newTd20.innerHTML = "扣费项目1";
	newTd21.innerHTML = "扣费项目2";
	newTd22.innerHTML = "扣费项目3";
	newTd23.innerHTML = "扣费项目4";
	newTd24.innerHTML = "扣费项目5";
	newTd25.innerHTML = "班课单价初一";
	newTd26.innerHTML = "初二";
	newTd27.innerHTML = "初三";
	newTd28.innerHTML = "高一";
	newTd29.innerHTML = "高二";
	newTd30.innerHTML = "高三";
	newTd31.innerHTML = "一对一单价时间1";
	newTd32.innerHTML = "一对一单价时间2";
	newTd33.innerHTML = "初一1";
	newTd34.innerHTML = "初一2";
	newTd35.innerHTML = "初一3";
	newTd36.innerHTML = "初一单小时工资";	
	newTd37.innerHTML = "初二1";
	newTd38.innerHTML = "初二2";
	newTd39.innerHTML = "初二3";
	newTd40.innerHTML = "初二单小时工资";
	newTd41.innerHTML = "初三1";
	newTd42.innerHTML = "初三2";
	newTd43.innerHTML = "初三3";
	newTd44.innerHTML = "初三单小时工资";
	newTd45.innerHTML = "高一1";
	newTd46.innerHTML = "高一2";
	newTd47.innerHTML = "高一3";
	newTd48.innerHTML = "高一单小时工资";
	newTd49.innerHTML = "高二1";
	newTd50.innerHTML = "高二2";
	newTd51.innerHTML = "高二3";
	newTd52.innerHTML = "高二单小时工资";
	newTd53.innerHTML = "高三1";
	newTd54.innerHTML = "高三2";
	newTd55.innerHTML = "高三3";
	newTd56.innerHTML = "高三单小时工资";
	newTd57.innerHTML = "设置时间";
}

// 插入班课表格相关函数
function appendRow(obj,index){
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
	newTd49.align='center';
	newTd50.align='center';
	newTd51.align='center';
	newTd52.align='center';
	newTd53.align='center';
	newTd54.align='center';
	newTd55.align='center';
	newTd56.align='center';
	newTd57.align='center';
		
	newTd0.innerHTML = index;
	newTd1.innerHTML = obj.id;
	newTd2.innerHTML = obj.schoolZone;
	newTd3.innerHTML = obj.assistant;
	if(obj.product1 != ""){
		newTd4.innerHTML = obj.product1;
	}else{
		newTd4.innerHTML = "/";
	}
	if(obj.product2 != ""){
		newTd5.innerHTML = obj.product2;
	}else{
		newTd5.innerHTML = "/";
	}	

	if(obj.product3 != ""){
		newTd6.innerHTML = obj.product3;
	}else{
		newTd6.innerHTML = "/";
	}	

	if(obj.product4 != ""){
		newTd7.innerHTML = obj.product4;
	}else{
		newTd7.innerHTML = "/";
	}	

	if(obj.product5 != ""){
		newTd8.innerHTML = obj.product5;
	}else{
		newTd8.innerHTML = "/";
	}	

	if(obj.course1 == "on"){
		newTd9.innerHTML = "数学";
	}else{
		newTd9.innerHTML = "/";
	}	
	if(obj.course2 == "on"){
		newTd10.innerHTML = "语文";
	}else{
		newTd10.innerHTML = "/";
	}	
	if(obj.course3 == "on"){
		newTd11.innerHTML = "英语";
	}else{
		newTd11.innerHTML = "/";
	}		
	if(obj.course4 == "on"){
		newTd12.innerHTML = "物理";
	}else{
		newTd12.innerHTML = "/";
	}	
	if(obj.course5 == "on"){
		newTd13.innerHTML = "化学";
	}else{
		newTd13.innerHTML = "/";
	}
		
	if(obj.grade7 == "on"){
		newTd14.innerHTML = "初一";
	}else{
		newTd14.innerHTML = "/";
	}	
	if(obj.grade8 == "on"){
		newTd15.innerHTML = "初二";
	}else{
		newTd15.innerHTML = "/";
	}	
	if(obj.grade9 == "on"){
		newTd16.innerHTML = "初三";
	}else{
		newTd16.innerHTML = "/";
	}	
	if(obj.grade10 == "on"){
		newTd17.innerHTML = "高一";
	}else{
		newTd17.innerHTML = "/";
	}	
	if(obj.grade11 == "on"){
		newTd18.innerHTML = "高二";
	}else{
		newTd18.innerHTML = "/";
	}	
	if(obj.grade12 == "on"){
		newTd19.innerHTML = "高三";
	}else{
		newTd19.innerHTML = "/";
	}	
	if(obj.subFeeItem1 != ""){
		newTd20.innerHTML = obj.subFeeItem1;
	}else{
		newTd20.innerHTML = "/";
	}
	if(obj.subFeeItem2 != ""){
		newTd21.innerHTML = obj.subFeeItem2;
	}else{
		newTd21.innerHTML = "/";
	}
	if(obj.subFeeItem3 != ""){
		newTd22.innerHTML = obj.subFeeItem3;
	}else{
		newTd22.innerHTML = "/";
	}
	if(obj.subFeeItem4 != ""){
		newTd23.innerHTML = obj.subFeeItem4;
	}else{
		newTd23.innerHTML = "/";
	}
	if(obj.subFeeItem5 != ""){
		newTd24.innerHTML = obj.subFeeItem5;
	}else{
		newTd24.innerHTML = "/";
	}	
	newTd25.innerHTML = obj.priceBKgrade7;
	newTd26.innerHTML = obj.priceBKgrade8;
	newTd27.innerHTML = obj.priceBKgrade9;
	newTd28.innerHTML = obj.priceBKgrade10;
	newTd29.innerHTML = obj.priceBKgrade11;
	newTd30.innerHTML = obj.priceBKgrade12;
	newTd31.innerHTML = obj.hour1;
	newTd32.innerHTML = obj.hour2;
	newTd33.innerHTML = obj.price7hour1YDY;
	newTd34.innerHTML = obj.price7hour2YDY;
	newTd35.innerHTML = obj.price7hour3YDY;
	newTd36.innerHTML = obj.pay7;	
	newTd37.innerHTML = obj.price8hour1YDY;
	newTd38.innerHTML = obj.price8hour2YDY;
	newTd39.innerHTML = obj.price8hour3YDY;
	newTd40.innerHTML = obj.pay8;
	newTd41.innerHTML = obj.price9hour1YDY;
	newTd42.innerHTML = obj.price9hour2YDY;
	newTd43.innerHTML = obj.price9hour3YDY;
	newTd44.innerHTML = obj.pay9;
	newTd45.innerHTML = obj.price10hour1YDY;
	newTd46.innerHTML = obj.price10hour2YDY;
	newTd47.innerHTML = obj.price10hour3YDY;
	newTd48.innerHTML = obj.pay10;
	newTd49.innerHTML = obj.price11hour1YDY;
	newTd50.innerHTML = obj.price11hour2YDY;
	newTd51.innerHTML = obj.price11hour3YDY;
	newTd52.innerHTML = obj.pay11;
	newTd53.innerHTML = obj.price12hour1YDY;
	newTd54.innerHTML = obj.price12hour2YDY;
	newTd55.innerHTML = obj.price12hour3YDY;
	newTd56.innerHTML = obj.pay12;
	newTd57.innerHTML = dateJS("Y-m-d",obj.time);
	
	// 添加表格样式
	$("#sqlSetTable tr").mouseover(function(){
		$(this).css("background-color","#e9eaec");
		$(this).css("line-height","49px");
	});
	$("#sqlSetTable tr").mouseout(function(){
		$(this).css("background-color","");
		$(this).css("line-height","19px");
	});
	$("#sqlSetTable tr:odd").addClass("rowBgColorOdd");
	$("#sqlSetTable tr:even").addClass("rowBgColorEven");
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