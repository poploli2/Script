let body = $request.body;

let jsonData = JSON.parse(body);

if (jsonData.locale) {
    jsonData.locale = 'en-NG';
}

if (jsonData.market) {
    jsonData.market = 'NG';
}

let newBody = JSON.stringify(jsonData);

$done({body: newBody});
