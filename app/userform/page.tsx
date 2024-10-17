"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useController, Control } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const bankDetailsSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  bank_name: z.string(),
  bank_iban: z.string(),
  bank_bic: z.string(),
});

const cardDetailsSchema = z.object({
  number: z.string(),
  holder: z.string(),
  expiry: z.string(),
  cvc: z.string(),
  type: z.enum(["visa", "mastercard", "amex"]),
});

const notificationsFormSchema = z.object({
  is_post_content: z.boolean(),
  is_have_following: z.boolean().optional(),
  number_non_paying_followers: z.coerce.number().optional(),
  kind_of_content: z.string().optional(),
  is_category_a_content: z.boolean().optional(),
  is_add_bank_detail: z.boolean().optional(),
  is_add_card_detail: z.boolean().optional(),
  bank_details: bankDetailsSchema.optional(),
  card_details: cardDetailsSchema.optional(),
});
//.refine(
//  (data) => {
//    if (
//      data.is_post_content === false &&
//      data.is_add_card_detail === undefined
//    ) {
//      return false;
//    }
//
//    return true;
//  },
//  {
//    message: "is_add_card_detail is required if is_post_content is false",
//    path: ["is_add_card_detail"],
//  },
//);

// This can come from your database or API.
const defaultValues: Partial<NotificationsFormValues> = {
  number_non_paying_followers: 5,
  bank_details: {
    name: "",
    address: "",
    city: "",
    country: "",
    bank_name: "",
    bank_iban: "",
    bank_bic: "",
  },
  card_details: {
    number: "",
    holder: "",
    expiry: "",
    cvc: "",
    type: "visa",
  },
};

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

interface BankDetailFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

const BankDetailField: React.FC<BankDetailFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <FormItem className="space-y-3">
      <FormLabel>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Input
          {...field}
          onChange={(event) => field.onChange(event.target.value)}
          id={`bank_detail_${name}`}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

interface CardDetailFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

const CardDetailField: React.FC<CardDetailFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <FormItem className="space-y-3">
      <FormLabel>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Input
          {...field}
          onChange={(event) => field.onChange(event.target.value)}
          id={`card_detail_${name}`}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default function UserForm() {
  const { toast } = useToast();
  const [isPostContent, setIsPostContent] = React.useState<boolean | null>(
    null,
  );
  const [isHaveFollowing, setIsHaveFollowing] = React.useState<boolean | null>(
    null,
  );
  const [isAddBankDetail, setIsAddBankDetail] = React.useState<boolean | null>(
    null,
  );
  const [isAddCardDetail, setIsAddCardDetail] = React.useState<boolean | null>(
    null,
  );
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    console.log(data);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex w-full min-h-screen items-center justify-center py-8"
      >
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="text-2xl">User Registration Form</CardTitle>
            <CardDescription>
              Fill the required fields below to complete your registration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="is_post_content"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Will you post content?
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value === "yes");
                            setIsPostContent(value === "yes");
                          }}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {isPostContent && (
                <>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="is_have_following"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Do you already have a following?
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value === "yes");
                                setIsHaveFollowing(value === "yes");
                              }}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {isHaveFollowing && (
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="number_non_paying_followers"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>
                              Approximately how many non-paying followers do you
                              have?
                              <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                onChange={(event) =>
                                  field.onChange(Number(event.target.value))
                                }
                                defaultValue={field.value}
                                id="price_per_month"
                                type="number"
                                min={5}
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="kind_of_content"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            What kind of content do you create?
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              onChange={(event) =>
                                field.onChange(event.target.value)
                              }
                              id="kind_of_content"
                              type="text"
                              placeholder="Software Development"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="is_category_a_content"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            {`Will you create Category 'A' content?`}
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value === "yes");
                              }}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="is_add_bank_detail"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Do you want to add your bank details now?
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value === "yes");
                                setIsAddBankDetail(value === "yes");
                              }}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {isAddBankDetail && (
                    <div className="grid gap-2">
                      <BankDetailField
                        control={form.control}
                        name="bank_details.name"
                        label="Name"
                        placeholder="John Doe"
                        required
                      />
                      <BankDetailField
                        control={form.control}
                        name="bank_details.address"
                        label="Address"
                        placeholder="123 Main St"
                        required
                      />
                      <BankDetailField
                        control={form.control}
                        name="bank_details.city"
                        label="City"
                        placeholder="New York"
                        required
                      />
                      <BankDetailField
                        control={form.control}
                        name="bank_details.country"
                        label="Country"
                        placeholder="USA"
                        required
                      />
                      <BankDetailField
                        control={form.control}
                        name="bank_details.bank_name"
                        label="Bank Name"
                        placeholder="Bank of America"
                        required
                      />
                      <BankDetailField
                        control={form.control}
                        name="bank_details.bank_iban"
                        label="IBAN"
                        placeholder="GB82 WEST 1234 5698 7654 32"
                        required
                      />
                      <BankDetailField
                        control={form.control}
                        name="bank_details.bank_bic"
                        label="BIC"
                        placeholder="BOFAUS3N"
                        required
                      />
                    </div>
                  )}
                </>
              )}
              {isPostContent === false && (
                <>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="is_add_card_detail"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Do you want to add your card details now?
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value === "yes");
                                setIsAddCardDetail(value === "yes");
                              }}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {isAddCardDetail && (
                    <>
                      <CardDetailField
                        control={form.control}
                        name="card_details.number"
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      <CardDetailField
                        control={form.control}
                        name="card_details.holder"
                        label="Card Holder"
                        placeholder="John Doe"
                        required
                      />
                      <CardDetailField
                        control={form.control}
                        name="card_details.expiry"
                        label="Expiry"
                        placeholder="MM/YY"
                        required
                      />
                      <CardDetailField
                        control={form.control}
                        name="card_details.cvc"
                        label="CVC"
                        placeholder="123"
                        required
                      />
                    </>
                  )}
                </>
              )}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
