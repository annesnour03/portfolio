import axios from "axios"
const cheerio = require("cheerio")


const api = {
    userInfo: userInfo
}
function getText(struc) {
    return struc.first().text().trim()
}

function toInt(string){
    return parseInt(string.replace(',',''))
}

async function userInfo(uname, platform) {
    const { data } = await axios.get(`https://corsanywhere.herokuapp.com/https://r6.tracker.network/profile/${platform}/${uname}`)
    const $ = await cheerio.load(data)
    const username = getText($(".trn-profile-header__name"))
    const level = getText($(".trn-card__content  > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2)"))
    const currentMMR = toInt(getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(1) > div.trn-card__content.trn-card--light.pt8.pb8 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2)")))


    const wins = toInt(getText($("div.trn-defstat--large:nth-child(1) > div:nth-child(2)")))
    const winPercentage = getText($("div.trn-defstat--large:nth-child(2) > div:nth-child(2)"))
    const kills = toInt(getText($("div.trn-defstat--large:nth-child(3) > div:nth-child(2)")))
    const kd = getText($("div.trn-defstat--large:nth-child(4) > div:nth-child(2)"))

    const timePlayed = getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div:nth-child(2) > div.trn-card__content > div.trn-defstats.trn-defstats--width4 > div:nth-child(6) > div.trn-defstat__value"))
    const bestAllTime = toInt(getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)")).slice(0, -4))

    const info = {
        wins,
        winPercentage,
        kills,
        kd,
        // 
        // 
        username,
        level,
        currentMMR,
        bestAllTime,
        timePlayed,
    }

    return info
}

export default api


