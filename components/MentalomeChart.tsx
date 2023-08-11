// import React, { useEffect } from "react";
// import { VegaLite } from "react-vega";

// const MentalomeChart = () => {
//     const values = [2, 3, 5, 7, 11, 13];
//     const gene_ids = ["ENS0001", "ENS0002", "ENS0003", "ENS0004", "ENS0005", "ENS0006"];
//     const sra = ["sra1", "sra2", "sra3", "sra4", "sra5", "sra6"];
//   useEffect(() => {
//     google.charts.load("upcoming", { packages: ["vegachart"] }).then(drawChart);

//     function drawChart() {
//       // A DataTable is required, but it can be empty.
//       google.charts.setOnLoadCallback(() => {
//         const dataTable = new google.visualization.DataTable();

//         const options = {
//           vega: {
//             // $schema: "https://vega.github.io/schema/vega/v5.json",
//             width: 1000,
//             height: 500,
//             padding: 5,

//             title: {
//               text: "Mentalome Heatmap",
//               anchor: "middle",
//               fontSize: 16,
//               frame: "group",
//               offset: 4,
//             },

//             data: [
//               {
//                 // name: "temperature",
//                 // url: "https://vega.github.io/vega/data/seattle-weather-hourly-normals.csv",
//                 // format: {
//                 //   type: "csv",
//                 //   parse: { temperature: "number", date: "date" },
//                 // },
//                 // transform: [
//                 //   {
//                 //     type: "formula",
//                 //     as: "hour",
//                 //     expr: "hours(datum.date)",
//                 //   },
//                 //   {
//                 //     type: "formula",
//                 //     as: "day",
//                 //     expr: "datetime(year(datum.date), month(datum.date), date(datum.date))",
//                 //   },
//                 // ],
//               },
//             ],

//             scales: [
//               {
//                 name: "x",
//                 type: "band",
//                 // type: "time",
//                 // domain: { data: "temperature", field: "day" },
//                 domain: sra,
//                 range: "width",
//               },
//               {
//                 name: "y",
//                 type: "band",
//                 // domain: [
//                 //   6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//                 //   22, 23, 0, 1, 2, 3, 4, 5,
//                 // ],
//                 domain : gene_ids,
//                 range: "height",
//               },
//               {
//                 name: "color",
//                 type: "linear",
//                 range: { scheme: "redyellowblue" },
//                 // domain: { data: "temperature", field: "temperature" },
//                 domain: values,
//                 reverse: true,
//                 zero: false,
//                 nice: true,
//               },
//             ],

//             axes: [
//               {
//                 orient: "bottom",
//                 scale: "x",
//                 domain: false,
//                 title: "SRA",
//                 // format: "%b",
//               },
//               {
//                 orient: "left",
//                 scale: "y",
//                 domain: false,
//                 title: "Gene ID",
//                 // encode: {
//                 //   labels: {
//                 //     update: {
//                 //       text: {
//                 //         signal:
//                 //           "datum.value === 0 ? 'Midnight' : datum.value === 12 ? 'Noon' : datum.value < 12 ? datum.value + ':00 am' : (datum.value - 12) + ':00 pm'",
//                 //       },
//                 //     },
//                 //   },
//                 // },
//               },
//             ],

//             legends: [
//               {
//                 fill: "color",
//                 type: "gradient",
//                 title: "Values",
//                 titleFontSize: 12,
//                 titlePadding: 4,
//                 gradientLength: { signal: "height - 16" },
//               },
//             ],

//             marks: [
//               {
//                 type: "rect",
//                 // from: { data: "temperature" },
//                 encode: {
//                   enter: {
//                     x: { scale: "x", field: "sra" },
//                     y: { scale: "y", field: "gene_id" },
//                     width: { scale: "x", band: 1 },
//                     height: { scale: "y", band: 1 },

//                     // tooltip: {
//                     //   signal:
//                     //     "timeFormat(datum.date, '%b %d %I:00 %p') + ': ' + datum.temperature + '°'",
//                     // },
//                   },
//                 //   update: {
//                 //     fill: { scale: "color", field: "temperature" },
//                 //   },
//                 },
//               },
//             ],
//           },
//         };
//         const chart = new google.visualization.VegaChart(document.getElementById('chart-div'));
//         chart.draw(dataTable, options);
//       });
//     }
//   });
//   // drawChart();

//   return (
//     <div id="chart-div" style={{ width: "500px", height: "500px" }}>
//     </div>
//   );
// };

// export default MentalomeChart;

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
