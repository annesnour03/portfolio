const cheerio = require("cheerio")
const axios = require('axios').default;

const api = {
    userInfo: userInfo
}


async function userInfo(username, platform) {

    // fetch('https://r6.tracker.network/profile/pc/xruprim/',{mode:'no-cors'})
    fetch('https://r6.tracker.network/profile/pc/xruprim').then((response) => {
            return response
        }).then((d) => {
            console.log('parsed json', d)

        }).catch(function (ex) {
            console.log('parsing failed', ex)

        })


// fetch("https://r6.tracker.network/profile/pc/xruprim", {
//     mode: 'no-cors',
//     method: 'get',
//     headers: {
//         accept: 'application/json',
//     }

// }).then((body) => {
//     console.log(body);
// })
return username

}

export default api