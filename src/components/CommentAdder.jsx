import { useState, useEffect } from "react"
import { postComment } from "../utils/api"

const CommentAdder = ({ article_id, setComments, username, setArticle}) => {
    const [newComment, setNewComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [commentAddedMessage, setCommentAddedMessage] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = (event) => {
      
        setIsSubmitting(true)
        event.preventDefault()

        if (newComment.trim() === "") {
            setError("Comment can't be empty.");
            setIsSubmitting(false);        
        }

        else {
            postComment(article_id, newComment, username)
            .then((newCommentFromAPI) => {
                setNewComment("")
                setComments((currentComments) => {
                    return [newCommentFromAPI, ...currentComments]
                })
                setArticle((currentArticle) => ({
                    ...currentArticle,
                    comment_count: currentArticle.comment_count + 1,
                  }));
                setCommentAddedMessage("Your comment has been added.")
                setIsSubmitting(false)
                setError(null)
            })
            .catch((error) => {
                console.log(error)
                setError("We can't add your comment, please try again later.")
                setIsSubmitting(false)
            })

        }
    
    }
    
  
    const handleChange = (event) => {
        setNewComment(event.target.value)
    }

    return (
        <section> 
            {error && <p>{error}</p>}
            {commentAddedMessage ? <p>{commentAddedMessage}</p>: 
            <form onSubmit={handleSubmit}>
              <input className="input-username" id="username-input" name="username" value={username} readOnly></input>
              <input className="input-comment" onChange={handleChange} value={newComment} id="comment-input" name="comment" required></input> 
              <button disabled={isSubmitting} type="submit">add</button>
            </form>
            } 
        </section>
    )
}

export default CommentAdder