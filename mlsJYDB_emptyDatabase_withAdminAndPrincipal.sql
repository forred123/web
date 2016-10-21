-- phpMyAdmin SQL Dump
-- version 4.0.10.15
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 21, 2016 at 08:11 PM
-- Server version: 5.1.73
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mlsJYDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `addFeeTable`
--

CREATE TABLE IF NOT EXISTS `addFeeTable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mode` char(1) NOT NULL DEFAULT '',
  `uid` int(10) unsigned NOT NULL DEFAULT '0',
  `name1` varchar(20) NOT NULL DEFAULT '',
  `name2` varchar(20) NOT NULL DEFAULT '',
  `sex` char(4) NOT NULL DEFAULT '',
  `grade` char(4) NOT NULL DEFAULT '',
  `schoolZone1` char(32) NOT NULL DEFAULT '',
  `schoolZone2` char(32) NOT NULL DEFAULT '',
  `schoolZone3` char(32) NOT NULL DEFAULT '',
  `receiptNum` char(32) NOT NULL DEFAULT '0',
  `billNum` char(10) NOT NULL DEFAULT '',
  `time` varchar(20) NOT NULL DEFAULT '0',
  `priceBK` int(10) unsigned NOT NULL DEFAULT '0',
  `hour1` int(10) unsigned NOT NULL DEFAULT '50',
  `priceHour1YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay1` int(10) unsigned NOT NULL DEFAULT '0',
  `hour2` int(10) unsigned NOT NULL DEFAULT '100',
  `priceHour2YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay2` int(10) unsigned NOT NULL DEFAULT '0',
  `hour3` int(10) unsigned NOT NULL DEFAULT '100',
  `priceHour3YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay3` int(10) unsigned NOT NULL DEFAULT '0',
  `feeSum` int(11) NOT NULL DEFAULT '0',
  `subFee1Name` varchar(20) NOT NULL DEFAULT '费用1',
  `subFee2Name` varchar(20) NOT NULL DEFAULT '费用2',
  `subFee3Name` varchar(20) NOT NULL DEFAULT '费用3',
  `subFee4Name` varchar(20) NOT NULL DEFAULT '费用4',
  `subFee5Name` varchar(20) NOT NULL DEFAULT '费用5',
  `course1Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course1` int(11) NOT NULL DEFAULT '0',
  `course1SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course1SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course1SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course1SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course1SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  `course2Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course2` int(11) NOT NULL DEFAULT '0',
  `course2SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course2SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course2SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course2SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course2SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  `course3Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course3` int(11) NOT NULL DEFAULT '0',
  `course3SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course3SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course3SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course3SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course3SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  `course4Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course4` int(11) NOT NULL DEFAULT '0',
  `course4SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course4SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course4SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course4SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course4SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  `course5Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course5` int(11) NOT NULL DEFAULT '0',
  `course5SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course5SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course5SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course5SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course5SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  `course6Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course6` int(11) NOT NULL DEFAULT '0',
  `course6SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course6SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course6SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course6SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course6SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  `course7Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course7` int(11) NOT NULL DEFAULT '0',
  `course7SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course7SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course7SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course7SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course7SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  `course8Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course8` int(11) NOT NULL DEFAULT '0',
  `course8SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course8SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course8SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course8SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course8SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  `course9Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course9` int(11) NOT NULL DEFAULT '0',
  `course9SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course9SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course9SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course9SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course9SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  `course10Product` varchar(20) NOT NULL DEFAULT '未选择',
  `course10` int(11) NOT NULL DEFAULT '0',
  `course10SubFee1` int(10) unsigned NOT NULL DEFAULT '0',
  `course10SubFee2` int(10) unsigned NOT NULL DEFAULT '0',
  `course10SubFee3` int(10) unsigned NOT NULL DEFAULT '0',
  `course10SubFee4` int(10) unsigned NOT NULL DEFAULT '0',
  `course10SubFee5` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `gradeSetTable`
--

CREATE TABLE IF NOT EXISTS `gradeSetTable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `schoolZone` char(32) NOT NULL DEFAULT '',
  `startTime` varchar(20) NOT NULL DEFAULT '000000',
  `endTime` varchar(20) NOT NULL DEFAULT '000000',
  `teacher` char(32) NOT NULL DEFAULT '',
  `grade` char(4) NOT NULL DEFAULT '-',
  `course` char(4) NOT NULL DEFAULT '-',
  `product` char(5) NOT NULL DEFAULT '',
  `class` varchar(32) NOT NULL DEFAULT '???',
  `greadeSetResult` varchar(128) NOT NULL DEFAULT '???',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `principalSetTable`
