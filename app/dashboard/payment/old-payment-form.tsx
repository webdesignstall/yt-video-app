"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const paymentFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<PaymentFormValues> = {
  items: ["recents", "home"],
};

export function PaymentForm() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues,
  });

  function onSubmit(data: PaymentFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-sm">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Card Information</FormLabel>
                <FormDescription>
                  Please enter your card information below.
                </FormDescription>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input data-cy="first-name" id="name" placeholder="First Last" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Card number</Label>
                <Input data-cy="card-number" id="number" placeholder="" maxLength={16} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="month">Expires</Label>
                  <Select >
                    <SelectTrigger data-cy="month" id="month">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem role="option" value="1">January</SelectItem>
                      <SelectItem role="option" value="2">February</SelectItem>
                      <SelectItem role="option" value="3">March</SelectItem>
                      <SelectItem role="option" value="4">April</SelectItem>
                      <SelectItem role="option" value="5">May</SelectItem>
                      <SelectItem role="option" value="6">June</SelectItem>
                      <SelectItem role="option" value="7">July</SelectItem>
                      <SelectItem role="option" value="8">August</SelectItem>
                      <SelectItem role="option" value="9">September</SelectItem>
                      <SelectItem role="option" value="10">October</SelectItem>
                      <SelectItem role="option" value="11">November</SelectItem>
                      <SelectItem role="option" value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Select>
                    <SelectTrigger data-cy="year" id="year">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={`${new Date().getFullYear() + i}`}
                        >
                          {new Date().getFullYear() + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input data-cy="cvc" id="cvc" placeholder="CVC" maxLength={3} />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update card</Button>
      </form>
    </Form>
  );
}
