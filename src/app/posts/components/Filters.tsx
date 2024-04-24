"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SearchParamsKeys } from "../constants";
import Link from "next/link";

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
    <div>
      <h2 className='inline text-xl mr-80'>Filtrar por:</h2>
      {(title || content) && <Link className="text-gray-500 underline" href="/posts">Reiniciar</Link>}
      <form onSubmit={(event) => {
        event.preventDefault();
        search();
      }}
        className="flex gap-4 w-full max-w-xl p-4 bg-gray-200 rounded-lg shadow-md items-end justify-center"
      >
        <label>
          <p>Título</p>
          <input
            className="px-2"
            type="text"
            value={filteredTitle}
            onChange={(event) => setFilteredTitle(event.target.value)} />
        </label>
        <label>
          <p>Contenido</p>
          <input
            className="px-2"
            type="text"
            value={filteredContent}
            onChange={(event) => setFilteredContent(event.target.value)} />
        </label>
        <button className="h-8" type="submit">🔎</button>
      </form>
    </div>
  )
}
