
export const convertArrayToKeyValuePair = (array: any[], key: string, value: string ) => {
    return array.reduce((result, obj) => {
      if (!result.hasOwnProperty(obj[key])) {
        result[obj[key]] = obj[value];
      }
      return result;
    }, {});
  };