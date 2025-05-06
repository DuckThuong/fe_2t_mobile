interface User {
  id: number;
  informationId: number | null;
  userName: string | null;
  phoneNumber: string;
  email: string;
  isAdmin: boolean;
  userRank: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useUser = (): User | null => {
  const getUserFromStorage = (): User | null => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return null;
      return JSON.parse(userData) as User;
    } catch (error) {
      console.error("Error getting user from localStorage:", error);
      return null;
    }
  };

  return getUserFromStorage();
};
