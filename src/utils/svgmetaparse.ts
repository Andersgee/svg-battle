/**
 * from a given svg string, get the used colors as a string (space separated list)
 * */
export function colorValuesString(svg: string) {
  const list = attributeValues(svg, ["stroke", "fill", "stop-color"]);
  return list.join(" ");
}

/**
 * from a given svg string, get the used tag names as a string (space separated list)
 */
export function tagNamesString(svg: string) {
  const list = tagNames(svg);
  return list.join(" ");
}

///////////////////
// utils

/**
 * regex on svg string to split into attributes
 * ```js
 * [' width="10"', ' height="10"', ' fill="green"', ' cx="10"', ' stroke="#f00"']
 * ```
 */
function attributesArray(str: string) {
  const regex = /\s(\w+?)="(.+?)"/g;
  return str.match(regex);
}

/**
 * extract attribute values from svg string
 *
 * for svg colors, use
 * ```
 * attrNames = ["fill", "stroke"];
 * ```
 */
function attributeValues(str: string, attrNames: string[]) {
  const attributes = attributesArray(str);
  if (!attributes) {
    return [];
  }

  //get relevant attributes
  const filtered = attributes.filter((attr) => attrNames.some((keyword) => attr.startsWith(` ${keyword}`)));

  //get only value part. also remove quotes
  const values: string[] = [];
  for (const s of filtered) {
    const val = s.split("=")[1]?.replaceAll('"', "");
    if (val) values.push(val);
  }

  return unique(values);
}

function unique(v: string[]) {
  return Array.from(new Set(v));
}

function tagsArray(str: string) {
  const regex = /<(\w+)[^>]*>/g;
  return str.match(regex);
}

function tagNames(str: string) {
  const tags = tagsArray(str);
  if (!tags) {
    return [];
  }

  const names: string[] = [];
  for (const s of tags) {
    const val = s.split(" ")[0];
    if (val) names.push(val);
  }
  const namesWithoutLessThanSign = names.map((name) => name.slice(1));
  return unique(namesWithoutLessThanSign);
}
