import { useState, useContext} from 'react';
import { Link } from 'react-router-dom';
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

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const [pass, set] = useState('password');
  const user = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      user.updateProfile({
        displayName: username
      })
    }).catch((er)=>{
      console.log(er)
    })
  };

  console.log(user)

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1 className={classes.title}>ユーザー登録ページ</h1>
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant='standard'
        label='ユーザーネーム'
      />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant='filled'
        label='メールアドレス'
      />
      <TextField
        type={pass}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant='outlined'
        label='パスワード'
      />
      <Link to='/login'>アカウントをすでにお持ちの方</Link>
      <Button type='submit' variant='contained' color='primary'>
        登録
      </Button>
      <Button onClick={() => set(pass === 'password' ? 'text' : 'password')}>
        目
      </Button>
    </form>
  );
};

export default Signup;
