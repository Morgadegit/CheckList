import { useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Popup from 'reactjs-popup';
import "./index.css";
import 'react-tabs/style/react-tabs.css';

function CheckListRow(item, type) {
  var links = "aucun lien renseigné";
  if (item.links && item.links[0].localeCompare(""))
    links = item.links.map(lien => {
      return <tbody><td>{lien}</td></tbody>
    })
  return (<tbody>
  <tr><td><input type="button" onClick={() => {
    fetch(`http://localhost:5000/${type}/delete/${item.name}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }}
    )
    .then(() => window.location.reload(false))
  }} value='X'></input></td>
  <td>{item.name}</td>
  <td>{links}</td>
  </tr></tbody>)
}

function CheckList(type) {
  const [data, setData] = useState([{}]);
    useEffect(() => {
      fetch(`http://localhost:5000/${type}`)
      .then(res => res.json())
      .then(data => setData(data))
    }, [type])
  return (
    <table>
      <thead>
        <tr><th>Remove</th>
        <th>Nom de l'objet</th>
        <th>Liens</th></tr>
      </thead>
      {data.map(item => CheckListRow(item, type))}
    </table>
  )
}

function PopUp(type) {
  const {register, handleSubmit} = useForm();
  const onSubmit = data => {
    fetch(`http://localhost:5000/${type}/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name, 
        links: new Array(data.link),
        checked: false
      })
    })
    .then(() => console.log("Succès"))
    .catch(err => console.log(err));
  };
  return (<div className='PopUp'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nom </label>
      <input type={'text'} {...register("name")} />
      <br/>
      <label>Lien </label>
      <input type={"text"} {...register("link")}/>
      <br/>
      <input type={'submit'}/>
    </form>
  </div>)
}

function Button(type) {
  return(
    <Popup trigger={<button className="button"> Ajouter </button>} modal>
          {PopUp(type)} 
    </Popup>
  )
}

function App() {
  return(
    <div className='CheckTable'>
    <Tabs>
      <TabList>
        <Tab>Réel</Tab>
        <Tab>Imaginaire</Tab>
      </TabList>
      <TabPanel>
        {CheckList('reel')}
        {Button('reel')}
      </TabPanel>
      <TabPanel>
        {CheckList('imaginaire')}
        {Button('imaginaire')}
      </TabPanel>
    </Tabs>
    </div>
  )
}

export default App;
