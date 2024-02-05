// import express from 'express'
const database = require('./database.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
  
// handling CORS 
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin",  
               "http://localhost:4200"); 
    res.header("Access-Control-Allow-Headers",  
               "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
}); 

app.get('/api/locations', async (req, res) => { 
    try {
        const locations = await database.allLocations();
        res.json({ locations: locations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/vehicle_models', async (req, res) => {
    try {
        const vehicle_models = await database.allCarModels();
        res.json({vehicle_models: vehicle_models});
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
})

app.get('/api/vehicle_types', async (req, res) => {
    try {
        const vehicle_types = await database.allVehicleTypes();
        res.json({vehicle_types: vehicle_types});
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
})

app.get('/api/vehicle_makes', async (req, res) => {
    try {
        const vehicleMakes = await database.allVehicleMakes();
        res.json({ vehicleMakes: vehicleMakes});
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
})

app.get('/api/fuel_types', async (req, res) => {
    try {
        const fuelTypes = await database.allFuelTypes();
        res.json({ fuelTypes : fuelTypes});
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
})

app.post('/api/vehicles_from_pickup_location', async (req, res) => {
    try {
        const pickupLocation = req.body.pickupLocation;
        const vehicleDataFromPickupLocation = await database.allVehiclesFromPickupLocation(pickupLocation);
        res.json({vehicleDataFromPickupLocation: vehicleDataFromPickupLocation});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
app.listen(3000, () => { 
    console.log('Server listening on port 3000'); 
});