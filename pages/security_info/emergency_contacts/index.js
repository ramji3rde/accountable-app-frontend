import React from "react";
import SubHeader from "../../../components/public-com/header";
import BottomNavigation from "../../../components/public-com/bottom_navigation";
import ToggleContainerButton from "../../../components/public-com/toggleButton";
import DefultScreen from "../../../components/public-com/DefultScreen";
import EmergencyNoteSort from "../../../components/security_info/emergency_contacts/sort";
import ListItem from "../../../components/security_info/emergency_contacts/list";
import AddNew from "../../../components/tenants/add_user_button";

function EmergencyContacts() {
  const item = "no";

  const toggleTabsData = [
    {
      name: "Emergency Contacts",
      link: "/security_info/emergency_contacts",
    },
    {
      name: "Passwords / Secure Notes",
      link: "/security_info/secure_notes",
    },
  ];

  return (
    <div>
      <SubHeader title={"Security Info"} />
      <ToggleContainerButton Tabs={toggleTabsData} />

      {item === "yes" ? (
        <>
          <EmergencyNoteSort />

          <ListItem />

          <AddNew href={"/security_info/emergency_contacts/form"} />
        </>
      ) : (
        <DefultScreen
          Title={`Add important contacts like security personnel, 
                    fire or police departments, emergency medical services, etc.`}
          ButtonTitle={"Add Contact Info"}
        />
      )}

      <BottomNavigation />
    </div>
  );
}

export default EmergencyContacts;
