import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAddBook } from "../hooks/useQueryHook"

const AddBook = () => {
  const navigate = useNavigate()
  const nameRef = useRef<HTMLInputElement>(null !)
  const authorRef = useRef<HTMLInputElement>(null !)

  const { mutate: add, isLoading } = useAddBook()

  const handleAdd = () => {
    const book = {name: nameRef.current.value, author: authorRef.current.value, id: Math.random()}
    add(book)
    navigate('/', {replace: true})
  }

  return (
    <div className="add">
      <input ref={nameRef} type="text" placeholder="book's name" />
      <input ref={authorRef} type="text" placeholder="author name" />
      <button onClick={handleAdd} disabled={isLoading}>{isLoading ? `Loading...` : `Add`}</button>
    </div>
  )
}

export default AddBook