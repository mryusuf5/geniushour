<?php

  class Studentmodel extends CI_Model
  {
    public function GetAllStudents()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_id DESC")->result();
    }
    public function GetAllStudentsAsc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_id Asc")->result();
    }
    public function GetAllStudentsNameAsc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_firstname ASC")->result();
    }
    public function GetAllStudentsNameDesc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_firstname DESC")->result();
    }
    public function GetAllStudentsEmailAsc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_email ASC")->result();
    }
    public function GetAllStudentsEmailDesc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_email DESC")->result();
    }
    public function GetAllStudentsHoursAsc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_hours ASC")->result();
    }
    public function GetAllStudentsHoursDesc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_hours DESC")->result();
    }
    public function GetAllStudentsNumberAsc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_number ASC")->result();
    }
    public function GetAllStudentsNumberDesc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_number DESC")->result();
    }

    public function GetSingleStudent($id)
    {
      return $this->db->query("SELECT * FROM students INNER JOIN classes on students.class_id = classes.class_id WHERE student_id = '$id'")->result();
    }

    public function GetSingleStudentByValues($studentFirstname, $studentLastname, $studentNumber)
    {
      return $this->db->query("SELECT * FROM students WHERE student_firstname = '$studentFirstname' AND student_lastname = '$studentLastname' AND student_number = '$studentNumber'")->result();
    }

    public function GetAllClasses()
    {
      return $this->db->query("SELECT * FROM classes")->result();
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
  }
