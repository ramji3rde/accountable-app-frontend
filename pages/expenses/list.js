import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ExpensesSort from '../../components/expenses/form/expensesSort'
import ExpensesListItem from '../../components/expenses/list_item'
import DefultScreen from '../../components/public-com/DefultScreen'
import AddNew from '../../components/tenants/add_user_button'
import BottomNavigation from '../../components/public-com/bottom_navigation'
import SubHeader from '../../components/public-com/header'
import { getExpense } from '../../redux/action/expense'
import { reactLocalStorage } from "reactjs-localstorage";


function Expenseslist() {

   const dispatch = useDispatch()
   const item = useSelector(state => state?.expenses?.expenses?.any_expenses_created)

   useEffect(() => {
      let data = {
         posts_per_page: "-1",
         paged: "1",
         sort_by_field: "a-z",
         search_by_keyword: ""
      }
      dispatch(getExpense(data))
   }, [dispatch])

   const Manager = reactLocalStorage.get('user_role')

   return (
      <>
         <SubHeader
            title={'Expenses'}
         />
         {item === 'yes' ? <>
            <ExpensesSort />
            <ExpensesListItem />
            {Manager === 'app_manager' ? null :
               <AddNew href={"/expenses/form"} />}
         </>
            :
            <DefultScreen Title={'Keep track of all of your expenses like office supplies, equipment, furniture, etc.'} ButtonTitle={'Add Expense'} ButtonUrl={'/expenses/form'} />
         }

         <BottomNavigation />
      </>
   )
}

export default Expenseslist