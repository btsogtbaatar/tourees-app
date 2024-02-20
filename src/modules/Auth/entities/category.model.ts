export declare module CategoryModule {
  export type Categories = {
    id: number;
    name: string;
    title: string;
    image_url: string;
    description: string;
  };

  export type Category = {
    id: number;
    category_id: number;
    value: string;
    text: string;
    image: string;
  };
}
