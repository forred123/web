<?php
header("Content-Type:text/html;charset=utf-8");

include 'verifyID.php';
/*
 if (!(isset($_COOKIE['isLogin'])) || ($_COOKIE['isLogin'] == 0)) {
 echo "请登录系统先！";
 echo '<script>setTimeout(\'location="../index.php"\',2000)</script>';
 }
 */

// ajax查询产出
if (isset($_GET['sqlOut'])) {
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

	// 完好的，只是查询结果不带or后面的内容，行为是查询满足条件的学生，包括正常扣费的学生和试听的学生，没有考滤到试听成功后学生扣费产生的教师工资问题
	// 条件是"上课考勤的时间"在开始时间和结束时间之内，还有别的条件。。。
	//$sbmt = $pdo -> prepare("select * from subFeeTable where attandenceTime>=? and attandenceTime<=? and schoolZone like ? and grade like ? and subFeeCourse like ? and product like ? and teacher like ? and classInMLS like ? order by attandenceTime desc");
	//$sbmt -> execute(array($timeStart,$timeEnd,$_GET['schoolZone'],$_GET['grade'],$_GET['course'],$_GET['product'],$_GET['teacher'],$_GET['classInMLS']));

	// 完好的，在上面的基础上多加了一个or条件，行为是在上面条件查询的基础上，考滤到试听成功后学生扣费产生的教师工资问题，
	// 即当有试听成功的学生时，增加查询试听成功的学生，条件是“确定试听成功testResultTime的时间"在筛选的开始时间和结束时间之内
	$sbmt = $pdo -> prepare("select * from subFeeTable where (attandenceTime>=? and attandenceTime<=? and schoolZone like ? and grade like ? and subFeeCourse like ? and product like ? and teacher like ? and classInMLS like ? and attendance like ?) or(schoolZone like ? and grade like ? and subFeeCourse like ? and product like ? and teacher like ? and classInMLS like ? and testResultTime>=? and testResultTime<=? and priceState like ? and attendance like ?) order by attandenceTime desc,convert(name1 using gbk) asc");
	$sbmt -> execute(array($timeStart, $timeEnd, $_GET['schoolZone'], $_GET['grade'], $_GET['course'], $_GET['product'], $_GET['teacher'], $_GET['classInMLS'], "出勤", $_GET['schoolZone'], $_GET['grade'], $_GET['course'], $_GET['product'], $_GET['teacher'], $_GET['classInMLS'], $timeStart, $timeEnd, "1", "出勤"));

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

	$sbmt = $pdo -> prepare("select id, class from gradeSetTable where schoolZone=?");
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
		<meta http-equiv="Content-Type" content="text/html charset=utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>
		
		<title>产出查询</title>
		
		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/output.js"></script>
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
		<form action="output.php" method="post">
			<table align="center" width="1250px" border="0" cellpadding="0" cellspacing="0">
			<caption align="center">
				<h3>产出查询</h3>
			</caption>
			<tr>
				<th>查询条件</th>
				<td>				
				校区
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
				<th>查询时间</th>
				<td>
				开始时间
				<input type="text" class="date" style="width: 10ex" name="timeStart" readonly/>
				结束时间
				<input type="text" class="date" style="width: 10ex" name="timeEnd" readonly/>
				<input type="button" name="sqlgradeInfo" value="查 询" onclick="sqlOut()" />				
				(提示：按时间为闭区间进行查询	)						
				</td>
			</tr>
		</table>
		</form>

		<!--  查询结果表 -->
		<table id="sqlOutTable" align="center" width="1250px" border="0" cellpadding="0" cellspacing="0">
	

		</table>
		<!--  end查询结果表 -->
	</body>
</html>
