export type Param = string | string[] | undefined;

export function stringFromParam(param: Param) {
  return typeof param === "string" ? param : param?.[0];
}
