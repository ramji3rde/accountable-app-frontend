import React, { useEffect, useState } from "react";
import SubHeader from "../../../components/public-com/header";
import BottomNavigation from "../../../components/public-com/bottom_navigation";
import TransactionsList from "../../../components/transactions/list";
import { reactLocalStorage } from "reactjs-localstorage";
import SignUp from "../../../components/payment/SignUp";
import { checkOnBoardingStatusAPI } from "../../../redux/APIS/API";
import Sort from "../../../components/transactions/sort";
import { useSelector, useDispatch } from "react-redux";
import { getallTransaction } from "../../../redux/action/getAllTransaction";

const Index = () => {

  const [isStripeUser, setIsStripeUser] = useState(false);

 
  const dispatch = useDispatch();

  const hasRecord = useSelector((state) => state?.getallTransaction?.transaction?.any_record_created);

  
  const onboard_user_status = reactLocalStorage.get("onboard_user_status");

  const checkUserStatus = async () => {
    const req = []
    const respon = await checkOnBoardingStatusAPI(req);
    reactLocalStorage.set("onboard_user_status", respon.data.response);
    respon.data.response == true && setIsStripeUser(true);
  }

  const hasRecordStatus = async () => {

    let req = {
      posts_per_page: "100",
      paged: "-1",
      sort_by_field: "a-z",
      search_by_keyword: ""
    }
    dispatch(getallTransaction(req))
  }


  useEffect(() => {

    if (['false'].includes(onboard_user_status)) {
      setIsStripeUser(false)
      checkUserStatus()
    } else {
      setIsStripeUser(true)
    }

    if (!hasRecord) {
      hasRecordStatus()
    }

  }, [onboard_user_status, dispatch])



  return (
    <>
      <SubHeader title={"Transactions"} backUrl={"/dashboard"} />
      {isStripeUser ?
        <>
            <>
              {hasRecord && <Sort /> }

              <TransactionsList hasRecord={hasRecord} />
            </>
        </>
        :
        <SignUp 
            subLabel={true}
            label={'Sign up for a merchant account to get started collecting payments from your tenants'} 
         />
      }
      <BottomNavigation />
    </>
  );
};

export default Index;
