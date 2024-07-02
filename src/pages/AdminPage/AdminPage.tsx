import { useEffect, useState } from "react";
import SuburbPostcodeTab from "./SuburbPostcodeTab/SuburbPostcodeTab";
import Tab from "./Tab/Tab";
import style from "./AdminPage.module.scss";
import Flexbox from "../../containers/Flexbox/Flexbox";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("suburbsPostcodes");
  const { role, userName } = useAuth();
  const { resetSearch } = useSearch();

  useEffect(() => {
    resetSearch();
  }, []);

  return (
    <Flexbox>
      <div className={style.container}>
        <div className={style.profileTabs}>
          <img className={style.profile} src="https://i.pravatar.cc/150" alt="profile" />
          <p> Username: <strong>{userName}</strong></p>
          <p> Role: <strong>{role}</strong></p>
          <div className={style.tabs}>
            <Tab onClick={() => setActiveTab("suburbsPostcodes")}>
              Suburbs & Postcodes
            </Tab>
            <Tab onClick={() => setActiveTab("users")}>User Details</Tab>
          </div>
        </div>
        <div className={style.tabContent}>
          {activeTab === "suburbsPostcodes" && <SuburbPostcodeTab />}
        </div>
      </div>
    </Flexbox>
  );
};

export default AdminPage;
