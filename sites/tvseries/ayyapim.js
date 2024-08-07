
export default async function first({ page, enqueueLinks, request, log, addRequests }) {
debugger
 const result=   await enqueueLinks({
        selector: '.pagination a',
        label: 'list',
    });
debugger
    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('.feature-15-content')).map(m => {

            function extractImageUrl(cssString) {
                const regex = /url\((.*?)\)/;
                const match = cssString.match(regex);
                return match ? match[1] : null;
            }



            return {
                TVSERIES_TITLE: m.querySelector('a img').alt,
                POSTER: {
                    POSTER_IMG: extractImageUrl(m.querySelector('a img').style.backgroundImage).trim().replaceAll('\"',''),
                    POSTER_ORIENTATION: "portrait",
                    POSTER_QUALITY: 1
                },
            }
        })
        return collection
    })
debugger
    return data

}




const urls = ["https://ayyapim.com/tr-tr/diziler","https://ayyapim.com/tr-tr/diziler?page=2","https://ayyapim.com/tr-tr/diziler?page=3"]
export { urls }


//summary