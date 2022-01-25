import {
  Alert,
  Avatar,
  Container,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { TodoContext } from "../TodoContext";
import Loading from "../components/Loading";
import Login from "../components/Login";
import { useAuth } from "../Auth";
import { auth, db } from "../firebase";
import { Box } from "@mui/system";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { verifyIdToken } from "../firebaseAdmin";
import nookies from "nookies";

export default function Home({todoProps}) {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [todo, setTodo] = useState({ title: "", description: "", created: "" });
  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMessage(msg);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <TodoContext.Provider value={{ showAlert, todo, setTodo }}>
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={3}>
          <IconButton onClick={() => auth.signOut()}>
            <Avatar src={currentUser.photoURL} />
          </IconButton>
          <Typography variant="h5">{currentUser.displayName}</Typography>
        </Box>
        <TodoForm />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList todoProps={todoProps} />
      </Container>
    </TodoContext.Provider>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await verifyIdToken(cookies.token);
    const { email } = token;
    const collectionRef = collection(db, "udemytodo");
    const q = query(
      collectionRef,
      where("email", "==", email),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    let todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data().timestamp.toDate().getTime()
      });
    });
    return {
      props: {
        todoProps: JSON.stringify(todos) || [],
      }
    };
  } catch (error) {
    return { props: {} };
  }
}
