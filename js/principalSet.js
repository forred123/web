var info;
var len;

function schoolZoneManage() {
	window.open("recordStudent.php");
}

function copySchoolZoneAndSql() {
	var obj = document.getElementsByName("schoolZoneSel")[0];
	if (obj.value == "0") {
		window.location.reload(true);
	} else {
		document.getElementsByName("schoolZone")[0].value = obj.options[obj.selectedIndex].text;
		sqlRecord();
	}
}

function enablesubFeeItem(flag) {
	if (flag == 1) {
		if (document.getElementsByName("subFeeItemLabel")[0].checked == true) {
			document.getElementsByName("subFeeItem1")[0].disabled = false;
		} else {
			document.getElementsByName("subFeeItem1")[0].disabled = true;
		}
	}
	if (flag == 2) {
		if (document.getElementsByName("subFeeItemLabel")[1].checked == true) {
			document.getElementsByName("subFeeItem2")[0].disabled = false;
		} else {
			document.getElementsByName("subFeeItem2")[0].disabled = true;
		}
	}
	if (flag == 3) {
		if (document.getElementsByName("subFeeItemLabel")[2].checked == true) {
			document.getElementsByName("subFeeItem3")[0].disabled = false;
		} else {
			document.getElementsByName("subFeeItem3")[0].disabled = true;
		}
	}
	if (flag == 4) {
		if (document.getElementsByName("subFeeItemLabel")[3].checked == true) {
			document.getElementsByName("subFeeItem4")[0].disabled = false;
		} else {
			document.getElementsByName("subFeeItem4")[0].disabled = true;
		}
	}
	if (flag == 5) {
		if (document.getElementsByName("subFeeItemLabel")[4].checked == true) {
			document.getElementsByName("subFeeItem5")[0].disabled = false;
		} else {
			document.getElementsByName("subFeeItem5")[0].disabled = true;
		}
	}
}

function enableProduct(flag) {
	if (flag == 1) {
		if (document.getElementsByName("productLabel")[0].checked == true) {
			document.getElementsByName("product1")[0].disabled = false;
		} else {
			document.getElementsByName("product1")[0].disabled = true;
		}
	}
	if (flag == 2) {
		if (document.getElementsByName("productLabel")[1].checked == true) {
			document.getElementsByName("product2")[0].disabled = false;
		} else {
			document.getElementsByName("product2")[0].disabled = true;
		}
	}
	if (flag == 3) {
		if (document.getElementsByName("productLabel")[2].checked == true) {
			document.getElementsByName("product3")[0].disabled = false;
		} else {
			document.getElementsByName("product3")[0].disabled = true;
		}
	}
	if (flag == 4) {
		if (document.getElementsByName("productLabel")[3].checked == true) {
			document.getElementsByName("product4")[0].disabled = false;
		} else {
			document.getElementsByName("product4")[0].disabled = true;
		}
	}
	if (flag == 5) {
		if (document.getElementsByName("productLabel")[4].checked == true) {
			document.getElementsByName("product5")[0].disabled = false;
		} else {
			document.getElementsByName("product5")[0].disabled = true;
		}
	}
}

function enableCourse(flag) {
	if (flag == 1) {
		if (document.getElementsByName("courseLabel")[0].checked == true) {
			document.getElementsByName("course1")[0].disabled = false;
		} else {
			document.getElementsByName("course1")[0].disabled = true;
		}
	}
	if (flag == 2) {
		if (document.getElementsByName("courseLabel")[1].checked == true) {
			document.getElementsByName("course2")[0].disabled = false;
		} else {
			document.getElementsByName("course2")[0].disabled = true;
		}
	}
	if (flag == 3) {
		if (document.getElementsByName("courseLabel")[2].checked == true) {
			document.getElementsByName("course3")[0].disabled = false;
		} else {
			document.getElementsByName("course3")[0].disabled = true;
		}
	}
	if (flag == 4) {
		if (document.getElementsByName("courseLabel")[3].checked == true) {
			document.getElementsByName("course4")[0].disabled = false;
		} else {
			document.getElementsByName("course4")[0].disabled = true;
		}
	}
	if (flag == 5) {
		if (document.getElementsByName("courseLabel")[4].checked == true) {
			document.getElementsByName("course5")[0].disabled = false;
		} else {
			document.getElementsByName("course5")[0].disabled = true;
		}
	}
	if (flag == 6) {
		if (document.getElementsByName("courseLabel")[5].checked == true) {
			document.getElementsByName("course6")[0].disabled = false;
		} else {
			document.getElementsByName("course6")[0].disabled = true;
		}
	}
	if (flag == 7) {
		if (document.getElementsByName("courseLabel")[6].checked == true) {
			document.getElementsByName("course7")[0].disabled = false;
		} else {
			document.getElementsByName("course7")[0].disabled = true;
		}
	}
	if (flag == 8) {
		if (document.getElementsByName("courseLabel")[7].checked == true) {
			document.getElementsByName("course8")[0].disabled = false;
		} else {
			document.getElementsByName("course8")[0].disabled = true;
		}
	}
	if (flag == 9) {
		if (document.getElementsByName("courseLabel")[8].checked == true) {
			document.getElementsByName("course9")[0].disabled = false;
		} else {
			document.getElementsByName("course9")[0].disabled = true;
		}
	}
	if (flag == 10) {
		if (document.getElementsByName("courseLabel")[9].checked == true) {
			document.getElementsByName("course10")[0].disabled = false;
		} else {
			document.getElementsByName("course10")[0].disabled = true;
		}
	}
}

