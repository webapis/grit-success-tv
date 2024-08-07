
export default async function first({ page, enqueueLinks, request, log, addRequests }) {
    debugger

    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".grid .poster-card")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector("a img")?.getAttribute('title');
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
        return collection.filter(f => !f.DETAIL_LINK.includes('/program/'))
    })
    for (let d of data) {
        await addRequests([{ url: d.DETAIL_LINK, label: 'second', userData: { firstData: d } }])
    }
    debugger
    // return data

}

//https://www.startv.com.tr/dizi/yali-capkini
export async function second({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { firstData } } = request

    const hrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('nav h3 a')).map((m) => {
            return { title: m.innerText, href: m.href }
        })
    })
    const bilgilerHrefExist = hrefs.find(f => f.title.includes("Oyuncular & Künye"))
    if (bilgilerHrefExist) {
        await addRequests([{ url: bilgilerHrefExist.href, label: 'third', userData: { firstData } }])
    
    } else {

        return { ...firstData }
    }
    debugger




}

//https://www.startv.com.tr/dizi/yali-capkini/oyuncular
export async function third({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { firstData } } = request
    debugger
    const thirdData = await page.evaluate(() => {
        function getElementByInnerText(text) {
            const allElements = Array.from(document.body.getElementsByTagName('*'));

            return allElements.find(function (element) {
                return element.innerText && element.innerText.trim() === text;
            });
        }

        const SUMMARY = getElementByInnerText('Hikaye')?.nextElementSibling.innerText
        const YONETMEN = getElementByInnerText('Yönetmen')?.nextElementSibling.innerText
        const YAPIM_SIRKETI = getElementByInnerText('Yapım')?.nextElementSibling.innerText
        const ACTORS = Array.from(document.querySelectorAll(".actor-card")).map(m => {
            // Check if elements exist before accessing properties
            const ACTOR = m.querySelector('.actor-card-content p')?.innerText;
            const CHARACTER = m.querySelector('h4')?.innerText
            const ACTOR_IMAGE = document.querySelector('.actor-card-image img')?.getAttribute('src');

            return {
                ACTOR,
                CHARACTER,
                ACTOR_IMAGE
            }
        });



        return { ACTORS, SUMMARY, YONETMEN, YAPIM_SIRKETI }

    })
debugger
    return { ...thirdData, ...firstData }


}
const urls = ["https://www.startv.com.tr/dizi"]
export { urls }

// summary
// yapım
//yönetmen