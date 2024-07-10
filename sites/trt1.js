
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll("ul li .thumbnail")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector(".category-title")?.innerText;
            const WATCH_LINK = m.querySelector("a")?.href;
            const DETAIL_LINK = m.querySelector("a")?.href;
            const POSTER_IMG = m.querySelector("a img")?.getAttribute('src');
            return {
                TVSERIES_TITLE,
                WATCH_LINK,
                DETAIL_LINK,
                POSTER: {
                    POSTER_IMG,
                    POSTER_ORIENTATION: "landscape",
                    POSTER_QUALITY: 1
                },
            }
        });
        return collection
    })
    for (let d of data) {
        await addRequests([{ url: d.WATCH_LINK, label: 'oyuncular', userData: { dizi: d } }])
    }
    debugger
    // return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi } } = request
    debugger
    const exist = await page.$$('.detail-stars')
    if (exist) {
        const ACTORS = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".oyuncu .thumbnail")).map(m => {
                // Check if elements exist before accessing properties
                const ACTOR = m.querySelector('.stars-title-mid')?.innerText;
                const CHARACTER = m.querySelector('.stars-title')?.innerText
                const ACTOR_IMAGE = m.querySelector('img')?.getAttribute('src');

                return {
                    ACTOR,
                    CHARACTER,
                    ACTOR_IMAGE
                }
            });



        })
        return { ACTORS, ...dizi }
    }


    return { ACTORS: [], ...dizi }


}


const urls = ["https://www.trt1.com.tr/tv/arsiv", "https://www.trt1.com.tr/tv/diziler"]
export { urls }
// summary