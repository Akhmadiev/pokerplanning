import axios from 'axios';
import { v4 } from 'uuid';
import Cookies from 'universal-cookie';

const API_URL = 'http://localhost:3004'

axios.defaults.baseURL = API_URL

export const QueryService = {
	async getRooms() {
		return axios.get('/rooms')
	},
	async getRoom(id) {
		return axios.get(`/rooms/${id}`)
	},
	async createUser(id, data) {
		var roomData = await this.getRoom(id);
		if (!data.id) {
			data.id = v4();
			data.createDate = new Date();
		}

		if (!roomData.data.players.map(x => x.id).includes(data.id)) {
			roomData.data.players.push(data);
			return axios.put(`/rooms/${id}`, roomData.data, {
				headers: { 'Content-Type': 'application/json' },
			})
		}
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