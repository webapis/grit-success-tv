
//import autoscroll from '../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

debugger
    const data = await page.evaluate(() => {
       
        const collection = Array.from(document.querySelectorAll("section div ul.grid li")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector("span")?.innerText;
            const WATCH_LINK = m.querySelector("a")?.href;
            const DETAIL_LINK = m.querySelector("a")?.href;
            const POSTER_IMG = m.querySelector("a img")?.getAttribute('src');
       
            return {
                TVSERIES_TITLE,
                WATCH_LINK,
                DETAIL_LINK,
                POSTER: {
                    POSTER_ORIENTATION: 'portrait',
                    POSTER_QUALITY: 1,
                    POSTER_IMG
                }


            }
        });
        return collection
    })

    debugger
    for (let d of data) {

        await addRequests([{ url: d.WATCH_LINK, label: 'second', userData: { dizi: d, oyuncularUrl: d.WATCH_LINK.replace('tanitim', 'oyuncular') } }])
    }
    debugger
    //  return data

}
//'https://www.showtv.com.tr/dizi/tanitim/bahar/2941
export async function second({ page, enqueueLinks, request, log, addRequests }) {


    const { userData: { dizi, oyuncularUrl } } = request

    let hikaye_ve_kunye = {}
    // await autoscroll(page, 150)

    try {
        await page.waitForSelector('span.block p')
        hikaye_ve_kunye = await page.evaluate(() => {
            const SUMMARY = document.querySelector('span.block p').innerText
            const detail = Array.from(document.querySelectorAll('.w-full.mb-5 ul li')).map((m) => {
                return {
                    title: m.querySelectorAll('span')[0].innerText,
                    value: m.querySelectorAll('span')[1].innerText
                }
            })?.reduce((prev, curr, i) => {
                if (curr.title.includes("Yapım") && !curr.title.includes("Yapımcı")) {
                    return { ...prev, YAPIM_SIRKETI: curr?.value.trim() }
                }
                if (curr.title.includes("Yönetmen")) {
                    return { ...prev, YONETMEN: curr?.value.trim() }
                }
                if (curr.title.includes("Senaryo")) {
                    return { ...prev, SENARIST: curr?.value.trim() }
                }
                return prev
            }, {})

            return { SUMMARY, ...detail }
        })

    } catch (error) {

    }
    await addRequests([{ url: oyuncularUrl, label: 'third', userData: { dizi, hikaye_ve_kunye } }])


}

export async function third({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi, hikaye_ve_kunye } } = request
    const exist = await page.$$('.grid.grid-cols-4.gap-10 li a')
    debugger
    if (exist) {
        const ACTORS = await page.evaluate(() => {

            return Array.from(document.querySelectorAll('.grid.grid-cols-4.gap-10 li a')).map(m => { return { ACTOR_IMAGE: m.querySelector('img').src, ACTOR: m.querySelector('span.text-xl').innerText, CHARACTER: m.querySelector('span.text-ellipsis').innerText } })

        })
        return { ACTORS, ...dizi, ...hikaye_ve_kunye }

    }

    return { ACTORS: [], ...dizi, ...hikaye_ve_kunye }

}


const urls = ["https://www.showtv.com.tr/diziler"]
export { urls }