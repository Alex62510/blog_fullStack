export interface FormData {
  profilePicture?: string;
  username: string;
  email: string;
  password: string;
}

export type PostType = {
  category: string;
  content: string;
  createdAt: string;
  image: string;
  slug: string;
  title: string;
  updatedAt: string;
  userId: string;
  __v: string;
  _id: string;
};
