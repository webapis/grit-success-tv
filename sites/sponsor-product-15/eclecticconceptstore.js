
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    //await autoScroll(page, 200);
    debugger

    //await page.waitForSelector('.navigation__item')

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('a')).map(m => m.href)
    })
    console.log('aggregation urls', urls)
    for (let u of urls) {
        await addRequests([{ url: u, label: 'second' }])
    }

}

export async function second({ page }) {
    const url = await page.url()
    const productItemsCount = await page.$$eval('.c-product-grid__item', elements => elements.length);
  //  const productItemsCount = await page.locator('.c-product-grid__item').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.c-product-grid__item')).map(document => {
                try {
                    const title = document.querySelector('.c-product-grid__title').innerText
                    const price =document.querySelector('.woocommerce-Price-amount').innerText
                    //lazyloaded        
                    //swiper-lazy
                    const img1 = document.querySelector('[data-src]').getAttribute("data-src")
    
                    const link = document.querySelector('.woocommerce-loop-product__link').href
                    return {
                        title,
                        price,
                        img: img1,
                        link,
                        pageTitle, pageURL

                    }
                } catch (error) {
                    return { error, message: error.message, content: document.innerHTML, pageURL }
                }

            })

            return result//.filter(f => f.img)
        })


        console.log('data.length', data.length)

        debugger
        return data
    } else {
        console.log('not a product page', url)
        return []
    }

}

const urls = ["https://eclecticconceptstore.com.tr/product-category/men/",
     "https://eclecticconceptstore.com.tr/product-category/women/",
    "https://eclecticconceptstore.com.tr/",
]
export { urls }