import { Avatar, Button, useToast } from "@chakra-ui/react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3CenterLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ showNav, setShowNav }) {
  const navigate = useNavigate();
  const toast = useToast();

  const logout = () => {
    localStorage.removeItem("token");

    toast({
      title: "Success Logout",
      status: "info",
      position: "top",
      variant: "top-accent",
      duration: 3000,
      isClosable: true,
    });

    navigate("/login");
  };

  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        {/* <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        /> */}
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <picture>
                <Avatar src="/images/profile.jpg" m={2} size="md" />
              </picture>
              <span className="hidden md:block font-medium text-gray-700">
                Admin
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Button
                    onClick={() => logout()}
                    type="button"
                    className="flex hover:bg-blue-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                  
                </Menu.Item>
                <Menu.Item>
                  <Button
                    
                    type="button"
                    className="flex hover:bg-blue-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center ml-2"
                  >
                    <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                    <a href="https://news2-alpha.vercel.app/">
                      News
                    </a>
                  </Button>
                  
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
