"use client"
import {useState, useEffect} from 'react'
import { supabase } from './client'
export default function Home() {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({title:"", content:""})
  const {title, content} = post //Destrucutring

  useEffect(()=>{
    fetchPosts()
  },[])

  async function fetchPosts(){
    const {data} = await supabase.from("posts").select()
    setPosts(data)
  }

  async function createPost(){
    await supabase.from("posts").insert([
      {title, content}
    ]).single()

    setPost({title:"", content:""})
    fetchPosts()
  }
  console.log(posts)

  return (
   <div>
    <input value={title} onChange={(e)=>setPost({...post, title:e.target.value})} placeholder="Title" />
    <input value={content} onChange={(e)=>setPost({...post, content:e.target.value})} placeholder="Content" />
    <button onClick={createPost}>Create Post</button>
    {
      posts.map(post => (
        <div key={post.id}>
          <h1>Posts</h1>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))
    }
   </div>
  )
}


//In order to read or write data to the database, we need to change the RLS policy for the table. Tou wo UI sae easily ho jata hae. 











