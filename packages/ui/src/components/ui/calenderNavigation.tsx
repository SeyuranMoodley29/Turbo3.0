
import React, { useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuTrigger,
  } from "@repo/ui/components/ui/navigation-menu";

import Calendar from './calender';

function CalendarNavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenuItem
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavigationMenuTrigger>Calendar</NavigationMenuTrigger>
      {isOpen && <Calendar />}
    </NavigationMenuItem>
  );
}

export default CalendarNavigationMenu;;