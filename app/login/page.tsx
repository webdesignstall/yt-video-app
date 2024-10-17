"use client"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!email) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newErrors.email = "Email is required";
    }
    if (!password) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Stop if there are errors

    const data = { email, password };

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSuccessMessage("Login Successfully!");
      setErrors({}); // Clear any previous errors
      setEmail("");
      setPassword("");
      router.push("/dashboard");  // Make sure this is implemented after a successful login
    }else {
      const responseData = await response.json();
      const newErrors = {};
      if (responseData?.error) {
        // @ts-ignore
        newErrors.error = responseData?.error
      }

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return; // Stop if there are errors
    }


  };

  return (

    <div className="flex w-full min-h-screen items-center justify-center">
      <Card className="min-w-fit w-1/4">
        <CardHeader>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
              errors.error && <p className="mt-4 text-red-600 text-center">{errors.error}</p>}

          {successMessage && (
              <div className="mt-4 text-green-600 text-center">
                {successMessage}
              </div>
          )}
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@example.com"
                    className={
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      errors.email ? "is-invalid" : ""}

                />
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                    errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className={
                         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                         // @ts-ignore
                         errors.email ? "is-invalid" : ""}
                />
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                    errors.password && <p className="text-red-600">{errors.password}</p>}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
);
}
