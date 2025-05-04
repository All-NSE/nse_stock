export class All_NSE {
    constructor() { }

    async getCookie() {
        try {
            // console.log("working")
            const response = await fetch('https://www.nseindia.com/get-quotes/derivatives?symbol=NIFTY', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch cookies: HTTP ${response.status}`);
            }

            const cookies = response.headers.get('set-cookie');
            // console.log('====================================');
            // console.log('Cookies:', cookies);
            // console.log('====================================');
            let requiredCookies = this.extractCookies(cookies);
            // console.log(requiredCookies)
            return requiredCookies;
        } catch (error) {
            console.error("Error fetching NSE Cookie:", error);
            throw new Error(`Error fetching NSE Cookie: ${error.message}`);
        }
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
        try {
            let cookie = await this.getCookie();

            console.log("----------------------------------");
            console.log(cookie);
            console.log("----------------------------------");

            const response = await fetch(`https://www.nseindia.com/api/quote-equity?symbol=${symbol}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                    'Referer': 'https://www.nseindia.com',
                    'Cookie': cookie
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${symbol}: HTTP ${response.status}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error fetching NSE Data:", error);
            console.error("Error message:", error.message);
            console.error("Error stack trace:", error.stack);
            throw new Error(`Error fetching NSE Data: ${error.message}`);
        }
    }

}

// // Instantiate the class and call the method
const data = new All_NSE();
data.getData('REFEX').then(cookies => {
    console.log('Returned Cookies:', cookies);
    process.exit()
});