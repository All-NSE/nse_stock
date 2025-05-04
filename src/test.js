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




// test_package('REFEX');
// test_live('REFEX')