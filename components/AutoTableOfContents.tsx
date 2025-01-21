import React, { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const AutoTableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all headings in the document
    const elements: NodeListOf<HTMLHeadingElement> = document.querySelectorAll(
      "h1, h2, h3, h4, h5, h6"
    );
    const headingElements: HTMLHeadingElement[] = Array.from(elements);

    // Convert heading elements to structured data
    const extractedHeadings: Heading[] = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName.replace("H", ""), 10),
    }));

    setHeadings(extractedHeadings);

    // Set up intersection observer for active heading highlighting
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target.id);
          setActiveId(entry.target.id);
        }
      });
    };

    const observer: IntersectionObserver = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px -60% 0px",
    });

    headingElements.forEach((element) => {
      if (element.id) {
        observer.observe(element);
      }
    });

    return () => {
      headingElements.forEach((element) => {
        if (element.id) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ): void => {
    e.preventDefault();
    const element: HTMLElement | null = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  // Find minimum heading level to properly indent
  const minLevel: number = Math.min(...headings.map((h) => h.level));

  return (
    <nav
      className="w-64 p-4 sticky top-4 max-h-screen overflow-y-auto"
      aria-label="Table of contents"
    >
      <div className="border rounded-lg bg-white shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Contents</h2>
        <ul className="space-y-2">
          {headings.map((heading, index) => {
            const indent: number = (heading.level - minLevel) * 4;

            return (
              <li
                key={`${heading.id}-${index}`}
                className={`ml-${indent}`}
                style={{ marginLeft: `${indent * 0.25}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`
                    block py-1 text-sm transition-colors duration-200
                    hover:text-blue-600
                    ${
                      activeId === heading.id
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }
                  `}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default AutoTableOfContents;
