"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChapterList from "@/components/chapter-list";
import SubjectSidebar from "@/components/subject-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Atom, Beaker, Calculator } from "lucide-react";

export default function Home() {
  const [activeSubject, setActiveSubject] = useState("Physics");

  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-[350px] border-r">
        <SubjectSidebar
          activeSubject={activeSubject}
          onSubjectChange={handleSubjectChange}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{activeSubject} PYQs</h1>
            <p className="text-muted-foreground text-sm">
              Chapter-wise Collection of {activeSubject} PYQs
            </p>
          </div>
          <ModeToggle />
        </div>

        {/* Mobile tabs - visible only on mobile */}
        <div className="md:hidden mb-6">
          <Tabs
            defaultValue={activeSubject.toLowerCase()}
            onValueChange={(value) =>
              handleSubjectChange(
                value.charAt(0).toUpperCase() + value.slice(1)
              )
            }
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="physics" className="flex items-center gap-2">
                <span className="bg-orange-500 p-1 rounded text-white">
                  <Atom className="h-4 w-4" />
                </span>
                Phy
              </TabsTrigger>
              <TabsTrigger
                value="chemistry"
                className="flex items-center gap-2"
              >
                <span className="bg-green-500 p-1 rounded text-white">
                  <Beaker className="h-4 w-4" />
                </span>
                Chem
              </TabsTrigger>
              <TabsTrigger
                value="mathematics"
                className="flex items-center gap-2"
              >
                <span className="bg-blue-500 p-1 rounded text-white">
                  <Calculator className="h-4 w-4" />
                </span>
                Math
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ChapterList activeSubject={activeSubject} />
      </div>
    </div>
  );
}
