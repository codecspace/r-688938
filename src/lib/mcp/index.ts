import { defineMcp } from "@lovable.dev/mcp-js";
import listProjects from "./tools/list-projects";
import getProject from "./tools/get-project";
import searchProjects from "./tools/search-projects";

export default defineMcp({
  name: "lionvest-realty-mcp",
  title: "Lionvest Realty MCP",
  version: "0.1.0",
  instructions:
    "Tools for browsing Lionvest Realty's Gurgaon real estate projects. Use `list_projects` to see all listings, `search_projects` to filter by keyword, and `get_project` to fetch full details for a specific project id.",
  tools: [listProjects, getProject, searchProjects],
});
