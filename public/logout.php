<?php
header("Content-Type:text/html;charset=utf-8");

$userName = urldecode($_COOKIE['userName']);

setcookie("userID", "", time() - 3600, "/");
setcookie("userPW", "", time() - 3600, "/");
setcookie("role", "", time() - 3600, "/");
setcookie("userName", "", time() - 3600, "/");
setcookie("isLogin", "", time() - 3600, "/");

echo "再见," . $userName;

echo '<script>setTimeout(\'location="../index.php"\',1000)</script>';
?>
