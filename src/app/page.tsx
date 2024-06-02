import PlaygroundPage from "@/components/playground/playgroundPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
};

export default function Page() {
  return <PlaygroundPage />;
}
