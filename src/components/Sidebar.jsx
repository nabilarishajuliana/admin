import { Image } from "@chakra-ui/react";
import { HomeIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import { forwardRef, React } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = forwardRef(({ showNav }, ref) => {
  const location = useLocation();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      {/* <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            src="/images/ciboox.png"
            alt="Company Logo"
            className="w-32 h-auto"
          />
          <Image
            boxSize="150px"
            borderRadius={"full"}
            objectFit="cover"
            src="https://lh3.googleusercontent.com/a4zRMyFAo71XjR236GBF5QBzkFtT29RVnq4P2n6GcZvYdWg5w9DgD29jNWiQJr4j1JaqcD9gCIssMGuVGKJswIKdFIRxZa-vEr-zWYdLSbzS1hI=w1600-nu-rj-l80-e365"
          />
        </picture>
      </div> */}

      {/* <div className="flex flex-col">
        <Link to="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname === "/"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link to="/news">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname.includes("/article")
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <NewspaperIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Article</p>
            </div>
          </div>
        </Link>
      </div> */}
    </div>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
