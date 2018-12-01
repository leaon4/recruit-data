net start mysql
mysql -uroot -p     password

CREATE DATABASE zhilian;

CREATE TABLE compony (
	id INT AUTO_INCREMENT,
	name VARCHAR(150) DEFAULT NULL,
	size VARCHAR(30) DEFAULT NULL,
	url VARCHAR(255) DEFAULT NULL,
	position_url VARCHAR(255) DEFAULT NULL,
	working_exp VARCHAR(10) DEFAULT NULL,
	salary_min FLOAT DEFAULT 0,
	salary_max FLOAT DEFAULT 0,
	job_name VARCHAR(100) DEFAULT NULL,
	lat VARCHAR(15) DEFAULT NULL,
	lon VARCHAR(15) DEFAULT NULL,
	city VARCHAR(10) DEFAULT NULL,
	area VARCHAR(10) DEFAULT NULL,
	`update` DATETIME DEFAULT NULL,
	PRIMARY KEY (id)
);

create table compony_bak like compony;
insert into compony_bak select * from compony;

delete from compony
where job_name not regexp '(前端|web|h5|html5|script|js|微信小程序)';

delete from compony
where name regexp '(达内|培训)';

delete from compony
where job_name regexp '(学徒|实习|助理|实训)';

delete from compony
where job_name regexp 'webgis';

/* 这句误伤有点大 */
delete from compony
where job_name regexp 'web' and job_name not regexp '前';
/****************/

delete from compony
where job_name regexp '(美|设计|ui)';

delete from compony
where job_name regexp '(java|php|python)' and job_name not regexp 'script';

delete from compony
where job_name regexp '(ue4|unity|u3d|c#|游戏|专员|基础|产品经理|mcu|ic|gis|ios|andriod|帐|账|催|转行|应届|客)' and job_name not regexp 'node';

delete from compony
where `update` < '2018-9-1';