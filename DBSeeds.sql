INSERT INTO employeemgt (first_name, last_name, role_id, manager)
VALUES ("Bremah", "Bremen", 3, NULL), ("Zoey", "Trinity", 4, 1), ("Frankie", "Semp", 6, NULL), ("Babie", "Suzie", 2, NULL), ("Jackie", "Nanyo", 1, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 40000, 1), ("Sales Head", 70000, 1), ("Head Information Technology", 120000, 2), ("IT Specialist", 100000, 2), ("Lawyer", 150000, 3), ("Accountant", 160000, 4), ("Human Resource GM", 180000, 4);

INSERT INTO department (name)
VALUES ("Sales"),  ("Information Technology"), ("Finance"), ("Legal");