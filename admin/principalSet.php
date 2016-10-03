<?php
header("Content-Type:text/html;charset=utf-8");
include 'verifyIDAdmin.php';

// ajax查询校长设置,用于初始化
if (isset($_GET['noValue'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from principalSetTable");
	$sbmt -> execute();

	$row = array();
	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {
			// $result = $row['schoolZone'];
		}
		// 查询内容到此为止，否则返回的是整个html
		$data = json_encode($allRows);
		echo $data;
	} else {
		$result = "0";
		echo $result;
	}

	return;
}

// 查询
if (isset($_GET['schoolZone'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}
	$result = "0";
	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from principalSetTable where schoolZone = ?");
	$sbmt -> execute(array($_GET['schoolZone']));

	$i = 0;
	$row = array();
	if ($sbmt -> rowCount() == 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {

		}

		// 查询内容到此为止，否则返回的是整个html
		$data = json_encode($allRows);
		echo $data;
	} else if ($sbmt -> rowCount() > 1) {
		// 有多个记录
		$result = "2";
		echo $result;
	} else {
		$result = "0";
		echo $result;
	}

	return;
}

// 提交
if (isset($_POST['submitType'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}
	date_default_timezone_set('PRC');
	$time = strtotime($_POST['time']);

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	if($_POST['submitType']=="upgradeFlag"){
		$sbmt = $pdo -> prepare("update recordStudentTable set grade=grade+1;");
		$flag = $sbmt -> execute();

		if ($flag) {
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=principalSet.php>';
			echo "</head>";
			echo "<body>";
			echo "升级成功"."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="principalSet.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return TRUE;
		} else {
			echo "升级失败";
			return FALSE;
		}
	}
	//
	$course[0] = "";
	$course[1] = "";
	$course[2] = "";
	$course[3] = "";
	$course[4] = "";
	$course[5] = "";
	$course[6] = "";
	$course[7] = "";
	$course[8] = "";
	$course[9] = "";

	if (isset($_POST['course1'])) {
		$course[0] = str_replace(' ', '', $_POST['course1']);
	}
	if (isset($_POST['course2'])) {
		$course[1] = str_replace(' ', '', $_POST['course2']);
	}
	if (isset($_POST['course3'])) {
		$course[2] = str_replace(' ', '', $_POST['course3']);
	}
	if (isset($_POST['course4'])) {
		$course[3] = str_replace(' ', '', $_POST['course4']);
	}
	if (isset($_POST['course5'])) {
		$course[4] = str_replace(' ', '', $_POST['course5']);
	}
	if (isset($_POST['course6'])) {
		$course[5] = str_replace(' ', '', $_POST['course6']);
	}
	if (isset($_POST['course7'])) {
		$course[6] = str_replace(' ', '', $_POST['course7']);
	}
	if (isset($_POST['course8'])) {
		$course[7] = str_replace(' ', '', $_POST['course8']);
	}
	if (isset($_POST['course9'])) {
		$course[8] = str_replace(' ', '', $_POST['course9']);
	}
	if (isset($_POST['course10'])) {
		$course[9] = str_replace(' ', '', $_POST['course10']);
	}
	

	//print_r($course);
	$grade[0] = "";
	$grade[1] = "";
	$grade[2] = "";
	$grade[3] = "";
	$grade[4] = "";
	$grade[5] = "";

	if (isset($_POST['grade7'])) {
		$grade[0] = $_POST['grade7'];
	}
	if (isset($_POST['grade8'])) {
		$grade[1] = $_POST['grade8'];
	}
	if (isset($_POST['grade9'])) {
		$grade[2] = $_POST['grade9'];
	}
	if (isset($_POST['grade10'])) {
		$grade[3] = $_POST['grade10'];
	}
	if (isset($_POST['grade11'])) {
		$grade[4] = $_POST['grade11'];
	}
	if (isset($_POST['grade12'])) {
		$grade[5] = $_POST['grade12'];
	}
	
	$product[0] = "";
	$product[1] = "";
	$product[2] = "";
	$product[3] = "";
	$product[4] = "";

	if (isset($_POST['product1'])) {
		$product[0] = str_replace(' ', '', $_POST['product1']);
	}
	if (isset($_POST['product2'])) {
		$product[1] = str_replace(' ', '', $_POST['product2']);
	}
	if (isset($_POST['product3'])) {
		$product[2] = str_replace(' ', '', $_POST['product3']);
	}
	if (isset($_POST['product4'])) {
		$product[3] = str_replace(' ', '', $_POST['product4']);
	}
	if (isset($_POST['product5'])) {
		$product[4] = str_replace(' ', '', $_POST['product5']);
	}
	
	$subFeeItem[0] = "";
	$subFeeItem[1] = "";
	$subFeeItem[2] = "";
	$subFeeItem[3] = "";
	$subFeeItem[4] = "";

	if (isset($_POST['subFeeItem1'])) {
		$subFeeItem[0] = str_replace(' ', '', $_POST['subFeeItem1']);
	}
	if (isset($_POST['subFeeItem2'])) {
		$subFeeItem[1] = str_replace(' ', '', $_POST['subFeeItem2']);
	}
	if (isset($_POST['subFeeItem3'])) {
		$subFeeItem[2] = str_replace(' ', '', $_POST['subFeeItem3']);
	}
	if (isset($_POST['subFeeItem4'])) {
		$subFeeItem[3] = str_replace(' ', '', $_POST['subFeeItem4']);
	}
	if (isset($_POST['subFeeItem5'])) {
		$subFeeItem[4] = str_replace(' ', '', $_POST['subFeeItem5']);
	}


	if (isset($_POST['submitAdd'])) {
		$sbmt = $pdo -> prepare("insert into principalSetTable (schoolZone, assistant, 
	product1, product2,	product3, product4,	product5,course1,course2,course3,course4,course5,course6,course7,course8,course9,course10,grade7,grade8,
	grade9,grade10,grade11,grade12,subFeeItem1,subFeeItem2,subFeeItem3,subFeeItem4,subFeeItem5,priceBKgrade7,
	priceBKgrade8,priceBKgrade9,priceBKgrade10,	priceBKgrade11,priceBKgrade12,	
	hour1,hour2,hour3,price7hour1YDY,price7hour2YDY,price7hour3YDY,pay7,price8hour1YDY,price8hour2YDY,price8hour3YDY,pay8,
	price9hour1YDY,price9hour2YDY,price9hour3YDY,pay9,price10hour1YDY,price10hour2YDY,price10hour3YDY,pay10,
	price11hour1YDY,price11hour2YDY,price11hour3YDY,pay11,price12hour1YDY,price12hour2YDY,price12hour3YDY,pay12,time) 
	values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

		$flag = $sbmt -> execute(array(str_replace(' ', '', $_POST['schoolZone']), str_replace(' ', '', $_POST['assistant']), $product[0], $product[1], $product[2], $product[3], $product[4], $course[0], $course[1], $course[2], $course[3], $course[4], $course[5], $course[6], $course[7], $course[8], $course[9], $grade[0], $grade[1], $grade[2], $grade[3], $grade[4], $grade[5], $subFeeItem[0], $subFeeItem[1], $subFeeItem[2], $subFeeItem[3], $subFeeItem[4], str_replace(' ', '', $_POST['priceBKgrade7']), str_replace(' ', '', $_POST['priceBKgrade8']), str_replace(' ', '', $_POST['priceBKgrade9']), str_replace(' ', '', $_POST['priceBKgrade10']), str_replace(' ', '', $_POST['priceBKgrade11']), str_replace(' ', '', $_POST['priceBKgrade12']), str_replace(' ', '', $_POST['hour1']), str_replace(' ', '', $_POST['hour2']), str_replace(' ', '', $_POST['hour3']), str_replace(' ', '', $_POST['price7hour1YDY']), str_replace(' ', '', $_POST['price7hour2YDY']), str_replace(' ', '', $_POST['price7hour3YDY']), str_replace(' ', '', $_POST['pay7']), str_replace(' ', '', $_POST['price8hour1YDY']), str_replace(' ', '', $_POST['price8hour2YDY']), str_replace(' ', '', $_POST['price8hour3YDY']), str_replace(' ', '', $_POST['pay8']), str_replace(' ', '', $_POST['price9hour1YDY']), str_replace(' ', '', $_POST['price9hour2YDY']), str_replace(' ', '', $_POST['price9hour3YDY']), str_replace(' ', '', $_POST['pay9']), str_replace(' ', '', $_POST['price10hour1YDY']), str_replace(' ', '', $_POST['price10hour2YDY']), str_replace(' ', '', $_POST['price10hour3YDY']), str_replace(' ', '', $_POST['pay10']), str_replace(' ', '', $_POST['price11hour1YDY']), str_replace(' ', '', $_POST['price11hour2YDY']), str_replace(' ', '', $_POST['price11hour3YDY']), str_replace(' ', '', $_POST['pay11']), str_replace(' ', '', $_POST['price12hour1YDY']), str_replace(' ', '', $_POST['price12hour2YDY']), str_replace(' ', '', $_POST['price12hour3YDY']), str_replace(' ', '', $_POST['pay12']), $time));

		if ($flag) {
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=principalSet.php>';
			echo "</head>";
			echo "<body>";
			echo "添加成功"."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="principalSet.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return TRUE;
		} else {
			echo "添加失败";
			return FALSE;
		}
	}

	if (isset($_POST['submitUpdate'])) {
		$sbmt = $pdo -> prepare("update principalSetTable set assistant=?, 
	product1=?, product2=?,	product3=?, product4=?,	product5=?,course1=?,course2=?,course3=?,course4=?,course5=?,course6=?,course7=?,course8=?,course9=?,course10=?,grade7=?,grade8=?,
	grade9=?,grade10=?,grade11=?,grade12=?,subFeeItem1=?,subFeeItem2=?,subFeeItem3=?,subFeeItem4=?,subFeeItem5=?,priceBKgrade7=?,
	priceBKgrade8=?,priceBKgrade9=?,priceBKgrade10=?,	priceBKgrade11=?,priceBKgrade12=?,	
	hour1=?,hour2=?,hour3=?,price7hour1YDY=?,price7hour2YDY=?,price7hour3YDY=?,pay7=?,price8hour1YDY=?,price8hour2YDY=?,price8hour3YDY=?,pay8=?,
	price9hour1YDY=?,price9hour2YDY=?,price9hour3YDY=?,pay9=?,price10hour1YDY=?,price10hour2YDY=?,price10hour3YDY=?,pay10=?,
	price11hour1YDY=?,price11hour2YDY=?,price11hour3YDY=?,pay11=?,price12hour1YDY=?,price12hour2YDY=?,price12hour3YDY=?,pay12=?,time=? where schoolZone=?");

		$flag = $sbmt -> execute(array(str_replace(' ', '', $_POST['assistant']), $product[0], $product[1], $product[2], $product[3], $product[4], $course[0], $course[1], $course[2], $course[3], $course[4], $course[5], $course[6], $course[7], $course[8], $course[9], $grade[0], $grade[1], $grade[2], $grade[3], $grade[4], $grade[5], $subFeeItem[0], $subFeeItem[1], $subFeeItem[2], $subFeeItem[3], $subFeeItem[4],  str_replace(' ', '', $_POST['priceBKgrade7']), str_replace(' ', '', $_POST['priceBKgrade8']), str_replace(' ', '', $_POST['priceBKgrade9']), str_replace(' ', '', $_POST['priceBKgrade10']), str_replace(' ', '', $_POST['priceBKgrade11']), str_replace(' ', '', $_POST['priceBKgrade12']), str_replace(' ', '', $_POST['hour1']), str_replace(' ', '', $_POST['hour2']), str_replace(' ', '', $_POST['hour3']), str_replace(' ', '', $_POST['price7hour1YDY']), str_replace(' ', '', $_POST['price7hour2YDY']), str_replace(' ', '', $_POST['price7hour3YDY']), str_replace(' ', '', $_POST['pay7']), str_replace(' ', '', $_POST['price8hour1YDY']), str_replace(' ', '', $_POST['price8hour2YDY']), str_replace(' ', '', $_POST['price8hour3YDY']), str_replace(' ', '', $_POST['pay8']), str_replace(' ', '', $_POST['price9hour1YDY']), str_replace(' ', '', $_POST['price9hour2YDY']), str_replace(' ', '', $_POST['price9hour3YDY']), str_replace(' ', '', $_POST['pay9']), str_replace(' ', '', $_POST['price10hour1YDY']), str_replace(' ', '', $_POST['price10hour2YDY']), str_replace(' ', '', $_POST['price10hour3YDY']), str_replace(' ', '', $_POST['pay10']), str_replace(' ', '', $_POST['price11hour1YDY']), str_replace(' ', '', $_POST['price11hour2YDY']), str_replace(' ', '', $_POST['price11hour3YDY']), str_replace(' ', '', $_POST['pay11']), str_replace(' ', '', $_POST['price12hour1YDY']), str_replace(' ', '', $_POST['price12hour2YDY']), str_replace(' ', '', $_POST['price12hour3YDY']), str_replace(' ', '', $_POST['pay12']), $time, str_replace(' ', '', $_POST['schoolZone'])));

		if ($flag) {
			echo "修改成功！";
			return TRUE;
		} else {
			echo "修改失败";
			return FALSE;
		}
	}

	if (isset($_POST['submitDelete'])) {
		$sbmt = $pdo -> prepare("delete from principalSetTable where schoolZone = ?");
		$flag = $sbmt -> execute(array($_POST['schoolZone']));

		if ($flag) {
			echo "删除成功！";
			return TRUE;
		} else {
			echo "删除失败";
			return FALSE;
		}
	}

}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Contont-Type" content="Text/html" charset="utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>
		
		<title>校长设置</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/common.js"></script>
		<script src="../js/principalSet.js"></script>

		<!--datetimepicker-->
		<link type="text/css" href="../jquery/jquery1.10.3/themes/base/jquery-ui.css" rel="stylesheet" />
		<link type="text/css" href="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.css" />
		<link type="text/css"href="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/demos.css" />
		<script type="text/javascript" src="../jquery/jquery1.10.3/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="../jquery/jquery1.10.3/ui/minified/jquery-ui.min.js"></script>

		<script type="text/javascript" src="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.js" ></script>

		<!--中文-->
		<script type="text/javascript" charset="gb2312" src="../jquery/jQuery-Timepicker-Addon/js/jquery.ui.datepicker-zh-CN.js.js"></script>
		<script type="text/javascript" src="../jquery/jQuery-Timepicker-Addon/js/jquery-ui-timepicker-zh-CN.js"></script>
		<script type="text/javascript">
			jQuery(function() {
				// 时间设置
				jQuery('#datetime').datetimepicker({
					timeFormat : "HH:mm:ss",
					dateFormat : "yy-mm-dd"
				});

				jQuery("#datetimeShow").datetimepicker({
					showOtherMonths : true,
					selectOtherMonths : false,
					closeText : '', //'确定',
					dateFormat : "yy-mm-dd",
					timeFormat : "HH:mm:ss",
					hourGrid : 3,
					minuteGrid : 10,
					numberOfMonths : 1,
					onSelect : function(dateText, inst) {
						//alert("您选择的日期是：" + dateText);
						document.getElementById("datetimeSel").value = dateText;
					}
				});

				jQuery('#datetimeImage').datetimepicker({
					showOn : "button",
					buttonImage : "../jquery/jquery1.10.3/demos/images/calendar.gif",
					buttonImageOnly : true,
					closeText : '确定',
					dateFormat : "yy-mm-dd",
					timeFormat : "HH:mm:ss",
					hourGrid : 3,
					minuteGrid : 10,
					numberOfMonths : 1
				});

				$("#date").datepicker({
					showOn : "button",
					buttonImage : "../jquery/jquery1.10.3/demos/images/calendar.gif",
					buttonImageOnly : true,
					closeText : '关闭',
					dateFormat : "yy-mm-dd"
				});
				// 日期

				$("#time").timepicker();
				// 时分秒

			});
		</script>
		<!--end datepicker -->
		
		<!-- 		添加表格样式 -->
		<script type="text/javascript">
			$(document).ready(function(){
				$("tr").mouseover(function(){
					$(this).css("background-color","#e9eaec");
				});
				$("tr").mouseout(function(){
					$(this).css("background-color","");
				});
				$("tr:odd").addClass("rowBgColorOdd");
				$("tr:even").addClass("rowBgColorEven");
			})
		</script>
		
		<style>
			body {
				font: 16px verdana, arial, sans-serif;
			}
			th {
				width: 18ex;
			}
			input .inputText {
				width: 18ex;
			}
			.btn {
				width: 6ex;
			}
		</style>
	</head>

	<body onload=initPage()>
		<table align="center" width="900" border="0" cellpadding="0" cellspacing="0">
			<caption align="center">
				<h3>校长设置项目 </h3>
			</caption>
			<form id="principalSetForm" action="principalSet.php" method="post">
				<tr>
					<th>校区名称：</th>
					<td>
					<input type="text" class="inputText" name="schoolZone" style="width: 150px" onblur="sqlRecord()"/>(查询关键字)
					<select name="schoolZoneSel" style="width: 150px" onchange="copySchoolZoneAndSql()">
						<option value="0">--请选择--</option>						
					</select>(已存在校区)
					</td>
				</tr>

				<tr>
					<th>校区负责人：</th>
					<td>
					<input type="text" class="inputText" name="assistant" size="18" />
					</td>
				</tr>

				<tr>
					<th>产品名称：</th>
					<td>
					<input type="checkbox" name="productLabel" onclick="enableProduct(1)" /> <input type="text" style="width: 6em" name="product1"  value="" disabled="true" />
					<input type="checkbox" name="productLabel" onclick="enableProduct(2)" /> <input type="text" style="width: 6em" name="product2"  value="" disabled="true" />
					<input type="checkbox" name="productLabel" onclick="enableProduct(3)" /> <input type="text" style="width: 6em" name="product3"  value="" disabled="true"/>
					<input type="checkbox" name="productLabel" onclick="enableProduct(4)" /> <input type="text" style="width: 6em" name="product4"  value="" disabled="true"/>
					<input type="checkbox" name="productLabel" onclick="enableProduct(5)" /> <input type="text" style="width: 6em" name="product5"  value="" disabled="true"/>
					<br>(提示：新产生的产品名称不可更改)</td>
				</tr>

				<tr>
					<th>科目名称：</th>
					<td>
						<!--
						<label for="Math">
						<input type="checkbox" name="course1" id="Math" />
						数学</label><label for="Chinese">
						<input	type="checkbox" name="course2" id="Chinese" />
						语文</label><label for="English">
						<input	type="checkbox" name="course3" id="English" />
						英语</label><label for="Physics">
						<input	type="checkbox" name="course4" id="Physics" />
						物理</label><label for="Chemistry">
						<input type="checkbox" name="course5" id="Chemistry" />
						化学</label>
						-->
						<input type="checkbox" name="courseLabel" onclick="enableCourse(1)" /> <input type="text" style="width: 4em" name="course1"  value="" disabled="true" />
						<input type="checkbox" name="courseLabel" onclick="enableCourse(2)" /> <input type="text" style="width: 4em" name="course2"  value="" disabled="true" />
						<input type="checkbox" name="courseLabel" onclick="enableCourse(3)" /> <input type="text" style="width: 4em" name="course3"  value="" disabled="true" />
						<input type="checkbox" name="courseLabel" onclick="enableCourse(4)" /> <input type="text" style="width: 4em" name="course4"  value="" disabled="true" />
						<input type="checkbox" name="courseLabel" onclick="enableCourse(5)" /> <input type="text" style="width: 4em" name="course5"  value="" disabled="true" />
						<input type="checkbox" name="courseLabel" onclick="enableCourse(6)" /> <input type="text" style="width: 4em" name="course6"  value="" disabled="true" />
						<input type="checkbox" name="courseLabel" onclick="enableCourse(7)" /> <input type="text" style="width: 4em" name="course7"  value="" disabled="true" />
						<br />
						<input type="checkbox" name="courseLabel" onclick="enableCourse(8)" /> <input type="text" style="width: 4em" name="course8"  value="" disabled="true" />
						<input type="checkbox" name="courseLabel" onclick="enableCourse(9)" /> <input type="text" style="width: 4em" name="course9"  value="" disabled="true" />
						<input type="checkbox" name="courseLabel" onclick="enableCourse(10)" /> <input type="text" style="width: 4em" name="course10"  value="" disabled="true" />						
						(提示：新产生的科目名称不可更改)
					</td>
				</tr>

				<tr>
					<th>年级设置：</th>
					<td><label for="grade1"> <!--
						<input type="checkbox" name="grade1" id="grade1">
						一年级</label><label for="grade2">
						<input type="checkbox" name="grade2" id="grade2">
						二年级</label><label for="grade3">
						<input type="checkbox" name="grade3" id="grade3">
						三年级</label><label for="grade4">
						<input type="checkbox" name="grade4" id="grade4">
						四年级</label>

						<label for="grade5">
						<input type="checkbox" name="grade5" id="grade5">
						五年级</label><label for="grade6">
						<input type="checkbox" name="grade6" id="grade6">
						六年级</label>
						<br />
						--> <label for="grade7">
							<input type="checkbox" name="grade7" id="grade7" />
							初一</label> <label for="grade8">
							<input type="checkbox" name="grade8" id="grade8" />
							初二</label><label for="grade9">
							<input type="checkbox" name="grade9" id="grade9" />
							初三</label><label for="grade10">
							<input type="checkbox" name="grade10" id="grade10" />
							高一</label> <label for="grade11">
							<input type="checkbox" name="grade11" id="grade11" />
							高二</label> <label for="grade12">
							<input type="checkbox" name="grade12" id="grade12" />
							高三 </label>
							</td>
				</tr>

				<tr>
					<th>扣费项目：</th>
					<td>
					<input type="checkbox" name="subFeeItemLabel" onclick="enablesubFeeItem(1)"/> <input type="text" style="width: 6em" class="inputText" name="subFeeItem1" size="16" value="资料费" disabled="true" />
					<input type="checkbox" name="subFeeItemLabel" onclick="enablesubFeeItem(2)"/> <input type="text" style="width: 6em" class="inputText" name="subFeeItem2" size="16" value="饮料费" disabled="true"/>
					<input type="checkbox" name="subFeeItemLabel" onclick="enablesubFeeItem(3)"/> <input type="text" style="width: 6em" class="inputText" name="subFeeItem3" size="16" value="" disabled="true"/>
					<input type="checkbox" name="subFeeItemLabel" onclick="enablesubFeeItem(4)"/> <input type="text" style="width: 6em" class="inputText" name="subFeeItem4" size="16" value="" disabled="true"/>
					<input type="checkbox" name="subFeeItemLabel" onclick="enablesubFeeItem(5)"/> <input type="text" style="width: 6em" class="inputText" name="subFeeItem5" size="16" value="" disabled="true"/>
					<br />(提示：新产生的扣费名称不可更改)
					</td>
				</tr>

				<tr>
					<th>班课单价设置：
					<br />
					(元/节课)</th>
					<td> 初一：
					<input type="number" style="width: 6em" class="inputText" size="18" name="priceBKgrade7"  />
					高一：
					<input type="number" style="width: 6em" class="inputText" size="18" name="priceBKgrade10"  />
					<br />
					初二：
					<input type="number" style="width: 6em" class="inputText" size="18" name="priceBKgrade8"  />
					高二：
					<input type="number" style="width: 6em" class="inputText" size="18" name="priceBKgrade11"  />
					<br />
					初三：
					<input type="number" style="width: 6em" class="inputText" size="18" name="priceBKgrade9"  />
					高三：
					<input type="number" style="width: 6em" class="inputText" size="18" name="priceBKgrade12"  />
					<br />
					</td>
				</tr>

				<tr>
					<th>一对一单价设置
					<br />
					(元/小时)</th>
					<td>
					<table align="center" width="700" border="5" cellpadding="0" cellspacing="0">
						<tr>
							<th>年级</th>
							<td>
							<input type="number" style="width: 3em" name="hour1" value="50" />
							小时以下</td>
							<td>
							<input type="number" style="width: 3em" name="hour2" value="100" onchange="setHour3()"/>
							小时以下</td>
							<td>
							<input type="number" style="width: 3em" name="hour3" value="100" readonly="true"/>
							小时以上</td>
							<td>
							单小时工资
							</td>
						</tr>
						<tr>
							<th>初一</th>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price7hour1YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price7hour2YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price7hour3YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="pay7"  />
							</td>
						</tr>
						<tr>
							<th>初二</th>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price8hour1YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price8hour2YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price8hour3YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="pay8"  />
							</td>
						</tr>
						<tr>
							<th>初三</th>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price9hour1YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price9hour2YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price9hour3YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="pay9"  />
							</td>
						</tr>
						<tr>
							<th>高一</th>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price10hour1YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price10hour2YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price10hour3YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="pay10"  />
							</td>
						</tr>
						<tr>
							<th>高二</th>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price11hour1YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price11hour2YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price11hour3YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="pay11"  />
							</td>
						</tr>
						<tr>
							<th>高三</th>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price12hour1YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price12hour2YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="price12hour3YDY"  />
							</td>
							<td>
							<input type="number" style="width: 6em" class="inputPrice" size="12" name="pay12"  />
							</td>
						</tr>

					</table></td>
				</tr>

				<tr>
					<th>操作时间：</th>
					<td>
					<input type="text" id="date" name="time" size="18" readonly/>
					</td>
				</tr>

				<tr>
					<th>学生升级设置：</th>
					<td>
					<input type="button" class="inputText" name="btnUpgrade" size="18" value="所有学生升级一年" onclick="upgradeAll()" />
					(提示：只在学生升级时操作，个别未升级学生去学生档案中进行修改。)
					</td>
				</tr>

				<tr>
					<th></th>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td colspan="4" align="center">
					<input type="hidden" name="submitType" />
					<input type="button" class="btn" name="buttonSql" value="查询" onclick="sqlRecord()"/>
					<input type="submit" class="btn" name="submitAdd" value="增加" disabled="true" />
					<input type="submit" class="btn" name="submitUpdate" value="修改"  disabled="true"/>
					<input type="submit" class="btn" name="submitDelete" value="删除"  disabled="true"/>
					<input type="reset" class="btn" name="reset" value="重置"/>
					</td>
				</tr>
			</form>
		</table>
	</body>

</html>