import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./SearchPage.module.scss";
import { useSearch } from "../../context/SearchContext";
import Flexbox from "../../containers/Flexbox/Flexbox";
import { useEffect } from "react";
import SuburbPostcodeGrid from "../../components/SuburbPostcodeGrid/SuburbPostcodeGrid";

const SearchPage = () => {
  const { searchSuccess, handleSearch, resetSearch } = useSearch();

  useEffect(() => {
    resetSearch();
  }, []);

  return (
    <Flexbox flexdirection="column">
    <div className={style.search}>
      <SearchBar onSearch={handleSearch} />
      {searchSuccess ? (
        <>
        <SuburbPostcodeGrid />
        <img src="point.png" alt="man" className={style.man} />
        </>
      ) : (
        <div className={style.intro}>
          <img src="explore.jpg" alt="explore" className={style.explore} />
          <p className={style.introText}>
            Enter a suburb or postcode to start searching.
          </p>
        </div>
      )}
    </div>
    </Flexbox>
  );
};

export default SearchPage;
