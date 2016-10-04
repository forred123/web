<?php

header("Content-Type:text/html;charset=utf-8");

// ajax 根据ID查询姓名
if (isset($_GET['userNameT'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}
	$result = "";
	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from recordStudentTable where name1 = ? or name2=?");
	$sbmt -> execute(array($_GET['userNameT'],$_GET['userNameT']));

	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {
			//$result = $row['name'];
		}
		// 查询内容到此为止，否则返回的是整个html
		$data = json_encode($allRows);
		echo $data;
	} 
	/*
	else if ($sbmt -> rowCount() > 1) {
		$result = "2";
		echo $result;
		// 有多个记录，说明学生档案表中有多个人ID相同，提示错误，去处理
	}
	*/
	 else {
		$result = "0";
		echo $result;
	}

	return;
}

// ajax 根据最后一个校区名查询校长设置单价
if (isset($_GET['schoolZoneT'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}
	$result = "";
	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$sbmt = $pdo -> prepare("select * from principalSetTable where schoolZone = ?");
	$sbmt -> execute(array($_GET['schoolZoneT']));

	if ($sbmt -> rowCount() == 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {
			//$result = $row['name'];
		}
		// 查询内容到此为止，否则返回的是整个html
		$data = json_encode($allRows);
		echo $data;
	} else if ($sbmt -> rowCount() > 1) {
		$result = "2";
		echo $result;
		// 有多个记录，说明学生档案表中有多个人ID相同，提示错误，去处理
	} else {
		$result = "0";
		echo $result;
	}

	return;
}

// ajax 查询交费记录
if (isset($_GET['sqlRecordStudentUID'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}
	
	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$str = $_GET['sqlRecordStudentUID'];
	//$uid = intval(substr($str, 1));
	$uid = substr($str, 1);
	
	$sbmt = $pdo -> prepare("select * from addFeeTable where uid = ? and mode=?");
	$sbmt -> execute(array($uid,"j"));
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

// ajax 根据交费表中的学生ID查询已经交费的科目，把科目加载到转费中
if (isset($_GET['sqlCourseStudentUID'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	
	$str = $_GET['sqlCourseStudentUID'];
	//$uid = intval(substr($str, 1));
	$uid = substr($str, 1);
	
	$sbmt1 = $pdo -> prepare("select sum(course1) as sumCourse1 from addFeeTable where uid = ?");
	$sbmt1 -> execute(array($uid));
	if ($sbmt1 -> rowCount() >= 1) {
		$allRows1 = $sbmt1 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows1 = "0";
	}
	
	$sbmt2 = $pdo -> prepare("select sum(course2) as sumCourse2 from addFeeTable where uid = ?");
	$sbmt2 -> execute(array($uid));
	if ($sbmt2 -> rowCount() >= 1) {
		$allRows2 = $sbmt2 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows2 = "0";
	}
	
	$sbmt3 = $pdo -> prepare("select sum(course3) as sumCourse3 from addFeeTable where uid = ?");
	$sbmt3 -> execute(array($uid));
	if ($sbmt3 -> rowCount() >= 1) {
		$allRows3 = $sbmt3 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows3 = "0";
	}
	
	$sbmt4 = $pdo -> prepare("select sum(course4) as sumCourse4 from addFeeTable where uid = ?");
	$sbmt4 -> execute(array($uid));
	if ($sbmt4 -> rowCount() >= 1) {
		$allRows4 = $sbmt4 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows4 = "0";
	}
	
	$sbmt5 = $pdo -> prepare("select sum(course5) as sumCourse5 from addFeeTable where uid = ?");
	$sbmt5 -> execute(array($uid));
	if ($sbmt5 -> rowCount() >= 1) {
		$allRows5 = $sbmt5 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows5 = "0";
	}
	
	$sbmt6 = $pdo -> prepare("select sum(course6) as sumCourse6 from addFeeTable where uid = ?");
	$sbmt6 -> execute(array($uid));
	if ($sbmt6 -> rowCount() >= 1) {
		$allRows6 = $sbmt6 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows6 = "0";
	}
	$sbmt7 = $pdo -> prepare("select sum(course7) as sumCourse7 from addFeeTable where uid = ?");
	$sbmt7 -> execute(array($uid));
	if ($sbmt7 -> rowCount() >= 1) {
		$allRows7 = $sbmt7 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows7 = "0";
	}
	$sbmt8 = $pdo -> prepare("select sum(course8) as sumCourse8 from addFeeTable where uid = ?");
	$sbmt8 -> execute(array($uid));
	if ($sbmt8 -> rowCount() >= 1) {
		$allRows8 = $sbmt8 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows8 = "0";
	}
	$sbmt9 = $pdo -> prepare("select sum(course9) as sumCourse9 from addFeeTable where uid = ?");
	$sbmt9 -> execute(array($uid));
	if ($sbmt9 -> rowCount() >= 1) {
		$allRows9 = $sbmt9 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows9 = "0";
	}
	$sbmt10 = $pdo -> prepare("select sum(course10) as sumCourse10 from addFeeTable where uid = ?");
	$sbmt10 -> execute(array($uid));
	if ($sbmt10 -> rowCount() >= 1) {
		$allRows10 = $sbmt10 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows10 = "0";
	}
	
	$aaa = array_merge_recursive($allRows1,$allRows2,$allRows3,$allRows4,$allRows5,$allRows6,$allRows7,$allRows8,$allRows9,$allRows10);
	$result = json_encode($aaa);
	
	echo $result;
	
	return;
	
	/*
	$sbmt = $pdo -> prepare("select sum(Math) as sumMath from addFeeTable where uid = ?");
			
	$sbmt -> execute(array($uid));

	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {
			//$result = $row['name'];
		}
		// 查询内容到此为止，否则返回的是整个html
		$data = json_encode($allRows);
		echo $data;
	} else {
		$result = "0";
		echo $result;
	}

	return;	
	*/
}

// ajax 根据交费表中的学生ID查询已经交费的科目，把科目加载到转费中
if (isset($_GET['sqlCourseProductStudentUID'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	
	$str = $_GET['sqlCourseProductStudentUID'];
	//$uid = intval(substr($str, 1));
	$uid = substr($str, 1);
	
	$sbmt = $pdo -> prepare("select course1Product, course2Product,course3Product,course4Product,course5Product,course6Product,course7Product,course8Product,course9Product,course10Product from addFeeTable where uid = ?");
			
	$sbmt -> execute(array($uid));

	if ($sbmt -> rowCount() >= 1) {
		$allRows = $sbmt -> fetchAll(PDO::FETCH_ASSOC);
		foreach ($allRows as $row) {
			//$result = $row['name'];
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

// ajax 查询学生某一学科某一产品的余额
if (isset($_GET['sqlRemainFeeByUIDandProduct'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');

	$str = $_GET['sqlRemainFeeByUIDandProduct'];
	//$uid = intval(substr($str, 1));
	$uid = substr($str, 1);
	
	$flagSubFeeCourse = $_GET['subFeeCourse'];
	$sqlProduct = $_GET['product'];
	if($sqlProduct=="总余额"){
		$sqlProduct = "%";
	}
	
	/*
	 *  加上IFNULL(sum(price),0)后，在mysql中查出为NULL的结果就是0了，就可以相减为数字而不是NULL了。
	*/
	if($flagSubFeeCourse == "1"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course1),IFNULL(sum(course1),0) as anum from addFeeTable where uid = ? and course1Product like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid = ? and subFeeCourse = ? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "2"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course2),IFNULL(sum(course2),0) as anum from addFeeTable where uid=? and course2Product like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "3"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course3),IFNULL(sum(course3),0) as anum from addFeeTable where uid=? and course3Product like?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "4"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course4),IFNULL(sum(course4),0) as anum from addFeeTable where uid=? and course4Product like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "5"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course5),IFNULL(sum(course5),0) as anum from addFeeTable where uid=? and course5yProduct like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "6"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course6),IFNULL(sum(course6),0) as anum from addFeeTable where uid=? and course6yProduct like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "7"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course7),IFNULL(sum(course7),0) as anum from addFeeTable where uid=? and course7yProduct like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "8"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course8),IFNULL(sum(course8),0) as anum from addFeeTable where uid=? and course8yProduct like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "9"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course9),IFNULL(sum(course9),0) as anum from addFeeTable where uid=? and course9yProduct like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "10"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course10),IFNULL(sum(course10),0) as anum from addFeeTable where uid=? and course10yProduct like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	$sbmt -> execute(array($uid,$sqlProduct,$uid,$flagSubFeeCourse,$sqlProduct));			
	
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

// ajax 查询学生总余额
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
	$uid = substr($str, 1);
	
	$flagSubFeeCourse = $_GET['subFeeCourse'];
	
	
	/*
	 *  加上IFNULL(sum(price),0)后，在mysql中查出为NULL的结果就是0了，就可以相减为数字而不是NULL了。
	*/
	if($flagSubFeeCourse == "1"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course1),IFNULL(sum(course1),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "2"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course2),IFNULL(sum(course2),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "3"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course3),IFNULL(sum(course3),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "4"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course4),IFNULL(sum(course4),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "5"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course5),IFNULL(sum(course5),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "6"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course6),IFNULL(sum(course6),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "7"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course7),IFNULL(sum(course7),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "8"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course8),IFNULL(sum(course8),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "9"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course9),IFNULL(sum(course9),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "10"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(course10),IFNULL(sum(course10),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	$sbmt -> execute(array($uid,$uid,$flagSubFeeCourse));					
	
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

// 提交表单－－修改单价
if(isset($_POST['submitTypePrice'])){
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	
	if(isset($_POST['submitUpdatePrice'])){
		
		if (isset($_POST['submitUpdate'])) {
		//$sbmt = $pdo -> prepare("update principalSetTable set assistant=?, 
		//$flag = $sbmt -> execute(array()));

		// if ($flag) {
			// echo "修改成功！";
			// return TRUE;
		// } else {
			// echo "修改失败";
			// return FALSE;
		// }
		}
	}
}


// 提交表单－－交费
if (isset($_POST['submitTypeAddFee'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	
		$course1Product = "";
		$course1 = 0;
		$course1SubFee1 = 0;
		$course1SubFee2 = 0;
		$course1SubFee3 = 0;
		$course1SubFee4 = 0;
		$course1SubFee5 = 0;
		
		if(isset($_POST['course1ProductCopy'])){
			$course1Product = $_POST['course1ProductCopy'];
		}			
		if(isset($_POST['course1'])){
			$course1 = str_replace(' ', '', $_POST['course1']);
		}
		if(isset($_POST['course1SubFee1'])){
			$course1SubFee1 = str_replace(' ', '', $_POST['course1SubFee1']);
		}
		if(isset($_POST['course1SubFee2'])){
			$course1SubFee2 = str_replace(' ', '', $_POST['course1SubFee2']);
		}
		if(isset($_POST['course1SubFee3'])){
			$course1SubFee3 = str_replace(' ', '', $_POST['course1SubFee3']);
		}
		if(isset($_POST['course1SubFee4'])){
			$course1SubFee4 = str_replace(' ', '', $_POST['course1SubFee4']);
		}
		if(isset($_POST['course1SubFee5'])){
			$course1SubFee5 = str_replace(' ', '', $_POST['course1SubFee5']);
		}

		$course2Product = "";
		$course2 = 0;
		$course2SubFee1 = 0;
		$course2SubFee2 = 0;
		$course2SubFee3 = 0;
		$course2SubFee4 = 0;
		$course2SubFee5 = 0;
		
		if(isset($_POST['course2ProductCopy'])){
			$course2Product = $_POST['course2ProductCopy'];
		}
		
		if(isset($_POST['course2'])){
			$course2 = str_replace(' ', '', $_POST['course2']); 
		}
		if(isset($_POST['course2SubFee1'])){
			$course2SubFee1 = str_replace(' ', '', $_POST['course2SubFee1']);
		}
		if(isset($_POST['course2SubFee2'])){
			$course2SubFee2 = str_replace(' ', '', $_POST['course2SubFee2']); 
		}
		if(isset($_POST['course2SubFee3'])){
			$course2SubFee3 = str_replace(' ', '', $_POST['course2SubFee3']); 
		}
		if(isset($_POST['course2SubFee4'])){
			$course2SubFee4 = str_replace(' ', '', $_POST['course2SubFee4']);
		}
		if(isset($_POST['course2SubFee5'])){
			$course2SubFee5 = str_replace(' ', '', $_POST['course2SubFee5']);
		}
		
		$course3Product = "";
		$course3 = 0;
		$course3SubFee1 = 0;
		$course3SubFee2 = 0;
		$course3SubFee3 = 0;
		$course3SubFee4 = 0;
		$course3SubFee5 = 0;
		
		if(isset($_POST['course3ProductCopy'])){
			$course3Product = $_POST['course3ProductCopy'];
		}
		
		if(isset($_POST['course3'])){
			$course3 = str_replace(' ', '', $_POST['course3']); 
		}
		if(isset($_POST['course3SubFee1'])){
			$course3SubFee1 = str_replace(' ', '', $_POST['course3SubFee1']); 
		}
		if(isset($_POST['course3SubFee2'])){
			$course3SubFee2 = str_replace(' ', '', $_POST['course3SubFee2']);
		}
		if(isset($_POST['course3SubFee3'])){
			$course3SubFee3 = str_replace(' ', '', $_POST['course3SubFee3']);
		}
		if(isset($_POST['course3SubFee4'])){
			$course3SubFee4 = str_replace(' ', '', $_POST['course3SubFee4']); 
		}
		if(isset($_POST['course3SubFee5'])){
			$course3SubFee5 = str_replace(' ', '', $_POST['course3SubFee4']); 
		}
		
		$course4Product = "";
		$course4 = 0;
		$course4SubFee1 = 0;
		$course4SubFee2 = 0;
		$course4SubFee3 = 0;
		$course4SubFee4 = 0;
		$course4SubFee5 = 0;
		
		if(isset($_POST['course4ProductCopy'])){
			$course4Product = $_POST['course4ProductCopy'];
		}
		
		if(isset($_POST['course4'])){
			$course4 = str_replace(' ', '', $_POST['course4']);
		}
		if(isset($_POST['course4SubFee1'])){
			$course4SubFee1 = str_replace(' ', '', $_POST['course4SubFee1']);
		}
		if(isset($_POST['course4SubFee2'])){
			$course4SubFee2 = str_replace(' ', '', $_POST['course4SubFee2']); 
		}
		if(isset($_POST['course4SubFee3'])){
			$course4SubFee3 = str_replace(' ', '', $_POST['course4SubFee3']); 
		}
		if(isset($_POST['course4SubFee4'])){
			$course4SubFee4 = str_replace(' ', '', $_POST['course4SubFee4']); 
		}
		if(isset($_POST['course4SubFee5'])){
			$course4SubFee5 = str_replace(' ', '', $_POST['course4SubFee5']); 
		}
		
		$course5Product= "";
		$course5 = 0;
		$course5SubFee1 = 0;
		$course5SubFee2 = 0;
		$course5SubFee3 = 0;
		$course5SubFee4 = 0;
		$course5SubFee5 = 0;
		if(isset($_POST['course5ProductCopy'])){
			$course5Product = $_POST['course5ProductCopy'];
		}
		
		if(isset($_POST['course5'])){
			$course5 = str_replace(' ', '', $_POST['course5']);
		}
		if(isset($_POST['course5SubFee1'])){
			$course5SubFee1 = str_replace(' ', '', $_POST['course5SubFee1']); 
		}
		if(isset($_POST['course5SubFee2'])){
			$course5SubFee2 = str_replace(' ', '', $_POST['course5SubFee2']); 
		}
		if(isset($_POST['course5SubFee3'])){
			$course5SubFee3 = str_replace(' ', '', $_POST['course5SubFee3']); 
		}
		if(isset($_POST['course5SubFee4'])){
			$course5SubFee4 = str_replace(' ', '', $_POST['course5SubFee4']);
		}
		if(isset($_POST['course5SubFee5'])){
			$course5SubFee5 = str_replace(' ', '', $_POST['course5SubFee5']); 
		}

		$course6Product= "";
		$course6 = 0;
		$course6SubFee1 = 0;
		$course6SubFee2 = 0;
		$course6SubFee3 = 0;
		$course6SubFee4 = 0;
		$course6SubFee5 = 0;
		if(isset($_POST['course6ProductCopy'])){
			$course6Product = $_POST['course6ProductCopy'];
		}
		
		if(isset($_POST['course6'])){
			$course6 = str_replace(' ', '', $_POST['course6']);
		}
		if(isset($_POST['course6SubFee1'])){
			$course6SubFee1 = str_replace(' ', '', $_POST['course6SubFee1']); 
		}
		if(isset($_POST['course6SubFee2'])){
			$course6SubFee2 = str_replace(' ', '', $_POST['course6SubFee2']); 
		}
		if(isset($_POST['course6SubFee3'])){
			$course6SubFee3 = str_replace(' ', '', $_POST['course6SubFee3']); 
		}
		if(isset($_POST['course6SubFee4'])){
			$course6SubFee4 = str_replace(' ', '', $_POST['course6SubFee4']);
		}
		if(isset($_POST['course6SubFee5'])){
			$course6SubFee5 = str_replace(' ', '', $_POST['course6SubFee5']); 
		}

		$course7Product= "";
		$course7 = 0;
		$course7SubFee1 = 0;
		$course7SubFee2 = 0;
		$course7SubFee3 = 0;
		$course7SubFee4 = 0;
		$course7SubFee5 = 0;
		if(isset($_POST['course7ProductCopy'])){
			$course7Product = $_POST['course7ProductCopy'];
		}
		
		if(isset($_POST['course7'])){
			$course7 = str_replace(' ', '', $_POST['course7']);
		}
		if(isset($_POST['course7SubFee1'])){
			$course7SubFee1 = str_replace(' ', '', $_POST['course7SubFee1']); 
		}
		if(isset($_POST['course7SubFee2'])){
			$course7SubFee2 = str_replace(' ', '', $_POST['course7SubFee2']); 
		}
		if(isset($_POST['course7SubFee3'])){
			$course7SubFee3 = str_replace(' ', '', $_POST['course7SubFee3']); 
		}
		if(isset($_POST['course7SubFee4'])){
			$course7SubFee4 = str_replace(' ', '', $_POST['course7SubFee4']);
		}
		if(isset($_POST['course7SubFee5'])){
			$course7SubFee5 = str_replace(' ', '', $_POST['course7SubFee5']); 
		}

		$course8Product= "";
		$course8 = 0;
		$course8SubFee1 = 0;
		$course8SubFee2 = 0;
		$course8SubFee3 = 0;
		$course8SubFee4 = 0;
		$course8SubFee5 = 0;
		if(isset($_POST['course8ProductCopy'])){
			$course8Product = $_POST['course8ProductCopy'];
		}
		
		if(isset($_POST['course8'])){
			$course8 = str_replace(' ', '', $_POST['course8']);
		}
		if(isset($_POST['course8SubFee1'])){
			$course8SubFee1 = str_replace(' ', '', $_POST['course8SubFee1']); 
		}
		if(isset($_POST['course8SubFee2'])){
			$course8SubFee2 = str_replace(' ', '', $_POST['course8SubFee2']); 
		}
		if(isset($_POST['course8SubFee3'])){
			$course8SubFee3 = str_replace(' ', '', $_POST['course8SubFee3']); 
		}
		if(isset($_POST['course8SubFee4'])){
			$course8SubFee4 = str_replace(' ', '', $_POST['course8SubFee4']);
		}
		if(isset($_POST['course8SubFee5'])){
			$course8SubFee5 = str_replace(' ', '', $_POST['course8SubFee5']); 
		}

		$course9Product= "";
		$course9 = 0;
		$course9SubFee1 = 0;
		$course9SubFee2 = 0;
		$course9SubFee3 = 0;
		$course9SubFee4 = 0;
		$course9SubFee5 = 0;
		if(isset($_POST['course9ProductCopy'])){
			$course9Product = $_POST['course9ProductCopy'];
		}
		
		if(isset($_POST['course9'])){
			$course9 = str_replace(' ', '', $_POST['course9']);
		}
		if(isset($_POST['course9SubFee1'])){
			$course9SubFee1 = str_replace(' ', '', $_POST['course9SubFee1']); 
		}
		if(isset($_POST['course9SubFee2'])){
			$course9SubFee2 = str_replace(' ', '', $_POST['course9SubFee2']); 
		}
		if(isset($_POST['course9SubFee3'])){
			$course9SubFee3 = str_replace(' ', '', $_POST['course9SubFee3']); 
		}
		if(isset($_POST['course9SubFee4'])){
			$course9SubFee4 = str_replace(' ', '', $_POST['course9SubFee4']);
		}
		if(isset($_POST['course9SubFee5'])){
			$course9SubFee5 = str_replace(' ', '', $_POST['course9SubFee5']); 
		}

		$course10Product= "";
		$course10 = 0;
		$course10SubFee1 = 0;
		$course10SubFee2 = 0;
		$course10SubFee3 = 0;
		$course10SubFee4 = 0;
		$course10SubFee5 = 0;
		if(isset($_POST['course10ProductCopy'])){
			$course10Product = $_POST['course10ProductCopy'];
		}
		
		if(isset($_POST['course10'])){
			$course10 = str_replace(' ', '', $_POST['course10']);
		}
		if(isset($_POST['course10SubFee1'])){
			$course10SubFee1 = str_replace(' ', '', $_POST['course10SubFee1']); 
		}
		if(isset($_POST['course10SubFee2'])){
			$course10SubFee2 = str_replace(' ', '', $_POST['course10SubFee2']); 
		}
		if(isset($_POST['course10SubFee3'])){
			$course10SubFee3 = str_replace(' ', '', $_POST['course10SubFee3']); 
		}
		if(isset($_POST['course10SubFee4'])){
			$course10SubFee4 = str_replace(' ', '', $_POST['course10SubFee4']);
		}
		if(isset($_POST['course10SubFee5'])){
			$course10SubFee5 = str_replace(' ', '', $_POST['course10SubFee5']); 
		}
				
		// 费用分配		
		if(isset($_POST['subFee1Name'])){
			$subFee1Name = $_POST['subFee1Name'][0];
		}else{
			$subFee1Name = "费用1";
		}
		if(isset($_POST['subFee2Name'])){
			$subFee2Name = $_POST['subFee2Name'][0];
		}else{
			$subFee2Name = "费用2";
		}
		if(isset($_POST['subFee3Name'])){
			$subFee3Name = $_POST['subFee3Name'][0];
		}else{
			$subFee3Name = "费用3";
		}
		if(isset($_POST['subFee4Name'])){
			$subFee4Name = $_POST['subFee4Name'][0];
		}else{
			$subFee4Name = "费用4";
		}
		if(isset($_POST['subFee5Name'])){
			$subFee5Name = $_POST['subFee5Name'][0];
		}else{
			$subFee5Name = "费用5";
		}			
		
		$str = $_POST['userID'];
		//$uid = intval(substr($str, 1));
		$uid = substr($str, 1);
		date_default_timezone_set('PRC');
		$time = strtotime($_POST['timeAddFee']);
		
	// 交费增加按钮
	if(isset($_POST['submitAddAddFee'])){		
		$sbmt = $pdo -> prepare("insert into addFeeTable (mode, uid, name1,name2,sex,grade,schoolZone1,schoolZone2,schoolZone3, receiptNum,billNum, time,
									priceBK,hour1,priceHour1YDY,pay1,hour2,priceHour2YDY,pay2,hour3,priceHour3YDY,pay3,feeSum,
									course1Product, subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name,
								    course1,course1SubFee1,course1SubFee2,course1SubFee3,course1SubFee4,course1SubFee5,course2Product, 
								    course2,course2SubFee1,course2SubFee2,course2SubFee3,course2SubFee4,course2SubFee5,course3Product, 
								    course3,course3SubFee1,course3SubFee2,course3SubFee3,course3SubFee4,course3SubFee5,course4Product, 
								    course4,course4SubFee1,course4SubFee2,course4SubFee3,course4SubFee4,course4SubFee5,course5Product, 
								    course5,course5SubFee1,course5SubFee2,course5SubFee3,course5SubFee4,course5SubFee5,course6Product, 
								    course6,course6SubFee1,course6SubFee2,course6SubFee3,course6SubFee4,course6SubFee5,course7Product, 
								    course7,course7SubFee1,course7SubFee2,course7SubFee3,course7SubFee4,course7SubFee5,course8Product, 
								    course8,course8SubFee1,course8SubFee2,course8SubFee3,course8SubFee4,course8SubFee5,course9Product, 
								    course9,course9SubFee1,course9SubFee2,course9SubFee3,course9SubFee4,course9SubFee5,course10Product, 
								    course10,course10SubFee1,course10SubFee2,course10SubFee3,course10SubFee4,course10SubFee5
								) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$flagSubOK = $sbmt -> execute(array("j",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['sex'],$_POST['grade'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
									$_POST['receiptNum'],$_POST['billNum'],$time,
									str_replace(' ', '', $_POST['priceBK']),$_POST['hour1'],str_replace(' ', '', $_POST['price1YDY']),str_replace(' ', '', $_POST['pay1']),$_POST['hour2'],str_replace(' ', '', $_POST['price2YDY']),str_replace(' ', '', $_POST['pay2']),$_POST['hour3'],str_replace(' ', '', $_POST['price3YDY']),str_replace(' ', '', $_POST['pay3']), $_POST['feeSum'], 
									$course1Product,$subFee1Name,$subFee2Name,$subFee3Name,$subFee4Name,$subFee5Name,
				 					$course1,$course1SubFee1,$course1SubFee2,$course1SubFee3,$course1SubFee4,$course1SubFee5,$course2Product,
								    $course2,$course2SubFee1,$course2SubFee2,$course2SubFee3,$course2SubFee4,$course2SubFee5,$course3Product,
								    $course3,$course3SubFee1,$course3SubFee2,$course3SubFee3,$course3SubFee4,$course3SubFee5,$course4Product,
								    $course4,$course4SubFee1,$course4SubFee2,$course4SubFee3,$course4SubFee4,$course4SubFee5,$course5Product,
								    $course5,$course5SubFee1,$course5SubFee2,$course5SubFee3,$course5SubFee4,$course5SubFee5,$course6Product,
								    $course6,$course6SubFee1,$course6SubFee2,$course6SubFee3,$course6SubFee4,$course6SubFee5,$course7Product,
								    $course7,$course7SubFee1,$course7SubFee2,$course7SubFee3,$course7SubFee4,$course7SubFee5,$course8Product,
								    $course8,$course8SubFee1,$course8SubFee2,$course8SubFee3,$course8SubFee4,$course8SubFee5,$course9Product,
								    $course9,$course9SubFee1,$course9SubFee2,$course9SubFee3,$course9SubFee4,$course9SubFee5,$course10Product,
								    $course10,$course10SubFee1,$course10SubFee2,$course10SubFee3,$course10SubFee4,$course10SubFee5));
		
				
		if ($flagSubOK) {
			//echo "交费添加成功！";
			
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=studentFee.php>';
			echo "</head>";
			echo "<body>";
			echo "交费添加成功"."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			
			return TRUE;
		} else {
			//echo "交费添加失败！";
			
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=5;url=studentFee.php>';
			echo "</head>";
			echo "<body>";
			echo "交费添加失败"."</br></br>";
			echo "页面将在5秒后自动跳转...</br>";
			echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return FALSE;
		}
	}			
	

	if (isset($_POST['submitUpdateAddFee'])) {
		
		$flagFeeOK = true;
		
		// echo $uid;
// 		
		// echo "<br>";
		// echo $time;
		// echo "<br>";
		// echo $_POST['billNum'];
		// echo "<br>";
	
		//$sbmt12 = $pdo -> prepare("update addFeeTable set feeSum=? where uid=? and course3=?");
		//$flagSubOK12 = $sbmt12 -> execute(array(str_replace(' ', '', $_POST['feeSum']) , $uid, str_replace(' ', '', $_POST['course3'])));
 		//$flagSubOK12 = $sbmt12 -> execute(array(123, 5, 54));
 		//$flagSubOK12 =  FALSE; 		
		
		
		$sbmt = $pdo -> prepare("update addFeeTable set receiptNum=?,billNum=?, time=?,
									priceBK=?,priceHour1YDY=?,pay1=?,priceHour2YDY=?,pay2=?,priceHour3YDY=?,pay3=?,feeSum=?,course1Product=?, 
								    course1=?,course1SubFee1=?,course1SubFee2=?,course1SubFee3=?,course1SubFee4=?,course1SubFee5=?,course2Product=?,
								    course2=?,course2SubFee1=?,course2SubFee2=?,course2SubFee3=?,course2SubFee4=?,course2SubFee5=?,course3Product=?,
								    course3=?,course3SubFee1=?,course3SubFee2=?,course3SubFee3=?,course3SubFee4=?,course3SubFee5=?,course4Product=?,
								    course4=?,course4SubFee1=?,course4SubFee2=?,course4SubFee3=?,course4SubFee4=?,course4SubFee5=?,course5Product=?,
								    course5=?,course5SubFee1=?,course5SubFee2=?,course5SubFee3=?,course5SubFee4=?,course5SubFee5=?,course6Product=?,
								    course6=?,course6SubFee1=?,course6SubFee2=?,course6SubFee3=?,course6SubFee4=?,course6SubFee5=? ,course7Product=?,
								    course7=?,course7SubFee1=?,course7SubFee2=?,course7SubFee3=?,course7SubFee4=?,course7SubFee5=? ,course8Product=?,
								    course8=?,course8SubFee1=?,course8SubFee2=?,course8SubFee3=?,course8SubFee4=?,course8SubFee5=? ,course9Product=?,
								    course9=?,course9SubFee1=?,course9SubFee2=?,course9SubFee3=?,course9SubFee4=?,course9SubFee5=? ,course10Product=?,
								    course10=?,course10SubFee1=?,course10SubFee2=?,course10SubFee3=?,course10SubFee4=?,course10SubFee5=? 
								    where uid=? and time=? and receiptNum=? and billNum=?");
		$flagSubOK = $sbmt -> execute(array($_POST['receiptNum'],$_POST['billNum'],$time,
									str_replace(' ', '', $_POST['priceBK']),str_replace(' ', '', $_POST['price1YDY']),str_replace(' ', '', $_POST['pay1']),str_replace(' ', '', $_POST['price2YDY']),str_replace(' ', '', $_POST['pay2']),str_replace(' ', '', $_POST['price3YDY']),str_replace(' ', '', $_POST['pay3']), $_POST['feeSum'],$course1Product,
				 					$course1,$course1SubFee1,$course1SubFee2,$course1SubFee3,$course1SubFee4,$course1SubFee5,$course2Product,
								    $course2,$course2SubFee1,$course2SubFee2,$course2SubFee3,$course2SubFee4,$course2SubFee5,$course3Product,
								    $course3,$course3SubFee1,$course3SubFee2,$course3SubFee3,$course3SubFee4,$course3SubFee5,$course4Product,
								    $course4,$course4SubFee1,$course4SubFee2,$course4SubFee3,$course4SubFee4,$course4SubFee5,$course5Product,
								    $course5,$course5SubFee1,$course5SubFee2,$course5SubFee3,$course5SubFee4,$course5SubFee5,$course6Product,
								    $course6,$course6SubFee1,$course6SubFee2,$course6SubFee3,$course6SubFee4,$course6SubFee5,$course7Product,
								    $course7,$course7SubFee1,$course7SubFee2,$course7SubFee3,$course7SubFee4,$course7SubFee5,$course8Product,
								    $course8,$course8SubFee1,$course8SubFee2,$course8SubFee3,$course8SubFee4,$course8SubFee5,$course9Product,
								    $course9,$course9SubFee1,$course9SubFee2,$course9SubFee3,$course9SubFee4,$course9SubFee5,$course10Product,
								    $course10,$course10SubFee1,$course10SubFee2,$course10SubFee3,$course10SubFee4,$course10SubFee5,								    
								    $uid, $time,$_POST['receiptNum'],$_POST['billNum']));
		

		//echo $flagSubOK12;
		
		if ($flagSubOK) {
			//echo "交费修改成功！";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=studentFee.php>';
			echo "</head>";
			echo "<body>";
			echo "交费修改成功"."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>";
			
			return TRUE;
		} else {
			//echo "交费修改失败！";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=5;url=studentFee.php>';
			echo "</head>";
			echo "<body>";
			echo "交费修改失败"."</br></br>";
			echo "页面将在5秒后自动跳转...</br>";
			echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>";
			
			return FALSE;
		}
	}

	if (isset($_POST['submitDeleteAddFee'])) {
		$sbmt = $pdo -> prepare("delete from addFeeTable where uid = ? and mode=? and time=? and receiptNum=? and billNum=?");
		$flag = $sbmt -> execute(array($uid, "j",$time,$_POST['receiptNum'],$_POST['billNum']));

		if ($flag){
			//echo "交费删除成功！";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=studentFee.php>';
			echo "</head>";
			echo "<body>";
			echo "交费删除成功"."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>";
			
			return true;
		}else {
			//echo "交费删除失败";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=5;url=studentFee.php>';
			echo "</head>";
			echo "<body>";
			echo "交费删除失败"."</br></br>";
			echo "页面将在5秒后自动跳转...</br>";
			echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>";
			
			return false;
		}
	}
	
	// 学生转费
		if (isset($_POST['submitTypeTrans'])) {
				try {
					$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
				} catch(PDOException $e) {
					echo "数据库连接失败：" . $e -> getMessage();
					exit ;
				}

				// 设置数据库查询的汉字编码也为utf-8
				$pdo -> query('set names utf8');
				
				// 转费额度
				$fee = $_POST['feeSubAdd']; 
										 
				$course1From = 0;
				$course1ProductFrom = "";
				
				$course2From = 0;
				$course2ProductFrom = "";
				
				$course3From = 0;
				$course3ProductFrom = "";
				
				$course4From = 0;
				$course4ProductFrom = "";
				
				$course5From = 0;
				$course5ProductFrom = "";
				
				$course6From = 0;
				$course6ProductFrom = "";
				
				$course7From = 0;
				$course7ProductFrom = "";
				
				$course8From = 0;
				$course8ProductFrom = "";
				
				$course9From = 0;
				$course9ProductFrom = "";
				
				$course10From = 0;
				$course10ProductFrom = "";
				
				
				$course1To = 0;
				$course1ProductTo = "";
				
				$course2To = 0;
				$course2ProductTo = "";
				
				$course3To = 0;
				$course3ProductTo = "";
				
				$course4To = 0;
				$course4ProductTo = "";
				
				$course5To = 0;
				$course5ProductTo = "";
				 
				$course6To = 0;
				$course6ProductTo = "";
				
				$course7To = 0;
				$course7ProductTo = "";
				
				$course8To = 0;
				$course8ProductTo = "";
				
				$course9To = 0;
				$course9ProductTo = "";
				
				$course10To = 0;
				$course10ProductTo = "";				
				
				 switch($_POST['feeFrom']){
					case 1:
						$course1From = -1*$fee;
						$course1ProductFrom = $_POST['feeFromProduct'];
						break;
					case 2:
						$course2From = -1*$fee;
						$course2ProductFrom = $_POST['feeFromProduct'];
						break;
					case 3:
						$course3From = -1*$fee;
						$course3ProductFrom = $_POST['feeFromProduct'];
						break;
					case 4:
						$course4From = -1*$fee;
						$course4ProductFrom = $_POST['feeFromProduct'];
						break;
					case 5:
						$course5From = -1*$fee;
						$course5ProductFrom = $_POST['feeFromProduct'];
						break;
					case 6:
						$course6From = -1*$fee;
						$course6ProductFrom = $_POST['feeFromProduct'];
						break;
					case 7:
						$course7From = -1*$fee;
						$course7ProductFrom = $_POST['feeFromProduct'];
						break;
					case 8:
						$course8From = -1*$fee;
						$course8ProductFrom = $_POST['feeFromProduct'];
						break;
					case 9:
						$course9From = -1*$fee;
						$course9ProductFrom = $_POST['feeFromProduct'];
						break;
					case 10:
						$course10From = -1*$fee;
						$course10ProductFrom = $_POST['feeFromProduct'];
						break;
					default:
						break;
				}
				
				switch($_POST['feeTo']){
					case 1:
						$course1To = $fee;
						$course1ProductTo = $_POST['feeToProduct'];
						break;
					case 2:
						$course2To = $fee;
						$course2ProductTo = $_POST['feeToProduct'];
						break;
					case 3:
						$course3To = $fee;
						$course3ProductTo = $_POST['feeToProduct'];
						break;
					case 4:
						$course4To = $fee;
						$course4ProductTo = $_POST['feeToProduct'];
						break;
					case 5:
						$course5To = $fee;
						$course5ProductTo = $_POST['feeToProduct'];
						break;
					case 6:
						$course6To = $fee;
						$course6ProductTo = $_POST['feeToProduct'];
						break;
					case 7:
						$course7To = $fee;
						$course7ProductTo = $_POST['feeToProduct'];
						break;
					case 8:
						$course8To = $fee;
						$course8ProductTo = $_POST['feeToProduct'];
						break;
					case 9:
						$course9To = $fee;
						$course9ProductTo = $_POST['feeToProduct'];
						break;
					case 10:
						$course10To = $fee;
						$course10ProductTo = $_POST['feeToProduct'];
						break;
					default:
						break;
				}
								 
				date_default_timezone_set('PRC');
				$time = strtotime($_POST['timeTrans']);
				if (isset($_POST['submitAddTrans'])) {
				$sbmtFrom = $pdo -> prepare("insert into addFeeTable (mode,uid, name1,name2, schoolZone1,schoolZone2,schoolZone3,time,course1Product,course1,course2Product,course2, course3Product,course3, course4Product, course4, course5Product,course5,
								course6Product,course6, course7Product,course7, course8Product,course8, course9Product,course9,course10Product,course10, 
								subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name) values( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
				$flagFrom = $sbmtFrom -> execute(array("z",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
								$time,$course1ProductFrom,$course1From,$course2ProductFrom,$course2From,$course3ProductFrom,$course3From,$course4ProductFrom,$course4From,$course5ProductFrom,$course5From,
								$course6ProductFrom,$course6From,$course7ProductFrom,$course7From,$course8ProductFrom,$course8From,$course9ProductFrom,$course9From,$course10ProductFrom,$course10From,
								$subFee1Name,$subFee2Name,$subFee3Name,$subFee4Name,$subFee5Name));
				
				$sbmtTo = $pdo -> prepare("insert into addFeeTable (mode,uid, name1,name2, schoolZone1,schoolZone2,schoolZone3,time,course1Product,course1,course2Product,course2, course3Product,course3, course4Product, course4, course5Product,course5,
								course6Product,course6,course7Product,course7,course8Product,course8,course9Product,course9,course10Product,course10,
								subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name) values( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
				$flagTo = $sbmtTo -> execute(array("z",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
								$time,$course1ProductTo,$course1To,$course2ProductTo,$course2To,$course3ProductTo,$course3To,$course4ProductTo,$course4To,$course5ProductTo,$course5To,
								$course6ProductTo,$course6To,$course7ProductTo,$course7To,$course8ProductTo,$course8To,$course9ProductTo,$course9To,$course10ProductTo,$course10To,
								$subFee1Name,$subFee2Name,$subFee3Name,$subFee4Name,$subFee5Name));
								 
				if (($flagFrom)&&($flagTo)) {
					//echo "转费提交成功！";
					echo "<html>";
					echo "<head>";
					echo '<meta http-equiv="refresh" content=2;url=studentFee.php>';
					echo "</head>";
					echo "<body>";
					echo "转费提交成功"."</br></br>";
					echo "页面将在2秒后自动跳转...</br>";
					echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
					echo "</body>";
					echo "</html>"; 
					return TRUE;
				} else {
					//echo "转费提交失败";
					echo "<html>";
					echo "<head>";
					echo '<meta http-equiv="refresh" content=5;url=studentFee.php>';
					echo "</head>";
					echo "<body>";
					echo "转费提交失败"."</br></br>";
					echo "页面将在5秒后自动跳转...</br>";
					echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
					echo "</body>";
					echo "</html>"; 
					return FALSE;
				}
			 }
			// 学生转费修改
			if (isset($_POST['submitUpdateTrans'])) {
				$sbmt = $pdo -> prepare("update addFeeTable set time=?, course1=?,course2=?, course3=?, course4=?, course5=? where uid=? and time=?");
				$flag = $sbmt -> execute(array($time,$course1,$course2,$course3,$course4,$course5,$uid,$time));
		
				if ($flag) {
					echo "转费修改成功！";
					return TRUE;
				} else {
					echo "转费修改失败";
					return FALSE;
				}
			 }
			// 学生转费删除
			if (isset($_POST['submitDeleteTrans'])) {
				
				$sbmt = $pdo -> prepare("delete from addFeeTable where uid = ? and mode =? and time = ?");
				$flag = $sbmt -> execute(array($uid,"z", $time));
				
				if ($flag) {
					echo "转费删除成功！";
					return TRUE;
				} else {
					echo "转费删除失败";
					return FALSE;
				}
				 
			 }
	
		}

		//
	}

// 提交表单－－退费
if (isset($_POST['submitTypeRefund'])) {
	try {
		$pdo = new PDO("mysql:host=localhost;dbname=mlsJYDB", "root", "123456");
	} catch(PDOException $e) {
		echo "数据库连接失败：" . $e -> getMessage();
		exit ;
	}

	// 设置数据库查询的汉字编码也为utf-8
	$pdo -> query('set names utf8');
	
	date_default_timezone_set('PRC' );

	$course1=0;
	$course2=0;
	$course3=0;
	$course4=0;
	$course5=0;
	$course6=0;
	$course7=0;
	$course8=0;
	$course9=0;
	$course10=0;
	$course1Product="";
	$course2Product="";
	$course3Product="";
	$course4Product="";
	$course5Product="";
	$course6Product="";
	$course7Product="";
	$course8Product="";
	$course9Product="";
	$course10Product="";
	
	if(isset($_POST['remainFee1'])){
		if(isset($_POST['remainFee1CheckBox'])){
			$course1 = str_replace(' ', '', $_POST['remainFee1'])*-1;
			$course1Product = $_POST['refundCourse1Product'];
		}
	}
	if(isset($_POST['remainFee2'])){
		if(isset($_POST['remainFee2CheckBox'])){
			$course2 = str_replace(' ', '', $_POST['remainFee2'])*-1;
			$course2Product = $_POST['refundCourse2Product'];
		}
	}
	if(isset($_POST['remainFee3'])){
		if(isset($_POST['remainFee3CheckBox'])){
			$course3 = str_replace(' ', '', $_POST['remainFee3'])*-1;
			$course3Product = $_POST['refundCourse3Product'];
		}
	}
	if(isset($_POST['remainFee4'])){
		if(isset($_POST['remainFee4CheckBox'])){
			$course4 = str_replace(' ', '', $_POST['remainFee4'])*-1;
			$course4Product = $_POST['refundCourse4Product'];
		}
	}
	if(isset($_POST['remainFee5'])){
		if(isset($_POST['remainFee5CheckBox'])){
			$course5 = str_replace(' ', '', $_POST['remainFee5'])*-1;
			$course5Product = $_POST['refundCourse5Product'];
		}
	}
	if(isset($_POST['remainFee6'])){
		if(isset($_POST['remainFee6CheckBox'])){
			$course6 = str_replace(' ', '', $_POST['remainFee6'])*-1;
			$course6Product = $_POST['refundCourse6Product'];
		}
	}
	if(isset($_POST['remainFee7'])){
		if(isset($_POST['remainFee7CheckBox'])){
			$course7 = str_replace(' ', '', $_POST['remainFee7'])*-1;
			$course7Product = $_POST['refundCourse7Product'];
		}
	}
	if(isset($_POST['remainFee8'])){
		if(isset($_POST['remainFee8CheckBox'])){
			$course8 = str_replace(' ', '', $_POST['remainFee8'])*-1;
			$course8Product = $_POST['refundCourse8Product'];
		}
	}
	if(isset($_POST['remainFee9'])){
		if(isset($_POST['remainFee9CheckBox'])){
			$course9 = str_replace(' ', '', $_POST['remainFee9'])*-1;
			$course9Product = $_POST['refundCourse9Product'];
		}
	}
	if(isset($_POST['remainFee10'])){
		if(isset($_POST['remainFee10CheckBox'])){
			$course10 = str_replace(' ', '', $_POST['remainFee10'])*-1;
			$course10Product = $_POST['refundCourse10Product'];
		}
	}

	$time = strtotime($_POST['timeRefund']);
	
	// 费用分配
	if(isset($_POST['subFee1Name'])){
		$subFee1Name = $_POST['subFee1Name'][0];
	}else{
		$subFee1Name = "费用1";
	}
	if(isset($_POST['subFee2Name'])){
		$subFee2Name = $_POST['subFee2Name'][0];
	}else{
		$subFee2Name = "费用2";
	}
	if(isset($_POST['subFee3Name'])){
		$subFee3Name = $_POST['subFee3Name'][0];
	}else{
		$subFee3Name = "费用3";
	}
	if(isset($_POST['subFee4Name'])){
		$subFee4Name = $_POST['subFee4Name'][0];
	}else{
		$subFee4Name = "费用4";
	}
	if(isset($_POST['subFee5Name'])){
		$subFee5Name = $_POST['subFee5Name'][0];
	}else{
		$subFee5Name = "费用5";
	}
	
	 if (isset($_POST['submitAddRefund'])) {
		$sbmt = $pdo -> prepare("insert into addFeeTable (mode,uid, name1,name2, schoolZone1,schoolZone2,schoolZone3,time,course1Product,course1,course2Product,course2, course3Product,course3,course4Product, course4,course5Product, course5,
						course6Product, course6,course7Product, course7,course8Product, course8,course9Product, course9,course10Product, course10,
						subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$flag = $sbmt -> execute(array("t",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
						$time,$course1Product,$course1,$course2Product,$course2,$course3Product,$course3,$course4Product,$course4,$course5Product,$course5,
						$course6Product,$course6,$course7Product,$course7,$course8Product,$course8,$course9Product,$course9,$course10Product,$course10,
						$subFee1Name,$subFee2Name,$subFee3Name,$subFee4Name,$subFee5Name));
							
		if ($flag) {
			//echo "退费提交成功！";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=2;url=studentFee.php>';
			echo "</head>";
			echo "<body>";
			echo "退费提交成功"."</br></br>";
			echo "页面将在2秒后自动跳转...</br>";
			echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return TRUE;
		} else {
			//echo "退费提交失败";
			echo "<html>";
			echo "<head>";
			echo '<meta http-equiv="refresh" content=5;url=studentFee.php>';
			echo "</head>";
			echo "<body>";
			echo "退费提交失败"."</br></br>";
			echo "页面将在5秒后自动跳转...</br>";
			echo '<a href="studentFee.php">如果没有跳转，请点这里跳转</a>';
			echo "</body>";
			echo "</html>"; 
			return FALSE;
		}
	}
	
	if (isset($_POST['submitUpdateRefund'])) {
		$sbmt = $pdo -> prepare("update addFeeTable set mode=?,uid=?, name1=?,name2=?, schoolZone1=?,schoolZone2=?,schoolZone3=?,time=?,course1=?,course2=?, course3=?, course4=?, course5=?,
						subFee1Name=?,subFee2Name=?,subFee3Name=?,subFee4Name=?,subFee5Name=?,");
		$flag = $sbmt -> execute(array("t",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
						$time,$course1,$course2,$course3,$course4,$course5,
						$subFee1Name,$subFee2Name,$subFee3Name,$subFee4Name,$subFee5Name));
	
		if ($flag) {
			echo "退费修改成功！"; 
			return TRUE;
		} else {
			echo "退费修改失败";
			return FALSE;
		}
	}

	if (isset($_POST['submitDeleteRefund'])) {
		$sbmt = $pdo -> prepare("delete from addFeeTable where uid = ? and mode=? and time = ?");
		$flag = $sbmt -> execute(array($uid,"t", $time));
		
		if ($flag) {
			echo "转费删除成功！";
			return TRUE;
		} else {
			echo "转费删除失败";
			return FALSE;
		}
	}

}
?>