import React from "react";
import { useNoteContext } from "./AllNotesContext";
import { Note } from "../model";
import "./style.css";
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
    <tr className="table_row">
      <td className="cell_icon">{categories[index].label}</td>
      <td>
        <h2 className="name">{categories[index].value}</h2>
      </td>
      <td>
        <p>{findSameCategory(allNotes)}</p>
      </td>
      <td>
        <p>{findSameCategory(archiveNotes)}</p>
      </td>
    </tr>
  );
};

export default CategoryComponent;
