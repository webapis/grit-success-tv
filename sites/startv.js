
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".poster-card")).map(m => {
            // Check if elements exist before accessing properties
            const title = m.querySelector("a img")?.getAttribute('title');
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
        await addRequests([{ url: d.detailHref + '/oyuncular', label: 'oyuncular', userData: { dizi: d, initUrl: d.detailHref } }])
    }
    debugger
    return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {
    const currentUrl = await page.url()
    debugger
    const { userData: { dizi } } = request
    debugger
    const oyuncular = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".actor-card")).map(m => {
            // Check if elements exist before accessing properties
            const actor = m.querySelector('.actor-card-content p')?.innerText;
            const character = m.querySelector('h4')?.innerText
            const img = document.querySelector('.actor-card-image img')?.getAttribute('src');

            return {
                actor,
                character,
                img
            }
        });



    })

    return { oyuncular, dizi }


}


const urls = ["https://www.startv.com.tr/dizi"]
export { urls }

// summary
// yapım 
//yönetmen