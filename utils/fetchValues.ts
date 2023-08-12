import axios from "axios";

const fetchValues = async (sra: string[], gene: string[]) => {
  try {
    const response = await axios.post("/api/GeneSraValues", {
      sra: sra,
      gene: gene,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching Disease:", error);
    throw error;
  }
};
export default fetchValues;
