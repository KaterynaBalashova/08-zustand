"use client";

import css from './NoteForm.module.css';
import { createNote } from '../../lib/api';
import { useQueryClient, useMutation} from '@tanstack/react-query';
import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { NoteFormValues } from '@/types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';

export default function NoteForm() {
    const fieldId = useId();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            router.push("/notes/filter/All");
        },
        onError: () => {
            console.log("Faild to create note");
        },
    });

    const handleSubmit = (formData: FormData) => {
    const formValues = Object.fromEntries(formData) as NoteFormValues;
    mutate(formValues);
    };

    const handleCancel = () => router.push("/notes/filter/All");

    return (
        <form action={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input
                    id={`${fieldId}-title`}
                    type="text"
                    name="title"
                    value={draft.title}
                    className={css.input}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                <textarea
                    id={`${fieldId}-content`}
                    name="content"
                    value={draft.content}
                    rows={8}
                    className={css.textarea}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                <select
                    id={`${fieldId}-tag`}
                    name="tag"
                    value={draft.tag}
                    className={css.select}
                    onChange={handleChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                >
                    Create note
                </button>
            </div>
        </form>
    );
}