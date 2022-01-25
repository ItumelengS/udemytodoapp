import { TextFieldsOutlined } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../Auth";

import { db } from "../firebase";
import { TodoContext } from "../TodoContext";

const TodoForm = () => {
    const inputAreaRef = useRef()
    const { currentUser } = useAuth();
    const {showAlert, todo, setTodo} = useContext(TodoContext);
    const onSubmit = async () => {
        if(todo?.hasOwnProperty('timestamp')){
            const docRef = doc(db, "udemytodo", todo.id);
            const todoUpdated = {...todo, timestamp: serverTimestamp()}
            updateDoc(docRef, todoUpdated)
            setTodo({title:'', description:'', created:''})
            showAlert('info',`Todo with id ${todo.id} updated successfully`)

        } else {
            const collectionRef = collection(db, "udemytodo")
            const docRef = await addDoc(collectionRef, {...todo,email:currentUser.email, timestamp: serverTimestamp()})
            setTodo({title:'',description:'', created:''})
            showAlert('success',`Todo with id ${docRef.id} was added successfully`)
        }
        
    } 
    useEffect(()=>{
        const checkIfClickedOutside = e => {
            if(!inputAreaRef.current.contains(e.target)){
                console.log('Outside of input area');
                setTodo({title:'', description:'', created:''})
            } else {
                console.log('Inside input area');
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    },[])
    
    return (
        <div ref={inputAreaRef}>
            <TextField fullWidth label="title" margin="normal"
            value={todo.title}
            onChange={e=>setTodo({...todo,title:e.target.value})}
            />
            <TextField fullWidth label="description" multiline maxRows={4}
            value={todo.description}
            onChange={e=>setTodo({...todo,description:e.target.value})}
            />
            <TextField fullWidth label="created" margin="normal"
            value={todo.created}
            onChange={e=>setTodo({...todo,created:e.target.value})}
            />
            <Button variant="contained" sm={{mt: 3}} onClick={onSubmit}>{todo.hasOwnProperty('timestamp')?'Update todo':'Add a new todo'}</Button>
        </div>
    );
}

export default TodoForm