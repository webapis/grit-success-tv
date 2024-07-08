
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll("ul li .thumbnail")).map(m => {
            // Check if elements exist before accessing properties
            const title = m.querySelector(".category-title")?.innerText;
            const detailHref = m.querySelector("a")?.href;
            const img = m.querySelector("a img")?.getAttribute('src');
            return {
                title,
                detailHref,
                img,
                imgOrientation:"landscape",
                imqQuatity:1
                
            }
        });
        return collection
    })
    for (let d of data) {
        await addRequests([{ url: d.detailHref, label: 'oyuncular', userData: { dizi: d, initUrl: d.detailHref } }])
    }
    debugger
   // return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {
    const currentUrl = await page.url()
    debugger
    const { userData: { dizi } } = request
    debugger
    const exist = await page.$$('.detail-stars')
    if (exist) {
        const oyuncular = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".oyuncu .thumbnail")).map(m => {
                // Check if elements exist before accessing properties
                const actor = m.querySelector('.stars-title-mid')?.innerText;
                const character = m.querySelector('.stars-title')?.innerText
                const img = m.querySelector('img')?.getAttribute('src');
    
                return {
                    actor,
                    character,
                    img
                }
            });



        })
        return { oyuncular, dizi }
    }


    return { oyuncular: [], dizi }


}


const urls = ["https://www.trt1.com.tr/tv/arsiv", "https://www.trt1.com.tr/tv/diziler"]
export { urls }
// summary