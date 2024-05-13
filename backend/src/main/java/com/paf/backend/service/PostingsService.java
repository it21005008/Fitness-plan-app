package com.paf.backend.service;
import com.paf.backend.model.Postings;
import com.paf.backend.repository.PostingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostingsService {

    @Autowired
    private PostingsRepository postingsRepository;
    public Postings addPosting(Postings postings) {
        List<Postings> posts = postingsRepository.findAll(Sort.by(Sort.Direction.DESC, "postId"));
        if (!posts.isEmpty()) {
            String lastFacultyId = posts.get(0).getPostId();
            String numericPart = lastFacultyId.substring(4);
            int newId = Integer.parseInt(numericPart) + 1;
            String newPostingId = String.format("PID-%03d", newId);
            postings.setPostId(newPostingId);
        } else {
            postings.setPostId("PID-001");
        }
        postings.setCreatedAt(LocalDateTime.now());
        return postingsRepository.save(postings);
    }

    public List<Postings> findAllPostings() {
        return postingsRepository.findAll();
    }

    //read one
    public Postings getPostingsBypostId(String postId) {
        return postingsRepository.findById(postId).get();
    }

    public Postings updatedPostings(Postings postingsRequest) {
        //get the existing document from DB
        // populate new value from request to existing object/entity/document
        Postings existingPostings = postingsRepository.findById(postingsRequest.getPostId()).get();
        existingPostings.setDescription(postingsRequest.getDescription());
        existingPostings.setUpdatedAt(LocalDateTime.now());

        return postingsRepository.save(existingPostings);
    }

    public String deletePostings(String postId) {
        postingsRepository.deleteById(postId);
        return postId + " Posting deleted Successfully ";
    }


    public boolean doesFacultyExist(String facultyId) {
        return postingsRepository.existsById(facultyId);
    }
}
