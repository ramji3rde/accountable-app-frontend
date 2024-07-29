import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import List from '../../components/schedule/list';
import Sort from '../../components/schedule/sort';
import AddNew from '../../components/tenants/add_user_button';
import BottomNavigation from '../../components/public-com/bottom_navigation';
import SubHeader from '../../components/public-com/header'
import DefultScreen from "../../components/public-com/DefultScreen";
import { getSchedule } from '../../redux/action/scheduleFilter';
import { reactLocalStorage } from "reactjs-localstorage";



const ScheduleLIst = () => {


    const dispatch = useDispatch();


    const item = useSelector((state) => state?.filterSchedule?.schedule?.any_record_created)

    console.log(item, 'getSchedule')


    useEffect(() => {

        let data = {
            posts_per_page: "-1",
            paged: "1",
            sort_by_field: "",
            search_by_keyword: ""
        }
        dispatch(getSchedule(data))

    }, [dispatch])

    const Manager = reactLocalStorage.get('user_role')



    return (
        <div>
            <SubHeader title={'Schedule'} />


            {item === 'yes' ? <><Sort />  <List />

                {Manager === 'app_manager' ? null :
                    <AddNew href={'/schedule/form'} />}  </> :
                <DefultScreen Title={'Create to-do lists for your property'} ButtonTitle={'Create Task'} ButtonUrl={'/schedule/form'} />
            }


            <BottomNavigation />
        </div>
    )
}

export default ScheduleLIst;