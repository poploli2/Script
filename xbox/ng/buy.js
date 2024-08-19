// 修改请求 URL 中的查询参数（params）
let url = $request.url;
let urlObj = new URL(url);

// 修改 market 和 locale 的查询参数
if (urlObj.searchParams.has('market')) {
    urlObj.searchParams.set('market', 'NG');
}

if (urlObj.searchParams.has('locale')) {
    urlObj.searchParams.set('locale', 'en-NG');
}

// 修改请求体中的 market 和 locale
let body = $request.body;
if (body) {
    let jsonData = JSON.parse(body);

    // 修改请求体中的 market
    if (jsonData.market) {
        jsonData.market = 'NG';
    }

    // 修改请求体中的 locale
    if (jsonData.locale) {
        jsonData.locale = 'en-NG';
    }

    // 将修改后的请求体转换回字符串
    body = JSON.stringify(jsonData);
}

// 将修改后的 URL 和请求体应用回请求中
$done({url: urlObj.toString(), body: body});
