import React, { Fragment } from 'react'
import SubHeader from '../../components/public-com/header'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useRef, useEffect, useState } from 'react'
import AddNew from '../../components/tenants/add_user_button'
import BottomNavigation from '../../components/public-com/bottom_navigation'
import { calendarAPI } from '../../redux/APIS/API'
import { useRouter } from 'next/router'
import { IoListOutline } from "react-icons/io5";
import { format } from 'date-fns'
import { reactLocalStorage } from "reactjs-localstorage";


const Calendar = () => {
   const calendarRef = useRef()
   const datee = new Date()

   const [events, setEvents] = useState()
   const [data, setData] = useState([])

   const [rows, setRows] = useState(1)

   console.log(events, 'events data')
   const [complateSche, setComplateSche] = useState('0')

   const router = useRouter();

   const Manager = reactLocalStorage.get('user_role')



   useEffect(() => {
      if (events) {

         // const filterData = events.filter((item) => {

         //    const created = format( new Date(item?.created_date)  ,"dd-MM-yyyy")
         //    const startd = format(new Date(item?.start)  ,"dd-MM-yyyy")

         //    return  created > startd;

         //  });
          

         //  console.log(filterData, 'sadsd287564');

         const NewData = events.map(function (item) {

            // obj create data converting to dd-mm-yyyy
            var date = new Date(item.created_date);
            const formattedDate = new Intl.DateTimeFormat('en-GB').format(date).replace(/\//g, '-');
            // console.log(formattedDate);
            // end this

            // if (formattedDate >= startDate && formattedDate <= endDate) {

            const newArry = item.start.split(' ')
            const complate = item.schedule_complete
            setComplateSche(complate)

            return {
               title: item.title,
               date: newArry[0],
               className: item.schedule_complete === 1 ? 'isComplated' : 'isNotComplated',
            }

            //  } 

         })

       


         setData(NewData)
      }
   }, [events])

   const [showBy, setShowBy] = useState('dayGridMonth')

   const [date, setDate] = useState(datee.getMonth())

   const [startDate, setStartDate] = useState()
   const [endDate, setEndDate] = useState()

   //create state for current month
   //put dates in state after event
   //create useffect and loop over dates from array to check if current month matches from the month of dates, if not matches then break loop
   //

   async function getDates() {
      try {
         const response = await calendarAPI({
            start_date: startDate,
            end_date: endDate,
            current_date: format(
               new Date(),
               'dd-MM-yyyy'
            )
         })
         console.log(response.data, 'dd-MM-yyyy')
         setEvents(response.data.calendars)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getDates()
   }, [startDate, endDate])


   return (
      <div>
         <SubHeader title={'Schedule'} backUrl={'/schedule/list'} />

         <div className="my-[22px]">
            <div className='w-full flex items-center gap-2 justify-end mb-[22px] pr-3' onClick={() => router.push('/schedule/list')}>
               <IoListOutline className='h-[20px] w-[20px]' />
               <h1 className=" font-normal text-[#262626] cursor-pointer text-center text-[16px] ">Grid View</h1>
            </div>


            <FullCalendar
               className="text-xs leading-3"
               ref={calendarRef}
               headerToolbar={{
                  start: 'prev next title',
                  end: 'dayGridMonth dayGridWeek dayGridDay'
               }}
               plugins={[dayGridPlugin]}
               views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
               dayCellDidMount={(arg) => {
                  if (arg.view.type === "dayGridDay") {
                     setRows(100)
                  } else {
                     setRows(1)
                  }

               }}
               datesSet={(arg) => {
                  setStartDate(arg.startStr.slice(0, 10))
                  // console.log(arg.startStr.slice(0, 10), 'startStr')
                  setEndDate(arg.endStr.slice(0, 10))
                  // console.log(arg.endStr.slice(0, 10), 'endStr')
               }}
               events={data}
               dayMaxEvents={rows}
               moreLinkContent={'see more...'}
               eventBackgroundColor={'#0000'}
               eventColor={'#0000'}
            />
         </div>
         {Manager == 'app_manager' ? null :
            <AddNew href={'/schedule/form'} bottom={'bottom-20'} />}

         <BottomNavigation />
      </div>
   )
}

export default Calendar
