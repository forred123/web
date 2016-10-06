<?php
header("Content-Type:text/html;charset=utf-8");
// 验证身份
include 'verifyIDAdmin.php';

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

// ajax查询该校区里的教师
if (isset($_GET['schoolZoneSQL'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from recordTeacherTable where schoolZone1=? or schoolZone2=? or schoolZone3=? or schoolZone4=? or schoolZone5=?");
	$sbmt -> execute(array($_GET['schoolZoneSQL'], $_GET['schoolZoneSQL'], $_GET['schoolZoneSQL'], $_GET['schoolZoneSQL'], $_GET['schoolZoneSQL']));

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

	$sbmt = $pdo -> prepare("select class from gradeSetTable where schoolZone=?");
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

// ajax查询该学生单价和上课时间
if (isset($_GET['sqlPriceByUid'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from subFeeTable where uid=? and product=? and subFeeCourse=?");
	$sbmt -> execute(array($_GET['sqlPriceByUid'], $_GET['product'], $_GET['course']));

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

// ajax按条件查询所有班级
if (isset($_GET['noValueA'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from gradeSetTable where schoolZone like ? and grade like ? and course like ? and product like ? and teacher like ? and class like ? and endTime like ?");
	$sbmt -> execute(array($_GET['schoolZone'], $_GET['grade'], $_GET['course'], $_GET['product'], $_GET['teacher'], $_GET['class'], ""));

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

// ajax 载入班级ID下的同一个mls班级的学生
if (isset($_GET['classIdInMLS'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	// 先从学生表中查询分班状态为未分班的学生的ID，然后再去交费表中查询该ID的学生的信息

	//$sbmt = $pdo -> prepare("select uid,name1,name2,stateInGrade from recordStudentTable where classIdInMLS like ? and stateInGrade like ?");
	//$sbmt -> execute(array($_GET['classIdInMLS'],$_GET['stateInGrade']));

	if ($_GET['course'] == "1") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course1AttendanceStartTime,course1AttendanceEndTime,course1StateInGrade,course1OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course1ClassIdInMLS like ? and (course1StateInGrade like ? or course1StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course1AttendanceStartTime,course1AttendanceEndTime,course1StateInGrade,course1OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course1ClassIdInMLS like ? and (course1StateInGrade like ? or course1StateInGrade like ? or course1StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course1AttendanceStartTime,course1AttendanceEndTime,course1StateInGrade,course1OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course1ClassIdInMLS like ? and course1StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc course1StateInGrade
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course1ClassIdInMLS like ? and course1StateInGrade like ? order by course1StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}

	if ($_GET['course'] == "2") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course2AttendanceStartTime,course2AttendanceEndTime,course2StateInGrade,course2OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course2ClassIdInMLS like ? and (course2StateInGrade like ? or course2StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc course2StateInGrade
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course2AttendanceStartTime,course2AttendanceEndTime,course2StateInGrade,course2OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course2ClassIdInMLS like ? and (course2StateInGrade like ? or course2StateInGrade like ? or course2StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc course2StateInGrade
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course2AttendanceStartTime,course2AttendanceEndTime,course2StateInGrade,course2OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course2ClassIdInMLS like ? and course2StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc course2StateInGrade
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course2ClassIdInMLS like ? and course2StateInGrade like ? order by course2StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}

	if ($_GET['course'] == "3") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course3AttendanceStartTime,course3AttendanceEndTime,course3StateInGrade,course3OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course3ClassIdInMLS like ? and (course3StateInGrade like ? or course3StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course3AttendanceStartTime,course3AttendanceEndTime,course3StateInGrade,course3OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course3ClassIdInMLS like ? and (course3StateInGrade like ? or course3StateInGrade like ? or course3StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course3AttendanceStartTime,course3AttendanceEndTime,course3StateInGrade,course3OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course3ClassIdInMLS like ? and course3StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course3ClassIdInMLS like ? and course3StateInGrade like ? order by course3StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}
	if ($_GET['course'] == "4") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course4AttendanceStartTime,course4AttendanceEndTime,course4StateInGrade,course4OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course4ClassIdInMLS like ? and (course4StateInGrade like ? or course4StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course4AttendanceStartTime,course4AttendanceEndTime,course4StateInGrade,course4OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course4ClassIdInMLS like ? and (course4StateInGrade like ? or course4StateInGrade like ? or course4StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course4AttendanceStartTime,course4AttendanceEndTime,course4StateInGrade,course4OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course4ClassIdInMLS like ? and course4StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course4ClassIdInMLS like ? and course4StateInGrade like ? order by course4StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}
	if ($_GET['course'] == "5") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course5AttendanceStartTime,course5AttendanceEndTime,course5StateInGrade,course5OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course5ClassIdInMLS like ? and (course5StateInGrade like ? or course5StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course5AttendanceStartTime,course5AttendanceEndTime,course5StateInGrade,course5OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course5ClassIdInMLS like ? and (course5StateInGrade like ? or course5StateInGrade like ? or course5StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course5AttendanceStartTime,course5AttendanceEndTime,course5StateInGrade,course5OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course5ClassIdInMLS like ? and course5StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course5ClassIdInMLS like ? and course5StateInGrade like ? order by course5StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}

	if ($_GET['course'] == "6") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course6AttendanceStartTime,course6AttendanceEndTime,course6StateInGrade,course6OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course6ClassIdInMLS like ? and (course6StateInGrade like ? or course6StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course6AttendanceStartTime,course6AttendanceEndTime,course6StateInGrade,course6OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course6ClassIdInMLS like ? and (course6StateInGrade like ? or course6StateInGrade like ? or course6StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course6AttendanceStartTime,course6AttendanceEndTime,course6StateInGrade,course6OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course6ClassIdInMLS like ? and course6StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course6ClassIdInMLS like ? and course6StateInGrade like ? order by course6StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}

	if ($_GET['course'] == "7") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course7AttendanceStartTime,course7AttendanceEndTime,course7StateInGrade,course7OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course7ClassIdInMLS like ? and (course7StateInGrade like ? or course7StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course7AttendanceStartTime,course7AttendanceEndTime,course7StateInGrade,course7OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course7ClassIdInMLS like ? and (course7StateInGrade like ? or course7StateInGrade like ? or course7StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course7AttendanceStartTime,course7AttendanceEndTime,course7StateInGrade,course7OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course7ClassIdInMLS like ? and course7StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course7ClassIdInMLS like ? and course7StateInGrade like ? order by course7StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}

	if ($_GET['course'] == "8") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course8AttendanceStartTime,course8AttendanceEndTime,course8StateInGrade,course8OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course8ClassIdInMLS like ? and (course8StateInGrade like ? or course8StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course8AttendanceStartTime,course8AttendanceEndTime,course8StateInGrade,course8OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course8ClassIdInMLS like ? and (course8StateInGrade like ? or course8StateInGrade like ? or course8StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course8AttendanceStartTime,course8AttendanceEndTime,course8StateInGrade,course8OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course8ClassIdInMLS like ? and course8StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course8ClassIdInMLS like ? and course8StateInGrade like ? order by course8StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}

	if ($_GET['course'] == "9") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course9AttendanceStartTime,course9AttendanceEndTime,course9StateInGrade,course9OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course9ClassIdInMLS like ? and (course9StateInGrade like ? or course9StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course9AttendanceStartTime,course9AttendanceEndTime,course9StateInGrade,course9OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course9ClassIdInMLS like ? and (course9StateInGrade like ? or course9StateInGrade like ? or course9StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course9AttendanceStartTime,course9AttendanceEndTime,course9StateInGrade,course9OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course9ClassIdInMLS like ? and course9StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course9ClassIdInMLS like ? and course9StateInGrade like ? order by course9StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}

	if ($_GET['course'] == "10") {
		if ($_GET['stateInGrade'] == "0") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course10AttendanceStartTime,course10AttendanceEndTime,course10StateInGrade,course10OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course10ClassIdInMLS like ? and (course10StateInGrade like ? or course10StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "0", "4"));
		} else if ($_GET['stateInGrade'] == "1") {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course10AttendanceStartTime,course10AttendanceEndTime,course10StateInGrade,course10OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course10ClassIdInMLS like ? and (course10StateInGrade like ? or course10StateInGrade like ? or course10StateInGrade like ?) order by convert(name1 using gbk) asc");
			//asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], "1", "2", "3"));
		} else {
			$sbmt = $pdo -> prepare("select uid,name1,name2,course10AttendanceStartTime,course10AttendanceEndTime,course10StateInGrade,course10OutGradeReason,priceBK, hour1, priceHour1YDY, pay1, hour2, priceHour2YDY, pay2, hour3, priceHour3YDY, pay3, lastPrice from recordStudentTable where course10ClassIdInMLS like ? and course10StateInGrade like ? order by convert(name1 using gbk) asc");
			//asc desc
			//$sbmt = $pdo -> prepare("select * from recordStudentTable where course10ClassIdInMLS like ? and course10StateInGrade like ? order by course10StateInGrade desc"); //asc desc
			$sbmt -> execute(array($_GET['classIdInMLS'], $_GET['stateInGrade']));
		}
	}

	//$sbmt = $pdo -> prepare("select uid,name1,name2,stateInGrade from recordStudentTable where classIdInMLS like ? and stateInGrade like ? order by stateInGrade desc"); //asc desc
	//$sbmt -> execute(array($_GET['classIdInMLS'],$_GET['stateInGrade']));

	$row = array();
	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {
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

// ajax 查询学生余额，ID这块与fee.php中处理不同，给的直接就是ID值，不用截取字符串
if (isset($_GET['sqlRemainFeeByStudentUID'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$str = $_GET['sqlRemainFeeByStudentUID'];
	//$uid = intval(substr($str, 1));
	$uid = $str;
	//substr($str, 1);// 这块是与fee.php中不同的地方

	$flagSubFeeCourse = $_GET['subFeeCourse'];

	if ($flagSubFeeCourse == "1") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course1),IFNULL(sum(course1),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "2") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course2),IFNULL(sum(course2),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "3") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course3),IFNULL(sum(course3),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "4") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course4),IFNULL(sum(course4),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	if ($flagSubFeeCourse == "5") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course5),IFNULL(sum(course5),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	if ($flagSubFeeCourse == "6") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course6),IFNULL(sum(course6),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	if ($flagSubFeeCourse == "7") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course7),IFNULL(sum(course7),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	if ($flagSubFeeCourse == "8") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course8),IFNULL(sum(course8),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	if ($flagSubFeeCourse == "9") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course9),IFNULL(sum(course9),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	if ($flagSubFeeCourse == "10") {
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course10),IFNULL(sum(course10),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}

	$sbmt -> execute(array($uid, $uid, $flagSubFeeCourse));

	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		$data = json_encode($allRows);
		echo $data;
	} else {
		$allRows = "0";
		echo $allRows;
	}

	return;
}

// ajax 学生试听操作
if (isset($_GET['testStudentID'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	// 更新学生表中的试听状态
	if ($_GET['subFeeCourse'] == "1") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course1StateInGrade=? where uid=?");
	}
	if ($_GET['subFeeCourse'] == "2") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course2StateInGrade=? where uid=?");
	}
	if ($_GET['subFeeCourse'] == "3") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course3StateInGrade=? where uid=?");
	}
	if ($_GET['subFeeCourse'] == "4") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course4StateInGrade=? where uid=?");
	}
	if ($_GET['subFeeCourse'] == "5") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course5StateInGrade=? where uid=?");
	}
	if ($_GET['subFeeCourse'] == "6") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course6StateInGrade=? where uid=?");
	}
	if ($_GET['subFeeCourse'] == "7") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course7StateInGrade=? where uid=?");
	}
	if ($_GET['subFeeCourse'] == "8") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course8StateInGrade=? where uid=?");
	}
	if ($_GET['subFeeCourse'] == "9") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course9StateInGrade=? where uid=?");
	}
	if ($_GET['subFeeCourse'] == "10") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course10StateInGrade=? where uid=?");
	}

	$flag = $sbmt -> execute(array($_GET['testResult'], $_GET['testStudentID']));

	// 更新该学生该科目该班级ID的试听课的扣费状态priceState,即：一旦试听成功，则把确定试听成功之前的课程也都扣费给教师算工资
	date_default_timezone_set('PRC');
	$time = strtotime($_GET['testResultTime']);

	$sbmtSubFeeTable = $pdo -> prepare("update subFeeTable set priceState=?,testResultTime=? where uid=? and classInMLS=? and subFeeCourse=?");
	$flagSubFeeTable = $sbmtSubFeeTable -> execute(array($_GET['priceState'], $time, $_GET['testStudentID'], $_GET['classInMLS'], $_GET['subFeeCourse']));

	if (($flag) && ($flagSubFeeTable)) {
		echo "1";
		// 操作成功
		return TRUE;
	} else {
		echo "0";
		// 操作失败
		return FALSE;
	}

	return;
}

// ajax 学生考勤扣费
if (isset($_GET['subFeeStudentID'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	// 先从学生表中查询分班状态为未分班的学生的ID，然后再去交费表中查询该ID的学生的信息
	date_default_timezone_set('PRC');
	$time = strtotime($_GET['attandenceTime']);
	// 出勤和旷课都是扣一节课的钱，正常扣费，请假不扣费
	$price = $_GET['price'];
	if ($_GET['attendance'] == "请假") {
		$price = 0;
	}
	/*
	 if($_GET['attendance']=="旷课"){
	 $price = 10;
	 }
	 */

	$period = strtotime($_GET['endAttandenceTime']) - strtotime($_GET['attandenceTime']);
	$period = $period / 60;

	// 把上课考勤中扣费保存到扣费表中，其中真实价格保存在学生表中，请假不扣费，旷课扣按正常扣费
	$sbmt = $pdo -> prepare("insert into subFeeTable (uid,name1,name2,schoolZone,grade,product,teacher,classInMLS,className,attendance,notAttendanceReason,attandenceTime,period,subFeeCourse,price,pay,priceState) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
	$flag = $sbmt -> execute(array($_GET['subFeeStudentID'], $_GET['studentName1'], $_GET['studentName2'], $_GET['schoolZone'], $_GET['grade'], $_GET['product'], $_GET['teacher'], $_GET['classInMLS'], $_GET['className'], $_GET['attendance'], $_GET['notAttendanceReason'], $time, $period, $_GET['subFeeCourse'], $price, $_GET['pay'], $_GET['priceState']));

	// 把上次上课扣费的真实价格保存到学生表中，便于考勤时载入上次扣费价格，（因为请假不扣费，旷课扣按正常扣费）
	if ($_GET['subFeeCourse'] == "1") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course1AttendanceStartTime=?,course1AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}
	if ($_GET['subFeeCourse'] == "2") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course2AttendanceStartTime=?,course2AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}
	if ($_GET['subFeeCourse'] == "3") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course3AttendanceStartTime=?,course3AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}
	if ($_GET['subFeeCourse'] == "4") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course4AttendanceStartTime=?,course4AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}
	if ($_GET['subFeeCourse'] == "5") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course5AttendanceStartTime=?,course5AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}
	if ($_GET['subFeeCourse'] == "6") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course6AttendanceStartTime=?,course6AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}
	if ($_GET['subFeeCourse'] == "7") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course7AttendanceStartTime=?,course7AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}
	if ($_GET['subFeeCourse'] == "8") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course8AttendanceStartTime=?,course8AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}
	if ($_GET['subFeeCourse'] == "9") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course9AttendanceStartTime=?,course9AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}
	if ($_GET['subFeeCourse'] == "10") {
		$sbmtRecordStudentTable = $pdo -> prepare("update recordStudentTable set lastPrice=?,course10AttendanceStartTime=?,course10AttendanceEndTime=? where uid=?");
		$flagRecordStudentTable = $sbmtRecordStudentTable -> execute(array($_GET['price'], strtotime($_GET['attandenceTime']), strtotime($_GET['endAttandenceTime']), $_GET['subFeeStudentID']));
	}

	/*
	 $name1 = $_GET['studentName1'];
	 $name2 = $_GET['studentName2'];
	 $str = "";
	 if($name2==""){
	 $str = $name1;
	 }else{
	 $str = $name1 . "(" . $name2 . ")";
	 }

	 if ($flag) {
	 echo $str . "--扣费成功";// 扣费成功
	 return TRUE;
	 } else {
	 echo $str . "--扣费失败"; // 扣费失败
	 return FALSE;
	 }
	 */

	if (($flag) && ($flagRecordStudentTable)) {
		echo "1";
		// 扣费成功
		return TRUE;
	} else {
		echo "0";
		// 扣费失败
		return FALSE;
	}

	return;
}

// ajax 学生考勤之 退班
if (isset($_GET['outGradeStudentID'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	// 先从学生表中查询分班状态为未分班的学生的ID，然后再去交费表中查询该ID的学生的信息
	date_default_timezone_set('PRC');
	$time = strtotime($_GET['outOrBackGradeTime']);
	//$sbmt = $pdo -> prepare("update recordStudentTable set stateInGrade=?,outOrBackGradeTime=?,outGradeReason=? where uid=?");
	//$flag = $sbmt -> execute(array("0" ,$time,$_GET['outGradeReason'], $_GET['outGradeStudentID']));

	if ($_GET['course'] == "1") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course1StateInGrade=?,course1OutOrBackGradeTime=?,course1OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}
	if ($_GET['course'] == "2") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course2StateInGrade=?,course2OutOrBackGradeTime=?,course2OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}
	if ($_GET['course'] == "3") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course3StateInGrade=?,course3OutOrBackGradeTime=?,course3OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}
	if ($_GET['course'] == "4") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course4StateInGrade=?,course4OutOrBackGradeTime=?,course4OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}
	if ($_GET['course'] == "5") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course5StateInGrade=?,course5OutOrBackGradeTime=?,course5OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}
	if ($_GET['course'] == "6") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course6StateInGrade=?,course6OutOrBackGradeTime=?,course6OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}
	if ($_GET['course'] == "7") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course7StateInGrade=?,course7OutOrBackGradeTime=?,course7OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}
	if ($_GET['course'] == "8") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course8StateInGrade=?,course8OutOrBackGradeTime=?,course8OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}
	if ($_GET['course'] == "9") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course9StateInGrade=?,course9OutOrBackGradeTime=?,course9OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}
	if ($_GET['course'] == "10") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course10StateInGrade=?,course10OutOrBackGradeTime=?,course10OutGradeReason=? where uid=?");
		$flag = $sbmt -> execute(array("0", $time, $_GET['outGradeReason'], $_GET['outGradeStudentID']));
	}

	if ($flag) {
		echo "1";
		// 退班成功
		return TRUE;
	} else {
		echo "0";
		// 退班失败
		return FALSE;
	}

	return;
}

