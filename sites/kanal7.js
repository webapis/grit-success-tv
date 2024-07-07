
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {

    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('.category-item')).map(m => {
            return {
                img: m.querySelector('[data-original]').getAttribute('data-original'),
                title: m.querySelector('.category-item-title').innerText,
                detailHref: m.href,
                imgOrientation:"landscape",
                imqQuatity:5
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


    return { oyuncular: [], dizi }
}


const urls = ["https://www.izle7.com/kanal7/diziler"]
export { urls }

