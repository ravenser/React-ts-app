import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faAppleAlt,
  faBeer,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

interface IconOption {
  value: IconDefinition;
  label: React.ReactNode;
}

interface IconDropdownProps {
  selectedIcon: IconDefinition;
  onChange: (icon: IconDefinition) => void;
}

const IconDropdown: React.FC<IconDropdownProps> = ({
  selectedIcon,
  onChange,
}) => {
  const icons: IconOption[] = [
    { value: faCartShopping, label: <FontAwesomeIcon icon={faCartShopping} /> },
    { value: faCoffee, label: <FontAwesomeIcon icon={faCoffee} /> },
    { value: faAppleAlt, label: <FontAwesomeIcon icon={faAppleAlt} /> },
    { value: faBeer, label: <FontAwesomeIcon icon={faBeer} /> },
  ];

  return (
    <Select
      options={icons}
      value={icons.find((icon) => icon.value === selectedIcon)}
      onChange={(selectedOption) => {
        if (selectedOption && selectedOption.value) {
          onChange(selectedOption.value);
        }
      }}
    />
  );
};

export default IconDropdown;
