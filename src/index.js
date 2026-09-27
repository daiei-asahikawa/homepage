// 静的ファイルは Cloudflare がそのまま返す。ここに来るのは「該当するファイルが無かったとき」だけ。
// html_handling を "none" にして .html をそのまま返すようにしたため、
// トップ（/）だけは自分で index.html を渡す。それ以外はそのまま（無ければ404）。
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      return env.ASSETS.fetch(new Request(new URL('/index.html', url), request));
    }
    return env.ASSETS.fetch(request);
  },
};