function cleanCheckBox() {
	if (document.getElementsByName("product1")[0]) {
		document.getElementsByName("product1")[0].disabled = true;
		document.getElementsByName("productLabel")[0].checked = false;
	}
	if (document.getElementsByName("product2")[0]) {
		document.getElementsByName("product2")[0].disabled = true;
		document.getElementsByName("productLabel")[1].checked = false;
	}
	if (document.getElementsByName("product3")[0]) {
		document.getElementsByName("product3")[0].disabled = true;
		document.getElementsByName("productLabel")[2].checked = false;
	}
	if (document.getElementsByName("product4")[0]) {
		document.getElementsByName("product4")[0].disabled = true;
		document.getElementsByName("productLabel")[3].checked = false;
	}
	if (document.getElementsByName("product5")[0]) {
		document.getElementsByName("product5")[0].disabled = true;
		document.getElementsByName("productLabel")[4].checked = false;
	}

	if (document.getElementsByName("course1")[0]) {
		document.getElementsByName("course1")[0].checked = false;
	}
	if (document.getElementsByName("course2")[0]) {
		document.getElementsByName("course2")[0].checked = false;
	}
	if (document.getElementsByName("course3")[0]) {
		document.getElementsByName("course3")[0].checked = false;
	}
	if (document.getElementsByName("course4")[0]) {
		document.getElementsByName("course4")[0].checked = false;
	}
	if (document.getElementsByName("course5")[0]) {
		document.getElementsByName("course5")[0].checked = false;
	}

	if (document.getElementsByName("grade7")[0]) {
		document.getElementsByName("grade7")[0].checked = false;
	}
	if (document.getElementsByName("grade8")[0]) {
		document.getElementsByName("grade8")[0].checked = false;
	}
	if (document.getElementsByName("grade9")[0]) {
		document.getElementsByName("grade9")[0].checked = false;
	}
	if (document.getElementsByName("grade10")[0]) {
		document.getElementsByName("grade10")[0].checked = false;
	}
	if (document.getElementsByName("grade11")[0]) {
		document.getElementsByName("grade11")[0].checked = false;
	}
	if (document.getElementsByName("grade12")[0]) {
		document.getElementsByName("grade12")[0].checked = false;
	}

	if (document.getElementsByName("subFeeItem1")[0]) {
		document.getElementsByName("subFeeItem1")[0].disabled = true;
		document.getElementsByName("subFeeItemLabel")[0].checked = false;
	}
	if (document.getElementsByName("subFeeItem2")[0]) {
		document.getElementsByName("subFeeItem2")[0].disabled = true;
		document.getElementsByName("subFeeItemLabel")[1].checked = false;
	}
	if (document.getElementsByName("subFeeItem3")[0]) {
		document.getElementsByName("subFeeItem3")[0].disabled = true;
		document.getElementsByName("subFeeItemLabel")[2].checked = false;
	}
	if (document.getElementsByName("subFeeItem4")[0]) {
		document.getElementsByName("subFeeItem4")[0].disabled = true;
		document.getElementsByName("subFeeItemLabel")[3].checked = false;
	}
	if (document.getElementsByName("subFeeItem5")[0]) {
		document.getElementsByName("subFeeItem5")[0].disabled = true;
		document.getElementsByName("subFeeItemLabel")[4].checked = false;
	}
}

// 使所有学生升级一年，高三学生不动
function upgradeAll() {
	document.getElementsByName("submitType")[0].value = "upgradeFlag";
	if (confirm('请确认是否使所有学生升级一年？\n\n确认要提交该升级操作吗？')) {
		document.getElementById("principalSetForm").submit();
	}
}

