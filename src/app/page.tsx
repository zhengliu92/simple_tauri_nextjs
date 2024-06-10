import CardPage from "@/components/card/card";
import PlaygroundPage from "@/components/playground/playgroundPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
};

export default function Page() {
  // return <PlaygroundPage />;
  return <CardPage />;
}
