import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("under-construction", "routes/under-construction.tsx"),

  layout("layouts/ProtectedRoute.tsx", []),
] satisfies RouteConfig;
