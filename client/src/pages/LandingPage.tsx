import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cx } from "class-variance-authority";

// Custom Paragraph Component
const Paragraph = ({ children, className }: any) => {
  return <p className={cx("text-lg text-gray-700", className)}>{children}</p>;
};

// Custom Image Component (simplified)
const Image = ({ src, alt, width, height, className }: any) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cx("rounded-lg shadow-md", className)}
    />
  );
};

export const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12">
      {/* Hero Section */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Text */}
          <div>
            <h1
              
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Effortless Task Management
            </h1>
            <Paragraph className="text-lg text-gray-700 mb-6">
              Stop feeling overwhelmed and start getting things done. Our task
              manager is designed to simplify your life and boost your
              productivity.
            </Paragraph>
            <div className="flex space-x-4">
              <Button variant="default">Get Started Free</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div>
            <Image
              src="/image.png" // Replace with your image path
              alt="Task Manager Screenshot"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto max-w-5xl px-4 mt-24">
        <h2
          
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="bg-white rounded-lg shadow-md p-6">
            <CardHeader>
              <CardTitle>Intuitive Interface</CardTitle>
              <CardDescription>
                Easily create, organize, and prioritize your tasks with our
                drag-and-drop interface.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-white rounded-lg shadow-md p-6">
            <CardHeader>
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>
                Share tasks and projects with team members for seamless
                collaboration.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-white rounded-lg shadow-md p-6">
            <CardHeader>
              <CardTitle>Cross-Platform Access</CardTitle>
              <CardDescription>
                Access your tasks from any device – web, desktop, and mobile.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto max-w-5xl px-4 mt-24 bg-blue-50 rounded-lg p-8">
        <h2
          
          className="text-3xl font-bold text-gray-900 mb-4 text-center"
        >
          Ready to Get Started?
        </h2>
        <Paragraph className="text-lg text-gray-700 mb-6 text-center">
          Sign up for a free trial and experience the power of our task manager.
        </Paragraph>
        <div className="flex justify-center">
          <Button variant="default">Start Free Trial</Button>
        </div>
      </div>
    </div>
  );
};


