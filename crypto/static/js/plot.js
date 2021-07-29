const url_2018 = "/api/data/2018";


// Fetch the JSON data for 2018
d3.json(url_2018).then(function(data) {

    // Make empty arrays to hold x and y values
    var crypto_names = []
    var reddit_y = []
    var twitter_y = []
    var alexa_y = []
    var year = '2018'

    for (i = 0; i < data.length ; i++){

    index = data[i].id + 1
    token = data[i].name
    combo = index.toString() + ' ' + token

    crypto_names.push(combo)
    reddit_y.push(data[i].reddit_subscribers)
    twitter_y.push(data[i].twitter_followers)
    alexa_y.push(data[i].alexa_rank)
  
    }

    
    build_plot(crypto_names, reddit_y, 'reddit', year)
    build_plot(crypto_names, twitter_y, 'twitter', year)
    build_plot(crypto_names, alexa_y, 'alexa', year)
});

// pull data from 2021

const url_2021 = "/api/data/2021";
d3.json(url_2021).then(function(data) {

    // Make empty arrays to hold x and y values
    var crypto_names = []
    var reddit_y = []
    var twitter_y = []
    var alexa_y = []
    var year = '2021'

    for (i = 0; i < data.length ; i++){

    index = data[i].id + 1
    token = data[i].name
    combo = index.toString() + ' ' + token

    crypto_names.push(combo)
    reddit_y.push(data[i].reddit_subscribers)
    twitter_y.push(data[i].twitter_followers)
    alexa_y.push(data[i].alexa_rank)
  
    }

    
    build_plot(crypto_names, reddit_y, 'reddit', year)
    build_plot(crypto_names, twitter_y, 'twitter', year)
    build_plot(crypto_names, alexa_y, 'alexa', year)
});

function define_color(social_media){
    if (social_media == 'reddit'){
        return 'rgb(255,69,0)'
    } else if (social_media == 'twitter'){
        return 'rgb(29,161,242)'
    } else {
        return 'rgb(35, 47, 62)'
    }
}

// define_color('reddit');

function build_plot(x_values, y_values, social, year){


    var trace1 = {
        x: x_values,
        y: y_values,
        type: "bar",
        marker: {
           color: define_color(`${social}`)
            }
        };

    data = [
        trace1
    ];

    Plotly.newPlot(`${social}-plot${year}`, data);

};
