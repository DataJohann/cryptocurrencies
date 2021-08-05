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

create table bitcoin_four_years_data(
	id serial primary key,
	dt date, 
	name varchar, 
	symbol varchar, 
	name_2 varchar, 
	localization varchar, 
	image varchar, 
	market_data varchar,
	community_data varchar, 
	developer_data varchar,
	public_interest_stats varchar
)

-- CREATE TABLE btc_community(

-- 	id serial primary key,
-- 	date varchar,
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

-- create table adding_bitcoin(
-- 	id serial,
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


-- \i ‘/Users/johannvillalvir/cryptocurrencies/db_schemata.sql’

-- \copy bitcoin_four_years_data from ‘/Users/johannvillalvir/cryptocurrencies/crypto/static/data/reversed_bitcoin.csv’ delimiter ‘,’ csv header