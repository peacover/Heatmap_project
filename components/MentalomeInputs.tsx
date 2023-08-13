import fetchData from "@/utils/fetchData";
import fetchDisease from "@/utils/fetchDisease";
import fetchGeneNames from "@/utils/fetchGeneNames";
import Select from "react-select";
import { useEffect, useState } from "react";
import fetchValues from "@/utils/fetchValues";
import MentalomeChart from "./MentalomeChart";

export interface IFetchedData {
  disease: string[];
  expriment: string[];
  sra: string[];
  status: number;
}
interface GeneOption {
  value: string;
  label: string;
}
interface ChartData {
  sraName: string;
  geneName: string;
  value: number;
}


const MentalomeInput = () => {
  const [disease, setDisease] = useState<string[]>([]);
  const [gene, setGene] = useState<string[]>([]);
  const [expriment, setExpriment] = useState<string[]>([]);
  const [sra, setSra] = useState<string[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<string>("");
  const [selectedExpriment, setSelectedExpriment] = useState<string>("");
  const [selectedSra, setSelectedSra] = useState<string[]>(["all_sra"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [defaultGeneValues, setDefaultGeneValues] = useState<GeneOption[]>([]);
  const [selectedGene, setSelectedGene] = useState<string[]>([]);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);

  useEffect(() => {
    if (disease.length === 0) {
      fetchDisease().then((data: string[]) => {
        setDisease(data);
        setSelectedDisease(data[0]);
      });
    }
  }, [disease]);

  useEffect(() => {
    fetchGeneNames(currentPage).then((newGene) => {
      setGene((prevGene) => [...prevGene, ...newGene]);
      console.log("newGene", gene, currentPage, newGene);
      setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    if (selectedDisease && selectedExpriment) {
      fetchData({
        disease: selectedDisease,
        expriment: selectedExpriment,
      }).then((data) => {
        if (data && data.expriment && data.expriment.length > 0) {
          setExpriment(() => [...data.expriment]);
        }
        if (data && data.sra && data.sra.length > 0) {
          setSra(() => [...data.sra]);
        }
      });
    } else if (selectedDisease) {
      fetchData({ disease: selectedDisease, expriment: "" }).then((data) => {
        if (data && data.expriment && data.expriment.length > 0) {
          setExpriment(() => [...data.expriment]);
        }
        if (data && data.sra && data.sra.length > 0) {
          setSra(() => [...data.sra]);
        }
      });
    }
  }, [selectedDisease, selectedExpriment]);
  useEffect(() => {
    if (gene.length > 0) {
      const newDefaultGeneValues = gene
        .slice(0, 5)
        .map((geneItem) => ({ value: geneItem, label: geneItem }));
      console.log("newDefaultGeneValues", newDefaultGeneValues, gene);
      setDefaultGeneValues(newDefaultGeneValues);
    }
  }, [gene]);

  const handleScrollToBottom = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleGetValues = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result_val;
    if (selectedSra.includes("all_sra"))
      result_val = await fetchValues(sra, selectedGene);
    else
     result_val = await fetchValues(selectedSra, selectedGene);
    setChartData(result_val);
    console.log("result_val", result_val);
  };
  // const [geneOptions, setGeneOptions] = useState<GeneOption[]>([]);
  
  // useEffect(() => {
  //   if (gene.length > 0) {
  //     const newGeneOptions = gene.map((geneItem) => ({
  //       value: geneItem,
  //       label: geneItem,
  //     }));
  //     setGeneOptions(newGeneOptions);
  //   }
  // }, [gene]);

  // const handleGeneSearch = (inputValue: string) => {
  //   const filteredGeneOptions = geneOptions.filter((geneItem) =>
  //     geneItem.value.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  //   return filteredGeneOptions;
  // };

  // const customFilterOption = (
  //   option: GeneOption,
  //   inputValue: string
  // ) => {
  //   return handleGeneSearch(inputValue).some(
  //     (geneItem) => geneItem.value === option.value
  //   );
  // };

  return (
    <>
      <div className="flex justify-center items-center">
        <form onSubmit={handleGetValues}>
          <Select
            // defaultValue={gene.map((geneItem) => ({
            //   value: geneItem,
            //   label: geneItem,
            // })).slice(0, 5)}
            isMulti
            options={gene.map((geneItem) => ({
              value: geneItem,
              label: geneItem,
            }))}
            // filterOption={customFilterOption}
            // onInputChange={(inputValue) => {
            //   setGeneOptions(handleGeneSearch(inputValue));
            // }}
            onChange={(selectedOptions) => {
              // `selectedOptions` contains an array of selected option objects
              const selectedValues = selectedOptions.map((option) => option.value);
              setSelectedGene(selectedValues);
              console.log("selectedValues", selectedValues);
            }}
            className="basic-multi-select"
            classNamePrefix="select"
            onMenuScrollToBottom={handleScrollToBottom}
          />
          <label htmlFor="disease"> Disease: </label>
          <select
            name="disease"
            id="disease"
            onChange={(e) => {
              setSelectedDisease(e.target.value);
            }}
          >
            {disease ? (
              disease.map((diseaseItem: string) => (
                <option key={diseaseItem} value={diseaseItem}>
                  {diseaseItem}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>
          <label htmlFor="expriment"> Experiment: </label>
          <select
            name="expriment"
            id="expriment"
            onChange={(e) => setSelectedExpriment(e.target.value)}
            defaultValue="All"
          >
            <option key="all_expriment" value="all_expriment">
              All
            </option>
            {expriment ? (
              expriment.map((diseaseItem: string) => (
                <option key={diseaseItem} value={diseaseItem}>
                  {diseaseItem}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>

          {/* <label htmlFor="sra"> SRA: </label>
          <select
            name="sra"
            id="sra"
            onChange={(e) => setSelectedSra([e.target.value])}
          >
            <option key="all_sra" value="all_sra">
              All
            </option>
            {sra ? (
              sra.map((sraItem: string) => (
                <option key={sraItem} value={sraItem}>
                  {sraItem}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select> */}
          <Select
            isMulti
            defaultValue={[
              { value: "all_sra", label: "All" },
              ...sra.map((geneItem) => ({
                value: geneItem,
                label: geneItem,
              })),
            ]}
            options={[
              { value: "all_sra", label: "All" },
              ...sra.map((geneItem) => ({
                value: geneItem,
                label: geneItem,
              })),
            ]}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map((option) => option.value);
              setSelectedSra(selectedValues);
              console.log("heeere selectedValues", selectedValues);
            }}
            className="basic-multi-select"
            classNamePrefix="select"
            // onMenuScrollToBottom={handleScrollToBottom}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      {chartData && <MentalomeChart test={chartData} />}
    </>
  );
};

export default MentalomeInput;
