export class All_NSE {
    constructor() { }

    async getCookie() {
        const response = await fetch('https://www.nseindia.com', {
            method: 'GET',
            credentials: 'include',
        });
        const cookies = response.headers.get('set-cookie');
        let requiredCookies = this.extractCookies(cookies)

        return requiredCookies;
    }

    extractCookies(cookieStr) {
        const nsitMatch = cookieStr.match(/nsit=([^;]+)/);
        const nseappidMatch = cookieStr.match(/nseappid=([^;]+)/);
        // console.log(nseappidMatch[1])

        if (nsitMatch && nseappidMatch) {
            return `${nsitMatch[0]}; ${nseappidMatch[0]}`;
        }
        return '';
    }


    async getData(symbol) {

        let cookie = await this.getCookie()

        // console.log("----------------------------------")
        // console.log(cookie)
        // console.log("----------------------------------")


        const response = await fetch(`https://www.nseindia.com/api/quote-equity?symbol=${symbol}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                // 'Referer': 'https://www.nseindia.com',
                'Cookie': cookie
            },
        })

        const data = await response.json()
        return data;

    }
}

// Instantiate the class and call the method
// const data = new All_NSE();
// data.getData('REFEX').then(cookies => {
//     console.log('Returned Cookies:', cookies);
// });