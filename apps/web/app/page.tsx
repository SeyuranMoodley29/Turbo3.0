"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@repo/ui/components/ui/navigation-menu";

import Calendar from "@repo/ui/components/ui/calender"; // Import Calendar component
import { Accordion, AccordionItem } from "@repo/ui/components/ui/accordion"; // Import Accordion components

const options: string[] = ["Mr", "Mrs", "Miss"];

function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Initially empty string
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Initially null for no selected date

  // Handle date selection
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); // Update selected date
  };

  return (
    <div>
      <NavigationMenu>
        {/* Calendar Menu Item (Accordion) */}
        <Accordion type="single">
          <AccordionItem title="Calendar" value="calendar">
            <Calendar onChange={handleDateChange} /> 
            {/* Pass handleDateChange function */}
          </AccordionItem>
        </Accordion>

        {/* Title Dropdown (Mr/Mrs/Miss) */}
        <NavigationMenuItem
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="relative" // Ensure parent container is relative for positioning
        >
          <NavigationMenuTrigger>Title</NavigationMenuTrigger>
          <NavigationMenuContent
            className={`absolute top-full bg-white shadow-lg transition-all duration-300 ${
              isOpen ? "max-h-[200px] p-4" : "max-h-0"
            }`}
            style={{
              width: "150px",
              overflow: "hidden",
              right: "20px", // Move dropdown to the right
              position: "absolute", 
            }}
          >
            <ul className="text-center">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => setSelectedOption(option)} // Set selected option
                  style={{ cursor: "pointer", padding: "0.5rem 0" }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>

      <div
        style={{
          marginTop: "5rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "1rem",
          backgroundColor: "red",
        }}
      >
        {/* Input box for displaying selected date */}
        <input
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString() : ""}
          disabled
          placeholder="Selected Date"
          style={{ marginBottom: "1rem" }}
        />

        {/* Input box for displaying selected title option */}
        <input
          type="text"
          value={selectedOption} // Display the selected title option here
          disabled
          placeholder="Selected Title" // Optional placeholder
        />
      </div>
    </div>
  );
}

export default NavigationMenuDemo;
