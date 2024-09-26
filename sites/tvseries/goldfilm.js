
export default async function first({ page, enqueueLinks, request, log, addRequests }) {
    debugger

    debugger
    const data = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a.card.bg-white.card-hover-rise')).map(m => m.href)
    })
    debugger

    for (let d of data) {
        await addRequests([{ url: d, label: 'second' }])
    }

}



export async function second({ page, enqueueLinks, request, log, addRequests }) {

    const data = await page.evaluate(() => {

        return {
            TVSERIES_TITLE: document.querySelector('h1.display-3.fw-bolder').innerText,
            DETAIL_LINK: document.URL,
            WATCH_LINK: document.URL,
            POSTER: {
                POSTER_IMG: document.querySelector('.img-fluid').src,
                POSTER_ORIENTATION: "portrait",
                POSTER_QUALITY: 2
            },
        }
    })
    return data
}

const urls = ["https://goldfilm.com.tr/projeler.html"]
export { urls }


//summary