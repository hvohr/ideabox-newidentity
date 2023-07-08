import React from 'react'

function SavedIdentities(props) {
  return (
    <section className="saved-card-container">
      <h2>Name: {props.firstName} {props.lastName}</h2>
      <p>DOB: {props.birthday}</p>
      <p>Phone Number: {props.phone}</p>
      <p>Email: {props.email}</p>
      <p>Birthplace: {props.birthCity}, {props.birthCountry}</p>
      <button className='delete-button'>Delete</button>
    </section>
  )
}

export default SavedIdentities