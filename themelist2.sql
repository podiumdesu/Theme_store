use theme;
DROP TABLES `ts_mark`;
create table `ts_mark`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `mumuid` varchar(36) NOT NULL,
  `themename` varchar(255) NOT NULL,
  `marking` float(2,1) default 0,
);