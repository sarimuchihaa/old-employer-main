"use client";
import React, { useState } from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import commentstyles from '../../../style/pageStyle/reviewStyle/ReviewDetails/comments.module.scss';
import Button from "../../../dump/Button";

const CommentCard = ({ title, Icon, onAreaChange, placeholder, rows }) => {
    const [text, setText] = useState("");

    const handleAreaChange = (e) => {
        const updatedText = e.target.value;
        setText(updatedText);
        if (onAreaChange) {
            onAreaChange(updatedText);
        }
    };

    const commentsData = [
        {
            id: 1,
            author: 'Noman Afzal',
            relation: '3rd+',
            profilePic: 'noman.jpg', // Replace with actual image path
            title: 'Fronted Developer Learner stage || HTML || CSS || JavaScript || Git || GitHub || ...',
            timeAgo: '5d',
            comment: `Bro in this era. On freelancing platforms most of the small businesses prefer WordPress or other CMS platform websites. Also in the direct client hunting people prefer WordPress it is cheap relative to custom websites. I am in the fronted developer learning stage. what's your point of view on that. If anyone have freelancing experience. Please guide me it really helpful for me.`,
            replies: [
                {
                    id: 2,
                    author: 'Syed Abdul Momin',
                    relation: 'Author',
                    profilePic: 'syed.jpg', // Replace with actual image path
                    title: 'Angular Expert | Sr. Frontend Developer | Crafting Seamless User Experiences',
                    timeAgo: '4d',
                    comment: `Noman Afzal There is definitely more work available in freelancing with WordPress or Shopify, but there are also many people in that category. That's why it's important to become an expert in this area so that you can increase your value in the freelancing market.`,
                },
                {
                    id: 3,
                    author: 'Noman Afzal',
                    relation: '3rd+',
                    profilePic: 'noman.jpg', // Replace with actual image path
                    title: 'Fronted Developer Learner stage || HTML || CSS || JavaScript || Git || GitHub || ...',
                    timeAgo: '4d',
                    comment: 'Syed Abdul Momin thanks ❤️',
                },
            ],
        },
        {
            id: 4,
            author: 'Amir Hussain',
            relation: '3rd+',
            profilePic: 'amir.jpg', // Replace with actual image path
            title: 'Furniture Salesperson at Furniture House',
            timeAgo: '5d',
            comment: 'web development services?',
        },
    ];

    return (
        <>

            <div className={styles["status-card"]}>
                <div className={styles["header"]}>
                    {Icon && (
                        <div>
                            <Icon />
                        </div>
                    )}
                    <div className={styles["sub-header"]}>
                        <p className={styles["title"]}>{title}</p>
                    </div>
                </div>
                <div className={styles.description}>
                    <textarea
                        className={styles.textarea}
                        placeholder={placeholder || "Write here..."}
                        value={text}
                        onChange={handleAreaChange}
                        rows={rows || 5}
                    />
                </div>
                <Button
                    text={"Search"}
                    classes={styles["btn-join"]}
                // onClick={handleSearch}
                />
                <div className={commentstyles.commentsSection}>
                    <input className={commentstyles.commentInput} placeholder="Add a comment..." />
                    <div className={commentstyles.filter}>Most relevant ▼</div>
                    {commentsData.map((comment) => (
                        <div className={commentstyles.comment} key={comment.id}>
                            <img src={comment.profilePic} alt={comment.author} className={commentstyles.profilePic} />
                            <div className={commentstyles.commentBody}>
                                <div className={commentstyles.commentHeader}>
                                    <strong>{comment.author}</strong> <span className={commentstyles.relation}>· {comment.relation}</span>
                                    <span className={commentstyles.timeAgo}>{comment.timeAgo}</span>
                                </div>
                                <div className={commentstyles.commentTitle}>{comment.title}</div>
                                <div className={commentstyles.commentText}>{comment.comment}</div>
                                <div className={commentstyles.commentActions}>
                                    <span>Like</span> · <span>Reply</span> · <span>{comment.replies ? comment.replies.length : 0} Replies</span>
                                </div>
                                {comment.replies && comment.replies.map((reply) => (
                                    <div className={commentstyles.reply} key={reply.id}>
                                        <img src={reply.profilePic} alt={reply.author} className={commentstyles.profilePic} />
                                        <div className={commentstyles.replyBody}>
                                            <div className={commentstyles.commentHeader}>
                                                <strong>{reply.author}</strong> <span className={commentstyles.relation}>· {reply.relation}</span>
                                                <span className={commentstyles.timeAgo}>{reply.timeAgo}</span>
                                            </div>
                                            <div className={commentstyles.commentTitle}>{reply.title}</div>
                                            <div className={commentstyles.commentText}>{reply.comment}</div>
                                            <div className={commentstyles.commentActions}>
                                                <span>Like</span> · <span>Reply</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default CommentCard;
