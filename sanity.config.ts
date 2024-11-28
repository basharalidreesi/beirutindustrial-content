import { defineConfig } from "sanity";
import { StructureBuilder, structureTool } from "sanity/structure"
import { siteInfoIcon } from "./schemaTypes/siteInfo";
import { media, mediaAssetSource } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import "./custom.css";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["siteInfo", "media.tag"]);
const singletonListItem = (S: StructureBuilder, typeName: string, title?: string) => {
	return S.listItem().title(title || typeName).id(typeName).child(S.document().schemaType(typeName).documentId(typeName));
};

export default defineConfig({
	name: "default",
	title: "Beirut Industrial",

	projectId: "rojbzr18",
	dataset: "production",

	plugins: [
		structureTool({
			structure: (S) => {
				return S.list().title("Content").items([
					S.documentTypeListItem("client").title("Clients"),
					singletonListItem(S, "siteInfo", "Site").icon(siteInfoIcon),
				]);
			},
		}),
		media(),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
		templates: (templates) => {
			return templates.filter(({ schemaType }) => !singletonTypes.has(schemaType));
		},
	},

	document: {
		actions: (input, context) => {
			return singletonTypes.has(context.schemaType) ? input.filter(({ action }) => action && singletonActions.has(action)) : input;
		},
	},
	
	form: {
		image: {
			assetSources: previousAssetSources => {
				return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource);
			},
		},
	},
});