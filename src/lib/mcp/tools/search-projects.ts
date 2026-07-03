import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projectsData } from "../../../data/projectsData";

export default defineTool({
  name: "search_projects",
  title: "Search projects",
  description:
    "Search Lionvest Realty projects by free-text query against name, developer, location, and description.",
  inputSchema: {
    query: z.string().min(1).describe("Search text, e.g. 'Sector 88' or 'AIPL'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query.toLowerCase();
    const items = projectsData
      .filter((p) =>
        [p.propertyName, p.developerName, p.location, p.description, p.fullAddress]
          .filter(Boolean)
          .some((f) => (f as string).toLowerCase().includes(q)),
      )
      .map((p) => ({
        id: p.id,
        propertyName: p.propertyName,
        developerName: p.developerName,
        location: p.location,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { results: items, count: items.length },
    };
  },
});
