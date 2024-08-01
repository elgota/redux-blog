"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "@/app/features/posts/postsSlice";

// Navigation
import { useRouter } from "next/navigation";
import { selectAllUsers } from "@/app/features/users/usersSlice";
const EditPostForm = ({ params }) => {

    const { id: postId } = params;
    const router = useRouter();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    // console.log("Users from edit Post", users);
    // console.log("Post form posts flag", post);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState("idle");

    const dispatch = useDispatch();

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(Number(e.target.value));

    const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle";

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus("pending");
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
                router.push(`/post/${postId}`);
                //navigate(`/post/${postId}`)
                
            } catch (error) {
                console.error("Failed to save the post ", error);
            } finally {
                setRequestStatus("Idle");
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}

        >
            {user.name}
        </option>
    ))

    const onDeletePostClicked = () => {
        try {
            setRequestStatus("pending");
            dispatch(deletePost({ id: post.id })).unwrap();

            setTitle("");
            setContent("");
            setUserId("");
            router.push(`/`);

        } catch (error) {
            console.error("Failed to delete the post", error)

            
        } finally {
            setRequestStatus("idle");
        }
    }

    return (

        <section style={{ margin: "1rem"}}>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post
                </button>
                <button className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>

            </form>

        </section>

    );
};

export default EditPostForm;
