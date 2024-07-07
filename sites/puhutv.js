import autoScroll from "../src/autoscroll.js";
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {

    await autoScroll(page,150)
    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".swiper-slide")).map(m => {
            // Check if elements exist before accessing properties
            const title = m.querySelector(".content-name")?.innerText.toLocaleLowerCase();
            const detailHref = m.querySelector("a")?.href;
         
            const imgSrc = m.querySelector("a img")?.getAttribute('src');
            const htmlString =m.querySelector('noscript')?m.querySelector('noscript').innerHTML:null
            let regex = /src="([^"]*)"/;
            let img =htmlString? htmlString.match(regex)[1]:imgSrc;
            return {
                title,
                detailHref,
                img,
                imgOrientation:"portrait",
                imqQuatity:1
            }
        }).filter(f => f.title)
        return collection
    })
    for (let d of data) {
        await addRequests([{ url: d.detailHref.replace('detay', 'dizisinin-oyunculari-ve-konusu'), label: 'oyuncular', userData: { dizi: d, initUrl: d.detailHref } }])
    }
    debugger
    return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {
    const currentUrl = await page.url()
    debugger
    const { userData: { dizi } } = request
    debugger


    return { oyuncular:[], dizi }


}


const urls = ["https://puhutv.com/dizi"]
export { urls }

//summary
//year
//yapimci
