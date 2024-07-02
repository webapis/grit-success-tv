
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {
    let loop =true
    while (loop) {
        const tagExists = await page.$('a[data-filter]') !== null;

        if (!tagExists) {
            console.log('Tag not found, exiting loop.');
            loop=false;
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
            }else{
                loop=false;
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
        const collection = Array.from(document.querySelectorAll('.list .list-item')).map(m => {
            return {
                img: m.querySelector('img').getAttribute('src'),
                title: m.querySelector('.program-name').innerText,
                detailHref: m.querySelector('a').href, summary: m.querySelector('.program-desc').innerText
            }
        })
        return collection
    })
    for (let d of data) {
           await addRequests([{ url: d.detailHref.replace('izle', 'oyuncular'), label: 'oyuncular', userData: { dizi: d, initUrl: d.detailHref } }])
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
        return Array.from(document.querySelectorAll('.casts .grid-item')).map(m => {
            return {
                img: m.querySelector('a img').getAttribute('data-src'),
                actor: m.querySelector('.act-name').innerText,
                character: m.querySelector('.act-desc').innerText
            }
        })



    })

    return { oyuncular, dizi }


}


const urls = ["https://www.nowtv.com.tr/dizi-izle", "https://www.nowtv.com.tr/dizi-arsivi"]
export { urls }