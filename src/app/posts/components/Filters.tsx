"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SearchParamsKeys } from "../constants";

interface Props {
  title: string | undefined;
  content: string | undefined;
}

export const Filters: FC<Props> = ({ title, content }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filteredTitle, setFilteredTitle] = useState<string>('');
  const [filteredContent, setFilteredContent] = useState<string>('');

  useEffect(() => {
    setFilteredTitle(title || '');
    setFilteredContent(content || '');
  }, [title, content]);
  
  const search = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(SearchParamsKeys.TITLE, filteredTitle);
    newSearchParams.set(SearchParamsKeys.CONTENT, filteredContent);
    newSearchParams.delete('page');
    router.push(`?${newSearchParams.toString()}`)
  }
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      search();
    }}>
      <label>
        <p>Título</p>
        <input
          type="text"
          value={filteredTitle}
          onChange={(event) => setFilteredTitle(event.target.value)} />
      </label>
      <label>
        <p>Contenido</p>
        <input
          type="text"
          value={filteredContent}
          onChange={(event) => setFilteredContent(event.target.value)} />
      </label>
      <button type="submit">🔎</button>
    </form>
  )
}
