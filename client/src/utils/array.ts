interface Item<T = any> {
  [key: string]: T;
}

interface ItemGroup<T> {
  [key: string]: T[];
}


export function groupByKey<T extends Item>(
  source: T[],
  key: keyof T

): ItemGroup<T> {
  return source.reduce<ItemGroup<T>>((result, sourceItem) => {
    const sourceKey = sourceItem[key];
    if(!result.hasOwnProperty(sourceKey)){
      result[sourceKey] = [];
    }
    result[sourceKey].push(sourceItem);
    return result
  }, {})

}

