import { RemarkModel } from '../entities/remark.mode';

export const defaultMark: RemarkModel.RemarkItem[] = [
  {
    id: Date.now().toString(36) + Math.random().toString(36),
    label: 'remark.test',
    show: true,
  },
  {
    id: Date.now().toString(36) + Math.random().toString(36),
    label: 'remark',
    show: true,
  },
];
