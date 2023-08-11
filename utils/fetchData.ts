import axios from "axios";

const fetchData = async (props: { disease: string; expriment: string }) => {
  try {
    // const { disease, expriment } = props;
    const disease = (props.disease || "") as string;
    const expriment = (props.expriment || "") as string;
    if (disease === "" || expriment === "") {
      const response = await axios.get(`/api/DiseaseValues`);
      const data = await response.data;
      return {
        disease: data.disease,
      };
    } else if (disease && expriment === "") {
      const response = await axios.get(`/api/MentalomeData?disease=${disease}`);
      const data = await response.data;
      return {
        disease: data.disease,
        expriment: data.expriment,
      };
    } else if (disease && expriment) {
      const response = await axios.get(
        `/api/MentalomeData?disease=${disease}&expriment=${expriment}`
      );
      const data = await response.data;
      return {
        disease: data.disease,
        expriment: data.expriment,
        sra: data.sra,
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
