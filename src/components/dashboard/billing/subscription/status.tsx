import { Badge } from "@/components/ui/badge";
import { type SubscriptionStatusType } from "@/types/types";
import { cn } from "@/lib/utils";

export function SubscriptionStatus({
  status,
  statusFormatted,
  isPaused,
}: {
  status: SubscriptionStatusType;
  statusFormatted: string;
  isPaused?: boolean;
}) {
  const statusColor: Record<SubscriptionStatusType, string> = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    cancelled: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    expired: "bg-red-100 text-red-800 hover:bg-red-100",
    past_due: "bg-red-100 text-red-800 hover:bg-red-100",
    on_trial: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    unpaid: "bg-red-100 text-red-800 hover:bg-red-100",
    pause: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    paused: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  };

  const _status = isPaused ? "paused" : status;
  const _statusFormatted = isPaused ? "Paused" : statusFormatted;

  return (
    <>
      {status !== "cancelled" && (
        <span className="text-muted-foreground">&bull;</span>
      )}

      <Badge
        className={cn("rounded-sm px-1 py-0 text-sm", statusColor[_status])}
      >
        {_statusFormatted}
      </Badge>
    </>
  );
}
