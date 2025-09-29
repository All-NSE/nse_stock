import All_NSE from "../index.js";

// Create a reusable instance of the NSE API wrapper
const nse = new All_NSE();

/**
 * Test fetching the full equity quote data.
 * @param {string} symbol - NSE stock symbol
 */
const testFullData = async (symbol) => {
    try {
        const result = await nse.getData(symbol);
        console.log("Full Data:", result);
    } catch (error) {
        console.error("Error fetching full data:", error);
    }
};

/**
 * Test fetching only the live price info (priceInfo).
 * @param {string} symbol - NSE stock symbol
 */
const testLiveData = async (symbol) => {
    try {
        const result = await nse.getLiveData(symbol);
        console.log("Live Price Info:", result);
    } catch (error) {
        console.error("Error fetching live data:", error);
    }
};

/**
 * Test fetching historical OHLC data.
 * @param {string} symbol - NSE stock symbol
 */
const testHistoricalData = async (symbol) => {
    try {
        // Dates must be in "DD-MM-YYYY" format
        const result = await nse.getHistoricalData(symbol, "15-07-2025", "04-08-2025");
        console.log("Historical Data:", result);
    } catch (error) {
        console.error("Error fetching historical data:", error);
    }
};

// 🔹 Example NSE API URLs (for reference/debugging):
// https://www.nseindia.com/api/historical/cm/equity?symbol=REFEX&series=["BE","BZ"]&from=15-07-2025&to=04-08-2025
// https://www.nseindia.com/api/historical/cm/equity?symbol=REFEX&series=["EQ"]&from=05-08-2024&to=05-08-2025
// https://www.nseindia.com/api/historical/cm/equity?symbol=REFEX&series=["BE","BZ","EQ"]&from=03-03-2025&to=05-08-2025

// 🔹 Run test functions here:
(async () => {
    await testFullData("REFEX");     // Fetch complete equity data
    await testLiveData("REFEX");     // Fetch only live price info
    await testHistoricalData("REFEX"); // Fetch historical OHLC data
})();
