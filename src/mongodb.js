
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import {  Dataset } from 'crawlee';
dotenv.config({ silent: true });

const uri = process.env.mongodbUrl;
const site = process.env.site

const dataset = await Dataset.open('tvseries');
const {items:data} =await dataset.getData()
debugger

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function main() {


    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const result = await bulkUpsertData(client, data);
        console.log(`Inserted/Updated ${result.upsertedCount + result.modifiedCount} documents`);

    } finally {

        await client.close();
    }
}

async function bulkUpsertData(client, data) {
    const bulkOps = data.map((doc) => ({
        updateOne: {
            filter: { _id: doc.dizi.title },
            update: { $set: doc },
            upsert: true
        }
    }));

    const result = await client.db('tvseries').collection(site).bulkWrite(bulkOps);
    return result;
}

main().catch(console.error);




