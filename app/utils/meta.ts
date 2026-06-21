type Props = {
  title: string;
  description?: string;
  isHomepage?: boolean;
};

export function createMeta({
  title,
  description = "Build your daily signing habit. Practice Singapore Sign Language (SgSL) with interactive tools designed for local learners.",
  isHomepage = false,
}: Props) {
  const fullTitle = isHomepage
    ? `DailyHands | ${title}`
    : `${title} | DailyHands`;

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
