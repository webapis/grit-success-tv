import autoScroll from "../src/autoscroll.js";
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    await autoScroll(page, 150)
    await page.waitForSelector('.content-name')
    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".swiper-slide")).map(m => {

            const TVSERIES_TITLE = m.querySelector(".content-name")?.innerText.toLowerCase();
            const DETAIL_LINK = m.querySelector("a:not(.watch)")?.href;
            const WATCH_LINK = m.querySelector("a")?.href;
          //  const imgSrc = m.querySelector("a img")?.getAttribute('src');
          //  const htmlString = m.querySelector('noscript') ? m.querySelector('noscript').innerHTML : null
          //  let regex = /src="([^"]*)"/;
         //   let POSTER_IMG = htmlString ? htmlString.match(regex)[1] : imgSrc;
            return {
                TVSERIES_TITLE,
                WATCH_LINK,
                DETAIL_LINK,
                // POSTER: {
                //     POSTER_IMG,
                //     POSTER_ORIENTATION: "portrait",
                //     POSTER_QUALITY: 1
                // },
            }
        })
        return collection.filter(f => f.TVSERIES_TITLE)
    })



    for (let d of data) {
        debugger
        await addRequests([{ url: d.DETAIL_LINK, label: 'second', userData: { firstData:d } }])
    }
    debugger
    //  return data

}


//https://puhutv.com/gaddar-detay
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const { userData: { firstData } } = request
    const secondData = await page.evaluate(() => {
        const TVSERIES_TITLE = document.querySelector("[type=detail] h1").innerText
        const GENRES = [document.querySelector("[type=detail] span").innerText]

        return { TVSERIES_TITLE, GENRES }
    })

    const hrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('div#container-wrapper div[class^="sc-"] a[class]')).map(m => { return { title: m.innerText, href: m.href } })
    })

    const detailHrefExists = hrefs.find(f => f.title.includes("Ayrıntılar"))


    if (detailHrefExists) {
        await addRequests([{ url: detailHrefExists.href, label: 'third', userData: { dizi: firstData, secondData } }])
    } else {

        return { firstData, secondData }
    }

}
//https://puhutv.com/gaddar-dizisinin-oyunculari-ve-konusu
export async function third({ page, enqueueLinks, request, log, addRequests }) {
    const { userData: { firstData, secondData } } = request
    const thirdData = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('[type="series"] .gmhmTl')).map(m => {
            return {
                title: m.querySelectorAll('div')[0].innerText,
                value: m.querySelectorAll('div')[1].innerText,
            }
        }).reduce((prev, curr, i) => {
            if (curr.title.includes("Konu:")) {
                return { ...prev, SUMMARY: curr.value }
            } else if (curr.title.includes("Oyuncular:")) {
                return {
                    ...prev, ACTORS: curr.value.split(",").map(m => {
                        return { ACTOR: m }
                    })
                }
            } else if (curr.title.includes("Yapımcı:")) {
                return { ...prev, YAPIM_SIRKETI: curr.value.trim() }
            } else if (curr.title.includes('Yapım Yılı:')) {
                return { ...prev, YAYIN_TARIHI: curr.value }
            }
            return prev
        }, {})
    })

    return { ...firstData, ...secondData, ...thirdData }

}




const urls = ["https://puhutv.com/dizi", 'https://puhutv.com/list/kategoriler-dizi&item_id=791519']
export { urls }

//summary
//year
//yapimci
