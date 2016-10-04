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

// ajax查询已经存在的班级名称，载入所有设立的班级名称，为提示用户不能输入已经存在的班级名称使用
if (isset($_GET['loadClassName'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select greadeSetResult from gradeSetTable");
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

// 查询
if (isset($_GET['schoolZoneSQLRecord'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}
	$result = "0";
	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from gradeSetTable where schoolZone = ?");
	$sbmt -> execute(array($_GET['schoolZoneSQLRecord']));

	$i = 0;
	$row = array();
	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {
		}

		// 查询内容到此为止，否则返回的是整个html
		$data = json_encode($allRows);

		echo $data;
	}
	/* else if ($sbmt -> rowCount() > 1) {
	 // 有多个记录
	 $result = "2";
	 echo $result;
	 } */
	else {
		$result = "0";
		echo $result;
	}

	return;
}

// 本页面提交
if (isset($_POST['submitType'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}
	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	date_default_timezone_set('PRC');
	$startTime = strtotime($_POST['startTime']);
	$endTime = strtotime($_POST['endTime']);

	if (isset($_POST['submitAdd'])) {
		$sbmt = $pdo -> prepare("insert into gradeSetTable (schoolZone,startTime,endTime,teacher,grade,course,product,class,greadeSetResult) values(?,?,?,?,?,?,?,?,?)");

		$flagSubOK = $sbmt -> execute(array($_POST['schoolZoneCopy'], $startTime, $endTime, $_POST['teacherCopy'], $_POST['gradeCopy'], $_POST['courseCopy'], $_POST['productCopy'], str_replace(' ', '', $_POST['className']), str_replace(' ', '', $_POST['greadeSetResult'])));

		if ($flagSubOK) {
			//echo "添加成功！";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=gradeSet.php>';
			echo "</head>";
			echo "<body>";
			echo "添加成功" . "</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="gradeSet.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>";
			return TRUE;
		} else {
			//echo "添加失败！";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=gradeSet.php>';
			echo "</head>";
			echo "<body>";
			echo "添加成功" . "</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="gradeSet.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>";
			return FALSE;
		}
	}

	if (isset($_POST['submitUpdate'])) {
		$sbmt = $pdo -> prepare("update gradeSetTable set schoolZone=?,startTime=?,endTime=?,teacher=?,grade=?,course=?,product=?,class=? where greadeSetResult = ?");
		$flagSubOK = $sbmt -> execute(array($_POST['schoolZoneCopy'], $startTime, $endTime, $_POST['teacherCopy'], $_POST['gradeCopy'], $_POST['courseCopy'], $_POST['productCopy'], str_replace(' ', '', $_POST['className']), str_replace(' ', '', $_POST['greadeSetResult'])));
		if ($flagSubOK) {
			//echo "修改成功！";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=gradeSet.php>';
			echo "</head>";
			echo "<body>";
			echo "修改成功" . "</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="gradeSet.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>";
			return TRUE;
		} else {
			//echo "修改失败！";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=gradeSet.php>';
			echo "</head>";
			echo "<body>";
			echo "修改成功" . "</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="gradeSet.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>";
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

		<title>班级设置</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/common.js"></script>
		<script src="../js/gradeSet.js"></script>
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

				$("#dateStart").datepicker({
					showOn : "button",
					buttonImage : "../jquery/jquery1.10.3/demos/images/calendar.gif",
					buttonImageOnly : true,
					closeText : '关闭',
					dateFormat : "yy-mm-dd"
				});
				$("#dateStop").datepicker({
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
		<table align="center" width="900" border="0" cellpadding="0"
		cellspacing="0">
			<caption align="center">
				<h3>班级设置 </h3>
			</caption>
			<form action="gradeSet.php" onsubmit="return checkGradeSetResult()" method="post">
				<tr>
					<th>校区</th>
					<td>
					<select name="schoolZone" style="width: 10em" onchange='loadPrincipalSetAndTeacher(1)'>
						<option value="0">--请选择--</option>
					</select>
					<input type="hidden" name="gradeIDCopy"/>
					<input type="hidden" name="schoolZoneCopy"/>
					<input type="button" name="previous" value="上一个" onclick="recordWithSameName('previous')" disabled="true"/>
					<input type="button" name="next" value="下一个" onclick="recordWithSameName('next')" disabled="true"/>
					</td>
					</td>
				</tr>
				<tr>
					<th>开班时间</th>
					<td>
					<input type="text" id="dateStart" name="startTime" size="13" readonly/>
					</td>
				</tr>

				<tr>
					<th>停班时间</th>
					<td>
					<input type="text" id="dateStop" name="endTime" size="13" readonly/>
					（提示：停班时才填写此项） </td>
				</tr>

				<tr>
					<th>教师</th>
					<td>
					<select class="inputText" style="width: 10em" name="teacher" onchange="loadTeacherProperty()">
						<option value="0">--请选择--</option>
					</select>
					<input type="hidden" name="teacherCopy"/>
					</td>
				</tr>

				<tr>
					<th>年级</th>
					<td><label for="grade7" name="gradeLabel">
						<input type="radio" name="grade" size="16" id="grade7" />
						初一</label><label for="grade8" name="gradeLabel">
						<input type="radio" name="grade" size="16" id="grade8" />
						初二</label><label for="grade9" name="gradeLabel">
						<input type="radio" name="grade" size="16" id="grade9" />
						初三</label><label for="grade10" name="gradeLabel">
						<input type="radio" name="grade" size="16" id="grade10" />
						高一</label><label for="grade11" name="gradeLabel">
						<input type="radio" name="grade" size="16" id="grade11" />
						高二</label><label for="grade12" name="gradeLabel">
						<input type="radio" name="grade" size="16" id="grade12" />
						高三</label>
					<input type="hidden" name="gradeCopy"/>
					</td>

				</tr>

				<tr>
					<th>科目</th>
					<td><label for="course1" name="courseLabel">
						<input type="radio" name="course" id="course1">
						科目1</label><label for="course2" name="courseLabel">
						<input	type="radio" name="course" id="course2">
						科目2</label><label for="course3" name="courseLabel">
						<input	type="radio" name="course" id="course3">
						科目3</label><label for="course4" name="courseLabel">
						<input	type="radio" name="course" id="course4">
						科目4</label><label for="course5" name="courseLabel">
						<input type="radio" name="course" id="course5">
						科目5</label><label for="course6" name="courseLabel">
						<input type="radio" name="course" id="course6">
						科目6</label><label for="course7" name="courseLabel">
						<input type="radio" name="course" id="course7">
						科目7</label><label for="course8" name="courseLabel">
						<input type="radio" name="course" id="course8">
						科目8</label><label for="course9" name="courseLabel">
						<input type="radio" name="course" id="course9">
						科目9</label><label for="course10" name="courseLabel">
						<input type="radio" name="course" id="course10">
						科目10</label>
					<input type="hidden" name="courseCopy"/>
					</td>
				</tr>

				<tr>
					<th>班级性质</th>
					<td><label for="product1" name="productLabel" >
						<input type="radio" name="courseType" id="product1">
						产品1</label><label for="product2" name="productLabel" >
						<input type="radio" name="courseType" id="product2">
						产品2</label><label for="product3" name="productLabel" >
						<input type="radio" name="courseType" id="product3">
						产品3</label><label for="product4" name="productLabel" >
						<input type="radio" name="courseType" id="product4">
						产品4</label><label for="product5" name="productLabel" >
						<input type="radio" name="courseType" id="product5">
						产品5</label>
					<input type="hidden" name="productCopy"/>
					</td>
				</tr>

				<tr>
					<th>班级名称</th>
					<td>
					<input type="text" class="inputText" name="className" size="16" value="" onblur="updateResult()" required="true" />
					（提示：填写完班级名称后，请将光标移走，核对“将要设立的班级”信息） </td>
				</tr>

				<tr>
					<th>将要设立的班级</th>
					<td>
					<input type="text" name="greadeSetResult" style="width: 40ex" value="年度＋校区＋年级＋科目＋教师＋班级名称" readonly="false" />
					&nbsp;&nbsp;<a href="../public/sqlGrade.php" target="_blank">查询已设立班级</a></td>
				</tr>

				<tr>
					<th></th>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td colspan="4" align="center">
					<input type="hidden"  class="btn" name="submitType" />
					<input type="button" class="btn" name="buttonSql" value="查询" onclick="sqlRecord()" />
					<input type="submit" class="btn" name="submitAdd" value="增加" onclick="checkGradeSet(this)" disabled="true" />
					<input type="submit" class="btn" name="submitUpdate" value="修改" onclick="checkGradeSet(this)" />
					<!--
					<input type="submit" class="btn" name="submitDelete" value="删除"  disabled/> -->
					<input type="reset" class="btn" name="reset" value="重置" />
					</td>
				</tr>
			</form>
		</table>
	</body>

</html>