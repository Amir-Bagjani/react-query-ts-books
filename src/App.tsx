import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddBook from "./pages/AddBook";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";

const queryClient = new QueryClient();

function AppBook() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add-book" element={<AddBook />} />
        <Route path="book-detail/:id" element={<BookDetail />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppBook />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
