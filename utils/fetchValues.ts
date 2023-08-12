import axios from "axios";

const fetchValues = async (sra : string[]) => {
  try {
    const response = await axios.get(`/api/GeneSraValues`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching Disease:", error);
    throw error;
  }
};
export default fetchValues;
