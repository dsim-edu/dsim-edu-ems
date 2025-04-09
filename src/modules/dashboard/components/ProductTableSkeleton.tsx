import { Skeleton } from "@/components/ui/skeleton";

export function ProductTableSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-1">
      {Array.from({ length: count }).map((_, i) => {
        return <Skeleton key={i} className="h-16 w-full rounded" />;
      })}
    </div>
  );
}
