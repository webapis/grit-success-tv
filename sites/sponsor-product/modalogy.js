
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    // await enqueueLinks({
    //     selector: '.navigation a',
    //     label: 'first',
    // });


    //pagination

    const productCount = await page.evaluate(() => parseInt(document.querySelector('.appliedFilter.FiltrelemeUrunAdet span')?.innerText.replace(/[^\d]/gi, '')))


    const totalPages = Math.ceil(productCount / 24)




    if (productCount > 0 && totalPages > 1) {

        for (let i = 1; i <= totalPages; i++) {

            await addRequests([{ url: `${url}?sayfa=${i}`, label: 'second' }])

        }
    }

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.productItem')).map(m => {
            const title = m.querySelector('.productName')?.innerText
            const price = m.querySelector('.discountPrice')?.innerText
            const img =m.querySelector('[data-original]').getAttribute("data-original")
            const link =m.querySelector(".detailUrl").href
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

const urls = ["https://www.modalogy.com.tr/"]
export { urls }