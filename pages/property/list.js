import React from 'react'
import DefultScreenMap from '../../components/property/defultScreenMap'
import PropertylistMap from '../../components/property/list_map'
import DefultScreen from '../../components/public-com/DefultScreen'
import BottomNavigation from '../../components/public-com/bottom_navigation'
import SubHeader from '../../components/public-com/header'

export default function PropertyList() {
   return (

      <>
         <SubHeader
            title={'Property Map'}
         />
         <PropertylistMap />

         <BottomNavigation />
      </>

   )
}
