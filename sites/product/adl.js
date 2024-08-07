
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


  await enqueueLinks({
        selector: '.navigation a',
        label: 'first',
    });
await enqueueLinks({
        selector: '.pagination a',
        label: 'first',
    });

    //pagination
   
    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.product-item')).map(m=>{
            const title =m.querySelector('.product-item__name')?.innerText
              const price =m.querySelector('.price__new')?.innerText
              return {
                  title,
                  price
              }
          })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data

}

const urls = ["https://www.adl.com.tr"]
export { urls }