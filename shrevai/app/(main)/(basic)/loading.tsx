import Image from 'next/image';
import {Loader2} from "lucide-react";
const CenteredImageWithLoadingIcon = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative">
                {/* <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center">
                    <Image
                        src="/login.jpg"
                        alt="Logo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                </div> */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-grey-500 animate-spin" />
                </div>
            </div>
        </div>
    );
};

export default CenteredImageWithLoadingIcon;
