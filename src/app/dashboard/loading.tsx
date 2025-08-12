import { Loading } from "@/components/ui/loading";
import { DashboardContent } from "@/components/dashboard/content";

export default function LoadingComponent() {
  return (
    <DashboardContent className="flex h-lvh items-center justify-center">
      <Loading size="md" />
    </DashboardContent>
  );
}
