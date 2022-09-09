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
	async createUser(roomId, data) {
		const roomData = await this.getRoom(roomId);
		if (!roomData.data.users.map(x => x.id).includes(data.id)) {
			roomData.data.users.push(data);
			return axios.put(`/rooms/${roomId}`, roomData.data, {
				headers: { 'Content-Type': 'application/json' }
			})
		}
	},
	async deleteUser(roomId, userId) {
		const roomData = await this.getRoom(roomId);
		roomData.data.users = roomData.data.users.filter(x => x.id !== userId);

		return axios.put(`/rooms/${roomId}`, roomData.data, {
			headers: { 'Content-Type': 'application/json' }
		});
	},
	async createRoom(data) {
		data.id = v4();
		data.tasks = Array(0);
		data.users = Array(0);
		data.createDate = new Date();

		return axios.post(`/rooms`, data, {
			headers: { 'Content-Type': 'application/json' },
		})
	},
	async createTask(roomId, data) {
		const roomData = await this.getRoom(roomId);
		data.id = v4();

		roomData.data.tasks.push(data);
		return axios.put(`/rooms/${roomId}`, roomData.data, {
			headers: { 'Content-Type': 'application/json' },
		})
	},
	async deleteTask(roomId, taskId) {
		const roomData = await this.getRoom(roomId);
		roomData.data.tasks = roomData.data.tasks.filter(x => x.id !== taskId);
		return axios.put(`/rooms/${roomId}`, roomData.data, {
			headers: { 'Content-Type': 'application/json' },
		})
	},
	async userVoteTask(roomId, voteTaskId, userId, vote) {
		const roomData = await this.getRoom(roomId);
		roomData.data.tasks.forEach((x) => {
			if (x.id === voteTaskId) {
				const votes = x.votes.filter(x => x.userId !== userId);
				votes.push({ userId: userId, vote: vote });
				x.votes = votes;
			}
		});

		return axios.put(`/rooms/${roomId}`, roomData.data, {
			headers: { 'Content-Type': 'application/json' },
		})
	},
	async voteTask(roomId, taskId) {
		const roomData = await this.getRoom(roomId);
		if (roomData.data.voteTaskId === taskId) {
			roomData.data.voteTaskId = null
		} else {
			roomData.data.voteTaskId = taskId;
		}

		roomData.data.reveal = false;

		return axios.put(`/rooms/${roomId}`, roomData.data, {
			headers: { 'Content-Type': 'application/json' },
		})
	},
	async revealCards(roomId, voteTaskId, voteSum) {
		const roomData = await this.getRoom(roomId);
		roomData.data.reveal = !roomData.data.reveal;
		roomData.data.tasks.forEach((x) => {
			if (x.id === voteTaskId) {
				x.vote = roomData.data.reveal ? voteSum : 0;
			}
		});
		
		return axios.put(`/rooms/${roomId}`, roomData.data, {
			headers: { 'Content-Type': 'application/json' },
		})
	},
	async changeTaskVote(roomId, voteTaskId, voteSum) {
		const roomData = await this.getRoom(roomId);
		roomData.data.tasks.forEach((x) => {
			if (x.id === voteTaskId) {
				x.vote = voteSum;
			}
		});
		
		return axios.put(`/rooms/${roomId}`, roomData.data, {
			headers: { 'Content-Type': 'application/json' },
		})
	}
}