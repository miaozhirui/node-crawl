-- 栏目表
Create Table category
(
  id int primary key auto_increment,
  name varchar(10),
  url VARCHAR(200)
)

-- 文章表
CREATE Table article
(
  name VARCHAR(100),
  url varchar(200),
  cid int
)