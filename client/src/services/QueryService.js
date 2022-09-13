import axios from 'axios';
import { v4 } from 'uuid';

const API_URL = process.env.REACT_APP_DB || 'http://localhost:3004'

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
		data.voteTotal = 0;
		data.createDate = new Date();

		return axios.post(`/rooms`, data, {
			headers: { 'Content-Type': 'application/json' },
		})
	},
	async createTask(roomId, taskValue, description) {
		const roomData = await this.getRoom(roomId);

		var task = {
			id: v4(),
			value: taskValue,
			description: description,
			vote: 0,
			votes: Array(0)
		};

		if (!roomData.data.voteTaskId) {
			roomData.data.voteTaskId = task.id;
		}

		roomData.data.tasks.push(task);
		return axios.put(`/rooms/${roomId}`, roomData.data, {
			headers: { 'Content-Type': 'application/json' },
		})
	},
	async deleteTask(roomId, taskId) {
		const roomData = await this.getRoom(roomId);

		if (roomData.data.voteTaskId === taskId) {
			roomData.data.voteTaskId = null;
		}

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
		if (!roomData.data.reveal) {
			roomData.data.reveal = true;
		}
		roomData.data.tasks.forEach((x) => {
			if (x.id === voteTaskId) {
				x.vote = voteSum;
			}
		});

		roomData.data.voteTotal = roomData.data.tasks.map(x => x.vote).reduce((a, b) => a + b, 0);
		
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