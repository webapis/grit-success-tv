import { uploadCollection } from "./uploadCollection.js";
import dotenv from 'dotenv';
import { Dataset } from 'crawlee';

dotenv.config({ silent: true });
const gitFolder = process.env.gitFolder

const site = process.env.site
const dataset = await Dataset.open(gitFolder);
const { items: data } = await dataset.getData()

await uploadCollection({fileName: site, data,gitFolder})
