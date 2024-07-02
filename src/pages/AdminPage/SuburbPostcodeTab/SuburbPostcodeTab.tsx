import { useState } from "react";
import { suburbPostcodeService } from "../../../services/suburbPostcodeService";
import { toast } from "react-toastify";
import style from "./SuburbPostcodeTab.module.scss";
import { useSearch } from "../../../context/SearchContext";
import {
  validateSuburbs,
  validatePostcodes,
  isValidSuburb,
  isValidPostcode,
} from "../../../utils/validationUtils";
import SuburbPostcodeGrid from "../../../components/SuburbPostcodeGrid/SuburbPostcodeGrid";
import Flexbox from "../../../containers/Flexbox/Flexbox";

const SuburbPostcodeTab = () => {
  const [addSuburb, setAddSuburb] = useState("");
  const [addPostcode, setAddPostcode] = useState("");
  const [deleteInput, setDeleteInput] = useState("");
  const [checkInput, setCheckInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editSuburb, setEditSuburb] = useState("");
  const [editPostcodes, setEditPostcodes] = useState("");
  const [originalSuburb, setOriginalSuburb] = useState("");
  const [originalPostcodes, setOriginalPostcodes] = useState("");

  const {
    handleSearch,
    updateResults,
    resetSearch,
    results,
    searchTerm,
    searchType,
  } = useSearch();

  const handleAdd = async () => {
    const suburbs = addSuburb.split(",").map((s) => s.trim());
    const postcodes = addPostcode.split(",").map((p) => p.trim());

    if (
      suburbs.length === 0 ||
      postcodes.length === 0 ||
      (suburbs.length === 1 && suburbs[0] === "") ||
      (postcodes.length === 1 && postcodes[0] === "")
    ) {
      toast.error("Both suburbs and postcodes require at least one value");
      return;
    }

    if (suburbs.length > 1 && postcodes.length > 1) {
      toast.error("You cannot add several suburbs with several postcodes");
      return;
    }

    if (!validateSuburbs(suburbs)) {
      toast.error("Suburbs must contain only letters and spaces");
      return;
    }

    if (!validatePostcodes(postcodes)) {
      toast.error("Postcodes must be 4 digits");
      return;
    }

    resetSearch();

    await suburbPostcodeService.addSuburbPostcode({
      suburb: suburbs,
      postcode: postcodes,
    });

    if (suburbs.length === 1) {
      // Single suburb, multiple postcodes
      updateResults({
        suburb: suburbs[0],
        postcodes: postcodes,
      });
    } else {
      // Multiple suburbs, single postcode
      suburbs.forEach((suburb) => {
        updateResults({
          suburb: suburb,
          postcodes: [postcodes[0]],
        });
      });
    }

    setAddSuburb("");
    setAddPostcode("");
  };

  const handleDelete = async () => {
    const trimmedInput = deleteInput.trim();

    if (!trimmedInput) {
      toast.error("Please enter a suburb or postcode to delete");
      return;
    }

    let deleted = false;
    if (isValidSuburb(trimmedInput)) {
      await suburbPostcodeService.deleteSuburbPostcode("suburb", trimmedInput);
      toast.success(`${trimmedInput} deleted successfully!`);
      deleted = true;
    } else if (isValidPostcode(trimmedInput)) {
      await suburbPostcodeService.deleteSuburbPostcode(
        "postcode",
        trimmedInput
      );
      deleted = true;
    } else {
      toast.error(
        "Please enter a valid suburb (letters and spaces only) or postcode (4 digits)"
      );
    }

    if (deleted) {
      if (
        results.length === 0 ||
        (results.length === 1 &&
          (results[0].suburb === trimmedInput ||
            results[0].postcodes.includes(trimmedInput)))
      ) {
        resetSearch();
      } else {
        handleSearch(searchTerm, searchType);
      }
      setDeleteInput("");
    }
  };

  const handleCheck = async () => {
    const trimmedInput = checkInput.trim();

    if (!trimmedInput) {
      toast.error("Please enter a suburb or postcode to check");
      return;
    }

    let response;
    let type;
    if (isValidSuburb(trimmedInput)) {
      response = await suburbPostcodeService.fetchResults(
        trimmedInput,
        "suburb"
      );
      type = "suburb";
    } else if (isValidPostcode(trimmedInput)) {
      response = await suburbPostcodeService.fetchResults(
        trimmedInput,
        "postcode"
      );
      type = "postcode";
    } else {
      toast.error(
        "Please enter a valid suburb (letters and spaces only) or postcode (4 digits)"
      );
      return;
    }

    if (response) {
      toast.success(`The ${type}: ${trimmedInput} was found in the database!`);
      setOriginalSuburb(response.suburb.join(", "));
      setOriginalPostcodes(response.postcode.join(", "));
      setEditSuburb(response.suburb.join(", "));
      setEditPostcodes(response.postcode.join(", "));
      setIsEditing(true);
    } else {
      toast.error(`Something broke real bad if you're seeing this message.`);
    }
  };

  const handleSave = async () => {
    const suburbs = editSuburb.split(",").map((s) => s.trim());
    const postcodes = editPostcodes.split(",").map((p) => p.trim());

    if (!validateSuburbs(suburbs)) {
      toast.error("Suburbs must contain only letters and spaces");
      return;
    }

    if (!validatePostcodes(postcodes)) {
      toast.error("Postcodes must be 4 digits");
      return;
    }

    let updatedValue: string | undefined;
    if (isValidSuburb(checkInput)) {
      updatedValue = suburbs[0];
      await suburbPostcodeService.updateSuburbPostcode("suburb", checkInput, {
        suburb: suburbs,
        postcode: postcodes,
      });
    } else if (isValidPostcode(checkInput)) {
      updatedValue = postcodes[0];
      await suburbPostcodeService.updateSuburbPostcode("postcode", checkInput, {
        suburb: suburbs,
        postcode: postcodes,
      });
    }

    setIsEditing(false);

    if (updatedValue) {
      handleSearch(
        updatedValue,
        isValidSuburb(updatedValue) ? "suburb" : "postcode"
      );
    }
  };

  return (
    <>
      <h2 className={style.title}>Suburb and Postcode Management:</h2>
      <div className={style.container}>
        <div className={style.addDeleteUpdate}>
          <h3>Add Suburbs & Postcodes: </h3>
          <div className={style.addForm}>
            <input
              type="text"
              placeholder="e.g. Suburb1, Suburb2"
              value={addSuburb}
              onChange={(e) => setAddSuburb(e.target.value)}
              className={style.input}
            />
            <input
              type="text"
              placeholder="e.g. 1234, 5678"
              value={addPostcode}
              onChange={(e) => setAddPostcode(e.target.value)}
              className={style.input}
            />
            <div className={style.addButtons}>
              <button onClick={handleAdd} className={style.button}>
                Add
              </button>
              <button
                onClick={() => {
                  setAddSuburb("");
                  setAddPostcode("");
                }}
                className={style.button}
              >
                Clear
              </button>
            </div>
          </div>
          <h3>Delete Suburb or Postcode: </h3>
          <div className={style.deleteForm}>
            <input
              type="text"
              placeholder="e.g. Sydney or 2000"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className={style.input}
            />
            <div className={style.deleteButtons}>
              <button onClick={handleDelete} className={style.button}>
                Delete
              </button>
              <button
                onClick={() => setDeleteInput("")}
                className={style.button}
              >
                Clear
              </button>
            </div>
          </div>

          <div className={style.update}>
            <h3>Update Suburbs & Postcodes:</h3>
            <div className={style.updateForm}>
              <input
                type="text"
                placeholder="e.g. Sydney or 2000"
                value={checkInput}
                onChange={(e) => setCheckInput(e.target.value)}
                className={style.input}
              />
              <div className={style.checkButtons}>
                <button onClick={handleCheck} className={style.button}>
                  Find
                </button>
                <button
                  onClick={() => setCheckInput("")}
                  className={style.button}
                >
                  Clear
                </button>
              </div>
            </div>
            {isEditing && (
              <div className={style.editSection}>
                <div className={style.inputs}>
                  <input
                    type="text"
                    value={editSuburb}
                    onChange={(e) => setEditSuburb(e.target.value)}
                    className={style.input}
                  />
                  <input
                    type="text"
                    value={editPostcodes}
                    onChange={(e) => setEditPostcodes(e.target.value)}
                    className={style.input}
                  />
                </div>
                <div className={style.buttons}>
                  <button onClick={handleSave} className={style.button}>
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={style.button}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setEditSuburb("");
                      setEditPostcodes("");
                    }}
                    className={style.button}
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => {
                      setEditSuburb(originalSuburb);
                      setEditPostcodes(originalPostcodes);
                    }}
                    className={style.button}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Flexbox>
          <SuburbPostcodeGrid isAdmin />
        </Flexbox>
      </div>
    </>
  );
};

export default SuburbPostcodeTab;
