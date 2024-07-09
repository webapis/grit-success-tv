
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {

    function extractImageUrl(inputString) {
        // Regular expression to match the URL within the quotes
        const regex = /url\("([^"]+)"\)/;
        const matches = inputString.match(regex);

        // Return the URL if found, otherwise return null
        return matches ? matches[1] : null;
    }
    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll(".mdp-imager-wrap")).map(m => {
            // Check if elements exist before accessing properties
            const TVSERIES_TITLE = m.querySelector(".mdp-imager-box-title")?.innerText.toLowerCase();
            const DETAIL_LINK = m.querySelector("a")?.href;
            const imgstr = extractImageUrl(document.querySelector('.mdp-imager-box-image div').style.backgroundImage)
            return {
                TVSERIES_TITLE,
                DETAIL_LINK,
                POSTER: {
                    POSTER_IMG: imgstr,
                    POSTER_ORIENTATION: "portrait",
                    POSTER_QUALITY: 1
                },

            }
        });
        return collection
    })

    debugger
     return data

}



const urls = ["https://ngmedia.com.tr/projelerimiz/"]
export { urls }


//summary