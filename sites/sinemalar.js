
export default async function list({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {

        const collection = Array.from(document.querySelectorAll(".movies a.movie")).map(m => {
            // Check if elements exist before accessing properties
            const title = m.querySelector(".details .name")?.innerText;
            const detailHref = m.href;
            const img = m.querySelector("img")?.getAttribute('src');
            const genre = Array.from(m.querySelectorAll(".details span")).map(m => m.innerText).filter(f => f)
            const year = m.querySelectorAll('.details .others .item')[0].innerText
            const duration = m.querySelectorAll('.details .others .item')[1]?.innerText
            const country = m.querySelectorAll('.details .others .item')[2]?.innerText
            const summary =m.querySelector('.summary').innerText
            return {
                title,
                detailHref,
                img,
                genre,
                year,
                duration,
                country,
                summary
            }
        });
        return collection
    })

    for (let d of data) {
        await addRequests([{ url: d.detailHref, label: 'detail', request: { userData: { data } } }])
    }

    return data

}

export function detail({ page, enqueueLinks, request, log, addRequests }) {


    debugger
}

const urls = ["https://www.sinemalar.com/filmler/en-iyi-turk-dizileri"]
export { urls }