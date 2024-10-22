import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "./components/ui/button.tsx"
import { Input } from "./components/ui/input.tsx"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs.tsx"
import { Badge } from "./components/ui/badge.tsx"
import { ArrowRight, CheckCircle, Sparkles, FileText, Zap, Chrome, UserCircle, Download } from "lucide-react"

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    navigate('/login');
  }

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">CoverMe.AI</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </a>
          <a 
            className="text-sm font-medium hover:underline underline-offset-4" 
            onClick={() => navigate('/login')} // Redirect to login page
            style={{ cursor: 'pointer' }} // Change cursor to pointer
          >
            Log In/Sign Up
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Create Perfect Cover Letters with AI - Right in Your Browser
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
                  CoverMe.AI Chrome extension generates tailored, professional cover letters in minutes. Just paste the job description and download your personalized cover letter.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-zinc-900"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-white text-primary hover:bg-zinc-200">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-zinc-200">
                  Sign up for early access to our Chrome extension.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose CoverMe.AI?</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Browser Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Generate cover letters directly from your browser while job hunting, without switching between apps.</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Create professional cover letters in minutes by simply pasting the job description.</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <Sparkles className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>AI-Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Leverage advanced AI to craft tailored, impactful cover letters for each application.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="w-fit">Step 1</Badge>
                  <h3 className="text-2xl font-bold">Create Your Profile</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Sign up on our website and create your profile with your skills, experience, and career objectives.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="w-fit">Step 2</Badge>
                  <h3 className="text-2xl font-bold">Install the Chrome Extension</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Add the CoverMe.AI extension to your Chrome browser for seamless integration with your job search.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                <Badge className="w-fit">Step 3</Badge>
                  <h3 className="text-2xl font-bold">Generate Your Cover Letter</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    While browsing job listings, simply paste the job description into the extension and let AI create your personalized cover letter.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="w-fit">Step 4</Badge>
                  <h3 className="text-2xl font-bold">Download and Apply</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Review your generated cover letter, make any final adjustments, and download it to complete your job application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple, Transparent Pricing</h2>
            <Tabs defaultValue="free" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="free">Free</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
              </TabsList>
              <TabsContent value="free">
                <Card>
                  <CardHeader>
                    <CardTitle>Free Plan</CardTitle>
                    <CardDescription>For casual users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">$0/month</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> 1 cover letter per month</li>
                      <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> Basic features</li>
                      <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> Community support</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleGetStarted}>Get Started</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="paid">
                <div className="grid gap-8 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Plan</CardTitle>
                      <CardDescription>For active job seekers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">$1/week</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> Unlimited cover letters</li>
                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> Advanced customization</li>
                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> Priority support</li>
                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> AI-powered suggestions</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={handleGetStarted}>Get Started</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Annual Plan</CardTitle>
                      <CardDescription>Best value for long-term job seekers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">$10/year</p>
                      <p className="text-sm text-zinc-500">Save $42 compared to weekly plan</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> Unlimited cover letters</li>
                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> Advanced customization</li>
                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> Priority support</li>
                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> AI-powered suggestions</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={handleGetStarted}>Get Started</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Revolutionize Your Job Application Process?
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of job seekers who have streamlined their applications with CoverMe.AI Chrome extension.
                </p>
              </div>
              <Button className="bg-white text-primary hover:bg-zinc-200">
                Install Chrome Extension <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">© 2024 CoverMe.AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}