let body = $request.body;

let jsonData = JSON.parse(body);

if (jsonData.locale) {
    jsonData.locale = 'en-NG';
}

if (jsonData.market) {
    jsonData.market = 'NG';
}

if (jsonData.friendlyName) {
    jsonData.friendlyName = 'cart-NG';
}

let newBody = JSON.stringify(jsonData);

$done({body: newBody});