function sqlRecord() {
	var xmlhttp;
	if (document.getElementsByName("schoolZone")[0].value == "") {
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
		//判断对象状态是否交互完成，如果为4则交互完成
		if (xmlhttp.readyState == 4) {
			//判断对象状态是否交互成功,如果成功则为200
			if (xmlhttp.status == 200) {
				//接收数据,得到服务器输出的XML数据

				var ret = xmlhttp.responseText;

				if (ret == "0") {
					document.getElementsByName("submitAdd")[0].disabled = false;
					//document.getElementsByName("submitDelete")[0].disabled = false;
					//document.getElementsByName("submitUpdate")[0].disabled = false;
					alert("该校区名不存在，可以创建一个新校区信息！");
				} else if (ret == "2") {
					document.getElementsByName("submitAdd")[0].disabled = true;
					alert("检查到该校区有多条记录，请联系管理员！");
				} else {
					document.getElementsByName("submitAdd")[0].disabled = true;
					document.getElementsByName("submitDelete")[0].disabled = false;
					document.getElementsByName("submitUpdate")[0].disabled = false;
					var info = eval(ret);
					document.getElementsByName("schoolZone")[0].value = info[0].schoolZone;
					document.getElementsByName("assistant")[0].value = info[0].assistant;
					// 先清除以前内容
					cleanCheckBox();

					// 再根据查询内容更新
					if (info[0].product1 != "") {
						document.getElementsByName("product1")[0].value = info[0].product1;
						document.getElementsByName("product1")[0].disabled = false;
						document.getElementsByName("productLabel")[0].checked = true;
					}
					if (info[0].product2 != "") {
						document.getElementsByName("product2")[0].value = info[0].product2;
						document.getElementsByName("product2")[0].disabled = false;
						document.getElementsByName("productLabel")[1].checked = true;
					}
					if (info[0].product3 != "") {
						document.getElementsByName("product3")[0].value = info[0].product3;
						document.getElementsByName("product3")[0].disabled = false;
						document.getElementsByName("productLabel")[2].checked = true;
					}
					if (info[0].product4 != "") {
						document.getElementsByName("product4")[0].value = info[0].product4;
						document.getElementsByName("product4")[0].disabled = false;
						document.getElementsByName("productLabel")[3].checked = true;
					}
					if (info[0].product5 != "") {
						document.getElementsByName("product5")[0].value = info[0].product5;
						document.getElementsByName("product5")[0].disabled = false;
						document.getElementsByName("productLabel")[4].checked = true;
					}

					if (info[0].course1 != "") {
						document.getElementsByName("course1")[0].value = info[0].course1;
						document.getElementsByName("course1")[0].disabled = false;
						document.getElementsByName("courseLabel")[0].checked = true;
					} else {
						document.getElementsByName("course1")[0].disabled = true;
						document.getElementsByName("courseLabel")[0].checked = false;
					}

					if (info[0].course2 != "") {
						document.getElementsByName("course2")[0].value = info[0].course2;
						document.getElementsByName("course2")[0].disabled = false;
						document.getElementsByName("courseLabel")[1].checked = true;
					} else {
						document.getElementsByName("course2")[0].disabled = true;
						document.getElementsByName("courseLabel")[1].checked = false;
					}
					if (info[0].course3 != "") {
						document.getElementsByName("course3")[0].value = info[0].course3;
						document.getElementsByName("course3")[0].disabled = false;
						document.getElementsByName("courseLabel")[2].checked = true;
					} else {
						document.getElementsByName("course3")[0].disabled = true;
						document.getElementsByName("courseLabel")[2].checked = false;
					}
					if (info[0].course4 != "") {
						document.getElementsByName("course4")[0].value = info[0].course4;
						document.getElementsByName("course4")[0].disabled = false;
						document.getElementsByName("courseLabel")[3].checked = true;
					} else {
						document.getElementsByName("course4")[0].disabled = true;
						document.getElementsByName("courseLabel")[4].checked = false;
					}
					if (info[0].course5 != "") {
						document.getElementsByName("course5")[0].value = info[0].course5;
						document.getElementsByName("course5")[0].disabled = false;
						document.getElementsByName("courseLabel")[4].checked = true;
					} else {
						document.getElementsByName("course5")[0].disabled = true;
						document.getElementsByName("courseLabel")[4].checked = false;
					}
					if (info[0].course6 != "") {
						document.getElementsByName("course6")[0].value = info[0].course6;
						document.getElementsByName("course6")[0].disabled = false;
						document.getElementsByName("courseLabel")[5].checked = true;
					} else {
						document.getElementsByName("course6")[0].disabled = true;
						document.getElementsByName("courseLabel")[5].checked = false;
					}
					if (info[0].course7 != "") {
						document.getElementsByName("course7")[0].value = info[0].course7;
						document.getElementsByName("course7")[0].disabled = false;
						document.getElementsByName("courseLabel")[6].checked = true;
					} else {
						document.getElementsByName("course7")[0].disabled = true;
						document.getElementsByName("courseLabel")[6].checked = false;
					}
					if (info[0].course8 != "") {
						document.getElementsByName("course8")[0].value = info[0].course8;
						document.getElementsByName("course8")[0].disabled = false;
						document.getElementsByName("courseLabel")[7].checked = true;
					} else {
						document.getElementsByName("course8")[0].disabled = true;
						document.getElementsByName("courseLabel")[7].checked = false;
					}
					if (info[0].course9 != "") {
						document.getElementsByName("course9")[0].value = info[0].course9;
						document.getElementsByName("course9")[0].disabled = false;
						document.getElementsByName("courseLabel")[8].checked = true;
					} else {
						document.getElementsByName("course9")[0].disabled = true;
						document.getElementsByName("courseLabel")[8].checked = false;
					}
					if (info[0].course10 != "") {
						document.getElementsByName("course10")[0].value = info[0].course10;
						document.getElementsByName("course10")[0].disabled = false;
						document.getElementsByName("courseLabel")[9].checked = true;
					} else {
						document.getElementsByName("course10")[0].disabled = true;
						document.getElementsByName("courseLabel")[9].checked = false;
					}

					if (info[0].grade7 == "on") {
						document.getElementsByName("grade7")[0].checked = true;
					}
					if (info[0].grade8 == "on") {
						document.getElementsByName("grade8")[0].checked = true;
					}
					if (info[0].grade9 == "on") {
						document.getElementsByName("grade9")[0].checked = true;
					}
					if (info[0].grade10 == "on") {
						document.getElementsByName("grade10")[0].checked = true;
					}
					if (info[0].grade11 == "on") {
						document.getElementsByName("grade11")[0].checked = true;
					}
					if (info[0].grade12 == "on") {
						document.getElementsByName("grade12")[0].checked = true;
					}

					if (info[0].subFeeItem1 != "") {
						document.getElementsByName("subFeeItem1")[0].value = info[0].subFeeItem1;
						document.getElementsByName("subFeeItem1")[0].disabled = false;
						document.getElementsByName("subFeeItemLabel")[0].checked = true;
					}
					if (info[0].subFeeItem2 != "") {
						document.getElementsByName("subFeeItem2")[0].value = info[0].subFeeItem2;
						document.getElementsByName("subFeeItem2")[0].disabled = false;
						document.getElementsByName("subFeeItemLabel")[1].checked = true;
					}
					if (info[0].subFeeItem3 != "") {
						document.getElementsByName("subFeeItem3")[0].value = info[0].subFeeItem3;
						document.getElementsByName("subFeeItem3")[0].disabled = false;
						document.getElementsByName("subFeeItemLabel")[2].checked = true;
					}
					if (info[0].subFeeItem4 != "") {
						document.getElementsByName("subFeeItem4")[0].value = info[0].subFeeItem4;
						document.getElementsByName("subFeeItem4")[0].disabled = false;
						document.getElementsByName("subFeeItemLabel")[3].checked = true;
					}
					if (info[0].subFeeItem5 != "") {
						document.getElementsByName("subFeeItem5")[0].value = info[0].subFeeItem5;
						document.getElementsByName("subFeeItem5")[0].disabled = false;
						document.getElementsByName("subFeeItemLabel")[4].checked = true;
					}

					document.getElementsByName("priceBKgrade7")[0].value = info[0].priceBKgrade7;
					document.getElementsByName("priceBKgrade8")[0].value = info[0].priceBKgrade8;
					document.getElementsByName("priceBKgrade9")[0].value = info[0].priceBKgrade9;
					document.getElementsByName("priceBKgrade10")[0].value = info[0].priceBKgrade10;
					document.getElementsByName("priceBKgrade11")[0].value = info[0].priceBKgrade11;
					document.getElementsByName("priceBKgrade12")[0].value = info[0].priceBKgrade12;

					document.getElementsByName("hour1")[0].value = info[0].hour1;
					document.getElementsByName("hour2")[0].value = info[0].hour2;
					document.getElementsByName("hour3")[0].value = info[0].hour3;

					document.getElementsByName("price7hour1YDY")[0].value = info[0].price7hour1YDY;
					document.getElementsByName("price7hour2YDY")[0].value = info[0].price7hour2YDY;
					document.getElementsByName("price7hour3YDY")[0].value = info[0].price7hour3YDY;
					document.getElementsByName("pay7")[0].value = info[0].pay7;
					document.getElementsByName("price8hour1YDY")[0].value = info[0].price8hour1YDY;
					document.getElementsByName("price8hour2YDY")[0].value = info[0].price8hour2YDY;
					document.getElementsByName("price8hour3YDY")[0].value = info[0].price8hour3YDY;
					document.getElementsByName("pay8")[0].value = info[0].pay8;
					document.getElementsByName("price9hour1YDY")[0].value = info[0].price9hour1YDY;
					document.getElementsByName("price9hour2YDY")[0].value = info[0].price9hour2YDY;
					document.getElementsByName("price9hour3YDY")[0].value = info[0].price9hour3YDY;
					document.getElementsByName("pay9")[0].value = info[0].pay9;
					document.getElementsByName("price10hour1YDY")[0].value = info[0].price10hour1YDY;
					document.getElementsByName("price10hour2YDY")[0].value = info[0].price10hour2YDY;
					document.getElementsByName("price10hour3YDY")[0].value = info[0].price10hour3YDY;
					document.getElementsByName("pay10")[0].value = info[0].pay10;
					document.getElementsByName("price11hour1YDY")[0].value = info[0].price11hour1YDY;
					document.getElementsByName("price11hour2YDY")[0].value = info[0].price11hour2YDY;
					document.getElementsByName("price11hour3YDY")[0].value = info[0].price11hour3YDY;
					document.getElementsByName("pay11")[0].value = info[0].pay11;
					document.getElementsByName("price12hour1YDY")[0].value = info[0].price12hour1YDY;
					document.getElementsByName("price12hour2YDY")[0].value = info[0].price12hour2YDY;
					document.getElementsByName("price12hour3YDY")[0].value = info[0].price12hour3YDY;
					document.getElementsByName("pay12")[0].value = info[0].pay12;

					var time = dateJS("Y-M-d", info[0].time);
					document.getElementsByName("time")[0].value = time;
					// document.getElementsByName("time")[0].value = info[0].time;
				}

			} else {
				alert("错误，请求页面异常！");
			}
		}
	};
	// 3发出http请求
	// 去除姓名中的所有空格
	var str = document.getElementsByName("schoolZone")[0].value;
	str = str.replace(/\s+/g, "");
	var url = "principalSet.php";
	url = url + "?schoolZone=" + encodeURIComponent(str);
	url = url + "&sid=" + Math.random();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
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

function CloseWebPage() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
			window.opener = null;
			window.close();
		} else {
			window.open('', '_top');
			window.top.close();
		}
	} else if (navigator.userAgent.indexOf("Firefox") > 0) {
		window.location.href = 'about:blank ';
	} else {
		window.opener = null;
		window.open('', '_self', '');
		window.close();
	}
}

