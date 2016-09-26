<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>
		
		<title>学生交费</title>
	</head>
	<body>
		<form action="fee.php" method="post">
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

			if (!(isset($_COOKIE['isLogin'])) || ($_COOKIE['isLogin'] == 0)) {
				echo "请登录系统先！";
				echo '<script>setTimeout(\'location="../index.php"\',2000)</script>';
			} else {
				if ((isset($_POST['submitSql'])) && ($_COOKIE['isLogin'] == 1)) {
					try {
						$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
					} catch(PDOException $e) {
						echo "数据库连接失败：" . $e -> getMessage();
						exit ;
					}

					// 设置数据库查询的汉字编码也为utf-8
					$pdo -> query('set names utf8');
					// 普通用户怎么查都是自己的信息
					// 管理员可以查任何人的信息
					if ($_COOKIE['role'] == 0) {
						if ($_POST['sqlType'] == 1) {
							$sbmt = $pdo -> prepare("select * from fee where uid = ?");
							$sbmt -> execute(array($_COOKIE['userID']));
						}
						if ($_POST['sqlType'] == 2) {
							$sbmt = $pdo -> prepare("select * from fee where name = ?");
							$sbmt -> execute(array($_COOKIE['userName']));
						}
					} elseif ($_COOKIE['role'] > 0) {
						if ($_POST['sqlType'] == 1) {
							$sbmt = $pdo -> prepare("select * from fee where uid = ?");
							$sbmt -> execute(array(str_replace(' ','',$_POST['sqlCondition'])));
						}
						if ($_POST['sqlType'] == 2) {
							$sbmt = $pdo -> prepare("select * from fee where name = ?");
							$sbmt -> execute(array(str_replace(' ','',$_POST['sqlCondition'])));
						}
					}

					if ($sbmt -> rowCount() > 0) {
						echo "<table align='center' width='500' border='1' cellpadding='0' cellspacing='0'>";
						echo "<caption><h3>学生交费情况</h3></caption>";
						$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);

						$tmpNum = 0;
						$tmpFee = 0;
						$tmpFeeMath = 0;
						$tmpFeeChinese = 0;
						$tmpFeeEnglish = 0;
						$tmpFeePhysics = 0;
						$tmpFeeChemistry = 0;
						foreach ($allRows as $totalFee) {
							$tmpNum = $tmpNum + 1;
							$tmpFee += $totalFee['fee'];
							$tmpFeeMath += $totalFee['feeMath'];
							$tmpFeeChinese += $totalFee['feeChinese'];
							$tmpFeeEnglish += $totalFee['feeEnglish'];
							$tmpFeePhysics += $totalFee['feePhysics'];
							$tmpFeeChemistry += $totalFee['feeChemistry'];
						}

						echo '<tr>';
						echo '<th bgcolor=#FF9900>' . '交费总次数' . '</th>';
						echo '<th bgcolor=#FF9900>' . $tmpNum . '</th>';
						echo '</tr>';

						echo '<tr>';
						echo '<th bgcolor=#FF9900>' . '交费总额' . '</th>';
						echo '<th bgcolor=#FF9900>' . $tmpFee . '</th>';
						echo '</tr>';
						
						echo '<tr>';
						echo '<td>' . '数学总额' . '</td>';
						echo '<td>' . $tmpFeeMath . '</td>';
						echo '</tr>';
						
						echo '<tr>';
						echo '<td>' . '语文总额' . '</td>';
						echo '<td>' . $tmpFeeChinese . '</td>';
						echo '</tr>';
						
						echo '<tr>';
						echo '<td>' . '英语总额' . '</td>';
						echo '<td>' . $tmpFeeEnglish . '</td>';
						echo '</tr>';
						
						echo '<tr>';
						echo '<td>' . '物理总额' . '</td>';
						echo '<td>' . $tmpFeePhysics . '</td>';
						echo '</tr>';
						
						echo '<tr>';
						echo '<td>' . '化学总额' . '</td>';
						echo '<td>' . $tmpFeeChemistry . '</td>';
						echo '</tr>';

						echo '<tr>';
						echo '<td colspan="2" align="center">' . '交费详细情况表' . '</td>';
						echo '</tr>';

						$tmpNum = $tmpNum + 1;
						
						//foreach ($allRows as $row) {  //正向遍历数组
						foreach(array_reverse($allRows) as $row){ // 逆向遍历数组
							$tmpNum = $tmpNum - 1;
						
							echo '<tr>';
							echo '<th>交费次数</th>';
							echo '<th>' . $tmpNum . '</th>';
							//echo '<td bgcolor=#339933>' . '交费次数' . '</td>';
							//echo '<td bgcolor=#339933>' . $tmpNum . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td bgcolor=#b5cfd2>' . 'ID' . '</td>';
							echo '<td bgcolor=#b5cfd2>' . $row['uid'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '姓名' . '</td>';
							echo '<td>' . $row['name'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '交费总额' . '</td>';
							echo '<td>' . $row['fee'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '交费时间' . '</td>';
							$time = date("Y年m月d",$row['time']);
							echo '<td>' . $time . '</td>';
							echo '</tr>';
							
							echo '<tr>';
							echo '<td>' . '收据编号' . '</td>';
							echo '<td>' . $row['receiptNum'] . '</td>';
							echo '</tr>';
							
							echo '<tr>';
							echo '<td>' . '票号' . '</td>';
							echo '<td>' . $row['billNum'] . '</td>';
							echo '</tr>';
							
							echo '<tr>';
							echo '<td>' . '校区' . '</td>';
							echo '<td>' . $row['schoolZone'] . '</td>';
							echo '</tr>';
							
							echo '<tr>';
							echo '<td>' . '班课类型' . '</td>';
							echo '<td>' . $row['classType'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td bgcolor=#b5cfd2>' . '数学分科' . '</td>';
							echo '<td bgcolor=#b5cfd2>' . $row['feeMath'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '数学资料费' . '</td>';
							echo '<td>' . $row['feeMathDoc'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '数学课时费' . '</td>';
							echo '<td>' . $row['feePerMath'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td bgcolor=#b5cfd2>' . '语文分科' . '</td>';
							echo '<td bgcolor=#b5cfd2>' . $row['feeChinese'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '语文资料费' . '</td>';
							echo '<td>' . $row['feeChineseDoc'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '语文课时费' . '</td>';
							echo '<td>' . $row['feePerChinese'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td bgcolor=#b5cfd2>' . '英语分科' . '</td>';
							echo '<td bgcolor=#b5cfd2>' . $row['feeEnglish'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '英语资料费' . '</td>';
							echo '<td>' . $row['feeEnglishDoc'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '英语课时费' . '</td>';
							echo '<td>' . $row['feePerEnglish'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td bgcolor=#b5cfd2>' . '物理分科' . '</td>';
							echo '<td bgcolor=#b5cfd2>' . $row['feePhysics'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '物理资料费' . '</td>';
							echo '<td>' . $row['feePhysicsDoc'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '物理课时费' . '</td>';
							echo '<td>' . $row['feePerPhysics'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td bgcolor=#b5cfd2>' . '化学分科' . '</td>';
							echo '<td bgcolor=#b5cfd2>' . $row['feeChemistry'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '化学资料费' . '</td>';
							echo '<td>' . $row['feeChemistryDoc'] . '</td>';
							echo '</tr>';

							echo '<tr>';
							echo '<td>' . '化学课时费' . '</td>';
							echo '<td>' . $row['feePerChemistry'] . '</td>';
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

