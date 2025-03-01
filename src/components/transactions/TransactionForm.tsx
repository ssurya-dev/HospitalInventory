import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Barcode, Package, Plus, Minus } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form schema for validation
const transactionFormSchema = z.object({
  itemId: z.string().min(1, { message: "Item ID is required" }),
  itemName: z.string().min(1, { message: "Item name is required" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  notes: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

interface TransactionFormProps {
  type?: "in" | "out";
  onSubmit?: (values: TransactionFormValues) => void;
  isOpen?: boolean;
}

const TransactionForm = ({
  type = "in",
  onSubmit,
  isOpen = true,
}: TransactionFormProps) => {
  const [activeTab, setActiveTab] = useState<"scan" | "manual">("scan");
  const [scannedItem, setScannedItem] = useState<string>("");

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      itemId: "",
      itemName: "",
      quantity: "1",
      department: "Emergency",
      notes: "",
    },
  });

  // Mock function to simulate barcode scanning
  const handleScanBarcode = () => {
    // In a real app, this would integrate with a barcode scanner
    const mockScannedItemId = "MED-" + Math.floor(Math.random() * 10000);
    setScannedItem(mockScannedItemId);
    form.setValue("itemId", mockScannedItemId);
    form.setValue("itemName", `Medical Item ${mockScannedItemId.slice(-4)}`);
  };

  const handleFormSubmit = (values: TransactionFormValues) => {
    // In a real app, this would send data to the backend
    console.log(`Item ${type === "in" ? "booked in" : "booked out"}:`, values);
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
    setScannedItem("");
  };

  const incrementQuantity = () => {
    const currentValue = parseInt(form.getValues("quantity") || "0");
    form.setValue("quantity", (currentValue + 1).toString());
  };

  const decrementQuantity = () => {
    const currentValue = parseInt(form.getValues("quantity") || "0");
    if (currentValue > 1) {
      form.setValue("quantity", (currentValue - 1).toString());
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle>Book Item {type === "in" ? "In" : "Out"}</CardTitle>
        <CardDescription>
          {type === "in"
            ? "Record items being added to inventory"
            : "Record items being removed from inventory"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "scan" | "manual")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scan">Scan Barcode</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-4">
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md border-gray-300 bg-gray-50">
              <Barcode className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-4 text-sm text-gray-500">
                Scan item barcode to automatically fill details
              </p>
              <Button
                type="button"
                onClick={handleScanBarcode}
                className="w-full"
              >
                Simulate Scan
              </Button>
              {scannedItem && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md w-full text-center">
                  <p className="text-sm font-medium">
                    Item scanned: {scannedItem}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="manual">
            <p className="text-sm text-gray-500 mb-4">
              Enter item details manually
            </p>
          </TabsContent>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="itemId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter item ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter item name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        className="h-9 w-9"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <FormControl>
                        <Input className="text-center" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        className="h-9 w-9"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Surgery">Surgery</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="Radiology">Radiology</SelectItem>
                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add any additional notes"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Any special instructions or details about this transaction
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="px-0 pt-4">
                <Button type="submit" className="w-full">
                  {type === "in" ? "Book In" : "Book Out"} Item
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
