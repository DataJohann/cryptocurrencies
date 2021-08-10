


// Fetch the JSON data for 2018

function build_2018_charts(token){
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

        build_plot(crypto_names, reddit_y, 'reddit', year)
        build_plot(crypto_names, twitter_y, 'twitter', year)
        build_plot(crypto_names, alexa_y, 'alexa', year)
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

        
        build_plot(crypto_names, reddit_y, 'reddit', year)
        build_plot(crypto_names, twitter_y, 'twitter', year)
        build_plot(crypto_names, alexa_y, 'alexa', year)
    });
};
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

// Select the year from the drowdown menu

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/api/data/2018").then((data) => {
      var sampleNames = data.filter(dataObj => dataObj.name);
        
    
    //   console.log(names)
      
    //   sampleNames.forEach((sample) => {
    //     console.log(sample)
    //     selector
    //       .append("option")
    //       .text(sample.name)
    //       .property("value", sample);
    //   });
    selector
    .append("option")
    .text("All")
      Object.entries(data).forEach(([key, value]) =>{
          selector
            .append("option")
            .text(value.name)
            .property("value", value.name)
      })
     
    
    build_2018_charts();
    build_2021_charts();

    });
  }

// Call a function to rebuild the chart when the option changes

function optionChanged(newToken){
    
    build_2018_charts(newToken)
    build_2021_charts(newToken)
}

init()
