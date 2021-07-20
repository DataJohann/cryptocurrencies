# import dependencies 
import os

from flask import Flask, render_template
from flask import Flask, jsonify
from flask.helpers import send_file

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# from flask.sqlalchemy import SQLAlchemy
# db = SQLAlchemy

from flask import Flask, request, send_from_directory


import pandas as pd

from config import password

import numpy as np


# Flask app set up

app = Flask(__name__)

# setup postgress connection

rds_connection_string = f'postgres:{password}@localhost:5432/Cryptocurrencies'
engine = create_engine(f'postgresql://{rds_connection_string}')

# Reflect an existing database into a new model

Base = automap_base()

# reflect the tables

Base.prepare(engine, reflect=True)

# Save a reference to the cleaned table
crypto_2018 = Base.classes.cleaned_2018_stats






# print(cryptos)

@app.route("/")
def index():

    return render_template('index.html')


@app.route("/custom.css")
def css():

    # return "test"
    return send_from_directory('css', 'static/css/custom.css')


#######################################################
# You can serve images from routes also!!
#######################################################

# Make route to serve reddit image from server

# @app.route("/templates/2018_reddit.png")
# def reddit_image():
#     return send_file('templates/2018_reddit.png', mimetype='image')

@app.route("/alexa")
def alexa():


    return render_template('Alexa_Rank.html')

@app.route("/twitter")
def twitter():


    return render_template('twitter.html')

@app.route("/reddit")
def reddit():


    return render_template('reddit.html')

@app.route("/api")
def api_home():
    return(
        "Welcome to the cryptocurrency social media API! <br/>"
        "Available routes: <br/>"
        "/data<br/>"
        "/names<br/>"
        "/single_search"


    )

@app.route("/api/data")
def data():


    
    price = pd.read_sql_query("select * from cleaned_2018_stats", con=engine)

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


if __name__ =="__main__":
    app.run(debug=True)