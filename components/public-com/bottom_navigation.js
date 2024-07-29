import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import React from "react";

function BottomNavigation() {
  const router = useRouter();
  const user_role = reactLocalStorage.get("user_role");

  let item = () => {
    if (user_role === "tenant") {
      return [
        {
          name: "home",
          link: "/tenant",
        },
        {
          name: "projects",
          link: "/tenant/project_request",
        },
        {
          name: "message",
          link: "/tenant/message",
        },
        {
          name: "profile",
        },
        {
          name: "menu",
        },
      ];
    } else {
      return [
        {
          name: "home",
          link: "/dashboard",
        },
        {
          name: "tenants",
          link: "/tenants/list",
        },
        {
          name: "contractors",
          link: "/contractors/list",
        },
        {
          name: "projects",
          link: "/projects/list",
        },
        {
          name: "schedule",
          link: "/schedule/list",
        },
      ];
    }
  };

  const menuUrl = router.pathname;

  return (
    <footer className="fixed bottom-0 w-full z-50 ">
      <div className="grid grid-cols-5 w-[100%] headerbgcolor rounded-t-[12px] overflow-hidden ">
        {item().map((item, index) => (
          <div
            key={index}
            onClick={() => item.link && router.push(item.link)}
            className={
              item.link === menuUrl
                ? "activebgbottom py-4"
                : "grid cursor-pointer py-4"
            }
          >
            <div className="grid justify-items-center">
              {item.link === menuUrl ? (
                <img
                  src={`/bottom-icon/${item.name}-solid.svg`}
                  alt={`${item.name}-icons-active`}
                />
              ) : (
                <img
                  src={`/bottom-icon/${item.name}-line.svg`}
                  alt={`${item.name}-icons`}
                />
              )}
              <h1 className="font-[600] text-[11px] text-white capitalize ">
                {item.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default BottomNavigation;
