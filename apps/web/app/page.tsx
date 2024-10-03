"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@repo/ui/components/ui/navigation-menu";
import Calendar from "@repo/ui/components/ui/calender";
import { Accordion, AccordionItem } from "@repo/ui/components/ui/accordion";

// Define the interface for your data items
interface DataItem {
  id: number;       // Adjust the type according to your database
  title: string;
  date: string;     // If date is stored as a string; adjust if necessary
}

const options: string[] = ["Mr", "Mrs", "Miss"];

function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [data, setData] = useState<DataItem[]>([]); // Use DataItem interface

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSave = async () => {
    const dateString = selectedDate ? selectedDate.toISOString().split("T")[0] : null;

    const data = { title: selectedOption, date: dateString };

    try {
      const response = await fetch("http://localhost:5000/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data saved:", result);
      } else {
        console.error("Error saving data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data");
      if (response.ok) {
        const result: DataItem[] = await response.json(); // Specify the type here
        setData(result);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <NavigationMenu>
        <Accordion type="single">
          <AccordionItem title="Calendar" value="calendar">
            <Calendar onChange={handleDateChange} />
          </AccordionItem>
        </Accordion>

        <NavigationMenuItem
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="relative"
        >
          <NavigationMenuTrigger>Title</NavigationMenuTrigger>
          <NavigationMenuContent
            className={`absolute top-full bg-white shadow-lg transition-all duration-300 ${
              isOpen ? "max-h-[200px] p-4" : "max-h-0"
            }`}
            style={{
              width: "150px",
              overflow: "hidden",
              right: "20px",
              position: "absolute",
            }}
          >
            <ul className="text-center">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => setSelectedOption(option)}
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
        <input
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString() : ""}
          disabled
          placeholder="Selected Date"
          style={{ marginBottom: "1rem" }}
        />
        <input
          type="text"
          value={selectedOption}
          disabled
          placeholder="Selected Title"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save
        </button>

        {/* Update Button to Fetch Data */}
        <button
          onClick={handleFetchData}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>

        {/* Table to display fetched data */}
        <table style={{ marginTop: "1rem", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.id}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.title}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NavigationMenuDemo;
