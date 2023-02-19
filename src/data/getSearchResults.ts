import axios from "axios";

async function getSearchResults(apiUrl, query) {
  try {
    const response = await axios.get(`/search?q=${query}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
