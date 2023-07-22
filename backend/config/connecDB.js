import mysql from "mysql2/promise";

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log(`MySQL Connected: ${connection.config.host}`);
        return connection;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;



/*Now, wherever you want to use the database connection, 
you can import and call the connectDB function like this:

import connectDB from './path/to/connectDB';

// Inside an async function
const main = async () => {
    try {
        const connection = await connectDB();
        // Now you have an active connection to the MySQL database.
        // You can use the 'connection' object to execute queries, etc.
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

main();

*/
