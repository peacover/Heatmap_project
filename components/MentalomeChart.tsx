"use client";

import React, { useEffect, useState } from "react";
import { VegaLite } from "react-vega";

interface ChartData {
  geneName: string;
  sraName: string;
  value: number;
  description: string;
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

  const descriptionSet = new Set(geneValues.map((item) => item.description));
  const description_filter = Array.from(descriptionSet);
  const spec: any = {
    width: chartWidth,
    height: chartHeight,
    data: {
      values: geneValues,
    },
    padding: 5,
    title: {
      text: "Mentalome Heatmap",
      fontSize: 30,
    },
    encoding: {
      x: {
        field: "sraName",
        type: "nominal",
        title: "SRA",
        sort: "description",
      },
      y: {
        field: "geneName",
        type: "nominal",
        title: "Gene_ID",
      },
    },
    layer: [
      {
        mark: "rect",
        encoding: {
          color: {
            field: "value",
            type: "quantitative",
            title: "Values",
            scale: {
              range: ["#63C1DF", "#5F6FC2", "#975FC2", "#C3475D", "#FF0000"],
            },
          },
        },
      },
      {
        transform: [
          { filter: { field: "description", oneOf: description_filter } },
        ],
        mark: "circle",
        encoding: {
          color: {
            field: "description",
            title: "Abbreviation",
            scale: {
              range: ["#349c00", "#000"],
            },
          },
        },
      },
    ],
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
