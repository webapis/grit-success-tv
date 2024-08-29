
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    // await enqueueLinks({
    //     selector: '.header__menu a',
    //     label: 'first',
    // });

  await enqueueLinks({
        selector: '.pagination-custom a',
        label: 'first',
    });


    //pagination


    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.product-grid-item')).map(m=>{
            const title = m.querySelector('.product__grid__title')?.innerText
            const price = m.querySelector('.price')?.innerText
            const img ="https:"+ m.querySelector('[srcset]').getAttribute('srcset').trim().split(' ')[0]
            const link =m.querySelector("a").href
        return {
            title,
            price,
            img,
            link
            
        }
    })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data

}



const urls = ["https://sagaza.com/"]
export { urls }