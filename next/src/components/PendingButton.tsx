"use client";

import { useFormStatus } from "react-dom";

export default function PendingButton({ text }: { text: string }) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className="text-center w-full border-4 border-violet-300 rounded-md py-1 bg-white text-black"
			aria-disabled={pending}
		>
			{pending ? "Loading..." : text}
		</button>
	);
}
