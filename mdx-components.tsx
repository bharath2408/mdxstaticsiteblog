import type { MDXComponents } from "mdx/types";
import Alert from "./components/Alert";
import MDXImage from "./components/Image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Alert: Alert,
    img: MDXImage,
  };
}
