import Link from 'next/link'
import { IoMenu } from 'react-icons/io5'
import Head from 'next/head'
import { useEffect } from 'react'
import BottomNavigation from '../../components/public-com/bottom_navigation'
import SubHeader from '../../components/public-com/header'
import { useRouter } from 'next/router'
import { reactLocalStorage } from 'reactjs-localstorage'
import DashboardDetails from '../../components/dashboard/DashboardDetails'
import { getTenantDetail } from "../../redux/action/tenants-detail"
import { useDispatch } from 'react-redux'
import {getProfileData} from '../../redux/action/getProfile'


function Dashboard() {
   const router = useRouter()
  const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getProfileData())
      const tokenVaild = reactLocalStorage.get('token', true)
      if (tokenVaild == true) {
         router.push('/')
      }
   }, [])

   return (
      <div className="Dashboard-page w-full  ">
         <Head>
            <title>Dashboard</title>
         </Head>

         <SubHeader title={"Dashboard"}  />
         
         <DashboardDetails />
         {/* <div className="w-full h-[1100px] bg-[#f4f5f7] "></div> */}

         <BottomNavigation />
      </div>
   )
}

export default Dashboard
