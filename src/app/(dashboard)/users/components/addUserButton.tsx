import InsertDataDialog from "@/components/template/insertDataButton";
import React from "react";
import AddUserForm from "./form";

const AddUserButton = () => {
	return (
		<InsertDataDialog triggerButtonText="Add User">
			<AddUserForm />
		</InsertDataDialog>
	);
};

export default AddUserButton;
