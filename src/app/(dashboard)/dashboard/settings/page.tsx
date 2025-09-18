'use client'

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import BillingAndUsage from "./components/BillingInformation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDownIcon } from "lucide-react";
import { useSidebar } from '@/hooks/useSidebar';

export default function Component() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isMinimized, toggle } = useSidebar();

  useEffect(() => {
    if(!isMinimized){
      toggle();
    }
  }, [isMinimized,toggle]);


  const navItems = [
    { id: "general", label: "General" },
    { id: "billing", label: "Billing" },
    { id: "security", label: "Security" },
    { id: "integrations", label: "Integrations" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden md:flex-row">
      <div
        className="md:hidden w-fit border rounded-full p-2 cursor-pointer bg-white"
        onClick={toggleSidebar}
      >
        <ChevronDownIcon size={24} />
      </div>
      <nav className={`w-full md:w-64 flex-shrink-0 bg-white p-6 border-r transition-all duration-300 ease-in-out ${isSidebarOpen ? 'block' : 'hidden'
        } md:block`}>
        <h2 className="font-bold text-xl mb-4 text-gray-900">Settings</h2>
        <div className="text-sm text-gray-500 space-y-4">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`cursor-pointer ${activeTab === item.id ? 'underline font-bold' : ''}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </nav>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <ScrollArea className="h-full">
          <div className="max-w-5xl mx-auto">
            {activeTab === "general" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Name</CardTitle>
                    <CardDescription>Used to identify your project in the dashboard.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <Input placeholder="Project Name" />
                    </form>
                  </CardContent>
                  <CardFooter className="border-t p-6">
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Root Directory</CardTitle>
                    <CardDescription>The directory within your project, in which your code is located.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="flex flex-col gap-4">
                      <Input defaultValue="/web" placeholder="Project Name" />
                      <div className="flex items-center space-x-2">
                        <Checkbox defaultChecked id="include" />
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="include"
                        >
                          Include files from outside of the Root Directory
                        </label>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="border-t p-6">
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            {activeTab === "billing" && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your billing details and subscription.</CardDescription>
                </CardHeader>
                <CardContent>
                  <BillingAndUsage />
                </CardContent>
              </Card>
            )}
            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Your security content goes here.</p>
                </CardContent>
              </Card>
            )}
            {activeTab === "integrations" && (
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Manage your connected services and apps.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Your integrations content goes here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
