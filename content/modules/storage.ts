const getStorage = async (key: string) => {
  const result = await chrome.storage.sync.get([key])
  return result[key]
}

const setStorage = async (key: string, value: any) => {
  await chrome.storage.sync.set({ [key]: value })
}

export { getStorage, setStorage }
