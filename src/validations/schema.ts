import * as yup from 'yup';
import i18n from '../../i18n';
import { TaskModel } from '../modules/Request/entities/request.model';

export module TaskSchema {
  export const subCategorySchema = yup
    .object({
      id: yup.number().required(),
    })
    .required();

  export const addressDetailSchema = yup.object({
    unit: yup.string(),
    floor: yup.string(),
    apartment: yup.string(),
  });
  export const taskRequestSchema: yup.ObjectSchema<TaskModel.TaskRequest> =
    yup.object({
      description: yup
        .string()
        .required(i18n.t('userRequest.messages.description.required')),
      subCategory: subCategorySchema,
      files: yup
        .array()
        .min(1)
        .required(i18n.t('userRequest.messages.files.required')),
      timeRange: yup
        .object({
          start: yup.date().required(),
          end: yup.date().required(),
        })
        .required(),
      addresses: yup
        .array()
        .min(2)
        .required(i18n.t('userRequest.messages.addresses.required')),
    });
}
