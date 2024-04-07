"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import { Input } from "./ui/input";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import SkillsFilter from "./SkillsFilter";
import {
	FaBolt,
	FaBookmark,
	FaClockRotateLeft,
	FaFilter,
	FaUser,
} from "react-icons/fa6";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const Sidebar = () => {
	const router = useRouter();
	const pathname = usePathname();

	const [years, setYears] = useState(5);
	const [degree, setDegree] = useState("");
	const [skills, setSkills] = useState([] as string[]);

	const update = useCallback(
		(filter: string, value: number | string | string[]) => {
			if (filter == "experience") {
				setYears(value as number);
				router.push(
					`${pathname}?years=${value}&degree=${degree}&&skills=${skills.join(
						","
					)}`
				);
			} else if (filter == "degree") {
				setDegree(value as string);
				router.push(
					`${pathname}?years=${degree}&degree=${value}&&skills=${skills.join(
						","
					)}`
				);
			} else {
				setSkills(value as string[]);
				router.push(
					`${pathname}?years=${years}&degree=${degree}&&skills=${(
						value as string[]
					).join(",")}`
				);
			}
		},
		[years, degree, skills, pathname]
	);

	return (
		<div className="w-1/4 p-8 text-white bg-violet-950 flex flex-col justify-between">
			<div className="space-y-8">
				<Image src={Logo} alt="Recluto" width={200} />
				<div className="space-y-4">
					<div>
						<Link href="/leads" className="flex space-x-4 items-center">
							<FaBolt className="h-6 w-6" />
							<div className="text-2xl">Live leads</div>
						</Link>
					</div>
					<Accordion type="single" collapsible>
						<AccordionItem value="filters">
							<AccordionTrigger>
								<div className="flex space-x-4 items-center">
									<FaFilter className="h-6 w-6" />
									<div className="text-2xl">Filter by</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<ScrollArea className="h-80 pt-4">
									<div className="space-y-4">
										<div className="space-y-2">
											<div className="text-lg">
												Years of Experience: {years}
											</div>
											<Slider
												value={[years]}
												onValueChange={(value) => {
													update("experience", value[0]);
												}}
												max={20}
												step={1}
											/>
											<div className="flex justify-between">
												<span>1</span>
												<span>10</span>
												<span>20+</span>
											</div>
										</div>

										<Select
											value={degree}
											onValueChange={(val) => {
												update("degree", val);
											}}
										>
											<SelectTrigger>
												<SelectValue placeholder="Degree" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="hs">
													High school diploma or GED
												</SelectItem>
												<SelectItem value="associate">
													Some college or associate degree
												</SelectItem>
												<SelectItem value="bachelors">
													Bachelor's degree
												</SelectItem>
												<SelectItem value="masters">Master's degree</SelectItem>
												<SelectItem value="doctorate">
													Doctorate or professional degree
												</SelectItem>
											</SelectContent>
										</Select>

										<div>
											<SkillsFilter
												selected={skills}
												setSelected={(e) => {
													update("skills", e);
												}}
											/>
										</div>
									</div>
								</ScrollArea>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<div>
						<Link href="/saved" className="flex space-x-4 items-center">
							<FaBookmark className="w-6 h-6" />
							<div className="text-2xl "> Saved profiles</div>
						</Link>
					</div>
					<div>
						<Link href="/history" className="flex space-x-4 items-center">
							<FaClockRotateLeft className="w-6 h-6" />
							<div className="text-2xl">History</div>
						</Link>
					</div>
				</div>
			</div>
			<div className="space-y-4">
				<div>
					<Link href="/profile" className="space-x-4 flex items-center">
						<FaUser className="w-6 h-6" />
						<div className="text-2xl">Profile</div>
					</Link>
				</div>
				<div className="text-violet-300 text-sm">
					© 2024 Recluto Labs. All rights reserved.
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
