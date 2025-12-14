import { DOCUMENT_TITLES } from ".././static";

export function parseCookies(): Record<string, string> {
  const cookies: Record<string, string> = {};
  const pairs = document.cookie.split(";");
  if (pairs.length > 0) {
    pairs.forEach((pair: string) => {
      const [name, value] = pair.split("=");
      cookies[name.trim()] = value.trim();
    });
  }

  return cookies;
}

export const setDocumentTitle = (): void => {
  let pageTitle = "Not Found";
  const pathname = window?.location?.pathname ?? "";

  if (pathname == "/") {
    pageTitle = "";
  } else {
    pageTitle = "Not Found";
    for (const title in DOCUMENT_TITLES) {
      const titlePath = DOCUMENT_TITLES[title];
      if (pathname.includes(titlePath)) {
        pageTitle = title;
        break;
      }
    }
  }

  document.title = getPageTitle(pageTitle);
};

export const getPageTitle = (name: string): string => {
  return name.length === 0
    ? "Starcraft II Improved Ladder"
    : `${name} | Starcraft II Improved Ladder`;
};
