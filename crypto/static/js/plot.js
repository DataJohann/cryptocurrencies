


// Fetch the JSON data for 2018

function build_2018_charts(token, reddit_max, twitter_max, alexa_2021){
    const url_2018 = "/api/data/2018";
    d3.json(url_2018).then(function(data) {

        // // Grab hold of the selector
        // var selector = d3.select("#selDataset");

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

        // Calculate max value for y axis
        reddit_max > Math.max.apply(Math, reddit_y) ? reddit_max = reddit_max : reddit_max = Math.max.apply(Math, reddit_y)
        twitter_max > Math.max.apply(Math, twitter_y) ? twitter_max = twitter_max : twitter_max = Math.max.apply(Math, twitter_y)

        // Alexa rank is inverted since the lower rank is better
        alexa_2021 < Math.max.apply(Math, alexa_y) ? alexa_2021 = Math.max.apply(Math, alexa_y) : alexa_2021 = alexa_2021
       

        // console.log(Math.max(parseInt(alexa_y)))
        // twitter_max = Math.max(parseInt(twitter_y))
        // alexa_max = Math.max(parseInt(alexa_y))


        build_plot(crypto_names, reddit_y, 'reddit', year, reddit_max)
        build_plot(crypto_names, twitter_y, 'twitter', year, twitter_max)
        build_plot(crypto_names, alexa_y, 'alexa', year, alexa_2021)
    });
};


// pull data from 2021

// Prepare data to build charts for 2021

function build_2021_charts(token){

    const url_2021 = "/api/data/2021";
   d3.json(url_2021).then(function(data) {

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

        // Obtain the y maximulum values
        // Send the maximum value to the other chart, compare and pass the biggest one to the build plot chart to normalize data
        reddit_max = Math.max.apply(Math, reddit_y)
        twitter_max = Math.max.apply(Math, twitter_y)
        alexa_max = Math.max.apply(Math, alexa_y)
        
        // console.log(Math.max.apply(Math, alexa_y))

        build_2018_charts(token, reddit_max, twitter_max, alexa_max)

        build_plot(crypto_names, reddit_y, 'reddit', year)
        build_plot(crypto_names, twitter_y, 'twitter', year)
        build_plot(crypto_names, alexa_y, 'alexa', year)
    });
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

// function to find the y max value to normalize the chart y axis view

function y_scale(token, year_a, year_b){

    years = [year_a, year_b]
    var max_values = []
    max_value = []
    // for (var x = 0; x < years.length; x++){

        let url = `/api/data/${year_a}`;
        d3.json(url).then(function (data) {
            //  Create an array with the data for the selected token
            var resultArray = data.filter(tokenObj => tokenObj.name == token);

            //  Check to see if the result array has no results, if so, it means user wants to see all tokens in graph
            // 
            resultArray == 0 ? data = data : data = resultArray;
            
            year_a_max_value = 0
        
            for (var i = 0; i < data.length; i++){
                    var alexa_int = data[i].alexa_rank
                    alexa_int > year_a_max_value ? year_a_max_value = alexa_int : year_a_max_value = year_a_max_value
            }

            url = `/api/data/${year_b}`
            d3.json(url).then(function (data){
                 //  Create an array with the data for the selected token
                var resultArray = data.filter(tokenObj => tokenObj.name == token);

                //  Check to see if the result array has no results, if so, it means user wants to see all tokens in graph
                // 
                resultArray == 0 ? data = data : data = resultArray;

                for (var i = 0; i < data.length; i++){
                    var alexa_int = data[i].alexa_rank
                    alexa_int > year_a_max_value ? year_a_max_value = alexa_int : year_a_max_value = year_a_max_value
            }
            export_value(year_a_max_value)



                
                // console.log(data)
                // console.log(year_a_max_value)
            })
    

        } ) 
    // } 
    // max_values.forEach(function(item, index, array){
    //     console.log(item, index)
    // })
    // var max_y = 0
    // setTimeout(function (){
    //     max_y = Math.max.apply(Math, max_values)
    //     max_value.push(max_y)
    //     console.log(Math.max.apply(Math, max_values)) }, 1000)

    // console.log(max_value)
    
}

// Define function to grab value

function export_value(value){
    console.log(value)
    return value
}

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
        yaxis: {range: [0, y_max]}
      };

    Plotly.newPlot(`${social}-plot${year}`, data, layout);

};

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
    build_2021_charts();

    });
  }

// Call a function to rebuild the chart when the option changes

function optionChanged(newToken){
    
    build_2018_charts(newToken)
    build_2021_charts(newToken)
}

init()

var test_last = y_scale('ethereum', '2018', '2021')

console.log(test_last)

