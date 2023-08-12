import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const GeneNames = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const page : number = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize : number = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
    const geneQuery = await db.gene.findMany({
        select: {
            name: true,
        },
        orderBy: {
            name: 'asc',
        },
    });
    const geneIds = geneQuery.map((item) => item.name);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageGeneIds = geneIds.slice(start, end);
    res.json(pageGeneIds);
  }
  catch (error) {
    console.error("Error fetching GeneId:", error);
    throw error;
  }
};

export default GeneNames;