
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('.category-item')).map(m => {
            return {
                TVSERIES_TITLE: m.querySelector('.category-item-title').innerText,
                WATCH_LINK: m.href,
                DETAIL_LINK: m.href,
                POSTER: {
                    POSTER_IMG: m.querySelector('[data-original]').getAttribute('data-original'),
                    POSTER_ORIENTATION: "landscape",
                    POSTER_QUALITY: 5
                }
            }
        });
        return collection
    })
    for (let d of data) {
        await addRequests([{ url: d.WATCH_LINK, label: 'second', userData: { dizi: d } }])
    }
    debugger
  //  return data

}

export async function second({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi } } = request
    debugger


    return { ACTORS: [], ...dizi }
}


const urls = ["https://www.izle7.com/kanal7/diziler"]
export { urls }

