"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function getPageTitle(pathname: string): string {
  // Remove leading and trailing slashes and split into segments
  const segments = pathname.split("/").filter(Boolean);
  
  // Handle root path
  if (segments.length === 0) return "Dashboard";
  
  // Remove route groups (segments in parentheses)
  const cleanSegments = segments.filter(segment => !segment.startsWith("(") && !segment.endsWith(")"));
  
  if (cleanSegments.length === 0) return "Dashboard";
  
  // Get the last meaningful segment
  const lastSegment = cleanSegments[cleanSegments.length - 1];
  const parentSegment = cleanSegments[cleanSegments.length - 2];
  
  // Special cases first
  if (parentSegment === "resumes" && lastSegment !== "resumes") {
    return "custom"; // Return special value to indicate we should look for custom title
  }
  
  switch (lastSegment) {
    case "profile": return "My Profile";
    case "resumes": return "My Resumes";
    case "settings": return "Settings";
    default:
      // Format the segment (capitalize first letter, replace hyphens with spaces)
      return lastSegment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
  }
}

export function PageTitle() {
  const pathname = usePathname();
  const [title, setTitle] = useState(() => getPageTitle(pathname));

  useEffect(() => {
    const baseTitle = getPageTitle(pathname);
    if (baseTitle === "custom") {
      // Look for the data attribute in the main content
      const pageTitle = document.querySelector("[data-page-title]")?.getAttribute("data-page-title");
      setTitle(pageTitle || "Resume Editor");
    } else {
      setTitle(baseTitle);
    }
  }, [pathname]);

  return (
    <h1 className="text-base font-medium">
      <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
        {title}
      </span>
    </h1>
  );
} 