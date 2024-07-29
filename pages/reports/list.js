import React, { useState } from "react";
import ExpensesListItem from "../../components/expenses/list_item";
import ReportsSort from "../../components/reports/form/reportsSort";
import ReportListItem from "../../components/reports/list_Report";
import AddNew from "../../components/tenants/add_user_button";
import BottomNavigation from "../../components/public-com/bottom_navigation";
import SubHeader from "../../components/public-com/header";

function Expenseslist() {
  const [searchOption, setsearctOption] = useState("");

  const setOption = (data) => {
    setsearctOption(data);
  };

  return (
    <>
      <SubHeader title={"Reports"} />

      <ReportsSort setOption={setOption} />
      <ReportListItem searchOption={searchOption} />

      <BottomNavigation />
    </>
  );
}

export default Expenseslist;
