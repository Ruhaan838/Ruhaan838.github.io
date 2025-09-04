import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root to /about so the header's home icon (about) matches content
  redirect("/about");
}
