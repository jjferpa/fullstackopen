

export const Person = ({persons, filteredPersons}) => {
    
    return (
        filteredPersons.map((person) =>
            <p key={person.name}>{person.name} {person.number}</p>)
    )
}

