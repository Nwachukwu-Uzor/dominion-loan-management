import React from "react";
// import {
//   AccountsIcon,
//   DashboardIcon,
//   LogoutIcon,
//   SettingsIcon,
//   UsersIcon,
// } from "../svg-icons";
// import { ReceiptIcon } from "../svg-icons/receipt-icon";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink, useNavigate } from "react-router-dom";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";
import { CgTranscript } from "react-icons/cg";

import logo from "@/assets/images/logo.jpeg";
import { SESSION_STORAGE_KEY } from "@/constants";
import { toast } from "react-toastify";
import { LogOutIcon } from "lucide-react";
import { useUser } from "@/hooks";

type Props = {
  open: boolean;
  handleToggleSidebar: () => void;
};

const SUPER_ADMIN = "superAdmin";

export const Sidebar: React.FC<Props> = ({ open, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  

  const onLinkClick = () => {
    if (window.innerWidth > 768) {
      return;
    }
    handleToggleSidebar();
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdDashboard />,
      id: "1",
    },
    {
      id: 2,
      title: "Bulk Notifications",
      path: "/bulk-notifications",
      icon: <CgTranscript />,
    },
  ];

  if (user) {
    const transformedRoles = user.role.map((role) => role.toUpperCase());
  
    
    if (transformedRoles.includes(SUPER_ADMIN.toUpperCase())) {
      menuItems.push({
        id: 3,
        title: "Users",
        path: "/users",
        icon: <MdAdminPanelSettings />,
      });
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    toast.success("Logout successful..");
    navigate("/auth/login");
  };

  return (
    <aside
      className={`bg-primary h-screen  ${
        open ? "lg:w-72 " : "lg:w-20"
      } duration-300 overflow-y-auto no-scrollbar`}
    >
      <nav
        className={`bg-primary fixed pt-8 lg:left-0 top-0 bottom-0 z-20 ${
          open ? "w-72 " : "w-0 -left-20 lg:block lg:w-20"
        } duration-300 flex flex-col gap-10`}
      >
        <div
          className={`flex items-center justify-start mt-12 gap-3 px-5 ${
            open ? "w-fit" : "w-full"
          } h-8`}
        >
          <NavLink to={"/dashboard"}>
            <img
              src={logo}
              className={`p-1 w-full rounded cursor-pointer mx-auto ${
                open ? "" : "rotate-[360deg]"
              } duration-500`}
              alt="Logo"
            />
          </NavLink>
        </div>
        <div className="flex flex-col justify-between mt-2 lg:mt-6">
          <ul className="pt-4 flex flex-col gap-5 overflow-x-hidden">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={onLinkClick}
                  className={({ isActive }) =>
                    `w-full ${
                      open ? "" : "lg:justify-center"
                    } flex items-center gap-x-4 text-sm cursor-pointer hover:opacity-80 p-2 pl-5 ${
                      isActive
                        ? "bg-white text-primary"
                        : "bg-transparent text-white"
                    }`
                  }
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{item.icon}</span>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        sideOffset={open ? 250 : 35}
                        className="bg-white shadow-sm text-black"
                        arrowPadding={4}
                      >
                        <p className="text-sm">{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span
                    className={`font-medium text-base ${
                      open ? "scale-1 w-auto" : "scale-0 w-0"
                    }`}
                  >
                    {item.title}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogout}
            className={`flex items-center justify-start p-1 pl-5 gap-1 text-white w-full absolute bottom-16 font-bold ${
              open ? "" : "lg:justify-center"
            }`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <LogOutIcon />
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  sideOffset={open ? 250 : 35}
                  className="bg-white shadow-sm text-black"
                  arrowPadding={4}
                >
                  <p className="text-sm font-normal">Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span
              className={` text-base ${
                open ? "scale-1 w-auto" : "scale-0 w-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
