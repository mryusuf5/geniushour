<?php

  class Studentmodel extends CI_Model
  {
    public function GetAllStudents()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_number DESC")->result();
    }
    public function GetAllStudentsAsc()
    {
      return $this->db->query("SELECT * FROM students ORDER BY student_number Asc")->result();
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
  }
