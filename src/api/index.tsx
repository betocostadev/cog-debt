import axios from 'axios'

const BASE_URL = 'https://dummyjson.com/'

export const testDummyJson = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/test`)
    return response
  } catch (error) {
    console.log(error)
  }
}
