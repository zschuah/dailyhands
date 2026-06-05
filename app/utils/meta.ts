type Props = {
  title: string;
  description?: string;
};

export function createMeta({
  title,
  description = "Practice SgSL here!",
}: Props) {
  const fullTitle = `DailyHands | ${title}`;

  return [
    { title: fullTitle },
    { name: "description", content: description },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:image", content: "/waving.png" },
  ];
}
