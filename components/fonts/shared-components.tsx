"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FontProperties {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing: number;
  textAlign: string;
  textTransform: string;
  textDecoration: string;
  color: string;
  backgroundColor: string;
  textShadow: string;
  strokeWidth: number;
  strokeColor: string;
}

export type SectionProps = {
  fontProperties: FontProperties;
  updateProperty: (key: keyof FontProperties, value: any) => void;
};

export function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-medium text-primary mb-2">{children}</h3>;
}

export { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
