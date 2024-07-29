import { useState, useEffect } from "react";
import ContractorsSort from "../../components/contractors/contractors_sort";
import ConListItem from "../../components/contractors/list";
import AddNew from "../../components/tenants/add_user_button";
import BottomNavigation from "../../components/public-com/bottom_navigation";
import SubHeader from "../../components/public-com/header";
import DefultScreen from '../../components/public-com/DefultScreen';
import { useSelector, useDispatch } from 'react-redux'
import { getContractorsFilter } from "../../redux/action/contractors";
import { reactLocalStorage } from "reactjs-localstorage";

function ContractorsList() {

    const contractors = useSelector(
        (state) => state.contractors.contractors.data
    );
    const dispatch = useDispatch()

    useEffect(() => {

        let data = {
            posts_per_page: "-1",
            paged: "1",
            sort_by_field: "",
            search_by_keyword: ""
        }

        dispatch(getContractorsFilter(data))

    }, [dispatch])

    const Manager = reactLocalStorage.get('user_role')
    return (
        <div>
            <SubHeader title={"Contractors"} />
            {contractors?.length > 0 && <ContractorsSort />}
            <ConListItem />

            {contractors?.length > 0 && <> {Manager === 'app_manager' ? null : <AddNew href={"/contractors/form"} />} </>}

            <BottomNavigation />
        </div >
    )

}

export default ContractorsList;