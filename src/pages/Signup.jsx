import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from "../config/firebase"
import { AuthContext } from "../context/AuthService"
import { useForm } from "react-hook-form"

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
  const { register, handleSubmit, errors, reset } = useForm()
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const classes = useStyles();
  const [pass, set] = useState('password');
  const user = useContext(AuthContext)
  const passReg = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  const mailReg = new RegExp("^([a-zA-Z0-9])+([a-zA-Z0-9_-])*@([a-zA-Z0-9\._-])+([a-zA-Z0-9\._-]+)+$")


  const signup = (data) => {
    auth.createUserWithEmailAndPassword(data.email, data.password).then(({ user }) => {
      user.updateProfile({
        displayName: data.username
      })
    }).catch((er) => {
      console.log(er)
    })
    reset()
  };


  return (
    <form className={classes.form} onSubmit={handleSubmit(signup)}>
      <h1 className={classes.title}>ユーザー登録ページ</h1>
      <TextField
        name="username"
        // value={username}
        // onChange={(e) => setUsername(e.target.value)}
        variant='standard'
        label='ユーザーネーム'
        inputRef={register({
          required:"名前を入力して下さい",
          minLength:{
            value:2,
            message:"名前は２文字以上入力してください"
          }
        })}
      />
      {errors.username&&errors.username.message}
      <TextField
        name="email"
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
        variant='filled'
        label='メールアドレス'
        inputRef={register({
         pattern:{
           value:　mailReg,
           message:"正しいメールアドレスを入力して下さい"
         } 
        })}
      />
        {errors.email&&errors.email.message}
      <TextField
        name="password"
        type={pass}
        inputRef={register({
          pattern:{
            value:passReg,
            message:"半角英字と半角数字それぞれ1文字以上含む6文字以上の必要があります"
          }
        })}
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        variant='outlined'
        label='パスワード'
      />
      {errors.password&&errors.password.message}
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
