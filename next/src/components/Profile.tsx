import { db } from "@/lib/firebase";
import { Profile as ProfileType } from "@/lib/utils";
import { doc, updateDoc } from "firebase/firestore";
import { Lora } from "next/font/google";
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const lora = Lora({ subsets: ["latin"] });

const Profile = ({
	previous,
	next,
	profile,
	jobId,
	goNext,
}: {
	previous?: boolean;
	next?: boolean;
	profile: ProfileType;
	jobId: string;
	goNext: () => void;
}) => {
	const correctSkills: string[] =
		typeof profile.skills == "string"
			? profile.skills
					.split("[")[1]
					.split("]")[0]
					.split('",')
					.map((skill) => skill.replace('"', ""))
			: profile.skills;

	console.log(
		typeof profile.skills == "string" &&
			profile.skills
				.split("[")[1]
				.split("]")[0]
				.split('",')
				.map((skill) => skill.replace('"', ""))
				.map((skill) => skill.replace('"', ""))
				.map((skill) => skill.trim())
	);

	return (
		<div
			className={`${
				previous
					? "absolute bottom-12 translate-y-neg-full"
					: next
					? "absolute top-12 translate-y-full"
					: ""
			} bg-violet-950 p-8 space-y-4 rounded-xl w-full h-full border-4 border-violet-300 shadow-lg text-white`}
		>
			<div className="flex justify-between items-center">
				<h1 className={"text-4xl " + lora.className}>{profile.name}</h1>
				<button
					onClick={async () => {
						await updateDoc(doc(db, `jobs/${jobId}/profiles/${profile.id}`), {
							bookmarked: true,
						});
						goNext();
					}}
				>
					<FaRegBookmark className="w-8 h-8" />
				</button>
			</div>

			<div>{profile.experience} years of experience</div>

			<div>
				<h2 className="text-2xl font-bold">Education</h2>
				<div className="text-xl">
					{profile.school} &bull;{" "}
					{profile.degree == "hs"
						? "High school diploma or GED"
						: profile.degree == "associate"
						? "Some college or associate degree"
						: profile.degree == "bachelors"
						? "Bachelor's Degree"
						: profile.degree == "masters"
						? "Master's Degree"
						: "PhD"}
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold">Top Skills</h2>
				<div className="text-xl">
					<ol className="list-decimal ml-8">
						{correctSkills.slice(0, 3).map((skill) => (
							<li key={skill}>{skill}</li>
						))}
					</ol>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold">All Skills</h2>
				<div className="text-sm">{correctSkills.join(" • ")}</div>
			</div>
		</div>
	);
};

export default Profile;
