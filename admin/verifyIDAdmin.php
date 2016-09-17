<?php
header("Content-Type: text/html;charset=utf-8");
// 验证用户是否登录
if (!(isset($_COOKIE['isLogin']) && $_COOKIE['isLogin'] == 1)) {
	if ($_COOKIE['role'] == 0) {
		echo "请登录后重新进入！";
		echo '<script>setTimeout(\'location="introduce.html"\',2000)</script>';
		return;
	}
}
if ((isset($_COOKIE['isLogin']) && $_COOKIE['isLogin'] == 1)) {
	// 学生和授课教师都不能进入后台 ，只有校长和校区负责人才能进入
	if ($_COOKIE['role'] == 0) {
		echo "学生没有进入后台的权限！";
		echo '<script>setTimeout(\'location="introduce.html"\',2000)</script>';
	}
	// 学生和授课教师都不能进入后台 ，只有校长和校区负责人才能进入
	if ($_COOKIE['role'] == 1) {
		echo "授课教师没有进入后台的权限！";
		echo '<script>setTimeout(\'location="introduce.html"\',2000)</script>';
	}
}
?>