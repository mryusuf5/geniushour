<?php

  class Studentmodel extends CI_Model
  {
    public function GetAllStudents()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_id DESC")->result();
    }
    public function GetAllStudentsAsc()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_id Asc")->result();
    }
    public function GetAllStudentsNameAsc()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_firstname ASC")->result();
    }
    public function GetAllStudentsNameDesc()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_firstname DESC")->result();
    }
    public function GetAllStudentsEmailAsc()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_email ASC")->result();
    }
    public function GetAllStudentsEmailDesc()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_email DESC")->result();
    }
    public function GetAllStudentsHoursAsc()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_hours ASC")->result();
    }
    public function GetAllStudentsHoursDesc()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_hours DESC")->result();
    }
    public function GetAllStudentsNumberAsc()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_number ASC")->result();
    }
    public function GetAllStudentsNumberDesc()
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id ORDER BY student_number DESC")->result();
    }

    public function GetSingleStudent($id)
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes on students.class_id = classes.class_id WHERE student_id = '$id'")->result();
    }

    public function GetSingleStudentByValues($studentFirstname, $studentLastname, $studentNumber)
    {
      return $this->db->query("SELECT * FROM students WHERE student_firstname = '$studentFirstname' AND student_lastname = '$studentLastname' AND student_number = '$studentNumber'")->result();
    }

    public function GetAllClassesByClassName($className)
    {
      return $this->db->query("SELECT * FROM classes WHERE class_name = '$className'")->result();
    }

    public function GetAllClasses()
    {
      return $this->db->query("SELECT * FROM classes")->result();
    }
    public function GetAllClassesIdDesc()
    {
      return $this->db->query("SELECT * FROM classes ORDER BY class_id DESC")->result();
    }
    public function GetAllClassesIdAsc()
    {
      return $this->db->query("SELECT * FROM classes ORDER BY class_id ASC")->result();
    }
    public function GetAllClassesNameDesc()
    {
      return $this->db->query("SELECT * FROM classes ORDER BY class_name DESC")->result();
    }
    public function GetAllClassesNameAsc()
    {
      return $this->db->query("SELECT * FROM classes ORDER BY class_name ASC")->result();
    }
    public function GetAllClassesYearDesc()
    {
      return $this->db->query("SELECT * FROM classes ORDER BY class_year DESC")->result();
    }
    public function GetAllClassesYearAsc()
    {
      return $this->db->query("SELECT * FROM classes ORDER BY class_year ASC")->result();
    }

    public function AddClass($className, $classYear)
    {
      $this->db->query("INSERT INTO classes(class_name, class_year) VALUES('$className', '$classYear')");
    }

    public function DeleteClass($classId)
    {
      $this->db->query("DELETE FROM classes WHERE class_id = '$classId'");
    }

    public function DeleteStudentsByClass($classId)
    {
      $this->db->query("DELETE FROM students WHERE class_id = '$classId'");
    }

    public function EditStudent($id, $studentFirstName,$studentLastName, $studentPrefix, $studentEmail, $studentHours, $studentClass)
    {
      $this->db->query("UPDATE students SET student_firstname = '$studentFirstName', student_lastname = '$studentLastName', student_prefix = '$studentPrefix', student_email = '$studentEmail', student_hours = '$studentHours', class_id = '$studentClass' WHERE student_id = '$id'");
    }

    public function DeleteStudent($id)
    {
      $this->db->query("DELETE FROM students WHERE student_id = '$id'");
    }

    public function AddStudent($studentName, $studentLastname, $studentPrefix, $studentEmail, $classId, $studentHours, $studentNumber)
    {
      $this->db->query("INSERT INTO students(student_firstname, student_lastname, student_prefix, student_email, class_id, student_hours, student_number) VALUES('$studentName', '$studentLastname', '$studentPrefix', '$studentEmail', '$classId', '$studentHours', '$studentNumber')");
    }

    public function GetMessagesStudent($id)
    {
      return $this->db->query("SELECT * FROM messages INNER JOIN teachers ON messages.teacher_id = teachers.teacher_id WHERE student_id = '$id' ORDER BY id DESC")->result();
    }

    public function MarkMessageRead($id)
    {
      $this->db->query("UPDATE messages SET read_message = 1 WHERE id = '$id'");
    }

    public function MarkMessageUnread($id)
    {
      $this->db->query("UPDATE messages SET read_message = 0 WHERE id = '$id'");
    }

    public function DeleteMessage($studentId, $messageId)
    {
      $this->db->query("DELETE FROM messages WHERE student_id = '$studentId' AND id = '$messageId'");
    }

    public function GetStudentsClass($classId)
    {
      return $this->db->query("SELECT * FROM students WHERE class_id = '$classId'")->result();
    }

    public function DeleteFromClass($studentId)
    {
      $this->db->query("UPDATE students SET class_id = '0' WHERE student_id = '$studentId'");
    }

    public function GetSingleClass($classId)
    {
      return $this->db->query("SELECT * FROM classes WHERE class_id = '$classId'")->result();
    }

    public function SetStudentClass($classId, $studentId)
    {
      $this->db->query("UPDATE students SET class_id = '$classId' WHERE student_id = '$studentId'");
    }
  }
