import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteInfoIcon = CogIcon;

export default defineType({
	name: "siteInfo",
	type: "document",
	icon: siteInfoIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Site Title",
			// description
		}),
		defineField({
			name: "faqs",
			type: "array",
			title: "FAQs",
			// description
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							name: "question",
							type: "string",
							title: "Question",
							// description
						}),
						defineField({
							name: "answer",
							type: "text",
							title: "Answer",
							// description
						}),
					],
					preview: {
						select: {
							question: "question",
							answer: "answer",
						},
						prepare(selection) {
							const {
								question = "No question",
								answer = "No answer",
							} = selection;
							return {
								title: `Q: ${question} | A: ${answer}`,
							};
						},
					},
				}),
			],
		}),
	],
});