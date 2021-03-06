<?php
header("Content-Type:text/html;charset=utf-8");
// 验证身份
include 'verifyIDAdmin.php';
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
		<!-- 强制不使用浏览器缓存 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache, must-revalidate"/>
		<meta http-equiv="expires" content="0"/>

		<title>学生费用</title>

		<link rel="stylesheet" type="text/css" href="../css/studentFee.css" />
		<script src="../js/common.js"></script>
		<script src="../js/studentFee.js"></script>
		<!--datepicker -->
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

				jQuery('#datetimeImage').datetimepicker({
					showOn : "button",
					buttonImage : "../jquery/jquery1.10.3/demos/images/calendar.gif",
					buttonImageOnly : true,
					closeText : '确定',
					dateFormat : "yy-mm-dd",
					timeFormat : "HH:mm:ss",
					hourGrid : 3,
					minuteGrid : 10,
					numberOfMonths : 1
				});

				$(".date_1").datepicker({
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

		<style>
			body {
				font: 16px Arial, "宋体";
			}

			.btn {
				width: 6ex;
			}

			.table1Input {
				width: 15ex;
			}

			.rowBgColorOdd {
				background-color: #fefefe;
			}

			.rowBgColorEven {
				background-color: #f6f6f6;
			}
		</style>

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

	</head>
	<body onload="initPage()">
		<form onsubmit=" return checkAndSubmit()" action="fee.php" method="post">
			<table id="studentInfoTable" align="center" width="920" border="0" cellpadding="0" cellspacing="0">
				<caption align="center">
					<h3>学生费用</h3>
				</caption>
				<tr>
					<td rowspan="3">
					<table align="center" width="500" border="2" cellpadding="0" cellspacing="0" >
						<tr>
							<th>学生ID</th>
							<td>
							<input type="text" name="userID" value="" class="table1Input" readonly/>
							(保留，不填写) </td>
						</tr>

						<tr>
							<th>姓 名1</th>
							<td>
							<input type="text" name="userName1" class="table1Input" required onblur="sqlInfoByName()"/>
							<input type="button" name="previous" value="上一个" onclick="recordWithSameName('previous')" disabled="true"/>
							<input type="button" name="next" value="下一个" onclick="recordWithSameName('next')" disabled="true"/>
							</td>

						</tr>
						<tr>
							<th>姓 名2</th>
							<td>
							<input type="text" name="userName2" class="table1Input" readonly="true"/>
							</td>

						</tr>

						<tr>
							<th>性别</th>
							<td>
							<input type="text" name="sex" class="table1Input" readonly="ture"/>
							</td>
						</tr>

						<tr>
							<th>年 级</th>
							<td>
							<input type="text" name="grade" class="table1Input" readonly="true"/>
							<!--
							<select name="grade" style="width: 16ex" disabled>
							<option value="0">--请选择--</option>
							<option value="7">初一</option>
							<option value="8">初二</option>
							<option value="9">初三</option>
							<option value="10">高一</option>
							<option value="11">高二</option>
							<option value="12">高三</option>
							</select>
							--></td>
						</tr>

						<tr>
							<th>班 级</th>
							<td>
							<input type="text" name="class" class="table1Input"  readonly/>
							</td>
						</tr>

						<tr>
							<th>校 区1</th>
							<td>
							<input type="text" name="schoolZone1" class="table1Input" value="" readonly/>
							</td>
						</tr>
						<tr>
							<th>校 区2</th>
							<td>
							<input type="text" name="schoolZone2" value="" class="table1Input"  readonly/>
							</td>
						</tr>
						<tr>
							<th>校 区3</th>
							<td>
							<input type="text" name="schoolZone3" value="" class="table1Input"  readonly/>
							</td>
						</tr>
						<tr>
							<th>学 校1</th>
							<td>
							<input type="text" name="school1" class="table1Input" readonly />
							</td>
						</tr>

						<tr>
							<th>学 校2</th>
							<td>
							<input type="text" name="school2" class="table1Input" readonly />
							</td>
						</tr>

						<tr>
							<th>学生电话</th>
							<td>
							<input type="text" name="studentTel" class="table1Input"  readonly/>
							</td>
						</tr>
						<tr>
							<th>妈妈电话</th>
							<td>
							<input type="text" name="motherTel" class="table1Input" readonly/>
							</td>
						</tr>

						<tr>
							<th>爸爸电话</th>
							<td>
							<input type="text" name="fatherTel" class="table1Input" readonly/>
							</td>
						</tr>

						<tr>
							<th>家庭地址</th>
							<td>
							<input type="text" name="address" class="table1Input" readonly/>
							</td>
						</tr>
						<tr>
							<th>报名时间：</th>
							<td><!-- <input type="text" class="date_1" style="width: 15ex"  name="time"	readonly="true" /> -->
							<input type="text" style="width: 15ex"  name="time"	readonly="true" />
							</td>
						</tr>
						<!--
						<tr>
						<td colspan="2" align="center">
						<input type="button" class="btn" name="btnPrevious" value="上一个" disabled="true" onclick="previous()" />
						<input type="button" class="btn" name="btnNext" value="下一个" disabled="true" onclick="next()" />
						<input type="hidden" name="submitTypeSQL" />
						<input type="button" class="btn" name="btnSqlName" value="查询" onclick="sqlInfoByName()" />
						</td>
						</tr>
						-->
					</table></td>

				<tr>
					<!-- <td>
					12
					</td> -->
					<td>
					<table id="transFeeTable" align="center" width="400" border="2" cellpadding="0" cellspacing="0">
						<!-- 					<form action="feeTrans.php" method="post"> -->
						<caption align="center">
							<b>学生转费</b>
						</caption>
						<tr>
							<th>转费时间</th>
							<td>
							<input type="text" class="date_1" name="timeTrans" readonly/>
							</td>
						</tr>

						<tr>
							<th>转出科目</th>
							<td>
							<select name="feeFrom" onchange="loadCourseProduct(this)">
								<option value="0">--请选择--</option>
							</select>
							<select name="feeFromWay" onchange="loadFeeFromProduct()">
								<option value="0">--请选择--</option>
							</select>
							<input type="hidden" name="feeFromProduct" />
							</td>
						</tr>
						<tr>
							<th>转入科目</th>
							<td>
							<select name="feeTo" onchange="loadCourseProduct(this)">
								<option value="0">--请选择--</option>
							</select>
							<select name="feeToWay"  onchange="loadFeeToProduct()">
								<option value="0">--请选择--</option>
							</select>
							<input type="hidden" name="feeToProduct" />
							</td>
						</tr>
						<tr>
							<th>额度</th>
							<td>
							<input type="number" name="feeSubAdd" />
							（提示：额度不能超过余额） </td>
						</tr>
						<tr>
							<th></th>
							<td> （提示：选择科目后才自动载入产品！） </td>
						</tr>

						<tr>
							<td colspan="2" align="center">
							<input type="hidden" name="submitTypeTrans" />
							<!-- <input type="button" class="btn" name="buttonSqlTrans" value="上一个" disabled="true" onclick="previous()" />
							<input type="button" class="btn" name="buttonSqlTrans" value="下一个" disabled="true" onclick="next()" />
							<br />--><!-- <input type="button" class="btn" name="buttonSqlTrans" value="查询" onclick="sqlRecord()" /> -->
							<input type="submit" style="width: 8em" class="btn" name="submitAddTrans" value="增加" onclick="checkHiddenValueBtnType('z')"/>
							<!--<input type="submit" class="btn" name="submitUpdateTrans" value="修改" onclick="checkHiddenValueBtnType('z')" disabled="true"/>
							<input type="submit" class="btn" name="submitDeleteTrans" value="删除" onclick="checkHiddenValueBtnType('z')" disabled="true"/>
							--></td>
						</tr>
						<!-- 					</form> -->
					</table></td>

				</tr>

				<tr >
					<!-- <td>
					34
					</td> -->

					<td colspan="2">
					<table align="center" width="400" border="0" cellpadding="0" cellspacing="0">
						<!-- 					<form name="refundTable" action="refund.php" method="post"> -->
						<caption align="center">
							<b>学生退费</b>
						</caption>
						<tr>
							<th>退费时间</th>

							<td>
							<input type="text" class="date_1" name="timeRefund" readonly/>
							</td>
						</tr>

						<tr>
							<th>余额</th>

							<td> 总余额
							<input type="number" name="remainFeeSum" value="" readonly="true"/>
							<br />
							<input type="hidden" name="remainFee1Hide" step="0.1" />
							<input type="hidden" name="remainFee2Hide" step="0.1" />
							<input type="hidden" name="remainFee3Hide" step="0.1" />
							<input type="hidden" name="remainFee4Hide" step="0.1" />
							<input type="hidden" name="remainFee5Hide" step="0.1" />
							<span id="RemainFee1Label"> <!--course1
								<input type="number" name="remainFee1" readonly="true" />
								元 <label for="remainFee1"><input type="checkbox" style="width: 1em" id="remainFee1" name="remainFee1CheckBox"/>
								退费</label>
								-->
								<br />
							</span><span id="RemainFee2Label"> <!--
								course2
								<input type="number" name="remainFee2" readonly="true"  />
								元 <label for="remainFee2">
								<input type="checkbox" style="width: 1em" id="remainFee2" name="remainFee2CheckBox"/>
								退费</label>
								-->
								<br />
							</span><span id="RemainFee3Label"> <!--
								course3
								<input type="number" name="remainFee3" readonly="true"  />
								元 <label for="remainFee3">
								<input type="checkbox" style="width: 1em" id="remainFee3" name="remainFee3CheckBox" />
								退费</label>
								-->
								<br />
							</span><span id="RemainFee4Label"> <!--
								course4
								<input type="number" name="remainFee4" readonly="true"  />
								元 <label for="remainFee4">
								<input type="checkbox" style="width: 1em" id="remainFee4" name="remainFee4CheckBox" />
								退费</label>
								-->
								<br />
							</span><span id="RemainFee5Label"> <!--
								course5
								<input type="number" name="remainFee5"  readonly="true" />
								元 <label for="remainFee5">
								<input type="checkbox" style="width: 1em" id="remainFee5" name="remainFee5CheckBox" />
								退费</label>
								<br />
								--> </span><span id="RemainFee6Label"> <!--
								course6
								<input type="number" name="remainFee6"  readonly="true" />
								元 <label for="remainFee6">
								<input type="checkbox" style="width: 1em" id="remainFee6" name="remainFee6CheckBox" />
								退费</label>
								-->
								<br />
							</span><span id="RemainFee7Label"> <!--
								course7
								<input type="number" name="remainFee7"  readonly="true" />
								元 <label for="remainFee7">
								<input type="checkbox" style="width: 1em" id="remainFee7" name="remainFee7CheckBox" />
								退费</label>
								-->
								<br />
							</span><span id="RemainFee8Label"> <!--
								course8
								<input type="number" name="remainFee8"  readonly="true" />
								元 <label for="remainFee8">
								<input type="checkbox" style="width: 1em" id="remainFee8" name="remainFee8CheckBox" />
								退费</label>
								-->
								<br />
							</span><span id="RemainFee9Label"> <!--
								course9
								<input type="number" name="remainFee9"  readonly="true" />
								元 <label for="remainFee9">
								<input type="checkbox" style="width: 1em" id="remainFee9" name="remainFee9CheckBox" />
								退费</label>
								-->
								<br />
							</span><span id="RemainFee10Label"> <!--
								course10
								<input type="number" name="remainFee10"  readonly="true" />
								元 <label for="remainFee10">
								<input type="checkbox" style="width: 1em" id="remainFee10" name="remainFee10CheckBox" />
								退费</label>
								-->
								<br />
							</span></td>
						</tr>

						<tr>
							<td colspan="2" align="center">
							<input type="hidden" name="submitTypeRefund" />
							<!--
							<input type="button" class="btn" name="buttonSqlRefund" value="上一个" disabled="true" onclick="previous()" />
							<input type="button" class="btn" name="buttonSqlRefund" value="下一个" disabled="true" onclick="next()" />
							<br />
							<input type="button" class="btn" name="buttonSqlRefund" value="查询" onclick="sqlRecord()" /> -->
							<input type="submit" style="width: 8em" class="btn" name="submitAddRefund" value="增加" onclick="checkHiddenValueBtnType('t')" />
							<!--<input type="submit" class="btn" name="submitUpdateRefund" value="修改" onclick="checkHiddenValueBtnType('t')" disabled="true"/>
							<input type="submit" class="btn" name="submitDeleteRefund" value="删除" onclick="checkHiddenValueBtnType('t')" disabled="true"/>
							--></td>
						</tr>

						<!-- 					</form> -->
					</table><!-- 隐藏域，学生转费为z,学生退费为t,学生交费为j。删除是根据ID和日期决定的，所以为p时表示直接提交返回真	-->
					<input type="hidden" name="submitBtnType" />
					</td>
				</tr>

				<tr>
					<td colspan="3" >
					<table align="center" width="930" border="0" cellpadding="0" cellspacing="0">

						<caption align="center">
							<b>学生交费</b>
						</caption>
						<tr>
							<th>交费时间</th>
							<td colspan="3">
							<input type="text" class="date_1" style="width: 8em" name="timeAddFee" readonly/>
							<input type="button" name="previous" value="上一个" style="width: 4em" onclick="sqlAddFeeRecord('previous')" />
							<input type="button" name="next" value="下一个" style="width: 4em" onclick="sqlAddFeeRecord('next')" />
							</td>
							<th>班课单价设置</th>
							<td>
							<input type="number" style="width: 6em" size="18" name="priceBK"  />
							(元/节课) </td>
						</tr>
						<tr>
							<th>交费金额</th>
							<td colspan="3">
							<input type="number" name="feeSum" style="width: 8em" value="" required="true" />
							</td>

							<th rowspan="3">一对一单价设置</th>

							<td rowspan="3">
							<input type="number" style="width: 3em" name="hour1" readonly/>
							小时以下
							<input type="number" style="width: 3em" name="price1YDY" />
							(元/小时)
							，工资
							<input type="number" style="width: 3em" name="pay1" />
							<br />
							<input type="number" style="width: 3em" name="hour2" onchange="setHour3()" readonly/>
							小时以下
							<input type="number" style="width: 3em" name="price2YDY" />
							(元/小时)
							，工资
							<input type="number" style="width: 3em" name="pay2" />
							<br />
							<input type="number" style="width: 3em" name="hour3" onchange="setHour2()" readonly/>
							小时以上
							<input type="number" style="width: 3em" name="price3YDY" />
							(元/小时)
							，工资
							<input type="number" style="width: 3em" name="pay3" />
							<br />
							</td>
						</tr>

						<tr>
							<th>收据编号</th>
							<td colspan="3">
							<input type="number" name="receiptNum" style="width: 8em" required="true" />
							(提示：只能删除不能修改) </td>
						</tr>

						<tr>
							<th>收据票号</th>
							<td colspan="3">
							<input type="number" name="billNum" style="width: 8em" required="true" />
							(提示：只能删除不能修改) </td>
						</tr>

						<!-- <tr>
						<th>分班状态</th>
						<td>
						<select style="width: 9em">
						<option value="1">已分班</option>
						<option value="0">未分班</option>
						</select>
						</td>
						</tr> -->

						<tr>
							<th rowspan="2" style="width: 8em" >费用分配</th>

						</tr>
						<tr>
							<td colspan="6"><span id="course1LabelAddFee"> <!--
								数学
								<select name = "MathProduct" onchange="checkHiddenValueProduct(1)">
								<option value=0>--请选择--</option>
								</select>
								<input type="text" name="MathProductCopy" />
								<input type="number" style="width: 4em" name="Math" />
								元
								--> </span><span id="subFee1Course1Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course1SubFee1" />元
								--> </span><span id="subFee2Course1Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course1SubFee2" />元
								--> </span><span id="subFee3Course1Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course1SubFee3" />元
								--> </span><span id="subFee4Course1Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course1SubFee4" />元
								--> </span><span id="subFee5Course1Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course1SubFee5" />元
								--> </span>
							<br />
							<span id="course2LabelAddFee"> <!--语文
								<select name = "course2Product" onchange="checkHiddenValueProduct(2)">
								<option value=0>--请选择--</option>
								</select>
								<input type="text" name="course2ProductCopy" />
								<input type="number" style="width: 4em" name="course2" />
								元
								--> </span><span id="subFee1Course2Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course2SubFee1" />元
								--> </span><span id="subFee2Course2Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course2SubFee2" />元
								--> </span><span id="subFee3Course2Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course2SubFee3" />元
								--> </span><span id="subFee4Course2Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course2SubFee4" />元
								--> </span><span id="subFee5Course2Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course2SubFee5" />元
								--> </span>
							<br />
							<span id="course3LabelAddFee"> <!--
								英语
								<select name = "Course3Product" onchange="checkHiddenValueProduct(3)">
								<option value=0>--请选择--</option>
								</select>
								<input type="text" name="Course3ProductCopy" />
								<input type="number" style="width: 4em"  name="Course3" />
								元
								--> </span><span id="subFee1Course3Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course3SubFee1" />元
								--> </span><span id="subFee2Course3Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course3SubFee2" />元
								--> </span><span id="subFee3Course3Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course3SubFee3" />元
								--> </span><span id="subFee4Course3Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course3SubFee4" />元
								--> </span><span id="subFee5Course3Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course3SubFee5" />元
								--> </span>
							<br />
							<span id="course4LabelAddFee"> <!--
								物理
								<select name = "course4Product" onchange="checkHiddenValueProduct(4)">
								<option value=0>--请选择--</option>
								</select>
								<input type="text" name="course4ProductCopy" />
								<input type="number" style="width: 4em" name="course4" />
								元
								--> </span><span id="subFee1Course4Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course4SubFee1" />元
								--> </span><span id="subFee2Course4Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course4SubFee2" />元
								--> </span><span id="subFee3Course4Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course4SubFee3" />元
								--> </span><span id="subFee4Course4Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course4SubFee4" />元
								--> </span><span id="subFee5Course4Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course4SubFee5" />元
								--> </span>
							<br />
							<span id="course5LabelAddFee"> <!--
								化学
								<select name = "Course5Product" onchange="checkHiddenValueProduct(5)">
								<option value=0>--请选择--</option>
								</select>
								<input type="text" name="Course5ProductCopy" />
								<input type="number" style="width: 4em" name="Course5" />
								元
								--> </span><span id="subFee1Course5Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course5SubFee1" />元
								--> </span><span id="subFee2Course5Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course5SubFee2" />元
								--> </span><span id="subFee3Course5Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course5SubFee3" />元
								--> </span><span id="subFee4Course5Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course5SubFee4" />元
								--> </span><span id="subFee5Course5Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course5SubFee5" />元
								--> </span>
							<br />
							<span id="course6LabelAddFee"> </span><span id="subFee1Course6Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course6SubFee1" />元
								--> </span><span id="subFee2Course6Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course6SubFee2" />元
								--> </span><span id="subFee3Course6Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course6SubFee3" />元
								--> </span><span id="subFee4Course6Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course6SubFee4" />元
								--> </span><span id="subFee5Course6Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course6SubFee5" />元
								--> </span>
							<br />
							<span id="course7LabelAddFee"> </span><span id="subFee1Course7Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course7SubFee1" />元
								--> </span><span id="subFee2Course7Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course7SubFee2" />元
								--> </span><span id="subFee3Course7Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course7SubFee3" />元
								--> </span><span id="subFee4Course7Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course7SubFee4" />元
								--> </span><span id="subFee5Course7Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course7SubFee5" />元
								--> </span>
							<br />
							<span id="course8LabelAddFee"> </span><span id="subFee1Course8Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course8SubFee1" />元
								--> </span><span id="subFee2Course8Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course8SubFee2" />元
								--> </span><span id="subFee3Course8Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course8SubFee3" />元
								--> </span><span id="subFee4Course8Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course8SubFee4" />元
								--> </span><span id="subFee5Course8Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course8SubFee5" />元
								--> </span>
							<br />
							<span id="course9LabelAddFee"> </span><span id="subFee1Course9Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course9SubFee1" />元
								--> </span><span id="subFee2Course9Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course9SubFee2" />元
								--> </span><span id="subFee3Course9Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course9SubFee3" />元
								--> </span><span id="subFee4Course9Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course9SubFee4" />元
								--> </span><span id="subFee5Course9Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course9SubFee5" />元
								--> </span>
							<br />
							<span id="course10LabelAddFee"> </span><span id="subFee1Course10Label"> <!--费用1
								<input type="number" style="width: 4em" name="Course10SubFee1" />元
								--> </span><span id="subFee2Course10Label"> <!--费用2
								<input type="number" style="width: 4em" name="Course10SubFee2" />元
								--> </span><span id="subFee3Course10Label"> <!--费用3
								<input type="number" style="width: 4em" name="Course10SubFee3" />元
								--> </span><span id="subFee4Course10Label"> <!--费用4
								<input type="number" style="width: 4em" name="Course10SubFee4" />元
								--> </span><span id="subFee5Course10Label"> <!--费用5
								<input type="number" style="width: 4em" name="Course6SubFee5" />元
								--> </span>
							<br />
							</td>
						</tr>
						<tr>
							<td colspan="7" align="center">
							<input type="hidden" name="submitTypeAddFee" />
							<!--
							<input type="button" class="btn" name="buttonSqlAddFee" value="上一个" disabled="true" onclick="previousAddFee()" />
							<input type="button" class="btn" name="buttonSqlAddFee" value="下一个" disabled="true" onclick="nextAddFee()" />
							-->
							<input type="button" class="btn" name="buttonSqlAddFee" value="查询" onclick="sqlRecordAddFee()" style="display: none" />
							<input type="submit" class="btn" name="submitAddAddFee" value="增加" onclick="checkHiddenValueBtnType('j')"/>
							<input type="submit" class="btn" name="submitUpdateAddFee" value="修改" onclick="checkHiddenValueBtnType('j')"/>
							<input type="submit" class="btn" name="submitDeleteAddFee" value="删除" onclick="checkHiddenValueBtnType('j')"/>
							</td>
						</tr>
					</table></td>
				</tr>

			</table>
		</form>
	</body>
</html>