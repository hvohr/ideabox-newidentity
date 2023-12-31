import './App.css';
import React, { useState, useEffect } from 'react'
import IdentityCard from '../IdentityCard/IdentityCard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import SavedSection from '../pages/SavedSection'
import SavedIdentities from '../SavedIdentities/SavedIdentities'

function App() {
  const [identity, setIdentity] = useState([])
  const [savedIdentity, setSavedIdentity] = useState(JSON.parse(sessionStorage.getItem("savedIdentity")) || [])
  function getIdentity() {
    fetch(`https://randomuser.me/api/`)
      .then(response => response.json())
      .then(data => setIdentity(data.results))
      .catch(error => console.log(error))
  }
  let userData = identity.map(user => <IdentityCard
    firstName={user.name.first}
    lastName={user.name.last}
    birthCity={user.location.city}
    birthCountry={user.location.country}
    phone={user.phone}
    email={user.email}
    birthday={user.dob.date}
    key={user.login.uuid}
    id={user.login.uuid}
    savedIdentity={addSavedIdentity} />
  )
  function addSavedIdentity() {
    if (!savedIdentity.includes(identity[0])) {
      setSavedIdentity([...savedIdentity, identity[0]])
    }
  }
  useEffect(() => {
    if (savedIdentity.length >= 0) sessionStorage.setItem('savedIdentity', JSON.stringify(savedIdentity))
    }, [savedIdentity])
  
  function deleteSavedIdentity(id) {
    const filteredSaved = savedIdentity.filter(person => {
      if (person.login.uuid !== id) {
        return person
      }
    })
    setSavedIdentity(filteredSaved)
  }

  let savedPerson = savedIdentity.map(prop => {
    return (<SavedIdentities
      firstName={prop.name.first}
      lastName={prop.name.last}
      birthCity={prop.location.city}
      birthCountry={prop.location.country}
      phone={prop.phone}
      email={prop.email}
      birthday={prop.dob.date}
      key={prop.login.uuid}
      id={prop.login.uuid}
      deleteIdentity={deleteSavedIdentity}
    />
    )
  })
  return (
    <BrowserRouter basename='/ideabox-newidentity'>
      <Routes>
        <Route path='/' element={<Home getIdentity={getIdentity} userData={userData}/>} />
          <Route path='/home' element={<Home getIdentity={getIdentity} userData={userData} />} />
          <Route path='/savedsection' element={<SavedSection savedIdentities = {savedIdentity} savedIdentity={savedPerson} />} />
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
