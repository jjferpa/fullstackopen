

export const Notification = ({message}) => {
  
  if(message === null){
    return null
  } else if (message.type === 'error'){
    
    return (
        <div className="error">
            {message.text}
        </div>
    )
  } else {

    return (
        <div className="success">
            {message.text}
        </div>
      ) 
  }


}
