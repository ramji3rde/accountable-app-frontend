import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BottomNavigation from '../../../components/public-com/bottom_navigation'
import DefultScreen from '../../../components/public-com/DefultScreen'
import SubHeader from '../../../components/public-com/header'
import List from '../../../components/tenant/message/list'
import Sort from '../../../components/tenant/message/sort'
import AddNew from '../../../components/tenants/add_user_button'
import { getTenantMessageList } from '../../../redux/action/tenantsMessageList'

function RequestTenants() {
    
    const dispatch = useDispatch();

    useEffect(() => {

        let data = {
            posts_per_page: "-1",
            paged: "1",
            sort_by_field: "a-z",
            search_by_keyword: ""
        }
        dispatch(getTenantMessageList(data))

    }, [dispatch])

    const item = useSelector((state) => state.tenantsMessageList.tenantsMessageList?.any_record_created)

    // console.log(item, 'item')



    return (
        <>
            <SubHeader title={'Messages'} backUrl={'/tenant'} />

            {item === 'yes' ?
                <>
                    <Sort />
                    <List />
                    <AddNew href={"/tenant/message/form"} />
                </>
                :
                <DefultScreen
                    Title={'Send a message to your property manager with your questions, comments or concerns'}
                    ButtonTitle={'Add Request'}
                    ButtonUrl={'/tenant/message/form'}
                />
            }


            <BottomNavigation />
        </>
    )
}

export default RequestTenants