import axios from "axios";

const PAGE_SIZE = 10;

const fetchGeneNames = async (page : number) => {
  try {
    const response = await axios.get(`/api/GeneNames`, {
        params: {
          page,
          pageSize: PAGE_SIZE,
        },
      });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching Disease:", error);
    throw error;
  }
};
export default fetchGeneNames;