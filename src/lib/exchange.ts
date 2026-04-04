// Fallback rates in case the API is down
const FALLBACK_RATES: Record<string, number> = {
  "USD": 1,
  "INR": 83.5,
  "EUR": 0.92,
  "GBP": 0.79,
  "JPY": 151.8,
  "AUD": 1.53,
  "CAD": 1.36,
  "SGD": 1.35,
  "AED": 3.67,
  "CNY": 7.23,
};

export async function getExchangeRate(from: string, to: string): Promise<number> {
  if (from === to) return 1;

  try {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=1&from=${from}&to=${to}`);
    if (!response.ok) throw new Error("Failed to fetch rate");
    const data = await response.json();
    return data.rates[to];
  } catch (error) {
    console.warn(`Exchange rate fetch failed for ${from} to ${to}, using fallback.`, error);
    // Calculate relative rate using USD as base
    const fromRate = FALLBACK_RATES[from] || 1;
    const toRate = FALLBACK_RATES[to] || 1;
    return toRate / fromRate;
  }
}
