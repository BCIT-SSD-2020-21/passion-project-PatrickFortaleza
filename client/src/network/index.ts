import axios from 'axios';

const BASE_URL = "https://pynews-api.herokuapp.com/news"

export const queryNews = async (date: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${date}`)
    return response.data
  } catch (error) {
    console.log(error.response)
    return {
      error: error
    }
  }
}