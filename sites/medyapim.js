
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {

        const collection = Array.from(document.querySelectorAll(".slide-item")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector(".iq-title")?.innerText.toLocaleLowerCase();
            const WATCH_LINK = m.querySelector("a")?.href;
            const DETAIL_LINK = m.querySelector("a")?.href;
            const POSTER_IMG = m.querySelector("img.img-fluid")?.getAttribute('src');

            return {
                TVSERIES_TITLE,
                WATCH_LINK,
                DETAIL_LINK,
                POSTER: {
                    POSTER_IMG,
                    POSTER_ORIENTATION: "portrait",
                    POSTER_QUALITY: 1
                }
            }
        });
        return collection
    })


    debugger
    for (let d of data) {
        debugger
    
            await addRequests([{ url: d.WATCH_LINK, label: 'second', userData: { dizi: d } }])
        
       
    }
    debugger
    //   return data

}

export async function second({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi } } = request
    debugger
    const data = await page.evaluate(() => {
        const SUMMARY = document.querySelector('.trending-dec p').innerText
        const GENRES = document.querySelector('li.text-primary').innerText.split(", ")
        const FIRST_YEAR = document.querySelector('.trending-year').innerText.replace(/[^\d]/gi, '')
        return {
            SUMMARY,
            GENRES,
            FIRST_YEAR,
            YAPIM_SIRKETI:"Medyapım"
        }
    })


    return { ACTORS: [], ...dizi, ...data }


}


const urls = ["https://medyapim.com/diziler/"]
export { urls }


//genre
//summary
//ouncular
//year