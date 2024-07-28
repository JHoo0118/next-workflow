"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Book } from "lucide-react";

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black ">
      {/* <span className="flex items-center rounded-full bg-muted px-4">
        <Search />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent"
        />
      </span> */}
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Book />
          </TooltipTrigger>
          <TooltipContent>
            <ul className="">
              <ol className="flex items-center">
                노드나 간선을 선택하고
                <div className="mx-1 flex items-center justify-center w-10 h-6 text-xs font-semibold text-white bg-gray-700 rounded-lg shadow-lg hover:bg-gray-800">
                  <ArrowLeft className="text-xs w-4 h-4" />
                </div>
                키를 누르시면 삭제할 수 있습니다.
              </ol>
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default InfoBar;
