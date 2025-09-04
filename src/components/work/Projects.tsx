'use client';

import { Grid } from "@once-ui-system/core";
import Project from "./Project";
import type { Project as ProjectType } from "@/app/work/projects";

interface ProjectsProps {
  projects: ProjectType[];
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
}

export function Projects({
  projects,
  range,
  columns = "2",
  thumbnail = true,
  exclude = [],
  direction,
}: ProjectsProps) {
  // Ensure we have projects to work with
  if (!projects || projects.length === 0) {
    return null;
  }
  
  // Filter out excluded projects
  let filteredProjects = projects;
  if (exclude && exclude.length) {
    filteredProjects = projects.filter((project) => !exclude.includes(project.slug));
  }

  // Sort by publication date (newest first)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    return new Date(b.metadata.publishedAt || "").getTime() - new Date(a.metadata.publishedAt || "").getTime();
  });

  // Apply range selection if specified
  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range.length === 2 ? range[1] : sortedProjects.length)
    : sortedProjects;

  return (
    <>
      {displayedProjects.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedProjects.map((project) => (
            <Project key={project.slug} project={project} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}
