package learn.capstone.data;

import learn.capstone.models.User;
import java.util.List;

public interface UserRepository {
        List<User> findAll();
        User findById(int userId);
        User add(User user);
        boolean update(User user);
        boolean deleteById(int id);
}
