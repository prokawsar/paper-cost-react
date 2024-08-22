import { Icon } from "@iconify/react";
import { useEffect, useRef, useCallback } from "react";

interface ModalProps {
  children: React.ReactNode;
  center?: boolean;
  onClickBackdrop: () => void;
}

export default function Modal({
  children,
  center = true,
  onClickBackdrop,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const backDropHandler = useCallback(
    (e: MouseEvent) => {
      if (!modalRef?.current?.contains(e.target as Node)) {
        onClickBackdrop();
      }
    },
    [onClickBackdrop]
  );

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", backDropHandler);
    });
    return () => {
      window.removeEventListener("click", backDropHandler);
    };
  }, [backDropHandler]);

  return (
    <div className="absolute top-0 left-0 bg-black bg-opacity-40 flex h-full w-full items-center justify-center z-10">
      <div
        className={`bg-white p-2 rounded relative flex flex-col w-3/4 md:w-2/4`}
        ref={modalRef}
      >
        <button
          className="absolute top-0 right-0 p-[3px] rounded-full w-fit"
          onClick={() => onClickBackdrop()}
        >
          <Icon icon="majesticons:multiply" width="20px" />
        </button>

        {children}
      </div>
    </div>
  );
}
