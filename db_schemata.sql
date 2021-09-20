-- create table cleaned_2018_stats(
-- 	id serial primary key,
-- 	name varchar,
-- 	price float,
-- 	market_cap_millions float,
-- 	reddit_subscribers float,
-- 	twitter_followers float,
-- 	alexa_rank float	
-- )

-- create table universal_stats(
-- 	id serial primary key,
-- 	name varchar,
-- 	symbol varchar,
-- 	price_Aoril2021 float,
-- 	market_cap_billions float,
-- 	market_cap_rank float,
-- 	ath float,
-- 	ath_change_percentage float,
-- 	ath_date varchar,
-- 	atl float,
-- 	atl_change_percentage varchar,
-- 	atl_date varchar
-- )

-- create table cleaned_2021_stats(
-- 	id serial primary key,
-- 	name varchar,
-- 	price float,
-- 	market_cap_millions float,
-- 	reddit_subscribers float,
-- 	twitter_followers float,
-- 	alexa_rank float	
-- )

-- drop TABLE bitcoin_four_years_data;

-- -- Important to change the date style to DMY before adding any entries
-- -- this needs to be done in the psql shell

-- set datestyle = 'ISO, DMY';
-- show datestyle;

-- create table bitcoin_four_years_data(
-- 	id serial primary key,
-- 	dt date, 
-- 	name varchar, 
-- 	symbol varchar, 
-- 	name_2 varchar, 
-- 	localization varchar, 
-- 	image varchar, 
-- 	market_data varchar,
-- 	community_data varchar, 
-- 	developer_data varchar,
-- 	public_interest_stats varchar
-- )

-- CREATE TABLE btc_community(

-- 	id serial primary key,
-- 	dt date,
-- 	name varchar,
-- 	facebook_likes float,
-- 	twitter_followers float,
-- 	reddit_average_posts_48h float,	
-- 	reddit_average_comments_48h float,	
-- 	reddit_subscribers float,	
-- 	reddit_accounts_active_48h float

-- )



-- select * 
-- from adding_bitcoin
-- order by dt desc;

-- SELECT MAX(id) FROM adding_bitcoin;   
-- SELECT nextval(id);



-- ALTER TABLE adding_bitcoin
-- drop constraint adding_bitcoin_pkey;

-- drop table adding_bitcoin;

-- set datestyle = "ISO, DMY";
-- show datestyle;

-- insert into adding_bitcoin ( dt, name, symbol, name_2, localization, image, market_data)
-- values ('30-07-2021', 'bitcoin', 'btc', 'Bitcoin', 'something', 'something2', 'something3' );

-- set datestyle = 'ISO, DMY';


-- \i ‘/Users/johannvillalvir/cryptocurrencies/db_schemata.sql’

-- \copy bitcoin_four_years_data from ‘/Users/johannvillalvir/cryptocurrencies/crypto/static/data/reversed_bitcoin.csv’ delimiter ‘,’ csv header



-- -- Alter a table data type to be date

-- ALTER TABLE master_db
-- alter column dt type date using dt::date



-- select * from master_db
-- where dt is not null
-- and reddit_average_posts_48h is not null
-- order by market_cap desc;

-- -- drop table master_db;

-- -- ALTER TABLE master_db
-- -- alter column dt type date using dt::date

-- select * from master_db
-- where dt between '2019-01-01' and '2019-02-01'

-- -- Look at all the entries for a specific date

-- select * from master_db
-- where dt ='2020-09-01'
-- order by market_cap desc;

-- -- Look at
-- select * from master_db
-- WHERE reddit_subscribers IS NOT NULL
-- order by reddit_average_comments_48h desc;

-- --  Show all dates for which data has been scrapped, order in descending order
-- select distinct(dt) from master_db
-- order by 1 desc;

-- --  Count all dates for which data has been scrapped, order in descending order
-- select count(distinct(dt)) from master_db
-- order by  1 desc;

-- -- Count all the entries in the database
-- select count(*) from master_db


-- -- show datestyle
-- -- set datestyle = 'ISO, DMY'
-- -- drop table test_db

-- select min(dt) from master_db where dt = '2019-03-01' order by market_cap desc;

-- -- delete from master_db where dt = '2019-01-01'

-- select max(dt)
-- from master_db;




-- -- Find average of average reddit comments for a coin for a specific data range

-- select avg(reddit_average_comments_48h)
--  from master_db
-- WHERE reddit_subscribers IS NOT NULL
-- and id like '%bitcoin%'
-- and dt between '2020-02-25' and '2020-05-25'

-- -- count how many days reddit_average_comments_48h was below the average for a 3 month period
-- select count(*) from master_db
-- WHERE reddit_subscribers IS NOT NULL
-- and id like 'bitcoin'
-- and reddit_average_comments_48h < 267
-- and dt between '2019-12-04' and '2020-05-25';

-- -- Print the dates below 6 month average
-- select * from master_db
-- WHERE reddit_subscribers IS NOT NULL
-- and id like 'bitcoin'
-- and reddit_average_comments_48h < 216
-- and dt between '2019-12-04' and '2020-05-25'
-- order by reddit_average_comments_48h asc;




-- -- Select specific columns for all tokens for a specified date
-- select dt::varchar, id,
-- market_cap
-- twitter_followers, reddit_average_comments_48h,
-- reddit_subscribers,
-- reddit_accounts_active_48h from master_db
-- where id like '%%'
-- and dt = '2019-04-05'
-- and reddit_subscribers is not null
-- order by market_cap desc;















