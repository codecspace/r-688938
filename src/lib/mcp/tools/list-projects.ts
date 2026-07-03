import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projectsData } from "../../../data/projectsData";

export default defineTool({
  name: "list_projects",
  title: "List real estate projects",
  description:
    "List all Lionvest Realty real estate projects with id, name, developer, location, and short description.",
  inputSchema: {
    featuredOnly: z
      .boolean()
      .optional()
      .describe("If true, return only featured projects."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ featuredOnly }) => {
    const items = projectsData
      .filter((p) => (featuredOnly ? p.isFeatured : true))
      .map((p) => ({
        id: p.id,
        propertyName: p.propertyName,
        developerName: p.developerName,
        location: p.location,
        description: p.description,
        isNew: !!p.isNew,
        isFeatured: !!p.isFeatured,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { projects: items },
    };
  },
});
