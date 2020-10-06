import Head from 'next/head'
import axios from 'axios'
import React from 'react'

import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'


function Home({data}){
  
  const [tasks,setTasks] = React.useState(data)
  const [task, setTask] = React.useState('')


  const handleSubmit = async () => {
    if (task.trim().length !== 0) {
        const temp = await axios.post('http://localhost:3000/api/tasks',{description : task})
        setTasks([...tasks, temp.data])
        setTask('')
    }
  }


  
  return (
    <Grid xs={12} sm={5} style={{ margin: "auto" }} item>
      <Head>Next-Mongo</Head>

      <h1>P0ST-L1st</h1>
      <form className="addTask">
        <TextField color="secondary" multiline rowsMax={5} variant="outlined" size="small"
          onChange={e => setTask(e.target.value)} value={task} style={{ width: "60%" }} placeholder="Text..."/>
        <Button color="secondary" startIcon={<AddIcon />} onClick={e => handleSubmit()}>
          POST
        </Button>
      </form>
      
      <List>
      {tasks.map((task,index) => 
      <>
        <ListItem dense button  key={task._id}>
            <ListItemText >
               {index+1}. {task.description}
            </ListItemText>
        </ListItem>
        <hr />
        </>)}
      </List>
    </Grid>
  )
}

export async function getServerSideProps() {

  const res = await axios.get('http://localhost:3000/api/tasks')
  const data = await res.data

  return {
    props: {
      data
    }
  }

}

export default Home