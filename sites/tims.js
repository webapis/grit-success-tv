
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".masonry-item")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector("a img").alt;
            const WATCH_LINK = m.querySelector("a")?.href ;
            const DETAIL_LINK = m.querySelector("a")?.href;
            const POSTER_IMG = m.querySelector("a img")?.getAttribute('src');
            return {
                TVSERIES_TITLE,
                WATCH_LINK,
                DETAIL_LINK,
                POSTER: {
                    POSTER_IMG,
                    POSTER_ORIENTATION: "portrait",
                    POSTER_QUALITY: 1
                },

            }
        });
        return collection
    })
    for (let d of data) {
        await addRequests([{ url: d.DETAIL_LINK, label: 'oyuncular', userData: { dizi: d } }])
    }
    debugger
    // return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi } } = request
    debugger
    let detail = {}
    try {
        await page.waitForSelector('.amazingcarousel-item')
        detail = await page.evaluate(() => {
            function getElementStartsWith(text) {
                const allElements = Array.from(document.body.getElementsByTagName('*'));

                return allElements.find(function (element) {
                    return element.innerText && element.innerText.trim().startsWith(text);
                });
            }

            const ACTORS = Array.from(document.querySelectorAll(".amazingcarousel-list-container .amazingcarousel-image-fix-wrapper")).map(m => {
                // Check if elements exist before accessing properties
                const ACTOR = m.querySelector('.amazingcarousel-image-img').alt;
             
                const ACTOR_IMAGE = m.querySelector('.amazingcarousel-image-img')?.getAttribute('src');

                return {
                    ACTOR,
           
                    ACTOR_IMAGE
                }
            }).filter(f=>!f.ACTOR.includes('Bambaşka Biri')).filter(f=>!f.ACTOR.includes('AYD'))


            return { ACTORS, SUMMARY }
        })

    } catch (error) {

    }
    debugger
    return { ...dizi, ...detail }


}


const urls = ["https://tims.tv/diziler"]
export { urls }


//summary