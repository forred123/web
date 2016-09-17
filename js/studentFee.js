/**
 * @author zyx
 */

var objRecordAddFee;
var lenRecordAddFee = 0;
var indexRecordAddFee = 0;
var remainFeeSum = 0;
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
		/*
		if(feeSum<=0){
			alert("交费金额必须为正数！");
			return false;
		}
		*/

		var Math = 0;
		if (document.getElementsByName("Math")[0]) {
			if (document.getElementsByName("Math")[0].value != "") {
				Math = parseInt(document.getElementsByName("Math")[0].value);
			}
		}

		var MathSubFee1 = 0;
		if (document.getElementsByName("MathSubFee1")[0]) {
			if (document.getElementsByName("MathSubFee1")[0].value != "") {
				MathSubFee1 = parseInt(document.getElementsByName("MathSubFee1")[0].value);
			}
		}
		var MathSubFee2 = 0;
		if (document.getElementsByName("MathSubFee2")[0]) {
			if (document.getElementsByName("MathSubFee2")[0].value != "") {
				MathSubFee2 = parseInt(document.getElementsByName("MathSubFee2")[0].value);
			}
		}
		var MathSubFee3 = 0;
		if (document.getElementsByName("MathSubFee3")[0]) {
			if (document.getElementsByName("MathSubFee3")[0].value != "") {
				MathSubFee3 = parseInt(document.getElementsByName("MathSubFee3")[0].value);
			}
		}
		var MathSubFee4 = 0;
		if (document.getElementsByName("MathSubFee4")[0]) {
			if (document.getElementsByName("MathSubFee4")[0].value != "") {
				MathSubFee4 = parseInt(document.getElementsByName("MathSubFee4")[0].value);
			}
		}
		var MathSubFee5 = 0;
		if (document.getElementsByName("MathSubFee5")[0]) {
			if (document.getElementsByName("MathSubFee5")[0].value != "") {
				MathSubFee5 = parseInt(document.getElementsByName("MathSubFee5")[0].value);
			}
		}
		var Chinese = 0;
		if (document.getElementsByName("Chinese")[0]) {
			if (document.getElementsByName("Chinese")[0].value != "") {
				Chinese = parseInt(document.getElementsByName("Chinese")[0].value);
			}
		}
		var ChineseSubFee1 = 0;
		if (document.getElementsByName("ChineseSubFee1")[0]) {
			if (document.getElementsByName("ChineseSubFee1")[0].value != "") {
				ChineseSubFee1 = parseInt(document.getElementsByName("ChineseSubFee1")[0].value);
			}
		}
		var ChineseSubFee2 = 0;
		if (document.getElementsByName("ChineseSubFee2")[0]) {
			if (document.getElementsByName("ChineseSubFee2")[0].value != "") {
				ChineseSubFee2 = parseInt(document.getElementsByName("ChineseSubFee2")[0].value);
			}
		}
		var ChineseSubFee3 = 0;
		if (document.getElementsByName("ChineseSubFee3")[0]) {
			if (document.getElementsByName("ChineseSubFee3")[0].value != "") {
				ChineseSubFee3 = parseInt(document.getElementsByName("ChineseSubFee3")[0].value);
			}
		}
		var ChineseSubFee4 = 0;
		if (document.getElementsByName("ChiChineseSubFee4")[0]) {
			if (document.getElementsByName("ChineseSubFee4")[0].value != "") {
				ChineseSubFee4 = parseInt(document.getElementsByName("ChineseSubFee4")[0].value);
			}
		}
		var ChineseSubFee5 = 0;
		if (document.getElementsByName("ChineseSubFee5")[0]) {
			if (document.getElementsByName("ChineseSubFee5")[0].value != "") {
				ChineseSubFee5 = parseInt(document.getElementsByName("ChineseSubFee5")[0].value);
			}
		}
		var English = 0;
		if (document.getElementsByName("English")[0]) {
			if (document.getElementsByName("English")[0].value != "") {
				English = parseInt(document.getElementsByName("English")[0].value);
			}
		}
		var EnglishSubFee1 = 0;
		if (document.getElementsByName("EnglishSubFee1")[0]) {
			if (document.getElementsByName("EnglishSubFee1")[0].value != "") {
				EnglishSubFee1 = parseInt(document.getElementsByName("EnglishSubFee1")[0].value);
			}
		}
		var EnglishSubFee2 = 0;
		if (document.getElementsByName("EnglishSubFee2")[0]) {
			if (document.getElementsByName("EnglishSubFee2")[0].value != "") {
				EnglishSubFee2 = parseInt(document.getElementsByName("EnglishSubFee2")[0].value);
			}
		}
		var EnglishSubFee3 = 0;
		if (document.getElementsByName("EnglishSubFee3")[0]) {
			if (document.getElementsByName("EnglishSubFee3")[0].value != "") {
				EnglishSubFee3 = parseInt(document.getElementsByName("EnglishSubFee3")[0].value);
			}
		}
		var EnglishSubFee4 = 0;
		if (document.getElementsByName("EnglishSubFee4")[0]) {
			if (document.getElementsByName("EnglishSubFee4")[0].value != "") {
				EnglishSubFee4 = parseInt(document.getElementsByName("EnglishSubFee4")[0].value);
			}
		}
		var EnglishSubFee5 = 0;
		if (document.getElementsByName("EnglishSubFee5")[0]) {
			if (document.getElementsByName("EnglishSubFee5")[0].value != "") {
				EnglishSubFee5 = parseInt(document.getElementsByName("EnglishSubFee5")[0].value);
			}
		}
		var Physics = 0;
		if (document.getElementsByName("Physics")[0]) {
			if (document.getElementsByName("Physics")[0].value != "") {
				Physics = parseInt(document.getElementsByName("Physics")[0].value);
			}
		}
		var PhysicsSubFee1 = 0;
		if (document.getElementsByName("PhysicsSubFee1")[0]) {
			if (document.getElementsByName("PhysicsSubFee1")[0].value != "") {
				PhysicsSubFee1 = parseInt(document.getElementsByName("PhysicsSubFee1")[0].value);
			}
		}
		var PhysicsSubFee2 = 0;
		if (document.getElementsByName("PhysicsSubFee2")[0]) {
			if (document.getElementsByName("PhysicsSubFee2")[0].value != "") {
				PhysicsSubFee2 = parseInt(document.getElementsByName("PhysicsSubFee2")[0].value);
			}
		}
		var PhysicsSubFee3 = 0;
		if (document.getElementsByName("PhysicsSubFee3")[0]) {
			if (document.getElementsByName("PhysicsSubFee3")[0].value != "") {
				PhysicsSubFee3 = parseInt(document.getElementsByName("PhysicsSubFee3")[0].value);
			}
		}
		var PhysicsSubFee4 = 0;
		if (document.getElementsByName("PhysicsSubFee4")[0]) {
			if (document.getElementsByName("PhysicsSubFee4")[0].value != "") {
				PhysicsSubFee4 = parseInt(document.getElementsByName("PhysicsSubFee4")[0].value);
			}
		}
		var PhysicsSubFee5 = 0;
		if (document.getElementsByName("PhysicsSubFee5")[0]) {
			if (document.getElementsByName("PhysicsSubFee5")[0].value != "") {
				PhysicsSubFee5 = parseInt(document.getElementsByName("PhysicsSubFee5")[0].value);
			}
		}
		var Chemistry = 0;
		if (document.getElementsByName("Chemistry")[0]) {
			if (document.getElementsByName("Chemistry")[0].value != "") {
				Chemistry = parseInt(document.getElementsByName("Chemistry")[0].value);
			}
		}
		var ChemistrySubFee1 = 0;
		if (document.getElementsByName("ChemistrySubFee1")[0]) {
			if (document.getElementsByName("ChemistrySubFee1")[0].value != "") {
				ChemistrySubFee1 = parseInt(document.getElementsByName("ChemistrySubFee1")[0].value);
			}
		}
		var ChemistrySubFee2 = 0;
		if (document.getElementsByName("ChemistrySubFee2")[0]) {
			if (document.getElementsByName("ChemistrySubFee2")[0].value != "") {
				ChemistrySubFee2 = parseInt(document.getElementsByName("ChemistrySubFee2")[0].value);
			}
		}
		var ChemistrySubFee3 = 0;
		if (document.getElementsByName("ChemistrySubFee3")[0]) {
			if (document.getElementsByName("ChemistrySubFee3")[0].value != "") {
				ChemistrySubFee3 = parseInt(document.getElementsByName("ChemistrySubFee3")[0].value);
			}
		}
		var ChemistrySubFee4 = 0;
		if (document.getElementsByName("ChemistrySubFee4")[0]) {
			if (document.getElementsByName("ChemistrySubFee4")[0].value != "") {
				ChemistrySubFee4 = parseInt(document.getElementsByName("ChemistrySubFee4")[0].value);
			}
		}
		var ChemistrySubFee5 = 0;
		if (document.getElementsByName("ChemistrySubFee5")[0]) {
			if (document.getElementsByName("ChemistrySubFee5")[0].value != "") {
				ChemistrySubFee5 = parseInt(document.getElementsByName("ChemistrySubFee5")[0].value);
			}
		}

		var feeCalSum = Math + MathSubFee1 + MathSubFee2 + MathSubFee3 + MathSubFee4 + MathSubFee5 + Chinese + ChineseSubFee1 + ChineseSubFee2 + ChineseSubFee3 + ChineseSubFee4 + ChineseSubFee5 + English + EnglishSubFee1 + EnglishSubFee2 + EnglishSubFee3 + EnglishSubFee4 + EnglishSubFee5 + Physics + PhysicsSubFee1 + PhysicsSubFee2 + PhysicsSubFee3 + PhysicsSubFee4 + PhysicsSubFee5 + Chemistry + ChemistrySubFee1 + ChemistrySubFee2 + ChemistrySubFee3 + ChemistrySubFee4 + ChemistrySubFee5;

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
								document.getElementsByName("MathProductRemainFee")[0].options.add(new Option(product[0][i], i));
							};

						}
						break;
					case 2:
						if (document.getElementsByName("remainFee2")[0]) {
							document.getElementsByName("remainFee2")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee2Hide")[0].value = info[0].remainFee;
							
							for (var i = 0; i < product[1].length; i++) {
								document.getElementsByName("ChineseProductRemainFee")[0].options.add(new Option(product[1][i], i));
							};
						}
						break;
					case 3:
						if (document.getElementsByName("remainFee3")[0]) {
							document.getElementsByName("remainFee3")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee3Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[2].length; i++) {
								document.getElementsByName("EnglishProductRemainFee")[0].options.add(new Option(product[2][i], i));
							};
						}
						break;
					case 4:
						if (document.getElementsByName("remainFee4")[0]) {
							document.getElementsByName("remainFee4")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee4Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[3].length; i++) {
								document.getElementsByName("PhysicsProductRemainFee")[0].options.add(new Option(product[3][i], i));
							};
						}
						break;
					case 5:
						if (document.getElementsByName("remainFee5")[0]) {
							document.getElementsByName("remainFee5")[0].value = info[0].remainFee;
							document.getElementsByName("remainFee5Hide")[0].value = info[0].remainFee;
							for (var i = 0; i < product[4].length; i++) {
								document.getElementsByName("ChemistryProductRemainFee")[0].options.add(new Option(product[4][i], i));
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

					var grade = parseInt(document.getElementsByName("grade")[0].value);
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
					
					objtmp = document.getElementsByName("MathProduct")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].MathProduct) {
								objtmp.options[i].selected = true;
								document.getElementsByName("MathProductCopy")[0].value = info[lenRecordAddFee-1].MathProduct;
								break;
							}
						}
					}

					objtmp = document.getElementsByName("ChineseProduct")[0];
					if(objtmp){						
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].ChineseProduct) {
								objtmp.options[i].selected = true;
								document.getElementsByName("ChineseProductCopy")[0].value = info[lenRecordAddFee-1].ChineseProduct;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("EnglishProduct")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].EnglishProduct) {
								objtmp.options[i].selected = true;
								document.getElementsByName("EnglishProductCopy")[0].value = info[lenRecordAddFee-1].EnglishProduct;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("PhysicsProduct")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].PhysicsProduct) {
								objtmp.options[i].selected = true;
								document.getElementsByName("PhysicsProductCopy")[0].value = info[lenRecordAddFee-1].PhysicsProduct;
								break;
							}
						}
					}
					
					objtmp = document.getElementsByName("ChemistryProduct")[0];
					if(objtmp){
						for ( i = 0; i < objtmp.options.length; i++) {
							if (objtmp.options[i].text == info[lenRecordAddFee-1].ChemistryProduct) {
								objtmp.options[i].selected = true;
								document.getElementsByName("ChemistryProductCopy")[0].value = info[lenRecordAddFee-1].ChemistryProduct;
								break;
							}
						}
					}
					

					// 数学 费用分配
					if((document.getElementsByName("MathProduct")[0])&&(document.getElementsByName("MathProduct")[0].value!=0)) {
						//if ((document.getElementsByName("Math")[0]) && (info[lenRecordAddFee-1].Math != 0)) {
						if ((document.getElementsByName("Math")[0])&&(document.getElementsByName("MathProduct")[0].value!=0)) {
							document.getElementsByName("Math")[0].value = info[lenRecordAddFee-1].Math;
						}
						//if ((document.getElementsByName("MathSubFee1")[0]) && (info[lenRecordAddFee-1].Math != 0)) {//.MathSubFee1
						if (document.getElementsByName("MathSubFee1")[0]) {//.MathSubFee1
							document.getElementsByName("MathSubFee1")[0].value = info[lenRecordAddFee-1].MathSubFee1;
						}
						if (document.getElementsByName("MathSubFee2")[0]) {
							document.getElementsByName("MathSubFee2")[0].value = info[lenRecordAddFee-1].MathSubFee2;
						}
						if (document.getElementsByName("MathSubFee3")[0]) {
							document.getElementsByName("MathSubFee3")[0].value = info[lenRecordAddFee-1].MathSubFee3;
						}
						if (document.getElementsByName("MathSubFee4")[0]) {
							document.getElementsByName("MathSubFee4")[0].value = info[lenRecordAddFee-1].MathSubFee4;
						}
						if (document.getElementsByName("MathSubFee5")[0]) {
							document.getElementsByName("MathSubFee5")[0].value = info[lenRecordAddFee-1].MathSubFee5;
						}
					}

					// 语文 费用分配
					//if ((document.getElementsByName("Chinese")[0]) && (info[lenRecordAddFee-1].Chinese != 0)) {
					if((document.getElementsByName("ChineseProduct")[0])&&(document.getElementsByName("ChineseProduct")[0].value!=0)){
						if (document.getElementsByName("Chinese")[0]){
							document.getElementsByName("Chinese")[0].value = info[lenRecordAddFee-1].Chinese;
						}
						if (document.getElementsByName("ChineseSubFee1")[0]){//.ChineseSubFee1
							document.getElementsByName("ChineseSubFee1")[0].value = info[lenRecordAddFee-1].ChineseSubFee1;
						}
						if (document.getElementsByName("ChineseSubFee2")[0]){
							document.getElementsByName("ChineseSubFee2")[0].value = info[lenRecordAddFee-1].ChineseSubFee2;
						}
						if (document.getElementsByName("ChineseSubFee3")[0]){
							document.getElementsByName("ChineseSubFee3")[0].value = info[lenRecordAddFee-1].ChineseSubFee3;
						}
						if (document.getElementsByName("ChineseSubFee4")[0]){
							document.getElementsByName("ChineseSubFee4")[0].value = info[lenRecordAddFee-1].ChineseSubFee4;
						}
						if (document.getElementsByName("ChineseSubFee5")[0]){
							document.getElementsByName("ChineseSubFee5")[0].value = info[lenRecordAddFee-1].ChineseSubFee5;
						}
					}

					// 英语 费用分配
					if((document.getElementsByName("EnglishProduct")[0])&&(document.getElementsByName("EnglishProduct")[0].value!=0)){
						if (document.getElementsByName("English")[0]) {
							document.getElementsByName("English")[0].value = info[lenRecordAddFee-1].English;
						}
						if (document.getElementsByName("EnglishSubFee1")[0]){//.EnglishSubFee1
							document.getElementsByName("EnglishSubFee1")[0].value = info[lenRecordAddFee-1].EnglishSubFee1;
						}
						if (document.getElementsByName("EnglishSubFee2")[0]){
							document.getElementsByName("EnglishSubFee2")[0].value = info[lenRecordAddFee-1].EnglishSubFee2;
						}
						if (document.getElementsByName("EnglishSubFee3")[0]){
							document.getElementsByName("EnglishSubFee3")[0].value = info[lenRecordAddFee-1].EnglishSubFee3;
						}
						if (document.getElementsByName("EnglishSubFee4")[0]){
							document.getElementsByName("EnglishSubFee4")[0].value = info[lenRecordAddFee-1].EnglishSubFee4;
						}
						if (document.getElementsByName("EnglishSubFee5")[0]){
							document.getElementsByName("EnglishSubFee5")[0].value = info[lenRecordAddFee-1].EnglishSubFee5;
						}
					}

					// 物理 费用分配
					if((document.getElementsByName("PhysicsProduct")[0])&&(document.getElementsByName("PhysicsProduct")[0].value!=0)){
						if (document.getElementsByName("Physics")[0]){
							document.getElementsByName("Physics")[0].value = info[lenRecordAddFee-1].Physics;
						}
						if (document.getElementsByName("PhysicsSubFee1")[0]) {//.PhysicsSubFee1
							document.getElementsByName("PhysicsSubFee1")[0].value = info[lenRecordAddFee-1].PhysicsSubFee1;
						}
						if (document.getElementsByName("PhysicsSubFee2")[0]){
							document.getElementsByName("PhysicsSubFee2")[0].value = info[lenRecordAddFee-1].PhysicsSubFee2;
						}
						if (document.getElementsByName("PhysicsSubFee3")[0]){
							document.getElementsByName("PhysicsSubFee3")[0].value = info[lenRecordAddFee-1].PhysicsSubFee3;
						}
						if (document.getElementsByName("PhysicsSubFee4")[0]){
							document.getElementsByName("PhysicsSubFee4")[0].value = info[lenRecordAddFee-1].PhysicsSubFee4;
						}
						if (document.getElementsByName("PhysicsSubFee5")[0]){
							document.getElementsByName("PhysicsSubFee5")[0].value = info[lenRecordAddFee-1].PhysicsSubFee5;
						}
					}

					// 化学 费用分配
					if((document.getElementsByName("ChemistryProduct")[0])&&(document.getElementsByName("ChemistryProduct")[0].value!=0)){
						if (document.getElementsByName("Chemistry")[0]){
							document.getElementsByName("Chemistry")[0].value = info[lenRecordAddFee-1].Chemistry;
						}
						if (document.getElementsByName("ChemistrySubFee1")[0]){//.ChemistrySubFee1
							document.getElementsByName("ChemistrySubFee1")[0].value = info[lenRecordAddFee-1].ChemistrySubFee1;
						}
						if (document.getElementsByName("ChemistrySubFee2")[0]){
							document.getElementsByName("ChemistrySubFee2")[0].value = info[lenRecordAddFee-1].ChemistrySubFee2;
						}
						if (document.getElementsByName("ChemistrySubFee3")[0]){
							document.getElementsByName("ChemistrySubFee3")[0].value = info[lenRecordAddFee-1].ChemistrySubFee3;
						}
						if (document.getElementsByName("ChemistrySubFee4")[0]){
							document.getElementsByName("ChemistrySubFee4")[0].value = info[lenRecordAddFee-1].ChemistrySubFee4;
						}
						if (document.getElementsByName("ChemistrySubFee5")[0]){
							document.getElementsByName("ChemistrySubFee5")[0].value = info[lenRecordAddFee-1].ChemistrySubFee5;
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
	
	var grade = parseInt(document.getElementsByName("grade")[0].value);
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
	
	objtmp = document.getElementsByName("MathProduct")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].MathProduct) {
				objtmp.options[i].selected = true;
				document.getElementsByName("MathProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].MathProduct;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("ChineseProduct")[0];
	if(objtmp){						
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].ChineseProduct) {
				objtmp.options[i].selected = true;
				document.getElementsByName("ChineseProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].ChineseProduct;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("EnglishProduct")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].EnglishProduct) {
				objtmp.options[i].selected = true;
				document.getElementsByName("EnglishProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].EnglishProduct;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("PhysicsProduct")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].PhysicsProduct) {
				objtmp.options[i].selected = true;
				document.getElementsByName("PhysicsProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].PhysicsProduct;
				break;
			}
		}
	}
	
	objtmp = document.getElementsByName("ChemistryProduct")[0];
	if(objtmp){
		for ( i = 0; i < objtmp.options.length; i++) {
			if (objtmp.options[i].text == objRecordAddFee[indexRecordAddFee].ChemistryProduct) {
				objtmp.options[i].selected = true;
				document.getElementsByName("ChemistryProductCopy")[0].value = objRecordAddFee[indexRecordAddFee].ChemistryProduct;
				break;
			}
		}
	}
	
	
	// 数学 费用分配
	if ((document.getElementsByName("Math")[0]) && (objRecordAddFee[indexRecordAddFee].Math != 0)) {
		document.getElementsByName("Math")[0].value = objRecordAddFee[indexRecordAddFee].Math;
	}
	if ((document.getElementsByName("MathSubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].Math != 0)) { //.MathSubFee1
		document.getElementsByName("MathSubFee1")[0].value = objRecordAddFee[indexRecordAddFee].MathSubFee1;
	}
	if ((document.getElementsByName("MathSubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].Math != 0)) {
		document.getElementsByName("MathSubFee2")[0].value = objRecordAddFee[indexRecordAddFee].MathSubFee2;
	}
	if ((document.getElementsByName("MathSubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].Math != 0)) {
		document.getElementsByName("MathSubFee3")[0].value = objRecordAddFee[indexRecordAddFee].MathSubFee3;
	}
	if ((document.getElementsByName("MathSubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].Math != 0)) {
		document.getElementsByName("MathSubFee4")[0].value = objRecordAddFee[indexRecordAddFee].MathSubFee4;
	}
	if ((document.getElementsByName("MathSubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].Math != 0)) {
		document.getElementsByName("MathSubFee5")[0].value = objRecordAddFee[indexRecordAddFee].MathSubFee5;
	}
	
	// 如果数学存在，但交费为0，则显示空白
	if ((document.getElementsByName("Math")[0]) && (objRecordAddFee[indexRecordAddFee].Math == 0)) {
		document.getElementsByName("Math")[0].value="";
	}
	if ((document.getElementsByName("MathSubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].MathSubFee1 == 0)) {
		document.getElementsByName("MathSubFee1")[0].value = "";
	}
	if ((document.getElementsByName("MathSubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].MathSubFee2 == 0)) {
		document.getElementsByName("MathSubFee2")[0].value = "";
	}
	if ((document.getElementsByName("MathSubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].MathSubFee3 == 0)) {
		document.getElementsByName("MathSubFee3")[0].value = "";
	}
	if ((document.getElementsByName("MathSubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].MathSubFee4 == 0)) {
		document.getElementsByName("MathSubFee4")[0].value = "";
	}
	if ((document.getElementsByName("MathSubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].MathSubFee5 == 0)) {
		document.getElementsByName("MathSubFee5")[0].value = "";
	}
	
	// 语文 费用分配
	if ((document.getElementsByName("Chinese")[0]) && (objRecordAddFee[indexRecordAddFee].Chinese != 0)) {
		document.getElementsByName("Chinese")[0].value = objRecordAddFee[indexRecordAddFee].Chinese;
	}
	if ((document.getElementsByName("ChineseSubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].Chinese != 0)) {//.ChineseSubFee1
		document.getElementsByName("ChineseSubFee1")[0].value = objRecordAddFee[indexRecordAddFee].ChineseSubFee1;
	}
	if ((document.getElementsByName("ChineseSubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].Chinese != 0)) {
		document.getElementsByName("ChineseSubFee2")[0].value = objRecordAddFee[indexRecordAddFee].ChineseSubFee2;
	}
	if ((document.getElementsByName("ChineseSubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].Chinese != 0)) {
		document.getElementsByName("ChineseSubFee3")[0].value = objRecordAddFee[indexRecordAddFee].ChineseSubFee3;
	}
	if ((document.getElementsByName("ChineseSubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].Chinese != 0)) {
		document.getElementsByName("ChineseSubFee4")[0].value = objRecordAddFee[indexRecordAddFee].ChineseSubFee4;
	}
	if ((document.getElementsByName("ChineseSubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].Chinese != 0)) {
		document.getElementsByName("ChineseSubFee5")[0].value = objRecordAddFee[indexRecordAddFee].ChineseSubFee5;
	}
	
	// 如果语文存在，但交费为0，则显示空白
	if ((document.getElementsByName("Chinese")[0]) && (objRecordAddFee[indexRecordAddFee].Chinese != 0)) {
		document.getElementsByName("Chinese")[0].value = "";
	}
	if ((document.getElementsByName("ChineseSubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].ChineseSubFee1 == 0)) {
		document.getElementsByName("ChineseSubFee1")[0].value = "";
	}
	if ((document.getElementsByName("ChineseSubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].ChineseSubFee2 == 0)) {
		document.getElementsByName("ChineseSubFee2")[0].value = "";
	}
	if ((document.getElementsByName("ChineseSubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].ChineseSubFee3 == 0)) {
		document.getElementsByName("ChineseSubFee3")[0].value = "";
	}
	if ((document.getElementsByName("ChineseSubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].ChineseSubFee4 == 0)) {
		document.getElementsByName("ChineseSubFee4")[0].value = "";
	}
	if ((document.getElementsByName("ChineseSubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].ChineseSubFee5 == 0)) {
		document.getElementsByName("ChineseSubFee5")[0].value = "";
	}
	
	// 英语 费用分配
	if ((document.getElementsByName("English")[0]) && (objRecordAddFee[indexRecordAddFee].English != 0)) {
		document.getElementsByName("English")[0].value = objRecordAddFee[indexRecordAddFee].English;
	}
	if ((document.getElementsByName("EnglishSubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].English != 0)) {
		document.getElementsByName("EnglishSubFee1")[0].value = objRecordAddFee[indexRecordAddFee].EnglishSubFee1;
	}
	if ((document.getElementsByName("EnglishSubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].English != 0)) {
		document.getElementsByName("EnglishSubFee2")[0].value = objRecordAddFee[indexRecordAddFee].EnglishSubFee2;
	}
	if ((document.getElementsByName("EnglishSubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].English != 0)) {
		document.getElementsByName("EnglishSubFee3")[0].value = objRecordAddFee[indexRecordAddFee].EnglishSubFee3;
	}
	if ((document.getElementsByName("EnglishSubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].English != 0)) {
		document.getElementsByName("EnglishSubFee4")[0].value = objRecordAddFee[indexRecordAddFee].EnglishSubFee4;
	}
	if ((document.getElementsByName("EnglishSubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].English != 0)) {
		document.getElementsByName("EnglishSubFee5")[0].value = objRecordAddFee[indexRecordAddFee].EnglishSubFee5;
	}

	// 如果英语存在，但交费为0，则显示空白
	if ((document.getElementsByName("English")[0]) && (objRecordAddFee[indexRecordAddFee].English == 0)) {
		document.getElementsByName("English")[0].value = "";
	}
	if ((document.getElementsByName("EnglishSubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].EnglishSubFee1 == 0)) {
		document.getElementsByName("EnglishSubFee1")[0].value = "";
	}
	if ((document.getElementsByName("EnglishSubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].EnglishSubFee2 == 0)) {
		document.getElementsByName("EnglishSubFee2")[0].value = "";
	}
	if ((document.getElementsByName("EnglishSubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].EnglishSubFee3 == 0)) {
		document.getElementsByName("EnglishSubFee3")[0].value = "";
	}
	if ((document.getElementsByName("EnglishSubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].EnglishSubFee4 == 0)) {
		document.getElementsByName("EnglishSubFee4")[0].value = "";
	}
	if ((document.getElementsByName("EnglishSubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].EnglishSubFee5 == 0)) {
		document.getElementsByName("EnglishSubFee5")[0].value = "";
	}
	
	// 物理 费用分配
	if ((document.getElementsByName("Physics")[0]) && (objRecordAddFee[indexRecordAddFee].Physics != 0)) {
		document.getElementsByName("Physics")[0].value = objRecordAddFee[indexRecordAddFee].Physics;
	}
	if ((document.getElementsByName("PhysicsSubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].Physics != 0)) {//.PhysicsSubFee1
		document.getElementsByName("PhysicsSubFee1")[0].value = objRecordAddFee[indexRecordAddFee].PhysicsSubFee1;
	}
	if ((document.getElementsByName("PhysicsSubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].Physics != 0)) {
		document.getElementsByName("PhysicsSubFee2")[0].value = objRecordAddFee[indexRecordAddFee].PhysicsSubFee2;
	}
	if ((document.getElementsByName("PhysicsSubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].Physics != 0)) {
		document.getElementsByName("PhysicsSubFee3")[0].value = objRecordAddFee[indexRecordAddFee].PhysicsSubFee3;
	}
	if ((document.getElementsByName("PhysicsSubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].Physics != 0)) {
		document.getElementsByName("PhysicsSubFee4")[0].value = objRecordAddFee[indexRecordAddFee].PhysicsSubFee4;
	}
	if ((document.getElementsByName("PhysicsSubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].Physics != 0)) {
		document.getElementsByName("PhysicsSubFee5")[0].value = objRecordAddFee[indexRecordAddFee].PhysicsSubFee5;
	}

	// 如果物理存在，但交费为0，则显示空白
	if ((document.getElementsByName("Physics")[0]) && (objRecordAddFee[indexRecordAddFee].Physics == 0)) {
		document.getElementsByName("Physics")[0].value = "";
	}
	if ((document.getElementsByName("PhysicsSubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].PhysicsSubFee1 == 0)) {
		document.getElementsByName("PhysicsSubFee1")[0].value = "";
	}
	if ((document.getElementsByName("PhysicsSubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].PhysicsSubFee2 == 0)) {
		document.getElementsByName("PhysicsSubFee2")[0].value = "";
	}
	if ((document.getElementsByName("PhysicsSubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].PhysicsSubFee3 == 0)) {
		document.getElementsByName("PhysicsSubFee3")[0].value = "";
	}
	if ((document.getElementsByName("PhysicsSubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].PhysicsSubFee4 == 0)) {
		document.getElementsByName("PhysicsSubFee4")[0].value = "";
	}
	if ((document.getElementsByName("PhysicsSubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].PhysicsSubFee5 == 0)) {
		document.getElementsByName("PhysicsSubFee5")[0].value = "";
	}
	
	// 化学 费用分配
	if ((document.getElementsByName("Chemistry")[0]) && (objRecordAddFee[indexRecordAddFee].Chemistry != 0)) {
		document.getElementsByName("Chemistry")[0].value = objRecordAddFee[indexRecordAddFee].Chemistry;
	}
	if ((document.getElementsByName("ChemistrySubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].Chemistry != 0)) {//.ChemistrySubFee1
		document.getElementsByName("ChemistrySubFee1")[0].value = objRecordAddFee[indexRecordAddFee].ChemistrySubFee1;
	}
	if ((document.getElementsByName("ChemistrySubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].Chemistry != 0)) {
		document.getElementsByName("ChemistrySubFee2")[0].value = objRecordAddFee[indexRecordAddFee].ChemistrySubFee2;
	}
	if ((document.getElementsByName("ChemistrySubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].Chemistry != 0)) {
		document.getElementsByName("ChemistrySubFee3")[0].value = objRecordAddFee[indexRecordAddFee].ChemistrySubFee3;
	}
	if ((document.getElementsByName("ChemistrySubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].Chemistry != 0)) {
		document.getElementsByName("ChemistrySubFee4")[0].value = objRecordAddFee[indexRecordAddFee].ChemistrySubFee4;
	}
	if ((document.getElementsByName("ChemistrySubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].Chemistry != 0)) {
		document.getElementsByName("ChemistrySubFee5")[0].value = objRecordAddFee[indexRecordAddFee].ChemistrySubFee5;
	}
	
	// 如果化学存在，但交费为0，则显示空白
	if ((document.getElementsByName("Chemistry")[0]) && (objRecordAddFee[indexRecordAddFee].Chemistry == 0)) {
		document.getElementsByName("Chemistry")[0].value = "";
	}
	if ((document.getElementsByName("ChemistrySubFee1")[0]) && (objRecordAddFee[indexRecordAddFee].ChemistrySubFee1 == 0)) {//.ChemistrySubFee1
		document.getElementsByName("ChemistrySubFee1")[0].value = "";
	}
	if ((document.getElementsByName("ChemistrySubFee2")[0]) && (objRecordAddFee[indexRecordAddFee].ChemistrySubFee2 == 0)) {//.ChemistrySubFee1
		document.getElementsByName("ChemistrySubFee2")[0].value = "";
	}
	if ((document.getElementsByName("ChemistrySubFee3")[0]) && (objRecordAddFee[indexRecordAddFee].ChemistrySubFee3 == 0)) {//.ChemistrySubFee1
		document.getElementsByName("ChemistrySubFee3")[0].value = "";
	}
	if ((document.getElementsByName("ChemistrySubFee4")[0]) && (objRecordAddFee[indexRecordAddFee].ChemistrySubFee4 == 0)) {//.ChemistrySubFee1
		document.getElementsByName("ChemistrySubFee4")[0].value = "";
	}
	if ((document.getElementsByName("ChemistrySubFee5")[0]) && (objRecordAddFee[indexRecordAddFee].ChemistrySubFee5 == 0)) {//.ChemistrySubFee1
		document.getElementsByName("ChemistrySubFee5")[0].value = "";
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
				} 
				/*
				else if (ret == "2") {
					document.getElementsByName("submitAdd")[0].disabled = true;
					document.getElementsByName("btnPrevious")[0].disabled = false;
					document.getElementsByName("btnNext")[0].disabled = false;
				} 
				*/
				else {					
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
		objtemp = document.getElementsByName("MathProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundMathProduct")[0].value = sqlProduct;
		document.getElementsByName("remainFee1CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee1CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee1CheckBox")[0].disabled="";
		}
		break;
	case 2:
		objtemp = document.getElementsByName("ChineseProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundChineseProduct")[0].value = sqlProduct;
		document.getElementsByName("remainFee2CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee2CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee2CheckBox")[0].disabled="";
		}
	case 3:
		objtemp = document.getElementsByName("EnglishProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundEnglishProduct")[0].value = sqlProduct;
		document.getElementsByName("remainFee3CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee3CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee3CheckBox")[0].disabled="";
		}
		break;
	case 4:
		objtemp = document.getElementsByName("PhysicsProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundPhysicsProduct")[0].value = sqlProduct;
		document.getElementsByName("remainFee4CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee4CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee4CheckBox")[0].disabled="";
		}
		break;
	case 5:
		objtemp = document.getElementsByName("ChemistryProductRemainFee")[0];
		sqlProduct = objtemp.options[objtemp.selectedIndex].text;
		document.getElementsByName("refundChemistrProduct")[0].value = sqlProduct;
		document.getElementsByName("remainFee5CheckBox")[0].checked="";
		if(sqlProduct=="总余额"){
			document.getElementsByName("remainFee5CheckBox")[0].disabled="true";
		}else{
			document.getElementsByName("remainFee5CheckBox")[0].disabled="";
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

					// 再增加数据库中的教师姓名
					//i = 0;
					var j = 0;

					for (var tmp in info) {
						//alert(info[j].sumMath);

						if (info[j].sumMath > 0) {
							objFrom.options.add(new Option("数学", 1));
							objTo.options.add(new Option("数学", 1));
							//i++;
						}
						if (info[j].sumChinese > 0) {
							objFrom.options.add(new Option("语文", 2));
							objTo.options.add(new Option("语文", 2));
							//i++;
						}
						if (info[j].sumEnglish > 0) {
							objFrom.options.add(new Option("英语", 3));
							objTo.options.add(new Option("英语", 3));
							//i++;
						}
						if (info[j].sumPhysics > 0) {
							objFrom.options.add(new Option("物理", 4));
							objTo.options.add(new Option("物理", 4));
							//i++;
						}
						if (info[j].sumChemistry > 0) {
							objFrom.options.add(new Option("化学", 5));
							objTo.options.add(new Option("化学", 5));
							//i++;
						}

						// 退费里的余额
						if (info[j].sumMath > 0) {
							document.getElementById("RemainFee1Label").innerHTML = '数学' + " " + '<input type="number" name="remainFee1" step="0.1" />' + " " + '元' + '<label for="remainFee1"><select name="MathProductRemainFee" onchange="sqlProductRemainFee(1)"><option value="0">总余额</option></select><input type="hidden" name="refundMathProduct" value="" /><input type="checkbox" style="width: 1em" id="remainFee1"  name="remainFee1CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee1Label").innerHTML = "";
						}
						if (info[j].sumChinese > 0) {
							document.getElementById("RemainFee2Label").innerHTML = '语文' + " " + '<input type="number" name="remainFee2" step="0.1" />' + " " + '元' + '<label for="remainFee2"><select name="ChineseProductRemainFee" onchange="sqlProductRemainFee(2)"><option value="0">总余额</option></select><input type="hidden" name="refundChineseProduct" value="" /><input type="checkbox" style="width: 1em" id="remainFee2"  name="remainFee2CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee2Label").innerHTML = "";
						}
						if (info[j].sumEnglish > 0) {
							document.getElementById("RemainFee3Label").innerHTML = '英语' + " " + '<input type="number" name="remainFee3" step="0.1" />' + " " + '元' + '<label for="remainFee3"><select name="EnglishProductRemainFee" onchange="sqlProductRemainFee(3)"><option value="0">总余额</option></select><input type="hidden" name="refundEnglishProduct" value="" /><input type="checkbox" style="width: 1em" id="remainFee3"  name="remainFee3CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee3Label").innerHTML = "";
						}
						if (info[j].sumPhysics > 0) {
							document.getElementById("RemainFee4Label").innerHTML = '物理' + " " + '<input type="number" name="remainFee4" step="0.1" />' + " " + '元' + '<label for="remainFee4"><select name="PhysicsProductRemainFee" onchange="sqlProductRemainFee(4)"><option value="0">总余额</option></select><input type="hidden" name="refundPhysicsProduct" value="" /><input type="checkbox" style="width: 1em" id="remainFee4"  name="remainFee4CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee4Label").innerHTML = "";
						}
						if (info[j].sumChemistry > 0) {
							document.getElementById("RemainFee5Label").innerHTML = '化学' + " " + '<input type="number" name="remainFee5" step="0.1" />' + " " + '元' + '<label for="remainFee5"><select name="ChemistryProductRemainFee" onchange="sqlProductRemainFee(5)"><option value="0">总余额</option></select><input type="hidden" name="refundChemistryProduct" value="" /><input type="checkbox" style="width: 1em" id="remainFee5"  name="remainFee5CheckBox" disabled="true" />退费</label>' + '<br />';
						} else {
							//document.getElementById("RemainFee5Label").innerHTML = "";
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
					for ( i = 0; i < 5; i++) {
						loadProduct[i] = new Array();
					}
					var j = 0;
					i = 0;
					for (var tmp in info) {
						if(info[j].MathProduct != ""){
							loadProduct[0][i] = info[j].MathProduct;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[0].ChineseProduct != ""){
							loadProduct[1][i] = info[j].ChineseProduct;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[0].EnglishProduct != ""){
							loadProduct[2][i] = info[j].EnglishProduct;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[0].PhysicsProduct != ""){
							loadProduct[3][i] = info[j].PhysicsProduct;							
							i++;
						}
						j++;
					}
					i = 0;
					j = 0;
					for (var tmp in info) {
						if(info[0].ChemistryProduct != ""){
							loadProduct[4][i] = info[j].ChemistryProduct;							
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

					/*
					// 退费里的余额，这个是根据校长设置查询出来的，太粗了，有可能学生没有报其中一门课，更细的在sqlFeeCourse函数中
					if(info[0].course1 !=""){
					document.getElementById("RemainFee1Label").innerHTML ='数学'+ " " + '<input type="number" name="remainFee1" readonly="true" />'+ " "  +	'元' + '<label for="remainFee1"><input type="checkbox" style="width: 1em" id="remainFee1" />退费</label>'+'<br />';
					}else{
					document.getElementById("RemainFee1Label").innerHTML = "";
					}
					if(info[0].course2 !=""){
					document.getElementById("RemainFee2Label").innerHTML ='语文'+ " " + '<input type="number" name="remainFee2" readonly="true" />'+ " "  +	'元' + '<label for="remainFee2"><input type="checkbox" style="width: 1em" id="remainFee2" />退费</label>'+'<br />';
					}else{
					document.getElementById("RemainFee2Label").innerHTML = "";
					}
					if(info[0].course3 !=""){
					document.getElementById("RemainFee3Label").innerHTML ='英语'+ " " + '<input type="number" name="remainFee3" readonly="true" />'+ " "  +	'元' + '<label for="remainFee3"><input type="checkbox" style="width: 1em" id="remainFee3" />退费 </label>'+'<br />';
					}else{
					document.getElementById("RemainFee3Label").innerHTML = "";
					}
					if(info[0].course4 !=""){
					document.getElementById("RemainFee4Label").innerHTML ='物理'+ " " + '<input type="number" name="remainFee4" readonly="true" />'+ " "  +	'元' + '<label for="remainFee4"><input type="checkbox" style="width: 1em" id="remainFee4" />退费</label>'+'<br />';
					}else{
					document.getElementById("RemainFee4Label").innerHTML = "";
					}
					if(info[0].course5 !=""){
					document.getElementById("RemainFee5Label").innerHTML ='化学'+ " " + '<input type="number" name="remainFee5" readonly="true" />'+ " "  +	'元' + '<label for="remainFee5"><input type="checkbox" style="width: 1em" id="remainFee5" />退费</label>'+'<br />';
					}else{
					document.getElementById("RemainFee5Label").innerHTML = "";
					}
					*/
					// 费用分配
					if (info[0].course1 != "") {
						document.getElementById("MathLabelAddFee").innerHTML = '数学'+ '<select name = "MathProduct" onchange="checkHiddenValueProduct(1)">'
								+ '<option value=0>--请选择--</option>'
							   + '</select>'							   						   
							   + '<input type="hidden" name="MathProductCopy" />' 
							   + '<input type="number" style="width: 4em" name="Math" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1MathLabel").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="MathSubFee1" />元';
						} else {
							document.getElementById("subFee1MathLabel").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2MathLabel").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="MathSubFee2" />元';
						} else {
							document.getElementById("subFee2MathLabel").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3MathLabel").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="MathSubFee3" />元';
						} else {
							document.getElementById("subFee3MathLabel").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4MathLabel").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="MathSubFee4" />元';
						} else {
							document.getElementById("subFee4MathLabel").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5MathLabel").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="MathSubFee5" />元';
						} else {
							document.getElementById("subFee5MathLabel").innerHTML = "";
						}
					} else {
						document.getElementById("MathLabelAddFee").innerHTML = "";
						document.getElementById("subFee1MathLabel").innerHTML = "";
						document.getElementById("subFee2MathLabel").innerHTML = "";
						document.getElementById("subFee3MathLabel").innerHTML = "";
						document.getElementById("subFee4MathLabel").innerHTML = "";
						document.getElementById("subFee5MathLabel").innerHTML = "";
					}

					if (info[0].course2 != "") {
						document.getElementById("ChineseLabelAddFee").innerHTML = '语文' + '<select name = "ChineseProduct" onchange="checkHiddenValueProduct(2)">'
							+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="ChineseProductCopy" />' 
							+ '<input type="number" style="width: 4em" name="Chinese" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1ChineseLabel").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChineseSubFee1" />元';
						} else {
							document.getElementById("subFee1ChineseLabel").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2ChineseLabel").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChineseSubFee2" />元';
						} else {
							document.getElementById("subFee2ChineseLabel").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3ChineseLabel").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChineseSubFee3" />元';
						} else {
							document.getElementById("subFee3ChineseLabel").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4ChineseLabel").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChineseSubFee4" />元';
						} else {
							document.getElementById("subFee4ChineseLabel").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5ChineseLabel").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChineseSubFee5" />元';
						} else {
							document.getElementById("subFee5ChineseLabel").innerHTML = "";
						}
					} else {
						document.getElementById("ChineseLabelAddFee").innerHTML = "";
						document.getElementById("subFee1ChineseLabel").innerHTML = "";
						document.getElementById("subFee2ChineseLabel").innerHTML = "";
						document.getElementById("subFee3ChineseLabel").innerHTML = "";
						document.getElementById("subFee4ChineseLabel").innerHTML = "";
						document.getElementById("subFee5ChineseLabel").innerHTML = "";
					}

					if (info[0].course3 != "") {
						document.getElementById("EnglishLabelAddFee").innerHTML = '英语'+ '<select name = "EnglishProduct" onchange="checkHiddenValueProduct(3)">'
							+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="EnglishProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="English" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1EnglishLabel").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="EnglishSubFee1" />元';
						} else {
							document.getElementById("subFee1EnglishLabel").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2EnglishLabel").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="EnglishSubFee2" />元';
						} else {
							document.getElementById("subFee2EnglishLabel").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3EnglishLabel").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="EnglishSubFee3" />元';
						} else {
							document.getElementById("subFee3EnglishLabel").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4EnglishLabel").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="EnglishSubFee4" />元';
						} else {
							document.getElementById("subFee4EnglishLabel").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5EnglishLabel").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="EnglishSubFee5" />元';
						} else {
							document.getElementById("subFee5EnglishLabel").innerHTML = "";
						}
					} else {
						document.getElementById("EnglishLabelAddFee").innerHTML = "";
						document.getElementById("subFee1EnglishLabel").innerHTML = "";
						document.getElementById("subFee2EnglishLabel").innerHTML = "";
						document.getElementById("subFee3EnglishLabel").innerHTML = "";
						document.getElementById("subFee4EnglishLabel").innerHTML = "";
						document.getElementById("subFee5EnglishLabel").innerHTML = "";
					}

					if (info[0].course4 != "") {
						document.getElementById("PhysicsLabelAddFee").innerHTML = '物理'+ '<select name = "PhysicsProduct" onchange="checkHiddenValueProduct(4)">'
						+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="PhysicsProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="Physics" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1PhysicsLabel").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="PhysicsSubFee1" />元';
						} else {
							document.getElementById("subFee1PhysicsLabel").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2PhysicsLabel").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="PhysicsSubFee2" />元';
						} else {
							document.getElementById("subFee2PhysicsLabel").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3PhysicsLabel").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="PhysicsSubFee3" />元';
						} else {
							document.getElementById("subFee3PhysicsLabel").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4PhysicsLabel").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />'  + '<input type="number" style="width: 4em" name="PhysicsSubFee4" />元';
						} else {
							document.getElementById("subFee4PhysicsLabel").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5PhysicsLabel").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="PhysicsSubFee5" />元';
						} else {
							document.getElementById("subFee5PhysicsLabel").innerHTML = "";
						}
					} else {
						document.getElementById("PhysicsLabelAddFee").innerHTML = "";
						document.getElementById("subFee1PhysicsLabel").innerHTML = "";
						document.getElementById("subFee2PhysicsLabel").innerHTML = "";
						document.getElementById("subFee3PhysicsLabel").innerHTML = "";
						document.getElementById("subFee4PhysicsLabel").innerHTML = "";
						document.getElementById("subFee5PhysicsLabel").innerHTML = "";
					}

					if (info[0].course5 != "") {
						document.getElementById("ChemistryLabelAddFee").innerHTML = '化学' + '<select name = "ChemistryProduct" onchange="checkHiddenValueProduct(5)">'
						+ '<option value=0>--请选择--</option>'
						   + '</select>'
						   + '<input type="hidden" name="ChemistryProductCopy" />' 
						   + '<input type="number" style="width: 4em" name="Chemistry" />' + '元';
						if (info[0].subFeeItem1 != "") {
							document.getElementById("subFee1ChemistryLabel").innerHTML = '<input type="text" style="width:4em" name=subFee1Name[] value=' + info[0].subFeeItem1 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChemistrySubFee1" />元';
						} else {
							document.getElementById("subFee1ChemistryLabel").innerHTML = "";
						}
						if (info[0].subFeeItem2 != "") {
							document.getElementById("subFee2ChemistryLabel").innerHTML = '<input type="text" style="width:4em" name=subFee2Name[] value=' + info[0].subFeeItem2 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChemistrySubFee2" />元';
						} else {
							document.getElementById("subFee2ChemistryLabel").innerHTML = "";
						}
						if (info[0].subFeeItem3 != "") {
							document.getElementById("subFee3ChemistryLabel").innerHTML = '<input type="text" style="width:4em" name=subFee3Name[] value=' + info[0].subFeeItem3 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChemistrySubFee3" />元';
						} else {
							document.getElementById("subFee3ChemistryLabel").innerHTML = "";
						}
						if (info[0].subFeeItem4 != "") {
							document.getElementById("subFee4ChemistryLabel").innerHTML = '<input type="text" style="width:4em" name=subFee4Name[] value=' + info[0].subFeeItem4 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChemistrySubFee4" />元';
						} else {
							document.getElementById("subFee4ChemistryLabel").innerHTML = "";
						}
						if (info[0].subFeeItem5 != "") {
							document.getElementById("subFee5ChemistryLabel").innerHTML = '<input type="text" style="width:4em" name=subFee5Name[] value=' + info[0].subFeeItem5 +' readOnly="true" />' + '<input type="number" style="width: 4em" name="ChemistrySubFee5" />元';
						} else {
							document.getElementById("subFee5ChemistryLabel").innerHTML = "";
						}
					} else {
						document.getElementById("ChemistryLabelAddFee").innerHTML = "";
						document.getElementById("subFee1ChemistryLabel").innerHTML = "";
						document.getElementById("subFee2ChemistryLabel").innerHTML = "";
						document.getElementById("subFee3ChemistryLabel").innerHTML = "";
						document.getElementById("subFee4ChemistryLabel").innerHTML = "";
						document.getElementById("subFee5ChemistryLabel").innerHTML = "";
					}
					
					/*
					var obj = document.getElementsByName("MathProduct")[0];
					obj.options.add(new Option(info[0].product1, 1));	
					alert(info[0].product1);
					alert(obj);
					*/
					
				    var obj1 = document.getElementsByName("MathProduct")[0];
					var obj2 = document.getElementsByName("ChineseProduct")[0];
					var obj3 = document.getElementsByName("EnglishProduct")[0];
					var obj4 = document.getElementsByName("PhysicsProduct")[0];
					var obj5 = document.getElementsByName("ChemistryProduct")[0];
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
					}
					

					/*
					 // 根据所选校区自动加载相应的科目
					 if (info[0].course1 != "") {
					 document.getElementsByName("courseLabel")[0].innerHTML = '<input type="radio" name="course" id="course1" value="1">' + '数学';
					 } else {
					 document.getElementsByName("courseLabel")[0].innerHTML = "";
					 }
					 if (info[0].course2 != "") {
					 document.getElementsByName("courseLabel")[1].innerHTML = '<input type="radio" name="course" id="course2" value="2">' + '语文';
					 } else {
					 document.getElementsByName("courseLabel")[1].innerHTML = "";
					 }
					 if (info[0].course3 != "") {
					 document.getElementsByName("courseLabel")[2].innerHTML = '<input type="radio" name="course" id="course3"  value="3">' + '英语';
					 } else {
					 document.getElementsByName("courseLabel")[2].innerHTML = "";
					 }
					 if (info[0].course4 != "") {
					 document.getElementsByName("courseLabel")[3].innerHTML = '<input type="radio" name="course" id="course4"  value="4">' + '物理';
					 } else {
					 document.getElementsByName("courseLabel")[3].innerHTML = "";
					 }
					 if (info[0].course5 != "") {
					 document.getElementsByName("courseLabel")[4].innerHTML = '<input type="radio" name="course" id="course5"  value="5">' + '化学';
					 } else {
					 document.getElementsByName("courseLabel")[4].innerHTML = "";
					 }
					 */
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
		obj = document.getElementsByName("MathProduct")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("MathProductCopy")[0].value = strtmp;
		break;
	case 2:
		obj = document.getElementsByName("ChineseProduct")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("ChineseProductCopy")[0].value = strtmp;
		break;
	case 3:
		obj = document.getElementsByName("EnglishProduct")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("EnglishProductCopy")[0].value = strtmp;
		break;
	case 4:
		obj = document.getElementsByName("PhysicsProduct")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("PhysicsProductCopy")[0].value = strtmp;
		break;
	case 5:
		obj = document.getElementsByName("ChemistryProduct")[0];
		if(obj.value>0){
			strtmp=obj.options[obj.selectedIndex].text;
		}else{
			strtmp="";
		}
		document.getElementsByName("ChemistryProductCopy")[0].value = strtmp;
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


