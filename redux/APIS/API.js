import axios from 'axios'
import AxiosInstance from '../../ApiService'
import { token } from '../../utils'
const baseAPIURL = process.env.NEXT_PUBLIC_API_URL  + '/wp-json/'
const login_url = baseAPIURL + 'jwt-auth/v1/token'

export const postLoginAPI = (data) => {
   return axios.post(login_url, data)
}

export const postRegistationAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/register', data)
}

export const postForgetAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/forget-password', data)
}

export const postNewAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/reset-password', data)
}

// tenants apis

export const getTenantsAPI = () => {
   return AxiosInstance.get(baseAPIURL + 'api/v1/tenants', token())
}

export const getTenantsListAPI = () => {
   return AxiosInstance.get(baseAPIURL + 'api/v1/tenant/get_tenants_count', token())
}


export const getTenantDetailAPI = (id) => {
   return AxiosInstance.get(baseAPIURL + `api/v1/tenant/detail?tenantId=${id}`, token())
}

export const postTenantsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/tenant/create', data, token())
}

export const postTenantsFlagAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/tenant/conpany_flag', data, token())
}

export const deleteTenantsAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant/delete`, id, token())
}
export const deleteTenantsPhotoAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/photos/delete`, data, token())
}

export const postTenantsAddPhotosAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/photos/add`, data, token())
}

export const EditTenantsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/tenant/update', data, token())
}

export const filterTenantsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/tenant/search', data, token())
}

export const createContactsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/contacts/create', data, token())
}

export const updateContactsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/contacts/update', data, token())
}

export const getAllContactsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/contacts', data, token())
}
export const getContractorsListAPI = () => {
   return AxiosInstance.get(baseAPIURL + 'api/v1/contractors/get_contractors_count', token())
}

export const deleteContactsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/contacts/delete', data, token())
}




// contrators apis

export const createPhotoAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/photos/add_user', data, token())
}

export const postContratorsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/contractor/create', data, token())
}

export const getContractorsAPI = () => {
   return AxiosInstance.get(baseAPIURL + 'api/v1/contractors', token())
}

export const filterContractorsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/contractor/search', data, token())
}

export const getContractorsDetailAPI = (id) => {
   return AxiosInstance.get(
      baseAPIURL + `api/v1/contractor/detail?contractorId=${id}`,
      token()
   )
}

export const deleteContractorsAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/contractor/delete`, id, token())
}

export const EditContractorsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/contractor/update', data, token())
}

// flag apis
export const postContractorsFlagAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/contractor/conpany_flag', data, token())
}






// projects apis
export const postProjectsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/project/create', data, token())
}

export const postProjectsPhotosAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/project/add_photo', data, token())
}

export const filterProjectsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + 'api/v1/projects', data, token())
}

export const postProjectDetailsAPI = (id) => {
   return AxiosInstance.post(
      baseAPIURL + `api/v1/project/get_single_project`,
      id,
      token()
   )
}

export const deleteProjectAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/project/delete`, id, token())
}

export const deleteProjectPhotoAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/project/delete_photo`, data, token())
}

export const EditProjectAPI = (data) => {
   return AxiosInstance.post(
      baseAPIURL + `api/v1/project/update_project`,
      data,
      token()
   )
}

export const createBidProjectAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/bid/create`, data, token())
}

export const acceptDeclineBidAPI = (data) => {
   return AxiosInstance.post(
      baseAPIURL + `api/v1/bid/admin_accept_decline`,
      data,
      token()
   )
}

export const assignContractorAPI = (data) => {
   return AxiosInstance.post(
      baseAPIURL + `api/v1/project/assign_contractor`,
      data,
      token()
   )
}

// remove assign contractors APIS
export const removeAssignContractorAPI = (data) => {
   return AxiosInstance.post(
      baseAPIURL + `api/v1/project/remove_contractor`,
      data,
      token()
   )
}

export const assignTenantsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/project/assign_tenant`, data, token())
}

// remove assign tenants APIS
export const removeAssignTenantsAPI = (data) => {
   return AxiosInstance.post(
      baseAPIURL + `api/v1/project/remove_tenant`,
      data,
      token()
   )
}

//notes
export const createNoteAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/note/create`, data, token())
}

export const deleteNoteAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/note/delete`, data, token())
}

export const updateNoteAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/note/update`, data, token())
}

// schedule
export const filterScheduleAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule_group/all`, data, token())
}

export const createScheduleAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule_group/create`, data, token())
}

export const updateScheduleAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule_group/update`, data, token())
}

export const deleteScheduleAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule_group/delete`, data, token())
}


export const rearrangeSchedulesGroupAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule_group/reorders`, id, token())
}


export const calendarAPI = (data) => {

   return AxiosInstance.post(baseAPIURL + `api/v1/schedule/calendar`, data, token())
}



// for task
export const createScheduleTaskAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule/create`, data, token())
}

export const updateScheduleTaskAPI = (data) => {
   
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule/update`, data, token())
}

