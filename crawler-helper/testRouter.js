export default async function testRouter({ page, enqueueLinks, request, log, addRequests }) {

    debugger
const data = await page.evaluate(()=>{
   const collection = Array.from(document.querySelectorAll(".actor2-card")).map(m => {
    // Check if elements exist before accessing properties
    const actor = m.querySelector('p.spot').innerText;
    const character = m.querySelector('h3.title').innerText
    const img = document.querySelector('.circle-item img[data-src]').getAttribute('data-src');

    return {
        actor,
        character,
        img
    }
});

return collection

})
debugger

return data
    debugger
    //test
}

const testUrl =["https://www.kanald.com.tr/bir-derdim-var/oyuncular"]

export {testUrl}