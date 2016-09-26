<?php
header("Content-Type:text/html;charset=utf-8");
// 验证身份
include 'verifyIDAdmin.php';

// ajax查询校长设置,用于初始化
if (isset($_GET['school1'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select schoolZone from principalSetTable");
	$sbmt -> execute();

	$result = "2";

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

// 本页面内的查询
if (isset($_GET['userName1'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}
	$result = "0";
	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from recordStudentTable where name1 = ? or name2=?");
	$sbmt -> execute(array($_GET['userName1'],$_GET['userName1']));


	$row = array();
	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {

		}

		// 查询内容到此为止，否则返回的是整个html
		$data = json_encode($allRows);
		echo $data;
	} 
	/*
	else if ($sbmt -> rowCount() > 1) {
		// 有多个记录
		$result = "2";
		echo $result;
	}*/
	 else {
		// 没有记录
		$result = "0";
		echo $result;
	}

	return;
}

// 提交
if (isset($_POST['submitType'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}
	
	date_default_timezone_set('PRC');
	
	$inTime = strtotime($_POST['inTime']);
	
	if($_POST['outTime']==""){
		$outTime="";
	}else{
		$outTime = strtotime($_POST['outTime']);
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	if (isset($_POST['submitAdd'])) {
		$sbmt = $pdo -> prepare("insert into recordStudentTable (name1,name2,sex,passWD,schoolZone1,schoolZone2,schoolZone3,school1,school2,grade,class,
	studentWX,studentQQ,studentTel,	motherTel,motherWX,fatherTel,fatherWX,address,inTime,outTime) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$flag = $sbmt -> execute(array(str_replace(' ', '', $_POST['userName1']), str_replace(' ', '', $_POST['userName2']), $_POST['sex'], str_replace(' ', '', $_POST['password']), $_POST['schoolZone1Copy'], $_POST['schoolZone2Copy'], $_POST['schoolZone3Copy'], $_POST['school1'], $_POST['school2'], $_POST['grade'], $_POST['class'], $_POST['studentWX'], $_POST['studentQQ'], $_POST['studentTel'], $_POST['motherTel'], $_POST['motherWX'], $_POST['fatherTel'], $_POST['fatherWX'], $_POST['address'], $inTime, $outTime));

		if ($flag) {
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=recordStudent.php>';
			echo "</head>";
			echo "<body>";
			echo "添加成功"."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="recordStudent.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return TRUE;
		} else {
			echo "添加失败";
			return FALSE;
		}
	}

	$temp = $_POST['userID'];
	$uid = substr($temp, 1);
	
	if (isset($_POST['submitUpdate'])) {
		if($outTime!=""){
			// 退学 
			$sbmt = $pdo -> prepare("update recordStudentTable set name1=?,name2=?,sex=?,passWD=?,schoolZone1=?,schoolZone2=?,schoolZone3=?,school1=?,school2=?,grade=?,class=?,
					studentWX=?,studentQQ=?,studentTel=?,motherTel=?,motherWX=?,fatherTel=?,fatherWX=?,address=?,inTime=?,outTime=?,
					MathStateInGrade=?,ChineseStateInGrade=?,EnglishStateInGrade=?,PhysicsStateInGrade=?,ChemistryStateInGrade=?
					where name1=? and uid=?");
			$flag = $sbmt -> execute(array(str_replace(' ', '', $_POST['userName1']), str_replace(' ', '', $_POST['userName2']), $_POST['sex'], str_replace(' ', '', $_POST['password']), $_POST['schoolZone1Copy'], $_POST['schoolZone2Copy'], $_POST['schoolZone3Copy'], 
					$_POST['school1'], $_POST['school2'], $_POST['grade'], $_POST['class'], $_POST['studentWX'], $_POST['studentQQ'], $_POST['studentTel'], $_POST['motherTel'], $_POST['motherWX'], $_POST['fatherTel'], $_POST['fatherWX'], $_POST['address'], $inTime, $outTime, 
					"5","5","5","5","5",
					str_replace(' ', '', $_POST['userName1']),$uid));
		}else{
			// 非退学的修改学生档案 
			$sbmt = $pdo -> prepare("update recordStudentTable set name1=?,name2=?,sex=?,schoolZone1=?,schoolZone2=?,schoolZone3=?,school1=?,school2=?,grade=?,class=?,
					studentWX=?,studentQQ=?,studentTel=?,motherTel=?,motherWX=?,fatherTel=?,fatherWX=?,address=?,inTime=?,outTime=? where name1=? and uid=?");
			$flag = $sbmt -> execute(array(str_replace(' ', '', $_POST['userName1']), str_replace(' ', '', $_POST['userName2']), $_POST['sex'], $_POST['schoolZone1Copy'], $_POST['schoolZone2Copy'], $_POST['schoolZone3Copy'], $_POST['school1'], $_POST['school2'], $_POST['grade'], $_POST['class'], $_POST['studentWX'], $_POST['studentQQ'], $_POST['studentTel'], $_POST['motherTel'], $_POST['motherWX'], $_POST['fatherTel'], $_POST['fatherWX'], $_POST['address'], $inTime, $outTime, str_replace(' ', '', $_POST['userName1']),$uid));
		}
		if ($flag) {
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=recordStudent.php>';
			echo "</head>";
			echo "<body>";
			echo "修改成功"."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="recordStudent.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return TRUE;
		} else {
			echo "修改失败";
			return FALSE;
		}
	}
	
	if (isset($_POST['submitDelete'])) {
		$sbmt = $pdo -> prepare("delete from recordStudentTable where name1 = ? and uid=?");
		$flag = $sbmt -> execute(array($_POST['userName1'],$uid));

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
		
		<title>学生档案</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/common.js"></script>
		<script src="../js/recordStudent.js"></script>

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

			.btn {
				width: 6ex;
			}
			
		</style>
		<!--end datepicker -->

	</head>

	<!-- 载入页面后，根据校长设置载入校长设置 -->
	<body onload=initPage()>
		<!--	<body>-->
		<table align="center" width="900" border="0" cellpadding="0"
		cellspacing="0">
			<caption align="center">
				<h3>学生档案</h3>
			</caption>
			<form onsubmit="return checkAndSubmit()" action="recordStudent.php" method="post">
				<tr>
					<th>学生ID：</th>
					<td>
					<input type="text" name="userID" size="18" readonly />
					(保留，不填写)</td>
				</tr>

				<tr>
					<th>姓 名1：</th>
					<td>
					<input type="text" name="userName1" size="18" onblur="sqlRecord()" required="true"/>
					<input type="button" name="previous" value="上一个" onclick="recordWithSameName('previous')" disabled="true"/>
					<input type="button" name="next" value="下一个" onclick="recordWithSameName('next')" disabled="true"/>
					</td>
				</tr>

				<tr>
					<th>姓 名2：</th>
					<td>
					<input type="text" name="userName2" size="18"/>
					</td>
				</tr>

				<tr>
					<th>性 别：</th>
					<td>
					<select name="sex" style="width: 170px">
						<option value="0">--请选择--</option>
						<option value="1">男</option>
						<option value="2">女</option>
					</select></td>
				</tr>
				
				<tr>
					<th>登录密码：</th>
					<td>
					<input type="password" name="password" size="18" value="hhxx" required="true" />
					</td>
				</tr>

				<tr>
					<th>校 区1：</th>
					<td>
					<select name="schoolZone1" style="width: 170px" onchange="getSchoolZone(1)" >
						<option value="0">--请选择--</option>
						<!-- 						<option value="1">太阳城校区</option> -->
						<!-- 						<option value="2">河北校区</option> -->
						<!-- 						<option value="3">东丽校区</option> -->
					</select>
					<input type="hidden" name="schoolZone1Copy" />
					</td>
				</tr>

				<tr>
					<th>校 区2：</th>
					<td>
					<select name="schoolZone2" style="width: 170px" onchange="getSchoolZone(2)">
						<option value="0">--请选择--</option>
						<!-- 					<option value="1">太阳城校区</option> -->
						<!-- 					<option value="2">河北校区</option> -->
						<!-- 					<option value="3">东丽校区</option> -->
					</select>(提示：校长填写)
					<input type="hidden" name="schoolZone2Copy" />
					</td>
				</tr>

				<tr>
					<th>校 区3：</th>
					<td>
					<select name="schoolZone3" style="width: 170px" onchange="getSchoolZone(3)">
						<option value="0">--请选择--</option>
						<!-- 					<option value="1">太阳城校区</option> -->
						<!-- 					<option value="2">河北校区</option> -->
						<!-- 					<option value="3">东丽校区</option> -->
					</select>(提示：校长填写)
					<input type="hidden" name="schoolZone3Copy" />
					</td>
				</tr>

				<tr>
					<th>学 校1：</th>
					<td>
					<input type="text" name="school1" size="18" />
					</td>
				</tr>

				<tr>
					<th>学 校2：</th>
					<td>
					<input type="text" name="school2" size="18" />
					</td>
				</tr>

				<tr>
					<th>年 级：</th>
					<td>
					<select name="grade" style="width: 160px">
						<option value="0">--请选择--</option>
						<option value="7">初一</option>
						<option value="8">初二</option>
						<option value="9">初三</option>
						<option value="10">高一</option>
						<option value="11">高二</option>
						<option value="12">高三</option>
						<option value="13">大学</option>
					</select>
					（提示：大于高三的学生显示为大学。）
					</td>
				</tr>

				<tr>
					<th>班 级：</th>
					<td>
					<input type="text" name="class" size="18" />
					</td>
				</tr>

				<tr>
					<th>学生微信：</th>
					<td>
					<input type="text" name="studentWX" size="18" />
					</td>
				</tr>

				<tr>
					<th>学生QQ：</th>
					<td>
					<input type="text" name="studentQQ" size="18" />
					</td>
				</tr>

				<tr>
					<th>学生电话：</th>
					<td>
					<input type="text" name="studentTel" size="18" />
					</td>
				</tr>

				<tr>
					<th>妈妈电话：</th>
					<td>
					<input type="text" name="motherTel" size="18" />
					</td>
				</tr>

				<tr>
					<th>妈妈微信：</th>
					<td>
					<input type="text" name="motherWX" size="18" />
					</td>
				</tr>

				<tr>
					<th>爸爸电话：</th>
					<td>
					<input type="text" name="fatherTel" size="18" />
					</td>
				</tr>

				<tr>
					<th>爸爸微信：</th>
					<td>
					<input type="text" name="fatherWX" size="18" />
					</td>
				</tr>

				<tr>
					<th>家庭地址：</th>
					<td>
					<input type="text" name="address" size="18" />
					</td>
				</tr>

				<tr>
					<th>报名时间：</th>
					<td>
					<input type="text" class="date" size="18" name="inTime"
					readonly="true" />
					</td>
				</tr>
				<tr>
					<th>退学时间：</th>
					<td>
					<input type="text" class="date" size="18" name="outTime"
					readonly="true" /> &nbsp;&nbsp;
					<input type="button" value="清空当前退学时间" onclick="clearOutTime()" />
					</td>
				</tr>
				<tr>
					<th style="width: 180px"></th>
					<td>
					(提示：填写退学时间提交后，会退掉该学生所有班级！)</td>
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