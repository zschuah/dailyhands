import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("under-construction", "routes/under-construction.tsx"),
  route("error", "routes/error.tsx"),

  // Protected routes
  layout("layouts/ProtectedRoute.tsx", [
    index("routes/home.tsx"),
    route("bank", "routes/bank.tsx"),
  ]),

  // User functions
  route("api/verify-konami", "api/verify-konami.ts"),
] satisfies RouteConfig;
