import { uploadCollection } from "./uploadCollection.js";
import dotenv from 'dotenv';
import { Dataset } from 'crawlee';
import util from 'util';

// Load environment variables
dotenv.config({ silent: true });

// Extract environment variables
const gitFolder = process.env.gitFolder;
const URL_CATEGORIES = process.env.URL_CATEGORIES;
const site = process.env.site;

async function processDataUpload() {
  try {
    // Open dataset
    const dataset = await Dataset.open(gitFolder);
    const { items: data } = await dataset.getData();

    // Filter out error entries
    const filterError = data.filter(f => !f.error);
    
    // Calculate error percentage
    const errorPercentage = ((data.length - filterError.length) / data.length) * 100;
    
    // Log a sample object with full details
    if (data.length > 0) {
      console.log('Sample Object (Full Details):');
      console.log(util.inspect(data[0], { 
        showHidden: false, 
        depth: null, 
        colors: true 
      }));
    }

    // Check if error percentage is acceptable (less than 5%)
    if (errorPercentage <= 5) {
      if (filterError.length > 0) {
        console.log('Collected data length:', filterError.length);
        
        // Log a sample object from filtered (non-error) data
        if (filterError.length > 0) {
          console.log('Sample Object (Filtered, Non-Error):');
          console.log(util.inspect(filterError[0], { 
            showHidden: false, 
            depth: null, 
            colors: true 
          }));
        }
        
        // Attempt to upload collection
        await uploadCollection({ 
          fileName: site || URL_CATEGORIES, 
          data: filterError, 
          gitFolder 
        });
        
        console.log('Data upload successful');
      } else {
        throw new Error('No valid data to upload');
      }
    } else {
      // If error percentage is too high, throw an error
      const dataWithError = data.filter(f => f.error);
      console.error('High error rate detected:', {
        totalDataLength: data.length,
        errorLength: dataWithError.length,
        errorPercentage: errorPercentage.toFixed(2) + '%'
      });
      
      // Log first error for debugging
      if (dataWithError.length > 0) {
        console.error('Sample Error Object:', util.inspect(dataWithError[0], { 
          showHidden: false, 
          depth: null, 
          colors: true 
        }));
      }
      
      throw new Error(`Error rate exceeds 5%: ${errorPercentage.toFixed(2)}%`);
    }
  } catch (error) {
    console.error('Upload process failed:', error);
    throw error; // Re-throw to allow caller to handle
  }
}

// Execute the upload process
processDataUpload().catch(err => {
  console.error('Unhandled error in data upload:', err);
  process.exit(1);
});


// import { uploadCollection } from "./uploadCollection.js";
// import dotenv from 'dotenv';
// import { Dataset } from 'crawlee';

// dotenv.config({ silent: true });
// const gitFolder = process.env.gitFolder
// const URL_CATEGORIES = process.env.URL_CATEGORIES
// const site = process.env.site
// const dataset = await Dataset.open(gitFolder);
// const { items: data } = await dataset.getData()

// const filterError = data.filter(f => !f.error)
// const fileName = Date.now()

// //await uploadCollection({fileName, data,gitFolder})
// if (filterError.length > 0) {
//     console.log('collected data length', filterError.length)
//     await uploadCollection({ fileName: site || URL_CATEGORIES, data: filterError, gitFolder })
// }
// else {

//     const dataWithError = data.filter(f => f.error)
//     console.log('ERROR length:', dataWithError.length)
//     console.log('ERROR :',dataWithError[0])
//     throw new Error(`data length:${filterError.length}`);


// }
