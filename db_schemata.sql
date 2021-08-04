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

create table bitcoin_four_years_data(
	id serial primary key,
	date varchar, 
	name varchar, 
	symbol varchar, 
	name_2 varchar, 
	localization json, 
	image JSONB, 
	market_data JSONB,
	community_data JSONB, 
	developer_data JSONB,
	public_interest_stats JSONB
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