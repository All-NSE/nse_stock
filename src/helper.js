export const fetchData = async (symbol, cookie) => {
    try {
        const response = await fetch(`https://www.nseindia.com/api/quote-equity?symbol=${symbol}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cookie': cookie
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error(`Failed to fetch data for symbol "${symbol}":`, error.message);
        return null;
    }
};


export const extractCookies = (cookieStr) => {
    const nsitMatch = cookieStr.match(/nsit=([^;]+)/);
    const nseappidMatch = cookieStr.match(/nseappid=([^;]+)/);
    // console.log(nseappidMatch[1])

    if (nsitMatch && nseappidMatch) {
        return `${nsitMatch[0]}; ${nseappidMatch[0]}`;
    }
    return '';
}