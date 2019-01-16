package com.abaiyat.vchatws.io.respository;

import com.abaiyat.vchatws.io.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
