use theme;
DROP TABLES `ts_mark`;
create table `ts_mark`(
  `mark_id` int PRIMARY KEY AUTO_INCREMENT,
  `mark_mumuid` varchar(36) NOT NULL,
  `mark_themename` varchar(255) NOT NULL,
  `theme_marking` float(2,1) default 0,
  `theme_markingnum` int(11) DEFAULT 0
);