import Link from "next/link";
import css from "./Sidebar.module.css";
import { Tags } from "@/types/note";

const tags: Tags[] = ["Work","Personal","Meeting","Shopping","Todo"];

export default function SidebarNotes() {
    return (
      <ul className={css.menuList}>
        <li className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
                    <li className={css.menuItem} key={tag}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
                ))}
    </ul>

    )
};
