from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base


import os
import pandas as pd
from sqlalchemy.ext.automap import automap_base
import datetime
import requests

import numpy as np

from sqlalchemy.orm import Session

from flask import Flask

## Get a connection to the database and make the string into a variable

app = Flask(__name__)

## Connect to local database
# from config import password

# rds_connection_string = f'postgres:{password}@localhost:5432/Cryptocurrencies'


## Save this line for production connection to heroku database

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or 
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or  f'postgresql://{rds_connection_string}'


## Create engine using the connection string to the database

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

# Reflect an existing database into a new model

Base = automap_base()

## reflect the tables

Base.prepare(engine, reflect=True)

# Save a reference to the database tables we want to modify

bitcoin_four_years_data = Base.classes.bitcoin_four_years_data
btc_community = Base.classes.btc_community


def master_database_updating_app_bitcoin_only(table_name):
    
    #################################################################
    ## STEP 1: Get list of dates with missing data
    #################################################################
    
    # Get today's date
    
    today = datetime.date.today()

    # Get the most recent date from data base using a query
    
    most_recent_entry_date = pd.read_sql_query(f"select dt from {table_name} order by dt desc limit 1", con=engine)['dt'][0]


    ## Make list of dates between today and the most recent one, 
    ## First get the number of days
    
    num_days = (today - most_recent_entry_date).days -1


    # Now make a list conprehension to provide the lists
    
    missing_dates_descending_order = [today - datetime.timedelta(days=x) for x in range(num_days)]
    missing_dates_ascending_order = [today - datetime.timedelta(days=num_days) + datetime.timedelta(days=x)for x in range(num_days+1)]
    
    #################################################################
    ## STEP 2: Make requests to api for missing date from the table
    #################################################################
    
    
    # Get the name of the token
        
    token = pd.read_sql_query(f"select name from {table_name} order by id desc limit 1", con=engine)['name'][0]
    
    ## Check to see if database is up to date
    
    if len(missing_dates_ascending_order) == 0:
        print("Database up to date")

    for x in range(len(missing_dates_ascending_order)):
        
        session = Session(engine)
        
        dt = missing_dates_ascending_order[x]
        print("now checking:", missing_dates_ascending_order[x])
        
        url = f"https://api.coingecko.com/api/v3/coins/{token}/history?date={missing_dates_ascending_order[x].strftime('%d-%m-20%y')}localization=False"
        
        response_json = requests.get(url).json()
        
        #################################################################
        ## STEP 3: COLLECT THE RESPONSE AND ADD IT TO DATABASE
        #################################################################
        
        ## Since we have to add our own primary keys, find out max primary key number
    
        last_primary_key = pd.read_sql_query(f"select max(id) from {table_name} limit 10", con=engine)['max'][0].item()
        next_primary_key = last_primary_key+1

        ## Add our parameters to our session to update bitcoin_four_years_data
        
        id = next_primary_key 
        dt = dt
        name = token
        symbol = response_json['symbol']
        name_2 = response_json['name']
        localization = response_json['localization']
        image = response_json['image']
        market_data = response_json['market_data']
        community_data = response_json['community_data']
        developer_data = response_json['developer_data']
        public_interest_stats = response_json['public_interest_stats']
        
        session.add(bitcoin_four_years_data(id = id, 
        dt = dt,
        name = name,
        symbol = symbol,
        name_2 = name_2,
        localization = f'{localization}',
        image = f'{image}',
        market_data = f'{market_data}',
        community_data = f'{community_data}',
        developer_data = f'{developer_data}',
        public_interest_stats = f'{public_interest_stats}'))

        # Commit and close the session for the changes to be uploaded to the databse

       
        
        ##############################################################################
        ## STEP 4: UNPACK COMMUNITY DATA AND ADD IT TO ITS TABLE
        ##############################################################################
        
        facebook_likes = community_data['facebook_likes']
        twitter_followers = community_data['twitter_followers']
        reddit_average_posts_48h = community_data['reddit_average_posts_48h']
        reddit_average_comments_48h = community_data['reddit_average_comments_48h']
        reddit_subscribers = community_data['reddit_subscribers']
        reddit_accounts_active_48h = community_data['reddit_accounts_active_48h']
        
        session.add(btc_community(
        id = id,
        dt = dt,
        name = name,
        facebook_likes = facebook_likes,
        twitter_followers = twitter_followers,
        reddit_average_posts_48h = reddit_average_posts_48h,
        reddit_average_comments_48h = reddit_average_comments_48h,
        reddit_subscribers = reddit_subscribers,
        reddit_accounts_active_48h = reddit_accounts_active_48h
        ))
        
        session.commit()
        session.close()

        
    return "SUCCESS!"