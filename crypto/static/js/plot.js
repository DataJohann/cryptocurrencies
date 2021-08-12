
// Build both set of charts

function build_2021_charts(token, year_a, year_b){
    console.log(year_a)
    const url_a = `/api/data/${year_a}`;
    console.log(url_a)
    d3.json(url_a).then(function(data) {

        // Check to see if a token was passed, if not, make it an empty string so chart for 2018 is not broken
        token ? token = token : token = " ";
        // console.log(token) = ""

        //  Create an array with the data for the selected token
        var resultArray = data.filter(tokenObj => tokenObj.name == token);

        //  Check to see if the result array has no results, if so, it means user wants to see all tokens in graph
        // 
        resultArray == 0 ? data = data : data = resultArray; 

        // Make empty arrays to hold x and y values
        var crypto_names = []
        var reddit_y = []
        var twitter_y = []
        var alexa_y = []
        // var year_a = '2021'

        for (i = 0; i < data.length ; i++){
        
        index = data[i].id + 1
        asset = data[i].name
        // Combine index with asset name to save to a lits for x axis
        combo = index.toString() + ' ' + asset

        crypto_names.push(combo)
        reddit_y.push(data[i].reddit_subscribers)
        twitter_y.push(data[i].twitter_followers)
        alexa_y.push(data[i].alexa_rank)
    
        }

        // Obtain the y maximulum values
        // Send the maximum value to the other chart, compare and pass the biggest one to the build plot chart to normalize data
        reddit_max_a = Math.max.apply(Math, reddit_y)
        twitter_max_a = Math.max.apply(Math, twitter_y)
        alexa_max_a = Math.max.apply(Math, alexa_y)

        const url_b = `/api/data/${year_b}`;
        d3.json(url_b).then(function(data) {
            //  Create an array with the data for the selected token
            var resultArray = data.filter(tokenObj => tokenObj.name == token);

            //  Check to see if the result array has no results, if so, it means user wants to see all tokens in graph
            // 
            resultArray == 0 ? data = data : data = resultArray;

            // Make empty arrays to hold x and y values
            var crypto_names_b = []
            var reddit_y_b = []
            var twitter_y_b = []
            var alexa_y_b = []
            // var year_b = '2018'

            for (i = 0; i < data.length ; i++){

                index = data[i].id + 1
                token = data[i].name
                combo = index.toString() + ' ' + token

                crypto_names_b.push(combo)
                reddit_y_b.push(data[i].reddit_subscribers)
                twitter_y_b.push(data[i].twitter_followers)
                alexa_y_b.push(data[i].alexa_rank)
                
            }
            // Obtain the y maximulum values
            // Send the maximum value to the other chart, compare and pass the biggest one to the build plot chart to normalize data
            reddit_max_b = Math.max.apply(Math, reddit_y_b)
            twitter_max_b = Math.max.apply(Math, twitter_y_b)
            alexa_max_b = Math.max.apply(Math, alexa_y_b)

            // Compare values for both years

            reddit_y_scale = 0
            twitter_y_scale = 0
            alexa_y_scale = 0

            // Calculate max value for y axis
            reddit_max_b > reddit_max_a ? reddit_y_scale = reddit_max_b : reddit_y_scale = reddit_max_a
            twitter_max_b > twitter_max_a ? twitter_y_scale = twitter_max_b : twitter_y_scale = twitter_max_a
            alexa_max_b > alexa_max_a ? alexa_y_scale = alexa_max_b : alexa_y_scale = alexa_max_a

            // Build plots for year a
            build_plot(crypto_names, reddit_y, 'reddit', year_a, reddit_y_scale)
            build_plot(crypto_names, twitter_y, 'twitter', year_a, twitter_y_scale)
            build_plot(crypto_names, alexa_y, 'alexa', year_a, alexa_y_scale)


            // Build plots for year b
            build_plot(crypto_names_b, reddit_y_b, 'reddit', year_b, reddit_y_scale)
            build_plot(crypto_names_b, twitter_y_b, 'twitter', year_b, twitter_y_scale)
            build_plot(crypto_names_b, alexa_y_b, 'alexa', year_b, alexa_y_scale)


        })

        

    });
};


// Build bar plots

function build_plot(x_values, y_values, social, year, y_max){


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
    var layout = {
        yaxis: {
            side: 'left',
            range: [0, y_max]
        }
      };

    Plotly.newPlot(`${social}-plot${year}`, data, layout);

};

// Function to define the color of the chart
function define_color(social_media){
    if (social_media == 'reddit'){
        return 'rgb(255,69,0)'
    } else if (social_media == 'twitter'){
        return 'rgb(29,161,242)'
    } else {
        return 'rgb(35, 47, 62)'
    }
}

// Select the year from the drowdown menu

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the dropdown menu options
    d3.json("/api/data/2018").then((data) => {
    
    // Add 'All option to see all entries
    selector
    .append("option")
    .text("All")
    Object.entries(data).forEach(([key, value]) =>{
        selector
        .append("option")
        .text(value.name)
        .property("value", value.name)
    })
    
    
    // build_2018_charts();
    build_2021_charts("", 2018, 2021);

    });
  }

// Call a function to rebuild the chart when the option changes

function optionChanged(newToken){
    
    // build_2018_charts(newToken)
    build_2021_charts(newToken, 2018, 2021)
}

init();


