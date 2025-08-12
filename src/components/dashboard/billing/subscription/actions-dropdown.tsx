"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loading } from "@/components/ui/loading";
import { MoreVerticalIcon } from "lucide-react";
import { useState } from "react";
import { type NewSubscription } from "@/db/schema";
import {
  cancelSub,
  pauseUserSubscription,
  unpauseUserSubscription,
  type getSubscriptionURLs,
} from "@/app/actions";
import { LemonSqueezyModalLink } from "./modal-link";

export function SubscriptionActionsDropdown({
  subscription,
  urls,
}: {
  subscription: NewSubscription;
  urls: Awaited<ReturnType<typeof getSubscriptionURLs>>;
}) {
  const [loading, setLoading] = useState(false);

  if (
    subscription.status === "expired" ||
    subscription.status === "cancelled" ||
    subscription.status === "unpaid"
  ) {
    return null;
  }

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/50">
          <Loading size="sm" />
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="data-[state=open]:bg-muted size-8"
          >
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" className="z-10" align="end">
          <DropdownMenuGroup>
            {!subscription.isPaused && (
              <DropdownMenuItem
                onClick={async () => {
                  setLoading(true);
                  await pauseUserSubscription(subscription.lemonSqueezyId).then(
                    () => {
                      setLoading(false);
                    },
                  );
                }}
              >
                Pause payments
              </DropdownMenuItem>
            )}

            {subscription.isPaused && (
              <DropdownMenuItem
                onClick={async () => {
                  setLoading(true);
                  await unpauseUserSubscription(
                    subscription.lemonSqueezyId,
                  ).then(() => {
                    setLoading(false);
                  });
                }}
              >
                Unpause payments
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <a href={urls.customer_portal}>Customer portal ↗</a>
            </DropdownMenuItem>

            <LemonSqueezyModalLink href={urls.update_payment_method}>
              Update payment method
            </LemonSqueezyModalLink>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={async () => {
                if (
                  // eslint-disable-next-line no-alert -- allow
                  confirm(
                    `Please confirm if you want to cancel your subscription.`,
                  )
                ) {
                  setLoading(true);
                  await cancelSub(subscription.lemonSqueezyId).then(() => {
                    setLoading(false);
                  });
                }
              }}
              className="text-destructive focus:text-destructive"
            >
              Cancel subscription
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
