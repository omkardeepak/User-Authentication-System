--user data--
create table users_data(id  references users(id),fullname varchar(45) not null,email varchar(45)not null,age int not null,hobby varchar(20)not null);
--signin data--
create table users(id serial primary key not null,username varchar(45) not null,password varchar(45)not null);

