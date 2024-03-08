import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axiosAPI/axiosInstance';

const useInfiniteScroll = (url, limit = 4) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axiosInstance.get(`${url}?limit=${limit}&page=${page + 1}`);
                const newItems = res.data?.blogs;
                if (newItems.length === 0) {
                    setHasMore(false);
                } else {
                    setItems((prevItems) => [...prevItems, ...newItems]);
                    setPage((prevPage) => prevPage + 1);
                }
            } catch (err) {
                console.error(err);
            }

            //when component is unmounted, clear the blogs
            return () => {
                setItems([]);
            };

        };

        const onIntersect = (entries) => {
            const loaderItem = entries[0];

            if (loaderItem.isIntersecting && hasMore) {
                fetchItems();
            }
        };

        const observer = new IntersectionObserver(onIntersect);

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [hasMore, page, url, limit]);

    return { items, loaderRef, hasMore };
};

export default useInfiniteScroll;