export const deleteScheduleTaskAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule/delete`, data, token())
}

export const getAllScheduleTaskAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule/all`, id, token())
}

export const rearrangeSchedulesAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule/reorders`, id, token())
}

export const deleteScheduleGroupAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/schedule_group/delete`, id, token())
}

// support APIs
export const getAllSupportTeamAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/support_team/all`, data, token())
}

export const createSupportTeamAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/support_team/create`, data, token())
}

export const getSingleSupportTeamAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/support_team/get_one`, id, token())
}

export const deleteSupportTeamAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/support_team/delete`, id, token())
}

export const updateSupportTeamAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/support_team/update`, data, token())
}

// notes

export const createNotesSupportTeamAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/user_note/create`, data, token())
}

export const deleteNotesSupportTeamAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/user_note/delete`, data, token())
}

export const updateNotesSupportTeamAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/user_note/update`, data, token())
}

// profile apis 

export const getProfile = () => {
   return AxiosInstance.get(baseAPIURL + `api/v1/get-profile`, token())
}

export const changePasswordAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/change-password`, data, token())
}

export const updateEditProfileAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/update-profile`, data, token())
}

export const addDocsAPIS = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/photos/add_docs`, data, token())
}

// incidents apis

// create incidents
export const createIncidentsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/incident/create`, data, token())
}

// update incidents 
export const updateIncidentsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/incident/update`, data, token())
}

// get single incident
export const getSingleIncidentsAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/incident/get_one`, id, token())
}

// get all incidents 
export const getAllIncidentsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/incident/all`, data, token())
}

// delete incidents 
export const deleteIncidentsAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/incident/delete`, id, token())
}

// add tenants Apis 
export const addIncidentsTenantsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/incident/add_tenant`, data, token())
}

// add Contractors 
export const addIncidentsContractorsAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/incident/add_contractor`, data, token())
}


// Expenses Api
// create expenses 
export const createExpensesAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/expense/create`, data, token())
}

// get expenses 
export const getAllExpensesAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/expense/all`, id, token())
}

// get single expenses
export const getSingleExpensesAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/expense/get_one`, id, token())
}

// delete expenses 
export const deleteExpenseAPI = (id) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/expense/delete`, id, token())
}

// update expenses
export const updateExpenseAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/expense/update`, data, token())
}

// create category expenses
export const createCategory = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/expense_category/create`, data, token())
}

// get category expenses
export const getAllCategory = () => {
   return AxiosInstance.post(baseAPIURL + `api/v1/expense_category/all`, {}, token())
}

// proparty map apis 

// create api
export const createPropartyAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/project_map/create`, data, token())
}

// update api
export const updateProparty = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/project_map/update`, data, token())
}

// get All maps listing
export const AllProparty = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/project_map`, data, token())
}

// delete maps listing
export const deleteProparty = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/project_map/delete`, data, token())
}


// Login Tenants 
export const tenantLoginAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant/create_password`, data)
}

// Admin Login access for Tenants 
export const AdmintenantAccessLoginAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant/login_access`, data, token())
}


// Admin project request list 
export const AdminProjectRequestListAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/all_tenant_projects`, data, token())
}

// Admin project request update 
export const updateAdminProjectRequestAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/admin_tenant_project/update`, data, token())
}



// Admin Create Manager 
export const AdminCreateManager = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/create-sub-user`, data, token())
}


// Admin Create Manager 
export const AdminLoginAcceess = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/enable-disable-login-access`, data, token())
}

// Admin Create Manager 
export const AdminGetAllManager = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/get-sub-users`, data, token())
}


// manager varification 
export const UserJoinVarifyAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/join-user`, data)
}


// Tenants get incident all list 
export const TenantsGetAlllist = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_projects`, data, token())
}

// Tenants create projectrequest
export const createProjectRequest = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_project/create`, data, token())
}

// Tenants update projectrequest
export const updateProjectRequest = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_project/update`, data, token())
}


// Get Details projectrequest
export const getDetailsProjectRequest = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_project/get_single_project`, data, token())
}


// // delete projectrequest
export const deleteProjectRequest = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_project/delete`, data, token())
}


// Tenants get Message all list 
export const getMessageslist = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_message/all`, data, token())
}

// Tenants create Message
export const createMessage = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_message/create`, data, token())
}

// Tenants update Message
export const updateMessage = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_message/update`, data, token())
}

// Get Details Message
export const getDetailsMessage = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_message/get_one`, data, token())
}

// delete Message
export const deleteMessage = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_message/delete`, data, token())
}

// reply Message
export const replyMessage = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_message/admin_set_reply`, data, token())
}


// reply Message
export const replyMessageProject = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/project/admin_set_pro_comment`, data, token())
}

//delete Resend Mail on Manager
export const resendMailManager = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/user/resend-login`, data, token())
}

//send mail on details sending
export const sendMail = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/send-detail/via-email`, data, token())
}

