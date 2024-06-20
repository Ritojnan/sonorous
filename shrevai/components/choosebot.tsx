"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import MultipleSelector from "./ui/multiple-selector";
import { Option } from "@/components/ui/multiple-selector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "./ui/select";

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

const formSchema = z.object({
  chatbotName: z.string().min(1, { message: "Chatbot Name is required." }),
  type: z.string().min(1, { message: "Type is required." }),
  initmessage: z.string(),
  initcta: z.string().refine(
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Init CTA must be a valid JSON." }
  ),
  tags: z.string().optional(),
  data: z.any().optional(),
});

export function CreateBotForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chatbotName: "",
      type: "",
      initmessage: "",
      initcta: "{}",
      tags: "",
      data: null,
    },
  });

  const handleSubmit = async (values) => {
    console.log("Form values before sending:", values);
    values.initcta = JSON.parse(values.initcta);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/createbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      form.reset();
      toast("Chatbot has been created. Redirecting ...");
      router.push("chatbots/" + data.id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="chatbotName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chatbot Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Chatbot Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

  <FormField
    control={form.control}
    name="type"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Type</FormLabel>
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FAQ">FAQ</SelectItem>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Customer Support">Customer Support</SelectItem>
              <SelectItem value="Data Collection">Data Collection</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

        <FormField
          control={form.control}
          name="initmessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Message</FormLabel>
              <FormControl>
                <Input placeholder="Enter Initial Message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="initcta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial CTA (JSON format)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Initial CTA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (CSV format)</FormLabel>
              <FormControl>
                <Input placeholder="Enter Tags" {...field} />
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (CSV format)</FormLabel>
              <FormControl>
                <MultipleSelector
                  defaultOptions={OPTIONS}
                  placeholder="Select frameworks you like..."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                  onChange={(selectedOptions) => {
                    const csvString = selectedOptions.join(",");
                    field.onChange(csvString);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data (Image)</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <div className="text-red-600">{error}</div>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <Loader className=" h-4 w-4 animate-spin" />
          ) : (
            "Create Chatbot"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default CreateBotForm;

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { useState } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { toast } from "@/components/ui/use-toast"
// import { ArrowLeft } from "lucide-react"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import Cookies from "js-cookie"

// const FormSchema = z.object({
//   username: z.string().min(2, { message: "Username must be at least 2 characters." }),
//   displayText: z.string().min(1, { message: "Display text cannot be empty." }),
//   link: z.string().url({ message: "Must be a valid URL." })
// })

// const MultiStepForm = () => {
//   const [step, setStep] = useState(1)
//   const [formData, setFormData] = useState({
//     option1: "",
//     option2: "",
//     username: "",
//     initcta: {}
//   })

//   const handleNext = (data: { [x: number]: any; username?: any; option1?: string; option2?: string; initcta?: {} }) => {
//     setFormData((prev) => ({
//       ...prev,
//       ...data
//     }))
//     setStep((prev) => prev + 1)
//   }

//   const handleBack = () => {
//     setStep((prev) => prev - 1)
//   }

//   const handleSelectOption = (option: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [option]: value
//     }))
//     handleNext({ [option]: value })
//   }

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       username: "",
//       displayText: "",
//       link: ""
//     }
//   })

//   const onSubmit = async (data: z.infer<typeof FormSchema>) => {
//     const token = Cookies.get("token")
//     const cta = { ...formData.initcta, [data.displayText]: data.link }
//     const requestBody = {
//       chatbotName: data.username,
//       type: formData.option1,
//       initmessage: "Welcome to my chatbot!",
//       initcta: cta
//     }

//     try {
//       await fetch("/api/chatbot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(requestBody)
//       })
//       toast({
//         title: "Success!",
//         description: "Your chatbot has been created successfully."
//       })
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "There was an error creating your chatbot."
//       })
//     }
//   }

//   return (
//     <form onSubmit={(e) => e.preventDefault()}>
//             {step === 1 && (
//         <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-2 py-2">
//             <Button className="h-full w-full p-6" onClick={() => handleSelectOption("option2", "template")}>Pick from template</Button>
//             <Button className="h-full w-full p-6" onClick={() => handleSelectOption("option2", "custom")}>Create your own bot</Button>
//           </div>
//           <div className="flex justify-between">
//             <Button onClick={handleBack}><ArrowLeft className="w-4 h-4" /></Button>
//           </div>
//         </motion.div>
//       )}
//       {step === 2 && (
//         <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="space-y-4">
//           <div className="grid grid-cols-1 gap-2 my-2 py-2">
//             <Button className="w-full" onClick={() => handleSelectOption("option1", "customer-support")}>Customer Support</Button>
//             <Button className="w-full" onClick={() => handleSelectOption("option1", "lead-generation")}>Lead Generation</Button>
//             <Button className="w-full" onClick={() => handleSelectOption("option1", "data-collection")}>Data Collection</Button>
//           </div>
//         </motion.div>
//       )}
//       {step === 3 && (
//         <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="space-y-4">
//           {/* <Form handleNext={(username: any) => handleNext({ username })}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
//               <FormField control={form.control} name="username" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Bot Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Bot Name" {...field} />
//                   </FormControl>
//                   <FormDescription>This is your public display name for the bot.</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )} />
//               <FormField control={form.control} name="displayText" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Display Text</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Display Text" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )} />
//               <FormField control={form.control} name="link" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Link</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Link" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )} />
//               <Button type="submit">Create</Button>
//             </form>
//           </Form> */}
//           <div className="flex justify-between">
//             <Button onClick={handleBack}><ArrowLeft className="w-4 h-4" /></Button>
//           </div>
//         </motion.div>
//       )}
//     </form>
//   )
// }

// export default MultiStepForm
