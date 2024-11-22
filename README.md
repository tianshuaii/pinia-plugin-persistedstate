# tbc-pinia-plugin-persistedstate

持久化 pinia 状态

## 下载

```bash
npm i tbc-pinia-plugin-persistedstate
```

## 使用

```javascript
import persistedstate from "tbc-pinia-plugin-persistedstate"

const pinia = createPinia()
pinia.use(
  persistedstate({
    keyPrefix: "MY-STORE-", // 存储的key，默认为"PINIA-STORE-"
    storageType: "sessionStorage", // 存储类型，默认为window.localStorage
    immediately: true, // 是否立即加载，默认为false表示beforeunload时触发存储
  })
)
```
