import PendingButton from "@/components/PendingButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { redirect } from "next/navigation";

const NewPosting = () => {
	async function newPosting(formData: FormData) {
		"use server";
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const numberOfProfiles = formData.get("numberOfProfiles") as string;

		const doc = await addDoc(collection(db, "jobs"), {
			title: title,
			description: description,
			numberOfProfiles: numberOfProfiles,
			current: 0,
		});

		// send to python server to get profiles
		const response = await fetch(
			`http://localhost:5000?degree=&title=${title}&experience=&jobId=${doc.id}&n=${numberOfProfiles}`
		);

		// redirect to job page
		redirect(`/${doc.id}`);
	}

	return (
		<div className="p-20">
			<form
				action={newPosting}
				className="space-y-4 bg-violet-950 w-3/5 p-4 m-auto border-4 border-violet-300 rounded-lg text-white"
			>
				<h1 className="text-2xl font-bold">New Job Posting</h1>
				<div className="space-y-1">
					<label htmlFor="title" className="text-lg">
						Job Title
					</label>
					<Input name="title" required id="title" placeholder="Web Developer" />
				</div>

				<div className="space-y-1">
					<label htmlFor="description" className="text-lg">
						Job Description
					</label>
					<Textarea
						name="description"
						required
						className="min-h-lg"
						id="description"
						placeholder="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, aperiam consequatur sit cupiditate quibusdam, incidunt repellendus laboriosam facere reprehenderit, pariatur ducimus error tempora voluptatum vero autem et quod nobis ab modi eaque praesentium esse. Ut aut iure facere laboriosam quas."
					/>
				</div>

				<div className="space-y-1">
					<label htmlFor="numberOfProfiles" className="text-lg">
						Profiles to Retrieve
					</label>
					<Input
						name="numberOfProfiles"
						required
						type="number"
						min={1}
						id="numberOfProfiles"
						placeholder="10"
					/>
				</div>

				<PendingButton text="Create Job Posting" />
			</form>
		</div>
	);
};

export default NewPosting;
