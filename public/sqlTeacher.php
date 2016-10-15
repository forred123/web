<?php
header("Content-Type:text/html;charset=utf-8");

include 'verifyID.php';
/*
 if (!(isset($_COOKIE['isLogin'])) || ($_COOKIE['isLogin'] == 0)) {
 echo "请登录系统先！";
 echo '<script>setTimeout(\'location="../index.php"\',2000)</script>';
 }
 */

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

// ajax查询教师
if (isset($_GET['sqlTeacher'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	date_default_timezone_set('PRC');
	if ($_GET['timeStart'] == "%") {
		$timeStart = strtotime("2010-01-01");
	} else {
		$timeStart = strtotime($_GET['timeStart']);
	}

	if ($_GET['timeEnd'] == "%") {
		$timeEnd = strtotime(date("Y-m-d"));
	} else {
		$timeEnd = strtotime($_GET['timeEnd']) + 24 * 3600 - 1;
	}

	if ($_GET['grade'] == "初中") {
		$sbmt = $pdo -> prepare("select * from recordTeacherTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ? or schoolZone4 like ? or schoolZone5 like ?)
								and (grade7 like ? or grade8 like ? or grade9 like ?)
								and (course1 like ? or course2 like ? or course3 like ? or course4 like ? or course5 like ? or course6 like ? or course7 like ? or course8 like ? or course9 like ? or course10 like ?)
								and (product1 like ? or product2 like ? or product3 like ? or product4 like ? or product5 like ?)
								and workCondition like ? and workTime like ? and sex like ? and inTime >= ? and inTime <= ? order by convert (name using gbk) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], "初一", "初二", "初三", $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['workCondition'], $_GET['workTime'], $_GET['sex'], $timeStart, $timeEnd));
	} else if ($_GET['grade'] == "高中") {
		$sbmt = $pdo -> prepare("select * from recordTeacherTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ? or schoolZone4 like ? or schoolZone5 like ?)
								and (grade10 like ? or grade11 like ? or grade12 like ?)
								and (course1 like ? or course2 like ? or course3 like ? or course4 like ? or course5 like ? or course6 like ? or course7 like ? or course8 like ? or course9 like ? or course10 like ?)
								and (product1 like ? or product2 like ? or product3 like ? or product4 like ? or product5 like ?)
								and workCondition like ? and workTime like ? and sex like ? and inTime >= ? and inTime <= ? order by convert (name using gbk) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], "高一", "高二", "高三", $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['workCondition'], $_GET['workTime'], $_GET['sex'], $timeStart, $timeEnd));
	} else {
		$sbmt = $pdo -> prepare("select * from recordTeacherTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ? or schoolZone4 like ? or schoolZone5 like ?)
								and (grade7 like ? or grade8 like ? or grade9 like ? or grade10 like ? or grade11 like ? or grade12 like ?)
								and (course1 like ? or course2 like ? or course3 like ? or course4 like ? or course5 like ? or course6 like ? or course7 like ? or course8 like ? or course9 like ? or course10 like ?)
								and (product1 like ? or product2 like ? or product3 like ? or product4 like ? or product5 like ?)
								and workCondition like ? and workTime like ? and sex like ? and inTime >= ? and inTime <= ? order by convert (name using gbk) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], $_GET['grade'], $_GET['grade'], $_GET['grade'], $_GET['grade'], $_GET['grade'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['course'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['workCondition'], $_GET['workTime'], $_GET['sex'], $timeStart, $timeEnd));
	}

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
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html charset=utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>

		<title>教师信息查询</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/sqlTeacher.js"></script>
		<script src="../js/common.js"></script>

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
				jQuery("#datetime").datetimepicker({
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

				jQuery('.datetimeImage').datetimepicker({
					showOn : "button",
					buttonImage : "../jquery/jquery1.10.3/demos/images/calendar.gif",
					buttonImageOnly : true,
					closeText : '关闭',
					dateFormat : "yy-mm-dd",
					timeFormat : "HH:mm",
					hourGrid : 3,
					minuteGrid : 10,
					numberOfMonths : 1
				});

				$(".date").datepicker({
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

		<style>
			body {
				font: 14px verdana, arial, sans-serif;
			}
		</style>

	</head>
	<body onload="initPage()">
		<form action="sqlteacher.php" method="post">
			<table align="center" width="2500px" border="0" cellpadding="0" cellspacing="0">
				<!-- <caption align="left"> -->
				<h3>教师信息查询</h3>
				<!-- </caption> -->
				<tr>
					<th style="width: 70px">查询条件</th>
					<td> 校区
					<select name="schoolZone" onchange="loadPrincipalSetAndTeacher()">
						<option value="0">-请选择-</option>
					</select> 年级
					<select name="grade" >
						<option value="0">-请选择-</option>
						<option value="1">初中</option>
						<option value="2">高中</option>
					</select> 科目
					<select name="course" >
						<option value="0">-请选择-</option>
					</select> 产品名称
					<select name="product" >
						<option value="0">-请选择-</option>
					</select> 在职＆离职
					<select name="workCondition">
						<option value="0">--请选择--</option>
						<option value="1">在职</option>
						<option value="2">离职</option>
					</select> 全职＆兼职
					<select name="workTime">
						<option value="0">--请选择--</option>
						<option value="1">全职</option>
						<option value="2">兼职</option>
					</select> 教师性别
					<select name="sex" >
						<option value="0">-请选择-</option>
						<option value="1">男</option>
						<option value="2">女</option>
					</select>
				</tr>
				<tr>
					<!-- <td>查询结果</td> -->
					<th style="width: 70px">入职时间</th>
					<td> 开始时间
					<input type="text" class="date" style="width: 10ex" name="timeStart" readonly/>
					结束时间
					<input type="text" class="date" style="width: 10ex" name="timeEnd" readonly/>
					<input type="button" name="sqlTeacherBtn" value="查 询" onclick="sqlTeacher()" />
					(提示：按时间为闭区间进行查询	) </td>
				</tr>
			</table>
		</form>

		<!--  查询结果表 -->
		<table id="sqlTeacherTable" align="center" width="2500px" border="0" cellpadding="0" cellspacing="0">

		</table>
		<!--  end查询结果表 -->
	</body>
</html>