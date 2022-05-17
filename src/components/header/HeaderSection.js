import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import Brand from "./Brand";
import SearchSection from "./SearchSection";
import UserSection from "./UserSection";

const HeaderSection = () => {
  const windowWidth = useWindowWidth();

  useEffect(() => {}, [windowWidth]);

  return (
    <header>
      <div className="container mx-auto">
        {windowWidth < 767 && (
          <div className="flex items-center w-full px-6 py-1 mb-2 justify-between border-b border-opacity-75 border-gray-300">
            <Brand />
            <SearchSection />
          </div>
        )}
        <div className="header-middle">
          {windowWidth > 767 && (
            <div className="flex-1 flex items-center">
              <Brand />
              <SearchSection />
            </div>
          )}
          <UserSection />
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
