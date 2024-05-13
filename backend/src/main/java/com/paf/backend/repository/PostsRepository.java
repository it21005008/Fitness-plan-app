package com.paf.backend.repository;
import com.paf.backend.model.Posts;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PostsRepository extends MongoRepository<Posts, String> {
    //    boolean existByid(String id);
    List<Posts> findByCreatedBy_Id(String id);
}
