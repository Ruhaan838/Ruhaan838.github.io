"use client";

import { Card, Column, Media, Row, Avatar, Text } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

import type { Project as ProjectType } from "@/app/work/projects";

interface ProjectProps {
  project: ProjectType;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Project({ project, thumbnail, direction }: ProjectProps) {
  return (
    <Card
      fillWidth
      key={project.slug}
      href={`/work/${project.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {/* Only show image if it's a valid URL (skip relative paths that might cause 404) */}
      {thumbnail && project.metadata.images?.[0] && 
        project.metadata.images[0].startsWith("http") && (
        <Media
          priority
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={project.metadata.images[0]}
          alt={"Thumbnail of " + project.metadata.title}
          aspectRatio="16 / 9"
        />
      )}
      <Row fillWidth>
        <Column maxWidth={28} paddingY="24" paddingX="l" gap="20" vertical="center">
          <Row gap="24" vertical="center">
            <Row vertical="center" gap="16">
              {/* Use person.avatar as fallback */}
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(project.metadata.publishedAt, false)}
            </Text>
          </Row>
          <Text variant="heading-strong-l" wrap="balance">
            {project.metadata.title}
          </Text>
          {project.metadata.tag && (
            <Text variant="label-strong-s" onBackground="neutral-weak">
              {project.metadata.tag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
