/** @format */

import type { Metadata } from "next";
import "../styles/global.scss";

export const metadata: Metadata = {
  // title: "PLAN-T",
  title: "Next",
  description: "가장 완벽한 여행 계획",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
