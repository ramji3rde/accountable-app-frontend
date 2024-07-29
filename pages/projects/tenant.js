import { useRouter } from 'next/router'
import React from 'react'
import AlignTenant from '../../components/projects/alignTenant'
import NavigationButton from '../../components/tenants/details/navigation_button'
import SubHeader from '../../components/public-com/header'

export default function Tenants() {


    const router = useRouter()

    function data() {
        router.back()
    }


    return (
        <AlignTenant />
    )
}
