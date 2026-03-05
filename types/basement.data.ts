type ILink = {
  text: string;
  href: string;
  external?: boolean;
}

export interface IBasement {
  title: string;
  links: ILink[];
}