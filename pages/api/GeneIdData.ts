import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const GeneIdData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const geneQuery = await db.gene.findMany({
        select: {
            name: true,
        },
    });
    const geneIds = geneQuery.map((item) => item.name);
    res.json(geneIds);
  }
  catch (error) {
    console.error("Error fetching GeneId:", error);
    throw error;
  }
};

export default GeneIdData;