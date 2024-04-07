"use client";

import { db } from "@/lib/firebase";
import { Message } from "@/lib/utils";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Leads = ({ params }: { params: { jobId: string } }) => {
	const [messages, setMessages] = useState([] as Message[]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const unsub = onSnapshot(
			query(collection(db, `jobs/${params.jobId}/messages`)),
			(querySnapshot) => {
				const freshMessages: Array<Message> = [];

				querySnapshot.forEach((doc) => {
					freshMessages.push({
						name: doc.data().name,
						message: doc.data().message,
						timestamp: doc.data().timestamp.toDate(),
						id: doc.id,
					});
				});

				setMessages(freshMessages);

				setLoading(false);
			}
		);
	}, []);

	return loading ? (
		<div className="w-full h-screen grid place-items-center">Loading...</div>
	) : (
		<div className="max-w-2xl m-auto space-y-4 h-full p-20">
			{messages.map((message, i) => (
				<div key={i} className="border-4 border-violet-300 p-4 rounded-xl">
					<h1 className="text-2xl">{message.name}</h1>
					<p>{message.timestamp.toLocaleString()}</p>
					<p>{message.message}</p>
				</div>
			))}
		</div>
	);
};

export default Leads;
