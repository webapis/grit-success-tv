
export default async function list({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {

        const collection = Array.from(document.querySelectorAll(".listing-holder .item")).map(m => {
            // Check if elements exist before accessing properties
            const title = m.querySelector("h3.title")?.innerText;
            const detailHref = m.querySelector("a")?.href;
            const img = m.querySelector("a img")?.getAttribute('data-src');

            return {
                title,
                detailHref,
                img
            }
        });
        return collection
    })

    for (let d of data) {
        await addRequests([{ url: d.detailHref,label:'detail', request: { userData: { data } } }])
    }

    return data

}

export function detail({ page, enqueueLinks, request, log, addRequests }) {

    
debugger
}


const urls = ["https://www.kanald.com.tr/diziler","https://www.kanald.com.tr/diziler/arsiv"]
export { urls }