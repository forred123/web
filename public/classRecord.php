<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>
		
		<title>上课考勤</title>
	</head>
	<body>
		<form action="classRecord.php" method="post">
			<table align="center" width="500" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<th>查询条件：</th>
					<td>
					<select name="sqlType">
						<option value="1">按ID查询</option>
						<option value="2">按姓名查询</option>
					</select></td>
					<td>
					<input type="text" name="sqlCondition" style="text-align: center"/>
					</td>
					<td>
					<input type="submit" name="submitSql" value="查询"/>
					<br>
					<!--分割出按钮和查询结果表--></td>
				</tr>
			</table>
		</form>

		<!--  查询结果表 -->
		<table>

			<?php
			header("Content-Type: text/html;charset=utf-8");
			//include 'verifyID.php';

			if (!(isset($_COOKIE['isLogin'])) || ($_COOKIE['isLogin'] == 0)) {
				echo "请登录系统先！";
				echo '<script>setTimeout(\'location="../index.php"\',2000)</script>';
			} else {
				//if (isset($_POST['submitSql'])) {
				if ((isset($_POST['submitSql'])) && ($_COOKIE['isLogin'] == 1)) {
					try {
						$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
					} catch(PDOException $e) {
						echo "数据库连接失败：" . $e -> getMessage();
						exit ;
					}

					// 设置数据库查询的汉字编码也为utf-8
					$pdo -> query('set names utf8');
					// $sbmt = $pdo -> prepare("select id, passWD, name, sex, role from user where id > ?");
					// $sbmt -> execute(array($_POST['sqlCondition']));
					// 教师用户怎么查都是自己的信息
					// 非教师用户可以查任何教师的信息
					if ($_COOKIE['role'] == 0) {
						if ($_POST['sqlType'] == 1) {
							$sbmt = $pdo -> prepare("select * from classRecord where uid = ?");
							$sbmt -> execute(array($_COOKIE['userID']));
						}
						if ($_POST['sqlType'] == 2) {
							$sbmt = $pdo -> prepare("select * from classRecord where name = ?");
							$sbmt -> execute(array($_COOKIE['userName']));
						}
					} elseif ($_COOKIE['role'] > 0) {
						if ($_POST['sqlType'] == 1) {
							$sbmt = $pdo -> prepare("select * from classRecord where uid = ?");
							$sbmt -> execute(array(str_replace(' ','',$_POST['sqlCondition'])));
						}
						if ($_POST['sqlType'] == 2) {
							$sbmt = $pdo -> prepare("select * from classRecord where name = ?");
							$sbmt -> execute(array(str_replace(' ','',$_POST['sqlCondition'])));
						}
					}

					if ($sbmt -> rowCount() > 0) {
						echo "<table align='center' width='500' border='1' cellpadding='0' cellspacing='0'>";
						echo "<caption><h3>上课考勤</h3></caption>";
						$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
						foreach ($allRows as $row) {
							echo '<tr>';
							echo '<th bgcolor=#b5cfd2>' . 'ID' . '</th>';
							echo '<th bgcolor=#b5cfd2>' . $row['uid'] . '</th>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '姓名' . '</td>';
							echo '<td>' . $row['name'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '校区' . '</td>';
							echo '<td>' . $row['schoolZone'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '课时长' . '</td>';
							echo '<td>' . $row['timePeriod'] . '</td>';
							echo '</tr>';
							
							echo '<tr>';
							echo '<td>' . '考勤时间' . '</td>';
							$time = date("Y年m月d日 H:i:s",$row['time']);
							echo '<td>' . $time . '</td>';
							echo '</tr>';
							
							echo '<tr>';
							echo '<td>' . '科目' . '</td>';
							echo '<td>' . $row['course'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '教师姓名' . '</td>';
							echo '<td>' . $row['teacherName'] . '</td>';
							echo '</tr>';
							
							echo '<tr>';
							echo '<td>' . '考勤情况' . '</td>';
							echo '<td>' . $row['attendence'] . '</td>';
							echo '</tr>';
							
							echo '<tr>';
							echo '<td>' . '缺勤原因' . '</td>';
							echo '<td>' . $row['reason'] . '</td>';
							echo '</tr>';
						}

					} else {
						echo "没有符合条件的记录！";
					}
				}
			}
			?>

			</table>
			<!--  end查询结果表 -->
	</body>
</html>

