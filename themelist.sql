USE theme;
DROP TABLES ts_list;
CREATE TABLE `ts_list` (
  `theme_id` int PRIMARY KEY AUTO_INCREMENT,
  `theme_uid` varchar(36) NOT NULL,
  `theme_authorname` varchar(255) DEFAULT NULL,
  `theme_authoruid` varchar(255) NOT NULL,
  `theme_version` varchar(50) NOT NULL,
  `theme_filesrc` varchar(255) NOT NULL,
  `theme_name` varchar(255) NOT NULL,
  `theme_imgsrc` varchar(255) NOT NULL,
  `theme_tags` varchar(1000) DEFAULT '',
  `theme_description` varchar(1000) DEFAULT '',
  `theme_downloadtimes` smallint(10) NOT NULL,
  `theme_lastupdated` date NOT NULL
);
INSERT ts_list VALUES(2,
'66dc0a64-5687-c76e-167b-432a5889b1ab','Kate Lee
','c31ccbb9-0133-c7d2-1060-561c2db3ff84','2.0.0','WPGumby.zip','WPGumby','WPGumby',5.0,'Custom Menu, Full Width Template, Left Sidebar, One Column, Right Sidebar, Theme Options, Translation Ready, Two Columns','wpGumby is a uniquely designed, professional, responsive and beautiful theme. GumbyFramework fluid grid system that adapts your website to mobile devices and the desktop or any other viewing environment. Your website will look amazing in all devices. Theme features 13 Page Templates, 5 Widget Areas, 4 Template Layouts and more. Powerful wpGumby theme options panel for full control with easy Logo Upload, Social Networking and Webmaster Tools etc. wpGumby is WooCommerce Compatible, Multilingual Ready (WPML), RTL-Language Support, Retina-Ready, Search Engine Friendly. Cross-Browser compatible. Official support forum (https://shopitpress.com/community/)',2,'2017-06-26');

DROP TABLES ts_user;
CREATE TABLE `ts_user` (

    `user_id` int PRIMARY KEY AUTO_INCREMENT,
    `user_uid` varchar(36) NOT NULL,
    `user_loginname` varchar(255) NOT NULL,
    `user_name` varchar(255) DEFAULT NULL,
    `user_mailbox` varchar(255) DEFAULT NULL,
    `user_tellphone` varchar(11) DEFAULT NULL,
    `user_city` varchar(100) DEFAULT NULL
);

DROP TABLES `ts_mark`;
create table `ts_mark`(
  `mark_id` int PRIMARY KEY AUTO_INCREMENT,
  `mark_mumuid` varchar(36) NOT NULL,
  `mark_themeuid` varchar(36) NOT NULL,
  `theme_marking` float(2,1) NOT NULL,
  `theme_markingnum` int(11) DEFAULT 0
);
