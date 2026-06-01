import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/ProtectedRoute";

export async function loader({}: Route.LoaderArgs) {}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {}

export default function ProtectedRoute() {
  return <Outlet />;
}
