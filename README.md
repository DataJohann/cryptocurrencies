# Step 1: Getting all the files in your machine and your environment set up

1. Clone this repo to your local machine
2. Create a new environment to hold our libraries by running the following command in your terminal: 

    conda create -n crypto_tracker --file <path to requirements.txt file you just cloned> python=3.7

# Step 2: Setting up local Database

The app expects you have a local database set up with 2 tables: cleaned_2018_stats and cleaned_2021_stats. There are csv files to start your database. Run the following queries in psql command shell

## Set up the first Table
### 1. Open db_schemata.sql and uncomment:
    " 
    create table cleaned_2018_stats(
	id serial primary key,
	name varchar,
	price float,
	market_cap_millions float,
	reddit_subscribers float,
	twitter_followers float,
	alexa_rank float

    " 
####  code lines lines 1-9

### 2. open psql shell and run: 
    \i '<path/to/schemata_db.sql>'     (include single quotes)
    \copy <table_name> from '</path/to/csv>' delimiter',' csv header         (include single quotes again) the path to the CSV Should be the path to your clean_2018.csv file found in crypto/static/data


