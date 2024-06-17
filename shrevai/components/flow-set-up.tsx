import React from "react";
import {
  Mail,
  LogIn,
  Search,
Phone,
Star,
Calendar,
Watch,
MapPin,SlidersHorizontal,
Upload,
Globe,
Contact,
Link

} from "lucide-react";
import { TbBoxMultiple1 } from "react-icons/tb";
import { GrMultiple } from "react-icons/gr";

import { Button } from "./ui/button";
import MultipleSelector from "./ui/multiple-selector";
import { Option } from "@/components/ui/multiple-selector";
import ThemeSelector from "@/components/ThemeSelector";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChromaDBInteraction from "@/components/ChromaDBInteraction";
const OPTIONS: Option[] = [
  { label: "nextjs", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember", disable: true },
  { label: "Gatsby", value: "gatsby", disable: true },
  { label: "Astro", value: "astro" },
];

const icons = [
  { name: "Email", icon: Mail },
  { name: "Authenticator", icon: LogIn },
  { name: "Real-time Search", icon: Search },
  { name: "Single Choice", icon: TbBoxMultiple1  },
  { name: "Multiple Choice", icon: GrMultiple },
  { name: "Mobile", icon: Phone },
  { name: "Rating", icon: Star },
  { name: "Date", icon: Calendar },
  { name: "Time", icon: Watch },
  { name: "Location", icon: MapPin },
  { name: "Range", icon: SlidersHorizontal },
  { name: "File Upload", icon: Upload },
  { name: "Website", icon: Globe },
  { name: "Contact", icon: Contact },
  { name: "Redirect URL", icon: Link },

];

const ResponsiveGrid = () => {
  return (
    <div className="flex justify-center items-center">
      <Tabs defaultValue="text" className="w-full bg-white">
        <TabsList className="flex justify-center scroll-smooth overflow-x-auto">
          <TabsTrigger value="text">Metadata</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="flow">Flow Set up</TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="text-center">
          <div className="w-full px-10">
            <MultipleSelector
              defaultOptions={OPTIONS}
              placeholder="Select frameworks you like..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </div>
        </TabsContent>
        <TabsContent value="logo" className="text-center">
          Change your password here.
        </TabsContent>
        <TabsContent value="layout" className="text-center">
        <ChromaDBInteraction />        </TabsContent>
        <TabsContent value="theme" className="text-center">
          <ThemeSelector />
        </TabsContent>
        <TabsContent value="flow" className="text-center">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {icons.map((item, index) => (
             <Button key={index} className="flex flex-col items-center justify-center p-12">
             <div className="p-2 w-full flex justify-center">
               <item.icon className="h-4 w-4" />
             </div>
             <div className="p-2 w-full flex justify-center">
               {item.name}
             </div>
           </Button>
           
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResponsiveGrid;
