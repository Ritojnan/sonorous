import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { Loader } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/createcompany', {
        method: 'POST',
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: companyName })
      });
      const data = await response.json();
      if (data.id ||data.name) {
        // Reload page on success
        window.location.reload();
      } else {
        // Show error message on failure
        setError(data.message); // Assuming error message is provided in JSON response
      }
    } catch (error) {
      console.error('Error creating company:', error);
      setError('Failed to create company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">First things first...</CardTitle>
          <CardDescription>
            Enter your company name below to create a new company
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="companyName">Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Apna Company Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full my-2" disabled={loading}>
              {loading ? <Loader className=" h-4 w-4 animate-spin" /> : 'Create Company'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
