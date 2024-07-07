
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {

    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('.category-item')).map(m => {
            return {
                POSTER_IMG: m.querySelector('[data-original]').getAttribute('data-original'),
                TVSERIES_TITLE: m.querySelector('.category-item-title').innerText,
                WATCH_LINK: m.href,
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
        await addRequests([{ url: d.detailHref, label: 'oyuncular', userData: { dizi: d, initUrl: d.detailHref } }])
    }
    debugger
    return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi } } = request
    debugger


    return { ACTORS: [], ...dizi }
}


const urls = ["https://www.izle7.com/kanal7/diziler"]
export { urls }

