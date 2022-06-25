import axios from "axios"

const cheerio = require("cheerio")

const api = {
    userInfo: userInfo
}
function getText(struc) {
    return struc.first().text().trim()
}

function toInt(string) {
    return parseInt(string.replace(',', ''))
}

async function userInfo(uname, platform) {
    const actualLink = `https://r6.tracker.network/profile/${platform}/${uname}`
    const link = `https://cors-anywhere.herokuapp.com/${actualLink}`
    var { data } = await axios.get(link).catch(error => {
        throw new Error("The username or platform provided is incorrect.")
    })

    const $ = await cheerio.load(data)
    const username = getText($(".trn-profile-header__name"))
    if (!username) {
        throw new Error("Name given does not exist!")
    }
    const level = getText($(".trn-card__content  > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2)"))

    // Banned alias makes page shift.
    var currentMMR = toInt(getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(1) > div.trn-card__content.trn-card--light.pt8.pb8 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2)")))
    if (!currentMMR) {
        currentMMR = toInt(getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(2) > div.trn-card__content.trn-card--light.pt8.pb8 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2)")))
    }
    const rankIcon = ($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(1) > div.trn-card__content.trn-card--light.pt8.pb8 > div:nth-child(2) > div:nth-child(1) > img")).first().attr('src')
    const bestMMR = getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)")).slice(0,-4)
    const bestMMRIcon = ($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(2) > div > div:nth-child(1) > div.r6-quickseason__image > img")).first().attr('src')


    const wins = toInt(getText($("div.trn-defstat--large:nth-child(1) > div:nth-child(2)")))
    const winPercentage = getText($("div.trn-defstat--large:nth-child(2) > div:nth-child(2)"))
    const kills = toInt(getText($("div.trn-defstat--large:nth-child(3) > div:nth-child(2)")))
    const kd = getText($("div.trn-defstat--large:nth-child(4) > div:nth-child(2)"))
    var currentRankedKd = getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2)")).slice(0, -3)
    if (currentRankedKd == "Unran" || !currentRankedKd) {
        currentRankedKd = "-1"
    }
    currentRankedKd = parseFloat(currentRankedKd)
    var timePlayed = getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div:nth-child(3) > div.trn-card__content > div.trn-defstats.trn-defstats--width4 > div:nth-child(6) > div.trn-defstat__value"))
    const playedWith = getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div.r6-queued-with.trn-card > div.r6-queued-with__title"))
    // Page is different when there is a "played with" at the top of the screen.
    if (!playedWith)
        timePlayed = getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div:nth-child(2) > div.trn-card__content > div.trn-defstats.trn-defstats--width4 > div:nth-child(6) > div.trn-defstat__value"))
    const bestAllTime = toInt(getText($("#profile > div.trn-scont.trn-scont--swap > div.trn-scont__aside > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)")).slice(0, -4))


    return {
        wins,
        winPercentage,
        kills,
        kd,
        bestMMR,
        bestMMRIcon,

        username,
        level,
        currentMMR,
        currentRankedKd,
        bestAllTime,
        timePlayed,
        rankIcon,
        actualLink,
    }
}

export default api


