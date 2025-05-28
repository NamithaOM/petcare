import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./HomepageComponents/Main";
import About from "./HomepageComponents/About";
import Contact from "./HomepageComponents/Contact";
import Login from "./Auth/Login";
import Terms from "./HomepageComponents/Terms";
import AdminMain from "./AdminComponents/AdminMain";
import AdminCustomersPanel from "./AdminComponents/AdminCustomersPanel";
import AdminSalesPanel from "./AdminComponents/AdminSalesPanel";
import AdminSupportPanel from "./AdminComponents/AdminSupportPanel";
import ScrollTop from "./EffectComponents/ScrollTop";
import useAOS from "./EffectComponents/useAOS";
import Roles from "./Auth/Roles";
import CustomerRegister from "./Auth/CustomerRegister";
import SplashScreen from "./EffectComponents/SplashScreen";
import CustomerServiceRegister from "./Auth/CustomerServiceRegister";
import SalesRepresentativeRegister from "./Auth/SalesRepresentativeRegister";
import AdminUserControls from "./AdminComponents/AdminUserControls";
import CustomerServiceMain from "./CustomerServiceComponents/CustomerServiceMain";
import SalesRepresentativeMain from "./SalesRepresentativeComponents/SalesRepresentativeMain";
import CustomerMain from "./CustomerComponents/CustomerMain";
import MyProfile from "./CommonComponents/MyProfile";
import CustomerServiceEnquiries from "./CustomerServiceComponents/CustomerServiceEnquiries";
import SupportTicketForm from "./CustomerComponents/SupportTicketForm";
import SupportTicket from "./CustomerServiceComponents/SupportTicket";
import MyTickets from "./CustomerComponents/MyTickets";
import SupportMessages from "./CustomerComponents/SupportMessages";
import CustomerMessages from "./CustomerServiceComponents/CustomerMessages";
import CustomerProfile from "./CustomerComponents/CustomerProfile";
import LeadForm from "./SalesRepresentativeComponents/LeadForm";

function App() {
  useAOS();

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(auth);

  return (
    <>
      <BrowserRouter>
        <ScrollTop />

        {auth == null ? (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customerregister" element={<CustomerRegister />} />
            <Route
              path="/customerserviceregister"
              element={<CustomerServiceRegister />}
            />
            <Route
              path="/salesrepresentativeregister"
              element={<SalesRepresentativeRegister />}
            />
            <Route path="/roles" element={<Roles />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/splashscreen" element={<SplashScreen />} />
          </Routes>
        ) : auth.usertype == 0 ? (
          <Routes>
            <Route path="/" element={<CustomerMain />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/supportticketform" element={<SupportTicketForm />} />
            <Route path="/mytickets" element={<MyTickets />} />
            <Route path="/supportmessages" element={<SupportMessages />} />
            <Route path="/customerprofile" element={<CustomerProfile />} />
          </Routes>
        ) : auth.usertype == 1 ? (
          <Routes>
            <Route path="/" element={<CustomerServiceMain />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/enquiries" element={<CustomerServiceEnquiries />} />
            <Route path="/supporttickets" element={<SupportTicket />} />
            <Route path="/customermessages" element={<CustomerMessages />} />
          </Routes>
        ) : auth.usertype == 2 ? (
          <Routes>
            <Route path="/" element={<SalesRepresentativeMain />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/leadform" element={<LeadForm />} />
          </Routes>
        ) : null}

        <Routes>
          <Route path="/adminmain" element={<AdminMain />} />
          <Route
            path="/admincustomerspanel"
            element={<AdminCustomersPanel />}
          />
          <Route path="/adminsalespanel" element={<AdminSalesPanel />} />
          <Route path="/adminsupportpanel" element={<AdminSupportPanel />} />
          <Route path="/adminusercontrols" element={<AdminUserControls />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
