
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".category-classic-item")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector("h2")?.innerText.toLocaleLowerCase();
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
        await addRequests([{ url: d.DETAIL_LINK, label: 'oyuncular', userData: { dizi: d } }])
    }
    debugger
    return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi } } = request
    debugger
    let detail = {}
    try {
        await page.waitForSelector('.player-slider-item')
        detail = await page.evaluate(() => {
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
            const adData = Array.from(document.querySelectorAll('.descWrap.black-color p')).map(m => m.innerText).reduce((prev, curr, i) => {

                if (curr.includes('Yapım')) {
                    return { ...prev, YAPIM_SIRKETI: curr.replace('Yapım:', '') }
                } else if (curr.includes('Yönetmen')) {
                    return { ...prev, YONETMEN: curr.replace('Yönetmen:', '') }

                } else if (curr.includes('Senarist')) {
                    return { ...prev, SENARIST: curr.replace('Senarist:', '') }

                }
                else if (curr.includes('Oyuncular:') ||curr.includes('(')) {
                    return { ...prev, ACTORS_2: curr.replace('Oyuncular:', '') }

                } else if (curr.length > 300) {
                    return { ...prev, SUMMARY: curr }

                }

            }, {})

            return { ACTORS }
        })

    } catch (error) {

    }
    debugger
    return { ...dizi, ...detail }


}


const urls = ["https://www.atv.com.tr/diziler", "https://www.atv.com.tr/eski-diziler"]
export { urls }


//summary