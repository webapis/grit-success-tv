
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('nav a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://tr.manuatelier.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }




}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const pageURL = await page.url();

    // Count the number of product items on the page
    const productItemsCount = await page.locator('.collection__products').count();

    if (productItemsCount > 0) {
        // Scroll down to load more products if necessary
        await autscroll(page, 150);

        const data = await page.evaluate((_pageURL) => {
            const pageTitle = document.title;
            const content = document.documentElement.innerHTML; // Use document.documentElement for full HTML

            // Extract product information
            const result = Array.from(document.querySelectorAll('.grid-item.product-item')).map(element => {
                try {
                    const title = element.querySelector('.product-item__bg img').alt
                    const price = element.querySelector('.price .new-price') ?
                        element.querySelector('.price .new-price').innerText.trim() : 'N/A'; // Handle missing price
                    const img = element.querySelector('[srcset]') ?
                        element.querySelector('[srcset]').src : ''; // Handle missing image
                    const link = document.querySelector('.product-item__image a') ?
                        document.querySelector('.product-item__image a').href : ''; // Handle missing link

                    return {
                        title,
                        link,
                        price,
                        img,
                        pageURL: element.baseURI,
                        pageTitle
                    };
                } catch (error) {
                    return { error: true, message: error.message, content, pageURL: _pageURL };
                }
            });

            return result;
        }, pageURL);

        console.log('data.length', data.length);
        return data;
    } else {
        console.log('Not a product page:', pageURL);
        return [];
    }
}


const urls = ["https://tr.manuatelier.com/"]
export { urls }