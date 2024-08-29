import { Icon } from "@iconify/react";
import { useLoadingStore } from "@/store/index";

export default function GlobalLoader() {
  const { isLoading } = useLoadingStore();

  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm">
          <Icon icon="ei:spinner-3" width="44px" className="animate-spin" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
