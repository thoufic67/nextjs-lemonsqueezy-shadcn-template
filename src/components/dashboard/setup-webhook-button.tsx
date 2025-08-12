"use client";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { CheckIcon, WebhookIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { setupWebhook } from "@/app/actions";

export function SetupWebhookButton({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [activated, setActivated] = useState(false);

  let iconElement;
  if (loading) {
    iconElement = <Loading size="sm" className="size-4" />;
  } else if (!activated && !disabled) {
    iconElement = <WebhookIcon className="size-4" />;
  } else {
    iconElement = <CheckIcon className="size-4" />;
  }

  return (
    <Button
      disabled={disabled || loading || activated}
      className="flex items-center gap-2"
      onClick={async () => {
        setLoading(true);
        try {
          await setupWebhook();
          toast.success("Webhook set up successfully.");
        } catch (error) {
          // eslint-disable-next-line no-console -- allow
          console.error(error);
          toast("Error setting up a webhook.", {
            description:
              "Please check the server console for more information.",
          });
        } finally {
          setActivated(true);
          setLoading(false);
        }
      }}
    >
      {iconElement}
      Setup Webhook
    </Button>
  );
}
