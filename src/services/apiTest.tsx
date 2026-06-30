import { testDummyJson } from '#/api'

export const checkAPI = async () => {
  try {
    const data = await testDummyJson()
    return data
  } catch (error) {
    console.log(`Error checking test endpoint: ${error}`)
  }
}
