type Props = {
  title: string;
  description?: string;
};

export function createMeta({
  title,
  description = "Practice SgSL here!",
}: Props) {
  return [
    { title: `DailyHands | ${title}` },
    { name: "description", content: description },
  ];
}
