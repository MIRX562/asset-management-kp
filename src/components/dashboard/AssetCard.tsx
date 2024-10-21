import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AssetCard = ({ title, value }: { title: string; value: number }) => (
	<Card className="col-span-1">
		<CardHeader className="flex-row justify-between">
			<CardTitle className="text-base">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<p className="text-2xl font-bold">{value}</p>
		</CardContent>
	</Card>
);

export default AssetCard;
