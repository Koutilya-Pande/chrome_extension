import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  defaultValue: string;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  value: string;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ children, className = '', defaultValue, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '', ...props }: TabsListProps) {
  return (
    <div className={`flex ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, className = '', value, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within a Tabs component');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      className={`px-4 py-2 ${isActive ? 'bg-primary text-white' : 'bg-gray-200'} ${className}`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, className = '', value, ...props }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within a Tabs component');

  const { activeTab } = context;

  if (activeTab !== value) return null;

  return (
    <div className={`mt-2 ${className}`} {...props}>
      {children}
    </div>
  );
}