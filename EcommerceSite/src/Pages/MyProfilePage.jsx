// pages/UserAccount.js

import React, { useState } from 'react';
import '../Pages/MyProfile.css'
import Sidebar from '../Component/My-Profile/SideBar';
import Content from '../Component/My-Profile/Content';


function UserAccount() {
  const [activeTab, setActiveTab] = useState('Address');

  return (
    <div className="UserProfile-account-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content activeTab={activeTab} />
    </div>
  );
}

export default UserAccount;
