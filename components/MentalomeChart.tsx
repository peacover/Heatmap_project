"use client";

import React, { useEffect, useState } from "react";
import { VegaLite } from "react-vega";

interface ChartData {
  geneName: string;
  sraName: string;
  value: number;
}
interface MentalomeChartProps {
  geneValues: ChartData[];
}

const MentalomeChart: React.FC<MentalomeChartProps> = ({ geneValues }) => {
  if (!geneValues) {
    return null;
  }

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

  const geneNames = geneValues?.map((item) => item.geneName);
  const sraNames = geneValues?.map((item) => item.sraName);

  const spec : any = {
    // $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: chartWidth,
    height: chartHeight,
    padding: 5,
    title: {
      text: "Mentalome Heatmap",
      anchor: "middle",
      fontSize: 30,
      frame: "group",
      offset: 4,
    },
    data: {
      values: geneValues,
    },
    mark: "rect",
    encoding: {
      x: {
        field: "sraName",
        type: "nominal",
        title: "SRA",
        scale: { domain: sraNames },
      },
      y: {
        field: "geneName",
        type: "nominal",
        title: "Gene_ID",
        scale: { domain: geneNames },
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
      className="flex justify-center pt-[20px] pb-16 md:pb-[100px] max-w-xl mx-auto"
    >
      <VegaLite spec={spec} width={chartWidth} height={chartHeight} />
    </div>
  );
};

export default MentalomeChart;