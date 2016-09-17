<?php
header("Content-Type:text/html;charset=utf-8");
include '../public/verifyID.php';		
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>
		
		<title>后台管理系统</title>
	</head>

	<frameset rows="55,*" frameborder="yes" border="1">  <!--12%-->
		<frameset cols="">
			<frame src="band.php" name="band" scrolling="no" />
		</frameset>
		<frameset cols="">
			<frame src="introduce.html" name="mainFrame" />
		</frameset>
	</frameset>

	<body>

	</body>
</html>