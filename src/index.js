const KEY_PREFIX = "PINIA-STORE-"

export default function createPiniaPlugin(options = {}) {
  // 解构传入的参数
  const {
    keyPrefix = KEY_PREFIX,
    storageType = "localStorage",
    immediately = false,
  } = options
  const storageMap = {
    localStorage: localStorage,
    sessionStorage: sessionStorage,
  }
  const STORAGE = storageMap[storageType]

  // 返回实际的插件函数
  return (context) => {
    const { store } = context
    const KEY = keyPrefix + store.$id

    if (immediately) {
      // 仓库数据实时同步到本地存储
      store.$subscribe((mutation, state) => {
        STORAGE.setItem(KEY, JSON.stringify(state))
      })
    } else {
      // 页面刷新时，存储仓库数据
      window.addEventListener("beforeunload", () => {
        STORAGE.setItem(KEY, JSON.stringify(store.$state))
      })
    }

    // 取出数据
    try {
      const localState = STORAGE.getItem(KEY)
      if (localState) {
        store.$patch(JSON.parse(localState))
      }
    } catch {
      console.log("读取失败")
    }
  }
}
