'use client';

import React, { useEffect, useState } from "react";
import SubHeader from "../../../components/public-com/header";
import BottomNavigation from "../../../components/public-com/bottom_navigation";
import SignUp from "../../../components/payment/SignUp";
import CreatePaymentForm from "../../../components/payment/CreatePaymentForm";
import { reactLocalStorage } from "reactjs-localstorage";
import { checkOnBoardingStatusAPI } from "../../../redux/APIS/API";
// import { useDispatch } from "react-redux";

const Index = () => {
  const [isStripeUser, setIsStripeUser] = useState(false);
  // get on board status for localStorage
  const connect_Id = reactLocalStorage.get("connectId");
  const [connectId, setConnectId] = useState("")

  const checkUserStatus = async () => {
    const req = []
    const response = await checkOnBoardingStatusAPI(req);
    if (response?.data?.success == true) {
       if (response?.data?.connect_id && !response?.data?.onboarding_url ) {
        let connectId = response?.data?.connect_id
        setConnectId(connectId)
        reactLocalStorage.set("connectId", connectId);
      }
      else if (response?.data?.onboarding_url && response?.data?.connect_id) {
        const onboaringUrl = response?.data?.onboarding_url
        window.open(onboaringUrl, '_blank')
      }
    }
  }

  useEffect(() => {
    checkUserStatus();
  }, [])


  return (
    <>
      <SubHeader title={"Create a Payment"} backUrl={"/dashboard"} />
      {connectId ? (
        <CreatePaymentForm />
      ) : (
        <>
          <SignUp
            label={'Sign up for a merchant account to get started collecting payments from your tenants'}
          />
          <BottomNavigation />
        </>
      )}
    </>
  );
};

export default Index;
