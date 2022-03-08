drop table if exists users cascade;
create table users (
    user_id serial not null primary key,
    first_name character varying(50) not null,
    last_name character varying(50) null,
    phone_number character varying(9) not null,
    email character varying (70) not null,
    status character varying(10) not null default 'lead' check(status in ('lead', 'client')),
    user_created_at timestamp not null default current_timestamp,
    user_updated_at timestamp null
);

drop table if exists messages cascade;
create table messages (
    message_id serial not null primary key,
    user_id int not null references users(user_id),
    message_body character varying(120),
    message_created_at timestamp not null default current_timestamp,
    message_updated_at timestamp null
);

insert into users(first_name, last_name, phone_number, email) values
('Bahodir', 'Omonov', '996050616', 'omonovbahodir0616@gmail.com'),
('Dostonbek', 'Oktamov', '991324312', 'dostonbek0616@gmail.com'),
('Dilshod', 'Elturayev', '912042163', 'dilshod0616@gmail.com');








 