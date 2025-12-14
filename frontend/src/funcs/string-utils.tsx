export function objectSnakeCaseToCamelCase(target: any): any {
  if (target === null) {
    return target;
  }

  if (target.constructor === Array) {
    const ret: any = [];
    target.forEach((value) => {
      ret.push(objectSnakeCaseToCamelCase(value));
    });
    return ret;
  } else if (typeof target === "object") {
    const ret: any = {};
    Object.keys(target).forEach((key) => {
      ret[snakeCaseToCamelCase(key)] = objectSnakeCaseToCamelCase(target[key]);
    });
    return ret;
  }
  return target;
}

export function snakeCaseToTitleCase(target: string): string {
  return target
    .split("_")
    .filter((x) => x.length > 0)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}

export function snakeCaseToCamelCase(target: string): string {
  if (/^\d+$/.test(target.replace(/[-_]/g, ""))) {
    return target; // Return the string as is if it contains only numbers
  }

  if (target[0] === "_") {
    target = target.slice(1); // Remove leading underscore
    return (
      target.charAt(0).toLowerCase() +
      target
        .slice(1)
        .replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase())
    );
  }
  return target
    .toLowerCase()
    .replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
}
