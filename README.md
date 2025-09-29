# 📦 All_NSE JavaScript Package

A lightweight Node.js module to fetch **live stock prices**, **full equity quotes**, and **historical data** from **NSE India** using `fetch` and cookie handling.

---

## 📁 Installation

Install via npm:

```bash
npm install nse-stock-india
```

> ⚡ Requires **Node.js v18+** (or a polyfilled `fetch` environment).

---

## 🚀 Usage Example

```javascript
import { All_NSE } from "nse-stock-india";

const nse = new All_NSE();

(async () => {
  const liveData = await nse.getLiveData("RELIANCE");
  console.log("Live Price Info:", liveData);

  const fullData = await nse.getData("TCS");
  console.log("Full Equity Data:", fullData);

  const historical = await nse.getHistoricalData("INFY", "01-09-2024", "15-09-2024");
  console.log("Historical Data:", historical);
})();
```

---

## 📚 API Reference

### 🔹 `new All_NSE()`
Creates a new instance of the NSE API class.

---

### 🔹 `async getCookie(symbol: string): Promise<string>`
Fetches the required session cookies for a given NSE stock symbol.

- **symbol**: `string` – NSE ticker symbol (e.g., `'INFY'`)
- **Returns**: `string` – A valid cookie string to be used in requests

---

### 🔹 `async getData(symbol: string): Promise<Object | null>`
Fetches the **full equity quote** data from NSE.

- **symbol**: `string`
- **Returns**: `Object` – Includes `priceInfo`, `metadata`, `securityInfo`, etc.

---

### 🔹 `async getLiveData(symbol: string): Promise<Object | null>`
Fetches only the **`priceInfo`** field (live price details) from NSE.

- **symbol**: `string`
- **Returns**: `Object` – Example structure:

```json
{
  "lastPrice": 401,
  "change": -5.39,
  "pChange": -1.32,
  "previousClose": 406.4,
  "open": 406,
  "close": 401.65,
  "vwap": 404.07,
  "lowerCP": "386.10",
  "upperCP": "426.70",
  "intraDayHighLow": { "min": 396.65, "max": 413.4, "value": 401 },
  "weekHighLow": {
    "min": 124.25,
    "minDate": "05-Jun-2024",
    "max": 600,
    "maxDate": "30-Sep-2024",
    "value": 401
  }
}
```

---

### 🔹 `async getHistoricalData(symbol: string, from: string, to: string, series?: string[]): Promise<Object | null>`
Fetches **historical OHLC data** for a stock symbol within a date range.

- **symbol**: `string` – NSE ticker (e.g., `'INFY'`)
- **from**: `string` – Start date (`"DD-MM-YYYY"`)
- **to**: `string` – End date (`"DD-MM-YYYY"`)
- **series**: `Array<string>` – Defaults to `["EQ"]` (equity series)
- **Returns**: `Object` – Historical candles with OHLC + volume

---

## 🛡️ Notes

- This package simulates browser-like behavior by sending cookies.
- NSE may block aggressive scraping — rotate user-agents or IPs if necessary.
- Intended for **educational & personal projects** only. Always respect NSE’s terms of service.

---

## 📜 License & Disclaimer

**License:** Apache 2.0 — see [LICENSE](./LICENSE.txt).  

⚠️ **Disclaimer:**  
`all-nse` is **not affiliated with or endorsed by NSE India**.  
It is an open-source utility that accesses publicly available NSE data for research & educational purposes. Please review NSE’s official terms of use before using this data in production or commercial applications.  
