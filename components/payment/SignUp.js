import React, { useState } from 'react'
import { createConnectAccountOnStripeApi } from '../../redux/APIS/API';
import toast from 'react-hot-toast';
import { IoAdd } from 'react-icons/io5';
import { reactLocalStorage } from "reactjs-localstorage";


const SignUp = ({ label, subLabel, ButtonIcon, ButtonText, Class }) => {

  const [loading, setLoading] = useState(false)

  const connectAccountOnStripe = async () => {
    try {
      setLoading(true)
      const OnBoardDetailsdata = [];
      const OnBoardDetails = await createConnectAccountOnStripeApi(OnBoardDetailsdata);
      const onboaringUrl = OnBoardDetails?.data?.onboarding_url
      if (onboaringUrl) {
        window.open(onboaringUrl, '_blank', 'noopener,noreferrer');
      }
       else {
        toast.error('on boarding url not found')
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  return (
    <>
      <div className={`flex flex-col justify-center items-center p-2 text-center mt-[100px] ${Class ? Class : null} `}>
        {subLabel && <span className="text-[#A6A6A6]">No transactions</span>}
        <p>
          {label}
        </p>
        <div onClick={() => !loading && connectAccountOnStripe()}
          className={` ${loading ? 'opacity-50 hover:border-[#0000]' : ' cursor-pointer opacity-100'} flex gap-1 h-[45px] w-[180px] items-center text-[#262626] bg-[#F2DA31] border-[#F2DA31]  border-2 py-[12px] mt-2 px-[14px] mx-2  
                        rounded-[6px] shadow-[0_10px_20px_0px_#7e7e7e29] `}
        >
          {ButtonIcon && <IoAdd />}
          <h1>{ButtonText ? ButtonText : 'Sign Up for Account'}</h1>
        </div>
      </div>

    </>
  )
}

export default SignUp