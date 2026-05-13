// https://gist.github.com/penguinboy/762197
export const flattenObject = (ob: any) => {
  const toReturn = {} as any;

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] === 'object') {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[`${i}.${x}`] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export const createKeysForPlural = (keys: string[]): string[] => {
  const results = keys
    .map((key: string) => {
      if (key.endsWith('_one')) {
        return [key, key.substring(0, key.length - 4)];
      }
      if (key.endsWith('_other')) {
        return [key, key.substring(0, key.length - 6)];
      }
      return key;
    })
    .flat();
  return Array.from(new Set(results));
};
