import axios from "axios";
import { Note, Tags } from "../types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study";
axios.defaults.headers.common["Authorization"] = `Bearer ${myKey}`;

interface NoteHttpRespond {
    notes: Note[],
    totalPages: number,
};

export interface CreateNewNote {
    title: string,
    content: string,
    tag?: string | undefined,
};

export const fetchNotes = async (searchQuery: string, currentPage: number, tag?: Tags | string): Promise<NoteHttpRespond> => {
    const response = await axios.get<NoteHttpRespond>("/api/notes",
        {
            params: {
                search: searchQuery,
                page: currentPage,
                perPage: 12,
                tag,
            },
        }
    );
    
    return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
    const response = await axios.get<Note>(`/api/notes/${noteId}`);
    return response.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
    const response = await axios.delete<Note>(`/api/notes/${noteId}`);
    return response.data;
};

export const createNote = async (newTask: CreateNewNote): Promise<Note> => {
    const res = await axios.post<Note>("/api/notes/", newTask);
  return res.data;
};