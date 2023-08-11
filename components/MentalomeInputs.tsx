import fetchData from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface IFetchedData {
  disease: string[];
  expriment: string[];
  sra: string[];
  status: number;
}

const MentalomeInput = () => {
  // const [gene_ids, setGene_ids] = useState<string[]>();

  // const [disease, setDisease] = useState<string | null>(null);
  // const [expriment, setExpriment] = useState<string>("");
  // const [sra, setSra] = useState<string>();
  // const [firstLoad, setFirstLoad] = useState<boolean>(true);

  // const queryDisease = useQuery(
  //   ["diseaseData", disease],
  //   // fetchData.bind(null, { disease, expriment })
  //   fetchData({ disease, expriment });
  // );

  // const fetchedData: IFetchedData | undefined = query_result.data;

  // useEffect(() => {
  //   if (
  //     fetchedData &&
  //     fetchedData.disease &&
  //     fetchedData.disease.length > 0 &&
  //     disease === null
  //   ) {
  //     setDisease(fetchedData.disease[0]);
  //   }
  // }, [fetchedData]);

  // useEffect(() => {
  //   if (firstLoad) {
  //     setFirstLoad(false);
  //     // set default values of gene_ids
  //     setDisease(fetchedData.disease);
  //   }
  // }, [fetchedData]);

  // if (query_result.isLoading) return <div>Loading...</div>;
  // if (query_result.isError) return <div>Error fetching data</div>;

  // console.log("Fetched data:", fetchedData);

  // console.log(fetchedData);
  const [disease, setDisease] = useState<string | null>(null);
  const [expriment, setExpriment] = useState<string>("");
  const [sra, setSra] = useState<string>("");

  const { data: fetchedData, isLoading, isError } = useQuery(
    ["diseaseData", disease],
    () => fetchData({ disease: disease ?? "", expriment: expriment ?? "" })
  );

  useEffect(() => {
    if (fetchedData?.disease && fetchedData.disease.length > 0 && disease === null) {
      setDisease(fetchedData.disease[0]);
    }
  }, [fetchedData, disease]);

  // ...

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

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
        {/* <label htmlFor="gene_ids"> Gene IDS: </label>
        <select name="" id="gene_ids" multiple></select>

        <label htmlFor="disease"> Disease: </label>
        <select
          name="disease"
          id="disease"
          onChange={(e) => setDisease(e.target.value)}
        >
          {fetchedData?.disease.map((diseaseItem : string) => (
            <option key={diseaseItem} value={diseaseItem}>
              {diseaseItem}
            </option>
          ))}
        </select>

        <label htmlFor="expriment"> Expriment: </label>
        <select
          name="expriment"
          id="expriment"
          onChange={(e) => setExpriment(e.target.value)}
          defaultValue="All"
        >
          <option key="all_expriment" value="all_expriment">
            All
          </option>
          {fetchedData?.expriment.map((exprimentItem : string) => (
            <option key={exprimentItem} value={exprimentItem}>
              {exprimentItem}
            </option>
          ))}
        </select>
        <label htmlFor="sra"> SRA: </label>
        <select
          name="sra"
          id="sra"
          onChange={(e) => setSra(e.target.value)}
          defaultValue="All"
        >
          <option key="all_sra" value="all_sra">
            All
          </option>
          {fetchedData?.sra.map((sraItem : string) => (
            <option key={sraItem} value={sraItem}>
              {sraItem}
            </option>
          ))}
        </select> */}
        <label htmlFor="disease"> Disease: </label>
        <select
          name="disease"
          id="disease"
          onChange={(e) => setDisease(e.target.value)}
        >
          {fetchedData?.disease ? (
            fetchedData.disease.map((diseaseItem: string) => (
              <option key={diseaseItem} value={diseaseItem}>
                {diseaseItem}
              </option>
            ))
          ) : (
            <option value="">Loading...</option>
          )}
        </select>
        <label htmlFor="expriment"> Expriment: </label>
        <select
          name="expriment"
          id="expriment"
          onChange={(e) => setExpriment(e.target.value)}
          defaultValue="All"
        >
          <option key="all_expriment" value="all_expriment">
            All
          </option>
          {fetchedData?.expriment ? (
            fetchedData.expriment.map((exprimentItem: string) => (
              <option key={exprimentItem} value={exprimentItem}>
                {exprimentItem}
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
          onChange={(e) => setSra(e.target.value)}
          defaultValue="All"
        >
          <option key="all_sra" value="all_sra">
            All
          </option>
          {fetchedData?.sra ? (
            fetchedData.sra.map((sraItem: string) => (
              <option key={sraItem} value={sraItem}>
                {sraItem}
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
