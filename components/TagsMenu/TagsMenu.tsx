"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { Tags } from "@/types/note";

const tags: Tags[] = ["Work","Personal","Meeting","Shopping","Todo"];

export default function TagsMenu() {
    const [isNotesOpen, setIsNotesOpen] = useState(false);

    const openNotes = () => setIsNotesOpen(!isNotesOpen);

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={openNotes}>
                Notes {isNotesOpen ? "▴" : "▾"}
            </button>
            {isNotesOpen && <ul className={css.menuList}>
                <li className={css.menuItem}>
                    <Link href={`/notes/filter/All`} className={css.menuLink} onClick={openNotes}>
                        All notes
                    </Link>
                </li>
                {tags.map((tag) => (
                    <li className={css.menuItem} key={tag}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={openNotes}>
                        {tag}
                    </Link>
                </li>
                ))}
            </ul>}
        </div>
    );
};
