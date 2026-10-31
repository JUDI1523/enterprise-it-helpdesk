import { create } from "zustand";
import initialUsers from "../mock/users";

const useUserStore = create((set) => ({
  users: initialUsers,

  addUser: (user) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          ...user,
          id: Date.now(),
        },
      ],
    })),

  updateUser: (userId, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              ...updatedUser,
            }
          : user
      ),
    })),

  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter(
        (user) => user.id !== userId
      ),
    })),
}));

export default useUserStore;