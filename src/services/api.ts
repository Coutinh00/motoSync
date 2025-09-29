const BASE = 'https://68d9a88d90a75154f0dae049.mockapi.io';

/**
 * Simple API wrapper for the mock API. Use `.get('bikes')` or `.post('users', body)`
 */
async function get(endpoint: string) {
  const res = await fetch(`${BASE}/${endpoint}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

async function post(endpoint: string, body: any) {
  const res = await fetch(`${BASE}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export default { get, post };


