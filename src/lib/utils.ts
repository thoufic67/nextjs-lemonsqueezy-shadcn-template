import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type SubscriptionStatusType } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price string from cents to dollars
 */
export function formatPrice(price: string | number): string {
  const priceNumber = typeof price === "string" ? parseInt(price, 10) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceNumber / 100);
}

/**
 * Format a date string for display
 */
export function formatDate(date: string | null | undefined): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Check if a subscription status is valid/active
 */
export function isValidSubscription(status: SubscriptionStatusType): boolean {
  return ["active", "on_trial", "paused"].includes(status);
}

/**
 * Get a unique result from an array, throw if not exactly one
 */
export function takeUniqueOrThrow<T>(items: T[]): T {
  if (items.length !== 1) {
    throw new Error(`Expected exactly one item, got ${items.length}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- We check the length above
  return items[0]!;
}
