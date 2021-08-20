# Step 1: Getting all the files in your machine and your environment set up

## 1. Clone this repo to your local machine
## 2. Install conda package manager for python:

###    Step 1. Go to the Anaconda Distribution Page

###    Step 2 Click Download, and select the latest Python version.

###    Step 3 Follow the steps in the visual installer!

###    Install Anaconda for Windows
###    Step 1. Go to the Anaconda Distribution Page

###    Step 2. Click Download, and select the latest Python version.

###    Step 3. Open the installer and follow the instructions to complete the installation.

###    Important! Please ensure that you check the box that says "add to PATH" when installing on PC.

## 3. Create a new environment to hold our libraries by running the following command in your terminal: 

    conda create -n crypto_tracker_env --file <path to requirements.txt file you just cloned> python=3.7

#### Don't include <> symbols in the path




# Step 2: Setting up local Database with postgres





The app expects a local database set up with 2 tables: cleaned_2018_stats and cleaned_2021_stats. There are csv files to start your database. Run the following queries in psql command shell
 
## 1. Intalling postgres (skip this step if you already have postgres in your machine)

### 1. Visit: 
    https://www.enterprisedb.com/downloads/postgres-postgresql-downloads 
    
#### and download the postgres version that matches your system (windows or mac)

### 2. Once file is dowloaded, click and execute it. For windows, the file will end in .exe and for Mac in .app

### 3. Go through the Setup Wizard and install PostgreSQL. Keep the default location as: /Library/PostgreSQL/12.

# IMPORTANT: WRITE DOWN THE PASSWORD FOR POSTGRES USER WHEN PROMPTED. YOU WILL NEED IT LATER TO ACCESS PSQL

####    Select the components to be installed. Be sure to un-check Stack Builder.



####    Next, add your Data Directory. Keep the default location as: /Library/PostgreSQL/12/data.

####    Next, enter postgres as the password. Be sure to record this password for future use.

####    Keep the default port as 5432 and in the Advanced Options, set the locale as [Default locale].

####    The final screen will be the Pre Installation Summary

### 4. search for psql and click in the program to run it. A terminal connecting to postgress will open


## 2.  Set up the first Table

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
    \i '<path/to/schemata_db.sql>'

####    (include single quotes but not <> symbols)

    \copy <table_name> from '</path/to/csv>' delimiter',' csv header

#### (include single quotes again) the path to the CSV Should be the path to your cleaned_2018_stats.csv file found in crypto/static/data

## 3. Set up second table

### 1. Open db_schemata.sql and comment:
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

#### And uncomment :
""
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

""

#### lines 11 - 25

### 2. open psql shell and run: 
    \i '<path/to/schemata_db.sql>'

####    (include single quotes but not <> symbols)

    \copy <table_name> from '</path/to/csv>' delimiter',' csv header

#### (include single quotes again but not <> symbols) the path to the CSV Should be the path to your cleaned_2021_stats.csv file found in crypto/static/data




# Step 3: making run.sh executable




## 1. Use your terminal to navigate to the project repo

## 2. Run:
    ls
## in your terminal and the "run.sh" file should show up in the list. If not, you're in the wrong directory

## 3. Once in the right directory, run:

    chmod a+x run.sh
## still in your terminal. This will make run.sh file executable

# Step 4: Activating environment and running app:

## 1. While in project directory, run:

    conda activate crypto_tracker_env

### in your terminal, you should see (crypto_tracker_env) in your terminal indicating the environment is activated

#### Troubleshooting:

#### 1. If environment fails to activate, you will see an error like "conda environment not found" run:

    conda env list

#### in your terminal. This will show a list of all available environments. Make sure crypto_tracker_env is there and check spelling. If not present, check step one in this guide

## 2. Still in the main directory for the project, run:
    ./run.sh