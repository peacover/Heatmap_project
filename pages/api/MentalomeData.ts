import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const MentalomeData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const disease = (req.query.disease || "") as string;
    let expriment = (req.query.expriment || "") as string;
    if (expriment === "all_expriment")
      expriment = "";
    if (disease && expriment) {
      const sra_query = await db.sra.findMany({
        where: {
          expriment: {
            name: expriment,
            disease: {
              name: disease,
            },
          },
        },
        select: {
          name: true,
        },
      });
      const sraNames = sra_query.map(item => item.name);
      return (res.json({
        sra: sraNames,
      }));
    }
    else if (disease) {
      const exprimentQuery = await db.expriment.findMany({
        where: {
          disease: {
            name: disease,
          },
        },
        select: {
          name: true,
          sras: {
            select: {
              name: true,
            },
          },
        },
      });
      
      const exprimentNames = exprimentQuery.map(item => item.name);
      const sraNames = exprimentQuery.flatMap(item => item.sras.map(sra => sra.name));
      return (res.json({
        expriment: exprimentNames,
        sra: sraNames,
      }));
    }
  } catch (error) {
    console.error("Error fetching distinct disease names:", error);
    throw error;
  }
};

export default MentalomeData;
