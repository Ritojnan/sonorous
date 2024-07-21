import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useCallback } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { MdWhatsapp } from "react-icons/md";
import {FaSlack} from 'react-icons/fa'
import {SiNotion} from 'react-icons/si' 
import { useParams,usePathname } from "next/navigation";
export default function ConnectChatbot() {
  const [copySuccess, setCopySuccess] = useState(false);
  const { botid } = useParams();

  const copyToClipboard = useCallback((codeToCopy) => {
    navigator.clipboard.writeText(codeToCopy);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 1500); // Reset success message after 1.5 seconds
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
      {" "}
      <h1 className="text-3xl font-semibold">Connect</h1>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Direct Link</span>
            <span>
              {copySuccess && (
                <span className="text-sm p-1 m-1 text-muted-foreground">
                  Copied to clipboard
                </span>
              )}
              <Button
                onClick={() =>
                  copyToClipboard(`
http://${window.location.host}/embed/${botid}

                    `)
                }
                disabled={copySuccess}
              >
                {copySuccess ? (
                  <ClipboardCheck className="h-4 w-4" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
              </Button>
            </span>
          </CardTitle>

          <CardDescription>
            <p>
              To add the chatbot any where on your website, add this iframe to
              your html code
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <code>
            {`
http://${window.location.host}/embed/${botid}

                  `}
          </code>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Embed</span>
            <span>
              {copySuccess && (
                <span className="text-sm p-1 m-1 text-muted-foreground">
                  Copied to clipboard
                </span>
              )}
              <Button
                onClick={() =>
                  copyToClipboard(`
<iframe 
src="http://${window.location.host}/embed/${botid}"
style="width: 100%;
height: 100vh;
border: none;">
</iframe>
                    `)
                }
                disabled={copySuccess}
              >
                {copySuccess ? (
                  <ClipboardCheck className="h-4 w-4" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
              </Button>
            </span>
          </CardTitle>

          <CardDescription>
            <p>
              To add the chatbot any where on your website, add this iframe to
              your html code
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <code>
            {`
<iframe 
src="${window.location.host}/embed/${botid}"
style="width: 100%;
height: 100vh;
border: none;">
</iframe>
                  `}
          </code>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Chat Bubble</span>
            <span>
              {copySuccess && (
                <span className="text-sm p-1 m-1 text-muted-foreground">
                  Copied to clipboard
                </span>
              )}
              <Button
                onClick={() =>
                  copyToClipboard(`
<iframe 
src="${window.location.host}/embed/${botid}"
style="width: 100%;
height: 100vh;
border: none;">
</iframe>
                    `)
                }
                disabled={copySuccess}
              >
                {copySuccess ? (
                  <ClipboardCheck className="h-4 w-4" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
              </Button>
            </span>
          </CardTitle>

          <CardDescription>
            <p>
              To add a chat bubble to the bottom right of your website add this
              script tag to your html
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <code>
            {`
<iframe 
src="${window.location.host}/embed/${botid}"
style="width: 100%;
height: 100vh;
border: none;">
</iframe>
                  `}
          </code>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Integration</CardTitle>
          <CardDescription>
            Connect your chatbot to a WhatsApp number and let it respond
            messages from your customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button className="w-full">
              <MdWhatsapp className="h-6 w-6 mr-2 bg-green-600 dark:bg-green-700 hover:bg-green-800" />
              Connect to Whatsapp
            </Button>
            <Button className="w-full">
              <FaSlack className="h-6 w-6 mr-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-800" />
              Connect to Slack
            </Button>
            <Button className="w-full">
              <SiNotion className="h-6 w-6 mr-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-800" />
              Connect to Notion
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4"></CardFooter>
      </Card>
    </div>
  );
}
