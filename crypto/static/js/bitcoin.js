const url_bitcoin = '/api/data/bitcoin_historical'

d3.json(url_bitcoin).then(function (data){

    dates_x = []
    reddit_y = []
    for (i=0; i < data.length; i++ ){
        dates_x.push(data[i].date)
        reddit_y.push(data[i].reddit_subscribers)

    }

    // Reverse lists 

    x = dates_x.reverse()
    y = reddit_y.reverse()

    var trace = {
        x: x,
        y: y,
        type: 'scatter'
    };

    var data = [trace]

    Plotly.newPlot('reddit-plot2018', data)


})