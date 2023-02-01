import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Result {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  upvotes: number;
  downvotes: number;
}

const SearchThreadSchema = z.object({
  query: z.string().min(3).max(50),
});

type SearchThreadSchemaType = z.infer<typeof SearchThreadSchema>;

const SearchThreadModal = () => {
  const [results, setResults] = useState<Result[]>([]);

  const { register, handleSubmit } = useForm<SearchThreadSchemaType>({
    resolver: zodResolver(SearchThreadSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.get<Result[]>(
        `http://localhost:5000/api/thread/search/${data.query}`,
        {
          withCredentials: true,
        }
      );
      setResults(res.data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex flex-col gap-2 text-stone-300 w-[50vw] h-[50vh]">
      <form className="bg-stone-600 rounded-md flex" onSubmit={onSubmit}>
        <input
          className="bg-inherit active:outline-none focus:outline-none p-2 rounded-md flex-auto"
          type="text"
          placeholder="Wpisz frazę do wyszukania"
          {...register("query")}
        />
        <button
          className="w-10 flex items-center justify-center flex-initial"
          type="submit"
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </form>
      <div className="flex flex-col gap-2">
        {results.map((result) => (
          <p key={result.id}>{result.title}</p>
        ))}
      </div>
    </div>
  );
};

export default SearchThreadModal;
