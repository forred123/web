<?php
header("Content-Type:text/html;charset=utf-8");
// 验证身份
include 'verifyIDAdmin.php';

// 上传照片
$url = "";
if (isset($_FILES["fileName"])) {
	if ((($_FILES["fileName"]["type"] == "image/jpeg") || ($_FILES["fileName"]["type"] == "image/pjpeg") || ($_FILES["fileName"]["type"] == "image/png"))) {
		if ($_FILES["fileName"]["size"] < 10000000) {
			if ($_FILES["fileName"]["error"] > 0) {
				echo("Error:" . $_FILES["fileName"]["error"] . "</br>");
			} else {
				/*
				 * echo "Upload:" . $_FILES ["fileName"] ["name"] . "</br>";
				 * echo "Stored in:" . $_FILES ["fileName"] ["tmp_name"] . "<br>";
				 */
				//echo $_FILES ["fileName"] ["tmp_name"] . $_FILES["fileName"]["name"];
				//move_uploaded_file($_FILES["fileName"]["tmp_name"], "../uploadImg/" . $_FILES["fileName"]["name"]);
				/* echo "Stored in:" . "../uploadImg/" . $_FILES ["fileName"] ["name"]; */
				//move_uploaded_file($_FILES["fileName"]["tmp_name"], "../uploadImg/" . $_FILES["fileName"]["name"]);
				//$url = "../uploadImg/" . $_FILES["fileName"]["name"];

				$oldName = $_FILES["fileName"]["tmp_name"] . "/" . $_FILES["fileName"]["name"];
				date_default_timezone_set("PRC");
				// 日期＋时间＋截取的后缀名
				//$newName = "../uploadImg/" . date("YmdHis", time()) . substr($oldName, -4, 4);
				// 上传头像时重命名为tmp.jpg ，在增加教师时，把tmp.jpg重命名为教师姓名.jpg
				// 支持把任何后缀名改为tmp.jpg
				$newName = "../uploadImg/tmp.jpg";

				// 移动并改名
				move_uploaded_file($_FILES["fileName"]["tmp_name"], "../uploadImg/" . $newName);

				$url = $newName;

				$effictivTime = time() + 1.0 * 60 * 60;

				setcookie("imgUrl", $url, $effictivTime, "/");
			}
		} else {
			echo "照片文件应小于3M。";
		}
	}
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

// 查询
if (isset($_GET['userName'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}
	$result = "0";
	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from recordTeacherTable where name = ?");
	$sbmt -> execute(array($_GET['userName']));

	// 	echo ("123");
	// 	$url = $_COOKIE['imgUrl'];
	// 	echo $url;

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

// 本页面提交
if (isset($_POST['submitType'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	//$url = $_COOKIE['imgUrl'];

	$schoolZone[0] = "";
	$schoolZone[1] = "";
	$schoolZone[2] = "";
	$schoolZone[3] = "";
	$schoolZone[4] = "";

	if (isset($_POST['schoolZone1copy'])) {
		$schoolZone[0] = $_POST['schoolZone1copy'];
	}
	if (isset($_POST['schoolZone2copy'])) {
		$schoolZone[1] = $_POST['schoolZone2copy'];
	}
	if (isset($_POST['schoolZone3copy'])) {
		$schoolZone[2] = $_POST['schoolZone3copy'];
	}
	if (isset($_POST['schoolZone4copy'])) {
		$schoolZone[3] = $_POST['schoolZone4copy'];
	}
	if (isset($_POST['schoolZone5copy'])) {
		$schoolZone[4] = $_POST['schoolZone5copy'];
	}

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

	if (isset($_POST['course1copy'])) {
		$course[0] = $_POST['course1copy'];
	}
	if (isset($_POST['course2copy'])) {
		$course[1] = $_POST['course2copy'];
	}
	if (isset($_POST['course3copy'])) {
		$course[2] = $_POST['course3copy'];
	}
	if (isset($_POST['course4copy'])) {
		$course[3] = $_POST['course4copy'];
	}
	if (isset($_POST['course5copy'])) {
		$course[4] = $_POST['course5copy'];
	}
	if (isset($_POST['course6copy'])) {
		$course[5] = $_POST['course6copy'];
	}
	if (isset($_POST['course7copy'])) {
		$course[6] = $_POST['course7copy'];
	}
	if (isset($_POST['course8copy'])) {
		$course[7] = $_POST['course8copy'];
	}
	if (isset($_POST['course9copy'])) {
		$course[8] = $_POST['course9copy'];
	}
	if (isset($_POST['course10copy'])) {
		$course[9] = $_POST['course10copy'];
	}

	// print_r($course);
	$grade[0] = "";
	$grade[1] = "";
	$grade[2] = "";
	$grade[3] = "";
	$grade[4] = "";
	$grade[5] = "";

	if (isset($_POST['grade7copy'])) {
		$grade[0] = $_POST['grade7copy'];
	}
	if (isset($_POST['grade8copy'])) {
		$grade[1] = $_POST['grade8copy'];
	}
	if (isset($_POST['grade9copy'])) {
		$grade[2] = $_POST['grade9copy'];
	}
	if (isset($_POST['grade10copy'])) {
		$grade[3] = $_POST['grade10copy'];
	}
	if (isset($_POST['grade11copy'])) {
		$grade[4] = $_POST['grade11copy'];
	}
	if (isset($_POST['grade12copy'])) {
		$grade[5] = $_POST['grade12copy'];
	}

	$product[0] = "";
	$product[1] = "";
	$product[2] = "";
	$product[3] = "";
	$product[4] = "";

	if (isset($_POST['product1copy'])) {
		$product[0] = $_POST['product1copy'];
	}
	if (isset($_POST['product2copy'])) {
		$product[1] = $_POST['product2copy'];
	}
	if (isset($_POST['product3copy'])) {
		$product[2] = $_POST['product3copy'];
	}
	if (isset($_POST['product4copy'])) {
		$product[3] = $_POST['product4copy'];
	}
	if (isset($_POST['product5copy'])) {
		$product[4] = $_POST['product5copy'];
	}

	date_default_timezone_set('PRC');
	$inTime = strtotime($_POST['inTime']);
	$outTime = strtotime($_POST['outTime']);

	// 权限
	if($_POST['role']=="0"){
		$role = 1;
	}else if($_POST['role']=="1"){
		$role = 8;
	}
	
	
	$strtmp = "";
	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	if (isset($_POST['submitAdd'])) {
		$sbmt = $pdo -> prepare("insert into recordTeacherTable (name,sex,passWD,imgUrl,schoolZone1,schoolZone2,schoolZone3,schoolZone4,schoolZone5,bankCardNumber,
					bank,bankCardUser,requireConditon, product1,product2,product3,product4,product5,
					course1,course2,course3,course4,course5,course6,course7,course8,course9,course10,grade7,grade8,grade9,grade10,grade11,grade12,	
					school,	teacherWX,teacherQQ,teacherTel,teacherEmail,address,idCardNum,workCondition,
					workTime,inTime,outTime,role) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$flag = $sbmt -> execute(array(str_replace(' ', '', $_POST['userName']), $_POST['sex'],str_replace(' ', '', $_POST['password']), $url, $schoolZone[0], $schoolZone[1], $schoolZone[2], $schoolZone[3], $schoolZone[4], str_replace(' ', '', $_POST['bankCardNumber']), str_replace(' ', '', $_POST['bank']), str_replace(' ', '', $_POST['bankCardUser']), str_replace(' ', '', $_POST['requireCondition']), $product[0], $product[1], $product[2], $product[3], $product[4], $course[0], $course[1], $course[2], $course[3], $course[4], $course[5],$course[6],$course[7],$course[8],$course[9],$grade[0], $grade[1], $grade[2], $grade[3], $grade[4], $grade[5], str_replace(' ', '', $_POST['school']), str_replace(' ', '', $_POST['teacherWX']), str_replace(' ', '', $_POST['teacherQQ']), str_replace(' ', '', $_POST['teacherTel']), str_replace(' ', '', $_POST['teacherEmail']), str_replace(' ', '', $_POST['address']), str_replace(' ', '', $_POST['idCardNum']), $_POST['workCondition'], $_POST['workTime'], $inTime, $outTime, $role));

		// 修改头像姓名
		if(file_exists('../uploadImg/tmp.jpg')){
			$flagRename = rename( '../uploadImg/tmp.jpg', '../uploadImg/'. str_replace(' ', '', $_POST['userName']) . '.jpg' ); 
		}else{
			$flagRename = false;
		}
		
		if ($flag) {
			if($flagRename){
				$strtmp = "教师信息添加成功!</br>教师头像添加成功！";
			}else{
				$strtmp = "教师信息添加成功!</br>教师头像添加失败,原因是没有上传教师头像！";
			}		
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=recordTeacher.php>';
			echo "</head>";
			echo "<body>";
			echo $strtmp."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="recordTeacher.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 	
			return TRUE;
		} else {
			$strtmp = "添加失败";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=recordTeacher.php>';
			echo "</head>";
			echo "<body>";
			echo $strtmp."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="recordTeacher.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return FALSE;
		}
	}
	if (isset($_POST['submitUpdate'])) {
		$sbmt = $pdo -> prepare("update recordTeacherTable set  name=?,sex=?,passWD=?,imgUrl=?,schoolZone1=?,schoolZone2=?,schoolZone3=?,schoolZone4=?,schoolZone5=?,bankCardNumber=?,
					bank=?,bankCardUser=?,requireConditon=?, product1=?,product2=?,product3=?,product4=?,product5=?,
					course1=?,course2=?,course3=?,course4=?,course5=?,course6=?,course7=?,course8=?,course9=?,course10=?,grade7=?,grade8=?,grade9=?,grade10=?,grade11=?,grade12=?,	
					school=?,	teacherWX=?,teacherQQ=?,teacherTel=?,teacherEmail=?,address=?,idCardNum=?,workCondition=?,
					workTime=?,inTime=?,outTime=?,role=? where name=?");
		$flag = $sbmt -> execute(array(str_replace(' ', '', $_POST['userName']), $_POST['sex'], str_replace(' ', '', $_POST['password']), $url, $schoolZone[0], $schoolZone[1], $schoolZone[2], $schoolZone[3], $schoolZone[4], str_replace(' ', '', $_POST['bankCardNumber']), str_replace(' ', '', $_POST['bank']), str_replace(' ', '', $_POST['bankCardUser']), str_replace(' ', '', $_POST['requireCondition']), $product[0], $product[1], $product[2], $product[3], $product[4], $course[0], $course[1], $course[2], $course[3], $course[4], $course[5], $course[6], $course[7], $course[8], $course[9], $grade[0], $grade[1], $grade[2], $grade[3], $grade[4], $grade[5], str_replace(' ', '', $_POST['school']), str_replace(' ', '', $_POST['teacherWX']), str_replace(' ', '', $_POST['teacherQQ']), str_replace(' ', '', $_POST['teacherTel']), str_replace(' ', '', $_POST['teacherEmail']), str_replace(' ', '', $_POST['address']), str_replace(' ', '', $_POST['idCardNum']), $_POST['workCondition'], $_POST['workTime'], $inTime, $outTime,$role, str_replace(' ', '', $_POST['userName'])));

		// 修改头像姓名
		if(file_exists('../uploadImg/tmp.jpg')){
			$flagRename = rename( '../uploadImg/tmp.jpg', '../uploadImg/'. str_replace(' ', '', $_POST['userName']) . '.jpg' ); 
		}else{
			$flagRename = false;
		}
		
		if ($flag) {
			if($flagRename){
				$strtmp = "教师信息修改成功!</br>教师头像修改成功！";
			}else{
				$strtmp = "教师信息修改成功!</br>教师头像修改失败,原因是没有上传新的教师头像！即使用教师原来头像！";
			}	
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=recordTeacher.php>';
			echo "</head>";
			echo "<body>";
			echo $strtmp."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="recordTeacher.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return TRUE;
		} else {
			$strtmp = "修改失败";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=recordTeacher.php>';
			echo "</head>";
			echo "<body>";
			echo $strtmp."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="recordTeacher.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return FALSE;
		}
	}

	if (isset($_POST['submitDelete'])) {
		$str = $_POST['userID'];
		$uid = substr($str, 1);
		
		$sbmt = $pdo -> prepare("delete * from recordTeacherTable where uid = ?");
		$flag = $sbmt -> execute(array($uid));

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
		
		<title>教师档案</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/common.js"></script>
		<script src="../js/recordTeacher.js"></script>

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
		<table align="center" width="900" border="0" cellpadding="0"
		cellspacing="0">
			<caption align="center">
				<h3>教师档案</h3>
			</caption>
			<tr>
				<th>本人或身份证照片</th>
				<td colspan="2">
				<form id="myform" name="myform" action="recordTeacher.php"
				method="post" enctype="multipart/form-data">
					<input type="file" id="Img" name="fileName" onchange="submitImg()" />
					(提示：此项为即时提交)
				</form></td>
			</tr>
			
			<form name="form1" action="recordTeacher.php" method="post">
				<tr>
					<th>教师ID：</th>
					<td>
					<input type="text" name="userID" size="18" style="height: 20px" readonly />
					(保留，不填写)</td>
					<td id="Img0" rowspan="5" width="150px">
						<img id="Img" alt="照片 (小于3M) ＊.png *.jpg *.jpeg 150px*200px " src='<?php echo $url ?>' width="150px" height="200px" /> 
					<br>
					</td>
				</tr>

				<tr>
					<th>姓 名：</th>
					<td>
					<input type="text" name="userName" size="18" onblur="sqlRecord()" required="true" />(查询关键字)
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
					<input type="password" name="password" size="18" value="mlsfdb" required="true" />
					</td>
				</tr>
				
				<tr>
					<th>角色：</th>
					<td>
						<select name="role" style="width: 170px" onchange="checkPrinciple()">
							<option value="0">授课教师</option>
							<option value="1">校区负责人</option>
						</select>
					</td>
				</tr>

				<tr>
					<th>校 区：</th>
					<td colspan="2"><label name="schoolZoneLabel" for="schoolZone1">
						<input
						type="checkbox" name="schoolZone[]" id="schoolZone1">
						校区1 </label>
					<input type="hidden" name=schoolZone1copy value="" />
					<label name="schoolZoneLabel" for="schoolZone2">
						<input
						type="checkbox" name="schoolZone[]" id="schoolZone2">
						校区2 </label>
					<input type="hidden" name=schoolZone2copy value="" />
					<label name="schoolZoneLabel" for="schoolZone3">
						<input
						type="checkbox" name="schoolZone[]" id="schoolZone3">
						校区3 </label>
					<input type="hidden" name=schoolZone3copy value="" />
					<label name="schoolZoneLabel" for="schoolZone4">
						<input
						type="checkbox" name="schoolZone[]" id="schoolZone4">
						校区4 </label>
					<input type="hidden" name=schoolZone4copy value="" />
					<label name="schoolZoneLabel" for="schoolZone5">
						<input
						type="checkbox" name="schoolZone[]" id="schoolZone5">
						校区5 </label>
					<input type="hidden" name=schoolZone5copy value="" />
					</td>
				</tr>

				<tr>
					<th>工资卡卡号：</th>
					<td colspan="2">
					<input type="text" name="bankCardNumber" size="18" required="true" />
					(必填)</td>
				</tr>

				<tr>
					<th>工资卡银行：</th>
					<td colspan="2">
					<input type="text" name="bank" size="18" required="true" />
					(必填)</td>
				</tr>

				<tr>
					<th>工资卡持卡人：</th>
					<td colspan="2">
					<input type="text" name="bankCardUser" size="18" required="true" />
					(必填)</td>
				</tr>

				<tr>
					<th>特殊需求：</th>
					<td colspan="2">
					<input type="text" name="requireCondition" size="18" />
					</td>
				</tr>

				<tr>
					<th>产品名称：</th>
					<td colspan="2"><label name="productLabel" for="product1">
						<input
						type="checkbox" name="product[]" id="product1" />
						产品1 </label>
					<input type="hidden" name=product1copy value="" />
					<label
					name="productLabel" for="product2">
						<input type="checkbox"
						name="product[]" id="product2" />
						产品2 </label>
					<input type="hidden" name=product2copy value="" />
					<label
					name="productLabel" for="product3">
						<input type="checkbox"
						name="product[]" id="product3" />
						产品3 </label>
					<input type="hidden" name=product3copy value="" />
					<label
					name="productLabel" for="product4">
						<input type="checkbox"
						name="product[]" id="product4" />
						产品4 </label>
					<input type="hidden" name=product4copy value="" />
					<label
					name="productLabel" for="product5">
						<input type="checkbox"
						name="product[]" id="product5" />
						产品5 </label>
					<input type="hidden" name=product5copy value="" />
				</tr>

				<tr>
					<th>科目：</th>
					<td colspan="2"><label name="courseLabel" for="course1">
						<input
						type="checkbox" name="course[]" id="course1">
						科目1</label>
					<input type="hidden" name=course1copy value="" />
					<label
					name="courseLabel" for="course2">
						<input type="checkbox"
						name="course[]" id="course2">
						科目2</label>
					<input type="hidden" name=course2copy value="" />
					<label name="courseLabel"
					for="course3">
						<input type="checkbox" name="course[]" id="course3">
						科目3</label>
					<input type="hidden" name=course3copy value="" />
					<label name="courseLabel" for="course4">
						<input type="checkbox" name="course[]" id="course4">
						科目4</label>
					<input type="hidden" name=course4copy value="" />
					<label name="courseLabel"
					for="course5">
						<input type="checkbox" name="course[]" id="course5">
						科目5</label>
					<input type="hidden" name=course5copy value="" />
					<label name="courseLabel"
					for="course6">
						<input type="checkbox" name="course[]" id="course6">
						科目6</label>
					<input type="hidden" name=course6copy value="" />
					<label name="courseLabel"
					for="course7">
						<input type="checkbox" name="course[]" id="course7">
						科目7</label>
					<input type="hidden" name=course7copy value="" />
					<label name="courseLabel"
					for="course8">
						<input type="checkbox" name="course[]" id="course8">
						科目8</label>
					<input type="hidden" name=course8copy value="" /><br />
					<label name="courseLabel"
					for="course9">
						<input type="checkbox" name="course[]" id="course9">
						科目9</label>
					<input type="hidden" name=course9copy value="" />
					<label name="courseLabel"
					for="course10">
						<input type="checkbox" name="course[]" id="course10">
						科目10</label>
					<input type="hidden" name=course10copy value="" />
					</td>
				</tr>

				<tr>
					<th>年级：</th>
					<td colspan="2"><label name="gradeLabel" for="grade7">
						<input
						type="checkbox" name="grade7" id="grade7">
						初一 </label>
					<input type="hidden" name=grade7copy value="" />
					<label
					name="gradeLabel" for="grade8">
						<input type="checkbox" name="grade8"
						id="grade8">
						初二 </label>
					<input type="hidden" name=grade8copy value="" />
					<label name="gradeLabel" for="grade9">
						<input
						type="checkbox" name="grade9" id="grade9">
						初三 </label>
					<input type="hidden" name=grade9copy value="" />
					<label
					name="gradeLabel" for="grade10">
						<input type="checkbox"
						name="grade10" id="grade10">
						高一 </label>
					<input type="hidden" name=grade10copy value="" />
					<label name="gradeLabel"
					for="grade11">
						<input type="checkbox" name="grade11" id="grade11">
						高二 </label>
					<input type="hidden" name=grade11copy value="" />
					<label name="gradeLabel" for="grade12">
						<input
						type="checkbox" name="grade12" id="grade12">
						高三 </label>
					<input type="hidden" name=grade12copy value="" />
					</td>
				</tr>

				<tr>
					<th>毕业学校：</th>
					<td colspan="2">
					<input type="text" name="school" size="18" />
					</td>
				</tr>

				<tr>
					<th>教师微信：</th>
					<td colspan="2">
					<input type="text" name="teacherWX" size="18" />
					</td>
				</tr>

				<tr>
					<th>教师QQ：</th>
					<td colspan="2">
					<input type="text" name="teacherQQ" size="18" />
					</td>
				</tr>

				<tr>
					<th>教师电话：</th>
					<td colspan="2">
					<input type="text" name="teacherTel" size="18" />
					</td>
				</tr>

				<tr>
					<th>邮 箱：</th>
					<td colspan="2">
					<input type="text" name="teacherEmail" size="18" />
					</td>
				</tr>

				<tr>
					<th>家庭地址：</th>
					<td colspan="2">
					<input type="text" name="address" size="18" />
					</td>
				</tr>

				<tr>
					<th>身份证号码：</th>
					<td colspan="2">
					<input type="text" name="idCardNum" size="18" />
					</td>
				</tr>

				<tr>
					<th>在职＆离职：</th>
					<td colspan="2">
					<select name="workCondition" style="width: 170px">
						<option value="0">--请选择--</option>
						<option value="1">在职</option>
						<option value="2">离职</option>
					</select></td>
				</tr>

				<th>全职＆兼职：</th>
				<td colspan="2">
				<select name="workTime" style="width: 170px">
					<option value="0">--请选择--</option>
					<option value="1">全职</option>
					<option value="2">兼职</option>
				</select></td>
				</tr>

				<tr>
					<th>入职时间：</th>
					<td colspan="2">
					<input type="text" class="date" size="18"
					name="inTime" readonly="true" />
					</td>
				</tr>

				<tr>
					<th>离职时间：</th>
					<td colspan="2">
					<input type="text" class="date" size="18"
					name="outTime" readonly="true" />(提示：离职时填写)
					</td>
				</tr>
				
				<tr>
					<th></th>
					<td colspan="2">&nbsp;</td>
				</tr>
				<tr>
					<td colspan="5" align="center">
					<input type="hidden" name="submitType" />
					<input type="button" class="btn" name="buttonSql" value="查询" onclick="sqlRecord()" />
					<input type="submit" class="btn" name="submitAdd" value="增加" disabled="true" />
					<input type="submit" class="btn" name="submitUpdate" value="修改" disabled="true" />
					<input type="submit" class="btn" name="submitDelete" value="删除" disabled="true" />
					<input type="reset" class="btn" name="reset" value="重置" />
					</td>
				</tr>
			</form>
		</table>
	</body>

</html>
