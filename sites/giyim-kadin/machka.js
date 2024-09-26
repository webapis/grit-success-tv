
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    // await enqueueLinks({
    //       selector: '.ems-menu.modal a',
    //       label: 'first',
    //   });

      //pagination
     
      const data = await page.evaluate(() => {
          const pageTitle = document.title
          const pageURL = document.URL
          const result = Array.from(document.querySelectorAll('.ems-prd')).map(m=>{
            const title =m.querySelector('.ems-prd-title').innerText
            const price =m.querySelector('.ems-prd-price-last').innerText
            const link =m.querySelector(".item-link").href
            const img =m.querySelector("[data-image-src]").getAttribute("data-image-src")
            return {
                title,
                price,
                link,
                img
            }
        })
  
          return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
      })
  
      debugger
      return data
  
  }
  
  const urls = ["https://www.machka.com.tr/"]
  export { urls }