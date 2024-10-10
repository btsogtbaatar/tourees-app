import * as yup from 'yup';
import i18n from '../../i18n';
import { TaskModel } from '../modules/Request/entities/request.model';
import { ProfileModel } from '../modules/Tasker/entities/profile.model';
import { TaskerModel } from '../modules/Tasker/entities/tasker.model';

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

  export const remarkSchema = yup.array();

  export const registerTaskerSchema: yup.ObjectSchema<ProfileModel.ProfileRequest> =
    yup.object({
      tagLine: yup
        .string()
        .required(i18n.t('userRequest.messages.addresses.required')),
      description: yup
        .string()
        .required(i18n.t('userRequest.messages.addresses.required')),
      educations: remarkSchema,
      specialities: remarkSchema,
      languages: remarkSchema,
      ranks: remarkSchema,
      files: remarkSchema,
      workingType: yup.string(),
    });

  export const remarkListSchema: yup.ObjectSchema<TaskerModel.RemarkRequest> =
    yup.object({
      remark: yup
        .string()
        .required(i18n.t('userRequest.messages.addresses.required')),
    });
}
