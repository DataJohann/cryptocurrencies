
// Build both set of charts

function build_charts_year_a_year_b(token, year_a, year_b){

    // Log year to verify
    // console.log("Checking", token)
    // console.log(year_a, "Vs. ", year_b)


    // Check to see if a token was passed or if "all" was passed. If token was passes leave the value as token; otherwise change it to aid us in the sql query

    token == "" || token == "All"? token = "All" : token = token;

    const url_a = `/api/${token}/${year_a}`;


    d3.json(url_a).then(function(data) {

        // console.log("This is what the endpoint is sending", data)
        // Check to see if a token was passed, if not, make it an empty string so chart for 2018 is not broken
        // token ? token = token : token = " ";
        // console.log(token) = ""

        //  Create an array with the data for the selected token
        // var resultArray = data.filter(tokenObj => tokenObj.name == token);

        // console.log("This is the resulting array", resultArray)
        //  Check to see if the result array has no results, if so, it means user wants to see all tokens in graph
        // 
        // resultArray == 0 ? data = data : data = resultArray; 

        // Make empty arrays to hold x and y values
        var crypto_names = []
        var reddit_y = []
        var twitter_y = []
        var alexa_y = []
        // var year_a = '2021'

        for (i = 0; i < data.length ; i++){
        

        crypto_names.push(data[i].id)
        reddit_y.push(data[i].reddit_subscribers)
        twitter_y.push(data[i].twitter_followers)
        alexa_y.push(data[i].alexa_rank)
    
        }

        // Obtain the y maximulum values
        // Send the maximum value to the other chart, compare and pass the biggest one to the build plot chart to normalize data
        reddit_max_a = Math.max.apply(Math, reddit_y)
        twitter_max_a = Math.max.apply(Math, twitter_y)
        alexa_max_a = Math.max.apply(Math, alexa_y)
        

        const url_b = `/api/${token}/${year_b}`;

        d3.json(url_b).then(function(data) {
            //  Create an array with the data for the selected token
            // var resultArray = data.filter(tokenObj => tokenObj.name == token);

            // //  Check to see if the result array has no results, if so, it means user wants to see all tokens in graph
            // // 
            // resultArray == 0 ? data = data : data = resultArray;

            // Make empty arrays to hold x and y values
            var crypto_names_b = []
            var reddit_y_b = []
            var twitter_y_b = []
            var alexa_y_b = []
            // var year_b = '2018'

            for (i = 0; i < data.length ; i++){

                // index = data[i].id
                // token = data[i].name
                // combo = index.toString() + ' ' + token

                crypto_names_b.push(data[i].id)
                reddit_y_b.push(data[i].reddit_subscribers)
                twitter_y_b.push(data[i].twitter_followers)
                alexa_y_b.push(data[i].alexa_rank)
                
            }
            // Obtain the y maximulum values
            // Send the maximum value to the other chart, compare and pass the biggest one to the build plot chart to normalize data
            reddit_max_b = Math.max.apply(Math, reddit_y_b)
            twitter_max_b = Math.max.apply(Math, twitter_y_b)
            alexa_max_b = Math.max.apply(Math, alexa_y_b)
            alexa_min_b = Math.min.apply(Math, alexa_y_b)

            // Compare values for both years

            reddit_y_scale = 0
            twitter_y_scale = 0
            alexa_y_scale = 0

            // Calculate max value for y axis
            reddit_max_b > reddit_max_a ? reddit_y_scale = reddit_max_b : reddit_y_scale = reddit_max_a
            twitter_max_b > twitter_max_a ? twitter_y_scale = twitter_max_b : twitter_y_scale = twitter_max_a
            alexa_max_b > alexa_max_a ? alexa_y_scale = alexa_max_b : alexa_y_scale = alexa_max_a

            // Build plots for year a
            build_plot(crypto_names, reddit_y, 'reddit', 2018, reddit_y_scale)
            build_plot(crypto_names, twitter_y, 'twitter', 2018, twitter_y_scale)
            build_plot(crypto_names, alexa_y, 'alexa', 2018, alexa_y_scale)


            // Build plots for year b
            build_plot(crypto_names_b, reddit_y_b, 'reddit', 2021, reddit_y_scale)
            build_plot(crypto_names_b, twitter_y_b, 'twitter', 2021, twitter_y_scale)
            build_plot(crypto_names_b, alexa_y_b, 'alexa', 2021, alexa_y_scale)


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
            range: alexa_plot(social, y_max)
        }
      };

    Plotly.newPlot(`${social}-plot${year}`, data, layout);

};

//  Function to invert chart if it's alexa rank

function alexa_plot(social, y_max){
    if (social == 'alexa') {
        return [y_max, 0]
    } else {
        return [0, y_max]
    }
}

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

// Select the token from the drowdown menu

function init() {

    // Grab a reference to the dropdown select element
    var token_selector = d3.select("#selToken")

    // Use the list of sample names to populate the dropdown menu options
    d3.json("/api/All/2020-12-12").then((data) => {
    
    token_selector
    .append("Option")
    .text("All")
    data.forEach(row => {
        token_selector
        .append("option")
        .text(row.id)
        .property("value", row.id)
        
    });

    //  // Use this if API returns array instead of a jsonn
    // token_selector
    // .append("option")
    // .text("All")
    // Object.entries(data).forEach(([key, value]) =>{
    //     token_selector
    //     .append("option")
    //     .text(value.name)
    //     .property("value", value.name)
    // })
    
    // Find out the value in the date range

    date_a = d3.select("#start").node().value
    date_b = d3.select("#end").node().value

    // Initiate by building both comparison

    build_charts_year_a_year_b("", date_a, date_b);

    });
  }

// Call a function to rebuild the chart when the option changes

function optionChanged(newToken){


    // var year_selector = d3.select("#selYearA");
    newToken = d3.select("#selToken").node().value

    date_a = d3.select("#start").node().value
    date_b = d3.select("#end").node().value
    // year_selector.this.value ? console.log("exist") : console.log("does not exist")
    // build_2018_charts(newToken)
    build_charts_year_a_year_b(newToken, date_a, date_b)
}


function dateChanged(new_date){
    console.log(new_date)
    console.log(d3.select("#start").node().value)
}
init();


