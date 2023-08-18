import fetchData from "@/utils/fetchData";
import fetchDisease from "@/utils/fetchDisease";
import fetchGeneNames from "@/utils/fetchGeneNames";
import Select from "react-select";
import { useEffect, useState } from "react";
import fetchValues from "@/utils/fetchValues";
import MentalomeChart from "./MentalomeChart";
import fetchSearchGene from "@/utils/fetchSearchGene";

interface GeneOption {
  value: string;
  label: string;
}
interface ChartData {
  sraName: string;
  geneName: string;
  value: number;
  description: string;
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

  const [defaultValue, setDefaultValue] = useState<GeneOption[]>([]);

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
      <div className="flex justify-center items-center mb-[150px]">
        <form
          onSubmit={handleGetValues}
          className="bg-body-color-dark p-8 rounded-none sm:rounded-lg shadow-md w-full sm:w-1/2 "
        >
          <label htmlFor="gene" className="block text-gray-700 font-medium">
            Gene IDS:
          </label>
          <Select
            id="gene"
            isMulti
            // defaultValue={defaultValue}
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
            className="basic-multi-select mb-6"
            classNamePrefix="select"
            onMenuScrollToBottom={handleScrollToBottom}
          />
          <div className="flex items-center mb-6 md:flex-row flex-col">
            <div className="w-full mb-6 md:mb-0 md:w-1/2 md:pr-4">
              <label
                htmlFor="disease"
                className="block text-gray-700 font-medium"
              >
                Disease:
              </label>
              <select
                name="disease"
                id="disease"
                onChange={(e) => {
                  setSelectedDisease(e.target.value);
                }}
                className="px-[7px] py-2 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 rounded-sm shadow-sm"
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
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <label
                htmlFor="expriment"
                className="block text-gray-700 font-medium"
              >
                Experiment:
              </label>
              <select
                name="expriment"
                id="expriment"
                onChange={(e) => setSelectedExpriment(e.target.value)}
                defaultValue="All"
                className="px-[7px] py-2 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 rounded-sm shadow-sm"
              >
                <option key="all_expriment" value="all_expriment">
                  All
                </option>
                {expriment ? (
                  expriment.map((exprimentItem: string) => (
                    <option key={exprimentItem} value={exprimentItem}>
                      {exprimentItem}
                    </option>
                  ))
                ) : (
                  <option value="">Loading...</option>
                )}
              </select>
            </div>
          </div>
          <label htmlFor="sra" className="block text-gray-700 font-medium">
            SRA:
          </label>
          <Select
            id="sra"
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
            className="basic-multi-select mb-6"
            classNamePrefix="select"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Submit
          </button>
        </form>
      </div>
      {chartData && <MentalomeChart geneValues={chartData} />}
    </>
  );
};

export default MentalomeInput;
