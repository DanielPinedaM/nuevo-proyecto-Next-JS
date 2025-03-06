"use client";

/**
mensaje q se muestra cuando se arrastra archivo para subirlo */
export default function DragAndDrop() {
  return (
    <div className="border-2 rounded-lg border-white w-[92dvw] h-[92dvh] flex justify-center items-center opacity-60">
      <p className="text-2xl text-white">Suelta los archivos aquí...</p>
    </div>
  );
}
