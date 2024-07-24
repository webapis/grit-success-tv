
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    await enqueueLinks({
        selector: '.pagination a',
        label: 'list',
    });
    debugger

    const data = await page.evaluate(() => {

        const collection = Array.from(document.querySelectorAll(".listing-holder .item")).map(m => {

            const TVSERIES_TITLE = m.querySelector("h3.title")?.innerText;
            const WATCH_LINK = m.querySelector("a")?.href + '/bolumler';
            const POSTER_IMG = m.querySelector("a img")?.getAttribute('data-src');
            const DETAIL_LINK = m.querySelector("a")?.href;
            return {
                TVSERIES_TITLE,
                WATCH_LINK,
                DETAIL_LINK,
                POSTER: {
                    POSTER_IMG,
                    POSTER_ORIENTATION: "landscape",
                    POSTER_QUALITY: 5
                }

            }
        });
        return collection
    })
    debugger
    for (let d of data) {

        await addRequests([{ url: d.DETAIL_LINK, label: 'second', userData: { dataFromFirst: d } }])

    }

    //   return data

}


//https://www.kanald.com.tr/yalan

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const { userData: { dataFromFirst } } = request
    const breadCrumbLinks = await page.evaluate(() => Array.from(document.querySelectorAll('.breadcrumb-link')).map(m => {
        return { title: m.innerText, href: m.href }
    }))

    const bilgiUrlExist = breadCrumbLinks.find(f => f.title.includes("Bilgi"))
    const oyuncularUrlExists = breadCrumbLinks.find(f => f.title.includes("Oyuncular"))
    if (bilgiUrlExist) {
        debugger
        await addRequests([{ url: bilgiUrlExist.href, label: 'third', userData: { dataFromFirst, nextUrl: oyuncularUrlExists ? oyuncularUrlExists : null } }])
    } else
        if (oyuncularUrlExists) {
            debugger
            await addRequests([{ url: oyuncularUrlExists.href, label: 'fourth', userData: { dataFromFirst } }])
        }

    if (!bilgiUrlExist && !oyuncularUrlExists) {
        debugger
        return { ...dataFromFirst }
    }


}

//bilgi

//https://www.kanald.com.tr/yalan/hikaye-ve-kunye
export async function third({ page, enqueueLinks, request, log, addRequests }) {
    debugger

    const { userData: { dataFromFirst, nextUrl } } = request
    const pageExists = await page.$('.content-text p')
    if (pageExists) {
        let dataFromThird = await page.evaluate(() => {
            const SUMMARY = document.querySelector('.content-text p').innerText
            const summary1 = Array.from(document.querySelectorAll('.storyline-text tr')).map(m => {
                return {
                    title: m.querySelectorAll('td')[0].innerText,
                    value: m.querySelectorAll('td')[1].innerText
                }
            }).reduce((prev, curr, i) => {
                if (curr.title.includes('Yapım')) {
                    return { ...prev, YAPIM_SIRKETI: curr.value.replace(':', '').trim() }
                } else if (curr.title.includes('Yapımcı')) {
                    return { ...prev, YAPIMCI: curr.value }
                }
                else if (curr.title.includes('Yönetmen')) {
                    return { ...prev, YONETMEN: curr.value }
                }
                else if (curr.title.includes('Senaryo')) {
                    return { ...prev, SENARIST: curr.value }
                }

                return prev
            }, {})
            return { SUMMARY, ...summary1 }
        })
        if (nextUrl) {
            await addRequests([{ url: nextUrl.href, label: 'fourth', userData: { dataFromFirst, dataFromThird } }])
        }
    } else

        if (nextUrl) {
            await addRequests([{ url: nextUrl.href, label: 'fourth', userData: { dataFromFirst } }])
        } else {
            return { ...dataFromFirst, ...dataFromThird }
        }

}

//oyuncular
//https://www.kanald.com.tr/yalan/oyuncular
export async function fourth({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dataFromFirst, dataFromThird } } = request
    debugger
    const ACTORS = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".actor2-card")).map(m => {
            // Check if elements exist before accessing properties
            const ACTOR = m.querySelector('p.spot').innerText;
            const CHARACTER = m.querySelector('h3.title').innerText
            const ACTOR_IMAGE = document.querySelector('.circle-item img[data-src]').getAttribute('data-src');

            return {
                ACTOR,
                CHARACTER,
                ACTOR_IMAGE
            }
        });



    })

    return { ACTORS, ...dataFromFirst, ...dataFromThird }

}









const urls = ["https://www.kanald.com.tr/diziler","https://www.kanald.com.tr/diziler/arsiv"]
export { urls }


// "https://www.kanald.com.tr/diziler/arsiv"

//https://www.kanald.com.tr/azize