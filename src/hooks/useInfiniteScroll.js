import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axiosAPI/axiosInstance';
import useBlogs from './useBlogs';

const useInfiniteScroll = (url, limit = 4) => {
    const { fetchBlogs } = useBlogs();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);
    const [shouldFetchBlogs, setShouldFetchBlogs] = useState(false); // Flag to trigger fetchBlogs

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axiosInstance.get(`${url}?limit=${limit}&page=${page + 1}`);
                const newItems = res.data?.blogs;
                if (newItems.length === 0) {
                    setHasMore(false);
                } else {
                    setItems(prevItems => [...prevItems, ...newItems]);
                    setPage(prevPage => prevPage + 1);
                }
            } catch (err) {
                console.error(err);
            }
        };

        const observerCallback = (entries) => {
            const loaderItem = entries[0];

            if (loaderItem.isIntersecting && hasMore) {
                fetchItems();
            }
        };

        const observer = new IntersectionObserver(observerCallback);

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [hasMore, page, url, limit]);

    // Trigger fetchBlogs after the component has re-rendered
    useEffect(() => {
        if (shouldFetchBlogs) {
            fetchBlogs(items);
            setShouldFetchBlogs(false); // Reset the flag
        }
    }, [shouldFetchBlogs, fetchBlogs, items]);

    return { items, loaderRef, hasMore, setShouldFetchBlogs };
};

export default useInfiniteScroll;
