const mongoose = require("mongoose");
const Route = require('./models/Route')


const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, './data.json')

//opening connection
mongoose.connect("mongodb://mongodb/webProject", 
		() => {
            console.log("Routes service connected")
            fs.readFile(filePath, (err, data) => {
                if(err){
                    console.log('Something went wrong: ' + err);
                }   else {
                    const obj = JSON.parse(data);
                    var count = Object.keys(obj).length; //get the number of items
                    //after getting all the required datas, time to put inside the DB
                    for(let i = 0; i < count; i++) {
                        //add first trip
                        var query = {
                            name: obj[i].C1 + "-" + obj[i].C2,
                            cities: {
                                starting_city: obj[i].C1,
                                ending_city: obj[i].C2
                            }
                        }, update = { expire: new Route() }, options = { upsert: true };

                        Route.findOneAndUpdate(query, update, options, function(error, result) {
                            if (error) return;
                        
                            // do something with the document
                        });

                        //after first trip, we have to create the second
                        //it's the same, but with starting and ending reversed
                        query = {
                            name: obj[i].C2 + "-" + obj[i].C1,
                            cities: {
                                starting_city: obj[i].C2,
                                ending_city: obj[i].C1
                            }
                        }, update = { expire: new Date() }, options = { upsert: true };

                        Route.findOneAndUpdate(query, update, options, function(error, result) {
                            if (error) return;
                        
                            // do something with the document
                        });

                    }
                }
              })
        },
		e => console.error("Error with routes service: " + e.message)
);

exports.getAllRoutes = async function() {
    const routesFound = await Route.find().select(["-_id", "-__v"]).sort({name:1});
    return {found: routesFound.length, payload: routesFound}
}

exports.getRoute = async function(routeName) {
    const routesFound = await Route.find({name: routeName}).select(["-_id", "-__v"]);
    return {found: routesFound.length > 0, payload: routesFound[0]}
}

exports.getRoutesWithStartingCity = async function(startingCity) {
    const routesFound = await Route.find({"cities.starting_city": startingCity}).select(["-_id", "-__v"]).sort({name:1});
    return {found: routesFound.length, payload: routesFound}
}

exports.getRoutesWithEndingCity = async function(endingCity) {
    const routesFound = await Route.find({"cities.ending_city": endingCity}).select(["-_id", "-__v"]).sort({name:1});
    return {found: routesFound.length, payload: routesFound}
}