import React, { useCallback, useState } from "react";
import {
  Mail,
  LogIn,
  Search,
  Phone,
  Star,
  Calendar,
  Watch,
  MapPin,
  SlidersHorizontal,
  Upload,
  Globe,
  Contact,
  Link,
  PlusCircle,
  PlusCircleIcon,
} from "lucide-react";
import { TbBoxMultiple1 } from "react-icons/tb";
import { GrMultiple } from "react-icons/gr";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChromaDBInteraction from "@/components/ChromaDBInteraction";
import Cookies from "js-cookie";
import Tiptap from "@/components/Tiptap";
import OCR from "@/components/ocr";
import Crawler from "@/components/crawler";
import ConvertPDF from "@/components/convertPDF";
import { useSearchParams } from "next/navigation";
import ConnectChatbot from "@/components/ConnectChatbot";
import StyleSelector from "@/components/StyleSelector";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import MultipleSelector from "./ui/multiple-selector";

interface Owner {
  id: number;
  employeeId: string;
  username: string;
  email: string;
  name: string;
  role: string;
  companyId: number;
  isLive: boolean;
}

interface Company {
  id: number;
  name: string;
}

interface Chatbot {
  id: number;
  chatbotName: string;
  companyId: number;
  createdAt: string;
  company: Company;
  owners: Owner[];
  sessions: any[]; // Adjust as per actual session type
  initmessage: string;
  initcta: string;
  type: string;
  tags: string;
  imgData: any; // Adjust as per actual data type
  modifiedAt: string;
  isActive: boolean;
}

interface Props {
  botdetail: Chatbot;
}
const OPTIONS: Option[] = [
  { label: "High Priority", value: "high_priority" },
  { label: "Low Priority", value: "low_priority" },
  { label: "News", value: "news" },
  { label: "Offers", value: "offers" },
  { label: "Promotions", value: "promotions" },
  { label: "Updates", value: "updates" },
  { label: "Feedback", value: "feedback" },
  { label: "Inquiry", value: "inquiry" },
  { label: "Support", value: "support", disable: true },
  { label: "Complaint", value: "complaint", disable: true },
  { label: "General", value: "general" },
];



