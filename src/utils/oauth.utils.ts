import axios from "axios";
const getMALUser = async (token: string) => {
  // Check if MAL account exists
  // If not, throw an error
  const MAL_USER_URL = "https://api.myanimelist.net/v2/users/@me";
  const MAL_HEADERS = {
    Authorization: `Bearer ${token}`,
  };
  console.log(MAL_HEADERS);
  try {
    const response = await axios.get(MAL_USER_URL, {
      headers: MAL_HEADERS,
    });
    return response.data.id.toString();
  } catch (e) {
    console.error(e);
    throw new Error("Invalid MAL account.");
  }
};

export { getMALUser };
