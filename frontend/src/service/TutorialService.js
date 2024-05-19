import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});


class TutorialService {
    async getAll() {
        try{
            const response = await http.get("/tutorials");
            return response.data;

        }catch(error){
            throw error;
        }

    }
    async get(id) {
        try {
            const response = await http.get(`/tutorials/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const response = await http.post("/tutorials", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }



    async update(id, data) {
        try {
            const response = await http.put(`/tutorials/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await http.delete(`/tutorials/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            const response = await http.delete(`/tutorials`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async findByTitle(title) {
        try {
            const response = await http.get(`/tutorials?title=${title}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async published(){
        try{
            const response = await http.get(`tutorials/published`);
            return response.data;
        }catch (error){
            throw error;
        }
    }

    async updatePublished(id){
        try{
            const response = await http.put(`/tutorials/published/${id}`);
            return response.data;
        }catch (error){
            throw error;
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TutorialService();