const icons = [
  { name: "Email", icon: Mail },
  { name: "Authenticator", icon: LogIn },
  { name: "Real-time Search", icon: Search },
  { name: "Single Choice", icon: TbBoxMultiple1 },
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

const ResponsiveGrid: React.FC<Props> = ({ botdetail }) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("tab");
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Chatbot | null>(botdetail);
  const [fields, setFields] = useState(JSON.parse(botdetail.initcta) || [{ key: "", value: "" }]);

  const handleAddField = useCallback(() => {
    setFields((prevFields) => [...prevFields, { key: "", value: "" }]);
  }, []);

  const handleChange = useCallback((index, event) => {
    const { name, value } = event.target;
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, [name]: value } : field
      )
    );
  }, []);

  const handleRemoveField = useCallback((index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  }, []);

  const handleUpdateChatbot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const initctajson = fields.reduce((acc, field) => {
      acc[field.key] = field.value;
      return acc;
    }, {});
    try {
      console.log(initialData);
      setLoading(true);
      const response = await fetch("/api/updatechatbotdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`, // Replace with your actual token
        },
        body: JSON.stringify({
          id: botdetail.id.toString(),
          chatbotName: initialData?.chatbotName,
          type: initialData?.type,
          isActive: initialData?.isActive,
          tags: initialData?.tags,
          initmessage: initialData?.initmessage,
          initcta :JSON.stringify(fields)
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update chatbot");
      }
      const updatedChatbot = await response.json();
      setInitialData(updatedChatbot); // Update state with updated chatbot details
    } catch (error) {
      console.error("Error updating chatbot:", error);
      // Handle error states or display error messages
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center">
      <Tabs defaultValue={search || "metadata"} className="w-full">
        <TabsList className="flex justify-center scroll-smooth overflow-x-auto">
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
          <TabsTrigger value="train">Train</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="setup">Set Up</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="connect">Connect</TabsTrigger>
        </TabsList>
        <TabsContent
          value="metadata"
          className="md:h-[calc(80vh)] h-[calc(60vh)] overflow-y-scroll scroll-auto p-4 my-2 bg-white rounded-md "
        >
          <h2 className="text-2xl font-bold">Id:{botdetail?.id}</h2>
          <form onSubmit={handleUpdateChatbot}>
            <div className="my-4">
              <Label htmlFor="chatbotName">Chatbot Name</Label>
              <Input
                id="chatbotName"
                type="text"
                value={initialData?.chatbotName || ""}
                onChange={(e) =>
                  setInitialData({
                    ...initialData!,
                    chatbotName: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-4">
              <Label htmlFor="chatbotType">Chatbot Type</Label>
              <Select
                id="chatbotType"
                onValueChange={(value) =>
                  setInitialData({
                    ...initialData!,
                    type: value,
                  })
                }
                defaultValue={initialData?.type || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Customer Support">
                    Customer Support
                  </SelectItem>
                  <SelectItem value="FAQ">FAQ</SelectItem>
                  <SelectItem value="Data Collection">
                    Data Collection
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="my-4">
              <Label htmlFor="Tags">Tags</Label>
              <MultipleSelector
                value={initialData?.tags ? JSON.parse(initialData?.tags) : []}
                defaultOptions={OPTIONS}
                placeholder="Select tags"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    No results found.
                  </p>
                }
                onChange={(selectedOptions) => {
                  console.log(selectedOptions);
                  setInitialData({
                    ...initialData!,
                    tags: JSON.stringify(selectedOptions),
                  });
                }}
              />
            </div>

            <div className="my-4">
              <Label htmlFor="initialMessage">Initial Message</Label>
              <Input
                id="initialMessage"
                type="text"
                value={initialData?.initmessage || ""}
                onChange={(e) =>
                  setInitialData({
                    ...initialData!,
                    initmessage: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-4">
              <Label htmlFor="fields">Initial CTA</Label>
              {fields.map((field, index) => (
                <div key={index} className="mb-2 flex">
                  <Input
                    className="border mr-2 p-1"
                    type="text"
                    name="key"
                    placeholder="Key"
                    value={field.key}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Input
                    className="border mr-2 p-1"
                    type="text"
                    name="value"
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Button variant={"destructive"} onClick={() => handleRemoveField(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button className="w-full" onClick={handleAddField} type="button">
                <PlusCircleIcon className="h-6 w-6" />
              </Button>
              {/* <Button className="bg-green-500 text-white p-2 w-full" onClick={() => console.log(JSON.stringify(fields))} type="button">
                Log JSON
              </Button> */}
            </div>



            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Chatbot"}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="styling">
          <StyleSelector
            initialData={initialData}
            setInitialData={setInitialData}
            loading={loading}
            setLoading={setLoading}
            handleUpdateChatbot={handleUpdateChatbot}
          />
        </TabsContent>
        <TabsContent
          value="train"
          className="h-[calc(80vh)] overflow-y-scroll scroll-auto py-2 my-2"
        >
          <Crawler />

          <ChromaDBInteraction />
          <OCR />
          <ConvertPDF />
        </TabsContent>
        <TabsContent
          value="settings"
          className="h-max-[calc(80vh)] overflow-y-scroll scroll-auto py-2 my-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Control Access and Turn off/on</CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdateChatbot}>
              <CardContent>
                <div className="my-4">
                  <Label htmlFor="isActive">Switch Off/On</Label>
                  <Switch
                    id="isActive"
                    name="isActive"
                    checked={initialData?.isActive || false}
                    onCheckedChange={(checked) =>
                      setInitialData({
                        ...initialData!,
                        isActive: checked,
                      })
                    }
                    className={`${
                      initialData?.isActive ? "bg-green-500" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        initialData?.isActive
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
                    />
                  </Switch>
                  <div>
                    <h2 className="text-2xl font-bold">Owners</h2>
                    {initialData?.owners.map((owner, index) => (
                      <Card className="my-4">
                        <CardHeader>{owner.name}</CardHeader>
                        <CardContent>
                          <p className="text-sm mb-1">
                            <strong>Username:</strong> {owner.username}
                          </p>
                          <p className="text-sm mb-1">
                            <strong>Email:</strong> {owner.email}
                          </p>
                          <p className="text-sm">
                            <strong>Role:</strong> {owner.role}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Chatbot"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="text-center">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {icons.map((item, index) => (
              <Button
                key={index}
                className="flex flex-col items-center justify-center p-12"
              >
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
        <TabsContent value="setup" className="text-center"></TabsContent>
        <TabsContent value="analytics" className="text-center"></TabsContent>
        <TabsContent
          value="connect"
          className="h-[calc(80vh)] overflow-y-scroll scroll-auto py-2 my-2"
        >
          <ConnectChatbot />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResponsiveGrid;
