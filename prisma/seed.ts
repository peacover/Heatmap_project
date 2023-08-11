import path from "path";
import * as fs from "fs";
import readline from "readline";
import { db } from "@/lib/db";

async function processAndSeedData() {
  const filePath = path.join(process.cwd(), 'public', '../test_data.txt');
  const fileStream = fs.createReadStream(filePath, 'utf-8');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const batchSize = 100;
  let batch = [];
  let first_line = true;
  for await (const line of rl) {
    if (first_line){
        first_line = false;
        continue;
    }
    if (line === '') {
      continue;
    }
    const data = line.split('\t');
    if (data.length !== 7) {
      console.error('Error: Incorrect number of columns');
      continue;
    }
    const record = {
      gene_ids: data[1],
      value: parseInt(data[2]),
      sra: data[3],
      abbreviation: data[4],
      expriment_type: data[5],
      disease: data[6],
    };

    batch.push(record);

    if (batch.length >= batchSize) {
      await db.mentalome.createMany({
        data: batch,
      });

      batch = [];
    }
  }

  if (batch.length > 0) {
    await db.mentalome.createMany({
      data: batch,
    });
  }

  console.log('Data seeding complete');
}

processAndSeedData()
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(async () => {
    await db.$disconnect();
  });


async function seedDatabase() {
  try {
    const uniqueSras = await db.mentalome.findMany({
      // distinct: ["disease", "expriment_type", "sra"],
    });
    for (const { disease, expriment_type, sra, abbreviation, gene_ids, value } of uniqueSras) {
      const existingDisease = await db.disease.findFirst({
        where: {
          name: disease,
        },
      });
      if (!existingDisease) {
        await db.disease.create({
          data: {
            name: disease,
          },
        });
      }
      const existingExperiment = await db.expriment.findFirst({
        where: {
          name: expriment_type,
        },
      });
      if (!existingExperiment) {
        await db.expriment.create({
          data: {
            name: expriment_type,
            disease: {
              connect: { name: disease },
            },
          },
        });
      }
      const existingSra = await db.sra.findFirst({
        where: {
          name: sra,
        },
      });
    
      if (!existingSra) {
        await db.sra.create({
          data: {
            name: sra,
            expriment: { // Corrected field name here
              connect: {
                name: expriment_type,
                disease: {
                  name: disease,
                },
              },
            },
          },
        });
      }
      const existingGene = await db.gene.findFirst({
        where: {
          name: gene_ids,
        },
      });
      if (!existingGene) {
        await db.gene.create({
          data: {
            name: gene_ids,
            geneSras: {
              create: {
                value: value,
                description: abbreviation,
                sra: {
                  connect: {
                    name: sra,
                    expriment: {
                      name: expriment_type,
                      disease: {
                        name: disease,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }
      else{
        await db.geneSra.create({
          data: {
            value: value,
            description: abbreviation,
            sra: {
              connect: {
                name: sra,
                expriment: {
                  name: expriment_type,
                  disease: {
                    name: disease,
                  },
                },
              },
            },
            gene: {
              connect: {
                name: gene_ids,
              },
            },
          },
        });
      }
    }
    console.log("Seed data has been successfully generated.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.$disconnect();
  }
}

seedDatabase();
