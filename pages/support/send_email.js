import { useEffect } from 'react'
import SendEmailButton from '../../components/public-com/send_email_componnents'
import { useDispatch, useSelector } from 'react-redux'
import { getIncidents } from '../../redux/action/incidents';
import SubHeader from '../../components/public-com/header'
import { getSupportTeam } from '../../redux/action/supportFiter';



function SendEmail() {

    const dispatch = useDispatch();

    const item = useSelector((state) => state.support.support.data)
    // console.log(item, 'support')



    useEffect(() => {

        let data = {
            posts_per_page: "-1",
            paged: "1",
            sort_by_field: "a-z",
            search_by_keyword: ""
        }
        dispatch(getSupportTeam(data))

    }, [dispatch])


    return (
        <div>
            <SubHeader
                title={'Share via Email'}
                GoBack={true}
            />
            <div className='p-4 '>
                <SendEmailButton list={item} />
            </div>

        </div>
    )
}

export default SendEmail