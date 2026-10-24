import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JalDrishti 2.0 – Smart Water Intelligence" },
      { name: "description", content: "JalDrishti 2.0: smart water monitoring, alerts and analytics dashboard." },
      { property: "og:title", content: "JalDrishti 2.0 – Smart Water Intelligence" },
      { property: "og:description", content: "Smart water monitoring, alerts and analytics dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/jaldrishti.html"
      title="JalDrishti 2.0"
      className="fixed inset-0 h-screen w-screen border-0"
    />
  );
}
