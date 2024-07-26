
export default async function first({ page, enqueueLinks, request, log, addRequests }) {
    debugger
await page.waitForSelector('a.yt-simple-endpoint.style-scope.ytd-playlist-panel-video-renderer')
debugger
    const firstData = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-playlist-panel-video-renderer')).map((m) => {
            return {
                TVSERIES_TITLE: m.querySelector('#byline-container span.style-scope.ytd-playlist-panel-video-renderer').textContent.trim(),
                POSTER: {
                    POSTER_IMG: m.querySelector('.yt-core-image').src,
                    POSTER_ORIENTATION: "landscape",
                    POSTER_QUALITY: 5
                },
                WATCH_LINK: m.href
            }
        })
    })
debugger
    return firstData
}


//m.querySelector('.yt-core-image').src

const urls = ["https://www.youtube.com/watch?v=A0YQiurLom4&list=PLDqeHyMqCZ2xUIg82higJdctXBHjB6baQ"]
export { urls }
