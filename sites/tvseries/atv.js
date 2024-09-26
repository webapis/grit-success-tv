
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".category-classic-item")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector("h2")?.innerText.toLowerCase();
            const WATCH_LINK = m.querySelector("a")?.href + '/bolumler';
            const DETAIL_LINK = m.querySelector("a")?.href;
            const POSTER_IMG = m.querySelector("a img")?.getAttribute('src');
            return {
                TVSERIES_TITLE,
                WATCH_LINK,
                DETAIL_LINK,
                POSTER: {
                    POSTER_IMG,
                    POSTER_ORIENTATION: "landscape",
                    POSTER_QUALITY: 5
                },

            }
        });
        return collection
    })
    for (let d of data) {
        await addRequests([{ url: d.DETAIL_LINK, label: 'second', userData: { dizi: d } }])
    }
    debugger
    // return data

}

export async function second({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi } } = request
    debugger
    let detail = {}
    try {
        await page.waitForSelector('.player-slider-item')
        detail = await page.evaluate(() => {
            function getElementStartsWith(text) {
                const allElements = Array.from(document.body.getElementsByTagName('*'));

                return allElements.find(function (element) {
                    return element.innerText && element.innerText.trim().startsWith(text);
                });
            }
            const YAPIM_SIRKETI = getElementStartsWith('Yapım:') ? getElementStartsWith('Yapım:').childNodes[0].textContent : ""
            const YONETMEN = getElementStartsWith('Yönetmen:') ? getElementStartsWith('Yönetmen:').childNodes[0].textContent : ""
            const SENARIST = getElementStartsWith('Senarist:') ? getElementStartsWith('Senarist:').childNodes[0].textContent : ""
            const SUMMARY = document.querySelector('.descWrap') ? document.querySelector('.descWrap')?.innerText : ""
            const ACTORS = Array.from(document.querySelectorAll(".player-slider-item")).map(m => {
                // Check if elements exist before accessing properties
                const ACTOR = m.querySelectorAll('.player-slider-text span')[0]?.innerText;
                const CHARACTER = m.querySelectorAll('.player-slider-text span')[1]?.innerText;
                const ACTOR_IMAGE = m.querySelector('img')?.getAttribute('src');

                return {
                    ACTOR,
                    CHARACTER,
                    ACTOR_IMAGE
                }
            });


            return { ACTORS, SUMMARY }
        })

    } catch (error) {

    }
    debugger
    return { ...dizi, ...detail }


}


const urls = ["https://www.atv.com.tr/diziler", "https://www.atv.com.tr/eski-diziler"]
export { urls }


//summary