--

CREATE TABLE IF NOT EXISTS `principalSetTable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `schoolZone` char(32) NOT NULL DEFAULT '',
  `assistant` varchar(20) NOT NULL DEFAULT '',
  `product1` varchar(20) NOT NULL DEFAULT '',
  `product2` varchar(20) NOT NULL DEFAULT '',
  `product3` varchar(20) NOT NULL DEFAULT '',
  `product4` varchar(20) NOT NULL DEFAULT '',
  `product5` varchar(20) NOT NULL DEFAULT '',
  `course1` varchar(20) NOT NULL DEFAULT '',
  `course2` varchar(20) NOT NULL DEFAULT '',
  `course3` varchar(20) NOT NULL DEFAULT '',
  `course4` varchar(20) NOT NULL DEFAULT '',
  `course5` varchar(20) NOT NULL DEFAULT '',
  `course6` varchar(20) NOT NULL DEFAULT '',
  `course7` varchar(20) NOT NULL DEFAULT '',
  `course8` varchar(20) NOT NULL DEFAULT '',
  `course9` varchar(20) NOT NULL DEFAULT '',
  `course10` varchar(20) NOT NULL DEFAULT '',
  `grade7` varchar(20) NOT NULL DEFAULT '',
  `grade8` varchar(20) NOT NULL DEFAULT '',
  `grade9` varchar(20) NOT NULL DEFAULT '',
  `grade10` varchar(20) NOT NULL DEFAULT '',
  `grade11` varchar(20) NOT NULL DEFAULT '',
  `grade12` varchar(20) NOT NULL DEFAULT '',
  `subFeeItem1` varchar(20) NOT NULL DEFAULT '',
  `subFeeItem2` varchar(20) NOT NULL DEFAULT '',
  `subFeeItem3` varchar(20) NOT NULL DEFAULT '',
  `subFeeItem4` varchar(20) NOT NULL DEFAULT '',
  `subFeeItem5` varchar(20) NOT NULL DEFAULT '',
  `priceBKgrade7` int(10) unsigned NOT NULL DEFAULT '0',
  `priceBKgrade8` int(10) unsigned NOT NULL DEFAULT '0',
  `priceBKgrade9` int(10) unsigned NOT NULL DEFAULT '0',
  `priceBKgrade10` int(10) unsigned NOT NULL DEFAULT '0',
  `priceBKgrade11` int(10) unsigned NOT NULL DEFAULT '0',
  `priceBKgrade12` int(10) unsigned NOT NULL DEFAULT '0',
  `hour1` int(10) unsigned NOT NULL DEFAULT '50',
  `hour2` int(10) unsigned NOT NULL DEFAULT '100',
  `hour3` int(10) unsigned NOT NULL DEFAULT '100',
  `price7hour1YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price7hour2YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price7hour3YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay7` int(10) unsigned NOT NULL DEFAULT '0',
  `price8hour1YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price8hour2YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price8hour3YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay8` int(10) unsigned NOT NULL DEFAULT '0',
  `price9hour1YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price9hour2YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price9hour3YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay9` int(10) unsigned NOT NULL DEFAULT '0',
  `price10hour1YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price10hour2YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price10hour3YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay10` int(10) unsigned NOT NULL DEFAULT '0',
  `price11hour1YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price11hour2YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price11hour3YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay11` int(10) unsigned NOT NULL DEFAULT '0',
  `price12hour1YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price12hour2YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `price12hour3YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay12` int(10) unsigned NOT NULL DEFAULT '0',
  `time` varchar(20) NOT NULL DEFAULT '000000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `recordStudentTable`
--

