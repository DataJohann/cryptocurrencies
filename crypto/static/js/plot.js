const url = "/api/data";

console.log(d3.json(url))

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {

    // Make empty arrays to hold x and y values
    var crypto_names = []
    var reddit_y = []
    var twitter_y = []
    var alexa_y = []

    for (i = 0; i < data.length ; i++){

    crypto_names.push(data[i].name)
    reddit_y.push(data[i].reddit_subscribers)
    twitter_y.push(data[i].twitter_followers)
    alexa_y.push(data[i].alexa_rank)
    }
    
    build_plot(crypto_names, reddit_y, 'reddit')
    build_plot(crypto_names, twitter_y, 'twitter')
    build_plot(crypto_names, alexa_y, 'alexa')
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

define_color('reddit');

function build_plot(x_values, y_values, social){


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

    Plotly.newPlot(`${social}-plot`, data);

};
