const mongoose = require("mongoose");
const Route = require('../models/Route')

const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, './data.json')


mongoose.connect("mongodb://localhost/webProject", 
		() => {
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
                        }, update = { expire: new Date() }, options = { upsert: true };

                        Route.findOneAndUpdate(query, update, options, function(error, result) {
                            if (!error) {
                                // If the document doesn't exist
                                if (!result)
                                    result = new Route(); // Create it
                                // Save the document
                                result.save(function(error) {
                                    if (!error) {
                                        // Do something with the document
                                    } else {
                                        throw error;
                                    }
                                });
                            }
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
                            if (!error) {
                                // If the document doesn't exist
                                if (!result)
                                    result = new Route(); // Create it
                                // Save the document
                                result.save(function(error) {
                                    if (!error) {
                                        // Do something with the document
                                    } else {
                                        throw error;
                                    }
                                });
                            }
                        });

                    }
                    console.log("Data creation completed")
                }
              })
        },
		e => console.error("Error while creating routes: " + e.message)
);