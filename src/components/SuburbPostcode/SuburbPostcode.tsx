import MapComponent from "../MapComponent/MapComponent";
import { SuburbPostcodeResult } from "../../types";
import style from "./SuburbPostcode.module.scss";

interface SuburbPostcodeProps {
  result: SuburbPostcodeResult;
}

const SuburbPostcode: React.FC<SuburbPostcodeProps> = ({
  result,
}) => {

  const formatPostcodes = (postcodes: string[]): string => {
    if (postcodes.length === 1) {
      return postcodes[0];
    }
    return postcodes.slice(0, -1).join(", ") + " & " + postcodes.slice(-1);
  };

  return (
    <div className={style.card}>
      <div className={style.headings}>
          <>
            <h3 className={style.suburb}>{result.suburb}</h3>
            <p className={style.postcode}>
              {formatPostcodes(result.postcodes)}
            </p>
          </>
      </div>
      <MapComponent suburb={result.suburb} />
    </div>
  );
};

export default SuburbPostcode;
