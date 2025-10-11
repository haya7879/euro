"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCitiesGridProps {
  children: ReactNode;
}

export default function AnimatedCitiesGrid({
  children,
}: AnimatedCitiesGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          contain: "layout style paint",
          contentVisibility: "auto",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: 0.08,
          delayChildren: 0.15,
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function AnimatedCityCard({ children }: { children: ReactNode }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        variants={cardVariants}
        style={{
          contain: "layout style paint",
          willChange: "transform, opacity",
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween",
        }}
        whileHover={{
          y: -3,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        }}
        whileTap={{
          scale: 0.99,
          transition: {
            duration: 0.1,
          },
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

// Courses List Animation Components
export function AnimatedCoursesList({ children }: { children: ReactNode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="flex flex-col gap-4"
        style={{
          contain: "layout style paint",
          contentVisibility: "auto",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: 0.1,
          delayChildren: 0.1,
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function AnimatedCourseCard({ children }: { children: ReactNode }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        variants={cardVariants}
        style={{
          contain: "layout style paint",
          willChange: "transform, opacity",
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween",
        }}
        whileHover={{
          y: -4,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        }}
        whileTap={{
          scale: 0.98,
          transition: {
            duration: 0.1,
          },
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

// Categories Animation Components
export function AnimatedCategoriesGrid({ children }: { children: ReactNode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="grid gap-4 p-5"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          contain: "layout style paint",
          contentVisibility: "auto",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: 0.08,
          delayChildren: 0.1,
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function AnimatedCategoryCard({ children }: { children: ReactNode }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        variants={cardVariants}
        style={{
          contain: "layout style paint",
          willChange: "transform, opacity",
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        whileHover={{
          y: -5,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
