import { Skeleton } from "primereact/skeleton";

export default function SkeletonCards() {
  const items = Array.from({ length: 10 });

  return (
    <div className="cursor-wait grid gap-4 grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 3xl:grid-cols-7">
      {items.map((_, i: number) => (
        <Skeleton key={i} height="97px" className="rounded-md"></Skeleton>
      ))}
    </div>
  );
}
