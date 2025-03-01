import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Barcode, Check, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  destinationDepartment: z.string({
    required_error: "Please select a destination department.",
  }),
  items: z
    .array(
      z.object({
        itemId: z.string(),
        name: z.string(),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "At least one item must be added"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface TransferFormProps {
  onSubmit?: (values: FormValues) => void;
  isOpen?: boolean;
}

const TransferForm = ({
  onSubmit = () => {},
  isOpen = true,
}: TransferFormProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationDepartment: "",
      items: [
        { itemId: "ITM001", name: "Surgical Gloves", quantity: 50 },
        { itemId: "ITM002", name: "Syringes (10ml)", quantity: 25 },
      ],
      notes: "",
    },
  });

  const departments = [
    { id: "DEPT001", name: "Emergency Room" },
    { id: "DEPT002", name: "Surgery" },
    { id: "DEPT003", name: "Pediatrics" },
    { id: "DEPT004", name: "Cardiology" },
    { id: "DEPT005", name: "Radiology" },
  ];

  const handleScanBarcode = () => {
    setIsScanning(true);
    // Simulate barcode scanning
    setTimeout(() => {
      const newItem = {
        itemId: `ITM${Math.floor(1000 + Math.random() * 9000)}`,
        name: `Scanned Item ${Math.floor(Math.random() * 100)}`,
        quantity: 1,
      };

      const currentItems = form.getValues().items || [];
      form.setValue("items", [...currentItems, newItem]);
      setIsScanning(false);
    }, 1500);
  };

  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(values);
      setIsSubmitting(false);
      form.reset();
    }, 1500);
  };

  const removeItem = (index: number) => {
    const currentItems = form.getValues().items;
    const updatedItems = currentItems.filter((_, i) => i !== index);
    form.setValue("items", updatedItems);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>Initiate Department Transfer</CardTitle>
        <CardDescription>
          Transfer medical supplies and equipment to another department.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="destinationDepartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the department that will receive these items.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Items for Transfer</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleScanBarcode}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Barcode className="mr-2 h-4 w-4" />
                      Scan Barcode
                    </>
                  )}
                </Button>
              </div>

              <div className="border rounded-md p-4">
                {form.watch("items")?.length > 0 ? (
                  <div className="space-y-4">
                    {form.watch("items").map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded bg-gray-50"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            ID: {item.itemId}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <label
                              htmlFor={`quantity-${index}`}
                              className="mr-2 text-sm"
                            >
                              Qty:
                            </label>
                            <Input
                              id={`quantity-${index}`}
                              type="number"
                              className="w-20"
                              value={item.quantity}
                              onChange={(e) => {
                                const currentItems = [
                                  ...form.getValues().items,
                                ];
                                currentItems[index].quantity =
                                  parseInt(e.target.value) || 0;
                                form.setValue("items", currentItems);
                              }}
                              min={1}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No items added. Scan a barcode or add items manually.
                  </div>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add any special instructions or notes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => form.reset()}>
          Cancel
        </Button>
        <Button
          onClick={form.handleSubmit(handleSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Transfer
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransferForm;
