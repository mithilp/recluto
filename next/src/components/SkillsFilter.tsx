"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import {
	FaBullseye,
	FaCalendar,
	FaGear,
	FaMailchimp,
	FaPerson,
	FaRocket,
	FaSearchengin,
} from "react-icons/fa6";
import { skills } from "@/lib/utils";

const SkillsFilter = ({
	selected,
	setSelected,
}: {
	selected: string[];
	setSelected: (selected: string[]) => void;
}) => {
	return (
		<div className="space-y-2">
			<div>
				{selected.map((skill, i) => (
					<Badge
						key={i}
						className="mr-2 mb-2 cursor-pointer"
						onClick={() => {
							const newSelected = selected.filter((item) => item != skill);
							setSelected(newSelected);
						}}
					>
						{skill}
					</Badge>
				))}
			</div>

			<Command className="rounded-lg border border-4 border-violet-300 shadow-md">
				<CommandInput placeholder="Search for a skill..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>

					<CommandGroup heading="Select a skill">
						{skills.map((skill, i) => (
							<CommandItem key={i} value={skill}>
								<FaBullseye className="mr-2 h-4 w-4" />
								<span
									className="cursor-pointer"
									onClick={() => {
										if (!selected.includes(skill)) {
											setSelected([...selected, skill]);
										}
									}}
								>
									{skill}
								</span>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	);
};

export default SkillsFilter;
