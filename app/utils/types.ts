export type SignProps = {
  id: string;
  name: string;
  images: {
    imageAnimated: string;
    imageStatic: string;
  };
  edited_at?: string | Date;
  tags?: string[];
};
