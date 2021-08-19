import style from '../../styles/NewPost.module.css'

export default function NewPost(){
    return(
    <div className={style.wrapper}>
        <h1>add new post</h1>

        <form action="" className={style.form}>
            <input type="text" placeholder="title" />
            <textarea  placeholder="post" />
            <button>Public</button>
        </form>
    </div>)
}