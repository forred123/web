<?php
header("Content-Type:text/html;charset=utf-8");
// 验证身份
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

	$sbmt = $pdo -> prepare("select * from principalSetTable order by convert (schoolZone using gbk) asc");
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

	$sbmt = $pdo -> prepare("select * from gradeSetTable where schoolZone like ? and grade like ? and course like ? and product like ? and teacher like ? and class like ? and endTime like ? order by convert (schoolZone using gbk) asc,convert (grade using gbk) asc,convert (course using gbk) asc,convert (product using gbk) asc,convert (teacher using gbk) asc,convert (class using gbk) asc");
	$sbmt -> execute(array($_GET['schoolZone'], $_GET['grade'], $_GET['course'], $_GET['product'], $_GET['teacher'], $_GET['class'], ""));

	// $sbmt = $pdo -> prepare('select * from gradeSetTable where grade like ?');
	// $sbmt -> execute(array($_GET['grade']));

	// $sbmt = $pdo -> prepare('select * from gradeSetTable where schoolZone like ? and course like ? and product like ? and class like ?');
	// $sbmt -> execute(array($_GET['schoolZone'],$_GET['course'],$_GET['product'],$_GET['class']));

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

// ajax按条件查询所有交过费还未分班的学生
//if (isset($_GET['classIdInMLS'])) {
if (isset($_GET['stateInGrade'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	// 先从学生表中查询分班状态为未分班的学生的ID，然后再去交费表中查询该ID的学生的信息
	//$sbmt = $pdo -> prepare("select * from recordStudentTable where MathStateInGrade=? or ChineseStateInGrade=? or EnglishStateInGrade=? or PhysicsStateInGrade=? or ChemistryStateInGrade=?");
	//$sbmt -> execute(array("0","0","0","0","0"));
	if($_GET['schoolZone']!="%"){
		$schoolZone = $_GET['schoolZone']."_";
	}else{
		$schoolZone = "%";
	}
	
	$sbmt = $pdo -> prepare("select * from recordStudentTable where (MathStateInGrade=? or MathStateInGrade=? or ChineseStateInGrade=? or ChineseStateInGrade=? or EnglishStateInGrade=? or EnglishStateInGrade=? or PhysicsStateInGrade=? or PhysicsStateInGrade=? or ChemistryStateInGrade=? or ChemistryStateInGrade=?) and (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?) order by convert (name1 using gbk) asc");
	$sbmt -> execute(array("0", "4", "0", "4", "0", "4", "0", "4", "0", "4",$schoolZone,$schoolZone,$schoolZone));

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

// ajax按条件查询所有交过费还未分班的学生，，，之，然后再去交费表中查询该ID的学生的信息
// 退班后的学生也显示在此，待分班
if (isset($_GET['loadstudentDataInFeeTable'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	if ($_GET['operateCourse'] == "1") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where uid=? and MathProduct =? and grade = ? order by convert (name1 using gbk) asc");
		$sbmt -> execute(array($_GET['loadstudentDataInFeeTable'], $_GET["operateProduct"], $_GET["operateGrade"]));
	} else if ($_GET['operateCourse'] == "2") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where uid=? and ChineseProduct =? and grade = ? order by convert (name1 using gbk) asc");
		$sbmt -> execute(array($_GET['loadstudentDataInFeeTable'], $_GET["operateProduct"], $_GET["operateGrade"]));
	} else if ($_GET['operateCourse'] == "3") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where uid=? and EnglishProduct =? and grade = ? order by convert (name1 using gbk) asc");
		$sbmt -> execute(array($_GET['loadstudentDataInFeeTable'], $_GET["operateProduct"], $_GET["operateGrade"]));
	} else if ($_GET['operateCourse'] == "4") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where uid=? and PhysicsProduct =? and grade = ? order by convert (name1 using gbk) asc");
		$sbmt -> execute(array($_GET['loadstudentDataInFeeTable'], $_GET["operateProduct"], $_GET["operateGrade"]));
	} else if ($_GET['operateCourse'] == "5") {
		$sbmt = $pdo -> prepare("select * from addFeeTable where uid=? and ChemistryProduct =? and grade = ? order by convert (name1 using gbk) asc");
		$sbmt -> execute(array($_GET['loadstudentDataInFeeTable'], $_GET["operateProduct"], $_GET["operateGrade"]));
	} else {
		$sbmt = $pdo -> prepare("select * from addFeeTable where uid=? and (MathProduct !=? or ChineseProduct !=? or EnglishProduct !=? or PhysicsProduct !=? or ChemistryProduct !=?)");
		$sbmt -> execute(array($_GET['loadstudentDataInFeeTable'], "未选择", "未选择", "未选择", "未选择", "未选择"));
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

	$sbmt = $pdo -> prepare("select * from recordTeacherTable where schoolZone1=? or schoolZone2=? or schoolZone3=? or schoolZone4=? or schoolZone5=?  order by convert (name using gbk) asc");
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

	$sbmt = $pdo -> prepare("select class from gradeSetTable where schoolZone=? order by convert (teacher using gbk) asc");
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

// ajax提交表单入班
if (isset($_GET['submitGrade'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	if ($_GET['operateCourse'] == "1") {
		$sbmt = $pdo -> prepare("update recordStudentTable set MathClassIdInMLS=?, MathStateInGrade=? ,MathProduct=?,priceBK=?, hour1=?, priceHour1YDY=?,pay1=?, hour2=?, priceHour2YDY=?,pay2=?, Hour3=?, priceHour3YDY=?,pay3=? where uid=?");
	}
	if ($_GET['operateCourse'] == "2") {
		$sbmt = $pdo -> prepare("update recordStudentTable set ChineseClassIdInMLS=?, ChineseStateInGrade=? ,ChineseProduct=?,priceBK=?, hour1=?, priceHour1YDY=?,pay1=?, hour2=?, priceHour2YDY=?,pay2=?, Hour3=?, priceHour3YDY=?,pay3=?  where uid=?");
	}
	if ($_GET['operateCourse'] == "3") {
		$sbmt = $pdo -> prepare("update recordStudentTable set EnglishClassIdInMLS=?, EnglishStateInGrade=? ,EnglishProduct=?,priceBK=?, hour1=?, priceHour1YDY=?,pay1=?, hour2=?, priceHour2YDY=?,pay2=?, Hour3=?, priceHour3YDY=?,pay3=?  where uid=?");
	}
	if ($_GET['operateCourse'] == "4") {
		$sbmt = $pdo -> prepare("update recordStudentTable set PhysicsClassIdInMLS=?, PhysicsStateInGrade=? ,PhysicsProduct=?,priceBK=?, hour1=?, priceHour1YDY=?,pay1=?, hour2=?, priceHour2YDY=?,pay2=?, Hour3=?, priceHour3YDY=?,pay3=?  where uid=?");
	}
	if ($_GET['operateCourse'] == "5") {
		$sbmt = $pdo -> prepare("update recordStudentTable set ChemistryClassIdInMLS=?, ChemistryStateInGrade=? ,ChemistryProduct=?,priceBK=?, hour1=?, priceHour1YDY=?,pay1=?, hour2=?, priceHour2YDY=?,pay2=?, Hour3=?, priceHour3YDY=?,pay3=?  where uid=?");
	}

	$flag = $sbmt -> execute(array($_GET['operateGradeID'], $_GET['testType'], $_GET['productCopy'], str_replace(' ', '', $_GET['priceBKCopy']), str_replace(' ', '', $_GET['hour1Copy']), str_replace(' ', '', $_GET['priceHour1YDYCopy']), str_replace(' ', '', $_GET['pay1Copy']), str_replace(' ', '', $_GET['hour2Copy']), str_replace(' ', '', $_GET['priceHour2YDYCopy']), str_replace(' ', '', $_GET['pay2Copy']), str_replace(' ', '', $_GET['hour3Copy']), str_replace(' ', '', $_GET['priceHour3YDYCopy']), str_replace(' ', '', $_GET['pay3Copy']), $_GET['operateStudentID']));

	if ($flag) {
		echo "1";
		// 操作成功
		return TRUE;
	} else {
		echo "0";
		// 操作失败
		return FALSE;
	}

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

		<title>学生分班</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/common.js"></script>
		<script src="../js/grade.js"></script>
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

		<style>
			body {
				font: 16px Arial, "宋体";
			}

			.btn {
				width: 6ex;
			}

		</style>
		<!--end datepicker -->

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

		<!-- 排序表格 -->
		<!-- Demo styling -->
		<link href="../tableSorter/docs/css/jq.css" rel="stylesheet">

		<!-- jQuery: required (tablesorter works with jQuery 1.2.3+) -->
		<!-- <script src="../tableSorter/docs/js/jquery-1.2.6.min.js"></script> -->

		<!-- Pick a theme, load the plugin & initialize plugin -->
		<link href="../tableSorter/dist/css/theme.default.min.css"
		rel="stylesheet">
		<script src="../tableSorter/dist/js/jquery.tablesorter.min.js"></script>
		<script src="../tableSorter/dist/js/jquery.tablesorter.widgets.min.js"></script>
		<script>
			$(function() {
				$('table').tablesorter({
					widgets : ['zebra', 'columns'],
					usNumberFormat : false,
					sortReset : true,
					sortRestart : true
				});
			});
		</script>
		<!-- end排序表格 -->

	</head>
	<body onload="initPage()">
		<table class="tablesorter111111111" align="center" width="90%" border="0"
		cellpadding="0" cellspacing="0">
			<caption align="center">
				<h3>学生分班</h3>
			</caption>
			<!-- <thead></thead> -->
			<!-- <tbody> -->
			<tr>
				<!-- <td>班级查询</td> -->
				<th>班级查询</th>
				<td>校区
				<select name="schoolZone"
				onchange="loadPrincipalSetAndTeacher()">
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
				</select> 教师姓名
				<select name="teacher" >
					<option value="0">-请选择-</option>
				</select> 班级名称
				<select name="class" >
					<option value="0">-请选择-</option>
				</select>
			</tr>
			<tr>
				<!-- <td>查询结果</td> -->
				<th>查询结果</th>
				<td colspan="7">
				<select name="gradeResult" style="width: 60ex" onchange="copyConditionToHidden()">
					<option value="0">-----------------------------------请选择---------------------------------</option>
				</select>
				<input type="button" name="sqlgradeInfo" value="查询班级" onclick="sqlClassInfo()" />
				</td>
			</tr>
			<!-- </tbody> -->
		</table>

		<form id="studentNotGradeForm" action="grade.php" method="post">

			<input type="hidden" name="priceBKCopy" />
			<input type="hidden" name="hour1Copy" />
			<input type="hidden" name="priceHour1YDYCopy" />
			<input type="hidden" name="pay1Copy" />
			<input type="hidden" name="hour2Copy" />
			<input type="hidden" name="priceHour2YDYCopy" />
			<input type="hidden" name="pay2Copy" />
			<input type="hidden" name="hour3Copy" />
			<input type="hidden" name="priceHour3YDYCopy" />
			<input type="hidden" name="pay3Copy" />
			<input type="hidden" name="testType" />
			<!--1为试听入班，2为直接入班 -->
			<input type="hidden" name="productCopy" />

			<table id="studentNotGradeTable" class="aaa111tablesorter11111" align="center" width="90%" border="0" cellpadding="0" cellspacing="0">

				<!-- <thead> -->
				<tr>
					<th>序号</th>
					<th>学生ID</th>
					<th>备选学生</th>
					<th>所报科目</th>
					<th>单价</th>
					<!-- <th>是否入班</th> -->
					<th>操作</th>

					<input type="hidden" name="operateStudentID" />
					<input type="hidden" name="operateGradeID" />
					<input type="hidden" name="operateCourse" />
					<input type="hidden" name="operateGrade" />
					<!-- <input type="hidden" name="operateSchoolZone" /> -->
				</tr>
				<!-- </thead>
				<tbody> -->

				<!--
				<tr>
				<td name="test">学生ID</td>

				<td>学生姓名</td>

				<td>
				<input type="number" style="width: 6em" name="price" value="" />
				</td>
				<td><label for="inGrade">
				<input type="checkbox" id="inGrade"
				name="GradeOperate" />
				入班 </label></td>
				<td>
				<input type="submit" class="btn" name="submitaa" value="提交">
				</td>
				</tr>

				-->

				<!--
				<tr>
				<td colspan="5">&nbsp;</td>
				</tr>
				-->
				<!-- </tbody> -->

			</table>
		</form>
	</body>
</html>
