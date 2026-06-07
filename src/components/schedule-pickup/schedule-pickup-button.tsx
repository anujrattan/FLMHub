"use client";

import { Calendar } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

import { useSchedulePickup } from "./schedule-pickup-provider";

export function SchedulePickupButton({
  className,
  size = "lg",
  onClick,
  ...props
}: ButtonProps) {
  const { openModal } = useSchedulePickup();

  return (
    <Button
      type="button"
      size={size}
      className={className}
      onClick={(event) => {
        openModal();
        onClick?.(event);
      }}
      {...props}
    >
      <Calendar className="h-4 w-4" />
      Schedule Pickup
    </Button>
  );
}
