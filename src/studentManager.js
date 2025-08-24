import Handlebars from "handlebars";
import studentTemplateSrc from "./templates/template-student-data.hbs?raw";

const studentTemplate = Handlebars.compile(studentTemplateSrc);

export class StudentManager {
  constructor(listElement) {
    this.dataArray = [];
    this.dataJSON = "[]";
    this.listElement = listElement;
  }

  syncData() {
    try {
      this.dataJSON = JSON.stringify(this.dataArray);
      this.renderList();
    } catch (error) {
      alert("Помилка перетворення у JSON!");
    }
  }

  addStudent(student) {
    this.dataArray.push({ id: Date.now(), ...student });
    this.syncData();
  }

  deleteStudent(id) {
    this.dataArray = this.dataArray.filter(st => st.id !== id);
    this.syncData();
  }

  editStudent(id, newData) {
    this.dataArray = this.dataArray.map(st =>
      st.id === id ? { ...st, ...newData } : st
    );
    this.syncData();
  }

  renderList() {
    try {
      const students = JSON.parse(this.dataJSON);
      this.listElement.innerHTML = students
        .map(student => studentTemplate(student))
        .join("");
    } catch (error) {
      alert("Помилка читання JSON!");
    }
  }
}
