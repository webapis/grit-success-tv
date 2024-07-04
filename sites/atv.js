
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".category-classic-item")).map(m => {
            // Check if elements exist before accessing properties
            const title = m.querySelector("h2")?.innerText.toLocaleLowerCase();
            const detailHref = m.querySelector("a")?.href;
            const img = m.querySelector("a img")?.getAttribute('src');
            return {
                title,
                detailHref,
                img
            }
        });
        return collection
    })
    for (let d of data) {
        await addRequests([{ url: d.detailHref+'/kadro',label:'oyuncular',  userData: { dizi:d, initUrl:d.detailHref }  }])
    }
debugger
    return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {
const currentUrl = await page.url()
    debugger
    const {userData:{dizi}}= request
    debugger
    const oyuncular = await page.evaluate(()=>{
       return Array.from(document.querySelectorAll(".player-box")).map(m => {
        // Check if elements exist before accessing properties
        const actor = m.querySelector('.player-text h2')?.innerText;
        const character = m.querySelector('.player-text h3')?.innerText
        const img = document.querySelector('.player-image img')?.getAttribute('src');
    
        return {
            actor,
            character,
            img
        }
    });
     
     
     
     })

     return {oyuncular,dizi}


}


const urls = ["https://www.atv.com.tr/diziler","https://www.atv.com.tr/eski-diziler"]
export { urls }