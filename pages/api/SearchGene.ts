import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const SearchGene = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const searchName : string = req.query.input ? req.query.input as string : "";
    if (searchName === "") {
      res.json([]);
      return;
    }
    const geneQuery = await db.gene.findMany({
        where: {
            name: {
                contains: searchName,
            },
        },
        select: {
            name: true,
        },
        orderBy: {
            name: 'asc',
        },
        take: 50,
    });
    const geneNames = geneQuery.map((item) => item.name);
    res.json(geneNames);
  }
  catch (error) {
    console.error("Error fetching GeneId:", error);
    throw error;
  }
};

export default SearchGene;