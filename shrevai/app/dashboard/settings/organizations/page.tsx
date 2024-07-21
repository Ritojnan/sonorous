"use client";
import React, { useState, useEffect } from "react";
import { Plus, PlusIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Employee {
  error: string;
  employeeId: string;
  username: string;
  email: string;
  name: string;
  role: string;
  isLive: boolean;
}

interface SignupProps {
  onEmployeeCreated: (newEmployee: Employee) => void;
}

export function Signup({ onEmployeeCreated }: SignupProps) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/createemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify({ username, email, name, password }),
      });

      const data: Employee = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Employee creation failed");
      }
      toast({
        title: "Success!",
        description: "Employee account has been created successfully.",
      });
      onEmployeeCreated(data);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error!",
        variant: "destructive",
        description: "An error occurred while creating the employee account.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="grid">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={loading}
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Create Employee <PlusIcon className="ml-2" />
              </>
            )}
          </Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

interface DialogDemoProps {
  onEmployeeCreated: (newEmployee: Employee) => void;
}

export function DialogDemo({ onEmployeeCreated }: DialogDemoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-500 hover:bg-green-600">
          Create Employee <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Employee</DialogTitle>
          <DialogDescription>
            Create Employee to add them to your organization
          </DialogDescription>
        </DialogHeader>
        <Signup onEmployeeCreated={onEmployeeCreated} />
      </DialogContent>
    </Dialog>
  );
}

export default function Page() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("/api/getallemployees", {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      });
      const data: Employee[] = await res.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  const handleEmployeeCreated = (newEmployee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      const res = await fetch("/api/delete/employee", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify({ employeeId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Employee deletion failed");
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.employeeId !== employeeId)
      );

      toast({
        title: "Success!",
        description: "Employee has been deleted successfully.",
      });
    } catch (err: any) {
      toast({
        title: "Error!",
        variant: "destructive",
        description: "An error occurred while deleting the employee.",
      });
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Employee Management</span>
            <span>
              <DialogDemo onEmployeeCreated={handleEmployeeCreated} />
            </span>
          </CardTitle>
          <CardDescription>
            Add / remove employees from your organization. Change their roles.
            Change their password and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="text-align-table">
            <TableCaption>
              A list of all the users in your organization.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email-id</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Is Live</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.employeeId}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.username}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.isLive ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    {employee.role === "admin" ? (
                      ""
                    ) : (
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleDeleteEmployee(employee.employeeId)
                        }
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
