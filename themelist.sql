CREATE TABLE `ts_list` (
  `theme_uid` varchar(36) NOT NULL PRIMARY KEY,
  `theme_author` varchar(20) NOT NULL,
  `theme_vesion` varchar(15) NOT NULL,
  `theme_filesrc` varchar(50) NOT NULL,
  `theme_name` varchar(50) NOT NULL,
  `theme_imgsrc` varchar(50) NOT NULL,
  `theme_marking` float(2,1) DEFAULT NULL,
  `theme_tags` varchar(100) DEFAULT NULL,
  `theme_description` varchar(600) NOT NULL,
  `theme_downloadtimes` smallint(6) NOT NULL,
  `theme_lastupdated` date NOT NULL
);
INSERT ts_list VALUES('00dc0a64-8133-c76e-156a-600a5399b1c1','Kate605690919','1.0.0.0','default','default','default',5.0,'default,black','good',1,'2017-06-25');
INSERT ts_list VALUES('66dc0a64-5687-c76e-167b-432a5889b1ab','songzuishuai','2.0.0.1','test','test','test',5.0,'test,blank','well done',2,'2017-06-26');

