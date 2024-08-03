
export const PersonForm = ({addName, newName, handleAddNameChange, newNumber, handleAddNumberChange}) => {
  return (
    <>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleAddNameChange} />
        </div>
        <div>number: <input value= {newNumber} onChange={handleAddNumberChange}/></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </>
  )
}
