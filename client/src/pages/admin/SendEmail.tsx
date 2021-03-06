import React from "react";
import AdminEmail from "../../components/adminCom/AdminEmail";
import Sidebar from "../../components/adminCom/Sidebar";
import { PageContainer } from "../../components/adminCom/Theme";
import Topbar from "../../components/adminCom/Topbar";

const SendEmail = () => {
  return (
    <div>
      <Topbar />
      <PageContainer>
        <Sidebar />
        <AdminEmail />
      </PageContainer>
    </div>
  );
};

export default SendEmail;
