import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loadPosts } from '../reducers/post';
import { loadMyInfo } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(loadMyInfo());
  }, []);

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  useEffect(() => {
    function onScroll() {
      const sum = window.scrollY + document.documentElement.clientHeight;
      const scrollPos = document.documentElement.scrollHeight;
      if (scrollPos - sum < 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch(loadPosts());
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts && !loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
