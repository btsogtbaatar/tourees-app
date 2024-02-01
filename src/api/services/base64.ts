import { Base64 } from 'js-base64';

const BaseEncryped = {
  btoa: (value: string) => {
    const output = Base64.encode(value);
    return output;
  },
  atob: (value: string) => {
    const output = Base64.decode(value);
    return output;
  },
};

export default BaseEncryped;
