export type SignProps = {
  id: string;
  name: string;
  images: {
    imageAnimated: string;
    imageStatic: string;
  };
  link: string;
  tags?: string[];
};
