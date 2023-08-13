import fetchData from "@/utils/fetchData";
import fetchDisease from "@/utils/fetchDisease";
import fetchGeneNames from "@/utils/fetchGeneNames";
import Select from "react-select";
import { useEffect, useState } from "react";
import fetchValues from "@/utils/fetchValues";
import MentalomeChart from "./MentalomeChart";
import fetchSearchGene from "@/utils/fetchSearchGene";

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
  const [selectedGene, setSelectedGene] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [geneSearchOptions, setSearchGeneOptions] = useState<GeneOption[]>([]);

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
    });
  }, [currentPage]);

  useEffect(() => {
    if (selectedDisease && selectedExpriment) {
      fetchData({
        disease: selectedDisease,
        expriment: selectedExpriment,
      }).then((data) => {
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

  const handleScrollToBottom = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleGetValues = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result_val;
    if (selectedSra.includes("all_sra"))
      result_val = await fetchValues(sra, selectedGene);
    else result_val = await fetchValues(selectedSra, selectedGene);
    setChartData(result_val);
  };
  const handleGeneSearch = async (inputValue: string) => {
    const result = await fetchSearchGene(inputValue);
    const geneSearchOptions = result.map((geneItem: any) => ({
      value: geneItem,
      label: geneItem,
    }));
    setSearchGeneOptions(geneSearchOptions);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <form onSubmit={handleGetValues}>
          <Select
            isMulti
            options={
              geneSearchOptions.length > 0
                ? geneSearchOptions
                : gene.map((geneItem) => ({
                    value: geneItem,
                    label: geneItem,
                  }))
            }
            onInputChange={(inputValue) => {
              handleGeneSearch(inputValue);
            }}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map(
                (option) => option.value
              );
              setSelectedGene(selectedValues);
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
          <Select
            isMulti
            defaultValue={{ value: "all_sra", label: "All" }}
            options={[
              { value: "all_sra", label: "All" },
              ...sra.map((geneItem) => ({
                value: geneItem,
                label: geneItem,
              })),
            ]}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map(
                (option) => option.value
              );
              setSelectedSra(selectedValues);
            }}
            className="basic-multi-select"
            classNamePrefix="select"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      {chartData && <MentalomeChart geneValues={chartData} />}
    </>
  );
};

export default MentalomeInput;
