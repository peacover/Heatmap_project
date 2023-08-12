import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const MentalomeData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const disease = (req.query.disease || "") as string;
    let expriment = (req.query.expriment || "") as string;
    if (expriment === "all_expriment")
      expriment = "";
    // const distinctDiseaseNames = await db.mentalome.findMany({
    //   distinct: ['disease'],
    //   select: {
    //     disease: true,
    //   },
    // });
    // const diseaseNames = distinctDiseaseNames.map(item => item.disease);
    // let distinctExprimentNames
    // if (!expriment){
      
    //    distinctExprimentNames = await db.mentalome.findMany({
    //     distinct: ['expriment_type'],
    //     select: {
    //       expriment_type: true,
    //     }
    //   });
    // }
    // else{
    //   distinctExprimentNames = await db.mentalome.findMany({
    //     distinct: ['expriment_type'],
    //     where: {
    //       disease: disease,
    //     },
    //     select: {
    //       expriment_type: true,
    //     },
    //     // take: 10,
    //   });
    // }
    // const exprimentNames = distinctExprimentNames.map(item => item.expriment_type);
    // let sraNames = [];
    // if (expriment && disease){
    //   const distinctSraNames = await db.mentalome.findMany({
    //     distinct: ['sra'],
    //     where: {
    //       disease: disease,
    //       expriment_type: expriment,
    //     },
    //   });
    //   sraNames = distinctSraNames.map(item => item.sra);
    // }
    // else if (disease) {
    //   const distinctSraNames = await db.mentalome.findMany({
    //     distinct: ['sra'],
    //     where: {
    //       disease: disease,
    //     },
    //   });
    //   sraNames = distinctSraNames.map(item => item.sra);
    // }

    // else {
    //   const distinctSraNames = await db.mentalome.findMany({
    //     distinct: ['sra'],
    //   });
    //   sraNames = distinctSraNames.map(item => item.sra);
    // }

    // res.json({
    //   disease: diseaseNames,
    //   expriment: exprimentNames,
    //   sra: sraNames,
    // });

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
