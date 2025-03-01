import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";
import ItemDetailView from "./ItemDetailView";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  department: string;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
}

interface FilterOptions {
  category: string;
  department: string;
  status: string;
}

interface SearchPageProps {
  initialItems?: InventoryItem[];
}

const SearchPage = ({ initialItems }: SearchPageProps = {}) => {
  // Default mock data for inventory items
  const defaultItems: InventoryItem[] = [
    {
      id: "1",
      name: "Surgical Gloves",
      category: "Protective Equipment",
      department: "Surgery",
      quantity: 250,
      status: "In Stock",
      lastUpdated: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      name: "IV Catheters",
      category: "Medical Supplies",
      department: "Emergency",
      quantity: 45,
      status: "Low Stock",
      lastUpdated: "2023-06-14T08:15:00Z",
    },
    {
      id: "3",
      name: "Oxygen Masks",
      category: "Respiratory",
      department: "ICU",
      quantity: 0,
      status: "Out of Stock",
      lastUpdated: "2023-06-10T14:45:00Z",
    },
    {
      id: "4",
      name: "Blood Pressure Monitors",
      category: "Equipment",
      department: "Cardiology",
      quantity: 12,
      status: "In Stock",
      lastUpdated: "2023-06-12T11:20:00Z",
    },
    {
      id: "5",
      name: "Syringes",
      category: "Medical Supplies",
      department: "Pharmacy",
      quantity: 320,
      status: "In Stock",
      lastUpdated: "2023-06-13T09:10:00Z",
    },
  ];

  const [items] = useState<InventoryItem[]>(initialItems || defaultItems);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    department: "",
    status: "",
  });
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Handle search term changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, filters);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  // Apply both search term and filters
  const applyFilters = (term: string, filterOptions: FilterOptions) => {
    let results = [...items];

    // Apply search term filter
    if (term) {
      const lowerTerm = term.toLowerCase();
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerTerm) ||
          item.id.toLowerCase().includes(lowerTerm) ||
          item.category.toLowerCase().includes(lowerTerm) ||
          item.department.toLowerCase().includes(lowerTerm),
      );
    }

    // Apply category filter
    if (filterOptions.category) {
      results = results.filter(
        (item) =>
          item.category.toLowerCase() === filterOptions.category.toLowerCase(),
      );
    }

    // Apply department filter
    if (filterOptions.department) {
      results = results.filter(
        (item) =>
          item.department.toLowerCase() ===
          filterOptions.department.toLowerCase(),
      );
    }

    // Apply status filter
    if (filterOptions.status) {
      const statusMap: Record<string, string> = {
        "in-stock": "In Stock",
        "low-stock": "Low Stock",
        "out-of-stock": "Out of Stock",
        "on-order": "On Order",
      };

      const targetStatus = statusMap[filterOptions.status];
      if (targetStatus) {
        results = results.filter((item) => item.status === targetStatus);
      }
    }

    setFilteredItems(results);
  };

  // Handle view item details
  const handleViewItem = (item: InventoryItem) => {
    // Convert to the format expected by ItemDetailView
    const detailItem = {
      id: item.id,
      name: item.name,
      category: item.category,
      department: item.department,
      currentQuantity: item.quantity,
      minThreshold:
        item.status === "Low Stock" ? item.quantity + 50 : item.quantity / 2,
      description: `${item.name} - ${item.category} for ${item.department} department`,
      lastUpdated: item.lastUpdated,
      status: item.status,
      location: `Storage Area ${item.id.charAt(0).toUpperCase()}`,
      serialNumber: `SN-${item.id}-${new Date().getFullYear()}`,
      manufacturer: "Hospital Supplies Inc.",
      purchaseDate: new Date(new Date().setMonth(new Date().getMonth() - 3))
        .toISOString()
        .split("T")[0],
      expiryDate:
        item.category === "Medications"
          ? new Date(new Date().setFullYear(new Date().getFullYear() + 2))
              .toISOString()
              .split("T")[0]
          : undefined,
    };

    setSelectedItem(item);
  };

  // Handle book item in/out
  const handleBookItem = (item: InventoryItem) => {
    console.log("Book item in/out:", item);
    // In a real app, this would open a booking dialog or navigate to booking page
    handleViewItem(item); // For now, just show the item details
  };

  // Handle transfer item
  const handleTransferItem = (item: InventoryItem) => {
    console.log("Transfer item:", item);
    // In a real app, this would open a transfer dialog or navigate to transfer page
    handleViewItem(item); // For now, just show the item details
  };

  // Close item detail view
  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Inventory Search
          </h1>
          <p className="text-gray-500 mt-2">
            Search and filter inventory items across all departments
          </p>
        </div>

        {selectedItem ? (
          <div className="space-y-6">
            <ItemDetailView
              item={{
                id: selectedItem.id,
                name: selectedItem.name,
                category: selectedItem.category,
                department: selectedItem.department,
                currentQuantity: selectedItem.quantity,
                minThreshold:
                  selectedItem.status === "Low Stock"
                    ? selectedItem.quantity + 50
                    : selectedItem.quantity / 2,
                description: `${selectedItem.name} - ${selectedItem.category} for ${selectedItem.department} department`,
                lastUpdated: selectedItem.lastUpdated,
                status: selectedItem.status,
                location: `Storage Area ${selectedItem.id.charAt(0).toUpperCase()}`,
                serialNumber: `SN-${selectedItem.id}-${new Date().getFullYear()}`,
                manufacturer: "Hospital Supplies Inc.",
                purchaseDate: new Date(
                  new Date().setMonth(new Date().getMonth() - 3),
                )
                  .toISOString()
                  .split("T")[0],
                expiryDate:
                  selectedItem.category === "Medications"
                    ? new Date(
                        new Date().setFullYear(new Date().getFullYear() + 2),
                      )
                        .toISOString()
                        .split("T")[0]
                    : undefined,
              }}
              onClose={handleCloseDetail}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <SearchFilters
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />

            <SearchResults
              results={filteredItems}
              onViewItem={handleViewItem}
              onBookItem={handleBookItem}
              onTransferItem={handleTransferItem}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default SearchPage;
