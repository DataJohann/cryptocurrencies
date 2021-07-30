const url_bitcoin = '/api/data/bitcoin_historical'

d3.json(url_bitcoin).then(function (data){

    dates_x = []
    reddit_y = []
    for (i=0; i < data.length; i++ ){
        dates_x.push(data[i].date)
        // reddit_y.push(data[i].date)

    }

    
    string_i_guess = data[0].community_data
    array_dict = string_i_guess.split('"')
    json_i_guess = JSON.stringify(string_i_guess)
    json_hopefully = JSON.parse(json_i_guess)
    // var obj = JSON.parse(string_i_guess)
    console.log(data)
    // console.log(typeof(string_i_guess))

    console.log(json_i_guess)
    console.log(array_dict)
    console.log(json_hopefully[29])

    my_dict = Object(data[0].community_data)
    // console.log(dates_x)
    console.log(my_dict)

})