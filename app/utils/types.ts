export type SignProps = {
  id: string;
  name: string;
  images: {
    imageAnimated: string;
    imageStatic: string;
  };
  tags?: string[];
};