function initPage() {
	// 只有校长才有进入校长设置的权限
	if (GetCookie('role') == '8') {
		// 校区负责人不能进入校长设置，只有校长可以进入
		CloseWebPage();
		alert('只有校长才有进入"校长设置"页面的权限！');
		return;
	}
	//
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

					// 载入已存在校区名字
					var obj1 = document.getElementsByName("schoolZoneSel")[0];
					i = 0;
					for (var tmp in info) {
						obj1.options.add(new Option(info[i].schoolZone, i + 1));
						i++;
					}

					// 根据所选校区自动加载相应的产品
					loadProduct(len);

					// 根据所选校区自动加载相应的科目
					loadCourse(len);

					// 默认填写当前日期
					document.getElementById("date").value = getNowFormatDate();

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

function loadProduct(len) {
	// 根据所选校区自动加载相应的产品
	var productNameIndex = new Array();
	for (var i = 0; i < 5; i++) {
		productNameIndex[i] = 0;
	}
	for (var i = 0; i < len; i++) {
		if (info[i].product1 != "") {
			productNameIndex[0] = i;
		}
		if (info[i].product2 != "") {
			productNameIndex[1] = i;
		}
		if (info[i].product3 != "") {
			productNameIndex[2] = i;
		}
		if (info[i].product4 != "") {
			productNameIndex[3] = i;
		}
		if (info[i].product5 != "") {
			productNameIndex[4] = i;
		}
	}

	document.getElementsByName("product1")[0].value = info[productNameIndex[0]].product1;
	document.getElementsByName("product2")[0].value = info[productNameIndex[1]].product2;
	document.getElementsByName("product3")[0].value = info[productNameIndex[2]].product3;
	document.getElementsByName("product4")[0].value = info[productNameIndex[3]].product4;
	document.getElementsByName("product5")[0].value = info[productNameIndex[4]].product5;
	/*
	 switch (len) {
	 case 1:
	 if (info[0].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[0].product1;
	 } else {
	 //document.getElementsByName("product1")[0].value = "";
	 }
	 if (info[0].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[0].product2;
	 } else {
	 //document.getElementsByName("product2")[0].value = "";
	 }
	 if (info[0].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[0].product3;
	 } else {
	 //document.getElementsByName("product3")[0].value = "";
	 }
	 if (info[0].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[0].product4;
	 } else {
	 //document.getElementsByName("product4")[0].value = "";
	 }
	 if (info[0].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[0].product5;
	 } else {
	 //document.getElementsByName("product5")[0].value = "";
	 }
	 break;
	 case 2:
	 if (info[0].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[0].product1;
	 } else if (info[1].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[1].product1;
	 } else {
	 //document.getElementsByName("product1")[0].value = "";
	 }
	 if (info[0].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[0].product2;
	 } else if (info[1].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[1].product2;
	 } else {
	 //document.getElementsByName("product2")[0].value = "";
	 }
	 if (info[0].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[0].product3;
	 } else if (info[1].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[1].product3;
	 } else {
	 //document.getElementsByName("product3")[0].value = "";
	 }
	 if (info[0].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[0].product4;
	 } else if (info[1].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[1].product4;
	 } else {
	 //document.getElementsByName("product4")[0].value = "";
	 }
	 if (info[0].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[0].product5;
	 } else if (info[1].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[1].product5;
	 } else {
	 //document.getElementsByName("product5")[0].value = "";
	 }
	 break;
	 case 3:
	 if (info[0].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[0].product1;
	 } else if (info[1].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[1].product1;
	 } else if (info[2].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[2].product1;
	 } else {
	 //document.getElementsByName("product1")[0].value = "";
	 }
	 if (info[0].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[0].product2;
	 } else if (info[1].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[1].product2;
	 } else if (info[2].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[2].product2;
	 } else {
	 //document.getElementsByName("product2")[0].value = "";
	 }
	 if (info[0].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[0].product3;
	 } else if (info[1].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[1].product3;
	 } else if (info[2].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[2].product3;
	 } else {
	 //document.getElementsByName("product3")[0].value = "";
	 }
	 if (info[0].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[0].product4;
	 } else if (info[1].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[1].product4;
	 } else if (info[2].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[2].product4;
	 } else {
	 //document.getElementsByName("product4")[0].value = "";
	 }
	 if (info[0].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[0].product5;
	 } else if (info[1].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[1].product5;
	 } else if (info[2].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[2].product5;
	 } else {
	 //document.getElementsByName("product5")[0].value = "";
	 }
	 break;
	 case 4:
	 if (info[0].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[0].product1;
	 } else if (info[1].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[1].product1;
	 } else if (info[2].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[2].product1;
	 } else if (info[3].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[3].product1;
	 } else {
	 //document.getElementsByName("product1")[0].value = "";
	 }
	 if (info[0].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[0].product2;
	 } else if (info[1].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[1].product2;
	 } else if (info[2].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[2].product2;
	 } else if (info[3].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[3].product2;
	 } else {
	 //document.getElementsByName("product2")[0].value = "";
	 }
	 if (info[0].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[0].product3;
	 } else if (info[1].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[1].product3;
	 } else if (info[2].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[2].product3;
	 } else if (info[3].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[3].product3;
	 } else {
	 //document.getElementsByName("product3")[0].value = "";
	 }
	 if (info[0].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[0].product4;
	 } else if (info[1].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[1].product4;
	 } else if (info[2].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[2].product4;
	 } else if (info[3].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[3].product4;
	 } else {
	 //document.getElementsByName("product4")[0].value = "";
	 }
	 if (info[0].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[0].product5;
	 } else if (info[1].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[1].product5;
	 } else if (info[2].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[2].product5;
	 } else if (info[3].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[3].product5;
	 } else {
	 //document.getElementsByName("product5")[0].value = "";
	 }
	 break;
	 case 5:
	 if (info[0].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[0].product1;
	 } else if (info[1].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[1].product1;
	 } else if (info[2].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[2].product1;
	 } else if (info[3].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[3].product1;
	 } else if (info[4].product1 != "") {
	 document.getElementsByName("product1")[0].value = info[4].product1;
	 } else {
	 //document.getElementsByName("product1")[0].value = "";
	 }
	 if (info[0].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[0].product2;
	 } else if (info[1].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[1].product2;
	 } else if (info[2].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[2].product2;
	 } else if (info[3].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[3].product2;
	 } else if (info[4].product2 != "") {
	 document.getElementsByName("product2")[0].value = info[4].product2;
	 } else {
	 //document.getElementsByName("product2")[0].value = "";
	 }
	 if (info[0].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[0].product3;
	 } else if (info[1].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[1].product3;
	 } else if (info[2].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[2].product3;
	 } else if (info[3].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[3].product3;
	 } else if (info[4].product3 != "") {
	 document.getElementsByName("product3")[0].value = info[4].product3;
	 } else {
	 //document.getElementsByName("product3")[0].value = "";
	 }
	 if (info[0].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[0].product4;
	 } else if (info[1].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[1].product4;
	 } else if (info[2].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[2].product4;
	 } else if (info[3].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[3].product4;
	 } else if (info[4].product4 != "") {
	 document.getElementsByName("product4")[0].value = info[4].product4;
	 } else {
	 //document.getElementsByName("product4")[0].value = "";
	 }
	 if (info[0].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[0].product5;
	 } else if (info[1].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[1].product5;
	 } else if (info[2].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[2].product5;
	 } else if (info[3].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[3].product5;
	 } else if (info[4].product5 != "") {
	 document.getElementsByName("product5")[0].value = info[4].product5;
	 } else {
	 //document.getElementsByName("product5")[0].value = "";
	 }
	 break;
	 default:
	 break;
	 }
	 */
}

function loadCourse(len) {
	// 根据所选校区自动加载相应的科目
	var courseNameIndex = new Array();
	for (var i = 0; i < len; i++) {
		courseNameIndex[i] = 0;
	}
	for (var i = 0; i < len; i++) {
		if (info[i].course1 != "") {
			courseNameIndex[0] = i;
		}
		if (info[i].course2 != "") {
			courseNameIndex[1] = i;
		}
		if (info[i].course3 != "") {
			courseNameIndex[2] = i;
		}
		if (info[i].course4 != "") {
			courseNameIndex[3] = i;
		}
		if (info[i].course5 != "") {
			courseNameIndex[4] = i;
		}
		if (info[i].course6 != "") {
			courseNameIndex[5] = i;
		}
		if (info[i].course7 != "") {
			courseNameIndex[6] = i;
		}
		if (info[i].course8 != "") {
			courseNameIndex[7] = i;
		}
		if (info[i].course9 != "") {
			courseNameIndex[8] = i;
		}
		if (info[i].course10 != "") {
			courseNameIndex[9] = i;
		}
	}

	document.getElementsByName("course1")[0].value = info[courseNameIndex[0]].course1;
	document.getElementsByName("course2")[0].value = info[courseNameIndex[1]].course2;
	document.getElementsByName("course3")[0].value = info[courseNameIndex[2]].course3;
	document.getElementsByName("course4")[0].value = info[courseNameIndex[3]].course4;
	document.getElementsByName("course5")[0].value = info[courseNameIndex[4]].course5;
	document.getElementsByName("course6")[0].value = info[courseNameIndex[5]].course6;
	document.getElementsByName("course7")[0].value = info[courseNameIndex[6]].course7;
	document.getElementsByName("course8")[0].value = info[courseNameIndex[7]].course8;
	document.getElementsByName("course9")[0].value = info[courseNameIndex[8]].course9;
	document.getElementsByName("course10")[0].value = info[courseNameIndex[9]].course10;

	/*
	 switch (len) {
	 case 1:
	 if (info[0].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[0].course1;
	 } else {
	 //document.getElementsByName("course1")[0].value = "";
	 }
	 if (info[0].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[0].course2;
	 } else {
	 //document.getElementsByName("course2")[0].value = "";
	 }
	 if (info[0].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[0].course3;
	 } else {
	 //document.getElementsByName("course3")[0].value = "";
	 }
	 if (info[0].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[0].course4;
	 } else {
	 //document.getElementsByName("course4")[0].value = "";
	 }
	 if (info[0].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[0].course5;
	 } else {
	 //document.getElementsByName("course5")[0].value = "";
	 }
	 if (info[0].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[0].course6;
	 } else {
	 //document.getElementsByName("course6")[0].value = "";
	 }
	 if (info[0].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[0].course7;
	 } else {
	 //document.getElementsByName("course5")[0].value = "";
	 }
	 if (info[0].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[0].course8;
	 } else {
	 //document.getElementsByName("course8")[0].value = "";
	 }
	 if (info[0].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[0].course9;
	 } else {
	 //document.getElementsByName("course9")[0].value = "";
	 }
	 if (info[0].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[0].course10;
	 } else {
	 //document.getElementsByName("course10")[0].value = "";
	 }
	 break;
	 case 2:
	 if (info[0].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[0].course1;
	 } else if (info[1].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[1].course1;
	 } else {
	 //document.getElementsByName("course1")[0].value = "";
	 }
	 if (info[0].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[0].course2;
	 } else if (info[1].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[1].course2;
	 } else {
	 //document.getElementsByName("course2")[0].value = "";
	 }
	 if (info[0].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[0].course3;
	 } else if (info[1].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[1].course3;
	 } else {
	 //document.getElementsByName("course3")[0].value = "";
	 }
	 if (info[0].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[0].course4;
	 } else if (info[1].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[1].course4;
	 } else {
	 //document.getElementsByName("course4")[0].value = "";
	 }
	 if (info[0].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[0].course5;
	 } else if (info[1].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[1].course5;
	 } else {
	 //document.getElementsByName("course5")[0].value = "";
	 }
	 if (info[0].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[0].course6;
	 } else if (info[1].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[1].course6;
	 } else {
	 //document.getElementsByName("course6")[0].value = "";
	 }
	 if (info[0].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[0].course7;
	 } else if (info[1].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[1].course7;
	 } else {
	 //document.getElementsByName("course7")[0].value = "";
	 }
	 if (info[0].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[0].course8;
	 } else if (info[1].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[1].course8;
	 } else {
	 //document.getElementsByName("course8")[0].value = "";
	 }
	 if (info[0].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[0].course9;
	 } else if (info[1].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[1].course9;
	 } else {
	 //document.getElementsByName("course9")[0].value = "";
	 }
	 if (info[0].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[0].course10;
	 } else if (info[1].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[1].course10;
	 } else {
	 //document.getElementsByName("course10")[0].value = "";
	 }
	 break;
	 case 3:
	 if (info[0].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[0].course1;
	 } else if (info[1].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[1].course1;
	 } else if (info[2].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[2].course1;
	 } else {
	 //document.getElementsByName("course1")[0].value = "";
	 }
	 if (info[0].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[0].course2;
	 } else if (info[1].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[1].course2;
	 } else if (info[2].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[2].course2;
	 } else {
	 //document.getElementsByName("course2")[0].value = "";
	 }
	 if (info[0].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[0].course3;
	 } else if (info[1].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[1].course3;
	 } else if (info[2].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[2].course3;
	 } else {
	 //document.getElementsByName("course3")[0].value = "";
	 }
	 if (info[0].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[0].course4;
	 } else if (info[1].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[1].course4;
	 } else if (info[2].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[2].course4;
	 } else {
	 //document.getElementsByName("course4")[0].value = "";
	 }
	 if (info[0].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[0].course5;
	 } else if (info[1].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[1].course5;
	 } else if (info[2].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[2].course5;
	 } else {
	 //document.getElementsByName("course5")[0].value = "";
	 }
	 if (info[0].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[0].course6;
	 } else if (info[1].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[1].course6;
	 } else if (info[2].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[2].course6;
	 } else {
	 //document.getElementsByName("course6")[0].value = "";
	 }
	 if (info[0].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[0].course7;
	 } else if (info[1].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[1].course7;
	 } else if (info[2].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[2].course7;
	 } else {
	 //document.getElementsByName("course7")[0].value = "";
	 }
	 if (info[0].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[0].course8;
	 } else if (info[1].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[1].course8;
	 } else if (info[2].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[2].course8;
	 } else {
	 //document.getElementsByName("course8")[0].value = "";
	 }
	 if (info[0].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[0].course9;
	 } else if (info[1].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[1].course9;
	 } else if (info[2].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[2].course9;
	 } else {
	 //document.getElementsByName("course9")[0].value = "";
	 }
	 if (info[0].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[0].course10;
	 } else if (info[1].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[1].course10;
	 } else if (info[2].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[2].course10;
	 } else {
	 //document.getElementsByName("course10")[0].value = "";
	 }
	 break;
	 case 4:
	 var courseNameIndex = new Array();
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

	 document.getElementsByName("course1")[0].value = info[courseNameIndex[0]].course1;
	 document.getElementsByName("course2")[0].value = info[courseNameIndex[1]].course2;
	 document.getElementsByName("course3")[0].value = info[courseNameIndex[2]].course3;
	 document.getElementsByName("course4")[0].value = info[courseNameIndex[3]].course4;
	 document.getElementsByName("course5")[0].value = info[courseNameIndex[4]].course5;
	 document.getElementsByName("course6")[0].value = info[courseNameIndex[5]].course6;
	 document.getElementsByName("course7")[0].value = info[courseNameIndex[6]].course7;
	 document.getElementsByName("course8")[0].value = info[courseNameIndex[7]].course8;
	 document.getElementsByName("course9")[0].value = info[courseNameIndex[8]].course9;
	 document.getElementsByName("course10")[0].value = info[courseNameIndex[9]].course10;

	 /*
	 if (info[0].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[0].course1;
	 } else if (info[1].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[1].course1;
	 } else if (info[2].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[2].course1;
	 } else if (info[3].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[3].course1;
	 } else {
	 //document.getElementsByName("course1")[0].value = "";
	 }
	 if (info[0].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[0].course2;
	 } else if (info[1].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[1].course2;
	 } else if (info[2].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[2].course2;
	 } else if (info[3].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[3].course2;
	 } else {
	 //document.getElementsByName("course2")[0].value = "";
	 }
	 if (info[0].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[0].course3;
	 } else if (info[1].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[1].course3;
	 } else if (info[2].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[2].course3;
	 } else if (info[3].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[3].course3;
	 } else {
	 //document.getElementsByName("course3")[0].value = "";
	 }
	 if (info[0].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[0].course4;
	 } else if (info[1].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[1].course4;
	 } else if (info[2].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[2].course4;
	 } else if (info[3].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[3].course4;
	 } else {
	 //document.getElementsByName("course4")[0].value = "";
	 }
	 if (info[0].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[0].course5;
	 } else if (info[1].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[1].course5;
	 } else if (info[2].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[2].course5;
	 } else if (info[3].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[3].course5;
	 } else {
	 //document.getElementsByName("course5")[0].value = "";
	 }
	 if (info[0].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[0].course6;
	 } else if (info[1].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[1].course6;
	 } else if (info[2].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[2].course6;
	 } else if (info[3].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[3].course6;
	 } else {
	 //document.getElementsByName("course6")[0].value = "";
	 }
	 if (info[0].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[0].course7;
	 } else if (info[1].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[1].course7;
	 } else if (info[2].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[2].course7;
	 } else if (info[3].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[3].course7;
	 } else {
	 //document.getElementsByName("course7")[0].value = "";
	 }
	 if (info[0].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[0].course8;
	 } else if (info[1].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[1].course8;
	 } else if (info[2].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[2].course8;
	 } else if (info[3].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[3].course8;
	 } else {
	 //document.getElementsByName("course8")[0].value = "";
	 }
	 if (info[0].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[0].course9;
	 } else if (info[1].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[1].course9;
	 } else if (info[2].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[2].course9;
	 } else if (info[3].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[3].course9;
	 } else {
	 //document.getElementsByName("course9")[0].value = "";
	 }
	 if (info[0].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[0].course10;
	 } else if (info[1].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[1].course10;
	 } else if (info[2].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[2].course10;
	 } else if (info[3].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[3].course10;
	 } else {
	 //document.getElementsByName("course10")[0].value = "";
	 }
	 //
	 break;
	 case 5:
	 if (info[0].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[0].course1;
	 } else if (info[1].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[1].course1;
	 } else if (info[2].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[2].course1;
	 } else if (info[3].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[3].course1;
	 } else if (info[4].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[4].course1;
	 } else {
	 //document.getElementsByName("course1")[0].value = "";
	 }
	 if (info[0].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[0].course2;
	 } else if (info[1].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[1].course2;
	 } else if (info[2].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[2].course2;
	 } else if (info[3].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[3].course2;
	 } else if (info[4].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[4].course2;
	 } else {
	 //document.getElementsByName("course2")[0].value = "";
	 }
	 if (info[0].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[0].course3;
	 } else if (info[1].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[1].course3;
	 } else if (info[2].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[2].course3;
	 } else if (info[3].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[3].course3;
	 } else if (info[4].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[4].course3;
	 } else {
	 //document.getElementsByName("course3")[0].value = "";
	 }
	 if (info[0].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[0].course4;
	 } else if (info[1].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[1].course4;
	 } else if (info[2].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[2].course4;
	 } else if (info[3].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[3].course4;
	 } else if (info[4].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[4].course4;
	 } else {
	 //document.getElementsByName("course4")[0].value = "";
	 }
	 if (info[0].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[0].course5;
	 } else if (info[1].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[1].course5;
	 } else if (info[2].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[2].course5;
	 } else if (info[3].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[3].course5;
	 } else if (info[4].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[4].course5;
	 } else {
	 //document.getElementsByName("course5")[0].value = "";
	 }
	 if (info[0].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[0].course6;
	 } else if (info[1].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[1].course6;
	 } else if (info[2].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[2].course6;
	 } else if (info[3].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[3].course6;
	 } else if (info[4].course6 != "") {
	 document.getElementsByName("course6")[0].value = info[4].course6;
	 } else {
	 //document.getElementsByName("course6")[0].value = "";
	 }
	 if (info[0].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[0].course7;
	 } else if (info[1].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[1].course7;
	 } else if (info[2].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[2].course7;
	 } else if (info[3].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[3].course7;
	 } else if (info[4].course7 != "") {
	 document.getElementsByName("course7")[0].value = info[4].course7;
	 } else {
	 //document.getElementsByName("course7")[0].value = "";
	 }
	 if (info[0].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[0].course8;
	 } else if (info[1].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[1].course8;
	 } else if (info[2].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[2].course8;
	 } else if (info[3].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[3].course8;
	 } else if (info[4].course8 != "") {
	 document.getElementsByName("course8")[0].value = info[4].course8;
	 } else {
	 //document.getElementsByName("course8")[0].value = "";
	 }
	 if (info[0].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[0].course9;
	 } else if (info[1].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[1].course9;
	 } else if (info[2].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[2].course9;
	 } else if (info[3].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[3].course9;
	 } else if (info[4].course9 != "") {
	 document.getElementsByName("course9")[0].value = info[4].course9;
	 } else {
	 //document.getElementsByName("course9")[0].value = "";
	 }
	 if (info[0].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[0].course10;
	 } else if (info[1].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[1].course10;
	 } else if (info[2].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[2].course10;
	 } else if (info[3].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[3].course10;
	 } else if (info[4].course10 != "") {
	 document.getElementsByName("course10")[0].value = info[4].course10;
	 } else {
	 //document.getElementsByName("course10")[0].value = "";
	 }
	 break;
	 case 6:
	 if (info[0].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[0].course1;
	 } else if (info[1].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[1].course1;
	 } else if (info[2].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[2].course1;
	 } else if (info[3].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[3].course1;
	 } else if (info[4].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[4].course1;
	 } else if (info[5].course1 != "") {
	 document.getElementsByName("course1")[0].value = info[5].course1;
	 }else {
	 //document.getElementsByName("course1")[0].value = "";
	 }
	 if (info[0].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[0].course2;
	 } else if (info[1].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[1].course2;
	 } else if (info[2].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[2].course2;
	 } else if (info[3].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[3].course2;
	 } else if (info[4].course2 != "") {
	 document.getElementsByName("course2")[0].value = info[4].course2;
	 } else {
	 //document.getElementsByName("course2")[0].value = "";
	 }
	 if (info[0].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[0].course3;
	 } else if (info[1].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[1].course3;
	 } else if (info[2].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[2].course3;
	 } else if (info[3].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[3].course3;
	 } else if (info[4].course3 != "") {
	 document.getElementsByName("course3")[0].value = info[4].course3;
	 } else {
	 //document.getElementsByName("course3")[0].value = "";
	 }
	 if (info[0].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[0].course4;
	 } else if (info[1].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[1].course4;
	 } else if (info[2].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[2].course4;
	 } else if (info[3].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[3].course4;
	 } else if (info[4].course4 != "") {
	 document.getElementsByName("course4")[0].value = info[4].course4;
	 } else {
	 //document.getElementsByName("course4")[0].value = "";
	 }
	 if (info[0].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[0].course5;
	 } else if (info[1].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[1].course5;
	 } else if (info[2].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[2].course5;
	 } else if (info[3].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[3].course5;
	 } else if (info[4].course5 != "") {
	 document.getElementsByName("course5")[0].value = info[4].course5;
	 } else {
	 //document.getElementsByName("course5")[0].value = "";
	 }
	 break;
	 default:
	 break;
	 }
	 */
}

function setHour3() {
	document.getElementsByName("hour3")[0].value = document.getElementsByName("hour2")[0].value;
}

// 产品名称数量，默认已经有一个了
var countProductItem = 1;

function addProductItem(nodeName) {
	if (countProductItem > 7) {
		alert('产品数量不能超过8个');
		return;
	} else {
		//创建input节点
		var input = document.createElement("input");
		//定义类型是文本输入
		input.setAttribute('type', 'text', 'required', 'class', 'inputText');

		//input.innerHTML = "<td><input type='text' name='' size='10' required/> </td>";

		var product = document.getElementsByName(nodeName)[0];

		product.parentNode.insertBefore(input, null);
		countProductItem++;

		document.getElementsByName('countProductItem')[0].value = countProductItem;
	}
}

function subProductItem(nodeName) {
	var product = document.getElementsByName(nodeName)[0];

	switch(countProductItem) {
	case 2:
		product.parentNode.removeChild(product.nextSibling.nextSibling);
		break;
	case 3:
		product.parentNode.removeChild(product.nextSibling.nextSibling.nextSibling);
		break;
	case 4:
		product.parentNode.removeChild(product.nextSibling.nextSibling.nextSibling.nextSibling);
		break;
	case 5:
		product.parentNode.removeChild(product.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
		break;
	case 6:
		product.parentNode.removeChild(product.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
		break;
	case 7:
		product.parentNode.removeChild(product.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
		break;
	case 8:
		product.parentNode.removeChild(product.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
		break;
	default:
		if (countProductItem > 7) {
			alert('产品数量不能超过8个');
		}
		return;
		break;
	}
	countProductItem--;
	if (countProductItem <= 1) {
		countProductItem = 1;
	}
	document.getElementsByName('countProductItem')[0].value = countProductItem;
}
