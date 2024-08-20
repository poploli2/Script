(function () {})();
// 立即执行函数表达式 (IIFE)，防止污染全局命名空间。

if ($request.method.toUpperCase() !== "OPTIONS") {
  // 检查请求方法是否不是 "OPTIONS"。如果不是，则继续执行脚本；否则结束脚本。

  const $tool = new Tool();
  // 实例化 Tool 对象，方便后续调用各种工具方法。

  let headers = $request.headers;
  // 获取当前请求的头信息。

  let requestBody = JSON.parse($request.body);
  // 解析当前请求的 body（假设是 JSON 格式）。

  let requestUrl = $request.url;
  // 获取当前请求的 URL。

  if (requestBody.market) {
    requestBody.market = "NG";
    // 如果请求体中包含 market 字段，将其设置为 "NG"。
  }

  if (requestBody.locale) {
    requestBody.locale = "en-NG";
    // 如果请求体中包含 locale 字段，将其设置为 "en-NG"。
  }

  if (requestBody.friendlyName) {
    if (requestUrl.includes("appId=storeCart")) {
      requestBody.friendlyName = "cart-save-for-later-NG";
      // 如果 URL 包含 "appId=storeCart"，设置 friendlyName 为 "cart-save-for-later-NG"。
    } else {
      requestBody.friendlyName = "cart-NG";
      // 否则，设置 friendlyName 为 "cart-NG"。
    }
  }

  if (headers["X-MS-Market"]) {
    headers["X-MS-Market"] = "NG";
    // 修改请求头中的 "X-MS-Market" 字段为 "NG"。
  }

  if (headers["x-ms-market"]) {
    headers["x-ms-market"] = "NG";
    // 修改请求头中的 "x-ms-market" 字段为 "NG"。
  }

  $done({
    headers: headers,
    body: JSON.stringify(requestBody)
    // 完成请求，并返回修改后的请求头和请求体。
  });

} else {
  $done({});
  // 如果请求方法是 "OPTIONS"，直接结束脚本。
}

function Tool() {
  // Tool 类定义，用于封装通用的操作方法。

  const _node = (() => {
    if (typeof require === "function") {
      const request = require("request");
      return { request: request };
      // 在 Node.js 环境中，加载 request 模块，用于发送 HTTP 请求。
    } else {
      return null;
      // 如果不是 Node.js 环境，返回 null。
    }
  })();

  this.isSurge = typeof $httpClient !== "undefined";
  // 判断是否运行在 Surge 环境中。

  this.isQuanX = typeof $task !== "undefined";
  // 判断是否运行在 Quantumult X 环境中。

  this.isResponse = typeof $response !== "undefined";
  // 判断当前脚本是否是在处理响应时运行。

  this.notify = (title, subtitle, message) => {
    if (this.isQuanX) {
      $notify(title, subtitle, message);
      // 在 Quantumult X 环境中发送通知。
    }
    if (this.isSurge) {
      $notification.post(title, subtitle, message);
      // 在 Surge 环境中发送通知。
    }
    if (_node) {
      console.log(JSON.stringify({ title: title, subtitle: subtitle, message: message }));
      // 在 Node.js 环境中，将通知信息打印到控制台。
    }
  };

  this.write = (value, key) => {
    if (this.isQuanX) return $prefs.setValueForKey(value, key);
    // 在 Quantumult X 环境中写入持久化数据。
    if (this.isSurge) return $persistentStore.write(value, key);
    // 在 Surge 环境中写入持久化数据。
  };

  this.read = (key) => {
    if (this.isQuanX) return $prefs.valueForKey(key);
    // 在 Quantumult X 环境中读取持久化数据。
    if (this.isSurge) return $persistentStore.read(key);
    // 在 Surge 环境中读取持久化数据。
  };
}
