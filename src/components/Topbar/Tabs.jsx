"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import styles from "../../style/componentStyle/tabs.module.scss";
import { getUserId } from "../../services/user";

const Tabs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const currentUserId = getUserId();

  // Debugging values
  console.log("Current User ID:", currentUserId);
  console.log("URL User ID:", userId);

  // Ensure userId is consistently passed in URLs if it exists and differs from currentUserId
  const tabsLink = useMemo(() => {
    const idParam = userId && userId !== currentUserId ? `?id=${userId}` : "";
    console.log("Constructed ID Param:", idParam);

    return [
      { label: "Profile", link: `/profile${idParam}` },
      { label: "Reviews", link: `/profile/reviews${idParam}` },
      { label: "Forum Posts", link: `/profile/forum-post${idParam}` },
      { label: "Blog Posts", link: `/profile/blog-post${idParam}` },
    ];
  }, [userId, currentUserId]);

  // Function to check active route
  const checkActiveRoute = (path) => pathname === path;

  return (
    <div className={styles.tabs}>
      <div className={styles['tab-container']}>
        {tabsLink.map((item, idx) => (
          <Link
            href={item.link}
            key={idx}
            className={`${styles['tab-link']} ${checkActiveRoute(item.link) ? styles.active : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
