"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

// Dynamic content based on active section
function getActiveSectionContent(activeSection: string) {
  switch (activeSection) {
    case "roles":
      return <div>{/* <RolesPermissions /> */}</div>;
    case "payment":
      return <div>{/* <PaymentSettings /> */}</div>;
    case "notifications":
      return <div>{/* <NotificationSettings /> */}</div>;
    case "personal-info":
    default:
    //   return <PersonalInfo />;
  }
}

export default function ProfileSetting() {
  const [activeSection, setActiveSection] = useState("personal-info");

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row max-w-(--breakpoint-xl) mx-auto">
        <MobileSidebar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="w-full">{getActiveSectionContent(activeSection)}</div>
      </div>
    </div>
  );
}
