package com.paf.backend.repository;

import com.paf.backend.model.Comments;
import com.paf.backend.model.Posts;
import com.paf.backend.model.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentsRepository extends MongoRepository<Comments, String> {
    Comments findByIdAndPost_IdAndUser_Id(String commentId, String postId, String userId);

    List<Comments> findByPost(Posts post);

    long countByPost(Posts posts);
}
