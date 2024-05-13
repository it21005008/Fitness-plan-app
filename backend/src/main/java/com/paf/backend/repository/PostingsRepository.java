package com.paf.backend.repository;
import com.paf.backend.model.Postings;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface PostingsRepository extends MongoRepository<Postings, String>{
    boolean existsBypostId(String postId);
}
