const add =[{href:'https://tr.wikipedia.org/wiki/T%C3%BCrkiye_Radyo_Televizyon_Kurumu',brandTitle:'Türkiye Radyo Televizyon Kurumu (TRT)'}]
export default async function firstEntry({ page, enqueueLinks, request, log, addRequests }) {
    const data = await page.evaluate(() => {
        const collection =Array.from(document.querySelectorAll("#mw-pages .mw-category-group ul li a")).map(m=>{
            return {brandTitle:m.innerText,href:m.href }
        })
        return collection
    })
    for (let d of [...data,...add]) {
        await addRequests([{ url: d.href, label: 'second', userData: { yapimSirketi: d } }])
    }

}


export async function second({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const { userData: { yapimSirketi } } = request
    debugger
    const bilgiler = await page.evaluate(() => {

        const image = document.querySelector('.mw-file-description img')?.src
        const data = Array.from(document.querySelectorAll('.infobox tr')).filter(f => f.querySelector('th') && f.querySelector('td')).map(m => {
            return {
                title: m?.querySelector('th').innerText,
                value: m.querySelector('td').innerText.replaceAll('\n', ', ')
            }
        })

        return { data, image }

    })

    return { ...bilgiler, ...yapimSirketi }



}


const urls = ["https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrkiye_merkezli_film_yap%C4%B1m_%C5%9Firketleri"]
export { urls }