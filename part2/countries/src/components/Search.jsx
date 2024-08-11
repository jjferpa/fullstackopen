

export const Search = ( {newSearch, handleNewSearchChange} ) => {
  return (
    <>
    <p>find countries <input value={newSearch} onChange={handleNewSearchChange} />
    </p>
    </>
  )
}
