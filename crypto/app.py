# import dependencies 
import os
import datetime
import requests
import numpy as np

from flask import Flask, render_template
from flask import Flask, jsonify
from flask.helpers import send_file
from pandas.io.sql import SQLAlchemyRequired

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, query_expression
from sqlalchemy import create_engine, func



# from flask.sqlalchemy import SQLAlchemy
# db = SQLAlchemy

from flask import Flask, request, send_from_directory


import pandas as pd
from sqlalchemy.sql.functions import user

# from config import password

import numpy as np

from crypto.update_db import master_database_updating_app_bitcoin_only

# Flask app set up

app = Flask(__name__)

# setup postgress connection
# rds_connection_string = f'postgres:{password}@localhost:5432/Cryptocurrencies'

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or f'postgresql://{rds_connection_string}'


# engine = create_engine(f'postgresql://{rds_connection_string}')

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

# Reflect an existing database into a new model

Base = automap_base()

# reflect the tables

Base.prepare(engine, reflect=True)

# Save a reference to the cleaned table
crypto_2018 = Base.classes.cleaned_2018_stats


@app.route("/")
def index():

    return render_template('index.html')


@app.route("/custom.css")
def css():

    # return "test"
    return send_from_directory('css', 'static/css/custom.css')


# Route for alexa page

@app.route("/alexa")
def alexa():


    return render_template('Alexa_Rank.html')

@app.route("/update_db")
def update_db():
    
    user = input("What's your username?")
    status = ''
    
    # if (user == 'johann'):
    #     master_database_updating_app_bitcoin_only('bitcoin_four_years_data')
    #     status = "Success!"
    # else:
    #     status = 'Invalid Username'


    return status

# Route for twitter data page

@app.route("/twitter")
def twitter():


    return render_template('twitter.html')


# Route for reddit data page

@app.route("/reddit")
def reddit():


    return render_template('reddit.html')

#######################################################
# You can serve images from routes also!!
#######################################################

# Make route to serve reddit image from server

# @app.route("/templates/2018_reddit.png")
# def reddit_image():
#     return send_file('static/images/2018_reddit.png', mimetype='image')

# Route for data extraction page
@app.route("/dataextraction")
def dataextractions():


    return render_template('index.html')


# Route for contact page

@app.route("/contact")
def contact():

    return render_template('index.html')


# Route for API information

@app.route("/api")
def api_home():
    return(
        "Welcome to the cryptocurrency social media API! <br/>"
        "Available routes: <br/>"
        "/api/data/universal<br/>"
        "/api/data/2018<br/>"
        "/api/data/2021<br/>"
        "/api/names<br/>"
        "/api/single_search<br/>"
        "/api/data/universal"
    )


# Route for API containing all data

@app.route("/api/data/bitcoin_historical")
def bitcoin():

    
    result = pd.read_sql_query("select  id, dt::varchar, name, twitter_followers, reddit_average_comments_48h, reddit_subscribers, reddit_accounts_active_48h from btc_community order by dt desc;", con=engine)


    result_json = result.to_json(orient='records', double_precision=3, )
    
    return result_json

@app.route("/api/data/universal")
def uni():


    
    price = pd.read_sql_query("select * from universal_stats", con=engine)

    price_json = price.to_json(orient='records', double_precision=3, )
    
    return price_json


@app.route("/api/data/2018")
def data_2018():


    
    price = pd.read_sql_query("select * from cleaned_2018_stats", con=engine)

    price_json = price.to_json(orient='records', double_precision=3, )
    
    return price_json

@app.route("/api/data/2021")
def data_2021():


    
    price = pd.read_sql_query("select * from cleaned_2021_stats limit 89", con=engine)

    price_json = price.to_json(orient='records', double_precision=3, )
    
    return price_json


# Provide api that gives all of the names of the cryptocurrencies in question

@app.route("/api/names")
def names():



    price = pd.read_sql_query("select name from cleaned_2018_stats", con=engine)

    price_json = price.to_json(orient='records', double_precision=3, )
    
    return price_json


###########################################
# Another way to display api through a session
#############################################
# # create our session from python to database
# session = Session(engine)

# # Query crypto currencies names and prices
# results = session.query(crypto_2018.name).all()

# all_names = list(np.ravel(results))

# session.close()

# print(all_names)
# return jsonify(all_names)

# Route for searching

@app.route("/api/single_search")
def data_by_name():


    crypto_to_search = input('What crypto currency would you like to search? ')
    price = pd.read_sql_query(f"select * from cleaned_2018_stats where name like '{crypto_to_search}' ", con=engine)

    price_json = price.to_json(orient='records', double_precision=3, )
    
    return price_json

# App route for reddit info api

@app.route("/api/reddit")
def reddit_api():
    
    result = pd.read_sql_query("select name, reddit_subscribers from cleaned_2018_stats", con=engine)

    result_json = result.to_json(orient='records', double_precision=3, )
    
    return result_json


if __name__ =="__main__":
    app.run(debug=False)