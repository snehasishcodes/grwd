import { cn } from "@/lib/utils";

export default function Timeline({ }) {
    return (
        <div className="h-full w-full flex flex-row flex-nowrap justify-start items-center gap-0 overflow-x-scroll">
            <TimelineBlock /><TimelineBlock /><TimelineBlock /><TimelineBlock /><TimelineBlock /><TimelineBlock />
        </div>
    )
}

export function TimelineBlock({ }) {
    return (
        <div className="h-full w-full min-w-[40%] max-w-[40%] md:min-w-[20%] md:max-w-[20%] flex flex-col gap-4 justify-start items-center">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-sm">22 december</h2>
                <h3 className="text-gray-500 text-xs">2024</h3>
            </div>
            <div className={cn(
                "w-full h-full flex flex-col items-center border-t border-r overflow-y-hidden",
                "justify-start"
            )
            }>
                xd
            </div>
        </div>
    )
}