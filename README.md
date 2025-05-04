

# 📦 All\_NSE JavaScript Package

A lightweight module to fetch **live stock price data** and full equity quote data from **NSE India** using `fetch` and cookies handling.

---

## 📁 Installation

You can use it directly in your project:

```bash
npm install all-nse
```

Ensure you're running it in a Node.js environment that supports `fetch` (Node.js v18+ or polyfilled).

---


## 🚀 Usage

![image](https://github.com/user-attachments/assets/cbd8903a-642c-48d8-afb6-58ad18abd67a)

## 📚 API Reference

### 🔹 `new All_NSE()`

Creates a new instance of the NSE API class.

---

### 🔹 `async getCookie(symbol: string): Promise<string>`

Fetches required session cookies for a given NSE stock symbol.

* **symbol**: `string` - NSE ticker symbol (e.g., `'INFY'`)
* **Returns**: `string` - Parsed cookies string

---

### 🔹 `async getData(symbol: string): Promise<Object | null>`

Fetches the **full equity quote** data from NSE for a symbol.

* **symbol**: `string` - NSE ticker symbol
* **Returns**: `Object` - Complete NSE response (includes `priceInfo`, `metadata`, `securityInfo`, etc.)

---

### 🔹 `async getLiveData(symbol: string): Promise<Object | null>`

Fetches **only the `priceInfo`** field from NSE for a given symbol.

* **symbol**: `string`
* **Returns**: `Object` – Example structure:

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


## 🛡️ Notes

* This package simulates browser-like behavior by using cookies.
* NSE actively blocks scraping. Rotate user-agents and IPs if necessary.
* Always use for educational or personal projects; respect NSE's terms of service.

### 📜 Legal Stuff

all-nse is distributed under the Apache Software License. See the LICENSE.txt file in the release for full details.

## ⚠️ DISCLAIMER: all-nse is not affiliated, endorsed, or vetted by the National Stock Exchange of India (NSE). It's an open-source tool that uses NSE’s publicly available data, and is intended for research and educational purposes. You should refer to NSE’s terms of use for details on your rights to use the actual data downloaded.

You should refer to NSE’s terms of use for detailed information on your rights and limitations in using their data.
