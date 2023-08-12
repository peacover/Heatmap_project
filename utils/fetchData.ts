import axios from "axios";

const fetchData = async ({ disease, expriment } : { disease: string, expriment: string }) => {
  try {
    // const { disease, expriment } = props;
    // const disease = disease as string;
    // const expriment = (props[2] || "") as string;
    
    if (disease && expriment === "") {
      const response = await axios.get(`/api/MentalomeData?disease=${disease}`);
      const data = await response.data;
      return {
        expriment: data.expriment,
        sra: data.sra,
      };
      // console.log("im heeeeere: ", data);
      // return data;
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
