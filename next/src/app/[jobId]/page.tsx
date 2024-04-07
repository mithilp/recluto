"use client";

import Profile from "@/components/Profile";
import { db } from "@/lib/firebase";
import { Profile as ProfileType } from "@/lib/utils";
import {
	collection,
	doc,
	onSnapshot,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

const Tinder = ({
	params,
	searchParams,
}: {
	params: { jobId: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	const experience = searchParams["experience"];
	const degree = searchParams["degree"];
	const skills = searchParams["skills"];

	const [profiles, setProfiles] = useState([] as ProfileType[]);
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const unsubDoc = onSnapshot(doc(db, "jobs", params.jobId), (doc) => {
			const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
			console.log(doc.id);

			setCurrent(doc.data()!.current);
		});

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

				setProfiles(freshProfiles);

				setLoading(false);
			}
		);
	}, []);

	return loading ? (
		<div className="w-full h-screen grid place-items-center">Loading...</div>
	) : current > profiles.length - 1 ? (
		<div className="w-full h-screen grid place-items-center">
			You're out of profiles!
		</div>
	) : (
		<div className="overflow-clip h-screen p-20 flex items-center justify-between">
			<button
				onClick={() =>
					updateDoc(doc(db, `jobs/${params.jobId}`), {
						current: current + 1,
					})
				}
				className="p-4 bg-red-300 rounded-full grid place-items-center"
			>
				<FaXmark className="w-10 h-10" />
			</button>

			<div className="w-3/5 relative h-5/6 space-y-2">
				{current > 0 && profiles.length != 1 ? (
					<Profile
						goNext={() =>
							updateDoc(doc(db, `jobs/${params.jobId}`), {
								current: current + 1,
							})
						}
						jobId={params.jobId}
						profile={profiles[current - 1]}
						previous
					/>
				) : (
					""
				)}

				<Profile
					goNext={() =>
						updateDoc(doc(db, `jobs/${params.jobId}`), {
							current: current + 1,
						})
					}
					jobId={params.jobId}
					profile={profiles[current]}
				/>

				{current < profiles.length - 1 ? (
					<Profile
						goNext={() =>
							updateDoc(doc(db, `jobs/${params.jobId}`), {
								current: current + 1,
							})
						}
						jobId={params.jobId}
						profile={profiles[current + 1]}
						next
					/>
				) : (
					""
				)}
			</div>

			<button
				onClick={async () => {
					// send message to candidate

					await setDoc(
						doc(db, `jobs/${params.jobId}/messages/${profiles[current].id}`),
						{
							timestamp: serverTimestamp(),
							message: "Hello, I'm interested in your profile. Can we chat?",
							name: profiles[current].name,
						}
					);

					updateDoc(doc(db, `jobs/${params.jobId}`), {
						current: current + 1,
					});
				}}
				className="p-4 bg-green-300 rounded-full grid place-items-center"
			>
				<FaCheck className="w-10 h-10" />
			</button>
		</div>
	);
};

export default Tinder;
