"use client";

import React, { useEffect, useState } from "react";
import { VegaLite } from "react-vega";

const MentalomeChart = () => {
  const [chartWidth, setChartWidth] = useState<number>(1000);
  const [chartHeight, setChartHeight] = useState<number>(500);


  // const updateDimensions = () => {
  //   const container = document.getElementById("chart-container");
  //   if (container) {
  //     const containerWidth = container.offsetWidth;
  //     setChartWidth(containerWidth);
  //     setChartHeight(containerWidth * 0.5);
  //     console.log("containerWidth", containerWidth);
  //     console.log("chartWidth", chartWidth);
  //     console.log("chartHeight", chartHeight);
  //   }
  // };
  // useEffect(() => {
  //   updateDimensions();
  //   window.addEventListener("resize", updateDimensions);
  //   return () => {
  //     window.removeEventListener("resize", updateDimensions);
  //   };
  // }, []);
  const gene_ids = [
    "ENS0001",
    "ENS0002",
    "ENS0003",
    "ENS0004",
    "ENS0005",
    "ENS0006",
  ];
  const sra = ["sra1", "sra2", "sra3", "sra4", "sra5", "sra6"];
  const values = [
    [2, 3, 5, 7, 11, 13], // ENS0001 values
    [4, 6, 8, 10, 12, 14], // ENS0002 values
    [1, 3, 5, 7, 9, 11], // ENS0003 values
    [5, 7, 9, 11, 13, 15], // ENS0004 values
    [3, 6, 9, 12, 15, 18], // ENS0005 values
    [1, 2, 4, 5, 6, 7], // ENS0006 values
  ];

  // Prepare the data array
  const data: any[] = [];
  gene_ids.forEach((gene_id, geneIndex) => {
    sra.forEach((sraItem, sraIndex) => {
      data.push({
        gene_id,
        sra: sraItem,
        value: values[geneIndex][sraIndex],
      });
    });
  });

  const spec = {
    // $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: chartWidth,
    height: chartHeight,
    padding: 5,
    title: {
      text: "Mentalome Heatmap",
      anchor: "middle",
      fontSize: 16,
      frame: "group",
      offset: 4,
    },
    data: {
      values: data,
    },
    mark: "rect",
    encoding: {
      x: {
        field: "sra",
        type: "nominal",
        title: "SRA",
        scale: { domain: sra },
      },
      y: {
        field: "gene_id",
        type: "nominal",
        title: "Gene_ID",
        scale: { domain: gene_ids },
      },
      color: {
        field: "value",
        type: "quantitative",
        title: "Values",
        scale: { scheme: "redyellowblue" },
      },
    },
  };

  return (
    <div
      id="chart-container"
      className="flex justify-center pt-[160px] pb-16 md:pb-[100px] lg:pt-[190px] lg:pb-[140px] max-w-xl mx-auto"
    >
      <VegaLite spec={spec} width={chartWidth} height={chartHeight} />
    </div>
  );
};

export default MentalomeChart;
