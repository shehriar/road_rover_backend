const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

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
    const [cars] = await pool.query("SELECT DISTINCT vehiclemodel from carrentals;");
    return cars
}

async function allVehiclesFromPickupLocation(pickupCity){
    const query = "SELECT * from CarRentals WHERE locationcity = ?";
    const [vehicleData] = await pool.query(query, [pickupCity]);
    console.log(vehicleData)
    return vehicleData;
}

async function main() {
    try {
        const cars = await allVehiclesFromPickupLocation('Irondale');
        console.log(cars);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();

module.exports = {
    allLocations,
    allCarModels,
    allVehiclesFromPickupLocation
}