
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    await enqueueLinks({
        selector: '.butonlar-sayfala a',
        label: 'list',
    });
    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".film")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector('.resim a[title]').getAttribute('title');

            const DETAIL_LINK = m.querySelector('.resim a').href;
            const POSTER_IMG = m.querySelector('.resim img')?.src;
            return {
                TVSERIES_TITLE,

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

//https://www.diziizle.pw/1-erkek-1-kadin/
export async function second({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { firstData } } = request

    const nextHref = await page.evaluate(() => document.querySelector('.dizi-izle a').href)

    await addRequests([{ url: nextHref, label: 'second', userData: { firstData } }])
    debugger




}


//https://www.diziizle.pw/1-erkek-1-kadin/bolum-138/
export async function third({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { firstData } } = request

    const WATCH_LINK = await page.evaluate(() => document.querySelector('body iframe').src)

    return { WATCH_LINK, ...firstData }

 

}

const urls = ["https://www.diziizle.pw/diziler/"]
export { urls }