import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projectsData } from "../../../data/projectsData";

export default defineTool({
  name: "get_project",
  title: "Get project details",
  description:
    "Get full details for a Lionvest Realty project by id, including address, amenities, images, and specifications.",
  inputSchema: {
    id: z.string().min(1).describe("Project id, e.g. 'aipl-joy-district'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const project = projectsData.find((p) => p.id === id);
    if (!project) {
      return {
        content: [{ type: "text", text: `No project found with id '${id}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
      structuredContent: { project },
    };
  },
});
