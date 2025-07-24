"use client";

import { useState } from "react";
import { Check, ArrowRight, Star, Briefcase } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Component() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [open, setOpen] = useState(false);

  const plans = [
    {
      name: "BASIC",
      price: 0,
      description:
        "Perfect for small businesses getting started with job posting",
      features: [
        "Post 2 Job every day",
        "Post 1 Urgents & Featured Jobs every day",
        "Highlights Job with Colors",
        "Access & Saved 5 Candidates",
        "24/7 Critical Support",
      ],
      buttonText: "Choose Plan",
      popular: false,
    },
    {
      name: "STANDARD",
      price: 39,
      description:
        "Most popular choice for growing companies with regular hiring needs",
      features: [
        "5 Post Jobs every day",
        "Post 5 Urgents & Featured Jobs every day",
        "Highlights Job with Colors",
        "Access & Saved 15 Candidates",
        "20 Days Resume Visibility",
        "24/7 Critical Support",
      ],
      buttonText: "Choose Plan",
      popular: true,
    },
    {
      name: "PREMIUM",
      price: 59,
      description:
        "Advanced solution for enterprises with high-volume recruitment",
      features: [
        "Unlimited Post Jobs",
        "Unlimited Post Urgents & Featured Jobs",
        "Highlights Job with Colors",
        "Access & Saved Unlimited Post Candidates",
        "30 Days Resume Visibility",
        "24/7 Critical Support",
      ],
      buttonText: "Choose Plan",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid items-center gap-12 mb-16 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
              <Briefcase className="w-4 h-4" />
              Job Posting Platform
            </div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
              Buy Premium Subscription to{" "}
              <span className="text-blue-600">Post a Job</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              Unlock the power of premium job posting with advanced features,
              extended visibility, and priority support. Connect with top talent
              faster and more efficiently than ever before.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-800 ">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> No setup fees
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Cancel anytime
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> 24/7 support
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative p-8 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl">
              <img
                src="https://i.pinimg.com/736x/10/d3/83/10d3832519e968a1294ca62cfd502889.jpg"
                alt="Job posting illustration"
                className="relative z-10 w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 mx-auto md:grid-cols-3 max-w-7xl">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular
                  ? "border-2 border-blue-500 shadow-xl scale-105"
                  : "border border-gray-200 hover:border-blue-300"
              }`}
            >
              <CardHeader className="pb-8 text-center">
                <CardTitle className="mb-2 text-lg font-semibold text-gray-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600 mb-6 min-h-[3rem]">
                  {plan.description}
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="font-medium text-gray-500">/Monthly</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-8">
                <Button
                  className={`w-full group transition-all duration-300 ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                  size="lg"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setOpen(true);
                  }}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 space-y-4 text-center">
          <p className="text-gray-600">
            Need a custom solution? Our enterprise plans offer unlimited
            flexibility.
          </p>
          <Button
            variant="outline"
            className="text-blue-600 bg-transparent border-blue-600 hover:bg-blue-50"
          >
            Contact Sales Team
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 md:grid-cols-2">
            <Tabs defaultValue="credit" className="w-full">
              <TabsList>
                <TabsTrigger value="credit">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
              </TabsList>
              <TabsContent value="credit" className="space-y-4">
                <div className="p-4 space-y-3 border rounded-md">
                  <label className="text-sm font-medium">Name on Card</label>
                  <Input placeholder="Name" />
                  <label className="text-sm font-medium">Credit Card</label>
                  <div className="flex gap-2">
                    <Input placeholder="Card number" className="flex-1" />
                    <Input placeholder="MM/YY" className="w-24" />
                    <Input placeholder="CVC" className="w-24" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="paypal">
                <Button variant="outline" className="w-full">
                  Pay with PayPal
                </Button>
              </TabsContent>
            </Tabs>

            <div className="p-6 space-y-4 border rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground">
                Pricing Plan:{" "}
                <span className="font-semibold text-gray-700">
                  {selectedPlan?.name}
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total:</span>
                <span>${selectedPlan?.price} USD</span>
              </div>
              <Button className="flex items-center justify-center w-full gap-2">
                Confirm Payment <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                This package will expire after one month.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
