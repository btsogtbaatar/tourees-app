export declare namespace TaskerModel {
  export interface RemarkItem {
    id: string;
    label: string;
    show?: boolean;
  }

  export interface TaskerRequest {
    tag: string;
    description: string;
    education: string[];
    specialities: string[];
    languages: string[];
    transportation: string[];
  }

  export interface RemarkRequest {
    remark: string;
  }
}
