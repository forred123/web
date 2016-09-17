<html>
	<head>
		<meta charset="UTF-8">
		<title>Insert title here</title>
		<style type="text/css">
			img {
				background-repeat: no-repeat;
			}

			body {
				margin: 0;
				text-align: center;
				background-color: #579ad1;
			}

			a {
				color: white;
			}
			/*顺序很重要 */
			/*a:link {color: #FFFFFF}*/ /* 未访问的链接 */
			/*a:visited {color: #00FF00}*/ /* 已访问的链接 */
			a:hover {
				color: #FF00FF
			}/* 鼠标移动到链接上 */
			/*a:active {color: #000000}*/ /* 选定的链接 */
			a:link {
				text-decoration: none;
			}

			a:visited {
				text-decoration: none;
			}

			a:hover {
				text-decoration: none;
			}

			a:active {
				text-decoration: none;
			}
		</style>
		<script src="../js/checkRole.js"></script>

		<script type="text/javascript">
			function setClass(obj) {
				clearClass();
				obj.style.color = "black";
				return htCheckRole(obj);
			}

			function clearClass() {
				var aList = document.getElementsByTagName("a");
				for (var i = 0, len = aList.length; i < len; i++) {
					aList[i].removeAttribute("style");
				}
			}
		</script>
	</head>
	<body>
		<!--  <img alt="band图片" src="../image/bandAdmin.jpg">
		<br>-->
		<br>
		<a href="principalSet.php" name="principalSet" onclick="return setClass(this);" target="mainFrame">校长设置</a>&nbsp;&nbsp;

		<a href="recordTeacher.php" name="recordTeacher" onclick="return setClass(this);" target="mainFrame">教师档案</a>&nbsp;&nbsp;

		<a href="gradeSet.php" name="gradeSet" onclick="return setClass(this);" target="mainFrame">班级设置</a>&nbsp;&nbsp;

		<a href="recordStudent.php" name="recordStudent" onclick="return setClass(this);" target="mainFrame">学生档案</a>&nbsp;&nbsp;

		<a href="studentFee.php" name="studentFee" onclick="return setClass(this);" target="mainFrame">学生费用</a>&nbsp;&nbsp;

		<a href="grade.php" name="grade" onclick="return setClass(this);" target="mainFrame">学生分班</a>&nbsp;&nbsp;

		<a href="classRecord.php" name="classRecord" onclick="return setClass(this);" target="mainFrame">上课考勤</a>&nbsp;&nbsp;

		<a href="../public/output.php" name="output"  onclick="return setClass(this);" target="mainFrame">教师工资</a>&nbsp;&nbsp;

		<a href="../index.php" onclick="setClass(this);" target="_blank">查看首页</a>
	</body>
</html>
