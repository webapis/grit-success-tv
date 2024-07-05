

import { uploadCollection } from "./uploadCollection.js";

import dotenv from 'dotenv';

import { Dataset } from 'crawlee';
dotenv.config({ silent: true });

const site = process.env.site
debugger
const dataset = await Dataset.open('tvseries');
const { items: data } = await dataset.getData()
debugger
await uploadCollection({fileName: site, data,gender:'tvseries', marka:site})
debugger