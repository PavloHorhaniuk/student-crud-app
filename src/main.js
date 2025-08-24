import './style.css'
import { StudentManager } from "./studentManager.js";

const listEl = document.getElementById("students-list");
const formEl = document.getElementById("student-form");
const addBtn = document.getElementById("add-student-btn");
const cancelBtn = document.getElementById("cancel-add");

const manager = new StudentManager(listEl);

addBtn.addEventListener("click", () => {
  formEl.style.display = "block";
});

cancelBtn.addEventListener("click", () => {
  formEl.reset();
  formEl.style.display = "none";
});

formEl.addEventListener("submit", e => {
  e.preventDefault();
  try {
    const student = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      age: parseInt(document.getElementById("age").value, 10),
      course: document.getElementById("course").value.trim(),
      faculty: document.getElementById("faculty").value.trim(),
    };

    if (!student.firstName || !student.lastName || isNaN(student.age)) {
      throw new Error("Некоректні дані!");
    }

    manager.addStudent(student);
    formEl.reset();
    formEl.style.display = "none";
  } catch (error) {
    alert(error.message);
  }
});

listEl.addEventListener("click", e => {
  const card = e.target.closest(".student-card");
  const id = Number(card?.dataset.id);

  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Видалити картку?")) {
      manager.deleteStudent(id);
    }
  }

  if (e.target.classList.contains("edit-btn")) {
    const student = manager.dataArray.find(st => st.id === id);
    if (!student) return;

    const newFirstName = prompt("Нове ім’я:", student.firstName);
    const newLastName = prompt("Нове прізвище:", student.lastName);
    const newAge = parseInt(prompt("Новий вік:", student.age), 10);
    const newCourse = prompt("Новий курс:", student.course);
    const newFaculty = prompt("Новий факультет:", student.faculty);

    try {
      if (!newFirstName || !newLastName || isNaN(newAge)) {
        throw new Error("Некоректні дані при редагуванні!");
      }
      manager.editStudent(id, {
        firstName: newFirstName,
        lastName: newLastName,
        age: newAge,
        course: newCourse,
        faculty: newFaculty,
      });
    } catch (error) {
      alert(error.message);
    }
  }
});