// ajax 学生考勤之 回班
if (isset($_GET['backGradeStudentID'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	// 先从学生表中查询分班状态为未分班的学生的ID，然后再去交费表中查询该ID的学生的信息
	date_default_timezone_set('PRC');
	$time = strtotime($_GET['outOrBackGradeTime']);
	// 	$sbmt = $pdo -> prepare("update recordStudentTable set stateInGrade=? where uid=?");
	// 	$flag = $sbmt -> execute(array("1",$_GET['backGradeStudentID']));
	if ($_GET['course'] == "1") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course1StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}
	if ($_GET['course'] == "2") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course2StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}
	if ($_GET['course'] == "3") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course3StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}
	if ($_GET['course'] == "4") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course4StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}
	if ($_GET['course'] == "5") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course5StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}
	if ($_GET['course'] == "6") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course6StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}
	if ($_GET['course'] == "7") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course7StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}
	if ($_GET['course'] == "8") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course8StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}
	if ($_GET['course'] == "9") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course9StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}
	if ($_GET['course'] == "10") {
		$sbmt = $pdo -> prepare("update recordStudentTable set course10StateInGrade=? where uid=?");
		$flag = $sbmt -> execute(array("1", $_GET['backGradeStudentID']));
	}

	if ($flag) {
		echo "1";
		//  回班成功
		return TRUE;
	} else {
		echo "0";
		// 回班失败
		return FALSE;
	}

	return;
}

