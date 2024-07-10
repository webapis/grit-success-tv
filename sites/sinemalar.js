const adddizi = [{
    WIKILINK: "https://www.sinemalar.com/dizi/25097/dantel",
    TVSERIES_TITLE: "Dantel"

}]
export default async function list({ page, enqueueLinks, request, log, addRequests }) {

    await enqueueLinks({
        selector: '.pagination a',
        label: 'list',
    });
    const data = await page.evaluate(() => {

        const collection = Array.from(document.querySelectorAll(".movies a.movie")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector(".details .name")?.innerText;
            const DETAIL_LINK = m.href;
            const POSTER_IMG = m.querySelector("img")?.getAttribute('src');
            const GENRES = Array.from(m.querySelectorAll(".details span")).map(m => m.innerText).filter(f => f)
            const FIRST_YEAR = m.querySelectorAll('.details .others .item')[0].innerText
            const GOSTERIM_SURESI = m.querySelectorAll('.details .others .item')[1]?.innerText
            const ULKE = m.querySelectorAll('.details .others .item')[2]?.innerText

            return {
                TVSERIES_TITLE,
                DETAIL_LINK,
                GENRES,
                FIRST_YEAR,
                GOSTERIM_SURESI,
                ULKE,

                POSTER: {
                    POSTER_IMG,
                    POSTER_ORIENTATION: "portrait",
                    POSTER_QUALITY: 2
                },
            }
        });
        return collection
    })

    for (let d of data) {
        debugger
        await addRequests([{ url: d.DETAIL_LINK, label: 'oyuncular', userData: { dizi: d } }])
    }

    //  return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {
    const { userData: { dizi } } = request
    debugger
    const data = await page.evaluate(() => {
        const SUMMARY = document.querySelector('div[itemprop="description"]').innerText
        const detail = Array.from(document.querySelectorAll('.col div.info-group')).filter(f => f.querySelector('.label-title')).map(m => {
            return {
                title: m.querySelector('.label-title').innerText,
                value: m.querySelector('.label').innerText
            }
        }).reduce((prev, curr, i) => {
            if (curr.title.includes('Yayın Tarihi')) {
                return { ...prev, YAYIN_TARIHI: curr.value }
            } else
                if (curr.title.includes('Tür')) {
                    return { ...prev, GENRES: curr.value }
                }
                else
                    if (curr.title.includes('Yönetmen:')) {
                        return { ...prev, YONETMEN: curr.value }
                    }
                    else
                        if (curr.title.includes('Senarist:')) {
                            return { ...prev, SENARIST: curr.value }
                        }
                        else
                            if (curr.title.includes('Yapımı:')) {
                                return { ...prev, YAPIMI: curr.value }
                            }
                            else
                                if (curr.title.includes('Sezon:')) {
                                    return { ...prev, SEZON_SAYISI: curr.value }
                                }
        }, {})

        const ACTORS = Array.from(document.querySelectorAll('[itemprop="actors"] .card')).map(m => {
            return {
                ACTOR_IMAGE: m.querySelector('img').getAttribute('data-src'),
                ACTOR: m.querySelector('.card-title').innerText,
                CHARACTER: m.querySelector('.sub-title')?.innerText
            }
        })

        return { ...detail, ACTORS, SUMMARY }
    })


    return { ...data, ...dizi }

}

const urls = ["https://www.sinemalar.com/filmler/en-yeni-turk-dizileri"]
export { urls }