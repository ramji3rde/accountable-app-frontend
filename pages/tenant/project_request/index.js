import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BottomNavigation from '../../../components/public-com/bottom_navigation'
import DefultScreen from '../../../components/public-com/DefultScreen'
import SubHeader from '../../../components/public-com/header'
import List from '../../../components/tenant/project_request/list'
import Sort from '../../../components/tenant/project_request/sort'
import AddNew from '../../../components/tenants/add_user_button'
import { getTenantsUserList } from '../../../redux/action/tenantsuserList'

function RequestTenants() {
    
    const dispatch = useDispatch();

    useEffect(() => {

        let data = {
            posts_per_page: "-1",
            paged: "1",
            sort_by_field: "a-z",
            search_by_keyword: ""
        }
        dispatch(getTenantsUserList(data))

    }, [dispatch])

    const item = useSelector((state) => state.tenantsUserList.tenantsUserList?.any_record_created)

    console.log(item, 'item')



    return (
        <>
            <SubHeader title={'Project Requests'} />


            {item === 'yes' ?
                <>
                    <Sort />
                    <List />
                    <AddNew href={"/tenant/project_request/form"} />
                </>
                :
                <DefultScreen
                    Title={'Create a new service project request'}
                    ButtonTitle={'Add Request'}
                    ButtonUrl={'/tenant/project_request/form'}
                />
            }


            <BottomNavigation />
        </>
    )
}

export default RequestTenants