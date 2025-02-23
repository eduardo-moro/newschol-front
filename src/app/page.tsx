import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Home() {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <h1 className="text-2xl">hello!</h1>
          </TooltipTrigger>

          <TooltipContent>
            <p>World!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>  
  );
}
