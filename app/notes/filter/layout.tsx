import { Suspense } from "react";
import css from "./LayoutNotes.module.css";

export default function NotesLayout({
    children,
    sidebar
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
    return (
        <div className={css.container}>
            <Suspense fallback={<div>Loading categories...</div>}>
            <aside className={css.sidebar}>{sidebar}</aside>
            </Suspense>
            <div className={css.notesWrapper}>{children}</div>
        </div>
    )
};
