import React, { useEffect } from "react";
import { useState } from "react";
import { IoMenuOutline, IoChevronBack } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { reactLocalStorage } from "reactjs-localstorage";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from "../../public/smi-logo.png";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { IoCloseCircleSharp } from "react-icons/io5";
import LogOutPopup from "./LogOutPopup";
import { getTenantDetailAPI } from "../../redux/APIS/API";
import { getTenantDetail } from "../../redux/action/tenants-detail";
import { useDispatch, useSelector } from "react-redux";

function SubHeader(props) {
  const [menu, setMenu] = useState(false);
  const [specialPage, setSpecialPage] = useState(false);
  const [userRole, setUserRole] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const close = () => {
    setShowPopup(false);
  };

  async function userLogout() {
    reactLocalStorage.clear();
    router.push("/");
    toast.success("Log Out SuccessFully");
  }

  const router = useRouter();

  const menuitem = () => {
    if (userRole === "tenant") {
      return [
        {
          name: "Home",
          link: "/tenant",
        },

        {
          name: "Project Requests",
          link: "/tenant/project_request",
        },
        {
          name: "Message",
          link: "/tenant/message",
        },
        {
          subMenuTitle: "FINANCIALS",
        },
        {
          name: "Transactions",
          link: "/tenant/transactions",
          shortname: "transactions",
        },
        {
          subMenuTitle: "ACCOUNT",
        },
        {
          name: "Profile",
          link: "/tenant/profile",
          shortName: "profile",
        },
        {
          name: "Log Out",
        },
      ];
    } else {
      return [
        {
          name: "Dashboard",
          link: "/dashboard",
          shortname: "dashboard",
        },
        {
          name: "Tenants",
          link: "/tenants/list",
          shortname: "tenants",
        },
        {
          name: "Contractors",
          link: "/contractors/list",
          shortname: "contractors",
        },
        {
          name: "Projects",
          link: "/projects/list",
          shortname: "projects",
        },
        {
          name: "Schedule",
          link: "/schedule/list",
          shortname: "schedule",
        },
        {
          name: "Support Team",
          link: "/support/list",
          shortname: "support",
        },
        {
          subMenuTitle: "PROPERTY",
        },
        {
          name: "Expenses",
          link: "/expenses/list",
          shortname: "expenses",
        },
        {
          name: "Incidents",
          link: "/incidents/list",
          shortname: "incidents",
          // ComingSoon: "Coming Soon!"
        },
        {
          name: "Property Map",
          link: "/property/list",
          shortname: "property",
          // ComingSoon: "Coming Soon!"
        },
        {
          subMenuTitle: "DATA",
        },
        {
          name: "Reports",
          link: "/reports/list",
          shortname: "reports",
        },
        {
          subMenuTitle: "COLLABORATION",
        },
        {
          name: "Invite Manager",
          link: "/manager/list",
          shortname: "manager",
        },
        {
          name: "Service Requests",
          link: "/request_tenants/list",
          shortname: "request_tenants",
          // ComingSoon: "Coming Soon!"
        },
        {
          subMenuTitle: "SECURITY",
        },
        {
          name: "Security Info",
          link: "/security_info/emergency_contacts",
          shortname: "security_info",
          // ComingSoon: "Coming Soon!"
        },
        {
          subMenuTitle: "FINANCIALS",
        },
        {
          name: "Create a Payment",
          link: "/payment/create",
          shortname: "create_payment",
        },
        {
          name: "Transactions",
          link: "/payment/transactions",
          shortname: "transactions",
        },
        {
          subMenuTitle: "ACCOUNT",
        },
        {
          name: "Profile",
          link: "/profile",
          shortname: "/profile",
        },
        {
          name: `Billing`,
          link: process.env.NEXT_PUBLIC_STRIPE_LOGIN_URL,
          shortname: "billing",
        },
        {
          name: "Feedback",
          link: "/feedback",
          shortname: "feedback",
        },
        {
          name: "Log Out",
        },
      ];
    }
  };

  function openMenu() {
    setMenu(true);
  }

  function closeMenu() {
    setMenu(false);
  }

  function logout(item, popupConditon) {
    if (item === "Log Out") {
      setMenu(true);
      if (!popupConditon) {
        setShowPopup(true);
      }
    }
  }

  useEffect(() => {
    const bidurl = router.pathname;
    if (
      bidurl === "/bid" ||
      bidurl === "/bid/form" ||
      bidurl === "/bid/alreadyCreated"
    ) {
      setSpecialPage(true);
    } else {
      const tokenVaild = reactLocalStorage.get("token", false);
      const xpireDate = reactLocalStorage.get("date", false);
      const user_role = reactLocalStorage.get("user_role");
      if (tokenVaild === false) {
        router.push("/");
        menuitem();
      } else {
        if (user_role === "tenant") {
          if (menuUrl === "tenant") {
            setUserRole(user_role);
          } else {
            router.push("/tenant");
            setUserRole(user_role);
          }
        } else if (!xpireDate || new Date(xpireDate) < new Date()) {
          logout("Log Out", true);
        }
      }
    }
  }, []);

  const menuUrl = router.pathname.split("/")[1];

  function Subtitle() {
    return (
      <div className="logo">
        <div className="grid grid-cols-1 items-center">
          <h1 className="md:text-5xl font-normal not-italic cursor-pointer text-center text-[#FFFFFF] text-[16px]">
            {props.Subtitle}
          </h1>
        </div>
      </div>
    );
  }

  function load_chat_script(){
    window.voiceflow.chat.open();
  }

  return (
    <div className="headerbgcolor z-50">
      <div className="flex justify-between py-2 px-3 ">
        {props?.Maintitle ? (
          <div className="logo">
            <div className="grid grid-cols-1 items-center">
              <div className="smi-logo">
                <Image src={logo} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-[10px]">
            {props.backUrl && (
              <div className="backarrow">
                <div
                  onClick={() => {
                    {
                      props.backUrl ? router.push(props.backUrl) : null;
                    }
                    {
                      props.Url ? props.Url() : null;
                    }
                  }}
                >
                  <IoChevronBack className="text-xl cursor-pointer text-white  " />
                </div>
              </div>
            )}

            {props.GoBack && (
              <div className="backarrow">
                <div
                  onClick={() => {
                    {
                      props.GoBack ? router.back() : null;
                    }
                  }}
                >
                  <IoChevronBack className="text-xl cursor-pointer text-white  " />
                </div>
              </div>
            )}

            {props.backFunction && (
              <div className="backarrow">
                <div
                  onClick={() => {
                    {
                      props.backFunction ? props.backFunction() : null;
                    }
                  }}
                >
                  <IoChevronBack className="text-xl cursor-pointer text-white" />
                </div>
              </div>
            )}
            <div className="logo flex items-center">
              {specialPage && (
                <div className="logo">
                  <div className="grid grid-cols-1 items-center">
                    <div className="w-[30px] h-auto mr-2 ">
                      <Image src={logo} />
                    </div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 items-center ml-2">
                <h1 className="text-[16px] font-sans font-[400] cursor-pointer text-center  text-white">
                  {props?.title}
                </h1>
              </div>
            </div>
            {props?.Subtitle ? Subtitle() : null}
          </div>
        )}

        <div className="flex gap-5 "  >
          <div className="mr-[3px] mt-[5px] " id="openChatbot" onClick={load_chat_script} >
            <img src={"/support-white.svg"} />
          </div>


          {specialPage ? null : (
            <div style={{ transition: ".5s", }} className={menu ? "mr-[0%]" : ""}>
              <div className="mr-[3px]" onClick={openMenu}>
                <IoMenuOutline className="text-4xl cursor-pointer text-white" />
              </div>
            </div>
          )}

        </div>

        <div
          style={{ transition: ".3s" }}
          onClick={closeMenu}
          className={
            menu
              ? "absolue fixed w-full h-[100%] bg-[#00000017] top-0 left-0"
              : "hidden"
          }
        ></div>
      </div>

      <div
        style={{ transition: ".6s" }}
        className={
          menu
            ? "w-[70%]  block fixed h-[100%] top-0 right-0 py-[10%] bg-[#154B88] z-[999] shadow-[-11px_0px_20px_20px_#b3b3b330] overflow-y-scroll"
            : "w-[0px] fixed top-0 right-0 py-[10%] z-[999] bg-[#154B88] h-screen"
        }
      >
        <div className="items-center  bg-[#154B88] ">
          <ul className=" gap-2">
            {menuitem().map((item, index) => (
              <li
                key={index}
                className={`${menuUrl === item?.shortname && "bg-[#041E44]"
                  } text-center h-[44px]`}
              >
                {menu ? (
                  <span className="text-[14px] font-sans font-normal  text-[#FFFFFF] not-italic absolute top-3 right-[50px]">
                    Close
                  </span>
                ) : null}
                {menu ? (
                  <IoCloseCircleSharp
                    onClick={() => setMenu(false)}
                    className="text-3xl cursor-pointer text-white bg-[#154B88] absolute top-2 right-2"
                  />
                ) : null}
                <div
                  className="cursor-pointer text-[16px] font-sans text-base font-[400]"
                  onClick={() => {
                    logout(item?.name);
                    {
                      item?.link &&
                        router.push(!item?.ComingSoon ? item?.link : "");
                    }
                  }}
                >
                  <div className="flex flex-wrap gap-2 items-center h-[44px]  ">
                    {item?.subMenuTitle && (
                      <div className="bg-[#124176] w-[100%]  text-left pt-2 h-[44px]">
                        <span
                          className="text-[14px] mt-[10px]  text-[#AABFD5] font-[500] ml-5"
                          style={{ fontFamily: "Oswald" }}
                        >
                          {item?.subMenuTitle}
                        </span>
                      </div>
                    )}
                    <div>
                      <span
                        className={` ${item?.ComingSoon ? "text-[#AABFD5]" : "text-[#fff]"
                          } text-[14px] text-[400] leading-[20px] ml-5 `}
                      >
                        {item.name}
                      </span>
                    </div>

                    <div>
                      {item?.ComingSoon && (
                        <span className="text-[9px] text-[#262626] font-bold border-2 rounded-[6px] bg-[#AABFD5] px-2 font-sans disabled:opacity-75 ml-5">
                          {item?.ComingSoon}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {logout()}
          </ul>
        </div>
        <LogOutPopup
          datashow={showPopup ? "block" : "hidden"}
          onClicked={close}
          userLogout={userLogout}
        />
      </div>
    </div>
  );
}

export default SubHeader;
