import { Link, useLoaderData, Outlet, Form } from "remix";
import { getPosts } from "../post";
import type { Post } from "../post";
import adminStyles from "../styles/admin.css";

import type { ActionFunction } from "remix";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = () => {
  return getPosts();
}

// export async function action ({ request }) => {
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);


  if (_action === "edit") {
    // TODO send some post identifier /edit and fill fields
  }
  if (_action === "delete") {
    // TODO DELETE
    return 
  }
  return null;
}
export default function Admin() {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map(post => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>
                {post.title}
              </Link>
              {" "}
              <Form 
                style={{ display: "inline",}}
                method="post"
              >
                <input 
                  type="hidden" 
                  name="slug" 
                  value={post.slug}
                />
                <input 
                  type="hidden" 
                  name="title" 
                  value={post.title}
                />
                <input 
                  type="hidden" 
                  name="markdown" 
                  value={post.markdown}
                />
                <button 
                  type="submit" 
                  aria-label="edit"
                  name="_action"
                  value="edit"
                >
                  📝
                </button>
              </Form>
              {" "}
              <Form 
                style={{ display: "inline",}}
                method="post"
              >
                <input 
                  type="hidden" 
                  name="slug" 
                  value={post.slug}
                />
                <button 
                  type="submit" 
                  aria-label="delete"
                  name="_action"
                  value="delete"
                >
                  ❌
                </button>
              </Form>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}