USE firekylin.org;
DROP TABLES ts_list;
CREATE TABLE `ts_list` (
  `theme_uid` varchar(36) NOT NULL PRIMARY KEY,
  `theme_authoruid` varchar(255) NOT NULL,
  `theme_version` varchar(50) NOT NULL,
  `theme_filesrc` varchar(255) NOT NULL,
  `theme_name` varchar(255) NOT NULL,
  `theme_imgsrc` varchar(255) NOT NULL,
  `theme_marking` float(2,1) NOT NULL,
  `theme_tags` varchar(1000) DEFAULT '',
  `theme_description` varchar(1000) DEFAULT '',
  `theme_downloadtimes` smallint(10) NOT NULL,
  `theme_lastupdated` date NOT NULL
);
INSERT ts_list VALUES('889edaa9-7133-c7cf-1500-beee690e4da8','1206f84c-6603-11e7-b171-3c9509546df4','0.1.0','firekylin.zip','firekylin','firekylin',0.0,'','',0,'2017-07-12');
INSERT ts_list VALUES('66dc0a64-5687-c76e-167b-432a5889b1ab','1206f84c-6603-11e7-b171-3c9509546df4','2.0.0','WPGumby.zip','WPGumby','WPGumby',5.0,'Custom Menu, Full Width Template, Left Sidebar, One Column, Right Sidebar, Theme Options, Translation Ready, Two Columns','wpGumby is a uniquely designed, professional, responsive and beautiful theme. GumbyFramework fluid grid system that adapts your website to mobile devices and the desktop or any other viewing environment. Your website will look amazing in all devices. Theme features 13 Page Templates, 5 Widget Areas, 4 Template Layouts and more. Powerful wpGumby theme options panel for full control with easy Logo Upload, Social Networking and Webmaster Tools etc. wpGumby is WooCommerce Compatible, Multilingual Ready (WPML), RTL-Language Support, Retina-Ready, Search Engine Friendly. Cross-Browser compatible. Official support forum (https://shopitpress.com/community/)',2,'2017-06-26');

DROP TABLES ts_user;
CREATE TABLE `ts_user` (
	`user_uid` varchar(36) NOT NULL PRIMARY KEY,
    `user_loginname` varchar(255) NOT NULL,
    `user_name` varchar(255) DEFAULT NULL,
    `user_mailbox` varchar(255) DEFAULT NULL,
    `user_tellphone` varchar(11) DEFAULT NULL,
    `user_city` varchar(100) DEFAULT NULL
);
