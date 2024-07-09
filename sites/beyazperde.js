
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {

    await enqueueLinks({
        selector: '.pagination-item-holder a',
        label: 'list',
    });
    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('.mdl')).map(m => {
            const TVSERIES_TITLE =document.querySelector('.meta-title-link').innerText
            const POSTER_IMG = m.querySelector('img.thumbnail-img').src
            const DETAIL_LINK = m.querySelector('.thumbnail-link').href
            const GENRES = Array.from(m.querySelectorAll('.meta-body-info .dark-grey-link')).map(m => m.innerText)
            const YAYIN_TARIHI = m.querySelector('.meta-body-info').firstChild.nodeValue.replaceAll('\n', '').replace('Başlangıç Tarihi:','')
            return {
                TVSERIES_TITLE,
        
                DETAIL_LINK,
                GENRES,
                YAYIN_TARIHI,
                FIRST_YEAR: parseInt(YAYIN_TARIHI.split('-')),
                LAST_YEAR: parseInt(YAYIN_TARIHI.split('-')[1]),
                SENARIST: m.querySelector('.meta-body-direction a')?.innerText,
                ACTORS: m.querySelector('.meta-body-actor a')?.innerText.split(',').map(m => { return { ACTOR: m } }),
                POSTER: {
                    POSTER_IMG,
                    POSTER_ORIENTATION: "landscape",
                    POSTER_QUALITY: 5
                }
            }
        })
        return collection
    })
    for (let d of data) {
        //   await addRequests([{ url: d.DETAIL_LINK, label: 'oyuncular', userData: { dizi: d } }])
    }
    debugger
    return data

}



const urls = ["https://www.beyazperde.com/diziler/tum/tur-13036/"]
export { urls }


//summary