import Footer from "../Footer/Footer";
import Header from "./Header/Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="py-4 px-8 flex flex-col gap-10 min-h-screen max-w-4xl mx-auto">
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
}
