<?php
header("Content-Type:text/html;charset=utf-8");
include 'verifyID.php';

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

// ajax查询费用情况－交费、转费、退费
if (isset($_GET['sqlFee'])) {
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

	if ($_GET['course'] == "1") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course1 !=? and course1Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else if ($_GET['course'] == "2") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course2 !=? and course2Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else if ($_GET['course'] == "3") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course3 !=? and course3Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else if ($_GET['course'] == "4") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course4 !=? and course4Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else if ($_GET['course'] == "5") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course5 !=? and course5Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else if ($_GET['course'] == "6") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course6 !=? and course6Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else if ($_GET['course'] == "7") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course7 !=? and course7Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else if ($_GET['course'] == "8") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course8 !=? and course8Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else if ($_GET['course'] == "9") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course9 !=? and course9Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else if ($_GET['course'] == "10") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and course10 !=? and course10Product like ?
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and mode like ? and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], "0", $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $_GET['mode'], $timeStart, $timeEnd));
	} else {
		$sbmt = $pdo -> prepare("select * from addFeeTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and mode like ? 
					and (course1Product like ? or course2Product like ? or course3Product like ? or course4Product like ? or course5Product like ? or course6Product like ? or course7Product like ? or course8Product like ? or course9Product like ? or course10Product like ?)
					and (name1 like ? or name2 like ?) and receiptNum like ?
					and time >= ? and time <= ? order by convert(receiptNum ,SIGNED) asc,convert(billNum ,SIGNED) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['grade'], $_GET['mode'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], str_replace(' ', '', $_GET['name']), str_replace(' ', '', $_GET['name']), $_GET['receiptNum'], $timeStart, $timeEnd));
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

		<title>费用记录查询</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/sqlFee.js"></script>
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
			<table align="center" width="4000px" border="0" cellpadding="0" cellspacing="0">
				<!-- <caption align="left"> -->
				<h3>费用记录查询</h3>
				<!-- </caption> -->
				<tr>
					<th style="width: 70px">查询条件</th>
					<td> 校区
					<select name="schoolZone" onchange="loadPrincipalSetAndTeacher()">
						<option value="0">-请选择-</option>
					</select> 年级
					<select name="grade" >
						<option value="0">-请选择-</option>
					</select> 科目
					<select name="course" >
						<option value="0">-请选择-</option>
					</select> 产品名称
					<select name="product" >
						<option value="0">-请选择-</option>
					</select> 类别
					<select name="mode">
						<option value="0">--请选择--</option>
						<option value="1">交费</option>
						<option value="2">转费</option>
						<option value="3">退费</option>
					</select> 姓名
					<input type="text" name="name" style="width: 6em"/>
					收据编号
					<input type="number" name="receiptNum" style="width: 6em"/>
				</tr>
				<tr>
					<!-- <td>查询结果</td> -->
					<th style="width: 70px">记录时间</th>
					<td> 开始时间
					<input type="text" class="date" style="width: 10ex" name="timeStart" readonly/>
					结束时间
					<input type="text" class="date" style="width: 10ex" name="timeEnd" readonly/>
					<input type="button" name="sqlFeeBtn" value="查 询" onclick="sqlFee()" />
					(提示：按时间为闭区间进行查询	)	 &nbsp;&nbsp;&nbsp;&nbsp; <a onclick='exportToCSV(this,"sqlFeeTable")' download="费用记录报表.csv" href="#">导出Excel</a></td>
				</tr>
			</table>
		</form>

		<!--  查询结果表 -->
		<table id="sqlFeeTable" align="center" width="4000px" border="0" cellpadding="0" cellspacing="0">

		</table>
		<!--  end查询结果表 -->
	</body>
</html>