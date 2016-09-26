<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<title>教育管理系统</title>

		<link rel="stylesheet" type="text/css" href="../css/layout.css" />
		<script src="../js/checkRole.js"></script>
	</head>

	<body>

		<div id="container">
			<div id="header">
				<div id="login">
					<!--		<form action="../index.php" method="post"> -->
					<table align="center" cellspacing="0">
						<tr align="center">
							<td>您好！</td>
						</tr>
						<tr>
							<td align="center"><?php echo urldecode($_COOKIE['userName'])
							?>
							&nbsp;已登录</td>
						</tr>

						<tr>
							<td align="center"><a href="logout.php">登出&nbsp;</a></td>
							<!--
							<td colspan="1" align="center" >
							<input type="submit" name="submitOut" value="登出" />
							</td>
							-->
						</tr>
					</table>
					<!--		</form>   -->
				</div>

				<div id="band"></div>

			</div>

			<div class="breakline"></div>

			<div id="mainbody">

				<div id="leftbox">

					<ul id="menu">
						<li class="li">
							<a href="sqlSet.php" name="sqlSet" target="_blank" onclick="return checkRole(this)">校长设置</a>
						</li>
						<li class="li">
							<a href="sqlGrade.php" name="sqlGrade" target="_blank" onclick="return checkRole(this)">班级查询</a>
						</li>
						<li class="li">
							<a href="sqlStudent.php" name="sqlStudent" target="_blank" onclick="return checkRole(this)">学生档案</a>
						</li>
						<li class="li">
							<a href="sqlFee.php" name="sqlFee" target="_blank" onclick="return checkRole(this)">费用记录</a>
						</li>
						<li class="li">
							<a href="sqlSome.php" name="sqlSome" target="_blank" onclick="return checkRole(this)">综合查询</a>
						</li>
						<li class="li">
							<a href="sqlTest.php" name="sqlTest" target="_blank" onclick="return checkRole(this)">试听统计</a>
						</li>
						<li class="li">
							<a href="sqlTeacher.php" name="sqlTeacher" target="_blank" onclick="return checkRole(this)">教师档案</a>
						</li>
						<li class="li">
							<a href="salary.php" name="salary" target="_blank" onclick="return checkRole(this)">教师工资</a>
						</li>
						<li class="li">
							<a href="remainder.php" name="remainder" target="_blank" onclick="return checkRole(this)">余额提醒</a>
						</li>
						<li class="li">
							<a href="output.php" name="output" target="_blank" onclick="return checkRole(this)">产出查询</a>
						</li>
						<li class="li">
							<a href="../admin/mainAdmin.php" name="htmanage" target="_blank" onclick="return checkRole(this)">后台管理</a>
						</li>
					</ul>

				</div>

				<div id="rightbox">
					<div class="paragraph">
						<h3>学校简介</h3>
						<p>
							哈佛大学（Harvard
							University），简称哈佛，坐落于美国马萨诸塞州剑桥市，是一所享誉世界的私立研究型大学，是著名的常春藤盟校成员。这里走出了8位美利坚合众国总统，上百位诺贝尔获得者曾在此工作、学习，其在文学、医学、法学、商学等多个领域拥有崇高的学术地位及广泛的影响力，被公认为是当今世界最顶尖的高等教育机构之一[1]
							。哈佛同时也是美国本土历史最悠久的高等学府，其诞生于1636年，最早由马萨诸塞州殖民地立法机关创建，初名新市民学院，是为了纪念在成立初期给予学院慷慨支持的约翰·哈佛牧师。学校于1639年3月更名为哈佛学院。1780年，哈佛学院正式改称哈佛大学。
						</p>
						<h3>辅导课程</h3>
						<p>
							小学数学、语文、英语。初、高中数学、语文、英语、物理、化学。
						</p>
						<h3>教育目标</h3>
						<p>
							熟悉各种题型、掌握做题规律、解题步骤、方法技巧、课后练习进程，顺利实现提分目标。
						</p>
						<h3>优势介绍</h3>
						<p>
							师资强悍，监管严格。专业、耐心、严格、高效，提分有魔力！
						</p>
						<h3>课程安排</h3>
						<p>
							设有班课和一对一两种上课模式，根据不同学生需求上课时间可定制。
						</p>
						<h3>课程教材</h3>
						<p>
							《课时作业本》、《历年真题》以及学校自主总结的《金老师点拨》、《金老师练习册》等。
						</p>

					</div>

				</div>
			</div>

			<div class="breakline"></div>

			<div id="footer">
				<div id="address">
					<b>北京校区地址：</b>北京市海淀文华西路育荣教育园区教育中心大厦三层 &nbsp;&nbsp;Tel:010-23564215
					<br />
					<b>广州校区地址：</b>广州市天河区宦溪西路50-12号万豪商业大厦三层602室 &nbsp;&nbsp;Tel:020-23564215
					<br />
					<b>上海校区地址：</b>上海市闸北区万兴路1128号讯楼宇信息服务外包产业园B栋三层 &nbsp;&nbsp;Tel:021-23564215
					<br />
				</div>
			</div>

		</div>

	</body>

</html>