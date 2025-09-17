import NotesClient from "./Notes.client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Tags } from "@/types/note";
import { Metadata } from "next";

interface AppProps {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({params}: AppProps): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug[0];

    return {
        title: `${tag} notes`,
        description: `Notes with ${tag} tags`,
        openGraph: {
            title: `${tag} notes`,
            description: `Notes with ${tag} tags`,
            url: `https://08-zustand-brown.vercel.app//notes/filter/${tag}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: "NoteHub",
                }
            ],
            type: "website",
        },
    };
};

export default async function App({params}: AppProps) {
    const queryClient = new QueryClient();
    const { slug } = await params;
    const tag: Tags | string | undefined = slug[0] === "All" ? undefined : slug[0];
    

    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1],
        queryFn: () => fetchNotes("", 1, tag),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={ tag} />
        </HydrationBoundary>
    );
};