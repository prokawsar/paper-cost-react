import { useLoadingStore } from "@store/index";

export default function GlobalLoader() {
  const { isLoading } = useLoadingStore();

  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm">
          Loading...
        </div>
      ) : (
        ""
      )}
    </>
  );
}
