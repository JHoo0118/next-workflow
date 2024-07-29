import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useModal } from "@/providers/ModalProvider";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  size?: ClassValue;
};

const CustomModal = ({
  children,
  subheading,
  title,
  defaultOpen,
  size,
}: Props) => {
  const { isOpen, setClose } = useModal();
  const handleClose = () => setClose();

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">{title}</DrawerTitle>
          <DrawerDescription
            className={cn(
              "text-center flex flex-col items-center gap-4 overflow-scroll",
              size ?? "h-96"
            )}
          >
            {subheading}
            {children}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col gap-4 bg-background border-t-[1px] border-t-muted">
          <DrawerClose>
            <Button variant="ghost" className="w-full" onClick={handleClose}>
              닫기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomModal;
