/**
 * Fetch real-time equity quote data from NSE India API.
 * 
 * @param {string} symbol - Stock symbol (e.g., "RELIANCE").
 * @param {string} cookie - Required session cookie for authenticated requests.
 * @returns {Promise<object|null>} - JSON response with stock details, or null if request fails.
 */
export const fetchData = async (symbol, cookie) => {
    try {
        const response = await fetch(`https://www.nseindia.com/api/quote-equity?symbol=${symbol}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cookie': cookie // NSE API often requires cookies for access
            },
        });

        if (!response.ok) {
            // Throw error if response status is not in 200–299 range
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Return parsed JSON response
        return await response.json();

    } catch (error) {
        // Log the error for debugging but avoid crashing app
        console.error(`Failed to fetch data for symbol "${symbol}":`, error.message);
        return null;
    }
};


/**
 * Fetch historical equity data from NSE India API.
 * 
 * @param {string} symbol - Stock symbol (e.g., "INFY").
 * @param {string} from - Start date in "DD-MM-YYYY" format.
 * @param {string} to - End date in "DD-MM-YYYY" format.
 * @param {Array<string>} series - Series types (e.g., ["EQ"]).
 * @param {string} cookie - Required session cookie.
 * @returns {Promise<object|null>} - JSON response with historical data, or null if request fails.
 */
export const fetchHistoricalData = async (symbol, from, to, series, cookie) => {
    try {
        // Encode series array (e.g., ["EQ"]) into a safe query parameter
        const seriesParam = encodeURIComponent(JSON.stringify(series));

        const response = await fetch(
            `https://www.nseindia.com/api/historical/cm/equity?symbol=${symbol}&series=${seriesParam}&from=${from}&to=${to}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Cookie': cookie
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error(`Failed to fetch historical data for symbol "${symbol}":`, error.message);
        return null;
    }
};


/**
 * Extract required NSE cookies (nsit + nseappid) from a full cookie string.
 * 
 * @param {string} cookieStr - Raw cookie string (as returned from response headers).
 * @returns {string} - Concatenated cookie string usable in requests, or empty string if missing.
 */
export const extractCookies = (cookieStr) => {
    const nsitMatch = cookieStr.match(/nsit=([^;]+)/);
    const nseappidMatch = cookieStr.match(/nseappid=([^;]+)/);

    // If both required cookies exist, return them in correct format
    if (nsitMatch && nseappidMatch) {
        return `${nsitMatch[0]}; ${nseappidMatch[0]}`;
    }

    // Otherwise return empty string, meaning cookies are incomplete
    return '';
};
