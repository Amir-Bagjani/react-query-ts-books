import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useEditBook, useGetBook } from "../hooks/useQueryHook";
import { useNavigate } from "react-router-dom";

const BookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement>(null!);
  const { isLoading, data: book } = useGetBook(Number(id));
  const { mutate: edit } = useEditBook();

  const handleEdit = () => {
    if(book) edit({...book, name: inputRef.current.value})
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (book) inputRef.current.value = book.name;
  }, [book]);

  if (isLoading) return <p className="loading">Loading...</p>;

  return (
    <div className="detail">
      <p>Author : {book?.author.toUpperCase()}</p>
      <br />
      <input ref={inputRef} type="text" />
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default BookDetail;
