import { defineArrayMember, defineField, defineType } from "sanity";
import { AsteriskIcon, ImageIcon, ImagesIcon, PlayIcon, StringIcon, UserIcon } from "@sanity/icons";

export default defineType({
	name: "client",
	type: "document",
	icon: UserIcon,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			// description
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			// description
			options: {
				source: "name",
			},
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Description",
			// description
		}),
		defineField({
			name: "startYear",
			type: "number",
			title: "Start Year",
			// description
		}),
		defineField({
			name: "isCurrent",
			type: "boolean",
			title: "Current client?",
			// description
			initialValue: false,
			options: {
				layout: "checkbox",
			},
		}),
		defineField({
			name: "endYear",
			type: "number",
			title: "End Year",
			// description
			hidden: ({document}) => document?.isCurrent as boolean,
		}),
		defineField({
			name: "location",
			type: "string",
			title: "Location",
			// description
		}),
		defineField({
			name: "whatTheyDo",
			type: "string",
			title: "What They Do",
			// description
		}),
		defineField({
			name: "url",
			type: "url",
			title: "URL",
			// description
		}),
		defineField({
			name: "bodyContent",
			type: "array",
			title: "Body",
			of: [
				defineArrayMember({
					name: "heading",
					type: "object",
					title: "Heading",
					icon: AsteriskIcon,
					fields: [
						defineField({
							name: "headingText",
							type: "string",
							title: "Heading Text",
							// description
						}),
					],
					preview: {
						select: {
							headingText: "headingText",
						},
						prepare(selection) {
							const {
								headingText,
							} = selection;
							return {
								title: headingText,
								subtitle: "Heading",
							};
						},
					},
				}),
				defineArrayMember({
					name: "paragraph",
					type: "object",
					title: "Paragraph",
					icon: StringIcon,
					fields: [
						defineField({
							name: "paragraphText",
							type: "text",
							title: "Paragraph Text",
							// description
						}),
					],
					preview: {
						select: {
							paragraphText: "paragraphText",
						},
						prepare(selection) {
							const {
								paragraphText,
							} = selection;
							return {
								title: paragraphText,
								subtitle: "Paragraph",
							};
						},
					},
				}),
				defineArrayMember({
					name: "imageSet",
					type: "object",
					title: "Image Set",
					icon: ImagesIcon,
					fields: [
						defineField({
							name: "images",
							type: "array",
							title: "Image(s)",
							// description
							of: [
								defineArrayMember({
									type: "image",
									icon: ImageIcon,
									options: {
										hotspot: true,
										storeOriginalFilename: false,
									},
									fields: [
										defineField({
											name: "caption",
											type: "text",
											title: "Caption",
											// description
										}),
									],
									preview: {
										select: {
											caption: "caption",
											asset: "asset",
										},
										prepare(selection) {
											const {
												caption,
												asset,
											} = selection;
											return {
												title: caption,
												media: asset,
											};
										},
									},
								}),
							],
						}),
					],
					preview: {
						select: {
							images: "images",
						},
						prepare(selection) {
							const {
								images = [],
							} = selection;
							return {
								title: `${images.length} Image${images.length === 1 ? "" : "s"}`,
								subtitle: "Image Set",
								media: images && images.length >= 1 && images[0].asset ? images[0].asset : null,
							};
						},
					},
				}),
				defineArrayMember({
					name: "video",
					type: "object",
					title: "Video",
					icon: PlayIcon,
					fields: [
						defineField({
							name: "url",
							type: "url",
							title: "URL",
							// description
						}),
						defineField({
							name: "caption",
							type: "text",
							title: "Caption",
							// description
						}),
					],
					preview: {
						select: {
							url: "url",
							caption: "caption",
						},
						prepare(selection) {
							const {
								url,
								caption,
							} = selection;
							return {
								title: caption || url,
								subtitle: "Video",
							};
						},
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			name: "name",
			description: "description",
		},
		prepare(selection) {
			const {
				name,
				description,
			} = selection;
			return {
				title: name,
				subtitle: description,
			};
		},
	},
});