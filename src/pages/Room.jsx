import { useState, useEffect, useContext } from "react"
import { auth, db } from "../config/firebase"
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "../context/AuthService"
import CircularProgress from '@material-ui/core/CircularProgress'
import Item from "../component/Item"


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    margin: '0 auto',
  },
  message: {
    height: "500px"
  },
  end: {
    textAlign: "end",
  }
})

const Room = () => {
  const classes = useStyles()
  const [messages, setMessages] = useState(null)
  const [value, setValue] = useState('')
  const user = useContext(AuthContext)
  useEffect(() => {
    db.collection("messages").onSnapshot((snapshot) => {
      //データの所得の処理
      const messages = snapshot.docs.map(doc => {
        return doc.data()
      })
      setMessages(messages)
    })
  }, [])
  //  [{ content: "sample content", user: "sample user" }].map(()=>{
  //   return (
  //     <li>
  //       {`${message.user} : ${message.content}`}
  //     </li>
  //   )
  // })


  const handleSubmit = (e) => {
    e.preventDefault()
    // firestoreに送信する処理
    const now = new Date()  //データオブジェクトを作成
    const time = now.getTime() //データをソートするためデータオブジェクトを数値に変換
    db.collection("messages").add({
      user: user.displayName,//kei
      content: value, //送信するメッセージの内容
      time: time //投稿した日時のデータが入っている数値型のtimeを追加
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.message}>
        <h1>チャットルーム</h1>
        <ul>
          {messages ?
            //messagesのデータがあったら
            messages.sort((a, b) => {
              if (a.time < b.time) return -1
              if (a.time > b.time) return 1
              return 0
            })
              .map((message) => (
                <Item user={message.user} content={message.content} />
              ))
            :
            <CircularProgress /> //messagesのデータがなかったら
          }
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={classes.end}>
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button type="subit">送信</button>
        </form>
        <div className={classes.end}>
          <button
            onClick={() => {
              auth.signOut()
            }}>ログアウト</button>
        </div>
      </div>
    </div>
  );
};

export default Room;
