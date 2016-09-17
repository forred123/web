/**
 * @author zyx
 */

// 读cookie
//var isLogin = GetCookie('isLogin');
//var role = GetCookie('role');

function checkRole(obj) {
	if (GetCookie('isLogin') == null) {
		alert('未登录或登录超时，请重新登录！');
		return false;
	}

	// 判断已经登录
	if (GetCookie('isLogin') == '1') {
		// 校长设置页面－－－
		if ((obj.name == "sqlSet") || (obj.name == "sqlGrade") || (obj.name == "sqlStudent") || (obj.name == "sqlFee") || (obj.name == "sqlTest") || (obj.name == "sqlTeacher") || (obj.name == "salary") || (obj.name == "remainder") || (obj.name == "output")) {
			if (GetCookie('role') == '0') {
				// 学生不能进
				alert('学生只有进入“综合查询”的权限！');
				return false;
			} else {
				return true;
			}
		}

		// 综合查询页面
		if (obj.name == "sqlSome") {
			// 谁都可以进入
			return true;
		}

		// 后台管理页面
		if (obj.name == "htmanage") {
			if (GetCookie('role') == '0') {
				// 学生不能进
				alert('学生只有进入“综合查询”的权限！');
				return false;
			} else if (GetCookie('role') == '1') {
				// 教师不能进
				alert('授课教师没有进入后台管理页面的权限！');
				return false;
			} else {
				// 校区负责人和校长可以进入
				return true;
			}
		}

	}
}

function htCheckRole(obj) {
	if (obj.name == "principalSet") {
		if (GetCookie('role') == '8') {
			// 校区负责人不能进入校长设置，只有校长可以进入
			alert('只有校长才有进入"校长设置"页面的权限！');
			return false;
		}
		if(GetCookie('role') == '9'){
			return true;
		}
	}
}

function GetCookie(sName) {
	var aCookie = document.cookie.split("; ");
	for (var i = 0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
			return unescape(aCrumb[1]);
	}
	return null;
}
