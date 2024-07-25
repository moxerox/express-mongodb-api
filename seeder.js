const mongoose = require('mongoose');
const readline = require('readline');
const Item = require('./models/itemModel');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createItems = (count) => {
    const items = [];
    for (let i = 1; i <= count; i++) {
        items.push({
            name: `Random Item ${i}`,
            description: `Description for Random Item ${i}`,
            quantity: getRandomNumber(0, 50)
        });
    }
    return items;
};

const seedDatabase = async (itemCount, emptyDatabase) => {
    try {
        await mongoose.connect('mongodb://localhost:27017/itemdb');
        console.log('Connected to the database');

        if (emptyDatabase) {
            // Clear the database
            await Item.deleteMany({});
            console.log('Cleared existing data');
        }

        // Insert dummy data
        const items = createItems(itemCount);
        await Item.insertMany(items);
        console.log('Inserted dummy data');

        // Close the connection
        await mongoose.disconnect();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding the database:', error);
        process.exit(1);
    }
};

const checkDatabaseExists = async () => {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/itemdb');
        const collections = await db.connection.db.listCollections().toArray();
        await mongoose.disconnect();
        return collections.length > 0;
    } catch (error) {
        console.error('Error checking database existence:', error);
        process.exit(1);
    }
};

rl.question('How many items would you like to insert? ', async (answer) => {
    const itemCount = parseInt(answer, 10);
    if (isNaN(itemCount) || itemCount <= 0) {
        console.log('Please enter a valid number greater than 0.');
        rl.close();
        return;
    }

    const dbExists = await checkDatabaseExists();
    if (dbExists) {
        rl.question('The database already exists. Do you want to empty it first? (yes/no) ', (response) => {
            const emptyDatabase = response.toLowerCase() === 'yes';
            seedDatabase(itemCount, emptyDatabase).then(() => rl.close());
        });
    } else {
        seedDatabase(itemCount, false).then(() => rl.close());
    }
});