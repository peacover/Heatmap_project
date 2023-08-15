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
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.7);
  const [chartHeight, setChartHeight] = useState(500);

  const handleResize = () => {
    setChartWidth(window.innerWidth * 0.7);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const geneNames = geneValues?.map((item) => item.geneName);
  const sraNames = geneValues?.map((item) => item.sraName);

  const spec: any = {
    // $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: chartWidth,
    height: chartHeight,
    padding: 5,
    title: {
      text: "Mentalome Heatmap",
      // anchor: "middle",
      fontSize: 30,
      // frame: "group",
      // offset: 4,
    },
    data: {
      values: geneValues,
    },
    // mark: "rect",
    mark: "bar",
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
        // scale: { scheme: "redyellowblue" },
        scale: {
          range: [
            "#63C1DF",
            "#5F6FC2",
            "#975FC2",
            "#C3475D",
            "#FF0000",
          ],
        },
      },
    },
    actions: false,
  };

  return (
    <div
      id="chart-container"
      className="flex justify-center pt-[20px] pb-16 md:pb-[200px] max-w-xl mx-auto "
    >
      <VegaLite spec={spec} />
    </div>
  );
};

export default MentalomeChart;
