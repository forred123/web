<?php
header("Content-Type:text/html;charset=utf-8");

include 'verifyID.php';

// ajax查询上课记录
if (isset($_GET['sqlClass'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	//减一天是为了保证查询时间段为完全闭区间，因为默认为当日的0:0:0
	date_default_timezone_set('PRC');
	$timeStart = strtotime($_GET['timeStart']);
	$timeEnd = strtotime($_GET['timeEnd']) + 24 * 60 * 60 - 1;

	$sbmt = $pdo -> prepare("select * from subFeeTable where uid=? and attandenceTime>=? and attandenceTime<=?  order by subFeeCourse asc,convert(product using gbk) asc,attandenceTime desc");
	$sbmt -> execute(array($_GET['uid'], $timeStart, $timeEnd));

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

// ajax查询学生费用信息
if (isset($_GET['sqlFee'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	//减一天是为了保证查询时间段为完全闭区间，因为默认为当日的0:0:0
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

	$sbmt = $pdo -> prepare("select * from addFeeTable where uid = ? and time>=? and time<=?");
	$sbmt -> execute(array($_GET['uid'], $timeStart, $timeEnd));

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

// ajax查询学生基本信息
if (isset($_GET['sqlName'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from recordStudentTable where name1=? or name2=?");
	$sbmt -> execute(array(str_replace(' ', '', $_GET['sqlName']), str_replace(' ', '', $_GET['sqlName'])));

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

		<title>综合查询</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/sqlSome.js"></script>
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
		<h3 align="center">综合查询</h3>
		<table id="sql0Table" align="center" width="1300px" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center">查询时间</td>
				<td>开始时间
				<input type="text" class="date" style="width: 10ex" name="timeStart" readonly/>
				结束时间
				<input type="text" class="date" style="width: 10ex" name="timeEnd" readonly/>
				(提示：按时间为闭区间进行查询	) </td>
			</tr>

			<tr>
				<td align="center">查询姓名</td>
				<td>学生姓名
				<input type="text" name="sqlName" style="width: 6em" onblur="sqlSome()"/>
				<input type="button" name="previous" value="上一个" onclick="recordWithSameName('previous')" disabled="true"/>
				<input type="button" name="next" value="下一个" onclick="recordWithSameName('next')" disabled="true"/>
				(提示:默认显示所有表)
				<input type="button" name="showBasicTable" value="只显示基本信息表" onclick='showTable(1)'/>
				<input type="button" name="showClassTable" value="只显示考勤表" onclick='showTable(2)'/>
				<input type="button" name="showFeeTable" value="只显示交费表" onclick='showTable(3)'/>
				<input type="button" name="showAllTable" value="显示所有表" onclick='showTable(4)'/>
				&nbsp; <a onclick='exportToCSVsqlSome(this)' download="综合查询报表.csv" href="#">导出Excel</a></td>
			</tr>

		</table>
		<table id="sqlBasicTable" align="center" width="1300px" border="0" cellpadding="0" cellspacing="0">

		</table>
		<table id="sqlClassTable" align="center" width="1300px" border="0" cellpadding="0" cellspacing="0">

		</table>
		<table id="sqlFeeTable" align="center" width="1800px" border="0" cellpadding="0" cellspacing="0" style="display: block" >

		</table>
	</body>
</html>