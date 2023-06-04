import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function SettingsAppearancePage() {
	return (
		<div className="space-y-6">
			<Skeleton className="w-32 h-10"></Skeleton>
			<Skeleton className="w-86 h-5"></Skeleton>
			<Separator />
			<div>
				<Skeleton className="rounded-full h-10 w-32 my-2 "></Skeleton>
				<Skeleton className="h-10" />
			</div>
			<div className="space-y-1">
				<Skeleton className="rounded-full h-10 w-32"></Skeleton>
			</div>

			<Skeleton
				className={cn(
					"flex justify-center items-center flex-nowrap text-sm font-medium pointer-events-none w-32 h-10 rounded-full",
					"px-4 py-2"
				)}
			></Skeleton>
		</div>
	);
}
