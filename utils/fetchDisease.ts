import axios from "axios";

const fetchDisease = async () => {
  try {
    const response = await axios.get(`/api/DiseaseValues`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching Disease:", error);
    throw error;
  }
};
export default fetchDisease;
