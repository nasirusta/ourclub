import { FooterSection, HeaderSection } from "./components";
import { Toaster } from "react-hot-toast";

const GetPage = ({ Page, header = true }) => {
  return (
    <div id="app">
      <Toaster />
      {header && <HeaderSection />}
      <div id="wrap">
        <div className="lg:container mx-auto">
          <Page />
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default GetPage;
