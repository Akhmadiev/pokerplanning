import axios from 'axios';
import { v4 } from 'uuid';

const API_URL = 'http://localhost:3004'

axios.defaults.baseURL = API_URL

export const QueryService = {
	async getRooms() {
		return axios.get('/rooms')
	},
	async getRoom(id) {
		return axios.get(`/rooms/${id}`)
	},
	async createPlayer(id, data) {
		data.id = v4();
		data.createDate = new Date();

		var roomData = await this.getRoom(id);
		roomData.data.players.push(data);
		return axios.put(`/rooms/${id}`, roomData.data, {
			headers: { 'Content-Type': 'application/json' },
		})
	},
	async createRoom(data) {
		data.id = v4();
		data.tasks = Array(0);
		data.players = Array(0);
		data.createDate = new Date();

		return axios.post(`/rooms`, data, {
			headers: { 'Content-Type': 'application/json' },
		})
	}
}