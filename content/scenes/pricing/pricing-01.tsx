"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Minus } from "lucide-react";

type BillingPeriod = "monthly" | "annual";

const plans = [
  {
    name: "Starter",
    description: "For individuals and small projects",
    monthlyPrice: 9,
    annualPrice: 86,
    cta: "Get started",
    highlighted: false,
    features: [
      "Up to 3 projects",
      "1 GB storage",
      "Basic analytics",
      "Email support",
      "API access",
    ],
  },
  {
    name: "Pro",
    description: "For growing teams and businesses",
    monthlyPrice: 29,
    annualPrice: 278,
    cta: "Get started",
    highlighted: true,
    features: [
      "Unlimited projects",
      "10 GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Team collaboration",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: 99,
    annualPrice: 950,
    cta: "Contact sales",
    highlighted: false,
    features: [
      "Unlimited projects",
      "Unlimited storage",
      "Advanced analytics",
      "24/7 dedicated support",
      "API access",
      "Custom integrations",
      "Team collaboration",
      "SSO & SAML",
      "Audit logs",
    ],
  },
];

const comparisonFeatures = [
  { name: "Projects", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Storage", starter: "1 GB", pro: "10 GB", enterprise: "Unlimited" },
  { name: "Team members", starter: "1", pro: "10", enterprise: "Unlimited" },
  { name: "Analytics", starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
  { name: "API access", starter: true, pro: true, enterprise: true },
  { name: "Custom integrations", starter: false, pro: true, enterprise: true },
  { name: "Priority support", starter: false, pro: true, enterprise: true },
  { name: "SSO & SAML", starter: false, pro: false, enterprise: true },
  { name: "Audit logs", starter: false, pro: false, enterprise: true },
  { name: "Dedicated account manager", starter: false, pro: false, enterprise: true },
];

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the remaining balance will be credited to your account.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), as well as PayPal and bank transfers for annual plans.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all plans come with a 14-day free trial. No credit card required to start. You can explore all features before committing to a plan.",
  },
  {
    question: "What happens when I reach my storage limit?",
    answer:
      "You'll receive a notification when you're approaching your limit. You can either upgrade your plan or purchase additional storage. We'll never delete your data without notice.",
  },
  {
    question: "Do you offer discounts for nonprofits or education?",
    answer:
      "Yes, we offer a 50% discount for verified nonprofit organizations and educational institutions. Contact our sales team to learn more.",
  },
];

export default function Pricing01() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Choose the plan that fits your needs. All plans include a 14-day free trial.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Tabs
            value={billing}
            onValueChange={(v) => setBilling(v as BillingPeriod)}
          >
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual" className="gap-2">
                Annual
                <Badge variant="secondary" className="text-xs">
                  Save 20%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Plan cards */}
      <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-3">
        {plans.map((plan) => {
          const price =
            billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;
          const period = billing === "monthly" ? "/mo" : "/yr";

          return (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? "relative ring-2 ring-primary"
                  : ""
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold tracking-tight tabular-nums">
                    ${price}
                  </span>
                  <span className="text-muted-foreground">{period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check
                        className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Feature comparison */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Separator className="mb-16" />

        <h2 className="text-2xl font-bold tracking-tight text-balance text-center">
          Compare plans
        </h2>
        <p className="mt-2 text-center text-muted-foreground">
          A detailed look at what each plan includes
        </p>

        <div className="mt-8 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Feature</TableHead>
                <TableHead className="text-center">Starter</TableHead>
                <TableHead className="text-center">Pro</TableHead>
                <TableHead className="text-center">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFeatures.map((feature) => (
                <TableRow key={feature.name}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  {(["starter", "pro", "enterprise"] as const).map((plan) => {
                    const value = feature[plan];
                    return (
                      <TableCell key={plan} className="text-center">
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check
                              className="mx-auto h-4 w-4 text-emerald-600 dark:text-emerald-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <Minus
                              className="mx-auto h-4 w-4 text-muted-foreground/40"
                              aria-hidden="true"
                            />
                          )
                        ) : (
                          <span className="text-sm tabular-nums">{value}</span>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-2xl px-6 pb-16">
        <Separator className="mb-16" />

        <h2 className="text-2xl font-bold tracking-tight text-balance text-center">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-center text-muted-foreground">
          Everything you need to know about our pricing
        </p>

        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
