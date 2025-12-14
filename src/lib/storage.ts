type StorageType = 'localStorage' | 'sessionStorage'

export function saveParamData(
  paramName: string,
  data: unknown,
  storageType: StorageType = 'localStorage'
): void {
  try {
    const storage = storageType === 'localStorage' ? localStorage : sessionStorage
    const serializedData = JSON.stringify(data)
    storage.setItem(paramName, serializedData)
  } catch (error) {
    console.error(`Error saving data to ${storageType}:`, error)
    throw error
  }
}

export function getParamData<T = unknown>(
  paramName: string,
  storageType: StorageType = 'localStorage'
): T | null {
  try {
    const storage = storageType === 'localStorage' ? localStorage : sessionStorage
    const item = storage.getItem(paramName)
    if (item === null) {
      return null
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error retrieving data from ${storageType}:`, error)
    return null
  }
}