//send sendFiles  on details sending
export const sendFiles = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/photos/share_file`, data, token())
}


//get sendFiles  on details sending
export const getSendFiles = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant/get_shared_files`, data, token())
}

//get sendFiles  on details sending
export const adminGetAllMessage = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_message/admin_get_all_message`, data, token())
}


//get sendFiles  on details sending
export const adminSetReply = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/tenant_message/admin_set_reply`, data, token())
}



//emergency_contacts apis 

// create master password apis 
export const craeteEmergencyContactAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/emergency_contacts/create`, data, token())
}

// create master password apis 
export const updateEmergencyContactAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/emergency_contacts/update`, data, token())
}

// Get All List or Filter apis 
export const getAllEmergencyContactAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/emergency_contacts/all`, data, token())
}

// Get Single apis 
export const getSingleEmergencyContactAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/emergency_contacts/get-one`, data, token())
}

// Get Single apis 
export const deleteEmergencyContactAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/emergency_contacts/delete`, data, token())
}

//emergency_contacts apis 

//secure_notes apis 

// create master password apis 
export const craeteMasterPasswordAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/security/create_master_password`, data, token())
}

// login apis 
export const loginMasterAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/security/login`, data, token())
}

// noteValidationAPI apis 
export const noteValidationAPI = () => {
   return AxiosInstance.get(baseAPIURL + `api/v1/security/password_hint`, token())
}

// createSecureNotesAPI apis 
export const createSecureNotesAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/security/create_note`, data, token())
}

// updateSecureNotesAPI apis 
export const updateSecureNotesAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/security/update_note`, data, token())
}



// getALLSecureNotesAPI apis 
export const getALLSecureNotesAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/security/get_notes`, data, token())
}

// getALLSecureNotesAPI apis 
export const getSingleSecureNotesAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/security/get-one`, data, token())
}


// getALLSecureNotesAPI apis 
export const deleteSingleSecureNotesAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/security/delete_notes`, data, token())
}

//notification api
export const sendNotificationAPI = (query_data, data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/push_notification/send?${query_data}`, data, token())
}

export const sendFcmTokenAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/push_notification/get_device_token`, data, token())
}

//list of flagged tenants
export const getFlaggedTenantListAPI = () => {
   return AxiosInstance.get(baseAPIURL + `api/v1/tenant/get_flaged_tenants_count`, token())
}

//list of flagged contractors
export const getFlaggedContractorsListAPI = () => {
   return AxiosInstance.get(baseAPIURL + `api/v1/contractors/flagged`, token())
}

//incident api
export const getIncidentListAPI = () => {
   return AxiosInstance.get(baseAPIURL + `api/v1/incident/incident_count`, token())
}

//expense api
export const getExpenseListAPI = () => {
   return AxiosInstance.get(baseAPIURL + `api/v1/expense/expense_count`, token())
}

//projects api
export const getProjectsListAPI = () => {
   return AxiosInstance.get(baseAPIURL + `api/v1/projects/project_counts`, token())
}

//support team api
export const getSupportTeamListAPI = () => {
   return AxiosInstance.get(baseAPIURL + `api/v1/support_team/support_team_count`, token())
}

// test api
export const testPushNotificationAPI = (data) => {
   return axios.post('https://notification.getaccountableapp.com/send-notification', data, token())
}


//bulk email
export const bulkEMailAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/send-bulk-email`, data, token())

}

//feedback api
export const feedbackEMailAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/send-email`, data, token())
}


//payments api
export const getAllConnectAccountAPI = (data) => {
   return AxiosInstance.get(baseAPIURL + `api/v1/payments/retrieve_all_connect_accounts`, token())
}

export const getCustomerTransactionsAPI = (data) => {
   return AxiosInstance.get(baseAPIURL + `api/v1/payments/get_customer_transection_from_stripe`,data, token())
}

export const checkStripeUserAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/check_user_on_stripe`, data, token())
}

export const createCustomerOnStripeAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/create_customer_on_stripe`, data, token())
}

export const createConnectAccountAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/create_connect_account_on_stripe`, data, token())
}

export const createOneTimePaymentAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/create_payment_for_onetime`, data, token())
}

export const createConnectAccountOnStripeApi = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/create_connect_account_on_stripe`, data ,token())
}

// Old API
// export const checkOnBoardingStatusAPI = (data) => {
//    return AxiosInstance.post(baseAPIURL + `api/v1/payments/check_onboarding_status`, data ,token())
// }

export const checkOnBoardingStatusAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/create_connect_account_on_stripe`, data ,token())
}

export const createPaymentAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/request_payment`, data, token())
}

export const getSinglePaymentAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/request_payment`, data, token())
}

export const getAllTransactionAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/search_transections`, data, token())
}


export const getTenantsTransactionAPI = (data) => {
   return AxiosInstance.post(baseAPIURL + `api/v1/payments/get_tenants_transections`, data, token())
}