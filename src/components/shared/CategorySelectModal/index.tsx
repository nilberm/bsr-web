import React, { useState } from "react";

import { Category, useCategories } from "@/hooks/Categories/useCategories";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

interface CategorySelectModalProps {
  type: "income" | "expense";
  value?: string;
  onChange: (categoryId: string) => void;
}

export const CategorySelectModal: React.FC<CategorySelectModalProps> = ({
  type,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const { data: categories, isLoading } = useCategories(type);

  const selectedCategory = categories?.find((c) => c.id === value);

  const handleSelect = (category: Category) => {
    onChange(category.id);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {selectedCategory ? selectedCategory.name : "Select category"}
      </Button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width="w-full max-w-md"
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Choose a category</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid gap-2 max-h-[300px] overflow-y-auto">
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={category.id === value ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleSelect(category)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
