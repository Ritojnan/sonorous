"use client";
// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
// import { useCollection } from "react-firebase-hooks/firestore";
// import Link from "next/link";
// import { query, collection } from "firebase/firestore";
// import { db } from "./firebase";
// import Pricing from "@/components/PricingTable"
import PricingPage from "@/components/PricingTable";
import Globe from "@/components/globe";
import TwoColumnFooter from "@/components/footer";

export default function Home() {
  // const session = useSession();
  // const [users, loading, error] = useCollection(query(collection(db, "users")));
  // console.log("hehhe" + JSON.stringify(users));
  return (
    <>
      <div className="relative flex w-full items-center justify-center overflow-hidden  border bg-background px-40 pb-40 pt-8 md:pb-60">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Scale Faster with AI
        </span>
        {/* <Globe className="top-28" /> */}
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
      </div>
      <Globe className="top-28" />

      <PricingPage />
      <TwoColumnFooter />
    </>
  );
}

{
  /* <p>{users?.docs[0].data().payment_status}</p> */
}
{
  /* <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {session?.data?.user?.name}{" "}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {session?.data?.user?.email}{" "}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src={
                session?.data?.user?.image ||
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
            <CardItem
              translateZ={20}
              onClick={() => signOut()}
              as="button"
              className="px-4 py-2 rounded-xl bg-red-500 dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Log out
            </CardItem>
          </div>
        </CardBody>
      </CardContainer> */
}
