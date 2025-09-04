'use client';

import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import Project from "../Project";

interface ProjectsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
}

export function Projects({
  range,
  columns = "2",
  thumbnail = true,
  exclude = [],
  direction,
}: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude.length) {
    allProjects = allProjects.filter((project) => !exclude.includes(project.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

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
