
export default async function list({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {

        const collection = Array.from(document.querySelectorAll(".listing-holder .item")).map(m => {

            const TVSERIES_TITLE = m.querySelector("h3.title")?.innerText;
            const WATCH_LINK = m.querySelector("a")?.href + '/bolumler';
            const POSTER_IMG = m.querySelector("a img")?.getAttribute('data-src');
            const DETAIL_LINK = m.querySelector("a")?.href;
            return {
                TVSERIES_TITLE,
                WATCH_LINK,
                DETAIL_LINK,
                POSTER: {
                    POSTER_IMG,
                    POSTER_ORIENTATION: "landscape",
                    POSTER_QUALITY: 5
                }

            }
        });
        return collection
    })

    for (let d of data) {

        await addRequests([{ url: d.DETAIL_LINK + '/hikaye-ve-kunye', label: 'hikaye_ve_kunye', userData: { dizi: d, oyuncularUrl: d.DETAIL_LINK + "/oyuncular" } }])

    }

 //   return data

}

export async function hikaye_ve_kunye({ page, enqueueLinks, request, log, addRequests }) {


    const { userData: { dizi, oyuncularUrl } } = request

    let hikaye_ve_kunye = []

    const exists = await page.$('.storyline-text tr')

    if (exists) {

        hikaye_ve_kunye = await page.evaluate(() => {
            const SUMMARY = document.querySelector('.content-text p').innerHTML
            const summary1 = Array.from(document.querySelectorAll('.storyline-text tr')).map(m => {
                return {
                    title: m.querySelectorAll('td')[0].innerText,
                    value: m.querySelectorAll('td')[1].innerText
                }
            }).reduce((prev, curr, i) => {
                if (curr.title === 'Yapım') {
                    return { ...prev, YAPIM_SIRKETI: curr.value.replace(':','').trim() }
                } else if (curr.title.includes('Yapımcı')) {
                    return { ...prev, YAPIMCI: curr.value }
                }
                else if (curr.title.includes('Yönetmen')) {
                    return { ...prev, YONETMEN: curr.value }
                }
                else if (curr.title.includes('Senaryo')) {
                    return { ...prev, SENARIST: curr.value }
                }

                return prev
            }, {})
            return { SUMMARY, ...summary1 }
        })
    }

    await addRequests([{ url: oyuncularUrl, label: 'oyuncular', userData: { dizi, hikaye_ve_kunye } }])


}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {
    const currentUrl = await page.url()
    debugger
    const { userData: { dizi, hikaye_ve_kunye } } = request
    debugger
    const ACTORS = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".actor2-card")).map(m => {
            // Check if elements exist before accessing properties
            const ACTOR = m.querySelector('p.spot').innerText;
            const CHARACTER = m.querySelector('h3.title').innerText
            const ACTOR_IMAGE = document.querySelector('.circle-item img[data-src]').getAttribute('data-src');

            return {
                ACTOR,
                CHARACTER,
                ACTOR_IMAGE
            }
        });



    })

    return { ACTORS, ...dizi, ...hikaye_ve_kunye }


}


const urls = ["https://www.kanald.com.tr/diziler", "https://www.kanald.com.tr/diziler/arsiv"]
export { urls }


//summary

//https://www.kanald.com.tr/azize