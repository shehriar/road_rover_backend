const mysql = require("mysql2")
const dotenv = require("dotenv")
const path = require('path');
const fs = require('fs');
dotenv.config()

async function executeSQLFile(filePath) {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }).promise();

    try {
        const sqlCommands = fs.readFileSync(filePath, { encoding: 'UTF-8' });

        const statements = sqlCommands.split(/;\s*$/m);
        for (const statement of statements) {
            if (statement.trim().length > 0) {
                await pool.query(statement);
            }
        }
        console.log('SQL file executed successfully.');
    } catch (error) {
        console.error('Failed to execute SQL file:', error);
    } finally {
        await pool.end();
    }
}
const sqlFilePath = path.join(__dirname, 'car_rental.sql');
// executeSQLFile(sqlFilePath);

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE ,
}).promise()

async function getVehicleModelCount() {
    const [result] = await pool.query("SELECT COUNT(DISTINCT vehicleModel) from carrentals");
    return result;
}

async function allLocations() {
    const [locations] = await pool.query("SELECT DISTINCT locationcity, locationstate FROM carrentals ORDER BY locationstate, locationcity");
    return locations;
}

async function allCarModels(){
    const [cars] = await pool.query("SELECT * from carrentals;");
    return cars
}

async function allVehiclesFromPickupLocation(pickupCity){
    const query = "SELECT * from CarRentals WHERE locationcity = ?";
    const [vehicleData] = await pool.query(query, [pickupCity]);
    // console.log(vehicleData)
    return vehicleData;
}

async function allVehicleTypes(){
    const query = "SELECT DISTINCT vehicletype from CarRentals;"
    const [vehicleTypes] = await pool.query(query);
    console.log(vehicleTypes)
    return vehicleTypes;
}

async function allVehicleMakes(){
    const query = "SELECT DISTINCT vehiclemake from CarRentals;";
    const [vehicleMakes] = await pool.query(query);
    // console.log(vehicleMakes);
    return vehicleMakes
}

async function allFuelTypes(){
    const query = "SELECT DISTINCT fueltype from CarRentals WHERE fueltype is not NULL;"
    const [fuelType] = await pool.query(query);
    return fuelType;
}

async function test(){
    const [cars] = await pool.query("SELECT vehiclemodel from carrentals where locationcity = 'Oxford';");
    console.log(cars)
    return cars
}

async function main() {
    try {
        const cars = await allVehiclesFromPickupLocation('Irondale');
        console.log(cars);
    } catch (error) {
        console.error('Error:', error);
    }
}


module.exports = {
    allLocations,
    allCarModels,
    allVehiclesFromPickupLocation,
    allVehicleTypes,
    allVehicleMakes,
    allFuelTypes
}