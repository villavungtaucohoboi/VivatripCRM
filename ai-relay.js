// Vivatrip AI relay — worker trung chuyển gọi Claude từ vùng được hỗ trợ.
// Biến cần có (Settings → Variables and Secrets, loại Secret): ANTHROPIC_API_KEY, RELAY_KEY
// Bật Settings → Placement → Smart để Cloudflare chạy worker này gần máy chủ Anthropic (Mỹ).
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/where') const p = await fetch('https://api.anthropic.com/v1/models', { headers: { 'x-api-key': env.ANTHROPIC_API_KEY || '', 'anthropic-version': '2023-06-01' } }).then(r => r.status).catch(() => 0);
      return new Response(JSON.stringify({ colo: req.cf?.colo, placement: req.headers.get('cf-placement') || '', anthropic: p === 200 ? 'OK — gọi được Claude' : p === 403 ? 'BỊ CHẶN VÙNG (403)' : 'mã ' + p }), { headers: { 'content-type': 'application/json' } });
    if (req.method !== 'POST' || url.pathname !== '/v1/messages') return new Response('not found', { status: 404 });
    if (!env.RELAY_KEY || req.headers.get('x-relay-key') !== env.RELAY_KEY) return new Response(JSON.stringify({ error: { message: 'relay key sai' } }), { status: 401 });
    const h = { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': req.headers.get('anthropic-version') || '2023-06-01', 'content-type': 'application/json' };
    const ws = req.headers.get('anthropic-workspace-id'); if (ws) h['anthropic-workspace-id'] = ws;
    const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: h, body: await req.text() });
    return new Response(r.body, { status: r.status, headers: { 'content-type': r.headers.get('content-type') || 'application/json', 'x-relay-colo': req.cf?.colo || '' } });
  },
};
