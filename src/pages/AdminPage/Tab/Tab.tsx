import React from 'react';
import style from "./Tab.module.scss";
import { TabProps } from "../../../types/tab/TabProps";

const Tab: React.FC<TabProps> = ({ onClick, children }) => {
  return (
    <div className={style.tab} onClick={onClick}>
      {children}
    </div>
  );
};

export default Tab;
