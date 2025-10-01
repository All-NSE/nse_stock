import { fetchData, extractCookies, fetchHistoricalData } from "./helper.js";
import { validateHistoricalDataInput } from "./validator.js";

/**
 * Wrapper class for interacting with NSE India APIs.
 * Provides methods to fetch cookies, real-time data, live price info, and historical data.
 */
export class All_NSE {
    constructor() { }

    /**
     * Fetches required cookies for a given stock symbol from NSE website.
     * NSE APIs often require valid cookies to authorize requests.
     *
     * @param {string} symbol - Stock symbol (e.g., "RELIANCE").
     * @returns {Promise<string>} - A string containing the required cookies (nsit + nseappid).
     */
    async getCookie(symbol) {
        const response = await fetch(`https://www.nseindia.com/get-quotes/derivatives?symbol=${symbol}`, {
            method: 'GET',
            credentials: 'include', // Ensures cookies are included in the request
        });

        const cookies = response.headers.get('set-cookie');
        let requiredCookies = extractCookies(cookies);

        return requiredCookies;
    }

    /**
     * Fetch complete stock data for a symbol.
     *
     * @param {string} symbol - Stock symbol (e.g., "TCS").
     * @returns {Promise<object|null>} - JSON object containing stock details, or null on error.
     */
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

    /**
     * Fetch only live market price information for a symbol.
     *
     * @param {string} symbol - Stock symbol (e.g., "HDFCBANK").
     * @returns {Promise<object|null>} - Object containing live price info (LTP, change, etc.), or null on error.
     */
    async getLiveData(symbol) {
        try {
            const cookie = await this.getCookie(symbol);
            const { priceInfo } = await fetchData(symbol, cookie) || {};
            return priceInfo ?? null; // Return price info or null if missing
        } catch (error) {
            console.error(`Error fetching live data for "${symbol}":`, error.message);
            return null;
        }
    }

    /**
     * Fetch historical stock data for a symbol within a date range.
     *
     * @param {string} symbol - Stock symbol (e.g., "INFY").
     * @param {string} from - Start date in "DD-MM-YYYY" format.
     * @param {string} to - End date in "DD-MM-YYYY" format.
     * @param {Array<string>} [series=['EQ']] - Series type(s), usually ["EQ"] for equity.
     * @returns {Promise<object|null>} - JSON object with historical data, or null on error.
     */
    async getHistoricalData(symbol, from, to, series = ['EQ']) {
        try {
            // Validate input (ensures correct format & logical dates)
            validateHistoricalDataInput(from, to, series);

            const cookie = await this.getCookie(symbol);
            const data = await fetchHistoricalData(symbol, from, to, series, cookie) || {};
            return data ?? null;
        } catch (error) {
            console.error(`Error fetching historical data for "${symbol}":`, error.message);
            return null;
        }
    }
}
