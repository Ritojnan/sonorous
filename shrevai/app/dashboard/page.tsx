"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  Mail,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";
import { useEmployeeContext } from "@/Context/EmployeeContext";
export default function Dashboard() {
  const { user, setUser } = useEmployeeContext();
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Welcome back , {user?.name} </CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                <Separator />
                <div className="flex flex-col pt-2 gap-1 ">
                  <div className="flex-1">
                    <Badge variant="secondary">Tips 1</Badge> Add more data to
                    train your bot to get better results
                  </div>
                  <div className="flex-1">
                    <Badge variant="secondary">Tips 2</Badge> Check analysis
                    daily to get more insights
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-row gap-2">
              <Link className="w-full" href={"/dashboard/chatbots"}>
                <Button className="w-full">Create a New Bot</Button>
              </Link>

              <Link className="w-full" href={"/dashboard/analytics"}>
                <Button className="w-full text-white bg-gradient-to-r from-purple-500 to-blue-500 animate-gradient">
                  Get Insights
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle>
                {/* <span className="text-4xl">1,329</span>{" "} */}
                <span className="text-4xl">0</span>{" "}

                <span className="text-sm">sessions</span>{" "}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {/* +25% from last week */}
                0% from last week

              </div>
            </CardContent>
            <CardFooter>
              <Progress value={0} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle>
                {/* <span className="text-4xl">1,329</span>{" "} */}
                <span className="text-4xl">0</span>{" "}
                <span className="text-sm">users</span>{" "}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                0% from last month
                {/* +10% from last month */}
              </div>
            </CardContent>
            <CardFooter>
              {/* <Progress value={(1329 * 100) / 5000} aria-label="12% increase" /> */}
              <Progress value={0} aria-label="12% increase" />
            </CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Recent leads and conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Chatbot
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        ConversationID
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Issue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">None</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {/* jese@leos */}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        -
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {/* <Badge className="text-xs" variant="outline">
                          -
                        </Badge> */}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {/* 2023-06-24 */}
                      </TableCell>
                      <TableCell className="text-right">
                        {/* $150.00 */}
                        </TableCell>
                    </TableRow>
                    
                    {/* <TableRow>
                      <TableCell>
                        <div className="font-medium">Olivia Smith</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          olivia@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        Refund
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="outline">
                          Declined
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-06-24
                      </TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Noah Williams</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          noah@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        Subscription
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          Fulfilled
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-06-25
                      </TableCell>
                      <TableCell className="text-right">$350.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Emma Brown</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          emma@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        Sale
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          Fulfilled
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-06-26
                      </TableCell>
                      <TableCell className="text-right">$450.00</TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Status
              </CardTitle>
              <CardDescription>Date:{formattedDate}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Mail className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Message
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Add</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View All</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold flex flex-row items-center space-x-2">
                <span>People Online</span>
                <span>
                  <Circle className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                </span>
              </div>
              <ul className="grid gap-3">
              <li><span className="text-muted-foreground">No Data</span></li>

                {/* <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Glimmer Lamps x <span>2</span>
                  </span>
                  <span>$250.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Aqua Filters x <span>1</span>
                  </span>
                  <span>$49.00</span>
                </li> */}
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold flex flex-row items-center space-x-2">
                <span>People Offline</span>
                <span>
                  <Circle className="h-3 w-3 rounded-full bg-red-500 " />
                </span>
              </div>
              <ul className="grid gap-3">
                <li><span className="text-muted-foreground">No Data</span></li>
                {/* <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Glimmer Lamps x <span>2</span>
                  </span>
                  <span>$250.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Aqua Filters x <span>1</span>
                  </span>
                  <span>$49.00</span>
                </li> */}
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold flex justify-between">
                <span>Best Performing Bot</span>
                <span>Created By</span>
              </div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">None</dt>
                  <dd>-</dd>
                </div>
                {/* <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Customer</dt>
                  <dd>Liam Johnson</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">liam@shrevai.com</a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href="tel:">+1 234 567 890</a>
                  </dd>
                </div> */}
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">{formattedDate}</time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
  // }
}
