(function () {})();

if ($request.method.toUpperCase() !== "OPTIONS") {

  let headers = $request.headers;
  let requestBody = JSON.parse($request.body);

  if (requestBody.market) {  
    const originalMarket = requestBody.market;
    requestBody.market = 'NG';

    if (requestBody.friendlyName) {
      const marketRegex = new RegExp(originalMarket + '$');
      requestBody.friendlyName = requestBody.friendlyName.replace(marketRegex, 'NG');
    }
  }

  if (requestBody.locale) {
    requestBody.locale = "en-NG";
  }

  for (let key in headers) {
    if (headers.hasOwnProperty(key)) {
      if (key.toLowerCase() === "x-ms-market") {
        headers[key] = "NG";
      }
    }
  }

  $done({
    headers: headers,
    body: JSON.stringify(requestBody)
  });

} else {
  $done({});
}
