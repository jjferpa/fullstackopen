
export const Filter = ({newSearch, handleNewSearchChange}) => {
  return (
    <div>
    filter shown with: <input value={newSearch} onChange={handleNewSearchChange} />
   </div>
  )
}
