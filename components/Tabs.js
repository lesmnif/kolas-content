import React, { useState } from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function TabsPage({
  selectedTab,
  setSelectedTab,
  handleTabClick,
  tabs
}) {


    console.log("this is my selected tab", selectedTab)

  return (
    <div>
      <div className="block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <p
              key={tab.name}
              className={classNames(
                selectedTab === tab.name
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-3 px-4 hover:cursor-pointer text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={selectedTab === tab.name ? "page" : undefined}
              onClick={() => handleTabClick(tab.name)} // Handle tab click
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  selectedTab === tab.name ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </p>
          ))}
        </nav>
      </div>
    </div>
  )
}
