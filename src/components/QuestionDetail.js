import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QuestionDetail.css';
import Header from './Header1';
import { parse, formatDistanceToNow } from 'date-fns';
import { BASE_URL } from './constants';
axios.defaults.withCredentials = true;

const QuestionDetail = () => {
  const { questionId } = useParams();

  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [submittedByName, setSubmittedByName] = useState(null);
  
  // Assuming `userId` is retrieved from somewhere (e.g., context or props)
  const userId = 'USER_ID_HERE'; // Replace this with actual user ID source

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getQuestionsbyId`, {
          params: { id: questionId },
        });

        const optionsWithId = ['A', 'B', 'C', 'D'].map((label) => ({
          text: response.data[`option${label}`],
          id: label,
          optionLabel: label,
        }));

        setQuestion({
          ...response.data,
          options: optionsWithId,
          dateSubmitted: response.data.dateTimeSubmitted,
          submittedBy: response.data.submittedBy,
        });

        if (response.data.comments) {
          fetchComments(response.data.comments);
        }

        fetchUserName(response.data.submittedBy);
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    };

    const fetchUserName = async (userId) => {
      try {
        const response = await axios.get(`${BASE_URL}/getUserDetails`, {
          params: { id: userId },
        });
        setSubmittedByName(response.data.name);
        return response.data.name;
      } catch (error) {
        console.error('Error fetching user name:', error);
        setSubmittedByName('Unknown User');
      }
    };

    const fetchComments = async (commentIds) => {
      try {
        // Fetch comments by their IDs
        const commentPromises = commentIds.map((id) =>
          axios.get(`${BASE_URL}/getCommentsbyId`, { params: { id } })
        );
        const commentResponses = await Promise.all(commentPromises);
    
        // Process each comment and fetch additional details
        const commentsWithReplies = await Promise.all(
          commentResponses.map(async (res) => {
            const commentData = res.data;
            const userName = await fetchUserName(commentData.submittedBy);
            const userHasLiked = await checkIfUserHasLiked(commentData.id);
    
            // Check if replies exist before mapping over them
            const replyPromises = (commentData.replies || []).map((replyId) =>
              axios.get(`${BASE_URL}/getCommentsbyId`, { params: { id: replyId } })
            );
            const replyResponses = await Promise.all(replyPromises);
    
            const repliesWithUserNames = await Promise.all(
              replyResponses.map(async (replyRes) => {
                const replyData = replyRes.data;
                const replyUserName = await fetchUserName(replyData.submittedBy);
                return { ...replyData, submittedBy: replyUserName };
              })
            );
    
            return {
              ...commentData,
              submittedBy: userName,
              userHasLiked,
              replies: repliesWithUserNames,
            };
          })
        );
    
        setComments(commentsWithReplies);
        console.log("Comments with replies: ", commentsWithReplies);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    
    

    const checkIfUserHasLiked = async (commentId) => {
      try {
        const response = await axios.get(`${BASE_URL}/hasLiked`, {
          params: { id: commentId },
        });
        return response.data.hasLiked;
      } catch (error) {
        console.error('Error checking if user has liked the comment:', error);
        return false;
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    try {
      const response = await axios.post(`${BASE_URL}/addComment`, null, {
        params: {
          questionId,
          text: newComment,
        },
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async (commentId, userHasLiked) => {
    try {
      const endpoint = userHasLiked
        ? `${BASE_URL}/unlikeComment`
        : `${BASE_URL}/likeComment`;

      await axios.post(endpoint, null, {
        params: { id: commentId },
      });

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likes: userHasLiked ? comment.likes - 1 : comment.likes + 1,
                userHasLiked: !userHasLiked,
              }
            : comment
        )
      );
    } catch (error) {
      console.error('Error liking/unliking comment:', error);
    }
  };

  const handleDislike = async (commentId) => {
    try {
      await axios.post(`${BASE_URL}/dislikeComment`, { id: commentId });
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, dislikes: comment.dislikes + 1 }
            : comment
        )
      );
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  const addReply = async (commentId) => {
    if (!newReply[commentId]?.trim()) return;
    try {
      const response = await axios.post(`${BASE_URL}/addReply`, null,{params:{
        commentId,
        text: newReply[commentId],
    }});
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, response.data] }
            : comment
        )
      );
      setNewReply({ ...newReply, [commentId]: '' });
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const renderComments = () => {
    return comments.map((comment) => (
      <div key={comment.id} className="comment">
        <p>{comment.text}</p>
        <p><strong>Submitted by:</strong> {comment.submittedBy}</p>
        <p><strong>Date:</strong> {formatDate(comment.dateTimeSubmitted)}</p>
        <div className="comment-actions">
          <span>{comment.likes} Likes</span>
          <button onClick={() => handleLike(comment.id, comment.userHasLiked)}>
            {comment.userHasLiked ? 'Unlike' : 'Like'}
          </button>
          <span>{comment.dislikes} Dislikes</span>
          <button onClick={() => handleDislike(comment.id)}>Dislike</button>
        </div>
  
        <div className="replies">
          {comment.replies &&
            comment.replies.map((reply) => (
              <div key={reply.id} className="reply">
                <p>{reply.text}</p>
                <p><strong>Submitted by:</strong> {reply.submittedBy}</p>
                <p><strong>Date:</strong> {formatDate(reply.dateTimeSubmitted)}</p>
                <div className="reply-actions">
                  <span>{reply.likes} Likes</span>
                  <button onClick={() => handleLike(reply.id, reply.userHasLiked)}>
                    {reply.userHasLiked ? 'Unlike' : 'Like'}
                  </button>
                  <span>{reply.dislikes} Dislikes</span>
                  <button onClick={() => handleDislike(reply.id)}>Dislike</button>
                </div>
              </div>
            ))}
          <textarea
            placeholder="Add a reply..."
            value={newReply[comment.id] || ''}
            onChange={(e) =>
              setNewReply({ ...newReply, [comment.id]: e.target.value })
            }
          />
          <button onClick={() => addReply(comment.id)}>Submit Reply</button>
        </div>
      </div>
    ));
  };
  

  const handleStartTimer = () => {
    setTimer(0);
    setTimerActive(true);
  };

  const handleOptionClick = async (option) => {
    setSelectedOption(option.id);
    const correct = option.optionLabel === question.correctAnswer;
    setIsCorrect(correct);
    setTimerActive(false);

    try {
      axios.defaults.withCredentials = true;

      const url = `${BASE_URL}/addResponse?userId=${userId}&timer=${timer}&questionId=${questionId}&response=${correct}`;

      // Send GET request with URL parameters
      await axios.get(url, { withCredentials: true });
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  const fetchAIResponse = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/AiResponseQuestionsbyId`, {
        params: { id: questionId },
      });
      setAiResponse(response.data);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse('Error fetching AI response');
    }
  };

  const formatDate = (dateString) => {
    try {
      // Parse date string, assuming input format is "dd-MMM-yyyy"
      const parsedDate = parse(dateString, 'dd-MMM-yyyy', new Date());
      if (isNaN(parsedDate)) throw new Error('Invalid Date');
  
      // Calculate relative time from now
      return formatDistanceToNow(parsedDate, { addSuffix: true });
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Invalid Date';
    }
  };

  if (!question) return <div>Loading...</div>;

  const displayQuestionText = question.questionText.endsWith('?')
    ? question.questionText
    : `${question.questionText}?`;

    return (
      <div className="question-detail-container">
        <Header />
    
        <h2>{displayQuestionText}</h2>
    
        <div className="question-info">
          <p>Submitted by: {submittedByName}</p>
          <p>Posted: {formatDate(question.dateSubmitted)}</p>
        </div>
    
        {/* Only display options if timer is active */}
        {timerActive && (
          <div className="options">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className={selectedOption === option.id ? 'selected' : ''}
                disabled={selectedOption !== null}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
    
        {isCorrect !== null && (
          <p className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </p>
        )}
    
        <button onClick={handleStartTimer}>Start Timer</button>
        <p>Timer: {timer} seconds</p>

      <div className="ai-response">
        <button onClick={fetchAIResponse}>Fetch AI Response</button>
        {aiResponse && <p>{aiResponse}</p>}
      </div>

      <div className="comments">
        <h3>Comments</h3>
        {renderComments()}
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Submit Comment</button>
      </div>
    </div>
  );
};

export default QuestionDetail;
