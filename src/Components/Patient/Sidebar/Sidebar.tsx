import { Avatar, Text } from "@mantine/core";
import {
  IconCalendarCheck,
  IconClockHeart,
  IconLayoutGrid,
  IconMoodHeart,
  IconStethoscope,
  IconUser,
  IconVaccine,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    url: "/patients/dashboard",
    icon: <IconLayoutGrid stroke={1.5} />,
  },
  {
    name: "Profile",
    url: "/patients/profile",
    icon: <IconUser stroke={1.5} />,
  },
  {
    name: "Appointments",
    url: "/patients/appointments",
    icon: <IconCalendarCheck stroke={1.5} />,
  },
];

const Sidebar = () => {
  const user = useSelector((state:any) => state.user);

  return (
    <div className="flex">
        <div className="w-64"></div>
    <div className="w-64 fixed h-screen overflow-y-auto bg-dark flex flex-col gap-7 items-center">

      {/* logo and name */}
      <div className="fixed z-[500] bg-dark py-3 text-primary-400 flex gap-1 items-center">
        <IconClockHeart size={40} stroke={2.5} />
        <span className="font-heading font-semibold text-3xl">CareSphere</span>
      </div>

      {/* Avatar, name and role */}
        <div className="flex flex-col mt-20 gap-5">
      <div className="flex flex-col gap-1 items-center">
        <div className="p-1 bg-white rounded-full shadow-lg">
          <Avatar variant="filled" src="/avatar.png" size={"xl"} alt="it's me" />
        </div>
        <span className="font-medium text-light">{user.name}</span>
        <Text c="dimmed" className="text-light" size="xs">
          {user.role}
        </Text>
      </div>

      {/* Navlinks*/}
      <div className="flex flex-col gap-1">
        {
            links.map((link)=>{
                return <NavLink 
                to={link.url} 
                key={link.url} 
                className={({isActive})=>
                    `flex items-center gap-3 w-full font-medium text-light px-4 py-5 rounded-lg ${
                        isActive ? "bg-primary-400 text-dark" : "hover:bg-gray-100 hover:text-dark"}
                    `}
                >
                    {link.icon}
                    <span>{link.name}</span>
                </NavLink>
            })
        }
      </div> 
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
