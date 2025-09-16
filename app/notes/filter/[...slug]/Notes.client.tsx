"use client";

import css from '@/app/notes/filter/[...slug]/notes.module.css';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from "@/components/NoteList/NoteList"
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

interface NotesClientProps {
  tag?: string; 
};

export default function NotesClient({tag}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const totalPages = data?.totalPages || 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />}
        {isSuccess && totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />)}
        {<button className={css.button} onClick={openModal}>Create note +</button>}
      </header>
      {data && data.notes.length > 0 && !isLoading && <NoteList notes={data.notes} />}
      {isModalOpen &&
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </ Modal>}
    </div>
  );
};