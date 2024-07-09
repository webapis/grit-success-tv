
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


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
        return collection.filter(f=>!f.DETAIL_LINK.includes('/program/'))
    })
    for (let d of data) {
        await addRequests([{ url: d.DETAIL_LINK + '/oyuncular', label: 'oyuncular', userData: { dizi: d } }])
    }
    debugger
    // return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {
    const currentUrl = await page.url()
    debugger
    const { userData: { dizi } } = request
    debugger
    const ACTORS = await page.evaluate(() => {
        function getElementByInnerText(text) {
            const allElements = Array.from(document.body.getElementsByTagName('*'));
            
            return allElements.find(function(element) {
              return element.innerText && element.innerText.trim() === text;
            });
          }

          const SUMMARY = getElementByInnerText('Hikaye')?.nextElementSibling.innerText
          const YONETMEN =getElementByInnerText('Yönetmen')?.nextElementSibling.innerText
          const YAPIM_SIRKETI= getElementByInnerText('Yapım')?.nextElementSibling.innerText
          const ACTORS= Array.from(document.querySelectorAll(".actor-card")).map(m => {
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



return {ACTORS,SUMMARY,YONETMEN,YAPIM_SIRKETI}

    })

    return { ...ACTORS, ...dizi }


}


const urls = ["https://www.startv.com.tr/dizi"]
export { urls }

// summary
// yapım
//yönetmen