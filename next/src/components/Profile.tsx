import { Profile as ProfileType } from "@/lib/utils";
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const Profile = ({
	previous,
	next,
	profile,
}: {
	previous?: boolean;
	next?: boolean;
	profile: ProfileType;
}) => {
	return (
		<div
			className={`${
				previous
					? "absolute bottom-12 translate-y-neg-full"
					: next
					? "absolute top-24 translate-y-full"
					: ""
			} bg-violet-950 p-8 space-y-4 rounded-xl w-full h-full border-4 border-violet-300 shadow-lg text-white`}
		>
			<div className="flex justify-between items-center">
				<h1 className="text-5xl font-black">{profile.name}</h1>
				<button>
					{profile.bookmarked ? (
						<FaBookmark className="w-8 h-8" />
					) : (
						<FaRegBookmark className="w-8 h-8" />
					)}
				</button>
			</div>

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
						{profile.skills.slice(0, 3).map((skill) => (
							<li key={skill}>{skill}</li>
						))}
					</ol>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold">All Skills</h2>
				<div className="text-xl">{profile.skills.join(" • ")}</div>
			</div>
		</div>
	);
};

export default Profile;
