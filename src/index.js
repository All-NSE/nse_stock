import { fetchData, extractCookies } from "./helper.js";

export class All_NSE {
    constructor() { }

    async getCookie(symbol) {
        const response = await fetch(`https://www.nseindia.com/get-quotes/derivatives?symbol=${symbol}`, {
            method: 'GET',
            credentials: 'include',
        });
        const cookies = response.headers.get('set-cookie');
        let requiredCookies = extractCookies(cookies)

        return requiredCookies;
    }



    async getData(symbol) {
        try {
            const cookie = await this.getCookie(symbol);
            const data = await fetchData(symbol, cookie) || {};
            return data;
        } catch (error) {
            console.error(`Error getting data for symbol "${symbol}":`, error.message);
            return null;
        }
    }

    async getLiveData(symbol) {
        try {
            const cookie = await this.getCookie(symbol);
            const { priceInfo } = await fetchData(symbol, cookie) || {};
            return priceInfo ?? null;
        } catch (error) {
            console.error(`Error fetching live data for "${symbol}":`, error.message);
            return null;
        }
    }

}

