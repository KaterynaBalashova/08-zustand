import NoteDetailsClient from "./NoteDetails.client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";

type NoteDetailsProps = {
    params: Promise<{ id: string }>
};

export async function generateMetadata({params}: NoteDetailsProps): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return {
        title: `Note: ${note.title}`,
        description: note.content,
        openGraph: {
            title: `Note: ${note.title}`,
            description: note.content,
            url: `https://08-zustand-brown.vercel.app/notes/${id}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: "NoteHub",
                }
            ],
            type: "article",
        },
    };
};

export default async function NoteDetails({ params }: NoteDetailsProps) {
    const queryClient = new QueryClient();
    const { id } = await params;
    
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    }
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
            </HydrationBoundary>
    )
};