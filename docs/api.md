# Wenda API

下面是我们支持的 API 接口。

## 聊天

* POST 请求地址： http://{Host:Port}/chat/completions
* 请求头示例：

```Json
{
  "Content-Type": "application/json"
}
```


* 请求体示例 JSON 格式：

```Json
{
  "model": "rwkv",
  "stream": false,
  "messages": [
    {
      "role": "user",
      "content": "树上有9只鸟，猎人开枪打死1只，树上还剩几只鸟?"
    },
    {
      "role": "assistant",
      "content": "题目中提到有9只鸟，猎人打死了其中的1只，所以树上剩下的鸟的数量为8。"
    },
    {
      "role": "user",
      "content": "错了，树上不再剩下鸟。因为猎人开枪的声音会把其它的鸟都吓飞。"
    }
  ]
}
```

### 请求体

---

**model** `string` `Optional`
选择使用的模型，目前暂未使用。

---

**stream** `boolean` `Optional`
是否使用流式输出返回。

---

**messages** `array` `Required`
目前对话的信息列表。

| 参数名 | 含义|
| --- | --- |
|**role** `string` `Required`|信息的来源作者。取值包括`user`、`assistant`，分别代表用户和模型。|
|**content** `string` `Required`|信息内容。所有`content`都必须包含内容。|

---

* Node.js代码示例：

```javascript
const fetch = require("node-fetch");

fetch("http://127.0.0.1:17860/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "rwkv",
    stream: false,
    messages: [
      {
        role: "user",
        content: "树上有9只鸟，猎人开枪打死1只，树上还剩几只鸟?",
      },
    ],
  }),
});
```

* php代码示例：

```php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:17860/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "{\r\n    \"model\": \"rwkv\",\r\n    \"stream\": false,\r\n    \"messages\": [\r\n        {\r\n            \"role\": \"user\",\r\n            \"content\": \"你好\"\r\n        }\r\n    ]\r\n}");

$headers = array();
$headers[] = 'Content-Type: application/json';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);
```
