import axios from "axios";

const dbUrl = "http://localhost:3001/persons";

const getAllData = () => {
  return axios.get(dbUrl);
};
const addNewPerson = (newPerson) => {
  return axios.post(dbUrl, newPerson);
};
const deletePerson = (id) => {
  return axios.delete(`${dbUrl}/${id}`);
};
const editPerson = (id, number) => {
  return axios.patch(`${dbUrl}/${id}`, { number: number });
};

export default { getAllData: getAllData, addNewPerson: addNewPerson, deletePerson: deletePerson, editPerson: editPerson };
