//wiki dizi liste
export default async function dizi({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('.wikitable tbody tr')).map(m => m.querySelector('td a[title]')).filter(f => f).filter(f => !f.classList.contains('new')).map(m => {
            return {
                WIKILINK: m.href,
                TVSERIES_TITLE: m.getAttribute('title').trim().toLowerCase().replace(/\s*\(.*?\)/g, ''),

            }
        })
        return collection
    })
    for (let d of data) {
        await addRequests([{ url: d.WIKILINK, label: 'oyuncular', userData: { dizi: d } }])
    }
    debugger
  //  return data

}

export async function oyuncular({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const { userData: { dizi } } = request
    debugger
    const bilgiler = await page.evaluate(() => {

        const image = document.querySelector('.infobox-image img')?.src
        const data = Array.from(document.querySelectorAll('.infobox tr')).filter(f => f.querySelector('th') && f.querySelector('td')).map(m => {
            return {
                title: m?.querySelector('th').innerText,
                value: m.querySelector('td').innerText.replaceAll('\n', ', ')
            }
        }).reduce((prev, curr, i) => {
            console.log(curr)
            if (curr.title.includes('Format')) {
                return { ...prev, FORMAT: curr.value }
            } else if (curr.title.includes('Tür')) {
                return { ...prev, GENRES: curr.value.split(',') }
            }
            else if (curr.title.includes('Proje tasarımcısı')) {
                return { ...prev, PROJE_TASARIMCI: curr.value }
            }
            else if (curr.title.includes('Senarist')) {
                return { ...prev, SENARIST: curr.value }
            }
            else if (curr.title.includes('Öykü')) {
                return { ...prev, OYKU: curr.value }
            }
            else if (curr.title.includes('Yönetmen')) {
                return { ...prev, YONETMEN: curr.value }
            }
            else if (curr.title.includes('Başrol')) {
                return { ...prev, BASROL: curr.value }
            }
            else if (curr.title.includes('Tema müziği bestecisi')) {
                return { ...prev, TEMA_MUZIGI_BESTECI: curr.value }
            }
            else if (curr.title.includes('Besteci')) {
                return { ...prev, BESTECI: curr.value }
            }
            else if (curr.title.includes('Ülke')) {
                return { ...prev, ULKE: curr.value }
            }
            else if (curr.title.includes('Dili')) {
                return { ...prev, DILI: curr.value }
            }
            else if (curr.title.includes('Sezon sayısı')) {
                return { ...prev, SEZON_SAYISI: curr.value }
            }
            else if (curr.title.includes('Bölüm sayısı')) {
                return { ...prev, BOLUM_SAYISI: curr.value }
            }
            else if (curr.title.includes('Yapımcı')) {
                return { ...prev, YAPIMCI: curr.value }
            }
            else if (curr.title.includes('Mekân')) {
                return { ...prev, MEKAN: curr.value }
            }
            else if (curr.title.includes('Görüntü yönetmeni')) {
                return { ...prev, GORUNTU_YONETMEN: curr.value }
            }
            else if (curr.title.includes('Gösterim süresi')) {
                return { ...prev, GOSTERIM_SURESI: curr.value }
            }
            else if (curr.title.includes('Yapım şirketi')) {
                return { ...prev, YAPIM_SIRKETI: curr.value }
            }
            else if (curr.title.includes('Kanal')) {
                return { ...prev, KANAL: curr.value }
            }
            else if (curr.title.includes('Görüntü formatı')) {
                return { ...prev, GORUNTU_FORMATI: curr.value }
            }
            else if (curr.title.includes('Ses formatı')) {
                return { ...prev, SES_FORMATI: curr.value }
            }
            else if (curr.title.includes('Yayın tarihi')) {
                const years = curr?.value.match(/\d{4}/g);
                const firstYear = years ? parseInt(years[0], 10) : 0
                const lastYear = years ? parseInt(years[years.length - 1], 10) : 0
                return { ...prev, YAYIN_TARIHI: curr.value, FIRST_YEAR: firstYear, LAST_YEAR: lastYear }
            }
            else if (curr.title.includes('Durumu')) {
                return { ...prev, DURUM: curr.value }
            }

            return prev
        }, {})

        return {
            ...data, POSTER: {
                POSTER_IMG: image, POSTER_ORIENTATION: "portrait",
                POSTER_QUALITY: 2
            }
        }

    })  

    return { ...bilgiler, ...dizi }

}


const urls = ["https://tr.wikipedia.org/wiki/OGM_Pictures"]
export { urls }


