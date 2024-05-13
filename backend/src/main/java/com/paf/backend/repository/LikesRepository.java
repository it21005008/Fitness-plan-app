package com.paf.backend.repository;

import com.paf.backend.model.Likes;
import com.paf.backend.model.Posts;
import com.paf.backend.model.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikesRepository extends MongoRepository<Likes, String> {
    void deleteByPostAndUser(Posts post, UserInfo user);

    List<Likes> findByPost(Posts post);

    long countByPost(Posts post);

    Likes findByPostAndUser(Posts post, UserInfo user);
}
