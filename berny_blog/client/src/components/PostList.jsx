import PostListItem from "./PostListItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  console.log(searchParamsObj);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  // Show loading state
  if (isFetching && !isFetchingNextPage) return <div>Loading...</div>;

  // Show error state
  if (error) return <div>Something went wrong: {error.message}</div>;

  // Safely extract posts with fallback
  const allPosts = data?.pages?.flatMap((page) => page?.posts || []) || [];

  // Handle case where no posts are returned
  if (allPosts.length === 0 && !isFetching) {
    return <div>No posts found.</div>;
  }

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => {
        // Add safety check for each post
        if (!post || !post._id) {
          console.warn('Invalid post data:', post);
          return null; // Skip rendering invalid posts
        }
        
        return <PostListItem key={post._id} post={post} />;
      })}
    </InfiniteScroll>
  );
};

export default PostList;