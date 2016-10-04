/**
 * @author zyx
 */

var objRecordAddFee;
var lenRecordAddFee = 0;
var indexRecordAddFee = 0;
var remainFeeSum = 0;
var maxCourseNum = 10;
var courseLoad = new Array();

// product[1][2],第一维为数学语文等学科标志，第二维为数学语文等学科对应的产品名称
// 用于转费和退费中载入产品类型
var product = new Array();
var i=0;
for(i=0;i<5;i++){
	product[i] = new Array();
}

// 表单提交前进行了校验工作，如果校验通过才提交
function checkAndSubmit() {
	// 隐藏域，学生转费为z,学生退费为t,学生交费为j。删除是根据ID和日期决定的，
	// 转费
	if (document.getElementsByName("submitBtnType")[0].value == "z") {
		var feeFrom = document.getElementsByName("feeFrom")[0].value;
		var feeTo = document.getElementsByName("feeTo")[0].value;
		
		if((feeFrom==0)||(feeTo==0)){
			alert("请选择转费科目先！");
			return false;
		}

		if (confirm('请确认填写的转费内容正确再提交！\n\n确认要提交转费操作吗？')) {
			return true;
		} else {
			return false;
		}
	}
	
	// 退费
	if (document.getElementsByName("submitBtnType")[0].value == "t") {
		var pass = false;
		var remainFee = 0;
		var remainFeeTrue = 0;
		
		if(typeof(document.getElementsByName('remainFee1CheckBox')[0])!="undefined"){
			if(document.getElementsByName('remainFee1CheckBox')[0].checked){
				remainFee = parseFloat(document.getElementsByName('remainFee1')[0].value);
				remainFeeTrue = parseFloat(document.getElementsByName('remainFee1Hide')[0].value);

				// 退余额不能超过真正剩的余额
				if (remainFee > remainFeeTrue) {
					alert("数学退费金额不能超过实际余额" + document.getElementsByName('remainFee1Hide')[0].value);
					return false;
				} else {
					pass = true;
				}
			}
		}
		
		if(typeof(document.getElementsByName('remainFee2CheckBox')[0])!="undefined"){
			if(document.getElementsByName('remainFee2CheckBox')[0].checked){
				remainFee = parseFloat(document.getElementsByName('remainFee2')[0].value);
				remainFeeTrue = parseFloat(document.getElementsByName('remainFee2Hide')[0].value);

				// 退余额不能超过真正剩的余额
				if (remainFee > remainFeeTrue) {
					alert("语文退费金额不能超过实际余额" + document.getElementsByName('remainFee2Hide')[0].value);
					return false;
				} else {
					pass = true;
				}
			}
		}
		
		if(typeof(document.getElementsByName('remainFee3CheckBox')[0])!="undefined"){
			if(document.getElementsByName('remainFee3CheckBox')[0].checked){
				remainFee = parseFloat(document.getElementsByName('remainFee3')[0].value);
				remainFeeTrue = parseFloat(document.getElementsByName('remainFee3Hide')[0].value);

				// 退余额不能超过真正剩的余额
				if (remainFee > remainFeeTrue) {
					alert("英语退费金额不能超过实际余额" + document.getElementsByName('remainFee3Hide')[0].value);
					return false;
				} else {
					pass = true;
				}
			}
		}
		
		if(typeof(document.getElementsByName('remainFee4CheckBox')[0])!="undefined"){
			if(document.getElementsByName('remainFee4CheckBox')[0].checked){
				remainFee = parseFloat(document.getElementsByName('remainFee4')[0].value);
				remainFeeTrue = parseFloat(document.getElementsByName('remainFee4Hide')[0].value);

				// 退余额不能超过真正剩的余额
				if (remainFee > remainFeeTrue) {
					alert("物理退费金额不能超过实际余额" + document.getElementsByName('remainFee4Hide')[0].value);
					return false;
				} else {
					pass = true;
				}
			}
		}
		
		if(typeof(document.getElementsByName('remainFee5CheckBox')[0])!="undefined"){
			if(document.getElementsByName('remainFee5CheckBox')[0].checked){
				remainFee = parseFloat(document.getElementsByName('remainFee5')[0].value);
				remainFeeTrue = parseFloat(document.getElementsByName('remainFee5Hide')[0].value);

				// 退余额不能超过真正剩的余额
				if (remainFee > remainFeeTrue) {
					alert("化学退费金额不能超过实际余额" + document.getElementsByName('remainFee5Hide')[0].value);
					return false;
				} else {
					pass = true;
				}
			}
		}

		if(pass==true){
			if (confirm('请确认填写的退费内容正确再提交！\n\n确认要提交退费操作吗？')) {
				return true;
			} else {
				return false;
			}
		}else{
			alert("至少选择一个退费科目才能完成退费操作！");
			return false;
		}
	}
	
	// 交费
	if (document.getElementsByName("submitBtnType")[0].value == "j") {
		var feeSum = parseInt(document.getElementsByName("feeSum")[0].value);

		var course1 = 0;
		if (document.getElementsByName("course1")[0]) {
			if (document.getElementsByName("course1")[0].value != "") {
				course1 = parseInt(document.getElementsByName("course1")[0].value);
			}
		}

		var course1SubFee1 = 0;
		if (document.getElementsByName("course1SubFee1")[0]) {
			if (document.getElementsByName("course1SubFee1")[0].value != "") {
				course1SubFee1 = parseInt(document.getElementsByName("course1SubFee1")[0].value);
			}
		}
		var course1SubFee2 = 0;
		if (document.getElementsByName("course1SubFee2")[0]) {
			if (document.getElementsByName("course1SubFee2")[0].value != "") {
				course1SubFee2 = parseInt(document.getElementsByName("course1SubFee2")[0].value);
			}
		}
		var course1SubFee3 = 0;
		if (document.getElementsByName("course1SubFee3")[0]) {
			if (document.getElementsByName("course1SubFee3")[0].value != "") {
				course1SubFee3 = parseInt(document.getElementsByName("course1SubFee3")[0].value);
			}
		}
		var course1SubFee4 = 0;
		if (document.getElementsByName("course1SubFee4")[0]) {
			if (document.getElementsByName("course1SubFee4")[0].value != "") {
				course1SubFee4 = parseInt(document.getElementsByName("course1SubFee4")[0].value);
			}
		}
		var course1SubFee5 = 0;
		if (document.getElementsByName("course1SubFee5")[0]) {
			if (document.getElementsByName("course1SubFee5")[0].value != "") {
				course1SubFee5 = parseInt(document.getElementsByName("course1SubFee5")[0].value);
			}
		}
		var course2 = 0;
		if (document.getElementsByName("course2")[0]) {
			if (document.getElementsByName("course2")[0].value != "") {
				course2 = parseInt(document.getElementsByName("course2")[0].value);
			}
		}
		var course2SubFee1 = 0;
		if (document.getElementsByName("course2SubFee1")[0]) {
			if (document.getElementsByName("course2SubFee1")[0].value != "") {
				course2SubFee1 = parseInt(document.getElementsByName("course2SubFee1")[0].value);
			}
		}
		var course2SubFee2 = 0;
		if (document.getElementsByName("course2SubFee2")[0]) {
			if (document.getElementsByName("course2SubFee2")[0].value != "") {
				course2SubFee2 = parseInt(document.getElementsByName("course2SubFee2")[0].value);
			}
		}
		var course2SubFee3 = 0;
		if (document.getElementsByName("course2SubFee3")[0]) {
			if (document.getElementsByName("course2SubFee3")[0].value != "") {
				course2SubFee3 = parseInt(document.getElementsByName("course2SubFee3")[0].value);
			}
		}
		var course2SubFee4 = 0;
		if (document.getElementsByName("Chicourse2SubFee4")[0]) {
			if (document.getElementsByName("course2SubFee4")[0].value != "") {
				course2SubFee4 = parseInt(document.getElementsByName("course2SubFee4")[0].value);
			}
		}
		var course2SubFee5 = 0;
		if (document.getElementsByName("course2SubFee5")[0]) {
			if (document.getElementsByName("course2SubFee5")[0].value != "") {
				course2SubFee5 = parseInt(document.getElementsByName("course2SubFee5")[0].value);
			}
		}
		var course3 = 0;
		if (document.getElementsByName("course3")[0]) {
			if (document.getElementsByName("course3")[0].value != "") {
				course3 = parseInt(document.getElementsByName("course3")[0].value);
			}
		}
		var course3SubFee1 = 0;
		if (document.getElementsByName("course3SubFee1")[0]) {
			if (document.getElementsByName("course3SubFee1")[0].value != "") {
				course3SubFee1 = parseInt(document.getElementsByName("course3SubFee1")[0].value);
			}
		}
		var course3SubFee2 = 0;
		if (document.getElementsByName("course3SubFee2")[0]) {
			if (document.getElementsByName("course3SubFee2")[0].value != "") {
				course3SubFee2 = parseInt(document.getElementsByName("course3SubFee2")[0].value);
			}
		}
		var course3SubFee3 = 0;
		if (document.getElementsByName("course3SubFee3")[0]) {
			if (document.getElementsByName("course3SubFee3")[0].value != "") {
				course3SubFee3 = parseInt(document.getElementsByName("course3SubFee3")[0].value);
			}
		}
		var course3SubFee4 = 0;
		if (document.getElementsByName("course3SubFee4")[0]) {
			if (document.getElementsByName("course3SubFee4")[0].value != "") {
				course3SubFee4 = parseInt(document.getElementsByName("course3SubFee4")[0].value);
			}
		}
		var course3SubFee5 = 0;
		if (document.getElementsByName("course3SubFee5")[0]) {
			if (document.getElementsByName("course3SubFee5")[0].value != "") {
				course3SubFee5 = parseInt(document.getElementsByName("course3SubFee5")[0].value);
			}
		}
		var course4 = 0;
		if (document.getElementsByName("course4")[0]) {
			if (document.getElementsByName("course4")[0].value != "") {
				course4 = parseInt(document.getElementsByName("course4")[0].value);
			}
		}
		var course4SubFee1 = 0;
		if (document.getElementsByName("course4SubFee1")[0]) {
			if (document.getElementsByName("course4SubFee1")[0].value != "") {
				course4SubFee1 = parseInt(document.getElementsByName("course4SubFee1")[0].value);
			}
		}
		var course4SubFee2 = 0;
		if (document.getElementsByName("course4SubFee2")[0]) {
			if (document.getElementsByName("course4SubFee2")[0].value != "") {
				course4SubFee2 = parseInt(document.getElementsByName("course4SubFee2")[0].value);
			}
		}
		var course4SubFee3 = 0;
		if (document.getElementsByName("course4SubFee3")[0]) {
			if (document.getElementsByName("course4SubFee3")[0].value != "") {
				course4SubFee3 = parseInt(document.getElementsByName("course4SubFee3")[0].value);
			}
		}
		var course4SubFee4 = 0;
		if (document.getElementsByName("course4SubFee4")[0]) {
			if (document.getElementsByName("course4SubFee4")[0].value != "") {
				course4SubFee4 = parseInt(document.getElementsByName("course4SubFee4")[0].value);
			}
		}
		var course4SubFee5 = 0;
		if (document.getElementsByName("course4SubFee5")[0]) {
			if (document.getElementsByName("course4SubFee5")[0].value != "") {
				course4SubFee5 = parseInt(document.getElementsByName("course4SubFee5")[0].value);
			}
		}
		var course5 = 0;
		if (document.getElementsByName("course5")[0]) {
			if (document.getElementsByName("course5")[0].value != "") {
				course5 = parseInt(document.getElementsByName("course5")[0].value);
			}
		}
		var course5SubFee1 = 0;
		if (document.getElementsByName("course5SubFee1")[0]) {
			if (document.getElementsByName("course5SubFee1")[0].value != "") {
				course5SubFee1 = parseInt(document.getElementsByName("course5SubFee1")[0].value);
			}
		}
		var course5SubFee2 = 0;
		if (document.getElementsByName("course5SubFee2")[0]) {
			if (document.getElementsByName("course5SubFee2")[0].value != "") {
				course5SubFee2 = parseInt(document.getElementsByName("course5SubFee2")[0].value);
			}
		}
		var course5SubFee3 = 0;
		if (document.getElementsByName("course5SubFee3")[0]) {
			if (document.getElementsByName("course5SubFee3")[0].value != "") {
				course5SubFee3 = parseInt(document.getElementsByName("course5SubFee3")[0].value);
			}
		}
		var course5SubFee4 = 0;
		if (document.getElementsByName("course5SubFee4")[0]) {
			if (document.getElementsByName("course5SubFee4")[0].value != "") {
				course5SubFee4 = parseInt(document.getElementsByName("course5SubFee4")[0].value);
			}
		}
		var course5SubFee5 = 0;
		if (document.getElementsByName("course5SubFee5")[0]) {
			if (document.getElementsByName("course5SubFee5")[0].value != "") {
				course5SubFee5 = parseInt(document.getElementsByName("course5SubFee5")[0].value);
			}
		}
		
		var course6 = 0;
		if (document.getElementsByName("course6")[0]) {
			if (document.getElementsByName("course6")[0].value != "") {
				course6 = parseInt(document.getElementsByName("course6")[0].value);
			}
		}
		var course6SubFee1 = 0;
		if (document.getElementsByName("course6SubFee1")[0]) {
			if (document.getElementsByName("course6SubFee1")[0].value != "") {
				course6SubFee1 = parseInt(document.getElementsByName("course6SubFee1")[0].value);
			}
		}
		var course6SubFee2 = 0;
		if (document.getElementsByName("course6SubFee2")[0]) {
			if (document.getElementsByName("course6SubFee2")[0].value != "") {
				course6SubFee2 = parseInt(document.getElementsByName("course6SubFee2")[0].value);
			}
		}
		var course6SubFee3 = 0;
		if (document.getElementsByName("course6SubFee3")[0]) {
			if (document.getElementsByName("course6SubFee3")[0].value != "") {
				course6SubFee3 = parseInt(document.getElementsByName("course6SubFee3")[0].value);
			}
		}
		var course6SubFee4 = 0;
		if (document.getElementsByName("course6SubFee4")[0]) {
			if (document.getElementsByName("course6SubFee4")[0].value != "") {
				course6SubFee4 = parseInt(document.getElementsByName("course6SubFee4")[0].value);
			}
		}
		var course6SubFee5 = 0;
		if (document.getElementsByName("course6SubFee5")[0]) {
			if (document.getElementsByName("course6SubFee5")[0].value != "") {
				course6SubFee5 = parseInt(document.getElementsByName("course6SubFee5")[0].value);
			}
		}
		
		var course7 = 0;
		if (document.getElementsByName("course7")[0]) {
			if (document.getElementsByName("course7")[0].value != "") {
				course7 = parseInt(document.getElementsByName("course7")[0].value);
			}
		}
		var course7SubFee1 = 0;
		if (document.getElementsByName("course7SubFee1")[0]) {
			if (document.getElementsByName("course7SubFee1")[0].value != "") {
				course7SubFee1 = parseInt(document.getElementsByName("course7SubFee1")[0].value);
			}
		}
		var course7SubFee2 = 0;
		if (document.getElementsByName("course7SubFee2")[0]) {
			if (document.getElementsByName("course7SubFee2")[0].value != "") {
				course7SubFee2 = parseInt(document.getElementsByName("course7SubFee2")[0].value);
			}
		}
		var course7SubFee3 = 0;
		if (document.getElementsByName("course7SubFee3")[0]) {
			if (document.getElementsByName("course7SubFee3")[0].value != "") {
				course7SubFee3 = parseInt(document.getElementsByName("course7SubFee3")[0].value);
			}
		}
		var course7SubFee4 = 0;
		if (document.getElementsByName("course7SubFee4")[0]) {
			if (document.getElementsByName("course7SubFee4")[0].value != "") {
				course7SubFee4 = parseInt(document.getElementsByName("course7SubFee4")[0].value);
			}
		}
		var course7SubFee5 = 0;
		if (document.getElementsByName("course7SubFee5")[0]) {
			if (document.getElementsByName("course7SubFee5")[0].value != "") {
				course7SubFee5 = parseInt(document.getElementsByName("course7SubFee5")[0].value);
			}
		}
		
		var course8 = 0;
		if (document.getElementsByName("course8")[0]) {
			if (document.getElementsByName("course8")[0].value != "") {
				course8 = parseInt(document.getElementsByName("course8")[0].value);
			}
		}
		var course8SubFee1 = 0;
		if (document.getElementsByName("course8SubFee1")[0]) {
			if (document.getElementsByName("course8SubFee1")[0].value != "") {
				course8SubFee1 = parseInt(document.getElementsByName("course8SubFee1")[0].value);
			}
		}
		var course8SubFee2 = 0;
		if (document.getElementsByName("course8SubFee2")[0]) {
			if (document.getElementsByName("course8SubFee2")[0].value != "") {
				course8SubFee2 = parseInt(document.getElementsByName("course8SubFee2")[0].value);
			}
		}
		var course8SubFee3 = 0;
		if (document.getElementsByName("course8SubFee3")[0]) {
			if (document.getElementsByName("course8SubFee3")[0].value != "") {
				course8SubFee3 = parseInt(document.getElementsByName("course8SubFee3")[0].value);
			}
		}
		var course8SubFee4 = 0;
		if (document.getElementsByName("course8SubFee4")[0]) {
			if (document.getElementsByName("course8SubFee4")[0].value != "") {
				course8SubFee4 = parseInt(document.getElementsByName("course8SubFee4")[0].value);
			}
		}
		var course8SubFee5 = 0;
		if (document.getElementsByName("course8SubFee5")[0]) {
			if (document.getElementsByName("course8SubFee5")[0].value != "") {
				course8SubFee5 = parseInt(document.getElementsByName("course8SubFee5")[0].value);
			}
		}
		
		var course9 = 0;
		if (document.getElementsByName("course9")[0]) {
			if (document.getElementsByName("course9")[0].value != "") {
				course9 = parseInt(document.getElementsByName("course9")[0].value);
			}
		}
		var course9SubFee1 = 0;
		if (document.getElementsByName("course9SubFee1")[0]) {
			if (document.getElementsByName("course9SubFee1")[0].value != "") {
				course9SubFee1 = parseInt(document.getElementsByName("course9SubFee1")[0].value);
			}
		}
		var course9SubFee2 = 0;
		if (document.getElementsByName("course9SubFee2")[0]) {
			if (document.getElementsByName("course9SubFee2")[0].value != "") {
				course9SubFee2 = parseInt(document.getElementsByName("course9SubFee2")[0].value);
			}
		}
		var course9SubFee3 = 0;
		if (document.getElementsByName("course9SubFee3")[0]) {
			if (document.getElementsByName("course9SubFee3")[0].value != "") {
				course9SubFee3 = parseInt(document.getElementsByName("course9SubFee3")[0].value);
			}
		}
		var course9SubFee4 = 0;
		if (document.getElementsByName("course9SubFee4")[0]) {
			if (document.getElementsByName("course9SubFee4")[0].value != "") {
				course9SubFee4 = parseInt(document.getElementsByName("course9SubFee4")[0].value);
			}
		}
		var course9SubFee5 = 0;
		if (document.getElementsByName("course9SubFee5")[0]) {
			if (document.getElementsByName("course9SubFee5")[0].value != "") {
				course9SubFee5 = parseInt(document.getElementsByName("course9SubFee5")[0].value);
			}
		}
		
		var course10 = 0;
		if (document.getElementsByName("course10")[0]) {
			if (document.getElementsByName("course10")[0].value != "") {
				course10 = parseInt(document.getElementsByName("course10")[0].value);
			}
		}
		var course10SubFee1 = 0;
		if (document.getElementsByName("course10SubFee1")[0]) {
			if (document.getElementsByName("course10SubFee1")[0].value != "") {
				course10SubFee1 = parseInt(document.getElementsByName("course10SubFee1")[0].value);
			}
		}
		var course10SubFee2 = 0;
		if (document.getElementsByName("course10SubFee2")[0]) {
			if (document.getElementsByName("course10SubFee2")[0].value != "") {
				course10SubFee2 = parseInt(document.getElementsByName("course10SubFee2")[0].value);
			}
		}
		var course10SubFee3 = 0;
		if (document.getElementsByName("course10SubFee3")[0]) {
			if (document.getElementsByName("course10SubFee3")[0].value != "") {
				course10SubFee3 = parseInt(document.getElementsByName("course10SubFee3")[0].value);
			}
		}
		var course10SubFee4 = 0;
		if (document.getElementsByName("course10SubFee4")[0]) {
			if (document.getElementsByName("course10SubFee4")[0].value != "") {
				course10SubFee4 = parseInt(document.getElementsByName("course10SubFee4")[0].value);
			}
		}
		var course10SubFee5 = 0;
		if (document.getElementsByName("course10SubFee5")[0]) {
			if (document.getElementsByName("course10SubFee5")[0].value != "") {
				course10SubFee5 = parseInt(document.getElementsByName("course10SubFee5")[0].value);
			}
		}

		var feeCalSum = course1 + course1SubFee1 + course1SubFee2 + course1SubFee3 + course1SubFee4 + course1SubFee5 + course2 + course2SubFee1 + course2SubFee2 + course2SubFee3 + course2SubFee4 + course2SubFee5 + course3 + course3SubFee1 + course3SubFee2 + course3SubFee3 + course3SubFee4 + course3SubFee5 + course4 + course4SubFee1 + course4SubFee2 + course4SubFee3 + course4SubFee4 + course4SubFee5 + course5 + course5SubFee1 + course5SubFee2 + course5SubFee3 + course5SubFee4 + course5SubFee5
					  + course6 + course6SubFee1 + course6SubFee2 + course6SubFee3 + course6SubFee4 + course6SubFee5 
					  + course7 + course7SubFee1 + course7SubFee2 + course7SubFee3 + course7SubFee4 + course7SubFee5
					  + course8 + course8SubFee1 + course8SubFee2 + course8SubFee3 + course8SubFee4 + course8SubFee5
					  + course9 + course9SubFee1 + course9SubFee2 + course9SubFee3 + course9SubFee4 + course9SubFee5
					  + course10 + course10SubFee1 + course10SubFee2 + course10SubFee3 + course10SubFee4 + course10SubFee5;

		if (feeCalSum == feeSum) {
			var strtmp = "请确认交费内容正确再提交！\n\n";
			strtmp += "交费学生: " +document.getElementsByName("userName1")[0].value + "\n";
			strtmp += "交费总额: " +document.getElementsByName("feeSum")[0].value + "\n";
			strtmp += "收据编号: " +document.getElementsByName("receiptNum")[0].value + "\n";
			strtmp += "收据票号: " +document.getElementsByName("billNum")[0].value + "\n";
			strtmp += "确认要提交交费操作吗？";
			if (confirm(strtmp)) {
				return true;
			} else {
				return false;
			}
		} else {
			alert("费用分配与交费金额不符！");
			return false;
		}
	}
}

