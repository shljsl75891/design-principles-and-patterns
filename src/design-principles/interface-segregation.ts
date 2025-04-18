interface Post {
  title: string;
  content: string;
}

interface Comment {
  author: string;
  text: string;
}

interface PostCreator {
  createPost(post: Post): void;
}

interface CommentCreator {
  createComment(comment: Comment): void;
}

interface PostSharer {
  sharePost(post: Post): void;
}

interface User {
  name: string;
}

class AdminUser implements User, PostCreator, CommentCreator, PostSharer {
  constructor(public name: string = "Admin") {}

  createComment(_comment: Comment): void {
    console.log("Creating a comment on a post");
  }
  sharePost(_post: Post): void {
    console.log("Sharing the post");
  }
  createPost(_post: Post): void {
    console.log("Creating a post");
  }
}

class RegularUser implements User, CommentCreator, PostSharer {
  constructor(public name: string = "User") {}
  createComment(_comment: Comment): void {
    console.log("Creating a comment on a post");
  }
  sharePost(_post: Post): void {
    console.log("Sharing the post");
  }
}

const admin = new AdminUser();
const user = new RegularUser();

// write all accessible methods for both above users
admin.createPost({ title: "Title", content: "Content" });
admin.createComment({ author: "Author", text: "Text" });
admin.sharePost({ title: "Title", content: "Content" });

user.createComment({ author: "Author", text: "Text" });
user.sharePost({ title: "Title", content: "Content" });
