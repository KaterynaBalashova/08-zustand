import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '../../lib/api';
import Link from 'next/link';

interface NoteListProps {
    notes: Note[],
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const { mutate: deleteMutation } = useMutation({
        mutationFn: deleteNote,
        onSuccess(note) {
            console.log(note);
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
        onError() {
            console.log("Error deleting note!");
        },
    });

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{ note.title}</h2>
                    <p className={css.content}>{ note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <Link href={`/notes/${note.id}`}>
                            View details
                        </Link>
                        <button
                            type="button"
                            className={css.button}
                            onClick={() => deleteMutation(note.id)}>
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}