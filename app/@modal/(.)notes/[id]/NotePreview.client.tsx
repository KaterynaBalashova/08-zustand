"use client";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Loading from "@/app/loading";

export default function NotePreviewClient() {
    const { id } = useParams<{id: string}>();
    const router = useRouter();
    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <Loading />;
    if (error || !note) return <p>Error...</p>;
    
    return (
        <Modal onClose={() => router.back()}>
            <div className={css.wrapper}>
                <button
                    className={css.backBtn}
                    onClick={() => {
                        router.back();
                    }}
                >
                    Back
                </button>
                <div className={css.container}>
                    <div className={css.item}>
                        <div className={css.header}>
                            <h2>{note.title}</h2>
                            <p className={css.tag}>{note.tag}</p>
                        </div>
                        <p className={css.content}>{note.content}</p>
                        <p className={css.date}>{note.createdAt}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
