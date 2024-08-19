let body = $request.body;
let jsonData = JSON.parse(body);

if (jsonData.locale) {
    jsonData.locale = 'en-NG';
}

if (jsonData.market) {
    const originalMarket = jsonData.market;
    jsonData.market = 'NG';
    
    // if (jsonData.friendlyName) {
    //     const marketRegex = new RegExp(originalMarket + '$');
    //     jsonData.friendlyName = jsonData.friendlyName.replace(marketRegex, 'NG');
    // }
}

if (jsonData.friendlyName){
    jsonData.friendlyName = 'cart-save-for-later-NG';
}
    
let newBody = JSON.stringify(jsonData);
$done({body: newBody});
