import { uploadCollection } from "./uploadCollection.js";
import dotenv from 'dotenv';
import { Dataset } from 'crawlee';

dotenv.config({ silent: true });
const gitFolder = process.env.gitFolder
const URL_CATEGORIES = process.env.URL_CATEGORIES
const site =  process.env.site
const dataset = await Dataset.open(gitFolder);
const { items: data } = await dataset.getData()

const filterError  =data.filter(f=>!f.error)
const fileName = Date.now()

//await uploadCollection({fileName, data,gitFolder})
await uploadCollection({fileName: site||URL_CATEGORIES, data:filterError,gitFolder})
