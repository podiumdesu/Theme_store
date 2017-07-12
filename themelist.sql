USE theme;
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
INSERT ts_list VALUES('00dc0a64-8133-c76e-156a-600a5399b1c1','Kate605690919','1.0.0.0','Twenty Seventeen.zip','Twenty Seventeen','Twenty Seventeen',5.0,'Accessibility Ready, Custom Colors, Custom Header, Custom Logo, Custom Menu, Editor Style, Featured Images, Flexible Header, Footer Widgets, One Column, Post Formats, Right Sidebar, RTL Language Support, Sticky Post, Theme Options, Threaded Comments, Translation Ready, Two Columns','Twenty Seventeen brings your site to life with header video and immersive featured images. With a focus on business sites, it features multiple sections on the front page as well as widgets, navigation and social menus, a logo, and more. Personalize its asymmetrical grid with a custom color scheme and showcase your multimedia content with post formats. Our default theme for 2017 works great in many languages, for any abilities, and on any device.',1,'2017-06-25');
INSERT ts_list VALUES('66dc0a64-5687-c76e-167b-432a5889b1ab','songzuishuai','2.0.0.1','WPGumby.zip','WPGumby','WPGumby',5.0,'Custom Menu, Full Width Template, Left Sidebar, One Column, Right Sidebar, Theme Options, Translation Ready, Two Columns','wpGumby is a uniquely designed, professional, responsive and beautiful theme. GumbyFramework fluid grid system that adapts your website to mobile devices and the desktop or any other viewing environment. Your website will look amazing in all devices. Theme features 13 Page Templates, 5 Widget Areas, 4 Template Layouts and more. Powerful wpGumby theme options panel for full control with easy Logo Upload, Social Networking and Webmaster Tools etc. wpGumby is WooCommerce Compatible, Multilingual Ready (WPML), RTL-Language Support, Retina-Ready, Search Engine Friendly. Cross-Browser compatible. Official support forum (https://shopitpress.com/community/)',2,'2017-06-26');

DROP TABLES ts_user;
CREATE TABLE `ts_user` (
	`user_uid` varchar(36) NOT NULL PRIMARY KEY,
    `user_loginname` varchar(255) NOT NULL,
    `user_name` varchar(255) DEFAULT NULL,
    `user_mailbox` varchar(255) DEFAULT NULL,
    `user_tellphone` varchar(11) DEFAULT NULL,
    `user_city` varchar(100) DEFAULT NULL
);
INSERT ts_user VALUES('1206f84c-6603-11e7-b171-3c9509546df4','Kate605690919','北风慕蝶','605690919@qq.com','15271918234','河南');