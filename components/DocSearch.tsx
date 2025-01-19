"use client";

import { IPost, posts } from "@/posts";
import _ from "lodash";
import { ArrowRight, Command, FileText, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DocSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [results, setResults] = useState<IPost[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Search logic with debounce
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchResults = posts.filter((doc) => {
      const searchable = `${doc.title.toLowerCase()}  ${doc.category.toLowerCase()}`;
      return searchable.includes(searchQuery.toLowerCase());
    });

    setResults(searchResults);
    setSelectedIndex(0);
  };

  const debouncedSearch = _.debounce(performSearch, 300);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  // Scroll selected item into view
  useEffect(() => {
    if (results.length > 0) {
      const selectedElement = resultRefs.current[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex, results.length]);

  // Reset refs array when results change
  useEffect(() => {
    resultRefs.current = resultRefs.current.slice(0, results.length);
  }, [results]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(
            (prev) => (prev - 1 + results.length) % results.length
          );
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            window.location.href = results[selectedIndex].slug;
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Ref callback for result items
  const setResultRef =
    (index: number) => (element: HTMLAnchorElement | null) => {
      resultRefs.current[index] = element;
    };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full md:min-w-[250px] flex items-center gap-2 px-4 py-2 text-sm text-gray-500 bg-white border rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline-block">Search topics...</span>
        <div className="hidden md:flex items-center gap-1 pl-2 ml-auto text-xs text-gray-400">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 dark:bg-gray-900/80">
          <div className="min-h-screen px-4 text-center">
            <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

            <div className="inline-block w-full max-w-2xl pt-20">
              <div className="relative text-left bg-white rounded-xl shadow-2xl dark:bg-gray-800">
                {/* Search Input */}
                <div className="flex items-center p-4 border-b dark:border-gray-700">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search topics..."
                    className="w-full px-4 py-2 text-sm bg-transparent focus:outline-none dark:text-white"
                    autoFocus
                  />
                </div>

                {/* Search Results */}
                <div
                  ref={resultsContainerRef}
                  className="max-h-96 overflow-y-auto scroll-smooth"
                >
                  {results.length > 0 ? (
                    <div className="py-2">
                      {results.map((result, index) => (
                        <a
                          key={result.slug}
                          ref={setResultRef(index)}
                          href={result.slug}
                          className={`flex items-start gap-4 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            index === selectedIndex
                              ? "bg-gray-100 dark:bg-gray-700"
                              : ""
                          }`}
                        >
                          <FileText className="w-5 h-5 mt-1 text-gray-400" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              {result.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 truncate dark:text-gray-400">
                              {result.category}
                            </p>
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded dark:bg-gray-800 dark:text-gray-400">
                                {result.category}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </a>
                      ))}
                    </div>
                  ) : query ? (
                    <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
                      No results found for "{query}"
                    </div>
                  ) : (
                    <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
                      Type to start searching...
                    </div>
                  )}
                </div>

                {/* Search Footer */}
                <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-500 border-t dark:border-gray-700 dark:text-gray-400">
                  <div className="flex gap-2">
                    <span>↑↓ to navigate</span>
                    <span>↵ to select</span>
                    <span>esc to close</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocSearch;
