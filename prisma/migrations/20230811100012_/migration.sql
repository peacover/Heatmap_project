-- CreateTable
CREATE TABLE "Mentalome" (
    "id" SERIAL NOT NULL,
    "gene_ids" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "sra" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "expriment_type" TEXT NOT NULL,
    "disease" TEXT NOT NULL,

    CONSTRAINT "Mentalome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expriment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "diseaseId" INTEGER NOT NULL,

    CONSTRAINT "Expriment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sra" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "exprimentId" INTEGER NOT NULL,

    CONSTRAINT "Sra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gene" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneSra" (
    "geneId" INTEGER NOT NULL,
    "sraId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GeneSra_pkey" PRIMARY KEY ("geneId","sraId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Disease_name_key" ON "Disease"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Expriment_name_key" ON "Expriment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sra_name_key" ON "Sra"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gene_name_key" ON "Gene"("name");

-- AddForeignKey
ALTER TABLE "Expriment" ADD CONSTRAINT "Expriment_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sra" ADD CONSTRAINT "Sra_exprimentId_fkey" FOREIGN KEY ("exprimentId") REFERENCES "Expriment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneSra" ADD CONSTRAINT "GeneSra_geneId_fkey" FOREIGN KEY ("geneId") REFERENCES "Gene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneSra" ADD CONSTRAINT "GeneSra_sraId_fkey" FOREIGN KEY ("sraId") REFERENCES "Sra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
