import PendingButton from "@/components/PendingButton";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const ProfilePage = () => {
	const linkAccount = async (formData: FormData) => {
		"use server";

		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		await setDoc(doc(db, "credentials", "user1"), {
			username: username,
			password: password,
		});
	};
	return (
		<form action={linkAccount} className="p-20 max-w-2xl m-auto space-y-4">
			<h1 className="text-4xl font-bold">Link your LinkedIn account</h1>

			<div className="space-y-1">
				<label htmlFor="username">LinkedIn Username</label>
				<Input id="username" placeholder="LinkedIn Username" />
			</div>

			<div className="space-y-1">
				<label htmlFor="username">LinkedIn Password</label>
				<Input id="username" type="password" placeholder="LinkedIn Password" />
			</div>

			<PendingButton text="Link Account" />
		</form>
	);
};

export default ProfilePage;
