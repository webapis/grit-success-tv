

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    // await enqueueLinks({
    //     selector: 'pagination a',
    //     label: 'first',
    // });

    const productItemsCount = await page.$$eval('.product-collection', elements => elements.length);
   // const productItemsCount = await page.locator('.product-collection').count();
    if (productItemsCount > 0) {


        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-item')).map(document => {

                try {

                    const title = document.querySelector('.product-title').innerText
                    const price = document.querySelector('[data-price-grid]').innerText
                    const img = 'https:' + document.querySelector('[data-srcset]').getAttribute('data-srcset')
                    const link = document.querySelector('.product-title').href
                    return {
                        title,
                        price,
                        img,
                        link,
                        pageTitle,
                        pageURL
                    }
                } catch (error) {
                    return { error, meggage: error.message, content: document.innerHTML, pageURL }
                }

            })

            return result
        })

        return data
    } else {
        console.log('not product page:', url)
        return []
    }

}

export async function second({ page, enqueueLinks, request, log, addRequests }) {

}

const urls = [
    "https://joinus.com.tr/collections/kadin-yeni-sezon",
    "https://joinus.com.tr/collections/all-products",
    "https://joinus.com.tr/collections/all-products",
    "https://joinus.com.tr/collections/kadin-ust-giyim",
    "https://joinus.com.tr/collections/kadin-ust-giyim",
    "https://joinus.com.tr/collections/kadin-kazak",
    "https://joinus.com.tr/collections/kadin-ceket",
    "https://joinus.com.tr/collections/kadin-hirka",
    "https://joinus.com.tr/collections/kadin-top",
    "https://joinus.com.tr/collections/kadin-bluz",
    "https://joinus.com.tr/collections/yelek-ve-suveter",
    "https://joinus.com.tr/collections/kadin-ust-giyim",
    "https://joinus.com.tr/collections/ust-giyim-outlet",
    "https://joinus.com.tr/collections/kadin-alt-giyim",
    "https://joinus.com.tr/collections/kadin-alt-giyim",
    "https://joinus.com.tr/collections/kadin-pantolon",
    "https://joinus.com.tr/collections/kadin-sort",
    "https://joinus.com.tr/collections/kadin-etek",
    "https://joinus.com.tr/collections/kadin-alt-giyim",
    "https://joinus.com.tr/collections/tum-alt-indirim",
    "https://joinus.com.tr/collections/kadin-elbise",
    "https://joinus.com.tr/collections/elbise-outlet",
    "https://joinus.com.tr/collections/dis-giyim",
    "https://joinus.com.tr/collections/aksesuar",
    "https://joinus.com.tr/collections/aksesuar",
    "https://joinus.com.tr/collections/kadin-canta",
    "https://joinus.com.tr/collections/atki-bere-ve-eldiven",
    "https://joinus.com.tr/collections/kadin-ayakkabi-terlik",
    "https://joinus.com.tr/collections/indirimli-aksesuar",
    "https://joinus.com.tr/collections/kadin-giyim-indirim",
    "https://joinus.com.tr/collections/kadin-giyim-indirim",
    "https://joinus.com.tr/collections/kadin-outlet",
    "https://joinus.com.tr/collections/kis-indirimleri",
    "https://joinus.com.tr/collections/yaz-indirimi",
    "https://joinus.com.tr/collections/indirim-kazak",
    "https://joinus.com.tr/collections/elbise-outlet",
    "https://joinus.com.tr/collections/indirim-hirka",
    "https://joinus.com.tr/collections/indirim-ceket",
    "https://joinus.com.tr/collections/indirim-etek",
    "https://joinus.com.tr/collections/indirim-pantolon",
    "https://joinus.com.tr/collections/indirim-top",
    "https://joinus.com.tr/collections/indirim-bluz",
    "https://joinus.com.tr/collections/indirim-sort",

]
export { urls }