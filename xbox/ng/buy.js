(function () {})();

if ($request.method.toUpperCase() !== "OPTIONS") {

  let headers = $request.headers;
  let contentType = headers['Content-Type'] || headers['content-type'];
  let requestBody;

  // 处理 application/json
  if (contentType && contentType.includes('application/json')) {
    try {
      requestBody = JSON.parse($request.body);

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

      // 返回修改后的 JSON 请求体
      $done({
        headers: headers,
        body: JSON.stringify(requestBody)
      });

    } catch (error) {
      console.log("JSON Parse Error:", error.message);
      $done({});
    }

  // 处理 application/x-www-form-urlencoded
  } else if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
    requestBody = $request.body.split('&').reduce((acc, pair) => {
      const [key, value] = pair.split('=');
      acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
      return acc;
    }, {});

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

    // 返回修改后的 application/x-www-form-urlencoded 请求体
    let modifiedBody = Object.keys(requestBody)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(requestBody[key]))
      .join('&');

    $done({
      headers: headers,
      body: modifiedBody
    });

  // 处理其他类型或没有 Content-Type 的情况
  } else {
    $done({
      headers: headers,
      body: $request.body  // 不做修改，直接返回原请求体
    });
  }

} else {
  $done({});
}
