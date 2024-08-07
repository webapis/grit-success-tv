
export default async function first({ page, enqueueLinks, request, log, addRequests }) {
    debugger
await page.waitForSelector('a.yt-simple-endpoint.style-scope.ytd-playlist-panel-video-renderer')
debugger
    const firstData = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-playlist-panel-video-renderer')).map((m) => {
            return {
                TVSERIES_TITLE: m.querySelector('#byline-container span.style-scope.ytd-playlist-panel-video-renderer').textContent.trim(),
                WATCH_LINK: m.href
            }
        })
    })
debugger
    return firstData
}


//m.querySelector('.yt-core-image').src

const urls = [
    "https://www.youtube.com/watch?v=A0YQiurLom4&list=PLDqeHyMqCZ2xUIg82higJdctXBHjB6baQ",
    "https://www.youtube.com/watch?v=Vs2vPMCHAr8&list=PLKWui-ds6V3NZD1JpHROKVKPyjj3eNs6x",
    "https://www.youtube.com/watch?v=Vs2vPMCHAr8&list=PLKWui-ds6V3NZD1JpHROKVKPyjj3eNs6x"]
export { urls }
