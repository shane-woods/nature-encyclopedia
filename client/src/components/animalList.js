import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Animal = (props) => {



  function renderFamilies() {
    Object.keys(props.animal.families).map((family) => {
      props.animal.families[family].forEach(specie => {
  
      });
    }) 
  }


  return (
    <tr>
      <td>{props.animal.commonName}</td>
      <td>{props.animal.scientificName ? props.animal.scientificName : "None"}</td>
      <td>{renderFamilies()}</td>
    </tr>
  )};
 
export default function AnimalList() {
 const [animals, setAnimals] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getAnimals() {
     const response = await fetch(`http://localhost:8000/animals/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const animals = await response.json();
     setAnimals(animals);
   }
 
   getAnimals();
 
   return;
 }, [animals.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:8000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = animals.filter((el) => el._id !== id);
   setAnimals(newRecords);
 }
 
 // This method will map out the records on the table
 function animalList() {
   return animals.map((animal) => {
     return (
       <Animal
         animal={animal}
         deleteRecord={() => deleteRecord(animal._id)}
         key={animal._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Mammal Orders of New England List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Common Name</th>
           <th>Scientific Name</th>
           <th>Families</th>
         </tr>
       </thead>
       <tbody>{animalList()}</tbody>
     </table>
   </div>
 );
}