function ListFormContainer({ children }) {
  return (
    <div id="new-list" className="flex flex-col items-center sm:items-start bg-slate-700 p-6 my-5">
        { children }
    </div>
  )
}

export default ListFormContainer