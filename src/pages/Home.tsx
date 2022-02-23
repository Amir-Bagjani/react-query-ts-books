import { useNavigate } from "react-router-dom";
import { useGetBooks, useRemoveBook } from "../hooks/useQueryHook";

const Home = () => {
  const navigate = useNavigate();
  const { data: books, isLoading } = useGetBooks();
  const { mutate: remove } = useRemoveBook();

  if (isLoading) return <p className="loading">Loading...</p>;  

  return (
    <ol>
      {books?.map(book => (
        <li className="books-li" key={book.id}>
            <span>{book.name}</span>
            <button onClick={() => navigate(`book-detail/${book.id}`)}>Detail</button>
            <button onClick={() => remove(book)}>Delete</button>
        </li>
      ))}
    </ol>
  );
};

export default Home;
