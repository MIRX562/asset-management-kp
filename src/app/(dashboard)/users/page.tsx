import { getUserWithSession } from "@/actions/userAction";
import { DataTable } from "@/components/template/table/data-table";
import { userColumns } from "./components/columns";
import AddUserButton from "./components/addUserButton";

export default async function UserManagementPage() {
	const user = await getUserWithSession();
	return (
		<div className="flex flex-col w-full gap-4">
			<section className="flex items-center justify-center w-full">
				<DataTable
					columns={userColumns}
					data={user}
					insertDataComponent={<AddUserButton />}
				/>
			</section>
		</div>
	);
}
