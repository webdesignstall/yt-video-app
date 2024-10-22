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
import {useEffect, useState} from "react";

const paymentFormSchema = z.object({
  name: z.string({message: "Name is required"}),
  number: z.string().length(16, "Card number must be 16 digits"),
  month: z.string({message: "Expiration month is required"}),
  year: z.string({message: "Expiration year is required"}),
  cvc: z.string().length(3, "CVC must be 3 digits"),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export function PaymentForm() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
  });

    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [card, setCard] = useState()

  async function onSubmit(data: PaymentFormValues) {

    try {
      const response = await fetch("/api/payment-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
      }else {
          const { message } = await response.json();
          setSuccessMsg(message)

          toast({
              title: "Success",
              description: message,
          });
      }

    } catch (error) {
      toast({
        title: "Error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const fetchCardInfo = async () => {
      const response = await fetch("/api/payment-card", {method: 'GET'});
      const {data} = await response.json();
      return data;
  }
    useEffect(() => {
        (async () => {
            const data = await fetchCardInfo();
            form.setValue('name', data?.name);
            form.setValue('number', data?.number);
            form.setValue('month', data?.month);
            form.setValue('year', data?.year);
            form.setValue('cvc', data?.cvc);
        })()
        fetchCardInfo().catch()
    }, []);

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-sm">
            {error && <p data-cy='paymentApiError' className='text-red-500'>{error}</p>}
            {successMsg && <p data-cy='paymentApiSuccess' className='text-green-500'>{successMsg}</p>}
            <FormField
                control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Name</Label>
                    <Input data-cy="first-name" id="name" placeholder="First Last" {...field} />
                    <FormMessage />
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="number">Card number</Label>
                    <Input data-cy="card-number" id="number" placeholder="Card number" maxLength={16} {...field} />
                    <FormMessage />
                  </FormItem>
              )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="month">Month</Label>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger data-cy="month" id="month">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem role="option" data-value='1' value="1">January</SelectItem>
                          <SelectItem role="option" data-value='2' value="2">February</SelectItem>
                          <SelectItem role="option" data-value='3' value="3">March</SelectItem>
                          <SelectItem role="option" data-value='4' value="4">April</SelectItem>
                          <SelectItem role="option" data-value='5' value="5">May</SelectItem>
                          <SelectItem role="option" data-value='6' value="6">June</SelectItem>
                          <SelectItem role="option" data-value='7' value="7">July</SelectItem>
                          <SelectItem role="option" data-value='8' value="8">August</SelectItem>
                          <SelectItem role="option" data-value='9' value="9">September</SelectItem>
                          <SelectItem role="option" data-value='10' value="10">October</SelectItem>
                          <SelectItem role="option" data-value='11' value="11">November</SelectItem>
                          <SelectItem role="option" data-value='12' value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="year">Year</Label>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger data-cy="year" id="year">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem
                                  key={i}
                                  value={`${new Date().getFullYear() + i}`}
                                  data-value={`${new Date().getFullYear() + i}`}
                                  role="option"
                              >
                                {new Date().getFullYear() + i}
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input data-cy="cvc" id="cvc" placeholder="CVC" maxLength={3} {...field} />
                      <FormMessage />
                    </FormItem>
                )}
            />
          </div>
          <Button type="submit">Update card</Button>
        </form>
      </Form>
  );
}
