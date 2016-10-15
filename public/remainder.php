<?php
header("Content-Type:text/html;charset=utf-8");
// 验证身份
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

// ajax查询该校区里的教师
if (isset($_GET['schoolZoneSQL'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from recordTeacherTable where schoolZone1=? or schoolZone2=? or schoolZone3=? or schoolZone4=? or schoolZone5=?");
	$sbmt -> execute(array($_GET['schoolZoneSQL'], $_GET['schoolZoneSQL'], $_GET['schoolZoneSQL'], $_GET['schoolZoneSQL'], $_GET['schoolZoneSQL']));

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

// ajax查询该班级设置中的班级名称
if (isset($_GET['sqlClassNameBySchoolZone'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select id,class from gradeSetTable where schoolZone=?");
	$sbmt -> execute(array($_GET['sqlClassNameBySchoolZone']));

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

// ajax查询该班级设置中的所有班级名称
if (isset($_GET['loadClassName'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from gradeSetTable");
	$sbmt -> execute(array());

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

// ajax查询该学生单价和上课时间
if (isset($_GET['sqlPriceByUid'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from subFeeTable where uid=?");
	$sbmt -> execute(array($_GET['sqlPriceByUid']));

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

// ajax按条件查询所有班级
if (isset($_GET['noValueA'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from gradeSetTable where schoolZone like ? and grade like ? and course like ? and product like ? and teacher like ? and class like ?");
	$sbmt -> execute(array($_GET['schoolZone'], $_GET['grade'], $_GET['course'], $_GET['product'], $_GET['teacher'], $_GET['class']));

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

// ajax 载入余额查询
if (isset($_GET['sqlRemainder'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	date_default_timezone_set('PRC');

	$startDate = strtotime($_GET['dateStart']);
	$endDate = strtotime($_GET['dateEnd']);

	// 先从学生表中查询部分条件的学生，然后再去交费表中查询该ID的学生的信息
	if ($_GET['courseID'] == "1") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course1Product like ? and course1ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}

	if ($_GET['courseID'] == "2") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course2Product like ? and course2ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}

	if ($_GET['courseID'] == "3") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course3Product like ? and course3ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}

	if ($_GET['courseID'] == "4") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course4Product like ? and course4ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}

	if ($_GET['courseID'] == "5") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course5Product like ? and course5ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}

	if ($_GET['courseID'] == "6") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course6Product like ? and course6ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}
	if ($_GET['courseID'] == "7") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course7Product like ? and course7ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}
	if ($_GET['courseID'] == "8") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course8Product like ? and course8ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}
	if ($_GET['courseID'] == "9") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course9Product like ? and course9ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}
	if ($_GET['courseID'] == "10") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and course10Product like ? and course10ClassIdInMLS like ? and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		//asc desc course1StateInGrade
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['classID'], $startDate, $endDate));
	}

	if ($_GET['courseID'] == "%") {
		$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) and grade like ? 
								and (course1Product like ? or course2Product like ? or course3Product like ? or course4Product like ? or course5Product like ? or course6Product like ? or course7Product like ? or course8Product like ? or course9Product like ? or course10Product like ?)
								and (course1ClassIdInMLS like ? or course2ClassIdInMLS like ? or course3ClassIdInMLS like ? or course4ClassIdInMLS like ? or course5ClassIdInMLS like ? or course6ClassIdInMLS like ? or course7ClassIdInMLS like ? or course8ClassIdInMLS like ? or course9ClassIdInMLS like ? or course10ClassIdInMLS like ?)
								and inTime >= ? and inTime <=? order by convert(name1 using gbk) asc");
		$sbmt -> execute(array($_GET['schoolZone'], $_GET['schoolZone'], $_GET['schoolZone'], $_GET['gradeID'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['classID'], $_GET['classID'], $_GET['classID'], $_GET['classID'], $_GET['classID'], $_GET['classID'], $_GET['classID'], $_GET['classID'], $_GET['classID'], $_GET['classID'], $startDate, $endDate));
	}

	$row = array();
	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {
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

// ajax 查询学生余额，ID这块与fee.php中处理不同，给的直接就是ID值，不用截取字符串
if (isset($_GET['sqlRemainFeeByStudentUID'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$str = $_GET['sqlRemainFeeByStudentUID'];
	//$uid = intval(substr($str, 1));
	$uid = $str;
	//substr($str, 1);// 这块是与fee.php中不同的地方

	$flagSubFeeCourse = $_GET['subFeeCourse'];

	if ($flagSubFeeCourse == "1") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course1),IFNULL(sum(course1),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "2") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course2),IFNULL(sum(course2),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "3") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course3),IFNULL(sum(course3),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "4") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course4),IFNULL(sum(course4),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "5") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course5),IFNULL(sum(course5),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "6") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course6),IFNULL(sum(course6),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "7") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course7),IFNULL(sum(course7),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	if ($flagSubFeeCourse == "8") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course8),IFNULL(sum(course8),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	if ($flagSubFeeCourse == "9") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course9),IFNULL(sum(course9),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	if ($flagSubFeeCourse == "10") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course10),IFNULL(sum(course10),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	$sbmt -> execute(array($uid, $uid, $flagSubFeeCourse));

	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		$data = json_encode($allRows);
		echo $data;
	} else {
		$allRows = "0";
		echo $allRows;
	}

	return;
}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>

		<title>余额提醒</title>
		<!-- 备注：去掉自定义的 table.css 后，表格就没有td的黑竖线了-->
		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/common.js"></script>
		<script src="../js/remainder.js"></script>

		<!--datetimepicker-->
		<link type="text/css"
		href="../jquery/jquery1.10.3/themes/base/jquery-ui.css"
		rel="stylesheet" />
		<link type="text/css"
		href="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.css" />
		<link type="text/css"
		href="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/demos.css" />
		<script type="text/javascript"
		src="../jquery/jquery1.10.3/jquery-1.9.1.js"></script>
		<script type="text/javascript"
		src="../jquery/jquery1.10.3/ui/minified/jquery-ui.min.js"></script>

		<script type="text/javascript"
		src="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.js"></script>

		<!--中文-->
		<script type="text/javascript" charset="gb2312"
		src="../jquery/jQuery-Timepicker-Addon/js/jquery.ui.datepicker-zh-CN.js.js"></script>
		<script type="text/javascript"
		src="../jquery/jQuery-Timepicker-Addon/js/jquery-ui-timepicker-zh-CN.js"></script>
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

				jQuery('.datetimeImage').datetimepicker({
					showOn : "button",
					buttonImage : "../jquery/jquery1.10.3/demos/images/calendar.gif",
					buttonImageOnly : true,
					closeText : '确定',
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

		<!-- 		添加表格样式 -->
		<script type="text/javascript">
			$(document).ready(function() {
				$("tr").mouseover(function() {
					$(this).css("background-color", "#e9eaec");
				});
				$("tr").mouseout(function() {
					$(this).css("background-color", "");
				});
				$("tr:odd").addClass("rowBgColorOdd");
				$("tr:even").addClass("rowBgColorEven");
			})
		</script>

		<style>
			body {
				font: 14px verdana, arial, sans-serif;
			}

			.btn {
				width: 6ex;
			}
		</style>
		<!--end datepicker -->

	</head>
	<body onload="initPage()">

		<table align="center" width="1300px" border="0" cellpadding="0" cellspacing="0">
			<caption align="center">
				<h3>余额提醒</h3>
			</caption>
			<tr>
				<th>查询条件</th>
				<td> 校区
				<select name="schoolZone"  onchange="loadPrincipalSetAndTeacher()">
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
				</select><span style="display: none"> 教师姓名
					<select name="teacher" >
						<option value="0">-请选择-</option>
					</select> </span> 班级名称
				<select name="class"  >
					<option value="0">-请选择-</option>
				</select> 余额状态
				<select name="feeState">
					<option value="9999">-请选择-</option>
					<option value="4" selected="selected" >不足4节课</option>
					<option value="3">不足3节课</option>
					<option value="2">不足2节课</option>
					<option value="1">不足1节课</option>
					<option value="0">已欠费</option>
				</select>
			</tr>

			<tr>
				<th>报名时间</th>
				<td> 开始时间
				<input type="text" class="date" name="startDate" style="width: 7em" readonly="true" />
				&nbsp;&nbsp;&nbsp;
				结束时间
				<input type="text" class="date" name="endDate" style="width: 7em" readonly />
				&nbsp; <!--periodYDY-->
				<input type="button" value="查 询" onclick="sqlRemainderInfo()" />
				</td>
			</tr>
		</table>

		<form action="grade.php" method="post">
			<table id="remainderTable" class="tablesorter" align="center" width="1300px" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td align="center">序号</td>
					<td align="center">校区1</td>
					<td align="center">校区2</td>
					<td align="center">校区3</td>
					<td align="center">负责人</td>
					<td align="center">年级</td>
					<td align="center">班级名称</td>
					<td align="center">学生ID</td>
					<td align="center">学生姓名1</td>
					<td align="center">学生姓名2</td>
					<td align="center">单价</td>
					<td align="center">剩余费用</td>
					<td align="center">剩余课节</td>
					<td align="center">上课状态</td>
				</tr>

			</table>
		</form>

	</body>
</html>
</html>