<?php
header("Content-Type:text/html;charset=utf-8");

include 'verifyID.php';
/*
 if (!(isset($_COOKIE['isLogin'])) || ($_COOKIE['isLogin'] == 0)) {
 echo "请登录系统先！";
 echo '<script>setTimeout(\'location="../index.php"\',2000)</script>';
 }
 */

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
		$result = "0";
		echo $result;
	}

	return;
}

// ajax查询学生
if (isset($_GET['sqlStudent'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	date_default_timezone_set('PRC');
	if ($_GET['timeStart'] == "%") {
		$timeStart = strtotime("2010-01-01");
	} else {
		$timeStart = strtotime($_GET['timeStart']);
	}

	if ($_GET['timeEnd'] == "%") {
		$timeEnd = strtotime(date("Y-m-d"));
	} else {
		$timeEnd = strtotime($_GET['timeEnd']) + 24 * 3600 - 1;
	}

	$name = str_replace(' ', '', $_GET['name']);

	if ($_GET['course'] == "1") {
		// 在班－>1，3
		if ($_GET['state'] == "1") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and MathClassIdInMLS like ? and sex like ?  and MathProduct like ?
					and (MathStateInGrade like ? or MathStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {//1：在学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and MathClassIdInMLS like ? and sex like ?  and MathProduct like ?
					and (MathStateInGrade like ? or MathStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime= ? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {//2：退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and MathClassIdInMLS like ? and sex like ?  and MathProduct like ?
					and (MathStateInGrade like ? or MathStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
		}
		// 试听->2
		if ($_GET['state'] == "2") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and MathClassIdInMLS like ? and sex like ?  and MathProduct like ?
					and MathStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and MathClassIdInMLS like ? and sex like ?  and MathProduct like ?
					and MathStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and MathClassIdInMLS like ? and sex like ?  and MathProduct like ?
					and MathStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}
		// 在班或试听
		if ($_GET['state'] == "%") {
			if ($_GET['studyState'] == "0") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and MathClassIdInMLS like ? and sex like ? and MathProduct like ?
					and (MathStateInGrade like ? or MathStateInGrade like ? or MathStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and MathClassIdInMLS like ? and sex like ? and MathProduct like ?
					and (MathStateInGrade like ? or MathStateInGrade like ? or MathStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and MathClassIdInMLS like ? and sex like ? and MathProduct like ?
					and (MathStateInGrade like ? or MathStateInGrade like ? or MathStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

	} else if ($_GET['course'] == "2") {
		// 在班－>1，3
		if ($_GET['state'] == "1") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChineseClassIdInMLS like ? and sex like ? and ChineseProduct like ?
					and (ChineseStateInGrade like ? or ChineseStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChineseClassIdInMLS like ? and sex like ? and ChineseProduct like ?
					and (ChineseStateInGrade like ? or ChineseStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChineseClassIdInMLS like ? and sex like ? and ChineseProduct like ?
					and (ChineseStateInGrade like ? or ChineseStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 试听->2
		if ($_GET['state'] == "2") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChineseClassIdInMLS like ? and sex like ? and ChineseProduct like ?
					and ChineseStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChineseClassIdInMLS like ? and sex like ? and ChineseProduct like ?
					and ChineseStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChineseClassIdInMLS like ? and sex like ? and ChineseProduct like ?
					and ChineseStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 在班或试听
		if ($_GET['state'] == "%") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChineseClassIdInMLS like ? and sex like ? and ChineseProduct like ?
					and (MathStateInGrade like ? or MathStateInGrade like ? or MathStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChineseClassIdInMLS like ? and sex like ? and ChineseProduct like ?
					and (MathStateInGrade like ? or MathStateInGrade like ? or MathStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChineseClassIdInMLS like ? and sex like ? and ChineseProduct like ?
					and (MathStateInGrade like ? or MathStateInGrade like ? or MathStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

	} else if ($_GET['course'] == "3") {
		// 在班－>1，3
		if ($_GET['state'] == "1") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and EnglishClassIdInMLS like ? and sex like ?  and EnglishProduct like ?
					and (EnglishStateInGrade like ? or EnglishStateInGrade like ? )
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and EnglishClassIdInMLS like ? and sex like ?  and EnglishProduct like ?
					and (EnglishStateInGrade like ? or EnglishStateInGrade like ? )
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and EnglishClassIdInMLS like ? and sex like ?  and EnglishProduct like ?
					and (EnglishStateInGrade like ? or EnglishStateInGrade like ? )
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 试听->2
		if ($_GET['state'] == "2") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and EnglishClassIdInMLS like ? and sex like ?  and EnglishProduct like ?
					and EnglishStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and EnglishClassIdInMLS like ? and sex like ?  and EnglishProduct like ?
					and EnglishStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and EnglishClassIdInMLS like ? and sex like ?  and EnglishProduct like ?
					and EnglishStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 在班或试听
		if ($_GET['state'] == "%") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and EnglishClassIdInMLS like ? and sex like ?  and EnglishProduct like ?
					and (EnglishStateInGrade like ? or EnglishStateInGrade like ? or EnglishStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and EnglishClassIdInMLS like ? and sex like ?  and EnglishProduct like ?
					and (EnglishStateInGrade like ? or EnglishStateInGrade like ? or EnglishStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and EnglishClassIdInMLS like ? and sex like ?  and EnglishProduct like ?
					and (EnglishStateInGrade like ? or EnglishStateInGrade like ? or EnglishStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}
	} else if ($_GET['course'] == "4") {
		// 在班－>1，3
		if ($_GET['state'] == "1") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and PhysicsClassIdInMLS like ? and sex like ?  and PhysicsProduct like ?
					and (PhysicsStateInGrade like ? or PhysicsStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and PhysicsClassIdInMLS like ? and sex like ?  and PhysicsProduct like ?
					and (PhysicsStateInGrade like ? or PhysicsStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and PhysicsClassIdInMLS like ? and sex like ?  and PhysicsProduct like ?
					and (PhysicsStateInGrade like ? or PhysicsStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 试听->2
		if ($_GET['state'] == "2") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and PhysicsClassIdInMLS like ? and sex like ?  and PhysicsProduct like ?
					and PhysicsStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and PhysicsClassIdInMLS like ? and sex like ?  and PhysicsProduct like ?
					and PhysicsStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and PhysicsClassIdInMLS like ? and sex like ?  and PhysicsProduct like ?
					and PhysicsStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 在班或试听
		if ($_GET['state'] == "%") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and PhysicsClassIdInMLS like ? and sex like ?  and PhysicsProduct like ?
					and (PhysicsStateInGrade like ? or PhysicsStateInGrade like ? or PhysicsStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and PhysicsClassIdInMLS like ? and sex like ?  and PhysicsProduct like ?
					and (PhysicsStateInGrade like ? or PhysicsStateInGrade like ? or PhysicsStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and PhysicsClassIdInMLS like ? and sex like ?  and PhysicsProduct like ?
					and (PhysicsStateInGrade like ? or PhysicsStateInGrade like ? or PhysicsStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}
	} else if ($_GET['course'] == "5") {
		// 在班－>1，3
		if ($_GET['state'] == "1") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChemistryClassIdInMLS like ? and sex like ?  and ChemistryProduct like ?
					and (ChemistryStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChemistryClassIdInMLS like ? and sex like ?  and ChemistryProduct like ?
					and (ChemistryStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChemistryClassIdInMLS like ? and sex like ?  and ChemistryProduct like ?
					and (ChemistryStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 试听->2
		if ($_GET['state'] == "2") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChemistryClassIdInMLS like ? and sex like ?  and ChemistryProduct like ?
					and ChemistryStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChemistryClassIdInMLS like ? and sex like ?  and ChemistryProduct like ?
					and ChemistryStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChemistryClassIdInMLS like ? and sex like ?  and ChemistryProduct like ?
					and ChemistryStateInGrade like ?
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 在班或试听
		if ($_GET['state'] == "%") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChemistryClassIdInMLS like ? and sex like ?  and ChemistryProduct like ?
					and (ChemistryStateInGrade like ? or ChemistryStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChemistryClassIdInMLS like ? and sex like ?  and ChemistryProduct like ?
					and (ChemistryStateInGrade like ? or ChemistryStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and ChemistryClassIdInMLS like ? and sex like ?  and ChemistryProduct like ?
					and (ChemistryStateInGrade like ? or ChemistryStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], "1", "3", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}
	} else {
		// 在班－>1，3
		if ($_GET['state'] == "1") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and (MathClassIdInMLS like ? or ChineseClassIdInMLS like ? or EnglishClassIdInMLS like ? or PhysicsClassIdInMLS like ? or ChemistryClassIdInMLS like ?) and sex like ?  
					and (MathProduct like ? or ChineseProduct like ? or EnglishProduct like ? or PhysicsProduct like ? or ChemistryProduct like ?)
					and (MathStateInGrade like ? or MathStateInGrade like ? or ChineseStateInGrade like ? or ChineseStateInGrade like ? or EnglishStateInGrade like ? or EnglishStateInGrade like ?
						or PhysicsStateInGrade like ? or PhysicsStateInGrade like ? or ChemistryStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], "1", "3", "1", "3", "1", "3", "1", "3", "1", "3", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and (MathClassIdInMLS like ? or ChineseClassIdInMLS like ? or EnglishClassIdInMLS like ? or PhysicsClassIdInMLS like ? or ChemistryClassIdInMLS like ?) and sex like ?  
					and (MathProduct like ? or ChineseProduct like ? or EnglishProduct like ? or PhysicsProduct like ? or ChemistryProduct like ?)
					and (MathStateInGrade like ? or MathStateInGrade like ? or ChineseStateInGrade like ? or ChineseStateInGrade like ? or EnglishStateInGrade like ? or EnglishStateInGrade like ?
						or PhysicsStateInGrade like ? or PhysicsStateInGrade like ? or ChemistryStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], "1", "3", "1", "3", "1", "3", "1", "3", "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and (MathClassIdInMLS like ? or ChineseClassIdInMLS like ? or EnglishClassIdInMLS like ? or PhysicsClassIdInMLS like ? or ChemistryClassIdInMLS like ?) and sex like ?  
					and (MathProduct like ? or ChineseProduct like ? or EnglishProduct like ? or PhysicsProduct like ? or ChemistryProduct like ?)
					and (MathStateInGrade like ? or MathStateInGrade like ? or ChineseStateInGrade like ? or ChineseStateInGrade like ? or EnglishStateInGrade like ? or EnglishStateInGrade like ?
						or PhysicsStateInGrade like ? or PhysicsStateInGrade like ? or ChemistryStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], "1", "3", "1", "3", "1", "3", "1", "3", "1", "3", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 试听->2
		if ($_GET['state'] == "2") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and (MathClassIdInMLS like ? or ChineseClassIdInMLS like ? or EnglishClassIdInMLS like ? or PhysicsClassIdInMLS like ? or ChemistryClassIdInMLS like ?) and sex like ?  
					and (MathProduct like ? or ChineseProduct like ? or EnglishProduct like ? or PhysicsProduct like ? or ChemistryProduct like ?)
					and (MathStateInGrade like ? or ChineseStateInGrade like ? or EnglishStateInGrade like ? or PhysicsStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], "2", "2", "2", "2", "2", $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and (MathClassIdInMLS like ? or ChineseClassIdInMLS like ? or EnglishClassIdInMLS like ? or PhysicsClassIdInMLS like ? or ChemistryClassIdInMLS like ?) and sex like ?  
					and (MathProduct like ? or ChineseProduct like ? or EnglishProduct like ? or PhysicsProduct like ? or ChemistryProduct like ?)
					and (MathStateInGrade like ? or ChineseStateInGrade like ? or EnglishStateInGrade like ? or PhysicsStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], "2", "2", "2", "2", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
					and grade like ? and (MathClassIdInMLS like ? or ChineseClassIdInMLS like ? or EnglishClassIdInMLS like ? or PhysicsClassIdInMLS like ? or ChemistryClassIdInMLS like ?) and sex like ?  
					and (MathProduct like ? or ChineseProduct like ? or EnglishProduct like ? or PhysicsProduct like ? or ChemistryProduct like ?)
					and (MathStateInGrade like ? or ChineseStateInGrade like ? or EnglishStateInGrade like ? or PhysicsStateInGrade like ? or ChemistryStateInGrade like ?)
					and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], "2", "2", "2", "2", "2", $timeStart, $timeEnd, $name, $name, ""));
			}
		}

		// 在班或试听
		if ($_GET['state'] == "%") {
			if ($_GET['studyState'] == "0") {//0：在学或退学
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
						and grade like ? and (MathClassIdInMLS like ? or ChineseClassIdInMLS like ? or EnglishClassIdInMLS like ? or PhysicsClassIdInMLS like ? or ChemistryClassIdInMLS like ?) and sex like ?  
						and (MathProduct like ? or ChineseProduct like ? or EnglishProduct like ? or PhysicsProduct like ? or ChemistryProduct like ?)
						and (MathStateInGrade like ? or ChineseStateInGrade like ? or EnglishStateInGrade like ? or PhysicsStateInGrade like ? or ChemistryStateInGrade like ?)
						and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['state'], $_GET['state'], $_GET['state'], $_GET['state'], $_GET['state'], $timeStart, $timeEnd, $name, $name));
			}
			if ($_GET['studyState'] == "1") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
						and grade like ? and (MathClassIdInMLS like ? or ChineseClassIdInMLS like ? or EnglishClassIdInMLS like ? or PhysicsClassIdInMLS like ? or ChemistryClassIdInMLS like ?) and sex like ?  
						and (MathProduct like ? or ChineseProduct like ? or EnglishProduct like ? or PhysicsProduct like ? or ChemistryProduct like ?)
						and (MathStateInGrade like ? or ChineseStateInGrade like ? or EnglishStateInGrade like ? or PhysicsStateInGrade like ? or ChemistryStateInGrade like ?)
						and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['state'], $_GET['state'], $_GET['state'], $_GET['state'], $_GET['state'], $timeStart, $timeEnd, $name, $name, ""));
			}
			if ($_GET['studyState'] == "2") {
				$sbmt = $pdo -> prepare("select * from recordStudentTable where (schoolZone1 like ? or schoolZone2 like ? or schoolZone3 like ?)
						and grade like ? and (MathClassIdInMLS like ? or ChineseClassIdInMLS like ? or EnglishClassIdInMLS like ? or PhysicsClassIdInMLS like ? or ChemistryClassIdInMLS like ?) and sex like ?  
						and (MathProduct like ? or ChineseProduct like ? or EnglishProduct like ? or PhysicsProduct like ? or ChemistryProduct like ?)
						and (MathStateInGrade like ? or ChineseStateInGrade like ? or EnglishStateInGrade like ? or PhysicsStateInGrade like ? or ChemistryStateInGrade like ?)
						and inTime >= ? and inTime <= ? and (name1 like ? or name2 like ?) and outTime!=? order by convert (name1 using gbk) asc");
				$sbmt -> execute(array($_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['schoolZone'] . "_", $_GET['grade'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['classIDInMLS'], $_GET['sex'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['product'], $_GET['state'], $_GET['state'], $_GET['state'], $_GET['state'], $_GET['state'], $timeStart, $timeEnd, $name, $name, ""));
			}
		}
	}

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
		$result = "0";
		echo $result;
	}

	return;
}

// ajax查询该班级设置中的班级名称
if (isset($_GET['sqlClassNameBySchoolZone'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select id, class from gradeSetTable where schoolZone=?");
	$sbmt -> execute(array($_GET['sqlClassNameBySchoolZone']));

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
		$result = "0";
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

		<title>学生基本信息查询</title>

		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<style>
			body {
				font: 14px verdana, arial, sans-serif;
			}

		</style>

		<script src="../js/sqlStudent.js"></script>
		<script src="../js/common.js"></script>

		<!--datetimepicker-->
		<link type="text/css" href="../jquery/jquery1.10.3/themes/base/jquery-ui.css" rel="stylesheet" />
		<link type="text/css" href="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.css" />
		<link type="text/css"href="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/demos.css" />
		<script type="text/javascript" src="../jquery/jquery1.10.3/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="../jquery/jquery1.10.3/ui/minified/jquery-ui.min.js"></script>

		<script type="text/javascript" src="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.js" ></script>

		<!--中文-->
		<script type="text/javascript" charset="gb2312" src="../jquery/jQuery-Timepicker-Addon/js/jquery.ui.datepicker-zh-CN.js.js"></script>
		<script type="text/javascript" src="../jquery/jQuery-Timepicker-Addon/js/jquery-ui-timepicker-zh-CN.js"></script>
		<script type="text/javascript">
			jQuery(function() {
				// 时间设置
				jQuery("#datetime").datetimepicker({
					timeFormat : "HH:mm:ss",
					dateFormat : "yy-mm-dd"
				});

				jQuery("#datetimeShow").datetimepicker({
					showOtherMonths : true,
					selectOtherMonths : false,
					closeText : '', //'确定',
					dateFormat : "yy-mm-dd",
					timeFormat : "HH:mm:ss",
					hourGrid : 3,
					minuteGrid : 10,
					numberOfMonths : 1,
					onSelect : function(dateText, inst) {
						//alert("您选择的日期是：" + dateText);
						document.getElementById("datetimeSel").value = dateText;
					}
				});

				jQuery('.datetimeImage').datetimepicker({
					showOn : "button",
					buttonImage : "../jquery/jquery1.10.3/demos/images/calendar.gif",
					buttonImageOnly : true,
					closeText : '关闭',
					dateFormat : "yy-mm-dd",
					timeFormat : "HH:mm",
					hourGrid : 3,
					minuteGrid : 10,
					numberOfMonths : 1
				});

				$(".date").datepicker({
					showOn : "button",
					buttonImage : "../jquery/jquery1.10.3/demos/images/calendar.gif",
					buttonImageOnly : true,
					closeText : '关闭',
					dateFormat : "yy-mm-dd"
				});
				// 日期

				$("#time").timepicker();
				// 时分秒

			});
		</script>
		<!--end datepicker -->

	</head>
	<body onload="initPage()">
		<form action="sqlteacher.php" method="post">
			<table align="center" width="2500px" border="0" cellpadding="0" cellspacing="0">
				<!-- <caption align="left"> -->
				<h3>学生基本信息查询</h3>
				<!-- </caption> -->
				<tr>
					<th style="width: 70px">查询条件</th>
					<td> 校区
					<select name="schoolZone" onchange="loadPrincipalSetAndTeacher()">
						<option value="0">-请选择-</option>
					</select> 年级
					<select name="grade" >
						<option value="0">-请选择-</option>
					</select> 科目
					<select name="course" >
						<option value="0">-请选择-</option>
					</select> 班级状态
					<select name="state" >
						<option value="0">-请选择-</option>
						<option value="1">在班</option>
						<option value="2">试听</option>
					</select> 产品名称
					<select name="product" >
						<option value="0">-请选择-</option>
					</select> 班级名称
					<select name="classInMLS" >
						<option value="0">-请选择-</option>
					</select> 性别
					<select name="sex" >
						<option value="0">-请选择-</option>
						<option value="1">男</option>
						<option value="2">女</option>
					</select> 学习状态
					<select name="studyState" >
						<option value="0">-请选择-</option>
						<option value="1">在学</option>
						<option value="2">退学</option>
					</select> 姓名
					<input type="text" name="name" style="width: 6em"/>
				</tr>
				<tr>
					<!-- <td>查询结果</td> -->
					<th style="width: 70px">报名时间</th>
					<td> 开始时间
					<input type="text" class="date" style="width: 10ex" name="timeStart" readonly/>
					结束时间
					<input type="text" class="date" style="width: 10ex" name="timeEnd" readonly/>
					<input type="button" name="sqlStudentBtn" value="查 询" onclick="sqlStudent()" />
					(提示：按时间为闭区间进行查询	) </td>
				</tr>
			</table>
		</form>

		<!--  查询结果表 -->
		<table id="sqlStudentTable" align="center" width="2500px" border="0" cellpadding="0" cellspacing="0">

		</table>
		<!--  end查询结果表 -->
	</body>
</html>