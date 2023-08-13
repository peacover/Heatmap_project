import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

const GeneSraValues = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { sra, gene } = req.body;

  try {
    const values = await db.geneSra.findMany({
        where: {
          sra: { name: { in: sra } },
          gene: { name: { in: gene } },
        },
        select: {
          value: true,
          sra: { select: { name: true } },
          gene: { select: { name: true } },
        },
      });
      
      const valuesArray: { sraName: string; geneName: string; value: number }[] = values.map((item) => ({
        geneName: item.gene.name,
        sraName: item.sra.name,
        value: item.value,
      }));
    res.status(200).json(valuesArray);
  } catch (error) {
    console.error("Error fetching values:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default GeneSraValues;