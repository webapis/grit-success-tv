//wiki dizi liste
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('[cellpadding="4"] tbody tr')).map(m => m.querySelector('td a[title]')).filter(f => f).filter(f => !f.classList.contains('new')).map(m => {
            return {
                detailHref: m.href,
                title: m.getAttribute('title').replace(' (dizi)', '').trim()
            }
        })
        return collection
    })
    for (let d of data) {
        await addRequests([{ url: d.detailHref, label: 'oyuncular', userData: { dizi: d, initUrl: d.detailHref } }])
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
        return Array.from(document.querySelectorAll('.infobox tr')).filter(f => f.querySelector('th') && f.querySelector('td')).map(m => {
            return {
                title: m?.querySelector('th').innerText,
                value: m.querySelector('td').innerText.replaceAll('\n', ', ')
            }
        })

    })

    return { oyuncular, dizi }

}


const urls = ["https://tr.wikipedia.org/wiki/T%C3%BCrk_dizileri_listesi"]
export { urls }