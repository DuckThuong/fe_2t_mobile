import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:3300",
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface LoginResponse {
  token: string;
  user: any;
}

// export const login = async (PhoneNumber: string, Password: string) => {
//   try {
//     const response = await authApi.post<LoginResponse>("/user/log-in", {
//       PhoneNumber,
//       Password,
//     });
//     if (response.data.token) {
//       localStorage.setItem("accessToken", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       return response.data;
//     } else {
//       throw new Error("No token in response");
//     }
//   } catch (error) {
//     console.error("Login failed:", error);
//     throw error;
//   }
// };
export const login = async (phone: string, password: string) => {
  try {
    const response = await authApi.post<LoginResponse>("/user/log-in", {
      PhoneNumber: phone,
      Password: password,
    });

    console.log("✅ Login API response:", response.data); // Thêm dòng này để kiểm tra

    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        console.warn("⚠️ Không có trường user trong response");
      }

      return response.data;
    } else {
      throw new Error("Không nhận được token từ API.");
    }
  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error);
    throw error;
  }
};


export default authApi;

export const getProfile = () => {
  return authApi.get("/user/profile");
};