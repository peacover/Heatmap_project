import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const DiseaseValues = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const diseaseQuery = await db.disease.findMany({
      select: {
        name: true,
      },
    });
    const diseaseNames = diseaseQuery.map((item) => item.name);
    res.json(diseaseNames);
  } catch (error) {
    console.error("Error fetching Disease:", error);
    throw error;
  }
};

export default DiseaseValues;
