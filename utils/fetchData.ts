import axios from "axios";

const fetchData = async ({
  disease,
  expriment,
}: {
  disease: string;
  expriment: string;
}) => {
  try {
    if (disease && expriment === "") {
      const response = await axios.get(`/api/MentalomeData?disease=${disease}`);
      const data = await response.data;
      return {
        expriment: data.expriment,
        sra: data.sra,
      };
    } else if (disease && expriment) {
      const response = await axios.get(
        `/api/MentalomeData?disease=${disease}&expriment=${expriment}`
      );
      const data = await response.data;
      return {
        sra: data.sra,
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
