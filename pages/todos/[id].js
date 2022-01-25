import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db } from "../../firebase";

const Detail = ({ todoProps }) => {
  const todo = JSON.parse(todoProps);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Card
          sx={{ minWidth: 275, boxShadow: 3 }}
          style={{ backgroundColor: "#FAFA" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {todo.title}
            </Typography>
            <Typography sx={{ nb: 1.5 }} color="text.secondary">
              {todo.description}
            </Typography>
            <Typography  color="text.secondary">
              - {todo.created}
            </Typography>
          </CardContent>
          <CardActions>
              <Link href="/">
                  <Button size="small">Back to home</Button>
              </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Detail;

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, "udemytodo")); //! get all todos from  database
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  //runs on load and retreive ids, then fetch documents, then stringify to pump into components
  const id = context.params.id;

  const docRef = doc(db, "udemytodo", id);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      todoProps: JSON.stringify(docSnap.data()) || null,
    },
  };
};
