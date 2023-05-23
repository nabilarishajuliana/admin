import { Transition } from "@headlessui/react";
import { Fragment, React, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    function handleResize() {
      setShowNav(!isMobile);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <>
      <Topbar showNav={showNav} setShowNav={setShowNav} />
      {/* <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Sidebar showNav={showNav} />
      </Transition> */}
      <main
        className={`pt-16 transition-all duration-[400ms] `}
      >
        <div className="px-4 md:px-16">{children}</div>
      </main>
    </>
  );
}

export default AdminLayout;

