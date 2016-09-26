<?php
	header("Content-Type: text/html;charset=utf-8");
// 验证用户是否登录
if(!(isset($_COOKIE['isLogin']) && $_COOKIE['isLogin'] ==1)){
	echo "用户ID不存在或密码错误！请联系学校管理员！";
	echo '<script>setTimeout(\'location="../index.php"\',3000)</script>';
}
?>