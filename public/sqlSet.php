<?php
header("Content-Type:text/html;charset=utf-8");

include 'verifyID.php';					

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
		$result = "2";
		echo $result;
	}

	return;
}

?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html charset=utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>
		
		<title>校长设置查询</title>
		
		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/common.js"></script>
		<script src="../js/sqlSet.js"></script>
		<script type="text/javascript" src="../jquery/jquery1.10.3/jquery-1.9.1.js"></script>
								
		<style>
			body {
				font: 14px verdana, arial, sans-serif;
			}
		</style>

</head>
    <body onload="initPage()"> 	
    	<h3>校长设置信息查询</h3>
		<table id="sqlSetTable" align="center" width="4000px" border="0" cellpadding="0" cellspacing="0">
	
		</table>
	</body>
</html>