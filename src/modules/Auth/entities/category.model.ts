export declare module CategoryModule {
  export type Categories = {
    id: number;
    parent_id: number;
    code: string;
  };

  export type Category = {
    id: number;
    category_id: number;
    value: string;
    text: string;
    image: string;
  };
}
