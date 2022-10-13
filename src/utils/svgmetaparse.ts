/**
 * from a given svg string, get the used colors as a string (space separated list)
 * */
export function colorValuesString(svg: string) {
  const list = attributeValues(svg, ["stroke=", "fill=", "stop-color="]);
  //return list.filter((v) => !v.startsWith("url")).join(" ");

  return filter_not_some_startsWith(list, ["url", "none"]).join(" ");
}

/**
 * from a given svg string, get the used tag names as a string (space separated list)
 */
export function tagNamesString(svg: string) {
  const list = tagNames(svg);
  //return list.filter((str) => str !== "svg").join(" ");
  return filter_not_some_startsWith(list, ["svg"]).join(" ");
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
  //const regex = /\s(\w+?)="(.+?)"/g;
  const regex = /(\S+)\s*=\s*[\"']?((?:.(?![\"']?\s+(?:\S+)=|[>\"']))?[^\"']*)[\"']?/g;
  return str.match(regex);
}

function filter_not_some_startsWith(strings: string[], v: string[]) {
  return strings.filter((s) => !v.some((x) => s.startsWith(x)));
}

function filter_some_startsWith(strings: string[], v: string[]) {
  return strings.filter((s) => v.some((x) => s.startsWith(x)));
}

function withoutQuotes(str?: string) {
  return str?.replaceAll('"', "").replaceAll("'", "") || "";
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
  console.log({ attributes });
  if (!attributes) {
    return [];
  }

  //get relevant attributes
  const filtered = filter_some_startsWith(attributes, attrNames);

  console.log({ filtered });

  //get only value part. also remove quotes
  const values: string[] = [];
  for (const s of filtered) {
    const val = withoutQuotes(s.split("=")[1]);
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
    const v = s.split(" ");
    const val = v[0];

    if (val) {
      if (val.at(-1) === ">") {
        names.push(val.slice(0, -1));
      } else {
        names.push(val);
      }
    }
  }
  const namesWithoutLessThanSign = names.map((name) => name.slice(1));
  return unique(namesWithoutLessThanSign);
}
