import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { SearchBarProps } from "../../types";
import style from "./SearchBar.module.scss";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const currentSearchTerm = useRef(inputValue);

  useEffect(() => {
    currentSearchTerm.current = inputValue;
  }, [inputValue]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Please enter either a suburb or postcode");
      return;
    }
    if (/^\d+$/.test(inputValue) && (inputValue.length < 4 || inputValue.length > 4)) {
      toast.error("Postcodes must be 4 digits!");
      return;
    }
    const searchType = /^\d{4}$/.test(inputValue) ? 'postcode' : 'suburb';
    onSearch(inputValue, searchType);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <div>
        <div className={style.selectSearch}>
          <input
            className={style.input}
            type="text"
            placeholder="Enter Postcode or Suburb here!"
            name="search"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className={style.button} type="submit">
            {/* <img
              className={style.btnIcon}
              src="google.svg"
              alt="google magnifying glass icon"
            /> */}
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
