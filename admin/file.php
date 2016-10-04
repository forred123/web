<?php
if (isset($_FILES["fileName"])) {
	if ((($_FILES["fileName"]["type"] == "image/jpeg") || ($_FILES["fileName"]["type"] == "image/pjpeg"))) {
		if ($_FILES["fileName"]["size"] < 200000) {
			if ($_FILES["fileName"]["error"] > 0) {
				echo("Error:" . $_FILES["fileName"]["error"] . "</br>");
			} else {
				echo "Upload:" . $_FILES["fileName"]["name"] . "</br>";
				echo "Stored in:" . $_FILES["fileName"]["tmp_name"] . "<br>";
				move_uploaded_file($_FILES["fileName"]["tmp_name"], "../uploadImg/" . $_FILES["fileName"]["name"]);
				echo "Stored in:" . "../uploadImg/" . $_FILES["fileName"]["name"];
				$url = "../uploadImg/" . $_FILES["fileName"]["name"];
			}
		} else {
			echo "图片文件应小于200k。";
		}
	}
}
?>

<html>
	<body>
		<form action="file.php" method="post" enctype="multipart/form-data">
			<input type="file" name="fileName"/>
			<input type="submit" name="submit" value="sub"/>
		</form>
		<img src='<?php echo $url ?>' width="300" height="80">
	</body>
</html>
