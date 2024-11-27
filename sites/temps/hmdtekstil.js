
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    const productItemsCount = await page.$$eval('.main-products.product-grid', elements => elements.length);
   // const productItemsCount = await page.locator('.main-products.product-grid').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const gender =Array.from(document.querySelectorAll('.breadcrumb a')).map(m=>m.innerText).join(' ')
            const result = Array.from(document.querySelectorAll('.product-layout')).map(document => {
                try {
                    const title = document.querySelector('.caption .name  a').innerText +' '+gender
                    const price = document.querySelector('.price-normal')?.innerText
                    const img = document.querySelector('.img-responsive.img-first').srcset.split(' ')[0].trim()
                    const link = document.querySelector('.caption .name  a').href
                    return {
                        title,
                        price,
                        img,
                        link,
                        pageTitle, pageURL

                    }
                } catch (error) {
                    return { error, content: document.innerHTML, pageURL }
                }

            })

            return result
        })


        console.log('data.length', data.length)

        debugger
        return data
    } else {
        console.log('not a product page', url)
        return []
    }





}



const urls =
    [
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_61",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_68",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_62",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_64",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_65",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_66",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_63",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_60",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_70",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_97",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_67",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59_69",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=71_74",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=71_76",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=71_73",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=71_72",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=71_75",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=71_77",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=84_89",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=84_90",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=84_88",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=84_85",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=84_101",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=78_81",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=78_82",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=78_80",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=78_92",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=78_83",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=78_79",
        "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=78_100"
    ]



export { urls }