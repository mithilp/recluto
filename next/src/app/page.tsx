import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const Home = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	const getData = async () => {
		const docs = await getDocs(collection(db, "jobs"));

		const postings = [] as any[];
		docs.forEach((doc) => {
			postings.push({ id: doc.id, ...doc.data() });
		});

		return postings;
	};

	const postings = await getData();

	return (
		<div className="p-20">
			<div className="space-y-4 max-w-lg m-auto">
				<div>
					<Link href="/new">
						<div className="border-4 border-violet-300 rounded-lg p-4">
							<div className="flex space-x-2 items-center">
								<FaPlus className="h-5 w-5" />
								<h2 className="text-2xl font-bold">Create New Job Posting</h2>
							</div>

							<p>
								Cleck here to enter in your posting title, job description, and
								how many profiles to gather. Then, let Recluto go to work!
							</p>
						</div>
					</Link>
				</div>
				{postings.map((posting) => (
					<div key={posting.id}>
						<Link href={`/${posting.id}`}>
							<div className="border-4 border-violet-300 rounded-lg p-4">
								<h2 className="text-2xl font-bold">{posting.title}</h2>
								<p>{posting.description}</p>
								<p>
									Progress: {posting.current}/{posting.numberOfProfiles} (
									{Math.floor(
										(posting.current * 100) / posting.numberOfProfiles
									)}
									%)
								</p>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
