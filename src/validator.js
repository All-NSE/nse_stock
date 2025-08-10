export function validateHistoricalDataInput(from, to, series) {
    const allowedSeries = ['EQ', 'BE', 'BZ'];

    // --- Check if from and to are provided ---
    if (!from || !to) {
        throw new Error('Both `from` and `to` dates are required.');
    }

    // --- Validate series ---
    if (!Array.isArray(series) || !series.every(s => allowedSeries.includes(s))) {
        throw new Error('Invalid series value. Allowed values are only: EQ, BE, BZ.');
    }

    // --- Parse DD-MM-YYYY to Date ---
    const parseDate = (str) => {
        const [day, month, year] = str.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date format: "${str}". Expected format is DD-MM-YYYY.`);
        }
        return date;
    };

    const fromDate = parseDate(from);
    const toDate = parseDate(to);
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // --- Date range validations ---
    if (fromDate < oneYearAgo) {
        throw new Error('`from` date cannot be earlier than one year ago.');
    }

    if (fromDate > toDate) {
        throw new Error('`from` date cannot be after `to` date.');
    }

    if (toDate > today) {
        throw new Error('`to` date cannot be in the future.');
    }
}
