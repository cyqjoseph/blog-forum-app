import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { useRef } from "react";
import { BlogData } from "../interfaces";
import { CommentFormData } from "../interfaces";

type CreateCommentProps = {
  blogData: BlogData | undefined;
};

function CreateComment(props: CreateCommentProps) {
  const { blogData } = props;
  const user = useTypedSelector((state: RootState) => state.user);
  const commentRef = useRef<HTMLTextAreaElement>(null);

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
        `http://localhost:3001/users/${user.id}/blogs/${blogData!.id}/comments`,
        { comment },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        window.location.reload();
        console.log(response);
        console.log("Comment created successfully");
      });
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
