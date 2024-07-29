import React, { useEffect, useState } from "react";
import SignUp from "../../payment/SignUp";
import { reactLocalStorage } from "reactjs-localstorage";
import { checkOnBoardingStatusAPI } from "../../../redux/APIS/API";
import PaymentCard from "../../public-com/payment/payment-card";
import Sort from "../../transactions/sort";
import TransactionsList from "../../transactions/list";
import { getallTransaction } from "../../../redux/action/getAllTransaction";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const TenantsFinancials = ({ tenants_detail }) => {

  const [isStripeUser, setIsStripeUser] = useState(false);

  

  const dispatch = useDispatch()

  const onboard_user_status = reactLocalStorage.get('onboard_user_status');
  
  const tenantId = tenants_detail?.tenant_user_id
  
  const hasRecord = useSelector((state) => state?.getallTransaction?.transaction?.any_record_created);

  const transactionlist = useSelector((state) => state.getallTransaction.transaction.data);


  // check user boarding status by api using stripe by function
  const checkUserStatus = async () => {
    const respon = await checkOnBoardingStatusAPI([]);
    reactLocalStorage.set('onboard_user_status', respon?.data?.response);
    respon?.data?.response == true && setIsStripeUser(true)
  }

  const hasRecordStatus = async () => {

    let req = {
      posts_per_page: "100",
      paged: "-1",
      date_filter: "date_asc",
      search_by_keyword: "",
      tenant_user_id: tenantId,
      type_filter:  ""
  
    }
    dispatch(getallTransaction(req))
  }

  useEffect(() => {

    if (onboard_user_status.includes('false')) {
      checkUserStatus();
      setIsStripeUser(false);
    } else {
      setIsStripeUser(true);
    }

    if(!hasRecord){
      hasRecordStatus()
    }

  }, [onboard_user_status, dispatch])




  const paymentCardData = [
    // {
    //   id: 524,
    //   type: "Recurring",
    //   current_balance: 5000,
    //   due_balance: 250,
    //   period: 'weekly',
    //   start_date: "12/10/2024",
    //   end_date: "12/10/2024",
    //   create_date: '',
    //   due_date: ""
    // },
    // {
    //   id: 525,
    //   type: "One-Time",
    //   current_balance: 257,
    //   due_balance: 250,
    //   period: 'monthly',
    //   start_date: "",
    //   end_date: "",
    //   create_date: '12/10/2024',
    //   due_date: "31/10/2023"
    // },
    {
      id: 527,
      type: "One-Time",
      current_balance: "",
      due_balance: "",
      period: '',
      start_date: "",
      end_date: "",
      create_date: '',
      due_date: ''
    }
  ];


  


  return (
    <>
      {isStripeUser ? (
        <div>
          {/* {hasData ? ( */}
          <div>

            {hasRecord &&  paymentCardData.length > 0 && paymentCardData.map((item, index) =>
              <PaymentCard index={index} key={index} item={item} />
            )}

            {hasRecord && <h1 className="px-4">Transactions</h1>}

            {hasRecord && !transactionlist?.length == 0 && <Sort tenant_id={tenantId} />}

            <TransactionsList hasRecord={hasRecord} tenant_id={tenantId} />

          </div>
        </div>
      ) : (
        <>
          <SignUp
            label={'Sign up to start accepting payments from your tenants'}
            ButtonText={"Create Account"}
            ButtonIcon={true}
            Class={"!mt-[25%]"}
          />
        </>
      )}
    </>
  );
};

export default TenantsFinancials;
