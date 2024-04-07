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
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaCheck, FaChevronUp, FaXmark } from "react-icons/fa6";

const Saved = ({
	params,
	searchParams,
}: {
	params: { jobId: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	const experience = searchParams["experience"];
	const degree = searchParams["degree"];
	const skills = searchParams["skills"] as string;

	const [profiles, setProfiles] = useState([] as ProfileType[]);
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const unsub = onSnapshot(
			query(
				collection(db, `jobs/${params.jobId}/profiles`),
				where("bookmarked", "==", true)
			),
			(querySnapshot) => {
				const freshProfiles: Array<ProfileType> = [];

				querySnapshot.forEach((doc) => {
					freshProfiles.push({
						name: doc.data().name,
						school: doc.data().school,
						bookmarked: doc.data().bookmarked,
						degree: doc.data().degree,
						skills: doc.data().skills,
						experience: doc.data().experience,
						id: doc.id,
					});
				});

				console.log(freshProfiles);

				setProfiles(freshProfiles);

				setLoading(false);
			}
		);
	}, [experience, degree, skills]);

	return loading ? (
		<div className="w-full h-screen grid place-items-center">Loading...</div>
	) : current > profiles.length - 1 ? (
		<div className="w-full h-screen grid place-items-center">
			<div className="space-y-2">
				<div>You're out of profiles!</div>
				<button
					onClick={() => {
						updateDoc(doc(db, `jobs/${params.jobId}`), {
							current: 0,
						});
					}}
					className="flex space-x-2 items-center w-full justify-center bg-neutral-300/50 rounded-md p-2"
				>
					<FaChevronUp />
					<div>Restart</div>
				</button>
			</div>
		</div>
	) : (
		<div className="overflow-clip h-screen p-16 flex items-center justify-between">
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

			<div className="w-1/2 relative h-5/6 space-y-2">
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

export default Saved;
