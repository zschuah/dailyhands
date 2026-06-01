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

  // API
  route("api/verify-konami", "api/verify-konami.ts"),
] satisfies RouteConfig;
