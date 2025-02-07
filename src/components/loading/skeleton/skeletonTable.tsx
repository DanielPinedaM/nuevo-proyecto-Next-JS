import { Skeleton } from "primereact/skeleton";

export default function SkeletonTable() {
  const items = Array.from({ length: 24 });

  return (
    <div className="grid gap-2 xl:grid-cols-4 cursor-wait">
      {items.map((_, i: number) => (
        <Skeleton key={i} height="28px" className="rounded-md"></Skeleton>
      ))}
    </div>
  );
}
