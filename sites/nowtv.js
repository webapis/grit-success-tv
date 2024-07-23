
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {
    let loop = true
    while (loop) {
        const tagExists = await page.$('a[data-filter]') !== null;

        if (!tagExists) {
            console.log('Tag not found, exiting loop.');
            loop = false;
        }

        console.log('Tag found, clicking and scrolling to the bottom.');
        if (tagExists) {
            const isElementHidden = await page.evaluate(() => {
                const element = document.querySelector('a[data-filter]');
                if (element) {
                    const style = window.getComputedStyle(element);
                    return style.display === 'none';
                }
                return true; // Consider it hidden if the element is not found
            });
            if (!isElementHidden) {
                await page.click('a[data-filter]');
            } else {
                loop = false;
            }

        }


        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                const distance = 200; // Adjust the distance for each scroll step
                const delay = 100; // Adjust the delay between scroll steps
                const interval = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    const scrollTop = window.scrollY + window.innerHeight;
                    window.scrollBy(0, distance);
                    if (scrollTop >= scrollHeight) {
                        clearInterval(interval);
                        resolve();
                    }
                }, delay);
            });
        });


        await page.waitForTimeout(2000); // Adjust the delay as needed
    }
    const data = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.list .list-item')).map(m => {
            const TVSERIES_TITLE = m.querySelector('.program-name').innerText
            const WATCH_LINK = m.querySelector('a').href
            const DETAIL_LINK = m.querySelector('a').href

            return {
                TVSERIES_TITLE,
                WATCH_LINK,
                DETAIL_LINK,
                POSTER: {
                    POSTER_ORIENTATION: 'landscape',
                    POSTER_QUALITY: 1,
                    POSTER_IMG: m.querySelector('img').getAttribute('src')
                }
            }
        })

    })
    for (let d of data) {
        await addRequests([{ url: d.DETAIL_LINK.replace('izle', 'bilgi'), label: 'hikaye_ve_kunye', userData: { dizi: d, oyuncularUrl: d.DETAIL_LINK.replace('izle', 'oyuncular') } }])
    }

}

export async function hikaye_ve_kunye({ page, enqueueLinks, request, log, addRequests }) {

    console.log('hikaye_ve_kunye')
    const { userData: { dizi, oyuncularUrl } } = request

    let data = {}

    const exists = await page.$('.content')
    debugger
    if (exists) {
        debugger
        data = await page.evaluate(() => {
            const SUMMARY = document.querySelector('.content p').innerText
            const detail =  Array.from(document.querySelectorAll('.about-meta')[1].querySelectorAll('*')[2].children).map(m => {
                return { title: m.innerText, value: m.nextSibling?.nodeValue }
            }).filter(f => f.title).reduce((prev, curr, i) => {
                if (curr.title.includes("TÜR:")) {
                    return { ...prev, GENRES: [curr.value] }
                }
                else if (curr.title.includes("YAPIM ŞİRKETİ:")) {
                    return { ...prev, YAPIM_SIRKETI: curr.value }
                }
                else if (curr.title.includes("SENARYO:")) {
                    return { ...prev, SENARIST: curr.value }
                }
                else if (curr.title.includes("YÖNETMEN:")) {
                    return { ...prev, YONETMEN: curr.value }
                }

                return prev
            }, {})
            return { SUMMARY, ...detail }
        })
    }

    await addRequests([{ url: oyuncularUrl, label: 'oyuncular', userData: { dizi, data } }])


}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {
    console.log('ouyuncular')
    debugger
    const { userData: { dizi, data } } = request
    debugger
    const ACTORS = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.casts .grid-item')).map(m => {
            return {
                ACTOR_IMAGE: m.querySelector('a img').getAttribute('data-src'),
                ACTOR: m.querySelector('.act-name').innerText,
                CHARACTER: m.querySelector('.act-desc').innerText
            }
        })



    })
    debugger
    return { ACTORS, ...dizi, ...data }


}


const urls = ["https://www.nowtv.com.tr/dizi-izle", "https://www.nowtv.com.tr/dizi-arsivi"]
export { urls }

//summary