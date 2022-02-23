import { useQuery, useMutation, useQueryClient } from "react-query";
import { Book, ServerError } from "../types/types";
import { request } from "../utils/axios-util";

const getAllBooks = (): Promise<Book[]> => request({ url: "/books" });
const removeBook = (book: Book): Promise<Book> => request({ url: `/books/${book.id}`, method: "delete" });
const editBook = (book: Book): Promise<Book> => request({ url: `/books/${book.id}`, method: "put", data: book });
const addBook = (book: Book): Promise<Book> => request({ url: '/books', method: "post", data: book });
const getBook = (id: number): Promise<Book> => request({ url: `/books/${id}` });

//-------get all books-------
export const useGetBooks = () => {
  return useQuery<Book[], ServerError>("books", getAllBooks);
};

//-------get specific books-------
export const useGetBook = (id: number) => {
  return useQuery<Book>(["book", id], () => getBook(id));
};

//-------delete book-------
export const useRemoveBook = () => {
  const queryClient = useQueryClient();

  return useMutation(removeBook, {
    onMutate: async (data) => {
      await queryClient.cancelQueries("books");
      const previousData = queryClient.getQueryData<Book[]>("books");
      queryClient.setQueryData<Book[]>("books", (prev) =>
        prev!.filter((item) => item.id !== data.id)
      );
      return { previousData };
    },
    onError: (_error, _hero, context: any) => {
      queryClient.setQueryData<Book[]>("books", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("books");
    },
  });
};

//-------edit book-------
export const useEditBook = () => {
  const queryClient = useQueryClient();

  return useMutation(editBook, {
    onMutate: async (data) => {
      await queryClient.cancelQueries("books");
      const previousData = queryClient.getQueryData<Book[]>("books");
      queryClient.setQueryData<Book[]>("books", (prev) =>
        prev!.map((item) => item.id === data.id ? data : item)
      );
      return { previousData };
    },
    onError: (_error, _hero, context: any) => {
      queryClient.setQueryData<Book[]>("books", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("books");
    },
  });
};


//-------add book-------
export const useAddBook = () => {
  const queryClient = useQueryClient();

  return useMutation(addBook, {
    onMutate: async (data) => {
      await queryClient.cancelQueries("books");
      const previousData = queryClient.getQueryData<Book[]>("books");
      queryClient.setQueryData<Book[]>("books", (prev) => prev ? [...prev, data] : []
      );
      return { previousData };
    },
    onError: (_error, _hero, context: any) => {
      queryClient.setQueryData<Book[]>("books", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("books");
    },
  });
};
