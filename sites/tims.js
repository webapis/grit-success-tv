
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".masonry-item")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector("a img").alt;
            const WATCH_LINK = m.querySelector("a")?.href;
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
        await addRequests([{ url: d.DETAIL_LINK, label: 'second', userData: { firstData: d } }])
    }
    debugger
    // return data

}


//https://tims.tv/diziler/sahmaran
export async function second({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { firstData } } = request
    debugger



    const secondData = await page.evaluate(() => {
        function getElementByInnerText(text) {
            const allElements = Array.from(document.body.getElementsByTagName('*'));

            return allElements.find(function (element) {
                return element.innerText && element.innerText.trim() === text;
            });
        }
        const ACTORS = document.querySelectorAll('[data-content-for] p span')[9].innerText.split(',').map(m => { return { ACTOR: m } })


        return { ACTORS, YAPIM_SIRKETI:"TIMS&B Productions" }
    })


    debugger
    return { ...firstData, ...secondData }


}


const urls = ["https://tims.tv/diziler"]
export { urls }


//summary