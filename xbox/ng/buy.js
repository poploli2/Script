(function () {})();

if ($request.method.toUpperCase() !== "OPTIONS") {

  const $tool = new Tool();
  let headers = $request.headers;
  let requestBody = JSON.parse($request.body);
  // let requestUrl = $request.url;

  if (jsonData.market) {
      const originalMarket = jsonData.market;
      jsonData.market = 'NG';

      if (jsonData.friendlyName) {
        const marketRegex = new RegExp(originalMarket + '$');
        jsonData.friendlyName = jsonData.friendlyName.replace(marketRegex, 'NG');
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

function Tool() {

  const _node = (() => {
    if (typeof require === "function") {
      const request = require("request");
      return { request: request };
    } else {
      return null;
    }
  })();

  this.isSurge = typeof $httpClient !== "undefined";
  this.isQuanX = typeof $task !== "undefined";
  this.isResponse = typeof $response !== "undefined";

  this.notify = (title, subtitle, message) => {
    if (this.isQuanX) {
      $notify(title, subtitle, message);
    }
    if (this.isSurge) {
      $notification.post(title, subtitle, message);
    }
    if (_node) {
      console.log(JSON.stringify({ title: title, subtitle: subtitle, message: message }));
    }
  };

  this.write = (value, key) => {
    if (this.isQuanX) return $prefs.setValueForKey(value, key);
    if (this.isSurge) return $persistentStore.write(value, key);
  };

  this.read = (key) => {
    if (this.isQuanX) return $prefs.valueForKey(key);
    if (this.isSurge) return $persistentStore.read(key);
  };
}
