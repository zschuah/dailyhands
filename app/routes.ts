import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("under-construction", "routes/under-construction.tsx"),
] satisfies RouteConfig;
