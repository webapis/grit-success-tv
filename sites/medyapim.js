
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".slide-item")).map(m => {
            // Check if elements exist before accessing properties
            const title = m.querySelector(".iq-title")?.innerText.toLocaleLowerCase();
            const detailHref = m.querySelector("a")?.href;
            const img = m.querySelector("img.img-fluid")?.getAttribute('src');
            return {
                title,
                detailHref,
                img,
                imgOrientation:"landscape",
                imqQuatity:1
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


const urls = ["https://medyapim.com/diziler/"]
export { urls }


//genre
//summary
//ouncular
//year