import React from "react";
import { useNoteContext } from "./AllNotesContext";
import { Note } from "../model";

interface CategoryProps {
  index: number;
}

const CategoryComponent: React.FC<CategoryProps> = ({ index }) => {
  const { categories, allNotes, archiveNotes } = useNoteContext();
  const findSameCategory = (arrayOfObjects: Note[]): number =>
    arrayOfObjects.filter(
      (object: Note) => categories[index].value === object.category,
    ).length;

  return (
    <tr>
      <td>{categories[index].label}</td>
      <td>{categories[index].value}</td>
      <td>{findSameCategory(allNotes)}</td>
      <td>{findSameCategory(archiveNotes)}</td>
    </tr>
  );
};

export default CategoryComponent;
