"use client";
import { AiOutlineWechatWork} from "react-icons/ai";
export default function page() {

  return (
    <div className="bg-red-500">
      <button onClick={() => {console.log("hi")}} className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 ">
        <AiOutlineWechatWork className="h-6 w-6 text-black" />
      </button>
    </div>
  );
}
