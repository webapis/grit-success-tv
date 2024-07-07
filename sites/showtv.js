
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


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
    for (let d of data) {

        await addRequests([{ url: d.WATCH_LINK, label: 'hikaye_ve_kunye', userData: { dizi: d, oyuncularUrl: d.WATCH_LINK.replace('tanitim', 'oyuncular') } }])
    }
    debugger
    return data

}

export async function hikaye_ve_kunye({ page, enqueueLinks, request, log, addRequests }) {


    const { userData: { dizi, oyuncularUrl } } = request

    let hikaye_ve_kunye = []

    const exists = await page.$('.storyline-text tr')

    if (exists) {

        hikaye_ve_kunye = await page.evaluate(() => {
            const SUMMARY = document.querySelector('span.block p').innerText
            const detail = Array.from(document.querySelectorAll('.w-full.mb-5 ul li')).map(m => {
                return {
                    title: m.querySelectorAll('span')[0].innerText,
                    value: m.querySelectorAll('span')[1].innerText
                }
            }).reduce((prev, curr, i) => {
                if (curr.title.includes('Yapım')) {
                    return { ...prev, YAPIM_SIRKETI: curr.value }

                } else if (curr.title.includes('Yönetmen')) {
                    return {
                        ...prev, YONETMEN: curr.value

                    }
                }
                else if (curr.title.includes('Senaryo')) {
                    return {
                        ...prev, SENARIST: curr.value

                    }
                }
                return prev
            }, {})

            return { SUMMARY, ...detail }
        })
    }

    await addRequests([{ url: oyuncularUrl, label: 'oyuncular', userData: { dizi, hikaye_ve_kunye } }])


}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {

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