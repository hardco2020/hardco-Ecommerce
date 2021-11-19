import {
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  LineStyle,
  MailOutline,
  PermIdentity,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  WorkOutline,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface ListActive {
  active?: boolean;
}

const SidebarContainer = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
`;
const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;

const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;

const SidebarTitle = styled.h3`
  font-size: 13px;
  color: rgb(197, 194, 194);
`;
const SidebarList = styled.ul`
  list-style: none;
  padding: 5px;
`;
const SidebarListItem = styled.li<ListActive>`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: ${(p) => p.active === true && `rgb(228,228,250)`};
  /* &.active{
        background-color: rgb(228,228,250);
    } */
  &:hover {
    background-color: rgb(228, 228, 250);
  }
`;

const ToLink = styled(Link)`
  text-decoration:none;
  color: inherit;
`

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarList>
            <SidebarListItem active={true}>
              <LineStyle style={{ marginRight: "5px", fontSize: "20px" }} />
              Home
            </SidebarListItem>
            <SidebarListItem>
              <Timeline style={{ marginRight: "5px", fontSize: "20px" }} />
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <TrendingUp style={{ marginRight: "5px", fontSize: "20px" }} />
              Sales
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Quick Menu</SidebarTitle>
          <SidebarList>
            <ToLink to="/admin/users">
            <SidebarListItem active={true}>
              <PermIdentity style={{ marginRight: "5px", fontSize: "20px" }} />
              Users
            </SidebarListItem>
            </ToLink>
            <ToLink to="/admin/products">
            <SidebarListItem>
              <Storefront style={{ marginRight: "5px", fontSize: "20px" }} />
              Products
            </SidebarListItem>
            </ToLink>
            <SidebarListItem>
              <AttachMoney style={{ marginRight: "5px", fontSize: "20px" }} />
              Transactions
            </SidebarListItem>
            <SidebarListItem>
              <BarChart style={{ marginRight: "5px", fontSize: "20px" }} />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Notifications</SidebarTitle>
          <SidebarList>
            <SidebarListItem active={true}>
              <MailOutline style={{ marginRight: "5px", fontSize: "20px" }} />
              Mail
            </SidebarListItem>
            <SidebarListItem>
              <DynamicFeed style={{ marginRight: "5px", fontSize: "20px" }} />
              Feedback
            </SidebarListItem>
            <SidebarListItem>
              <ChatBubbleOutline
                style={{ marginRight: "5px", fontSize: "20px" }}
              />
              Messages
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Staff</SidebarTitle>
          <SidebarList>
            <SidebarListItem active={true}>
              <WorkOutline style={{ marginRight: "5px", fontSize: "20px" }} />
              Manage
            </SidebarListItem>
            <SidebarListItem>
              <Timeline style={{ marginRight: "5px", fontSize: "20px" }} />
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <Report style={{ marginRight: "5px", fontSize: "20px" }} />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
