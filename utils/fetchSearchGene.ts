import axios from "axios";

const PAGE_SIZE = 50;

const fetchSearchGene = async (input :  string) => {
  try {
    const response = await axios.get(`/api/SearchGene?input=${input}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching SearchGene:", error);
    throw error;
  }
};
export default fetchSearchGene;