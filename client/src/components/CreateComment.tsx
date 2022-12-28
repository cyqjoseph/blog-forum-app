import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { useRef } from "react";
import { BlogData } from "../interfaces";
import { CommentFormData } from "../interfaces";
import { useNavigate } from "react-router";

type CreateCommentProps = {
  blogData: BlogData | undefined;
};

function CreateComment(props: CreateCommentProps) {
  const navigate = useNavigate();
  const { blogData } = props;
  const user = useTypedSelector((state: RootState) => state.user);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  // Handler function to create a new comment
  const createCommentHandler = function (
    event: React.SyntheticEvent<HTMLFormElement>
  ): void {
    event.preventDefault();
    const commentBody = commentRef.current!.value;
    const comment: CommentFormData = {
      commenter: user.username,
      commenterId: user.id!,
      blogId: blogData!.id,
      body: commentBody,
      likes: 0,
      dislikes: 0,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/${user.id}/blogs/${
          blogData!.id
        }/comments`,
        { comment },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        navigate("/dashboard");
        // Perhaps a notif can be made to inform user that comment is created
      })
      .catch((e) => {});
  };

  return (
    <div className="container pt-2">
      <form onSubmit={createCommentHandler}>
        <div className="form-group py-1">
          <label>Write a comment</label>
          <textarea
            className="form-control py-2"
            rows={1}
            ref={commentRef}
          ></textarea>
        </div>
        <div className="py-2 ">
          <button type="submit" className="btn btn-primary btn-sm">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateComment;
