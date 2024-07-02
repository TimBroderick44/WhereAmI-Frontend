import React from "react";
import SuburbPostcode from "../SuburbPostcode/SuburbPostcode";
import style from "./SuburbPostcodeGrid.module.scss";
import { useSearch } from "../../context/SearchContext";
import { SuburbPostcodeGridProps } from "../../types";

const SuburbPostcodeGrid: React.FC<SuburbPostcodeGridProps> = ({
  isAdmin = false,
}) => {
  const { results, searchType, searchSuccess } = useSearch();

  const postcodeCount = results.reduce(
    (count, result) => count + result.postcodes.length,
    0
  );

    const message =
      searchType === "suburb"
        ? `${results.map(
            (result) => result.suburb
          )} has ${postcodeCount} postcode${postcodeCount > 1 ? "s" : ""}:`
        : `${results[0].postcodes} is for these suburbs:`;

  return (
    <>
      {searchSuccess && results.length > 0 && !isAdmin && (
        <h2 className={style.message}>{message}</h2>
      )}
      <div className={style.grid}>
        {results.map((result, index) => (
          <SuburbPostcode key={index} result={result} />
        ))}
      </div>
    </>
  );
};

export default SuburbPostcodeGrid;
