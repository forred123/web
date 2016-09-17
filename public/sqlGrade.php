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
if (isset($_GET['sqlGrade'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	
	date_default_timezone_set('PRC');
	if($_GET['startTime']==""){
		$timeStart = strtotime("2010-01-01");
	}else{
		$timeStart = strtotime($_GET['startTime']);
	}
	if($_GET['endTime']==""){
		$timeEnd = strtotime(date("Y-m-d"));
	}else{
		$timeEnd = strtotime($_GET['endTime']) + 24*3600-1;
	}
	
	$sbmt = $pdo -> prepare("select * from gradeSetTable where startTime >= ? and startTime <= ? and schoolZone like ? and grade like ? and course like ? and product like ? and teacher like ? and class like ? order by convert (schoolZone using gbk) asc,convert (grade using gbk) asc,convert (course using gbk) asc,convert (product using gbk) asc,convert (teacher using gbk) asc,convert (class using gbk) asc");
	$sbmt -> execute(array($timeStart,$timeEnd, $_GET['schoolZone'], $_GET['grade'], $_GET['course'], $_GET['product'], $_GET['teacher'], $_GET['class']));

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

?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>
		
		<title>班级查询</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/common.js"></script>
		<script src="../js/sqlGrade.js"></script>
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

	</head>
	<body onload="initPage()">
		<table class="tablesorter111111111" align="center" width="90%" border="0"
		cellpadding="0" cellspacing="0">
			<caption align="center">
				<h3>班级查询</h3>
			</caption>
			<tr>
				<th>查询条件</th>
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
				<th style="width: 70px">开班时间</th>
				<td>
				开始时间
				<input type="text" class="date" style="width: 10ex" name="timeStart" readonly/>
				结束时间
				<input type="text" class="date" style="width: 10ex" name="timeEnd" readonly/>
				<input type="button" name="sqlgradeInfo" value="查 询" onclick="sqlClassInfo()" />				
				(提示：按时间为闭区间进行查询	)		
				</td>
			</tr>
		</table>

		<form id="sqlGradeForm" action="sqlGrade.php" method="post">
			<table id="sqlGradeTable" align="center" width="90%" border="0" cellpadding="0" cellspacing="0">
	
			</table>
		</form>
	</body>
</html>
