import React from "react";
import SubHeader from "../../../components/public-com/header";
// import SignUp from "../../../components/transactions/SignUp";
import BottomNavigation from "../../../components/public-com/bottom_navigation";
import TransactionDetails from "./TransactionDetails";


const Index = () => {
  return (
    <div>
      <SubHeader title={"Transactions"} backUrl={"/dashboard"} />
      <div>
        <TransactionDetails />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Index;
