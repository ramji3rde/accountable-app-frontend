import React, { useEffect, useState } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage';
import SignUp from '../../../components/payment/SignUp';
import { checkOnBoardingStatusAPI } from '../../../redux/APIS/API';
import SubHeader from '../../../components/public-com/header';
import BottomNavigation from "../../../components/public-com/bottom_navigation";
import RecordPayment from './record-payment';

function Index() {
  const [isStripeUser, setIsStripeUser] = useState(false);
  const onboard_user_status = reactLocalStorage.get('onboard_user_status');

  const checkUserStatus = async () => {

    const respon = checkOnBoardingStatusAPI([]);

    const success = respon?.date?.response

    if (success) {
      reactLocalStorage.set('onboard_user_status', success)
      setIsStripeUser(true);
    } else {
      setIsStripeUser(false)
    }


  }

  useEffect(() => {

    if (onboard_user_status.includes('false')) {
      checkUserStatus();
    } else {
      setIsStripeUser(true)
    }



  }, [onboard_user_status])





  return (
    <div>
      <SubHeader title={"Record a Payment"} backUrl={"/payment/transactions"} />
      {isStripeUser ?
        <RecordPayment /> :
        <SignUp
          label={'Sign up to start accepting payments from your tenants'}
          ButtonIcon={true}
          ButtonText={'Create Account'}
        />
        }

      {!isStripeUser && <BottomNavigation />}



    </div>
  )
}

export default Index