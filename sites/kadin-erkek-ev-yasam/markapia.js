
import autoScroll from "../../src/autoscroll.js"
export default async function first({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()

    // await enqueueLinks({
    //     selector: '.items-start a',
    //     label: 'first',
    // });
    // await enqueueLinks({
    //     selector: '.items-center a',
    //     label: 'first',
    // });
    //pagination

    const productCount = await page.evaluate(() => parseInt(document.querySelector('.hidden.text-sm').innerText.replace(/[^\d]/gi, '')))
    const totalPages = Math.ceil(productCount / 20)

    if (productCount > 0 && totalPages > 1) {

        for (let i = 1; i <= totalPages; i++) {

            await addRequests([{ url: `${url}?page=${i}`, label: 'second' }])

        }
    }



}


export async function second({ page, enqueueLinks, request, log, addRequests }) {
    await autoScroll(page, 150)
    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.group.relative.flex.h-full.w-full.grow.cursor-pointer.flex-col.bg-white ')).map((m) => {
            const title = m.querySelector('.line-clamp-2.flex.h-10.cursor-pointer.text-sm')?.innerText
            const price = m.querySelector('.whitespace-nowrap.text-sm.font-semibold')?.innerText
            const img = m.querySelector("[srcset]")?.getAttribute("srcset").split(" ")[0]
            const link = m.querySelector("a").href
            return {
                title,
                price,
                img,
                link
            }
        })

        return result.length > 0 ? result.filter(f = f.img).map(m => { return { ...m, pageTitle, pageURL } }) : []
    })
    return data
    debugger
}

const urls = ["https://markapia.com/"]
export { urls }