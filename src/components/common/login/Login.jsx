"use client"
import React from 'react';
import { Card, CardBody, Input, Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";

const App: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement login logic here
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardBody className="p-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <Icon icon="lucide:heart-pulse" className="text-red-500 text-5xl" />
            <h1 className="text-3xl font-bold text-gray-800">PreMed</h1>
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">Study. Anywhere. Anytime.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onValueChange={setEmail}
              startContent={<Icon icon="lucide:mail" className="text-gray-400" />}
              classNames={{
                input: "bg-gray-50",
                inputWrapper: "bg-gray-50",
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onValueChange={setPassword}
              startContent={<Icon icon="lucide:lock" className="text-gray-400" />}
              endContent={
                <Button isIconOnly variant="light" aria-label="Toggle password visibility">
                  <Icon icon="lucide:eye-off" className="text-gray-400" />
                </Button>
              }
              classNames={{
                input: "bg-gray-50",
                inputWrapper: "bg-gray-50",
              }}
            />
            <Button type="submit" color="danger" fullWidth className="mt-2">
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Don't have an account? <Link href="#" size="sm" className="text-red-500 font-semibold">Sign Up</Link>
            </p>
            <Link href="#" size="sm" className="text-red-500">Forgot Password?</Link>
          </div>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>
            <Button 
              variant="bordered" 
              fullWidth 
              className="mt-4"
              startContent={<Icon icon="logos:google-icon" className="text-xl" />}
            >
              Continue with Google
            </Button>
          </div>
          <p className="mt-8 text-xs text-center text-gray-400">
            By logging in, you agree to our <Link href="#" size="sm" className="text-red-500">Terms of Use</Link> and <Link href="#" size="sm" className="text-red-500">Privacy Policy</Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default App;