import axios from "axios";
import { toast } from "react-toastify";

class Http {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        Accept: "application/json",
      },
    });
  }

  setAccessToken(token) {
    this.setHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  setHeaders(headers) {
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      ...headers,
    };
  }

  async get(url, config = {}) {
    try {
      const response = await this.instance.get(url, {
        ...config,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await this.instance.post(url, data, {
        ...config,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await this.instance.put(url, data, {
        ...config,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch(url, data = {}, config = {}) {
    try {
      const response = await this.instance.patch(url, data, {
        ...config,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await this.instance.delete(url, {
        ...config,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      toast.error(error.response.data)
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
      return error.response.data;
    } else if (error.request) {
      toast.error(error.request)
      console.error("Request Error:", error.request);
      return "No response received from the server.";
    } else {
      toast.error(error.message)
      console.error("General Error:", error.message);
      return "An error occurred while setting up the request.";
    }
  }
}

const http = new Http(process.env.NEXT_PUBLIC_SERVER_BASE_URL);
export default http;
