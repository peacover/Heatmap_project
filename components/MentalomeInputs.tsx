import fetchData from "@/utils/fetchData";
import fetchDisease from "@/utils/fetchDisease";
import fetchGeneNames from "@/utils/fetchGeneNames";
// import fetchDisease from "@/utils/fetchDisease";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use, useEffect, useState } from "react";

export interface IFetchedData {
  disease: string[];
  expriment: string[];
  sra: string[];
  status: number;
}

const MentalomeInput = () => {
  const [disease, setDisease] = useState<string[]>([]);
  const [gene, setGene] = useState<string[]>([]);
  const [expriment, setExpriment] = useState<string[]>([]);
  const [sra, setSra] = useState<string[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<string>("");
  const [selectedExpriment, setSelectedExpriment] = useState<string>("");
  const [selectedSra, setSelectedSra] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const handleScroll = (e: any) => {
    if (
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
      !loading
    ) {
      setLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      {/* <div className="wow fadeInUp w-full mx-auto text-center mt-4"
        data-wow-delay=".1s"
        style={{ maxWidth: "570px", marginBottom: "100px" }}>
        <form>
          <label
            htmlFor="large"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Large select
          </label>
          <select
            id="large"
            className="block py-3 w-full px-4 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>
      </div> */}

      <form>
        <div
          style={{ maxHeight: "300px", overflowY: "scroll" }}
          onScroll={handleScroll}
        >
          <select multiple>
            {gene ? (
              gene.map((geneItem) => (
                <option key={geneItem} value={geneItem}>
                  {geneItem}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>
        </div>
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

        <label htmlFor="sra"> SRA: </label>
        <select
          name="sra"
          id="sra"
          onChange={(e) => setSelectedSra(e.target.value)}
          defaultValue="All"
        >
          <option key="all_sra" value="all_sra">
            All
          </option>
          {sra ? (
            sra.map((diseaseItem: string) => (
              <option key={diseaseItem} value={diseaseItem}>
                {diseaseItem}
              </option>
            ))
          ) : (
            <option value="">Loading...</option>
          )}
        </select>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MentalomeInput;
