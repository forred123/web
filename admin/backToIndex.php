<?php
header("Content-Type:text/html;charset=utf-8");
if (isset($_POST['backToIndex'])) {

}
?>

<!DOCTYPE html>
<html>
	<head>

	</head>
	<body>
		<form action="../index.php" method="post">
			<table align="center" cellspacing="0">
				<tr align="center">
					<td>您好！</td>
				</tr>
				<tr>
					<td align="center"><?php echo $_COOKIE['userName']?>&
					nbsp;已登录</td>
				</tr>

			</table>
		</form>
	</body>
</html>