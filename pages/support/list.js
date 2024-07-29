import { useState, useEffect } from 'react'
import List from '../../components/support/list'
import Sort from '../../components/support/sort'
import AddNew from '../../components/tenants/add_user_button'
import BottomNavigation from '../../components/public-com/bottom_navigation'
import SubHeader from '../../components/public-com/header'
import { useSelector, useDispatch } from "react-redux";
import DefultScreen from '../../components/public-com/DefultScreen'
import { getSupportTeam } from '../../redux/action/supportFiter'
import { reactLocalStorage } from "reactjs-localstorage";


function LIST() {

    const item = useSelector((state) => state.support.support.any_record_created)

    console.log(item, 'support')



    const dispatch = useDispatch();

    useEffect(() => {

        let data = {
            posts_per_page: "-1",
            paged: "1",
            sort_by_field: "a-z",
            search_by_keyword: ""
        }
        dispatch(getSupportTeam(data))

    }, [dispatch])


    const Manager = reactLocalStorage.get('user_role')



    return (
        <div className='App'>
            <SubHeader title={'Support Team'} />

            {item === 'yes' ? <><Sort />    <List />
                {Manager === 'app_manager' ? null :
                    <AddNew href={'/support/form'} />} </> :
                <DefultScreen
                    Title={'Add any emergency and important contacts to your support team'}
                    ButtonTitle={'Add Support Person'}
                    ButtonUrl={'/support/form'} />
            }

            <BottomNavigation />


        </div >
    )
}

export default LIST