function checkHiddenValueBtnType(flag) {
	document.getElementsByName("submitBtnType")[0].value = flag;
}

					
// ajax 查询学生余额
function sqlStudentRemainFee(uid,courseIndex) {
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
					
					remainFeeSum += parseFloat(info[0].remainFee);
					
					// 显示学生余额
					switch(courseIndex) {
					case 1:
						if (document.getElementsByName("remainFee1")[0]) {
							document.getElementsByName("remainFee1")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee1Hide")[0].value = info[0].remainFee;
	
							for (var i = 0; i < product[0].length; i++) {
								document.getElementsByName("course1ProductRemainFee")[0].options.add(new Option(product[0][i], i));
							};

						}
						break;
					case 2:
						if (document.getElementsByName("remainFee2")[0]) {
							document.getElementsByName("remainFee2")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee2Hide")[0].value = info[0].remainFee;
							
							for (var i = 0; i < product[1].length; i++) {
								document.getElementsByName("course2ProductRemainFee")[0].options.add(new Option(product[1][i], i));
							};
						}
						break;
					case 3:
						if (document.getElementsByName("remainFee3")[0]) {
							document.getElementsByName("remainFee3")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee3Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[2].length; i++) {
								document.getElementsByName("course3ProductRemainFee")[0].options.add(new Option(product[2][i], i));
							};
						}
						break;
					case 4:
						if (document.getElementsByName("remainFee4")[0]) {
							document.getElementsByName("remainFee4")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee4Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[3].length; i++) {
								document.getElementsByName("course4ProductRemainFee")[0].options.add(new Option(product[3][i], i));
							};
						}
						break;
					case 5:
						if (document.getElementsByName("remainFee5")[0]) {
							document.getElementsByName("remainFee5")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee5Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[4].length; i++) {
								document.getElementsByName("course5ProductRemainFee")[0].options.add(new Option(product[4][i], i));
							};
						}
						break;
					case 6:
						if (document.getElementsByName("remainFee6")[0]) {
							document.getElementsByName("remainFee6")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee6Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[5].length; i++) {
								document.getElementsByName("course6ProductRemainFee")[0].options.add(new Option(product[5][i], i));
							};
						}
						break;
					case 7:
						if (document.getElementsByName("remainFee7")[0]) {
							document.getElementsByName("remainFee7")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee7Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[6].length; i++) {
								document.getElementsByName("course7ProductRemainFee")[0].options.add(new Option(product[6][i], i));
							};
						}
						break;
					case 8:
						if (document.getElementsByName("remainFee8")[0]) {
							document.getElementsByName("remainFee8")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee8Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[7].length; i++) {
								document.getElementsByName("course8ProductRemainFee")[0].options.add(new Option(product[7][i], i));
							};
						}
						break;
					case 9:
						if (document.getElementsByName("remainFee9")[0]) {
							document.getElementsByName("remainFee9")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee9Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[8].length; i++) {
								document.getElementsByName("course9ProductRemainFee")[0].options.add(new Option(product[8][i], i));
							};
						}
						break;
					case 10:
						if (document.getElementsByName("remainFee10")[0]) {
							document.getElementsByName("remainFee10")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee10Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[9].length; i++) {
								document.getElementsByName("course10ProductRemainFee")[0].options.add(new Option(product[9][i], i));
							};
						}
						break;
					default:
						break;
					}
					// 更新总余额
					document.getElementsByName("remainFeeSum")[0].value = remainFeeSum.toString();			
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "fee.php";
	url = url + "?sqlRemainFeeByStudentUID=" + uid + "&subFeeCourse=" + courseIndex;
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function sqlRecordAddFee() {
	var xmlhttp;

	if (document.getElementsByName("userName1")[0].value == "") {
		alert("学生姓名为空，不能查询！");
		return;
	}

	// 此UID由x和数字组成，在PHP中把X去掉了
	var uid = document.getElementsByName("userID")[0].value;

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

				//alert(ret);
				if (ret == 0) {
					//document.getElementsByName("submitAddAddFee")[0].disabled = false;

					document.getElementsByName("feeSum")[0].value = "";
					document.getElementsByName("receiptNum")[0].value = "";
					document.getElementsByName("billNum")[0].value = "";
					alert("该姓名学生没有交费记录，请核对！");
				} else {
					var info = eval(ret);
					
					// 用在上一个下一个按钮中查询用的
					objRecordAddFee = info;
					// 用前清0
					lenRecordAddFee = 0;
					for(var tmp in objRecordAddFee){
						lenRecordAddFee++;
					}
					
					// 默认先载入最后一次交费情况
					indexRecordAddFee = lenRecordAddFee - 1;

					var time = dateJS("Y-M-d", info[lenRecordAddFee-1].time);
					
					document.getElementsByName("timeAddFee")[0].value = time;
					document.getElementsByName("feeSum")[0].value = info[lenRecordAddFee-1].feeSum;
					document.getElementsByName("receiptNum")[0].value = info[lenRecordAddFee-1].receiptNum;
					document.getElementsByName("billNum")[0].value = info[lenRecordAddFee-1].billNum;

					//var str = document.getElementsByName("grade")[0].value;
					//alert(str);
					//var grade = parseInt(document.getElementsByName("grade")[0].value);
					// 班课价格
					document.getElementsByName("priceBK")[0].value = info[lenRecordAddFee-1].priceBK;
					// 一对一单价
					document.getElementsByName("price1YDY")[0].value = info[lenRecordAddFee-1].priceHour1YDY;
					document.getElementsByName("pay1")[0].value = info[lenRecordAddFee-1].pay1;
					document.getElementsByName("price2YDY")[0].value = info[lenRecordAddFee-1].priceHour2YDY;
					document.getElementsByName("pay2")[0].value = info[lenRecordAddFee-1].pay2;
					document.getElementsByName("price3YDY")[0].value = info[lenRecordAddFee-1].priceHour3YDY;
					document.getElementsByName("pay3")[0].value = info[lenRecordAddFee-1].pay3;

					// 产品名称
					var objtmp;
					
					objtmp = document.getElementsByName("course1Product")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course1Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course1ProductCopy")[0].value = info[lenRecordAddFee-1].course1Product;
								break;
							}
						}
					}

					objtmp = document.getElementsByName("course2Product")[0];
					if(objtmp){						
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course2Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course2ProductCopy")[0].value = info[lenRecordAddFee-1].course2Product;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("course3Product")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course3Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course3ProductCopy")[0].value = info[lenRecordAddFee-1].course3Product;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("course4Product")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course4Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course4ProductCopy")[0].value = info[lenRecordAddFee-1].course4Product;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("course5Product")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course5Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course5ProductCopy")[0].value = info[lenRecordAddFee-1].course5Product;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("course6Product")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course6Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course6ProductCopy")[0].value = info[lenRecordAddFee-1].course6Product;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("course7Product")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course7Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course7ProductCopy")[0].value = info[lenRecordAddFee-1].course7Product;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("course8Product")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course8Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course8ProductCopy")[0].value = info[lenRecordAddFee-1].course8Product;
								break;
							}
						}
					}
					objtmp = document.getElementsByName("course9Product")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course9Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course9ProductCopy")[0].value = info[lenRecordAddFee-1].course9Product;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("course10Product")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].course10Product) {
								objtmp.options[i].selected = true;
								document.getElementsByName("course10ProductCopy")[0].value = info[lenRecordAddFee-1].course10Product;
								break;
							}
						}
					}

					// 数学 费用分配
					if((document.getElementsByName("course1Product")[0])&&(document.getElementsByName("course1Product")[0].value!=0)) {
						//if ((document.getElementsByName("course1")[0]) && (info[lenRecordAddFee-1].course1 != 0)) {
						//if ((document.getElementsByName("course1")[0])&&(document.getElementsByName("course1Product")[0].value!=0)) {
						if (document.getElementsByName("course1")[0]){
							document.getElementsByName("course1")[0].value = info[lenRecordAddFee-1].course1;
						}
						//if ((document.getElementsByName("course1SubFee1")[0]) && (info[lenRecordAddFee-1].course1 != 0)) {//.course1SubFee1
						if (document.getElementsByName("course1SubFee1")[0]) {//.course1SubFee1
							document.getElementsByName("course1SubFee1")[0].value = info[lenRecordAddFee-1].course1SubFee1;
						}
						if (document.getElementsByName("course1SubFee2")[0]) {
							document.getElementsByName("course1SubFee2")[0].value = info[lenRecordAddFee-1].course1SubFee2;
						}
						if (document.getElementsByName("course1SubFee3")[0]) {
							document.getElementsByName("course1SubFee3")[0].value = info[lenRecordAddFee-1].course1SubFee3;
						}
						if (document.getElementsByName("course1SubFee4")[0]) {
							document.getElementsByName("course1SubFee4")[0].value = info[lenRecordAddFee-1].course1SubFee4;
						}
						if (document.getElementsByName("course1SubFee5")[0]) {
							document.getElementsByName("course1SubFee5")[0].value = info[lenRecordAddFee-1].course1SubFee5;
						}
					}

					// 语文 费用分配
					//if ((document.getElementsByName("course2")[0]) && (info[lenRecordAddFee-1].course2 != 0)) {
					if((document.getElementsByName("course2Product")[0])&&(document.getElementsByName("course2Product")[0].value!=0)){
						if (document.getElementsByName("course2")[0]){
							document.getElementsByName("course2")[0].value = info[lenRecordAddFee-1].course2;
						}
						if (document.getElementsByName("course2SubFee1")[0]){//.course2SubFee1
							document.getElementsByName("course2SubFee1")[0].value = info[lenRecordAddFee-1].course2SubFee1;
						}
						if (document.getElementsByName("course2SubFee2")[0]){
							document.getElementsByName("course2SubFee2")[0].value = info[lenRecordAddFee-1].course2SubFee2;
						}
						if (document.getElementsByName("course2SubFee3")[0]){
							document.getElementsByName("course2SubFee3")[0].value = info[lenRecordAddFee-1].course2SubFee3;
						}
						if (document.getElementsByName("course2SubFee4")[0]){
							document.getElementsByName("course2SubFee4")[0].value = info[lenRecordAddFee-1].course2SubFee4;
						}
						if (document.getElementsByName("course2SubFee5")[0]){
							document.getElementsByName("course2SubFee5")[0].value = info[lenRecordAddFee-1].course2SubFee5;
						}
					}

					// 英语 费用分配
					if((document.getElementsByName("course3Product")[0])&&(document.getElementsByName("course3Product")[0].value!=0)){
						if (document.getElementsByName("course3")[0]) {
							document.getElementsByName("course3")[0].value = info[lenRecordAddFee-1].course3;
						}
						if (document.getElementsByName("course3SubFee1")[0]){//.course3SubFee1
							document.getElementsByName("course3SubFee1")[0].value = info[lenRecordAddFee-1].course3SubFee1;
						}
						if (document.getElementsByName("course3SubFee2")[0]){
							document.getElementsByName("course3SubFee2")[0].value = info[lenRecordAddFee-1].course3SubFee2;
						}
						if (document.getElementsByName("course3SubFee3")[0]){
							document.getElementsByName("course3SubFee3")[0].value = info[lenRecordAddFee-1].course3SubFee3;
						}
						if (document.getElementsByName("course3SubFee4")[0]){
							document.getElementsByName("course3SubFee4")[0].value = info[lenRecordAddFee-1].course3SubFee4;
						}
						if (document.getElementsByName("course3SubFee5")[0]){
							document.getElementsByName("course3SubFee5")[0].value = info[lenRecordAddFee-1].course3SubFee5;
						}
					}

					// 物理 费用分配
					if((document.getElementsByName("course4Product")[0])&&(document.getElementsByName("course4Product")[0].value!=0)){
						if (document.getElementsByName("course4")[0]){
							document.getElementsByName("course4")[0].value = info[lenRecordAddFee-1].course4;
						}
						if (document.getElementsByName("course4SubFee1")[0]) {//.course4SubFee1
							document.getElementsByName("course4SubFee1")[0].value = info[lenRecordAddFee-1].course4SubFee1;
						}
						if (document.getElementsByName("course4SubFee2")[0]){
							document.getElementsByName("course4SubFee2")[0].value = info[lenRecordAddFee-1].course4SubFee2;
						}
						if (document.getElementsByName("course4SubFee3")[0]){
							document.getElementsByName("course4SubFee3")[0].value = info[lenRecordAddFee-1].course4SubFee3;
						}
						if (document.getElementsByName("course4SubFee4")[0]){
							document.getElementsByName("course4SubFee4")[0].value = info[lenRecordAddFee-1].course4SubFee4;
						}
						if (document.getElementsByName("course4SubFee5")[0]){
							document.getElementsByName("course4SubFee5")[0].value = info[lenRecordAddFee-1].course4SubFee5;
						}
					}

					// 化学 费用分配
					if((document.getElementsByName("course5Product")[0])&&(document.getElementsByName("course5Product")[0].value!=0)){
						if (document.getElementsByName("course5")[0]){
							document.getElementsByName("course5")[0].value = info[lenRecordAddFee-1].course5;
						}
						if (document.getElementsByName("course5SubFee1")[0]){//.course5SubFee1
							document.getElementsByName("course5SubFee1")[0].value = info[lenRecordAddFee-1].course5SubFee1;
						}
						if (document.getElementsByName("course5SubFee2")[0]){
							document.getElementsByName("course5SubFee2")[0].value = info[lenRecordAddFee-1].course5SubFee2;
						}
						if (document.getElementsByName("course5SubFee3")[0]){
							document.getElementsByName("course5SubFee3")[0].value = info[lenRecordAddFee-1].course5SubFee3;
						}
						if (document.getElementsByName("course5SubFee4")[0]){
							document.getElementsByName("course5SubFee4")[0].value = info[lenRecordAddFee-1].course5SubFee4;
						}
						if (document.getElementsByName("course5SubFee5")[0]){
							document.getElementsByName("course5SubFee5")[0].value = info[lenRecordAddFee-1].course5SubFee5;
						}
					}
					
					// course6 费用分配
					if((document.getElementsByName("course6Product")[0])&&(document.getElementsByName("course6Product")[0].value!=0)){
						if (document.getElementsByName("course6")[0]){
							document.getElementsByName("course6")[0].value = info[lenRecordAddFee-1].course6;
						}
						if (document.getElementsByName("course6SubFee1")[0]){//.course6SubFee1
							document.getElementsByName("course6SubFee1")[0].value = info[lenRecordAddFee-1].course6SubFee1;
						}
						if (document.getElementsByName("course6SubFee2")[0]){
							document.getElementsByName("course6SubFee2")[0].value = info[lenRecordAddFee-1].course6SubFee2;
						}
						if (document.getElementsByName("course6SubFee3")[0]){
							document.getElementsByName("course6SubFee3")[0].value = info[lenRecordAddFee-1].course6SubFee3;
						}
						if (document.getElementsByName("course6SubFee4")[0]){
							document.getElementsByName("course6SubFee4")[0].value = info[lenRecordAddFee-1].course6SubFee4;
						}
						if (document.getElementsByName("course6SubFee5")[0]){
							document.getElementsByName("course6SubFee5")[0].value = info[lenRecordAddFee-1].course6SubFee5;
						}
					}
					
					// course7 费用分配
					if((document.getElementsByName("course7Product")[0])&&(document.getElementsByName("course7Product")[0].value!=0)){
						if (document.getElementsByName("course7")[0]){
							document.getElementsByName("course7")[0].value = info[lenRecordAddFee-1].course7;
						}
						if (document.getElementsByName("course7SubFee1")[0]){//.course7SubFee1
							document.getElementsByName("course7SubFee1")[0].value = info[lenRecordAddFee-1].course7SubFee1;
						}
						if (document.getElementsByName("course7SubFee2")[0]){
							document.getElementsByName("course7SubFee2")[0].value = info[lenRecordAddFee-1].course7SubFee2;
						}
						if (document.getElementsByName("course7SubFee3")[0]){
							document.getElementsByName("course7SubFee3")[0].value = info[lenRecordAddFee-1].course7SubFee3;
						}
						if (document.getElementsByName("course7SubFee4")[0]){
							document.getElementsByName("course7SubFee4")[0].value = info[lenRecordAddFee-1].course7SubFee4;
						}
						if (document.getElementsByName("course7SubFee5")[0]){
							document.getElementsByName("course7SubFee5")[0].value = info[lenRecordAddFee-1].course7SubFee5;
						}
					}
					
					// course8 费用分配
					if((document.getElementsByName("course8Product")[0])&&(document.getElementsByName("course8Product")[0].value!=0)){
						if (document.getElementsByName("course8")[0]){
							document.getElementsByName("course8")[0].value = info[lenRecordAddFee-1].course8;
						}
						if (document.getElementsByName("course8SubFee1")[0]){//.course8SubFee1
							document.getElementsByName("course8SubFee1")[0].value = info[lenRecordAddFee-1].course8SubFee1;
						}
						if (document.getElementsByName("course8SubFee2")[0]){
							document.getElementsByName("course8SubFee2")[0].value = info[lenRecordAddFee-1].course8SubFee2;
						}
						if (document.getElementsByName("course8SubFee3")[0]){
							document.getElementsByName("course8SubFee3")[0].value = info[lenRecordAddFee-1].course8SubFee3;
						}
						if (document.getElementsByName("course8SubFee4")[0]){
							document.getElementsByName("course8SubFee4")[0].value = info[lenRecordAddFee-1].course8SubFee4;
						}
						if (document.getElementsByName("course8SubFee5")[0]){
							document.getElementsByName("course8SubFee5")[0].value = info[lenRecordAddFee-1].course8SubFee5;
						}
					}
					
					// course9 费用分配
					if((document.getElementsByName("course9Product")[0])&&(document.getElementsByName("course9Product")[0].value!=0)){
						if (document.getElementsByName("course9")[0]){
							document.getElementsByName("course9")[0].value = info[lenRecordAddFee-1].course9;
						}
						if (document.getElementsByName("course9SubFee1")[0]){//.course9SubFee1
							document.getElementsByName("course9SubFee1")[0].value = info[lenRecordAddFee-1].course9SubFee1;
						}
						if (document.getElementsByName("course9SubFee2")[0]){
							document.getElementsByName("course9SubFee2")[0].value = info[lenRecordAddFee-1].course9SubFee2;
						}
						if (document.getElementsByName("course9SubFee3")[0]){
							document.getElementsByName("course9SubFee3")[0].value = info[lenRecordAddFee-1].course9SubFee3;
						}
						if (document.getElementsByName("course9SubFee4")[0]){
							document.getElementsByName("course9SubFee4")[0].value = info[lenRecordAddFee-1].course9SubFee4;
						}
						if (document.getElementsByName("course9SubFee5")[0]){
							document.getElementsByName("course9SubFee5")[0].value = info[lenRecordAddFee-1].course9SubFee5;
						}
					}
					
					// course10 费用分配
					if((document.getElementsByName("course10Product")[0])&&(document.getElementsByName("course10Product")[0].value!=0)){
						if (document.getElementsByName("course10")[0]){
							document.getElementsByName("course10")[0].value = info[lenRecordAddFee-1].course10;
						}
						if (document.getElementsByName("course10SubFee1")[0]){//.course10SubFee1
							document.getElementsByName("course10SubFee1")[0].value = info[lenRecordAddFee-1].course10SubFee1;
						}
						if (document.getElementsByName("course10SubFee2")[0]){
							document.getElementsByName("course10SubFee2")[0].value = info[lenRecordAddFee-1].course10SubFee2;
						}
						if (document.getElementsByName("course10SubFee3")[0]){
							document.getElementsByName("course10SubFee3")[0].value = info[lenRecordAddFee-1].course10SubFee3;
						}
						if (document.getElementsByName("course10SubFee4")[0]){
							document.getElementsByName("course10SubFee4")[0].value = info[lenRecordAddFee-1].course10SubFee4;
						}
						if (document.getElementsByName("course10SubFee5")[0]){
							document.getElementsByName("course10SubFee5")[0].value = info[lenRecordAddFee-1].course10SubFee5;
						}
					}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}
	};
	// 3发出http请求
	var url = "fee.php";
	url = url + "?sqlRecordStudentUID=" + uid;
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function sqlAddFeeRecord(flag){
	if (flag == 'next') {
		if (indexRecordAddFee < lenRecordAddFee - 1) {
			indexRecordAddFee++;
		} else {
			alert("已经是最后一次交费记录！");
		}
	} else if (flag == 'previous') {
		if (indexRecordAddFee > 0) {
			indexRecordAddFee--;
		} else {
			alert("已经是第一次交费记录！");
		}
	}
	
	var time = dateJS("Y-M-d", objRecordAddFee[indexRecordAddFee].time);

	document.getElementsByName("timeAddFee")[0].value = time;
	document.getElementsByName("feeSum")[0].value = objRecordAddFee[indexRecordAddFee].feeSum;
	
	document.getElementsByName("receiptNum")[0].value = objRecordAddFee[indexRecordAddFee].receiptNum;
	document.getElementsByName("billNum")[0].value = objRecordAddFee[indexRecordAddFee].billNum;
	
	//var grade = parseInt(document.getElementsByName("grade")[0].value);
	// 班课价格
	document.getElementsByName("priceBK")[0].value = objRecordAddFee[indexRecordAddFee].priceBK;
	// 一对一单价
	document.getElementsByName("price1YDY")[0].value = objRecordAddFee[indexRecordAddFee].priceHour1YDY;
	document.getElementsByName("pay1")[0].value = objRecordAddFee[indexRecordAddFee].pay1;
	document.getElementsByName("price2YDY")[0].value = objRecordAddFee[indexRecordAddFee].priceHour2YDY;
	document.getElementsByName("pay2")[0].value = objRecordAddFee[indexRecordAddFee].pay2;
	document.getElementsByName("price3YDY")[0].value = objRecordAddFee[indexRecordAddFee].priceHour3YDY;
	document.getElementsByName("pay3")[0].value = objRecordAddFee[indexRecordAddFee].pay3;
	
	// 产品名称
	var objtmp;
	
	objtmp = document.getElementsByName("course1Product")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course1Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course1ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course1Product;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("course2Product")[0];
	if(objtmp){						
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course2Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course2ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course2Product;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("course3Product")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course3Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course3ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course3Product;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("course4Product")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course4Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course4ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course4Product;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("course5Product")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course5Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course5ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course5Product;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("course6Product")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course6Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course6ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course6Product;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("course7Product")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course7Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course7ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course7Product;
				break;
			}
		}
	}
	objtmp = document.getElementsByName("course8Product")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course8Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course8ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course8Product;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("course9Product")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course9Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course9ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course9Product;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("course10Product")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].course10Product) {
				objtmp.options[i].selected = true;
				document.getElementsByName("course10ProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].course10Product;
				break;
			}
		}
	}
	
	// course1 费用分配
	if ((document.getElementsByName("course1")[0]) && (objRecordAddFee[indexRecordAddFee].course1 != 0)) {
		document.getElementsByName("course1")[0].value = objRecordAddFee[indexRecordAddFee].course1;
	}
	if ((document.getElementsByName("course1SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course1 != 0)) { //.course1SubFee1
		document.getElementsByName("course1SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course1SubFee1;
	}
	if ((document.getElementsByName("course1SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course1 != 0)) {
		document.getElementsByName("course1SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course1SubFee2;
	}
	if ((document.getElementsByName("course1SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course1 != 0)) {
		document.getElementsByName("course1SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course1SubFee3;
	}
	if ((document.getElementsByName("course1SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course1 != 0)) {
		document.getElementsByName("course1SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course1SubFee4;
	}
	if ((document.getElementsByName("course1SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course1 != 0)) {
		document.getElementsByName("course1SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course1SubFee5;
	}
	
	// 如果数学存在，但交费为0，则显示空白
	if ((document.getElementsByName("course1")[0]) && (objRecordAddFee[indexRecordAddFee].course1 == 0)) {
		document.getElementsByName("course1")[0].value="";
	}
	if ((document.getElementsByName("course1SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course1SubFee1 == 0)) {
		document.getElementsByName("course1SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course1SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course1SubFee2 == 0)) {
		document.getElementsByName("course1SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course1SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course1SubFee3 == 0)) {
		document.getElementsByName("course1SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course1SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course1SubFee4 == 0)) {
		document.getElementsByName("course1SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course1SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course1SubFee5 == 0)) {
		document.getElementsByName("course1SubFee5")[0].value = "";
	}
	
	// course2 费用分配
	if ((document.getElementsByName("course2")[0]) && (objRecordAddFee[indexRecordAddFee].course2 != 0)) {
		document.getElementsByName("course2")[0].value = objRecordAddFee[indexRecordAddFee].course2;
	}
	if ((document.getElementsByName("course2SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course2 != 0)) {//.course2SubFee1
		document.getElementsByName("course2SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course2SubFee1;
	}
	if ((document.getElementsByName("course2SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course2 != 0)) {
		document.getElementsByName("course2SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course2SubFee2;
	}
	if ((document.getElementsByName("course2SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course2 != 0)) {
		document.getElementsByName("course2SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course2SubFee3;
	}
	if ((document.getElementsByName("course2SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course2 != 0)) {
		document.getElementsByName("course2SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course2SubFee4;
	}
	if ((document.getElementsByName("course2SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course2 != 0)) {
		document.getElementsByName("course2SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course2SubFee5;
	}
	
	// 如果语文存在，但交费为0，则显示空白
	if ((document.getElementsByName("course2")[0]) && (objRecordAddFee[indexRecordAddFee].course2 != 0)) {
		document.getElementsByName("course2")[0].value = "";
	}
	if ((document.getElementsByName("course2SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course2SubFee1 == 0)) {
		document.getElementsByName("course2SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course2SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course2SubFee2 == 0)) {
		document.getElementsByName("course2SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course2SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course2SubFee3 == 0)) {
		document.getElementsByName("course2SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course2SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course2SubFee4 == 0)) {
		document.getElementsByName("course2SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course2SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course2SubFee5 == 0)) {
		document.getElementsByName("course2SubFee5")[0].value = "";
	}
	
	// course3 费用分配
	if ((document.getElementsByName("course3")[0]) && (objRecordAddFee[indexRecordAddFee].course3 != 0)) {
		document.getElementsByName("course3")[0].value = objRecordAddFee[indexRecordAddFee].course3;
	}
	if ((document.getElementsByName("course3SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course3 != 0)) {
		document.getElementsByName("course3SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course3SubFee1;
	}
	if ((document.getElementsByName("course3SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course3 != 0)) {
		document.getElementsByName("course3SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course3SubFee2;
	}
	if ((document.getElementsByName("course3SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course3 != 0)) {
		document.getElementsByName("course3SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course3SubFee3;
	}
	if ((document.getElementsByName("course3SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course3 != 0)) {
		document.getElementsByName("course3SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course3SubFee4;
	}
	if ((document.getElementsByName("course3SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course3 != 0)) {
		document.getElementsByName("course3SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course3SubFee5;
	}

	// 如果英语存在，但交费为0，则显示空白
	if ((document.getElementsByName("course3")[0]) && (objRecordAddFee[indexRecordAddFee].course3 == 0)) {
		document.getElementsByName("course3")[0].value = "";
	}
	if ((document.getElementsByName("course3SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course3SubFee1 == 0)) {
		document.getElementsByName("course3SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course3SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course3SubFee2 == 0)) {
		document.getElementsByName("course3SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course3SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course3SubFee3 == 0)) {
		document.getElementsByName("course3SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course3SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course3SubFee4 == 0)) {
		document.getElementsByName("course3SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course3SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course3SubFee5 == 0)) {
		document.getElementsByName("course3SubFee5")[0].value = "";
	}
	
	// course4 费用分配
	if ((document.getElementsByName("course4")[0]) && (objRecordAddFee[indexRecordAddFee].course4 != 0)) {
		document.getElementsByName("course4")[0].value = objRecordAddFee[indexRecordAddFee].course4;
	}
	if ((document.getElementsByName("course4SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course4 != 0)) {//.course4SubFee1
		document.getElementsByName("course4SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course4SubFee1;
	}
	if ((document.getElementsByName("course4SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course4 != 0)) {
		document.getElementsByName("course4SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course4SubFee2;
	}
	if ((document.getElementsByName("course4SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course4 != 0)) {
		document.getElementsByName("course4SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course4SubFee3;
	}
	if ((document.getElementsByName("course4SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course4 != 0)) {
		document.getElementsByName("course4SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course4SubFee4;
	}
	if ((document.getElementsByName("course4SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course4 != 0)) {
		document.getElementsByName("course4SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course4SubFee5;
	}

	// 如果物理存在，但交费为0，则显示空白
	if ((document.getElementsByName("course4")[0]) && (objRecordAddFee[indexRecordAddFee].course4 == 0)) {
		document.getElementsByName("course4")[0].value = "";
	}
	if ((document.getElementsByName("course4SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course4SubFee1 == 0)) {
		document.getElementsByName("course4SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course4SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course4SubFee2 == 0)) {
		document.getElementsByName("course4SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course4SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course4SubFee3 == 0)) {
		document.getElementsByName("course4SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course4SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course4SubFee4 == 0)) {
		document.getElementsByName("course4SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course4SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course4SubFee5 == 0)) {
		document.getElementsByName("course4SubFee5")[0].value = "";
	}
	
	// course5 费用分配
	if ((document.getElementsByName("course5")[0]) && (objRecordAddFee[indexRecordAddFee].course5 != 0)) {
		document.getElementsByName("course5")[0].value = objRecordAddFee[indexRecordAddFee].course5;
	}
	if ((document.getElementsByName("course5SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course5 != 0)) {//.course5SubFee1
		document.getElementsByName("course5SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course5SubFee1;
	}
	if ((document.getElementsByName("course5SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course5 != 0)) {
		document.getElementsByName("course5SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course5SubFee2;
	}
	if ((document.getElementsByName("course5SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course5 != 0)) {
		document.getElementsByName("course5SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course5SubFee3;
	}
	if ((document.getElementsByName("course5SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course5 != 0)) {
		document.getElementsByName("course5SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course5SubFee4;
	}
	if ((document.getElementsByName("course5SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course5 != 0)) {
		document.getElementsByName("course5SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course5SubFee5;
	}
	
	// 如果化学存在，但交费为0，则显示空白
	if ((document.getElementsByName("course5")[0]) && (objRecordAddFee[indexRecordAddFee].course5 == 0)) {
		document.getElementsByName("course5")[0].value = "";
	}
	if ((document.getElementsByName("course5SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course5SubFee1 == 0)) {//.course5SubFee1
		document.getElementsByName("course5SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course5SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course5SubFee2 == 0)) {//.course5SubFee1
		document.getElementsByName("course5SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course5SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course5SubFee3 == 0)) {//.course5SubFee1
		document.getElementsByName("course5SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course5SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course5SubFee4 == 0)) {//.course5SubFee1
		document.getElementsByName("course5SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course5SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course5SubFee5 == 0)) {//.course5SubFee1
		document.getElementsByName("course5SubFee5")[0].value = "";
	}
	
	// course6 费用分配
	if ((document.getElementsByName("course6")[0]) && (objRecordAddFee[indexRecordAddFee].course6 != 0)) {
		document.getElementsByName("course6")[0].value = objRecordAddFee[indexRecordAddFee].course6;
	}
	if ((document.getElementsByName("course6SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course6 != 0)) {//.course6SubFee1
		document.getElementsByName("course6SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course6SubFee1;
	}
	if ((document.getElementsByName("course6SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course6 != 0)) {
		document.getElementsByName("course6SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course6SubFee2;
	}
	if ((document.getElementsByName("course6SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course6 != 0)) {
		document.getElementsByName("course6SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course6SubFee3;
	}
	if ((document.getElementsByName("course6SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course6 != 0)) {
		document.getElementsByName("course6SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course6SubFee4;
	}
	if ((document.getElementsByName("course6SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course6 != 0)) {
		document.getElementsByName("course6SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course6SubFee5;
	}
	
	// 如果course6存在，但交费为0，则显示空白
	if ((document.getElementsByName("course6")[0]) && (objRecordAddFee[indexRecordAddFee].course6 == 0)) {
		document.getElementsByName("course6")[0].value = "";
	}
	if ((document.getElementsByName("course6SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course6SubFee1 == 0)) {//.course6SubFee1
		document.getElementsByName("course6SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course6SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course6SubFee2 == 0)) {//.course6SubFee1
		document.getElementsByName("course6SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course6SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course6SubFee3 == 0)) {//.course6SubFee1
		document.getElementsByName("course6SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course6SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course6SubFee4 == 0)) {//.course6SubFee1
		document.getElementsByName("course6SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course6SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course6SubFee5 == 0)) {//.course6SubFee1
		document.getElementsByName("course6SubFee5")[0].value = "";
	}
	
	// course7 费用分配
	if ((document.getElementsByName("course7")[0]) && (objRecordAddFee[indexRecordAddFee].course7 != 0)) {
		document.getElementsByName("course7")[0].value = objRecordAddFee[indexRecordAddFee].course7;
	}
	if ((document.getElementsByName("course7SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course7 != 0)) {//.course7SubFee1
		document.getElementsByName("course7SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course7SubFee1;
	}
	if ((document.getElementsByName("course7SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course7 != 0)) {
		document.getElementsByName("course7SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course7SubFee2;
	}
	if ((document.getElementsByName("course7SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course7 != 0)) {
		document.getElementsByName("course7SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course7SubFee3;
	}
	if ((document.getElementsByName("course7SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course7 != 0)) {
		document.getElementsByName("course7SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course7SubFee4;
	}
	if ((document.getElementsByName("course7SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course7 != 0)) {
		document.getElementsByName("course7SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course7SubFee5;
	}
	
	// 如果course7存在，但交费为0，则显示空白
	if ((document.getElementsByName("course7")[0]) && (objRecordAddFee[indexRecordAddFee].course7 == 0)) {
		document.getElementsByName("course7")[0].value = "";
	}
	if ((document.getElementsByName("course7SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course7SubFee1 == 0)) {//.course7SubFee1
		document.getElementsByName("course7SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course7SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course7SubFee2 == 0)) {//.course7SubFee1
		document.getElementsByName("course7SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course7SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course7SubFee3 == 0)) {//.course7SubFee1
		document.getElementsByName("course7SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course7SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course7SubFee4 == 0)) {//.course7SubFee1
		document.getElementsByName("course7SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course7SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course7SubFee5 == 0)) {//.course7SubFee1
		document.getElementsByName("course7SubFee5")[0].value = "";
	}
	
	// course8 费用分配
	if ((document.getElementsByName("course8")[0]) && (objRecordAddFee[indexRecordAddFee].course8 != 0)) {
		document.getElementsByName("course8")[0].value = objRecordAddFee[indexRecordAddFee].course8;
	}
	if ((document.getElementsByName("course8SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course8 != 0)) {//.course8SubFee1
		document.getElementsByName("course8SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course8SubFee1;
	}
	if ((document.getElementsByName("course8SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course8 != 0)) {
		document.getElementsByName("course8SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course8SubFee2;
	}
	if ((document.getElementsByName("course8SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course8 != 0)) {
		document.getElementsByName("course8SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course8SubFee3;
	}
	if ((document.getElementsByName("course8SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course8 != 0)) {
		document.getElementsByName("course8SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course8SubFee4;
	}
	if ((document.getElementsByName("course8SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course8 != 0)) {
		document.getElementsByName("course8SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course8SubFee5;
	}
	
	// 如果course8存在，但交费为0，则显示空白
	if ((document.getElementsByName("course8")[0]) && (objRecordAddFee[indexRecordAddFee].course8 == 0)) {
		document.getElementsByName("course8")[0].value = "";
	}
	if ((document.getElementsByName("course8SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course8SubFee1 == 0)) {//.course8SubFee1
		document.getElementsByName("course8SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course8SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course8SubFee2 == 0)) {//.course8SubFee1
		document.getElementsByName("course8SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course8SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course8SubFee3 == 0)) {//.course8SubFee1
		document.getElementsByName("course8SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course8SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course8SubFee4 == 0)) {//.course8SubFee1
		document.getElementsByName("course8SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course8SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course8SubFee5 == 0)) {//.course8SubFee1
		document.getElementsByName("course8SubFee5")[0].value = "";
	}
	
	// course9 费用分配
	if ((document.getElementsByName("course9")[0]) && (objRecordAddFee[indexRecordAddFee].course9 != 0)) {
		document.getElementsByName("course9")[0].value = objRecordAddFee[indexRecordAddFee].course9;
	}
	if ((document.getElementsByName("course9SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course9 != 0)) {//.course9SubFee1
		document.getElementsByName("course9SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course9SubFee1;
	}
	if ((document.getElementsByName("course9SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course9 != 0)) {
		document.getElementsByName("course9SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course9SubFee2;
	}
	if ((document.getElementsByName("course9SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course9 != 0)) {
		document.getElementsByName("course9SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course9SubFee3;
	}
	if ((document.getElementsByName("course9SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course9 != 0)) {
		document.getElementsByName("course9SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course9SubFee4;
	}
	if ((document.getElementsByName("course9SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course9 != 0)) {
		document.getElementsByName("course9SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course9SubFee5;
	}
	
	// 如果course9存在，但交费为0，则显示空白
	if ((document.getElementsByName("course9")[0]) && (objRecordAddFee[indexRecordAddFee].course9 == 0)) {
		document.getElementsByName("course9")[0].value = "";
	}
	if ((document.getElementsByName("course9SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course9SubFee1 == 0)) {//.course9SubFee1
		document.getElementsByName("course9SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course9SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course9SubFee2 == 0)) {//.course9SubFee1
		document.getElementsByName("course9SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course9SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course9SubFee3 == 0)) {//.course9SubFee1
		document.getElementsByName("course9SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course9SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course9SubFee4 == 0)) {//.course9SubFee1
		document.getElementsByName("course9SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course9SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course9SubFee5 == 0)) {//.course9SubFee1
		document.getElementsByName("course9SubFee5")[0].value = "";
	}
	
	// course10 费用分配
	if ((document.getElementsByName("course10")[0]) && (objRecordAddFee[indexRecordAddFee].course10 != 0)) {
		document.getElementsByName("course10")[0].value = objRecordAddFee[indexRecordAddFee].course10;
	}
	if ((document.getElementsByName("course10SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course10 != 0)) {//.course10SubFee1
		document.getElementsByName("course10SubFee1")[0].value = objRecordAddFee[indexRecordAddFee].course10SubFee1;
	}
	if ((document.getElementsByName("course10SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course10 != 0)) {
		document.getElementsByName("course10SubFee2")[0].value = objRecordAddFee[indexRecordAddFee].course10SubFee2;
	}
	if ((document.getElementsByName("course10SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course10 != 0)) {
		document.getElementsByName("course10SubFee3")[0].value = objRecordAddFee[indexRecordAddFee].course10SubFee3;
	}
	if ((document.getElementsByName("course10SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course10 != 0)) {
		document.getElementsByName("course10SubFee4")[0].value = objRecordAddFee[indexRecordAddFee].course10SubFee4;
	}
	if ((document.getElementsByName("course10SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course10 != 0)) {
		document.getElementsByName("course10SubFee5")[0].value = objRecordAddFee[indexRecordAddFee].course10SubFee5;
	}
	
	// 如果course10存在，但交费为0，则显示空白
	if ((document.getElementsByName("course10")[0]) && (objRecordAddFee[indexRecordAddFee].course10 == 0)) {
		document.getElementsByName("course10")[0].value = "";
	}
	if ((document.getElementsByName("course10SubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].course10SubFee1 == 0)) {//.course10SubFee1
		document.getElementsByName("course10SubFee1")[0].value = "";
	}
	if ((document.getElementsByName("course10SubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].course10SubFee2 == 0)) {//.course10SubFee1
		document.getElementsByName("course10SubFee2")[0].value = "";
	}
	if ((document.getElementsByName("course10SubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].course10SubFee3 == 0)) {//.course10SubFee1
		document.getElementsByName("course10SubFee3")[0].value = "";
	}
	if ((document.getElementsByName("course10SubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].course10SubFee4 == 0)) {//.course10SubFee1
		document.getElementsByName("course10SubFee4")[0].value = "";
	}
	if ((document.getElementsByName("course10SubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].course10SubFee5 == 0)) {//.course10SubFee1
		document.getElementsByName("course10SubFee5")[0].value = "";
	}
	
}


function sqlInfoByName() {
	var xmlhttp;
	var strtmp;

	if (document.getElementsByName("userName1")[0].value == "") {
		alert("学生姓名为空，不能查询！");
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
					//document.getElementsByName("submitAddAddFee")[0].disabled = false;
					document.getElementsByName("previous")[0].disabled = true;
					document.getElementsByName("next")[0].disabled = true;
					alert("该姓名学生不存在于系统中，请核对！");
				}else {					
					document.getElementsByName("submitAddAddFee")[0].disabled = true;
					document.getElementsByName("submitAddRefund")[0].disabled = true;
					document.getElementsByName("submitAddTrans")[0].disabled = true;
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
					}else if(resultsLen >1){
						alert("查询到有多名同名学生存在，请使用“上一个”“下一个”进行选择！");
						document.getElementsByName("previous")[0].disabled = false;
						document.getElementsByName("next")[0].disabled = false;
					}
					
					document.getElementsByName("userID")[0].value = "x" + info[0].uid;
					document.getElementsByName("userName1")[0].value = info[0].name1;
					document.getElementsByName("userName2")[0].value = info[0].name2;
					if (info[0].sex == 1) {
						document.getElementsByName("sex")[0].value = "男";
					} else if (info[0].sex == 2) {
						document.getElementsByName("sex")[0].value = "女";
					}
					
					switch(parseInt(info[0].grade)) {
					case 7:
						strtmp = "初一";
						break;
					case 8:
						strtmp = "初二";
						break;
					case 9:
						strtmp = "初三";
						break;
					case 10:
						strtmp = "高一";
						break;
					case 11:
						strtmp = "高二";
						break;
					case 12:
						strtmp = "高三";
						break;
					default:
						break;
					}
					
					document.getElementsByName("grade")[0].value = strtmp;
					
					document.getElementsByName("class")[0].value = info[0].class;
					var tmp = info[0].schoolZone1;
					var str = "";
					if (tmp != "") {
						str = tmp.substr(0, tmp.length - 1);
						document.getElementsByName("schoolZone1")[0].value = str;
					}
					tmp = info[0].schoolZone2;
					if (tmp != "") {
						str = tmp.substr(0, tmp.length - 1);
						document.getElementsByName("schoolZone2")[0].value = str;
					}
					tmp = info[0].schoolZone3;
					if (tmp != "") {
						str = tmp.substr(0, tmp.length - 1);
						document.getElementsByName("schoolZone3")[0].value = str;
					}
					// ajax 嵌套查询校长设置的单价和交费，如果学生交费总额不为了的情况存在即载入该学生最后一次交费记录
					sqlPriceAndSubFeeAndProduct(str);
					//

					// ajax 嵌套查询交费不为0的学科,即已经报名的学科
					var uid = document.getElementsByName("userID")[0].value;
					sqlFeeCourse(uid);
					// 查询交费科目的产品类型
					sqlFeeCourseProduct(uid);
					//

					document.getElementsByName("school1")[0].value = info[0].school1;
					document.getElementsByName("school2")[0].value = info[0].school2;
					document.getElementsByName("studentTel")[0].value = info[0].studentTel;
					document.getElementsByName("motherTel")[0].value = info[0].motherTel;
					document.getElementsByName("fatherTel")[0].value = info[0].fatherTel;
					document.getElementsByName("address")[0].value = info[0].address;
					var time = dateJS("Y-M-d", info[0].inTime);
					document.getElementsByName("time")[0].value = time;
					
					if (GetCookie('role') == '9') {
						document.getElementsByName("submitAddAddFee")[0].disabled = "";
						document.getElementsByName("submitAddRefund")[0].disabled = "";
						document.getElementsByName("submitAddTrans")[0].disabled = "";
					}
					
					// 校区负责人只负责自己校区的事
					if (GetCookie('role') == '8') {
						//document.getElementsByName("teacher")[0].value = decodeURIComponent(GetCookie('userName'));
						var schoolZone = new Array();
						schoolZone[0] = decodeURIComponent(GetCookie('schoolZone1'));
						schoolZone[1] = decodeURIComponent(GetCookie('schoolZone2'));
						schoolZone[2] = decodeURIComponent(GetCookie('schoolZone3'));
						schoolZone[3] = decodeURIComponent(GetCookie('schoolZone4'));
						schoolZone[4] = decodeURIComponent(GetCookie('schoolZone5'));
						
						for(var j=0;j<5;j++){
							if(schoolZone[j] != "null"){
								if(schoolZone[j] == document.getElementsByName("schoolZone1")[0].value){
									document.getElementsByName("submitAddAddFee")[0].disabled = "";
									document.getElementsByName("submitAddRefund")[0].disabled = "";
									document.getElementsByName("submitAddTrans")[0].disabled = "";
								}
								if(schoolZone[j] == document.getElementsByName("schoolZone2")[0].value){
									document.getElementsByName("submitAddAddFee")[0].disabled = "";
									document.getElementsByName("submitAddRefund")[0].disabled = "";
									document.getElementsByName("submitAddTrans")[0].disabled = "";
								}	
								if(schoolZone[j] == document.getElementsByName("schoolZone3")[0].value){
									document.getElementsByName("submitAddAddFee")[0].disabled = "";
									document.getElementsByName("submitAddRefund")[0].disabled = "";
									document.getElementsByName("submitAddTrans")[0].disabled = "";
								}	
							}	
						}						
					}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}
	};
	// 3发出http请求
	// 去除姓名中的所有空格
	var str = document.getElementsByName("userName1")[0].value;
	str = str.replace(/\s+/g, "");
	var url = "fee.php";
	url = url + '?userNameT=' + encodeURIComponent(str);
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function recordWithSameName(flag) {
	if (flag == 'next') {
		if (resultsIndex < resultsLen - 1) {
			resultsIndex++;
		} else {
			alert("已经是最后一位同名学生！");
		}
	} else if (flag == 'previous') {
		if (resultsIndex > 0) {
			resultsIndex--;
		} else {
			alert("已经是第一位同名学生！");
		}
	}

	document.getElementsByName("userID")[0].value = "x" + resultsWithSomeRecord[resultsIndex].uid;
	document.getElementsByName("userName")[0].value = resultsWithSomeRecord[resultsIndex].name1;
	if (resultsWithSomeRecord[resultsIndex].sex == 1) {
		document.getElementsByName("sex")[0].value = "男";
	} else if (resultsWithSomeRecord[resultsIndex].sex == 2) {
		document.getElementsByName("sex")[0].value = "女";
	}

	switch (parseInt(resultsWithSomeRecord[resultsIndex].grade)) {
	case 7:
		strtmp = "初一";
		break;
	case 8:
		strtmp = "初二";
		break;
	case 9:
		strtmp = "初三";
		break;
	case 10:
		strtmp = "高一";
		break;
	case 11:
		strtmp = "高二";
		break;
	case 12:
		strtmp = "高三";
		break;
	default:
		break;
	}

	document.getElementsByName("grade")[0].value = strtmp;

	document.getElementsByName("class")[0].value = resultsWithSomeRecord[resultsIndex].class;
	var tmp = resultsWithSomeRecord[resultsIndex].schoolZone1;
	var str = "";
	if (tmp != "") {
		str = tmp.substr(0, tmp.length - 1);
		document.getElementsByName("schoolZone1")[0].value = str;
	}
	tmp = resultsWithSomeRecord[resultsIndex].schoolZone2;
	if (tmp != "") {
		str = tmp.substr(0, tmp.length - 1);
		document.getElementsByName("schoolZone2")[0].value = str;
	}
	tmp = resultsWithSomeRecord[resultsIndex].schoolZone3;
	if (tmp != "") {
		str = tmp.substr(0, tmp.length - 1);
		document.getElementsByName("schoolZone3")[0].value = str;
	}
	// ajax 嵌套查询校长设置的单价和交费，如果学生交费总额不为了的情况存在即载入该学生最后一次交费记录
	sqlPriceAndSubFeeAndProduct(str);
	//

	// ajax 嵌套查询交费不为0的学科,即已经报名的学科
	var uid = document.getElementsByName("userID")[0].value;
	sqlFeeCourse(uid);
	//

	document.getElementsByName("school1")[0].value = resultsWithSomeRecord[resultsIndex].school1;
	document.getElementsByName("school2")[0].value = resultsWithSomeRecord[resultsIndex].school2;
	document.getElementsByName("studentTel")[0].value = resultsWithSomeRecord[resultsIndex].studentTel;
	document.getElementsByName("motherTel")[0].value = resultsWithSomeRecord[resultsIndex].motherTel;
	document.getElementsByName("fatherTel")[0].value = resultsWithSomeRecord[resultsIndex].fatherTel;
	document.getElementsByName("address")[0].value = resultsWithSomeRecord[resultsIndex].address;
	var time = dateJS("Y-M-d", resultsWithSomeRecord[resultsIndex].time);
	document.getElementsByName("time")[0].value = time;
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

function initPage() {
	// 默认填写当前日期
	document.getElementsByName("timeTrans")[0].value = getNowFormatDate();
	document.getElementsByName("timeRefund")[0].value = getNowFormatDate();
	document.getElementsByName("timeAddFee")[0].value = getNowFormatDate();
	// 校区负责人进入时，不能修改和删除
	if (GetCookie('role') == '8') {
		document.getElementsByName("submitAddAddFee")[0].disabled = "true";
		document.getElementsByName("submitUpdateAddFee")[0].disabled = "true";
		document.getElementsByName("submitDeleteAddFee")[0].disabled = "true";
		document.getElementsByName("submitAddRefund")[0].disabled = "true";
		document.getElementsByName("submitAddTrans")[0].disabled = "true";
	}
	
	// 载入校长设置中的所有科目
	sqlCourse();
}

// ajax 查询各科不同产品的余额
function sqlProductRemainFee(courseIndex) {
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
					
					//remainFeeSum += parseFloat(info[0].remainFee);
	
					// 显示学生余额
					switch(courseIndex) {
					case 1:
						if (document.getElementsByName("remainFee1")[0]) {
							document.getElementsByName("remainFee1")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee1Hide")[0].value = info[0].remainFee;
						}
						break;
					case 2:
						if (document.getElementsByName("remainFee2")[0]) {
							document.getElementsByName("remainFee2")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee2Hide")[0].value = info[0].remainFee;
						}
						break;
					case 3:
						if (document.getElementsByName("remainFee3")[0]) {
							document.getElementsByName("remainFee3")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee3Hide")[0].value = info[0].remainFee;
						}
						break;
					case 4:
						if (document.getElementsByName("remainFee4")[0]) {
							document.getElementsByName("remainFee4")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee4Hide")[0].value = info[0].remainFee;
						}
						break;
					case 5:
						if (document.getElementsByName("remainFee5")[0]) {
							document.getElementsByName("remainFee5")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee5Hide")[0].value = info[0].remainFee;
						}
						break;
					case 6:
						if (document.getElementsByName("remainFee6")[0]) {
							document.getElementsByName("remainFee6")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee6Hide")[0].value = info[0].remainFee;
						}
						break;
					case 7:
						if (document.getElementsByName("remainFee7")[0]) {
							document.getElementsByName("remainFee7")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee7Hide")[0].value = info[0].remainFee;
						}
						break;
					case 8:
						if (document.getElementsByName("remainFee8")[0]) {
							document.getElementsByName("remainFee8")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee8Hide")[0].value = info[0].remainFee;
						}
						break;
					case 9:
						if (document.getElementsByName("remainFee9")[0]) {
							document.getElementsByName("remainFee9")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee9Hide")[0].value = info[0].remainFee;
						}
						break;
					case 10:
						if (document.getElementsByName("remainFee10")[0]) {
							document.getElementsByName("remainFee10")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee10Hide")[0].value = info[0].remainFee;
						}
						break;
					default:
						break;
					}
					// 更新总余额
					//document.getElementsByName("remainFeeSum")[0].value = remainFeeSum.toString();
							
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	var objtemp;
	var sqlProduct;
	var uid = document.getElementsByName("userID")[0].value;

	// 显示学生余额
	switch(courseIndex) {
	case 1:
		objtemp = document.getElementsByName("course1ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse1Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee1CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee1CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee1CheckBox")[0].disabled="";
		}
		break;
	case 2:
		objtemp = document.getElementsByName("course2ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse2Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee2CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee2CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee2CheckBox")[0].disabled="";
		}
	case 3:
		objtemp = document.getElementsByName("course3ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse3Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee3CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee3CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee3CheckBox")[0].disabled="";
		}
		break;
	case 4:
		objtemp = document.getElementsByName("course4ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse4Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee4CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee4CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee4CheckBox")[0].disabled="";
		}
		break;
	case 5:
		objtemp = document.getElementsByName("course5ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse5Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee5CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee5CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee5CheckBox")[0].disabled="";
		}
		break;
	case 6:
		objtemp = document.getElementsByName("course6ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse6Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee6CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee6CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee6CheckBox")[0].disabled="";
		}
		break;
	case 7:
		objtemp = document.getElementsByName("course7ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse7Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee7CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee7CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee7CheckBox")[0].disabled="";
		}
		break;
	case 8:
		objtemp = document.getElementsByName("course8ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse8Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee8CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee8CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee8CheckBox")[0].disabled="";
		}
		break;
	case 9:
		objtemp = document.getElementsByName("course9ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse9Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee9CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee9CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee9CheckBox")[0].disabled="";
		}
		break;
	case 10:
		objtemp = document.getElementsByName("course10ProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundCourse10Product")[0].value = sqlProduct;
		document.getElementsByName("remainFee10CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee10CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee10CheckBox")[0].disabled="";
		}
		break;
	default:
		break;
	}

	// 3发出http请求
	var url = "fee.php";
	url = url + "?sqlRemainFeeByUIDandProduct=" + uid + "&subFeeCourse=" + courseIndex + "&product=" + sqlProduct;
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// ajax 嵌套查询交费不为0的学科,即已经报名的学科
function sqlFeeCourse(uid) {
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

					var objFrom = document.getElementsByName("feeFrom")[0];
					var objFromWay = document.getElementsByName("feeFromWay")[0];
					var objTo = document.getElementsByName("feeTo")[0];
					var objToWay = document.getElementsByName("feeToWay")[0];

					var i = 0;
					// 先清除所有以前选择加进来的，只保留第一个选择的内容
					for ( i = 1; i < objFrom.options.length; ) {
						objFrom.removeChild(objFrom.options[i]);
						objTo.removeChild(objTo.options[i]);
					}
					// 先清除默认的5个学科都有的，根据交费不为0的往里添加
					document.getElementById("RemainFee1Label").innerHTML = "";
					document.getElementById("RemainFee2Label").innerHTML = "";
					document.getElementById("RemainFee3Label").innerHTML = "";
					document.getElementById("RemainFee4Label").innerHTML = "";
					document.getElementById("RemainFee5Label").innerHTML = "";
					document.getElementById("RemainFee6Label").innerHTML = "";
					document.getElementById("RemainFee7Label").innerHTML = "";
					document.getElementById("RemainFee8Label").innerHTML = "";
					document.getElementById("RemainFee9Label").innerHTML = "";
					document.getElementById("RemainFee10Label").innerHTML = "";

					// 再增加数据库中的教师姓名
					//i = 0;
					var j = 0;

					for (var tmp in info) {
						//alert(info[j].sumMath);

						if (info[j].sumCourse1 > 0) {
							objFrom.options.add(new Option(courseLoad[0], 1));
							objTo.options.add(new Option(courseLoad[0], 1));
							//i++;
						}
						if (info[j].sumCourse2 > 0) {
							objFrom.options.add(new Option(courseLoad[1], 2));
							objTo.options.add(new Option(courseLoad[1], 2));
							//i++;
						}
						if (info[j].sumCourse3 > 0) {
							objFrom.options.add(new Option(courseLoad[2], 3));
							objTo.options.add(new Option(courseLoad[2], 3));
							//i++;
						}
						if (info[j].sumCourse4 > 0) {
							objFrom.options.add(new Option(courseLoad[3], 4));
							objTo.options.add(new Option(courseLoad[3], 4));
							//i++;
						}
						if (info[j].sumCourse5 > 0) {
							objFrom.options.add(new Option(courseLoad[4], 5));
							objTo.options.add(new Option(courseLoad[4], 5));
							//i++;
						}
						if (info[j].sumCourse6 > 0) {
							objFrom.options.add(new Option(courseLoad[5], 6));
							objTo.options.add(new Option(courseLoad[5], 6));
							//i++;
						}
						if (info[j].sumCourse7 > 0) {
							objFrom.options.add(new Option(courseLoad[6], 7));
							objTo.options.add(new Option(courseLoad[6], 7));
							//i++;
						}
						if (info[j].sumCourse8 > 0) {
							objFrom.options.add(new Option(courseLoad[7], 8));
							objTo.options.add(new Option(courseLoad[7], 8));
							//i++;
						}
						if (info[j].sumCourse9 > 0) {
							objFrom.options.add(new Option(courseLoad[8], 9));
							objTo.options.add(new Option(courseLoad[8], 9));
							//i++;
						}
						if (info[j].sumCourse10 > 0) {
							objFrom.options.add(new Option(courseLoad[9], 10));
							objTo.options.add(new Option(courseLoad[9], 10));
							//i++;
						}

						// 退费里的余额
						if (info[j].sumCourse1 > 0) {
							document.getElementById("RemainFee1Label").innerHTML = courseLoad[0] + " " + '<input type="number" name="remainFee1" step="0.1" />' + " " + '元' + '<label for="remainFee1"><select name="course1ProductRemainFee" onchange="sqlProductRemainFee(1)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse1Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee1"  name="remainFee1CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee1Label").innerHTML = "";
						}
						if (info[j].sumCourse2 > 0) {
							document.getElementById("RemainFee2Label").innerHTML = courseLoad[1] + " " + '<input type="number" name="remainFee2" step="0.1" />' + " " + '元' + '<label for="remainFee2"><select name="course2ProductRemainFee" onchange="sqlProductRemainFee(2)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse2Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee2"  name="remainFee2CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee2Label").innerHTML = "";
						}
						if (info[j].sumCourse3 > 0) {
							document.getElementById("RemainFee3Label").innerHTML = courseLoad[2] + " " + '<input type="number" name="remainFee3" step="0.1" />' + " " + '元' + '<label for="remainFee3"><select name="course3ProductRemainFee" onchange="sqlProductRemainFee(3)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse3Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee3"  name="remainFee3CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee3Label").innerHTML = "";
						}
						if (info[j].sumCourse4 > 0) {
							document.getElementById("RemainFee4Label").innerHTML = courseLoad[3] + " " + '<input type="number" name="remainFee4" step="0.1" />' + " " + '元' + '<label for="remainFee4"><select name="course4ProductRemainFee" onchange="sqlProductRemainFee(4)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse4Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee4"  name="remainFee4CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee4Label").innerHTML = "";
						}
						if (info[j].sumCourse5 > 0) {
							document.getElementById("RemainFee5Label").innerHTML = courseLoad[4] + " " + '<input type="number" name="remainFee5" step="0.1" />' + " " + '元' + '<label for="remainFee5"><select name="course5ProductRemainFee" onchange="sqlProductRemainFee(5)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse5Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee5"  name="remainFee5CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee5Label").innerHTML = "";
						}
						if (info[j].sumCourse6 > 0) {
							document.getElementById("RemainFee6Label").innerHTML = courseLoad[5] + " " + '<input type="number" name="remainFee6" step="0.1" />' + " " + '元' + '<label for="remainFee6"><select name="course6ProductRemainFee" onchange="sqlProductRemainFee(6)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse6Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee6"  name="remainFee6CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee6Label").innerHTML = "";
						}
						if (info[j].sumCourse7 > 0) {
							document.getElementById("RemainFee7Label").innerHTML = courseLoad[6] + " " + '<input type="number" name="remainFee7" step="0.1" />' + " " + '元' + '<label for="remainFee7"><select name="course7ProductRemainFee" onchange="sqlProductRemainFee(7)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse7Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee7"  name="remainFee7CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee7Label").innerHTML = "";
						}
						if (info[j].sumCourse8 > 0) {
							document.getElementById("RemainFee8Label").innerHTML = courseLoad[7] + " " + '<input type="number" name="remainFee8" step="0.1" />' + " " + '元' + '<label for="remainFee8"><select name="course8ProductRemainFee" onchange="sqlProductRemainFee(8)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse8Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee8"  name="remainFee8CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee8Label").innerHTML = "";
						}
						if (info[j].sumCourse9 > 0) {
							document.getElementById("RemainFee9Label").innerHTML = courseLoad[8] + " " + '<input type="number" name="remainFee9" step="0.1" />' + " " + '元' + '<label for="remainFee9"><select name="course9ProductRemainFee" onchange="sqlProductRemainFee(9)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse9Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee9"  name="remainFee9CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee9Label").innerHTML = "";
						}
						if (info[j].sumCourse10 > 0) {
							document.getElementById("RemainFee10Label").innerHTML = courseLoad[9] + " " + '<input type="number" name="remainFee10" step="0.1" />' + " " + '元' + '<label for="remainFee10"><select name="course10ProductRemainFee" onchange="sqlProductRemainFee(10)"><option value="0">总余额</option></select><input type="hidden" name="refundCourse10Product" value="" /><input type="checkbox" style="width: 1em" id="remainFee10"  name="remainFee10CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee10Label").innerHTML = "";
						}
						j++;
					}
										
					// ajax 查询学生余额
					// 总余额清零
					remainFeeSum = 0;
					
					if(document.getElementsByName("remainFee1")[0]){
						sqlStudentRemainFee(uid,1);
					}
					if(document.getElementsByName("remainFee2")[0]){
						sqlStudentRemainFee(uid,2);
					}
					if(document.getElementsByName("remainFee3")[0]){
						sqlStudentRemainFee(uid,3);
					}
					if(document.getElementsByName("remainFee4")[0]){
						sqlStudentRemainFee(uid,4);
					}
					if(document.getElementsByName("remainFee5")[0]){
						sqlStudentRemainFee(uid,5);
					}
					if(document.getElementsByName("remainFee6")[0]){
						sqlStudentRemainFee(uid,6);
					}
					if(document.getElementsByName("remainFee7")[0]){
						sqlStudentRemainFee(uid,7);
					}
					if(document.getElementsByName("remainFee8")[0]){
						sqlStudentRemainFee(uid,8);
					}
					if(document.getElementsByName("remainFee9")[0]){
						sqlStudentRemainFee(uid,9);
					}
					if(document.getElementsByName("remainFee10")[0]){
						sqlStudentRemainFee(uid,10);
					}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "fee.php";
	url = url + "?sqlCourseStudentUID=" + uid;
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

// ajax 嵌套查询交费不为0的学科,即已经报名的学科
function sqlFeeCourseProduct(uid) {
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
					
					var objFromWay = document.getElementsByName("feeFromWay")[0];
					var objToWay = document.getElementsByName("feeToWay")[0];

					var i = 0;
					// 先清除所有以前选择加进来的，只保留第一个选择的内容
					for ( i = 1; i < objFromWay.options.length; ) {
						objFromWay.removeChild(objFromWay.options[i]);
						objToWay.removeChild(objToWay.options[i]);
					}
						
					// 载入所有记录的所有产品
					var loadProduct = new Array();
					for ( i = 0; i < maxCourseNum; i++) {
						loadProduct[i] = new Array();
					}
					var j = 0;
					i = 0;
					for (var tmp in info) {
						if(info[j].course1Product != ""){
							loadProduct[0][i] = info[j].course1Product;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[j].course2Product != ""){
							loadProduct[1][i] = info[j].course2Product;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[j].course3Product != ""){
							loadProduct[2][i] = info[j].course3Product;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[j].course4Product != ""){
							loadProduct[3][i] = info[j].course4Product;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[j].course5Product != ""){
							loadProduct[4][i] = info[j].course5Product;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[j].course6Product != ""){
							loadProduct[5][i] = info[j].course6Product;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[j].course7Product != ""){
							loadProduct[6][i] = info[j].course7Product;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[j].course8Product != ""){
							loadProduct[7][i] = info[j].course8Product;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[j].course9Product != ""){
							loadProduct[8][i] = info[j].course9Product;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[j].course10Product != ""){
							loadProduct[9][i] = info[j].course10Product;							
							i++;
						}
						j++;
					}
					
					// 去除所有重复产品记录，留下实际产品名称
					for(i=0;i<5;i++){
						product[i]=[];
					}
					for(i=0;i<5;i++){
						product[i]=classifyProduct(loadProduct[i]);
					}			
										
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "fee.php";
	url = url + "?sqlCourseProductStudentUID=" + uid;
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function classifyProduct(loadProduct) {
	var j = 0;
	var i = 0;
	var k = 0;
	var productTemp = new Array();

	for ( i = 0; i < loadProduct.length; i++) {
		if (loadProduct[i] != "") {
			if (productTemp.length == 0) {
				productTemp[0] = loadProduct[0];
				k = 1;
			}
			for ( j = 0; j < productTemp.length; j++) {
				if (loadProduct[i] == productTemp[j]) {
					break;
				}
			}
			if (j == productTemp.length) {
				productTemp[k] = loadProduct[i];
				k++;
			}
		}
	}
	return productTemp;
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

// 载入相应科目的产品名称
function loadCourseProduct(obj) {
	if (obj.name == "feeFrom") {
		var objTemp = document.getElementsByName("feeFromWay")[0];
		for (var i = 1; i < objTemp.options.length; ) {
			objTemp.removeChild(objTemp.options[i]);
		}

		var index = parseInt(obj.value);
		if(index==0){
			return;
		}
		for (var i = 0; i < product[index - 1].length; i++) {
			objTemp.options.add(new Option(product[index-1][i], i));
		};

	}
	if (obj.name == "feeTo") {
		var objTemp = document.getElementsByName("feeToWay")[0];
		for (var i = 1; i < objTemp.options.length; ) {
			objTemp.removeChild(objTemp.options[i]);
		}

		var index = parseInt(obj.value);
		if(index==0){
			return;
		}
		for (var i = 0; i < product[index - 1].length; i++) {
			objTemp.options.add(new Option(product[index-1][i], i));
		};

	}
}

function loadFeeFromProduct(){
	var obj = document.getElementsByName("feeFromWay")[0];
	document.getElementsByName("feeFromProduct")[0].value = obj.options[obj.selectedIndex].text;
}

function loadFeeToProduct(){
	var obj = document.getElementsByName("feeToWay")[0];
	document.getElementsByName("feeToProduct")[0].value = obj.options[obj.selectedIndex].text;
}

function sqlPriceAndSubFeeAndProduct(schoolZone) {
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
					//alert("该校区名不存在，可以创建一个新校区信息！");
				} else if (ret == "2") {
					// document.getElementsByName("submitAdd")[0].disabled =
					// true;
					alert("检查到该校区名有多条记录，请联系管理员！");
				} else {
					//document.getElementsByName("submitUpdatePrice")[0].disabled = false;
					var info = eval(ret);
					
					// 班级
					var strGrade = 0;
					var grade = 0;
					
					if(document.getElementsByName("grade")[0].value == "初一"){
						grade = 7;
					}
					if(document.getElementsByName("grade")[0].value == "初二"){
						grade = 8;
					}
					if(document.getElementsByName("grade")[0].value == "初三"){
						grade = 9;
					}
					if(document.getElementsByName("grade")[0].value == "高一"){
						grade = 10;
					}
					if(document.getElementsByName("grade")[0].value == "高二"){
						grade = 11;
					}
					if(document.getElementsByName("grade")[0].value == "高三"){
						grade = 12;
					}
					
					// 班课价格
					switch(grade) {
					case 7:
						document.getElementsByName("priceBK")[0].value = info[0].priceBKgrade7;
						break;
					case 8:
						document.getElementsByName("priceBK")[0].value = info[0].priceBKgrade8;
						break;
					case 9:
						document.getElementsByName("priceBK")[0].value = info[0].priceBKgrade9;
						break;
					case 10:
						document.getElementsByName("priceBK")[0].value = info[0].priceBKgrade10;
						break;
					case 11:
						document.getElementsByName("priceBK")[0].value = info[0].priceBKgrade11;
						break;
					case 12:
						document.getElementsByName("priceBK")[0].value = info[0].priceBKgrade12;
						break;
					default:
						break;
					}

					// 一对一单价
					document.getElementsByName("hour1")[0].value = info[0].hour1;
					document.getElementsByName("hour2")[0].value = info[0].hour2;
					document.getElementsByName("hour3")[0].value = info[0].hour3;
			
					switch(grade) {
					case 7:
						document.getElementsByName("price1YDY")[0].value = info[0].price7hour1YDY;
						document.getElementsByName("price2YDY")[0].value = info[0].price7hour2YDY;
						document.getElementsByName("price3YDY")[0].value = info[0].price7hour3YDY;
						document.getElementsByName("pay1")[0].value = info[0].pay7;
						document.getElementsByName("pay2")[0].value = info[0].pay7;
						document.getElementsByName("pay3")[0].value = info[0].pay7;
						break;
					case 8:
						document.getElementsByName("price1YDY")[0].value = info[0].price8hour1YDY;
						document.getElementsByName("price2YDY")[0].value = info[0].price8hour2YDY;
						document.getElementsByName("price3YDY")[0].value = info[0].price8hour3YDY;
						document.getElementsByName("pay1")[0].value = info[0].pay8;
						document.getElementsByName("pay2")[0].value = info[0].pay8;
						document.getElementsByName("pay3")[0].value = info[0].pay8;
						break;
					case 9:
						document.getElementsByName("price1YDY")[0].value = info[0].price9hour1YDY;
						document.getElementsByName("price2YDY")[0].value = info[0].price9hour2YDY;
						document.getElementsByName("price3YDY")[0].value = info[0].price9hour3YDY;
						document.getElementsByName("pay1")[0].value = info[0].pay9;
						document.getElementsByName("pay2")[0].value = info[0].pay9;
						document.getElementsByName("pay3")[0].value = info[0].pay9;
						break;
					case 10:
						document.getElementsByName("price1YDY")[0].value = info[0].price10hour1YDY;
						document.getElementsByName("price2YDY")[0].value = info[0].price10hour2YDY;
						document.getElementsByName("price3YDY")[0].value = info[0].price10hour3YDY;
						document.getElementsByName("pay1")[0].value = info[0].pay10;
						document.getElementsByName("pay2")[0].value = info[0].pay10;
						document.getElementsByName("pay3")[0].value = info[0].pay10;
						break;
					case 11:
						document.getElementsByName("price1YDY")[0].value = info[0].price11hour1YDY;
						document.getElementsByName("price2YDY")[0].value = info[0].price11hour2YDY;
						document.getElementsByName("price3YDY")[0].value = info[0].price11hour3YDY;
						document.getElementsByName("pay1")[0].value = info[0].pay11;
						document.getElementsByName("pay2")[0].value = info[0].pay11;
						document.getElementsByName("pay3")[0].value = info[0].pay11;
						break;
					case 12:
						document.getElementsByName("price1YDY")[0].value = info[0].price12hour1YDY;
						document.getElementsByName("price2YDY")[0].value = info[0].price12hour2YDY;
						document.getElementsByName("price3YDY")[0].value = info[0].price12hour3YDY;
						document.getElementsByName("pay1")[0].value = info[0].pay12;
						document.getElementsByName("pay2")[0].value = info[0].pay12;
						document.getElementsByName("pay3")[0].value = info[0].pay12;
						break;
					default:
						break;
					}

					// 如果学生存在交费记录则再载入学生最后一次交费记录，替代校长设置的单价，并载入最后一次交费记录
					// ajax
					sqlRecordAddFee();
					//
					
					// 费用分配
					if (info[0].course1 != "") {
						document.getElementById("course1LabelAddFee").innerHTML = courseLoad[0]+ '<select name = "course1Product" onchange="checkHiddenValueProduct(1)">'
								+ '<option value=0>--请选择--</option>'
							   + '</select>'							   						   
							   + '<input type="hidden" name="course1ProductCopy" />'
							   + '<input type="number" style="width: 4em" name="course1" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course1Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course1SubFee1" />元';
						} else {
							document.getElementById("subFee1Course1Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course1Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course1SubFee2" />元';
						} else {
							document.getElementById("subFee2Course1Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course1Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course1SubFee3" />元';
						} else {
							document.getElementById("subFee3Course1Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course1Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course1SubFee4" />元';
						} else {
							document.getElementById("subFee4Course1Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course1Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course1SubFee5" />元';
						} else {
							document.getElementById("subFee5Course1Label").innerHTML = "";
						}
					} else {
						document.getElementById("course1LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course1Label").innerHTML = "";
						document.getElementById("subFee2Course1Label").innerHTML = "";
						document.getElementById("subFee3Course1Label").innerHTML = "";
						document.getElementById("subFee4Course1Label").innerHTML = "";
						document.getElementById("subFee5Course1Label").innerHTML = "";
					}

					if (info[0].course2 != "") {
						document.getElementById("course2LabelAddFee").innerHTML = courseLoad[1] + '<select name = "course2Product" onchange="checkHiddenValueProduct(2)">'
							+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="course2ProductCopy" />' 
							+ '<input type="number" style="width: 4em" name="course2" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course2Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course2SubFee1" />元';
						} else {
							document.getElementById("subFee1Course2Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course2Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course2SubFee2" />元';
						} else {
							document.getElementById("subFee2Course2Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course2Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course2SubFee3" />元';
						} else {
							document.getElementById("subFee3Course2Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course2Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course2SubFee4" />元';
						} else {
							document.getElementById("subFee4Course2Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course2Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course2SubFee5" />元';
						} else {
							document.getElementById("subFee5Course2Label").innerHTML = "";
						}
					} else {
						document.getElementById("course2LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course2Label").innerHTML = "";
						document.getElementById("subFee2Course2Label").innerHTML = "";
						document.getElementById("subFee3Course2Label").innerHTML = "";
						document.getElementById("subFee4Course2Label").innerHTML = "";
						document.getElementById("subFee5Course2Label").innerHTML = "";
					}

					if (info[0].course3 != "") {
						document.getElementById("course3LabelAddFee").innerHTML = courseLoad[2]+ '<select name = "course3Product" onchange="checkHiddenValueProduct(3)">'
							+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="course3ProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="course3" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course3Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course3SubFee1" />元';
						} else {
							document.getElementById("subFee1Course3Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course3Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="course3SubFee2" />元';
						} else {
							document.getElementById("subFee2Course3Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course3Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="course3SubFee3" />元';
						} else {
							document.getElementById("subFee3Course3Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course3Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="course3SubFee4" />元';
						} else {
							document.getElementById("subFee4Course3Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course3Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="course3SubFee5" />元';
						} else {
							document.getElementById("subFee5Course3Label").innerHTML = "";
						}
					} else {
						document.getElementById("course3LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course3Label").innerHTML = "";
						document.getElementById("subFee2Course3Label").innerHTML = "";
						document.getElementById("subFee3Course3Label").innerHTML = "";
						document.getElementById("subFee4Course3Label").innerHTML = "";
						document.getElementById("subFee5Course3Label").innerHTML = "";
					}

					if (info[0].course4 != "") {
						document.getElementById("course4LabelAddFee").innerHTML = courseLoad[3]+ '<select name = "course4Product" onchange="checkHiddenValueProduct(4)">'
						+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="course4ProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="course4" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course4Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="course4SubFee1" />元';
						} else {
							document.getElementById("subFee1Course4Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course4Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course4SubFee2" />元';
						} else {
							document.getElementById("subFee2Course4Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course4Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course4SubFee3" />元';
						} else {
							document.getElementById("subFee3Course4Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course4Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="course4SubFee4" />元';
						} else {
							document.getElementById("subFee4Course4Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course4Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course4SubFee5" />元';
						} else {
							document.getElementById("subFee5Course4Label").innerHTML = "";
						}
					} else {
						document.getElementById("course4LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course4Label").innerHTML = "";
						document.getElementById("subFee2Course4Label").innerHTML = "";
						document.getElementById("subFee3Course4Label").innerHTML = "";
						document.getElementById("subFee4Course4Label").innerHTML = "";
						document.getElementById("subFee5Course4Label").innerHTML = "";
					}

					if (info[0].course5 != "") {
						document.getElementById("course5LabelAddFee").innerHTML = courseLoad[4] + '<select name = "course5Product" onchange="checkHiddenValueProduct(5)">'
						+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="course5ProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="course5" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course5Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course5SubFee1" />元';
						} else {
							document.getElementById("subFee1Course5Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course5Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course5SubFee2" />元';
						} else {
							document.getElementById("subFee2Course5Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course5Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course5SubFee3" />元';
						} else {
							document.getElementById("subFee3Course5Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course5Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course5SubFee4" />元';
						} else {
							document.getElementById("subFee4Course5Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course5Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course5SubFee5" />元';
						} else {
							document.getElementById("subFee5Course5Label").innerHTML = "";
						}
					} else {
						document.getElementById("course5LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course5Label").innerHTML = "";
						document.getElementById("subFee2Course5Label").innerHTML = "";
						document.getElementById("subFee3Course5Label").innerHTML = "";
						document.getElementById("subFee4Course5Label").innerHTML = "";
						document.getElementById("subFee5Course5Label").innerHTML = "";
					}
					
					if (info[0].course6 != "") {
						document.getElementById("course6LabelAddFee").innerHTML = courseLoad[5] + '<select name = "course6Product" onchange="checkHiddenValueProduct(6)">'
						+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="course6ProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="course6" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course6Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course6SubFee1" />元';
						} else {
							document.getElementById("subFee1Course6Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course6Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course6SubFee2" />元';
						} else {
							document.getElementById("subFee2Course6Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course6Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course6SubFee3" />元';
						} else {
							document.getElementById("subFee3Course6Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course6Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course6SubFee4" />元';
						} else {
							document.getElementById("subFee4Course6Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course6Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course6SubFee5" />元';
						} else {
							document.getElementById("subFee5Course6Label").innerHTML = "";
						}
					} else {
						document.getElementById("course6LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course6Label").innerHTML = "";
						document.getElementById("subFee2Course6Label").innerHTML = "";
						document.getElementById("subFee3Course6Label").innerHTML = "";
						document.getElementById("subFee4Course6Label").innerHTML = "";
						document.getElementById("subFee5Course6Label").innerHTML = "";
					}
					
					if (info[0].course7 != "") {
						document.getElementById("course7LabelAddFee").innerHTML = courseLoad[6] + '<select name = "course7Product" onchange="checkHiddenValueProduct(7)">'
						+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="course7ProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="course7" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course7Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course7SubFee1" />元';
						} else {
							document.getElementById("subFee1Course7Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course7Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course7SubFee2" />元';
						} else {
							document.getElementById("subFee2Course7Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course7Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course7SubFee3" />元';
						} else {
							document.getElementById("subFee3Course7Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course7Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course7SubFee4" />元';
						} else {
							document.getElementById("subFee4Course7Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course7Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course7SubFee5" />元';
						} else {
							document.getElementById("subFee5Course7Label").innerHTML = "";
						}
					} else {
						document.getElementById("course7LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course7Label").innerHTML = "";
						document.getElementById("subFee2Course7Label").innerHTML = "";
						document.getElementById("subFee3Course7Label").innerHTML = "";
						document.getElementById("subFee4Course7Label").innerHTML = "";
						document.getElementById("subFee5Course7Label").innerHTML = "";
					}
					
					if (info[0].course8 != "") {
						document.getElementById("course8LabelAddFee").innerHTML = courseLoad[7] + '<select name = "course8Product" onchange="checkHiddenValueProduct(8)">'
						+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="course8ProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="course8" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course8Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course8SubFee1" />元';
						} else {
							document.getElementById("subFee1Course8Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course8Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course8SubFee2" />元';
						} else {
							document.getElementById("subFee2Course8Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course8Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course8SubFee3" />元';
						} else {
							document.getElementById("subFee3Course8Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course8Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course8SubFee4" />元';
						} else {
							document.getElementById("subFee4Course8Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course8Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course8SubFee5" />元';
						} else {
							document.getElementById("subFee5Course8Label").innerHTML = "";
						}
					} else {
						document.getElementById("course8LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course8Label").innerHTML = "";
						document.getElementById("subFee2Course8Label").innerHTML = "";
						document.getElementById("subFee3Course8Label").innerHTML = "";
						document.getElementById("subFee4Course8Label").innerHTML = "";
						document.getElementById("subFee5Course8Label").innerHTML = "";
					}
					
					if (info[0].course9 != "") {
						document.getElementById("course9LabelAddFee").innerHTML = courseLoad[8] + '<select name = "course9Product" onchange="checkHiddenValueProduct(9)">'
						+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="course9ProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="course9" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course9Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course9SubFee1" />元';
						} else {
							document.getElementById("subFee1Course9Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course9Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course9SubFee2" />元';
						} else {
							document.getElementById("subFee2Course9Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course9Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course9SubFee3" />元';
						} else {
							document.getElementById("subFee3Course9Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course9Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course9SubFee4" />元';
						} else {
							document.getElementById("subFee4Course9Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course9Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course9SubFee5" />元';
						} else {
							document.getElementById("subFee5Course9Label").innerHTML = "";
						}
					} else {
						document.getElementById("course9LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course9Label").innerHTML = "";
						document.getElementById("subFee2Course9Label").innerHTML = "";
						document.getElementById("subFee3Course9Label").innerHTML = "";
						document.getElementById("subFee4Course9Label").innerHTML = "";
						document.getElementById("subFee5Course9Label").innerHTML = "";
					}
					
					if (info[0].course10 != "") {
						document.getElementById("course10LabelAddFee").innerHTML = courseLoad[9] + '<select name = "course10Product" onchange="checkHiddenValueProduct(10)">'
						+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="course10ProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="course10" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1Course10Label").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course10SubFee1" />元';
						} else {
							document.getElementById("subFee1Course10Label").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2Course10Label").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course10SubFee2" />元';
						} else {
							document.getElementById("subFee2Course10Label").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3Course10Label").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course10SubFee3" />元';
						} else {
							document.getElementById("subFee3Course10Label").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4Course10Label").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course10SubFee4" />元';
						} else {
							document.getElementById("subFee4Course10Label").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5Course10Label").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="course10SubFee5" />元';
						} else {
							document.getElementById("subFee5Course10Label").innerHTML = "";
						}
					} else {
						document.getElementById("course10LabelAddFee").innerHTML = "";
						document.getElementById("subFee1Course10Label").innerHTML = "";
						document.getElementById("subFee2Course10Label").innerHTML = "";
						document.getElementById("subFee3Course10Label").innerHTML = "";
						document.getElementById("subFee4Course10Label").innerHTML = "";
						document.getElementById("subFee5Course10Label").innerHTML = "";
					}
					/*
					var obj = document.getElementsByName("MathProduct")[0];
					obj.options.add(new Option(info[0].product1, 1));	
					alert(info[0].product1);
					alert(obj);
					*/
					
				    var obj1 = document.getElementsByName("course1Product")[0];
					var obj2 = document.getElementsByName("course2Product")[0];
					var obj3 = document.getElementsByName("course3Product")[0];
					var obj4 = document.getElementsByName("course4Product")[0];
					var obj5 = document.getElementsByName("course5Product")[0];
					var obj6 = document.getElementsByName("course6Product")[0];
					var obj7 = document.getElementsByName("course7Product")[0];
					var obj8 = document.getElementsByName("course8Product")[0];
					var obj9 = document.getElementsByName("course9Product")[0];
					var obj10 = document.getElementsByName("course10Product")[0];
					// 产品名称
					
					if(obj1){
						for(var i=1;i<obj1.options.length;){
							obj1.removeChild(obj1.options[i]);
						}						
					}
					if(obj2){
						for(var i=1;i<obj2.options.length;){
							obj2.removeChild(obj2.options[i]);
						}						
					}
					if(obj3){
						for(var i=1;i<obj3.options.length;){
							obj3.removeChild(obj3.options[i]);
						}						
					}
					if(obj4){
						for(var i=1;i<obj4.options.length;){
							obj4.removeChild(obj4.options[i]);
						}						
					}
					if(obj5){
						for(var i=1;i<obj5.options.length;){
							obj5.removeChild(obj5.options[i]);
						}						
					}
					if(obj6){
						for(var i=1;i<obj6.options.length;){
							obj6.removeChild(obj6.options[i]);
						}						
					}
					if(obj7){
						for(var i=1;i<obj7.options.length;){
							obj7.removeChild(obj7.options[i]);
						}						
					}
					if(obj8){
						for(var i=1;i<obj8.options.length;){
							obj8.removeChild(obj8.options[i]);
						}						
					}
					if(obj9){
						for(var i=1;i<obj9.options.length;){
							obj9.removeChild(obj9.options[i]);
						}						
					}
					if(obj10){
						for(var i=1;i<obj10.options.length;){
							obj10.removeChild(obj10.options[i]);
						}						
					}
															
					
					if(info[0].product1 !=""){
						if(obj1){
							obj1.options.add(new Option(info[0].product1, 1));	
						}
						if(obj2){
							obj2.options.add(new Option(info[0].product1, 1));	
						}
						if(obj3){
							obj3.options.add(new Option(info[0].product1, 1));	
						}
						if(obj4){
							obj4.options.add(new Option(info[0].product1, 1));	
						}
						if(obj5){
							obj5.options.add(new Option(info[0].product1, 1));	
						}
						if(obj6){
							obj6.options.add(new Option(info[0].product1, 1));	
						}
						if(obj7){
							obj7.options.add(new Option(info[0].product1, 1));	
						}
						if(obj8){
							obj8.options.add(new Option(info[0].product1, 1));	
						}
						if(obj9){
							obj9.options.add(new Option(info[0].product1, 1));	
						}
						if(obj10){
							obj10.options.add(new Option(info[0].product1, 1));	
						}
					}
										
					if(info[0].product2 !=""){
						if(obj1){
						obj1.options.add(new Option(info[0].product2, 1));	
						}
						if(obj2){
						obj2.options.add(new Option(info[0].product2, 1));	
						}
						if(obj3){
						obj3.options.add(new Option(info[0].product2, 1));	
						}
						if(obj4){
						obj4.options.add(new Option(info[0].product2, 1));	
						}
						if(obj5){
						obj5.options.add(new Option(info[0].product2, 1));	
						}
						if(obj6){
						obj6.options.add(new Option(info[0].product2, 1));	
						}
						if(obj7){
						obj7.options.add(new Option(info[0].product2, 1));	
						}
						if(obj8){
						obj8.options.add(new Option(info[0].product2, 1));	
						}
						if(obj9){
						obj9.options.add(new Option(info[0].product2, 1));	
						}
						if(obj10){
						obj10.options.add(new Option(info[0].product2, 1));	
						}
					}
					if(info[0].product3!=""){
						if(obj1){
						obj1.options.add(new Option(info[0].product3, 1));	
						}
						if(obj2){
						obj2.options.add(new Option(info[0].product3, 1));	
						}
						if(obj3){
						obj3.options.add(new Option(info[0].product3, 1));	
						}
						if(obj4){
						obj4.options.add(new Option(info[0].product3, 1));	
						}
						if(obj5){
						obj5.options.add(new Option(info[0].product3, 1));	
						}
						if(obj6){
						obj6.options.add(new Option(info[0].product3, 1));	
						}
						if(obj7){
						obj7.options.add(new Option(info[0].product3, 1));	
						}
						if(obj8){
						obj8.options.add(new Option(info[0].product3, 1));	
						}
						if(obj9){
						obj9.options.add(new Option(info[0].product3, 1));	
						}
						if(obj10){
						obj10.options.add(new Option(info[0].product3, 1));	
						}
					}
					if(info[0].product4 !=""){
						if(obj1){
						obj1.options.add(new Option(info[0].product4, 1));	
						}
						if(obj2){
						obj2.options.add(new Option(info[0].product4, 1));	
						}
						if(obj3){
						obj3.options.add(new Option(info[0].product4, 1));	
						}
						if(obj4){
						obj4.options.add(new Option(info[0].product4, 1));	
						}
						if(obj5){
						obj5.options.add(new Option(info[0].product4, 1));	
						}
						if(obj6){
						obj6.options.add(new Option(info[0].product3, 1));	
						}
						if(obj7){
						obj7.options.add(new Option(info[0].product3, 1));	
						}
						if(obj8){
						obj8.options.add(new Option(info[0].product3, 1));	
						}
						if(obj9){
						obj9.options.add(new Option(info[0].product3, 1));	
						}
						if(obj10){
						obj10.options.add(new Option(info[0].product3, 1));	
						}
					}
					if(info[0].product5 !=""){
						if(obj1){
						obj1.options.add(new Option(info[0].product5, 1));
						}
						if(obj2){
						obj2.options.add(new Option(info[0].product5, 1));	
						}
						if(obj3){
						obj3.options.add(new Option(info[0].product5, 1));	
						}
						if(obj4){
						obj4.options.add(new Option(info[0].product5, 1));	
						}
						if(obj5){
						obj5.options.add(new Option(info[0].product5, 1));	
						}
						if(obj6){
						obj6.options.add(new Option(info[0].product3, 1));	
						}
						if(obj7){
						obj7.options.add(new Option(info[0].product3, 1));	
						}
						if(obj8){
						obj8.options.add(new Option(info[0].product3, 1));	
						}
						if(obj9){
						obj9.options.add(new Option(info[0].product3, 1));	
						}
						if(obj10){
						obj10.options.add(new Option(info[0].product3, 1));	
						}
					}
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}

	};
	// 3发出http请求
	var url = "fee.php";
	url = url + "?schoolZoneT=" + encodeURIComponent(schoolZone);
	// 很重要，必须有的
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function checkHiddenValueProduct(flag) {
	var obj;
	var strtmp="";
	switch(flag){
	case 1:
		obj = document.getElementsByName("course1Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course1ProductCopy")[0].value = strtmp;
		break;
	case 2:
		obj = document.getElementsByName("course2Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course2ProductCopy")[0].value = strtmp;
		break;
	case 3:
		obj = document.getElementsByName("course3Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course3ProductCopy")[0].value = strtmp;
		break;
	case 4:
		obj = document.getElementsByName("course4Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course4ProductCopy")[0].value = strtmp;
		break;
	case 5:
		obj = document.getElementsByName("course5Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course5ProductCopy")[0].value = strtmp;
		break;
	case 6:
		obj = document.getElementsByName("course6Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course6ProductCopy")[0].value = strtmp;
		break;
	case 7:
		obj = document.getElementsByName("course7Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course7ProductCopy")[0].value = strtmp;
		break;
	case 8:
		obj = document.getElementsByName("course8Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course8ProductCopy")[0].value = strtmp;
		break;
	case 9:
		obj = document.getElementsByName("course9Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course9ProductCopy")[0].value = strtmp;
		break;
	case 10:
		obj = document.getElementsByName("course10Product")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("course10ProductCopy")[0].value = strtmp;
		break;
	default:
		break;
	}
	
//	var obj = document.getElementsByName("MathProduct")[0];
//	document.getElementsByName("MathProductCopy")[0].value = obj.options[document.getElementsByName("MathProduct")[0].selectedIndex].text;
}

function setHour2() {
	document.getElementsByName("hour2")[0].value = document.getElementsByName("hour3")[0].value;
}

function setHour3() {
	document.getElementsByName("hour3")[0].value = document.getElementsByName("hour2")[0].value;
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


