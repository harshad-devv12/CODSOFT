import React, { useState } from 'react';
import clsx from 'clsx';

const Tabs = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={clsx('space-y-4', className)}>
      <div className="flex space-x-4">
        {React.Children.map(children, (child, index) => (
          <button
            className={clsx(
              'px-4 py-2 font-medium text-sm rounded-lg focus:outline-none transition-colors duration-200',
              index === activeTab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            )}
            onClick={() => handleTabClick(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white border rounded-xl">
        {children[activeTab]}
      </div>
    </div>
  );
};

const TabPanel = ({ children }) => {
  return <div>{children}</div>;
};

export default Tabs;
export { TabPanel };
