import React from 'react';
import { PostType } from '../types/types';
import { Link } from 'react-router-dom';

type Props = {
  post: PostType;
};

export const PostCard = ({ post }: Props) => {
  return (
    <div className={''}>
      <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt="" />
      </Link>
    </div>
  );
};
