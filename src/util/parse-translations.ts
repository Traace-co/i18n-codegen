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

export const createKeysForPlural = (keys: string[]) => {
  const results =  keys.map((key) => {
    if(key.includes('_one')) {
      return [key, key.substr(0, key.length - 4)];
    }
    if(key.includes('_other')) {
        return [key, key.substr(0, key.length - 6)];
    }
    return key
  }).flat() as string[]
  return Array.from(new Set(results))
}
