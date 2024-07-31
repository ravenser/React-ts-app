import React from "react";
import { useNoteContext } from "./AllNotesContext.tsx";
import CategoryComponent from "./CategoryComponent.tsx";
const CategoryList: React.FC = () => {
  const { categories } = useNoteContext();
  return (
    <>
      {categories.map((_, i) => (
        <CategoryComponent key={i} index={i} />
      ))}
    </>
  );
};

export default CategoryList;
