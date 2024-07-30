import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type Note = {
    icon: IconDefinition;
    name: string;
    created: Date;
    category: string;
    dates: string; 
    content: string;
  };