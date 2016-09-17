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
	
	$sbmt1 = $pdo -> prepare("select sum(Math) as sumMath from addFeeTable where uid = ?");
	$sbmt1 -> execute(array($uid));
	if ($sbmt1 -> rowCount() >= 1) {
		$allRows1 = $sbmt1 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows1 = "0";
	}
	
	$sbmt2 = $pdo -> prepare("select sum(Chinese) as sumChinese from addFeeTable where uid = ?");
	$sbmt2 -> execute(array($uid));
	if ($sbmt2 -> rowCount() >= 1) {
		$allRows2 = $sbmt2 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows2 = "0";
	}
	
	$sbmt3 = $pdo -> prepare("select sum(English) as sumEnglish from addFeeTable where uid = ?");
	$sbmt3 -> execute(array($uid));
	if ($sbmt3 -> rowCount() >= 1) {
		$allRows3 = $sbmt3 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows3 = "0";
	}
	
	$sbmt4 = $pdo -> prepare("select sum(Physics) as sumPhysics from addFeeTable where uid = ?");
	$sbmt4 -> execute(array($uid));
	if ($sbmt4 -> rowCount() >= 1) {
		$allRows4 = $sbmt4 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows4 = "0";
	}
	
	$sbmt5 = $pdo -> prepare("select sum(Chemistry) as sumChemistry from addFeeTable where uid = ?");
	$sbmt5 -> execute(array($uid));
	if ($sbmt5 -> rowCount() >= 1) {
		$allRows5 = $sbmt5 -> fetchAll(PDO::FETCH_ASSOC);
	} else {
		$allRows5 = "0";
	}
	
	$aaa = array_merge_recursive($allRows1,$allRows2,$allRows3,$allRows4,$allRows5);
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
	
	$sbmt = $pdo -> prepare("select MathProduct, ChineseProduct,EnglishProduct,PhysicsProduct,ChemistryProduct from addFeeTable where uid = ?");
			
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
							(select sum(Math),IFNULL(sum(Math),0) as anum from addFeeTable where uid = ? and MathProduct like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid = ? and subFeeCourse = ? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "2"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(Chinese),IFNULL(sum(Chinese),0) as anum from addFeeTable where uid=? and ChineseProduct like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "3"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(English),IFNULL(sum(English),0) as anum from addFeeTable where uid=? and EnglishProduct like?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "4"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(Physics),IFNULL(sum(Physics),0) as anum from addFeeTable where uid=? and PhysicsProduct like ?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=? and product like ?) as BB;");
	}
	
	if($flagSubFeeCourse == "5"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(Chemistry),IFNULL(sum(Chemistry),0) as anum from addFeeTable where uid=? and ChemistryProduct like ?) as AA,
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
							(select sum(Math),IFNULL(sum(Math),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "2"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(Chinese),IFNULL(sum(Chinese),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "3"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(English),IFNULL(sum(English),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "4"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(Physics),IFNULL(sum(Physics),0) as anum from addFeeTable where uid=?) as AA,
							(select sum(price),IFNULL(sum(price),0) as bnum from subFeeTable  where uid=? and subFeeCourse=?) as BB;");
	}
	
	if($flagSubFeeCourse == "5"){
		$sbmt = $pdo -> prepare("select AA.anum - BB.bnum as remainFee from
							(select sum(Chemistry),IFNULL(sum(Chemistry),0) as anum from addFeeTable where uid=?) as AA,
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
	
		$MathProduct = "";
		$Math = 0;
		$MathSubFee1 = 0;
		$MathSubFee2 = 0;
		$MathSubFee3 = 0;
		$MathSubFee4 = 0;
		$MathSubFee5 = 0;
		
		if(isset($_POST['MathProductCopy'])){
			$MathProduct = $_POST['MathProductCopy'];
		}			
		if(isset($_POST['Math'])){
			$Math = str_replace(' ', '', $_POST['Math']);
		}
		if(isset($_POST['MathSubFee1'])){
			$MathSubFee1 = str_replace(' ', '', $_POST['MathSubFee1']);
		}
		if(isset($_POST['MathSubFee2'])){
			$MathSubFee2 = str_replace(' ', '', $_POST['MathSubFee2']);
		}
		if(isset($_POST['MathSubFee3'])){
			$MathSubFee3 = str_replace(' ', '', $_POST['MathSubFee3']);
		}
		if(isset($_POST['MathSubFee4'])){
			$MathSubFee4 = str_replace(' ', '', $_POST['MathSubFee4']);
		}
		if(isset($_POST['MathSubFee5'])){
			$MathSubFee5 = str_replace(' ', '', $_POST['MathSubFee5']);
		}

		$ChineseProduct = "";
		$Chinese = 0;
		$ChineseSubFee1 = 0;
		$ChineseSubFee2 = 0;
		$ChineseSubFee3 = 0;
		$ChineseSubFee4 = 0;
		$ChineseSubFee5 = 0;
		
		if(isset($_POST['ChineseProductCopy'])){
			$ChineseProduct = $_POST['ChineseProductCopy'];
		}
		
		if(isset($_POST['Chinese'])){
			$Chinese = str_replace(' ', '', $_POST['Chinese']); 
		}
		if(isset($_POST['ChineseSubFee1'])){
			$ChineseSubFee1 = str_replace(' ', '', $_POST['ChineseSubFee1']);
		}
		if(isset($_POST['ChineseSubFee2'])){
			$ChineseSubFee2 = str_replace(' ', '', $_POST['ChineseSubFee2']); 
		}
		if(isset($_POST['ChineseSubFee3'])){
			$ChineseSubFee3 = str_replace(' ', '', $_POST['ChineseSubFee3']); 
		}
		if(isset($_POST['ChineseSubFee4'])){
			$ChineseSubFee4 = str_replace(' ', '', $_POST['ChineseSubFee4']);
		}
		if(isset($_POST['ChineseSubFee5'])){
			$ChineseSubFee5 = str_replace(' ', '', $_POST['ChineseSubFee5']);
		}
		
		$EnglishProduct = "";
		$English = 0;
		$EnglishSubFee1 = 0;
		$EnglishSubFee2 = 0;
		$EnglishSubFee3 = 0;
		$EnglishSubFee4 = 0;
		$EnglishSubFee5 = 0;
		
		if(isset($_POST['EnglishProductCopy'])){
			$EnglishProduct = $_POST['EnglishProductCopy'];
		}
		
		if(isset($_POST['English'])){
			$English = str_replace(' ', '', $_POST['English']); 
		}
		if(isset($_POST['EnglishSubFee1'])){
			$EnglishSubFee1 = str_replace(' ', '', $_POST['EnglishSubFee1']); 
		}
		if(isset($_POST['EnglishSubFee2'])){
			$EnglishSubFee2 = str_replace(' ', '', $_POST['EnglishSubFee2']);
		}
		if(isset($_POST['EnglishSubFee3'])){
			$EnglishSubFee3 = str_replace(' ', '', $_POST['EnglishSubFee3']);
		}
		if(isset($_POST['EnglishSubFee4'])){
			$EnglishSubFee4 = str_replace(' ', '', $_POST['EnglishSubFee4']); 
		}
		if(isset($_POST['EnglishSubFee5'])){
			$EnglishSubFee5 = str_replace(' ', '', $_POST['EnglishSubFee4']); 
		}
		
		$PhysicsProduct = "";
		$Physics = 0;
		$PhysicsSubFee1 = 0;
		$PhysicsSubFee2 = 0;
		$PhysicsSubFee3 = 0;
		$PhysicsSubFee4 = 0;
		$PhysicsSubFee5 = 0;
		
		if(isset($_POST['PhysicsProductCopy'])){
			$PhysicsProduct = $_POST['PhysicsProductCopy'];
		}
		
		if(isset($_POST['Physics'])){
			$Physics = str_replace(' ', '', $_POST['Physics']);
		}
		if(isset($_POST['PhysicsSubFee1'])){
			$PhysicsSubFee1 = str_replace(' ', '', $_POST['PhysicsSubFee1']);
		}
		if(isset($_POST['PhysicsSubFee2'])){
			$PhysicsSubFee2 = str_replace(' ', '', $_POST['PhysicsSubFee2']); 
		}
		if(isset($_POST['PhysicsSubFee3'])){
			$PhysicsSubFee3 = str_replace(' ', '', $_POST['PhysicsSubFee3']); 
		}
		if(isset($_POST['PhysicsSubFee4'])){
			$PhysicsSubFee4 = str_replace(' ', '', $_POST['PhysicsSubFee4']); 
		}
		if(isset($_POST['PhysicsSubFee5'])){
			$PhysicsSubFee5 = str_replace(' ', '', $_POST['PhysicsSubFee5']); 
		}
		
		$ChemistryProduct= "";
		$Chemistry = 0;
		$ChemistrySubFee1 = 0;
		$ChemistrySubFee2 = 0;
		$ChemistrySubFee3 = 0;
		$ChemistrySubFee4 = 0;
		$ChemistrySubFee5 = 0;
		if(isset($_POST['ChemistryProductCopy'])){
			$ChemistryProduct = $_POST['ChemistryProductCopy'];
		}
		
		if(isset($_POST['Chemistry'])){
			$Chemistry = str_replace(' ', '', $_POST['Chemistry']);
		}
		if(isset($_POST['ChemistrySubFee1'])){
			$ChemistrySubFee1 = str_replace(' ', '', $_POST['ChemistrySubFee1']); 
		}
		if(isset($_POST['ChemistrySubFee2'])){
			$ChemistrySubFee2 = str_replace(' ', '', $_POST['ChemistrySubFee2']); 
		}
		if(isset($_POST['ChemistrySubFee3'])){
			$ChemistrySubFee3 = str_replace(' ', '', $_POST['ChemistrySubFee3']); 
		}
		if(isset($_POST['ChemistrySubFee4'])){
			$ChemistrySubFee4 = str_replace(' ', '', $_POST['ChemistrySubFee4']);
		}
		if(isset($_POST['ChemistrySubFee5'])){
			$ChemistrySubFee5 = str_replace(' ', '', $_POST['ChemistrySubFee5']); 
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
		/*
		 if ($_POST['fee'] == $_POST['feeMath'] + $_POST['feeChinese'] + $_POST['feeEnglish'] + $_POST['feePhysics'] + $_POST['feeChemistry'] + $_POST['feeMathDoc'] + $_POST['feeChineseDoc'] + $_POST['feeEnglishDoc'] + $_POST['feePhysicsDoc'] + $_POST['feeChemistryDoc']) {
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
		 */
		
		/*		
		// 48个
		$sbmt = $pdo -> prepare("insert into addFeeTable (mode, uid, name, schoolZone1,schoolZone2,schoolZone3, receiptNum,billNum, time,
									priceBK,hour1,priceHour1YDY,pay1,hour2,priceHour2YDY,pay2,hour3,priceHour3YDY,pay3,feeSum,MathProduct, 
								    Math,MathSubFee1,MathSubFee2,MathSubFee3,MathSubFee4,MathSubFee5,ChineseProduct, 
								    Chinese,ChineseSubFee1,ChineseSubFee2,ChineseSubFee3,ChineseSubFee4,ChineseSubFee5,EnglishProduct, 
								    English,EnglishSubFee1,EnglishSubFee2,EnglishSubFee3,EnglishSubFee4,EnglishSubFee5,PhysicsProduct, 
								    Physics,PhysicsSubFee1,PhysicsSubFee2,PhysicsSubFee3,PhysicsSubFee4,PhysicsSubFee5,ChemistryProduct, 
								    Chemistry,ChemistrySubFee1,ChemistrySubFee2,ChemistrySubFee3,ChemistrySubFee4,ChemistrySubFee5
								) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$flagSubOK = $sbmt -> execute(array("j",$uid,$_POST['userName'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
									$_POST['receiptNum'],$_POST['billNum'],$time,
									str_replace(' ', '', $_POST['priceBK']),$_POST['hour1'],str_replace(' ', '', $_POST['price1YDY']),str_replace(' ', '', $_POST['pay1']),$_POST['hour2'],str_replace(' ', '', $_POST['price2YDY']),str_replace(' ', '', $_POST['pay2']),$_POST['hour3'],str_replace(' ', '', $_POST['price3YDY']),str_replace(' ', '', $_POST['pay3']), $_POST['feeSum'], $MathProduct,
				 					$Math,$MathSubFee1,$MathSubFee2,$MathSubFee3,$MathSubFee4,$MathSubFee5,$ChineseProduct,
								    $Chinese,$ChineseSubFee1,$ChineseSubFee2,$ChineseSubFee3,$ChineseSubFee4,$ChineseSubFee5,$EnglishProduct,
								    $English,$EnglishSubFee1,$EnglishSubFee2,$EnglishSubFee3,$EnglishSubFee4,$EnglishSubFee5,$PhysicsProduct,
								    $Physics,$PhysicsSubFee1,$PhysicsSubFee2,$PhysicsSubFee3,$PhysicsSubFee4,$PhysicsSubFee5,$ChemistryProduct,
								    $Chemistry,$ChemistrySubFee1,$ChemistrySubFee2,$ChemistrySubFee3,$ChemistrySubFee4,$ChemistrySubFee5));
		*/
		$sbmt = $pdo -> prepare("insert into addFeeTable (mode, uid, name1,name2,sex,grade,schoolZone1,schoolZone2,schoolZone3, receiptNum,billNum, time,
									priceBK,hour1,priceHour1YDY,pay1,hour2,priceHour2YDY,pay2,hour3,priceHour3YDY,pay3,feeSum,MathProduct, 
								   	subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name,
								    Math,MathSubFee1,MathSubFee2,MathSubFee3,MathSubFee4,MathSubFee5,ChineseProduct, 
								    Chinese,ChineseSubFee1,ChineseSubFee2,ChineseSubFee3,ChineseSubFee4,ChineseSubFee5,EnglishProduct, 
								    English,EnglishSubFee1,EnglishSubFee2,EnglishSubFee3,EnglishSubFee4,EnglishSubFee5,PhysicsProduct, 
								    Physics,PhysicsSubFee1,PhysicsSubFee2,PhysicsSubFee3,PhysicsSubFee4,PhysicsSubFee5,ChemistryProduct, 
								    Chemistry,ChemistrySubFee1,ChemistrySubFee2,ChemistrySubFee3,ChemistrySubFee4,ChemistrySubFee5
								) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$flagSubOK = $sbmt -> execute(array("j",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['sex'],$_POST['grade'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
									$_POST['receiptNum'],$_POST['billNum'],$time,
									str_replace(' ', '', $_POST['priceBK']),$_POST['hour1'],str_replace(' ', '', $_POST['price1YDY']),str_replace(' ', '', $_POST['pay1']),$_POST['hour2'],str_replace(' ', '', $_POST['price2YDY']),str_replace(' ', '', $_POST['pay2']),$_POST['hour3'],str_replace(' ', '', $_POST['price3YDY']),str_replace(' ', '', $_POST['pay3']), $_POST['feeSum'], $MathProduct,
				 					$subFee1Name,$subFee2Name,$subFee3Name,$subFee4Name,$subFee5Name,
				 					$Math,$MathSubFee1,$MathSubFee2,$MathSubFee3,$MathSubFee4,$MathSubFee5,$ChineseProduct,
								    $Chinese,$ChineseSubFee1,$ChineseSubFee2,$ChineseSubFee3,$ChineseSubFee4,$ChineseSubFee5,$EnglishProduct,
								    $English,$EnglishSubFee1,$EnglishSubFee2,$EnglishSubFee3,$EnglishSubFee4,$EnglishSubFee5,$PhysicsProduct,
								    $Physics,$PhysicsSubFee1,$PhysicsSubFee2,$PhysicsSubFee3,$PhysicsSubFee4,$PhysicsSubFee5,$ChemistryProduct,
								    $Chemistry,$ChemistrySubFee1,$ChemistrySubFee2,$ChemistrySubFee3,$ChemistrySubFee4,$ChemistrySubFee5));
		
				
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
	
		//$sbmt12 = $pdo -> prepare("update addFeeTable set feeSum=? where uid=? and English=?");
		//$flagSubOK12 = $sbmt12 -> execute(array(str_replace(' ', '', $_POST['feeSum']) , $uid, str_replace(' ', '', $_POST['English'])));
 		//$flagSubOK12 = $sbmt12 -> execute(array(123, 5, 54));
 		//$flagSubOK12 =  FALSE; 		
		
		
		$sbmt = $pdo -> prepare("update addFeeTable set receiptNum=?,billNum=?, time=?,
									priceBK=?,priceHour1YDY=?,pay1=?,priceHour2YDY=?,pay2=?,priceHour3YDY=?,pay3=?,feeSum=?,MathProduct=?, 
								    Math=?,MathSubFee1=?,MathSubFee2=?,MathSubFee3=?,MathSubFee4=?,MathSubFee5=?,ChineseProduct=?,
								    Chinese=?,ChineseSubFee1=?,ChineseSubFee2=?,ChineseSubFee3=?,ChineseSubFee4=?,ChineseSubFee5=?,EnglishProduct=?,
								    English=?,EnglishSubFee1=?,EnglishSubFee2=?,EnglishSubFee3=?,EnglishSubFee4=?,EnglishSubFee5=?,PhysicsProduct=?,
								    Physics=?,PhysicsSubFee1=?,PhysicsSubFee2=?,PhysicsSubFee3=?,PhysicsSubFee4=?,PhysicsSubFee5=?,ChemistryProduct=?,
								    Chemistry=?,ChemistrySubFee1=?,ChemistrySubFee2=?,ChemistrySubFee3=?,ChemistrySubFee4=?,ChemistrySubFee5=? where uid=? and time=? and receiptNum=? and billNum=?");
		$flagSubOK = $sbmt -> execute(array($_POST['receiptNum'],$_POST['billNum'],$time,
									str_replace(' ', '', $_POST['priceBK']),str_replace(' ', '', $_POST['price1YDY']),str_replace(' ', '', $_POST['pay1']),str_replace(' ', '', $_POST['price2YDY']),str_replace(' ', '', $_POST['pay2']),str_replace(' ', '', $_POST['price3YDY']),str_replace(' ', '', $_POST['pay3']), $_POST['feeSum'],$MathProduct,
				 					$Math,$MathSubFee1,$MathSubFee2,$MathSubFee3,$MathSubFee4,$MathSubFee5,$ChineseProduct,
								    $Chinese,$ChineseSubFee1,$ChineseSubFee2,$ChineseSubFee3,$ChineseSubFee4,$ChineseSubFee5,$EnglishProduct,
								    $English,$EnglishSubFee1,$EnglishSubFee2,$EnglishSubFee3,$EnglishSubFee4,$EnglishSubFee5,$PhysicsProduct,
								    $Physics,$PhysicsSubFee1,$PhysicsSubFee2,$PhysicsSubFee3,$PhysicsSubFee4,$PhysicsSubFee5,$ChemistryProduct,
								    $Chemistry,$ChemistrySubFee1,$ChemistrySubFee2,$ChemistrySubFee3,$ChemistrySubFee4,$ChemistrySubFee5, $uid, $time,$_POST['receiptNum'],$_POST['billNum']));
		

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
				
				// $Math=0;
				// $Chinese=0;
				// $English=0;
				// $Physics=0;
				// $Chemistry=0;
				/*
				switch($_POST['feeFrom']){
					case 1:
						$Math = -1*$fee;
						break;
					case 2:
						$Chinese = -1*$fee;
						break;
					case 3:
						$English = -1*$fee;
						break;
					case 4:
						$Physics = -1*$fee;
						break;
					case 5:
						$Chemistry = -1*$fee;
						break;
					default:
						break;
				}
				
				switch($_POST['feeTo']){
					case 1:
						$Math = $fee;
						break;
					case 2:
						$Chinese = $fee;
						break;
					case 3:
						$English = $fee;
						break;
					case 4:
						$Physics = $fee;
						break;
					case 5:
						$Chemistry = $fee;
						break;
					default:
						break;
				}
								 
				date_default_timezone_set('PRC');
				$time = strtotime($_POST['timeTrans']);
				if (isset($_POST['submitAddTrans'])) {
				$sbmt = $pdo -> prepare("insert into addFeeTable (mode,uid, name1,name2, schoolZone1,schoolZone2,schoolZone3,time,Math,Chinese, English, Physics, Chemistry,
								subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name) values( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
				$flag = $sbmt -> execute(array("z",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
								$time,$Math,$Chinese,$English,$Physics,$Chemistry,
								$subFee1Name,$subFee2Name,$subFee3Name,$subFee4Name,$subFee5Name));
				 */
				 
				$MathFrom = 0;
				$MathProductFrom = "";
				
				$ChineseFrom = 0;
				$ChineseProductFrom = "";
				
				$EnglishFrom = 0;
				$EnglishProductFrom = "";
				
				$PhysicsFrom = 0;
				$PhysicsProductFrom = "";
				
				$ChemistryFrom = 0;
				$ChemistryProductFrom = "";
				
				
				$MathTo = 0;
				$MathProductTo = "";
				
				$ChineseTo = 0;
				$ChineseProductTo = "";
				
				$EnglishTo = 0;
				$EnglishProductTo = "";
				
				$PhysicsTo = 0;
				$PhysicsProductTo = "";
				
				$ChemistryTo = 0;
				$ChemistryProductTo = "";
				 
				 switch($_POST['feeFrom']){
					case 1:
						$MathFrom = -1*$fee;
						$MathProductFrom = $_POST['feeFromProduct'];
						break;
					case 2:
						$ChineseFrom = -1*$fee;
						$ChineseProductFrom = $_POST['feeFromProduct'];
						break;
					case 3:
						$EnglishFrom = -1*$fee;
						$EnglishProductFrom = $_POST['feeFromProduct'];
						break;
					case 4:
						$PhysicsFrom = -1*$fee;
						$PhysicsProductFrom = $_POST['feeFromProduct'];
						break;
					case 5:
						$ChemistryFrom = -1*$fee;
						$ChemistryProductFrom = $_POST['feeFromProduct'];
						break;
					default:
						break;
				}
				
				switch($_POST['feeTo']){
					case 1:
						$MathTo = $fee;
						$MathProductTo = $_POST['feeToProduct'];
						break;
					case 2:
						$ChineseTo = $fee;
						$ChineseProductTo = $_POST['feeToProduct'];
						break;
					case 3:
						$EnglishTo = $fee;
						$EnglishProductTo = $_POST['feeToProduct'];
						break;
					case 4:
						$PhysicsTo = $fee;
						$PhysicsProductTo = $_POST['feeToProduct'];
						break;
					case 5:
						$ChemistryTo = $fee;
						$ChemistryProductTo = $_POST['feeToProduct'];
						break;
					default:
						break;
				}
								 
				date_default_timezone_set('PRC');
				$time = strtotime($_POST['timeTrans']);
				if (isset($_POST['submitAddTrans'])) {
				$sbmtFrom = $pdo -> prepare("insert into addFeeTable (mode,uid, name1,name2, schoolZone1,schoolZone2,schoolZone3,time,MathProduct,Math,ChineseProduct,Chinese, EnglishProduct,English, PhysicsProduct, Physics, ChemistryProduct,Chemistry,
								subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name) values( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
				$flagFrom = $sbmtFrom -> execute(array("z",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
								$time,$MathProductFrom,$MathFrom,$ChineseProductFrom,$ChineseFrom,$EnglishProductFrom,$EnglishFrom,$PhysicsProductFrom,$PhysicsFrom,$ChemistryProductFrom,$ChemistryFrom,
								$subFee1Name,$subFee2Name,$subFee3Name,$subFee4Name,$subFee5Name));
				
				$sbmtTo = $pdo -> prepare("insert into addFeeTable (mode,uid, name1,name2, schoolZone1,schoolZone2,schoolZone3,time,MathProduct,Math,ChineseProduct,Chinese, EnglishProduct,English, PhysicsProduct, Physics, ChemistryProduct,Chemistry,
								subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name) values( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
				$flagTo = $sbmtTo -> execute(array("z",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
								$time,$MathProductTo,$MathTo,$ChineseProductTo,$ChineseTo,$EnglishProductTo,$EnglishTo,$PhysicsProductTo,$PhysicsTo,$ChemistryProductTo,$ChemistryTo,
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
				$sbmt = $pdo -> prepare("update addFeeTable set time=?, Math=?,Chinese=?, English=?, Physics=?, Chemistry=? where uid=? and time=?");
				$flag = $sbmt -> execute(array($time,$Math,$Chinese,$English,$Physics,$Chemistry,$uid,$time));
		
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

	$Math=0;
	$Chinese=0;
	$English=0;
	$Physics=0;
	$Chemistry=0;
	$MathProduct="";
	$ChineseProduct="";
	$EnglishProduct="";
	$PhysicsProduct="";
	$ChemistryProduct="";
	
	if(isset($_POST['remainFee1'])){
		if(isset($_POST['remainFee1CheckBox'])){
			$Math = str_replace(' ', '', $_POST['remainFee1'])*-1;
			$MathProduct = $_POST['refundMathProduct'];
		}
	}
	if(isset($_POST['remainFee2'])){
		if(isset($_POST['remainFee2CheckBox'])){
			$Chinese = str_replace(' ', '', $_POST['remainFee2'])*-1;
			$ChineseProduct = $_POST['refundChineseProduct'];
		}
	}
	if(isset($_POST['remainFee3'])){
		if(isset($_POST['remainFee3CheckBox'])){
			$English = str_replace(' ', '', $_POST['remainFee3'])*-1;
			$EnglishProduct = $_POST['refundEnglishProduct'];
		}
	}
	if(isset($_POST['remainFee4'])){
		if(isset($_POST['remainFee4CheckBox'])){
			$Physics = str_replace(' ', '', $_POST['remainFee4'])*-1;
			$PhysicsProduct = $_POST['refundPhysicsProduct'];
		}
	}
	if(isset($_POST['remainFee5'])){
		if(isset($_POST['remainFee5CheckBox'])){
			$Chemistry = str_replace(' ', '', $_POST['remainFee5'])*-1;
			$ChemistryProduct = $_POST['refundChemistryProduct'];
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
	
	/*
	if (isset($_POST['submitAddRefund'])) {
		$sbmt = $pdo -> prepare("insert into addFeeTable (mode,uid, name1,name2, schoolZone1,schoolZone2,schoolZone3,time,Math,Chinese, English, Physics, Chemistry,
						subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$flag = $sbmt -> execute(array("t",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
						$time,$Math,$Chinese,$English,$Physics,$Chemistry,
						$subFee1Name,$subFee2Name,$subFee3Name,$subFee4Name,$subFee5Name));
	 */
	 if (isset($_POST['submitAddRefund'])) {
		$sbmt = $pdo -> prepare("insert into addFeeTable (mode,uid, name1,name2, schoolZone1,schoolZone2,schoolZone3,time,MathProduct,Math,ChineseProduct,Chinese, EnglishProduct,English,PhysicsProduct, Physics,ChemistryProduct, Chemistry,
						subFee1Name,subFee2Name,subFee3Name,subFee4Name,subFee5Name) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$flag = $sbmt -> execute(array("t",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
						$time,$MathProduct,$Math,$ChineseProduct,$Chinese,$EnglishProduct,$English,$PhysicsProduct,$Physics,$ChemistryProduct,$Chemistry,
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
		$sbmt = $pdo -> prepare("update addFeeTable set mode=?,uid=?, name1=?,name2=?, schoolZone1=?,schoolZone2=?,schoolZone3=?,time=?,Math=?,Chinese=?, English=?, Physics=?, Chemistry=?,
						subFee1Name=?,subFee2Name=?,subFee3Name=?,subFee4Name=?,subFee5Name=?,");
		$flag = $sbmt -> execute(array("t",$uid,$_POST['userName1'],$_POST['userName2'],$_POST['schoolZone1'],$_POST['schoolZone2'],$_POST['schoolZone3'],
						$time,$Math,$Chinese,$English,$Physics,$Chemistry,
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