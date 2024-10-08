//wiki dizi liste

const adddizi = [{
    WIKILINK: "https://tr.wikipedia.org/wiki/Kimse_Bilmez#:~:text=Kimse%20Bilmez%2C%20Baba%20Yap%C4%B1m%20imzal%C4%B1,ve%20aksiyon%20t%C3%BCr%C3%BCndeki%20televizyon%20dizisidir.",
    TVSERIES_TITLE: "Kimse Bilmez"

}]
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('.mw-category-group')).map(m => {
            return {
                WIKILINK: m.querySelector('a').href,
                TVSERIES_TITLE: m.querySelector('a').innerText.trim().toLowerCase().replace(/\s*\(.*?\)/g, '')
            }
        })
        return collection
    })
    for (let d of [...data, ...adddizi]) {
        await addRequests([{ url: d.WIKILINK, label: 'second', userData: { dizi: d } }])
    }
    debugger
    //  return data

}

export async function second({ page, enqueueLinks, request, log, addRequests }) {

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


const urls = ["https://tr.wikipedia.org/wiki/Kategori:Limon_Film_dizileri",

    "https://tr.wikipedia.org/wiki/Kategori:Limon_Film_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:Pastel_Film_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:Sinegraf_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:Tims_Productions_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:O3_Medya_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:NTC_Medya_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_romantik_komedi_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_polisiye_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_aksiyon_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_%C3%A7ocuk_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_dramatik_televizyon_dizileri",

    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_fantastik_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_gen%C3%A7lik_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_gerilim_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_romantik_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_spor_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_su%C3%A7_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_tarih%C3%AE_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_aile_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_belgesel_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_bilimkurgu_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_macera_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_mafya_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_medikal_drama_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_psikolojik_gerilim_televizyon_dizileri",
    "https://tr.wikipedia.org/wiki/Kategori:T%C3%BCrk_sava%C5%9F_televizyon_dizileri"


    
    
]
export { urls }