// 提交表单，本页面没有submit，使用的是ajax单个提交表单
if (isset($_POST['submitType'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch ( PDOException $e ) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit();
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	date_default_timezone_set('PRC');
	$time = strtotime($_POST['time']);

	if (isset($_POST['submitAdd'])) {
		if ($_POST['fee'] == $_POST['feeCourse1'] + $_POST['feeCourse2'] + $_POST['feeCourse3'] + $_POST['feeCourse4'] + $_POST['feeCourse5'] + $_POST['feeCourse6'] + $_POST['feeCourse7'] + $_POST['feeCourse8'] + $_POST['feeCourse9'] + $_POST['feeCourse10'] + $_POST['feeCourse1Doc'] + $_POST['feeCourse2Doc'] + $_POST['feeCourse3Doc'] + $_POST['feeCourse4Doc'] + $_POST['feeCourse5Doc'] + $_POST['feeCourse6Doc'] + $_POST['feeCourse7Doc'] + $_POST['feeCourse8Doc'] + $_POST['feeCourse9Doc'] + $_POST['feeCourse10Doc']) {
			$flagFeeOK = TRUE;
			echo "金额核对正确！";
			echo "<br>";
		} else {
			$flagFeeOK = FALSE;
			echo "金额核对错误！本次提交并未入库，请核对后重新输入";
			echo "<br>";
			echo "添加失败！";
			return FALSE;
		}

		$sbmt = $pdo -> prepare("insert into fee (uid,name,schoolZone,receiptNum,billNum,fee,time,classType, feeCourse1,feeCourse1Doc,feePerCourse1,feeCourse2,feeCourse2Doc,feePerCourse2,feeCourse3,feeCourse3Doc,feePerCourse3,feeCourse4,feeCourse4Doc,feePerCourse4,feeCourse5,feeCourse5Doc,feePerCourse5,feeCourse6,feeCourse6Doc,feePerCourse6,feeCourse7,feeCourse7Doc,feePerCourse7,feeCourse8,feeCourse8Doc,feePerCourse8,feeCourse9,feeCourse9Doc,feePerCourse9,feeCourse10,feeCourse10Doc,feePerCourse10 ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$flagSubOK = $sbmt -> execute(array($_POST['userID'], str_replace(' ', '', $_POST['userName']), $schoolZone, $_POST['receiptNum'], $_POST['billNum'], $_POST['fee'], $time, $classType, $_POST['feeCourse1'], $_POST['feeCourse1Doc'], $_POST['feePerCourse1'], $_POST['feeCourse2'], $_POST['feeCourse2Doc'], $_POST['feePerCourse2'], $_POST['feeCourse3'], $_POST['feeCourse3Doc'], $_POST['feePerCourse3'], $_POST['feeCourse4'], $_POST['feeCourse4Doc'], $_POST['feePerCourse4'], $_POST['feeCourse5'], $_POST['feeCourse5Doc'], $_POST['feePerCourse5'], $_POST['feeCourse6'], $_POST['feeCourse6Doc'], $_POST['feePerCourse6'], $_POST['feeCourse7'], $_POST['feeCourse7Doc'], $_POST['feePerCourse7'], $_POST['feeCourse8'], $_POST['feeCourse8Doc'], $_POST['feePerCourse8'], $_POST['feeCourse9'], $_POST['feeCourse9Doc'], $_POST['feePerCourse9'], $_POST['feeCourse10'], $_POST['feeCourse10Doc'], $_POST['feePerCourse10']));

		if (($flagSubOK) && ($flagFeeOK)) {
			echo "添加成功！";
			return TRUE;
		} else {
			echo "添加失败！";
			return FALSE;
		}
	}

	if (isset($_POST['submitUpdate'])) {
		$sbmt = $pdo -> prepare("update fee  set uid=?,name=?,fee=?,time=?,classType=?,feeCourse1=?,feeCourse1Doc=?,feePerCourse1=?,feeCourse2=?,feeCourse2Doc=?,feePerCourse2=?,feeCourse3=?,feeCourse3Doc=?,feePerCourse3=?,feeCourse4=?,feeCourse4Doc=?,feePerCourse4=?,feeCourse5=?,feeCourse5Doc=?,feePerCourse5=? where id=? and time=?");
		$flag = $sbmt -> execute(array($_POST['userID'], str_replace(' ', '', $_POST['userName']), $_POST['fee'], $time, $classType, $_POST['feeCourse1'], $_POST['feeCourse1Doc'], $_POST['feePerCourse1'], $_POST['feeCourse2'], $_POST['feeCourse2Doc'], $_POST['feePerCourse2'], $_POST['feeCourse3'], $_POST['feeCourse3Doc'], $_POST['feePerCourse3'], $_POST['feeCourse4'], $_POST['feeCourse4Doc'], $_POST['feePerCourse4'], $_POST['feeCourse5'], $_POST['feeCourse5Doc'], $_POST['feePerCourse5'], $_POST['userID'], $_POST['time']));
		if ($flag) {
			echo "修改成功！";
		} else {
			echo "修改失败！";
		}
	}

	if (isset($_POST['submitDelete'])) {
		$sbmt = $pdo -> prepare("delete from fee where uid = ? and classType=? and time = ?");
		$flag = $sbmt -> execute(array($_POST['userID'], $classType, $time));

		if ($flag)
			echo "删除成功！";
		else {
			echo "删除失败";
		}
	}
}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>

		<title>上课考勤</title>
		<!-- 备注：去掉自定义的 table.css 后，表格就没有td的黑竖线了-->
		<link rel="stylesheet" type="text/css" href="../css/table.css" />
		<script src="../js/common.js"></script>
		<script src="../js/classRecord.js"></script>

		<!--datetimepicker-->
		<link type="text/css"
		href="../jquery/jquery1.10.3/themes/base/jquery-ui.css"
		rel="stylesheet" />
		<link type="text/css"
		href="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.css" />
		<link type="text/css"
		href="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/demos.css" />
		<script type="text/javascript"
		src="../jquery/jquery1.10.3/jquery-1.9.1.js"></script>
		<script type="text/javascript"
		src="../jquery/jquery1.10.3/ui/minified/jquery-ui.min.js"></script>

		<script type="text/javascript"
		src="../jquery/jQuery-Timepicker-Addon/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.js"></script>

		<!--中文-->
		<script type="text/javascript" charset="gb2312"
		src="../jquery/jQuery-Timepicker-Addon/js/jquery.ui.datepicker-zh-CN.js.js"></script>
		<script type="text/javascript"
		src="../jquery/jQuery-Timepicker-Addon/js/jquery-ui-timepicker-zh-CN.js"></script>
		<script type="text/javascript">
			jQuery(function() {
				// 时间设置
				jQuery('#datetime').datetimepicker({
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
					closeText : '确定',
					dateFormat : "yy-mm-dd",
					timeFormat : "HH:mm",
					hourGrid : 3,
					minuteGrid : 10,
					numberOfMonths : 1
				});

				$("#date").datepicker({
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

		<!-- 		添加表格样式 -->
		<script type="text/javascript">
			$(document).ready(function() {
				$("tr").mouseover(function() {
					$(this).css("background-color", "#e9eaec");
				});
				$("tr").mouseout(function() {
					$(this).css("background-color", "");
				});
				$("tr:odd").addClass("rowBgColorOdd");
				$("tr:even").addClass("rowBgColorEven");
			})
		</script>

		<style>
			body {
				font: 16px Arial, "宋体";
			}

			.btn {
				width: 6ex;
			}
		</style>
		<!--end datepicker -->

	</head>
	<body onload="initPage()">
		<table class="tablesorter111111" align="center" width="1700px" border="0" cellpadding="0" cellspacing="0">
			<caption align="center">
				<h3>上课考勤</h3>
			</caption>
			<tr>
				<!-- 					<td>班级查询</td> -->
				<th>班级查询</th>
				<td> 校区
				<select name="schoolZone"  onchange="loadPrincipalSetAndTeacher()">
					<option value="0">-请选择-</option>
				</select> 年级
				<select name="grade" >
					<option value="0">-请选择-</option>
				</select> 科目
				<select name="course" >
					<option value="0">-请选择-</option>
				</select> 产品名称
				<select name="product" >
					<option value="0">-请选择-</option>
				</select> 教师姓名
				<select name="teacher" >
					<option value="0">-请选择-</option>
				</select> 班级名称
				<select name="class"  >
					<option value="0">-请选择-</option>
				</select>
			</tr>

			<tr>
				<!-- 					<td>查询结果</td> -->
				<th>查询结果</th>
				<td>
				<select name="gradeResult" style="width: 60ex" onchange="loadStudentInOneGrade(1)">
					<option value="0">-----------------------------------请选择----------------------------------</option>
				</select>
				<input type="button" value="查询班级" onclick="sqlClassInfo()" />
				<input type="button" value="筛选已退班学生" onclick="loadStudentInOneGrade(0)" />
				<input type="button" value="显示班级全部学生" onclick="loadStudentInOneGrade(2)" />
				（提示：选择班级后即载入在班学生）
				<input type="hidden"  name="operateCourse"/>
				</td>
			</tr>
			<tr>
				<th>考勤时间</th>
				<td> 开始时间
				<input type="text" class="datetimeImage" name="attandenceTime" style="width: 10em" readonly="true" onchange="fillEndAttandenceTime()" />
				&nbsp;&nbsp;&nbsp;
				结束时间
				<input type="text" class="datetimeImage" name="endAttandenceTime" style="width: 10em" readonly onchange="checkTime()" />
				&nbsp; <!--periodYDY--> 出勤人数
				<input type="number" name="attendanceNum" value="0" style="width: 5em" readonly="true"/>
				请假人数
				<input type="number" name="qjNum" value="0" style="width: 5em" readonly="true"/>
				<span style="display: none" >旷课人数
					<input type="number" name="kkNum" value="0" style="width: 5em" readonly="true" />
				</span> &nbsp;
				<input type="button" name="subFeeAll" value="提交全部考勤" onclick="subFeeAll()"/>
				</td>

			</tr>
			<!-- 			</tbody> -->
		</table>

		<form action="grade.php" method="post">
			<table id="studentInOneGradeTable" class="tablesorter" align="center" width="1700px" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<th>序号</th>
					<th style="display: none">学生ID</th>
					<th>上次考勤时间</th>
					<th>考勤操作</th>
					<th>学生姓名1</th>
					<th>学生姓名2</th>
					<th>单价</th>
					<th>工资</th>
					<th>出勤人数</th>
					<th>考勤</th>
					<th>缺勤原因</th>
					<th>剩余费用</th>
					<th>剩余课节</th>
					<th>退班及退班原因</th>
					<th>是否回班</th>
					<th>试听操作</th>

				</tr>

			</table>
		</form>

	</body>
</html>
</html>