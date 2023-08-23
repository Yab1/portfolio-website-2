// State and context hooks from React.
import { useState, useEffect } from "react";

// Components for website displaying.
import Menu from "./Menu";
import Navigation from "./Navigation";

export default function Header2() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    "home",
    "about",
    "works",
    "testimonials",
    "contact",
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const tabsOffsets = tabs.map((item) => {
        const element = document.getElementById(item);
        return {
          name: item,
          offsetTop: element.offsetTop,
        };
      });
      const activeTabIndex = tabsOffsets.findIndex(
        (item) => item.offsetTop > scrollY + 100
      );
      setActiveTab(
        activeTabIndex === -1 ? tabs.length - 1 : activeTabIndex - 1
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const setActiveTabState = (index) => {
    setActiveTab(index);
  };
  return (
    <header
      className={
        "w-full fixed z-40 transition-colors linear duration-0 " +
        (tabs[activeTab] === "home"
          ? "bg-transparent"
          : "bg-white mb-2 text-black")
      }
    >
      <Menu
        activeTab={activeTab}
        setActiveTabState={setActiveTabState}
        tabs={tabs}
      />
      {tabs[activeTab] === "home" ? null : (
        <Navigation
          activeTab={activeTab}
          setActiveTabState={setActiveTabState}
          tabs={tabs}
        />
      )}
      <nav></nav>
    </header>
  );
}
