import { TaskerModel } from '../entities/tasker.model';

export const defaultMark: TaskerModel.RemarkItem[] = [
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
  {
    id: Date.now().toString(36) + Math.random().toString(36),
    label: 'test',
    show: true,
  },
  {
    id: Date.now().toString(36) + Math.random().toString(36),
    label: 't',
    show: true,
  },
  {
    id: Date.now().toString(36) + Math.random().toString(36),
    label: 'remark test hiij uzev.',
    show: true,
  },
  {
    id: Date.now().toString(36) + Math.random().toString(36),
    label: 'hi',
    show: true,
  },
];
