INSERT INTO department (name)
VALUES ("Accounting"),
    ("Administrative"),
    ("Management"),
    ("Sales"),
    ("Warehouse");
INSERT INTO role (title, salary, department_id)
VALUES ("Assistant", 36000, 2),
    ("Executive Manager", 100000, 3),
    ("Sales Manager", 60000, 3),
    ("Sales Rep", 42000, 4),
    ("Warehouse Manager", 65000, 3);
INSERT INTO `employee_db`.`employee` (`first_name`, `last_name`, `role_id`)
VALUES ('Ben', 'Wolf', '2');
INSERT INTO `employee_db`.`employee` (
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES ('Dale', 'Smith', '5', '1');
INSERT INTO `employee_db`.`employee` (
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES ('Jai', 'Herbert', '4', '4');
INSERT INTO `employee_db`.`employee` (
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES ('Michael', 'George', '3', '1');
INSERT INTO `employee_db`.`employee` (
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES ('Pam', 'Johnson', '1', '4');
INSERT INTO `employee_db`.`employee` (
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES ('Soheab', 'Khan', '4', '4');
INSERT INTO `employee_db`.`employee` (
        `first_name`,
        `last_name`,
        `role_id`,
        `manager_id`
    )
VALUES ('Dwight ', 'Howard', '4', '4');