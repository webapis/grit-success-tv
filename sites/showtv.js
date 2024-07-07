
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll("section div ul.grid li")).map(m => {
            // Check if elements exist before accessing properties
            const title = m.querySelector("span")?.innerText;
            const detailHref = m.querySelector("a")?.href;
            const img = m.querySelector("a img")?.getAttribute('src');
            return {
                title,
                detailHref,
                img,
                imgOrientation:"portrait",
                imqQuatity:1
            }
        });
        return collection
    })
    for (let d of data) {

        await addRequests([{ url: d.detailHref.replace('tanitim', 'oyuncular'), label: 'oyuncular', userData: { dizi: d, initUrl: d.detailHref } }])
    }
    debugger
    return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi } } = request
    const exist = await page.$$('.grid.grid-cols-4.gap-10 li a')
    debugger
    if (exist) {
        const oyuncular = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.grid.grid-cols-4.gap-10 li a')).map(m => { return { img: m.querySelector('img').src, actor: m.querySelector('span.text-xl').innerText, character: m.querySelector('span.text-ellipsis').innerText } })


        })
        return { oyuncular, dizi }

    }

    return { oyuncular: [], dizi }



}


const urls = ["https://www.showtv.com.tr/diziler"]
export { urls }