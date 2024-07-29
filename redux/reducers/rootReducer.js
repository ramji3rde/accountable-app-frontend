import { combineReducers } from "redux";
import { tenantsReducer } from "./TenantsReducer";
import { UserActiveReducer } from "./UserActiveReducer";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tenantsDetailsReducer } from "./TenantsDetailReducer";
import { contractorsReducer } from "./ContractorsReducer";
import { contractorsDetailReducer } from "./ContractorsDetailReducer";
import { projectsReducer } from "./ProjectsReducer";
import { ProjectDetailsReducer } from "./ProjectDetailsReducer";
import { scheduleReducer } from "./ScheduleReducer";
import { singleScheduleReducer } from "./singleScheduleReducer";
import { getAllTaskReducer } from "./getAllTaskReducer";
import { supportTeamReducer } from "./SupportReducer";
import { singleSupportReducer } from "./singleSupportReducer";
import { getProfileReducer } from "./getProfileReducer";
import { getAssignContractorsReducers } from "./assignContractorsReducers";
import { incidentsReducer } from "./incidentsReducer";
import { assignTenantsReducers } from "./assignTenantsReducers";
import { incidentsDetailsReducer } from "./incidentsDetailsReducer";
import { expenseReducer } from "./expenseReducer";
import { expenseDetailsReducer } from "./expensesDetailsReducer";
import { projectsRequestReducer } from "./ProjectsRequestReducer";
import { getManagerListReducer } from "./ManagerListReducer";
import { getTenantsUserListReducer } from "./TenantsUserListReducer";
import { getTenantsUserDetailsReducer } from "./TenantsUserDetaisReducer";
import { getTenantsMessageListReducer } from "./TenantsMessagesListReducer";
import { getTenantsMessageDetailsReducer } from "./TenantsMessagesDetaisReducer";
import { getAdminMessageListReducer } from "./AdminMessagesListReducer";
import { emergencyContactsReducer } from "./emergencyContactsReducer";
import { emergencyContactsDetailsReducer } from "./emergencyContactsDetailsReducer";
import { getAllSecureNotesReducer } from "./secureNotesReducer";
import { secureNotesDetailsReducer } from "./secureNotesDetailsReducer";
import { getallTransactionReducer } from "./getAllTransactionReducer";
import { getCurrentTransactionReducer } from "./getCurrentTransactionReducer";

const persistConfig = {
  key: 'persist-store',
  storage
}



export const rootReducer = combineReducers({


  tenants: tenantsReducer,
  userActive: persistReducer(persistConfig, UserActiveReducer),
  tenantsDetails: tenantsDetailsReducer,
  contractors: contractorsReducer,
  contractorsDetail: contractorsDetailReducer,
  projects: projectsReducer,
  projectDetails: ProjectDetailsReducer,
  filterSchedule: scheduleReducer,
  singleSchedule: singleScheduleReducer,
  getAllTask: getAllTaskReducer,
  support: supportTeamReducer,
  singleSupport: singleSupportReducer,
  getProfile: getProfileReducer,
  getAssignContractors: getAssignContractorsReducers,
  assignTenants: assignTenantsReducers,
  incidents: incidentsReducer,
  incidentsDetails: incidentsDetailsReducer,
  expenses: expenseReducer,
  expenseDetails: expenseDetailsReducer,
  projectsRequest: projectsRequestReducer,
  managerList: getManagerListReducer,
  tenantsUserList: getTenantsUserListReducer,
  tenantsUserDetails: getTenantsUserDetailsReducer,
  tenantsMessageList: getTenantsMessageListReducer,
  tenantsMessageDetails: getTenantsMessageDetailsReducer,
  adminMessageList: getAdminMessageListReducer,
  emergencyContactsList: emergencyContactsReducer,
  emergencyDetails: emergencyContactsDetailsReducer,
  secureNotesList: getAllSecureNotesReducer,
  secureNotesDetails: secureNotesDetailsReducer,
  getallTransaction : getallTransactionReducer,
  getcurrenttransaction: getCurrentTransactionReducer,
});