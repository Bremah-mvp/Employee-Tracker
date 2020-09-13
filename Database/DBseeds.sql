
INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 40000, 1), ("Sales Lead", 700000, 1), ("Lead Engineer", 120000, 2), ("Software Engineer", 150000, 2), ("Accountant", 140000, 3), ("Lawyer", 200000, 4), ("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bremah", "Mvp", 3, NULL), ("Zoey", "Trinity", 4, 1), ("Babie", "Suzie", 6, NULL), ("Sylvia", "Ndagire", 2, NULL), ("Frankie", "Sempa", 1, 4);
