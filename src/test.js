import All_NSE from "../index.js";

let instance = new All_NSE();

const test_package = async (symbol) => {
    try {
        let result = await instance.getData(symbol);
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
}

const test_live = async (symbol) => {
    try {
        let result = await instance.getLiveData(symbol);
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
}

const historical_data = async (symbol) => {
    try {
        let result = await instance.getHistoricalData(symbol, '15-07-2025', '04-08-2025');
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
}




// https://www.nseindia.com/api/historical/cm/equity?symbol=REFEX&series=["BE","BZ"]&from=15-07-2025&to=04-08-2025
// https://www.nseindia.com/api/historical/cm/equity?symbol=REFEX&series=[%22EQ%22]&from=05-08-2024&to=05-08-2025
// https://www.nseindia.com/api/historical/cm/equity?symbol=REFEX&series=["BE","BZ","EQ"]&from=03-03-2025&to=05-08-2025
// test_package('REFEX');
// test_live('REFEX')
// historical_data('REFEX')