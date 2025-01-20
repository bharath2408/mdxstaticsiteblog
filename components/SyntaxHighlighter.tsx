"use client";

import Prism from "prismjs";
import { useEffect } from "react";

// theme
import "prismjs/themes/prism-okaidia.css";

// languages
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-solidity";

// tools
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/toolbar/prism-toolbar.min.css";

export default function SyntaxHighlighter({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <div>{children}</div>;
}
