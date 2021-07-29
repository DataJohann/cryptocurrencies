create table cleaned_2018_stats(
	id serial primary key,
	name varchar,
	price float,
	market_cap_millions float,
	reddit_subscribers float,
	twitter_followers float,
	alexa_rank float	
)

create table universal_stats(
	id serial primary key,
	name varchar,
	symbol varchar,
	price_Aoril2021 float,
	market_cap_billions float,
	market_cap_rank float,
	ath float,
	ath_change_percentage float,
	ath_date varchar,
	atl float,
	atl_change_percentage varchar,
	atl_date varchar
)

create table cleaned_2021_stats(
	id serial primary key,
	name varchar,
	price float,
	market_cap_millions float,
	reddit_subscribers float,
	twitter_followers float,
	alexa_rank float	
)