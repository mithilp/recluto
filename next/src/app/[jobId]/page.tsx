"use client";

import Profile from "@/components/Profile";
import { db } from "@/lib/firebase";
import { Profile as ProfileType } from "@/lib/utils";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaCheck, FaXmark } from "react-icons/fa6";

const Tinder = ({ params }: { params: { jobId: string } }) => {
	const [profiles, setProfiles] = useState([] as ProfileType[]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsub = onSnapshot(
			query(collection(db, `jobs/${params.jobId}/profiles`)),
			(querySnapshot) => {
				const freshProfiles: Array<ProfileType> = [];

				querySnapshot.forEach((doc) => {
					freshProfiles.push({
						name: doc.data().name,
						school: doc.data().school,
						bookmarked: doc.data().bookmarked,
						degree: doc.data().degree,
						skills: doc.data().skills,
						id: doc.id,
					});
				});

				console.log(freshProfiles);

				setProfiles(freshProfiles);

				setLoading(false);
			}
		);
	}, []);

	const [current, setCurrent] = useState(0);

	return loading ? (
		"Loading..."
	) : (
		<div className="overflow-clip h-screen p-20 flex items-center justify-between">
			<button className="p-4 bg-red-300 rounded-full grid place-items-center">
				<FaXmark className="w-10 h-10" />
			</button>

			<div className="w-3/5 relative h-5/6 space-y-2">
				<div className="text-center">
					{current != 0 && (
						<button
							className="bg-neutral-300/50 rounded-lg w-full py-2"
							onClick={() => setCurrent(current - 1)}
						>
							<FaArrowUp className="m-auto" />
						</button>
					)}
				</div>

				{current > 0 && profiles.length != 1 ? (
					<Profile profile={profiles[current - 1]} previous />
				) : (
					""
				)}

				<Profile profile={profiles[current]} />

				{current < profiles.length - 1 ? (
					<Profile profile={profiles[current + 1]} next />
				) : (
					""
				)}

				<div className="text-center">
					{current != profiles.length - 1 && (
						<button
							className="bg-neutral-300/50 rounded-lg w-full py-2"
							onClick={() => setCurrent(current + 1)}
						>
							<FaArrowDown className="m-auto" />
						</button>
					)}
				</div>
			</div>

			<button className="p-4 bg-green-300 rounded-full grid place-items-center">
				<FaCheck className="w-10 h-10" />
			</button>
		</div>
	);
};

export default Tinder;
