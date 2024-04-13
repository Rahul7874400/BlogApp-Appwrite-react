import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


function Post(){
    const[post , setPosts] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams

    const userData = useSelector( (state)=> state.auth.userData )

   

    useEffect( ()=>{
        if(slug){
            databaseService.getPost()
            .then( (post)=>{
                if(post){
                    setPosts(post)
                }else{
                    navigate("/")
                }
            } )
        }else{
            navigate("/")
        }
    },[slug , navigate , ] )

    const isAuthor  = post && userData ? userData.$id === post.userId : false

    const deletePost =  ()=>{
        databaseService.deletePost(slug)
        .then( (status)=>{
            if(status){
                databaseService.deleteFile(post.featuredImage)
                navigate("/")
            }
        } )
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">

                    <img 
                    src= {databaseService.getFilePreview(post.featuredImage)} 
                    alt= {post.title}
                    className="rounded-xl"
                    />

                    {isAuthor  && (
                        <div className="absolute right-6 top-6">
                            <Link to={`edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>

                            <Button onClick = {deletePost} className="bg-red-500">
                                Delete
                            </Button>

                        </div>
                    )}

               <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>

                </div>
            </Container>
        </div>
    ) : null
}

export default Post