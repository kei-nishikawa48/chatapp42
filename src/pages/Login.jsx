import { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from "../config/firebase"
import { AuthContext } from "../context/AuthService"
const useStyles = makeStyles({
  title: {
    color: 'red',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '400px',
    width: '350px',
    margin: '0 auto',
  },
});

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const handleSubmit = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/")
      }).catch(err => {
        console.log(err)
      })
  }
  const user = useContext(AuthContext)

  if (user) {
    return <Redirect to="/" />
  }
  return (
    <form className={classes.form}>
      <h1 className={classes.title}>ログインページ</h1>
      <TextField onChange={(e) => { setEmail(e.target.value) }} variant='filled' label='メールアドレス' />
      <TextField type="password" onChange={(e) => { setPassword(e.target.value) }} variant='outlined' label='パスワード' />
      <Link to='/signup'>アカウントを持ちでない方</Link>
      <Button onClick={handleSubmit} variant='contained' color='secondary'>
        ログイン
      </Button>
    </form>
  );
};

export default Login;