CREATE TABLE IF NOT EXISTS `recordStudentTable` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `passWD` char(32) NOT NULL DEFAULT 'hhxx',
  `name1` varchar(20) NOT NULL DEFAULT '',
  `name2` varchar(20) NOT NULL DEFAULT '',
  `sex` char(4) NOT NULL DEFAULT '',
  `schoolZone1` char(32) NOT NULL DEFAULT '',
  `schoolZone2` char(32) NOT NULL DEFAULT '',
  `schoolZone3` char(32) NOT NULL DEFAULT '',
  `course1ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course1StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course1Product` char(5) NOT NULL DEFAULT '',
  `course1OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course1OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course1AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course1AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `course2ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course2StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course2Product` char(5) NOT NULL DEFAULT '',
  `course2OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course2OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course2AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course2AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `course3ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course3StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course3Product` char(5) NOT NULL DEFAULT '',
  `course3OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course3OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course3AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course3AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `course4ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course4StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course4Product` char(5) NOT NULL DEFAULT '',
  `course4OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course4OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course4AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course4AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `course5ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course5StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course5Product` char(5) NOT NULL DEFAULT '',
  `course5OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course5OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course5AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course5AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `course6ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course6StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course6Product` char(5) NOT NULL DEFAULT '',
  `course6OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course6OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course6AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course6AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `course7ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course7StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course7Product` char(5) NOT NULL DEFAULT '',
  `course7OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course7OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course7AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course7AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `course8ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course8StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course8Product` char(5) NOT NULL DEFAULT '',
  `course8OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course8OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course8AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course8AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `course9ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course9StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course9Product` char(5) NOT NULL DEFAULT '',
  `course9OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course9OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course9AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course9AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `course10ClassIdInMLS` int(10) unsigned NOT NULL DEFAULT '0',
  `course10StateInGrade` int(10) unsigned NOT NULL DEFAULT '0',
  `course10Product` char(5) NOT NULL DEFAULT '',
  `course10OutOrBackGradeTime` varchar(20) NOT NULL DEFAULT '0',
  `course10OutGradeReason` varchar(20) NOT NULL DEFAULT '',
  `course10AttendanceStartTime` varchar(20) NOT NULL DEFAULT '000000',
  `course10AttendanceEndTime` varchar(20) NOT NULL DEFAULT '000000',
  `priceBK` float unsigned NOT NULL DEFAULT '0',
  `hour1` int(10) unsigned NOT NULL DEFAULT '50',
  `priceHour1YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay1` int(10) unsigned NOT NULL DEFAULT '0',
  `hour2` int(10) unsigned NOT NULL DEFAULT '100',
  `priceHour2YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay2` int(10) unsigned NOT NULL DEFAULT '0',
  `hour3` int(10) unsigned NOT NULL DEFAULT '100',
  `priceHour3YDY` int(10) unsigned NOT NULL DEFAULT '0',
  `pay3` int(10) unsigned NOT NULL DEFAULT '0',
  `lastPrice` float unsigned NOT NULL DEFAULT '0',
  `school1` char(32) DEFAULT '',
  `school2` char(32) DEFAULT '',
  `grade` char(4) NOT NULL DEFAULT '',
  `class` char(20) NOT NULL DEFAULT '',
  `studentWX` char(16) DEFAULT '',
  `studentQQ` char(16) DEFAULT '',
  `studentTel` char(16) DEFAULT '',
  `motherTel` char(16) DEFAULT '',
  `motherWX` char(16) DEFAULT '',
  `fatherTel` char(16) DEFAULT '',
  `fatherWX` char(16) DEFAULT '',
  `address` text,
  `inTime` varchar(20) NOT NULL DEFAULT '000000',
  `outTime` varchar(20) NOT NULL DEFAULT '000000',
  `role` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `recordTeacherTable`
--

CREATE TABLE IF NOT EXISTS `recordTeacherTable` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `passWD` char(32) NOT NULL DEFAULT 'mlsfdb',
  `name` varchar(20) NOT NULL DEFAULT '',
  `sex` char(4) NOT NULL DEFAULT '',
  `imgUrl` varchar(32) NOT NULL DEFAULT '',
  `schoolZone1` char(32) NOT NULL DEFAULT '',
  `schoolZone2` char(32) NOT NULL DEFAULT '',
  `schoolZone3` char(32) NOT NULL DEFAULT '',
  `schoolZone4` char(32) NOT NULL DEFAULT '',
  `schoolZone5` char(32) NOT NULL DEFAULT '',
  `bankCardNumber` char(20) NOT NULL DEFAULT '',
  `bank` char(32) NOT NULL DEFAULT '',
  `bankCardUser` char(20) NOT NULL DEFAULT '',
  `requireConditon` char(32) NOT NULL DEFAULT '',
  `product1` char(5) NOT NULL DEFAULT '',
  `product2` char(5) NOT NULL DEFAULT '',
  `product3` char(5) NOT NULL DEFAULT '',
  `product4` char(5) NOT NULL DEFAULT '',
  `product5` char(5) NOT NULL DEFAULT '',
  `course1` char(4) NOT NULL DEFAULT '-',
  `course2` char(4) NOT NULL DEFAULT '-',
  `course3` char(4) NOT NULL DEFAULT '-',
  `course4` char(4) NOT NULL DEFAULT '-',
  `course5` char(4) NOT NULL DEFAULT '-',
  `course6` char(4) NOT NULL DEFAULT '-',
  `course7` char(4) NOT NULL DEFAULT '-',
  `course8` char(4) NOT NULL DEFAULT '-',
  `course9` char(4) NOT NULL DEFAULT '-',
  `course10` char(4) NOT NULL DEFAULT '-',
  `grade7` char(4) NOT NULL DEFAULT '-',
  `grade8` char(4) NOT NULL DEFAULT '-',
  `grade9` char(4) NOT NULL DEFAULT '-',
  `grade10` char(4) NOT NULL DEFAULT '-',
  `grade11` char(4) NOT NULL DEFAULT '-',
  `grade12` char(4) NOT NULL DEFAULT '-',
  `school` char(32) DEFAULT '',
  `teacherWX` char(16) DEFAULT '',
  `teacherQQ` char(16) DEFAULT '',
  `teacherTel` char(16) DEFAULT '',
  `teacherEmail` char(32) DEFAULT '',
  `address` text,
  `idCardNum` char(20) NOT NULL DEFAULT '',
  `workCondition` char(4) NOT NULL DEFAULT '',
  `workTime` char(4) NOT NULL DEFAULT '',
  `inTime` varchar(20) NOT NULL DEFAULT '000000',
  `outTime` varchar(20) NOT NULL DEFAULT '000000',
  `role` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `recordTeacherTable`
--

INSERT INTO `recordTeacherTable` (`uid`, `passWD`, `name`, `sex`, `imgUrl`, `schoolZone1`, `schoolZone2`, `schoolZone3`, `schoolZone4`, `schoolZone5`, `bankCardNumber`, `bank`, `bankCardUser`, `requireConditon`, `product1`, `product2`, `product3`, `product4`, `product5`, `course1`, `course2`, `course3`, `course4`, `course5`, `course6`, `course7`, `course8`, `course9`, `course10`, `grade7`, `grade8`, `grade9`, `grade10`, `grade11`, `grade12`, `school`, `teacherWX`, `teacherQQ`, `teacherTel`, `teacherEmail`, `address`, `idCardNum`, `workCondition`, `workTime`, `inTime`, `outTime`, `role`) VALUES
(1, 'zhyx', 'admin', '男', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '', '', '', '', '', NULL, '', '', '', '000000', '000000', 9),
(2, 'mlsfdb', '毛红玉', '男', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '', '', '', '', '', NULL, '', '', '', '000000', '000000', 9);

-- --------------------------------------------------------

--
-- Table structure for table `subFeeTable`
--

CREATE TABLE IF NOT EXISTS `subFeeTable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL DEFAULT '0',
  `name1` varchar(20) NOT NULL DEFAULT '',
  `name2` varchar(20) NOT NULL DEFAULT '',
  `schoolZone` char(32) NOT NULL DEFAULT '',
  `grade` char(4) NOT NULL DEFAULT '',
  `product` varchar(20) NOT NULL DEFAULT '',
  `teacher` varchar(20) NOT NULL DEFAULT '',
  `classInMLS` varchar(32) NOT NULL DEFAULT '',
  `className` varchar(32) NOT NULL DEFAULT '',
  `attendance` char(6) NOT NULL DEFAULT '',
  `notAttendanceReason` varchar(20) NOT NULL DEFAULT '',
  `attandenceTime` varchar(20) NOT NULL DEFAULT '0',
  `period` char(6) NOT NULL DEFAULT '0',
  `subFeeCourse` int(10) unsigned NOT NULL DEFAULT '0',
  `price` float unsigned NOT NULL DEFAULT '0',
  `pay` int(10) unsigned NOT NULL DEFAULT '0',
  `priceState` int(10) unsigned NOT NULL DEFAULT '0',
  `testResultTime` varchar(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
