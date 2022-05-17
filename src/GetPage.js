import { FooterSection, HeaderSection } from "./components";

const GetPage = ({ Page, header = true }) => {
  return (
    <div id="app">
      {header &&
      <HeaderSection />}
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
