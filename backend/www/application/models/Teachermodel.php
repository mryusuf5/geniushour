<?php

class Teachermodel extends CI_Model
{
  public function GetAllTeachers()
  {
    return $this->db->query("SELECT * FROM `teachers` INNER JOIN fields ON teachers.field_id = fields.field_id ORDER BY teacher_id DESC")->result();
  }
  public function GetAllTeachersAsc()
  {
    return $this->db->query("SELECT * FROM `teachers` INNER JOIN fields ON teachers.field_id = fields.field_id ORDER BY teacher_id ASC")->result();
  }
  public function GetAllTeachersNameAsc()
  {
    return $this->db->query("SELECT * FROM `teachers` INNER JOIN fields ON teachers.field_id = fields.field_id ORDER BY teacher_firstname ASC")->result();
  }
  public function GetAllTeachersNameDesc()
  {
    return $this->db->query("SELECT * FROM `teachers` INNER JOIN fields ON teachers.field_id = fields.field_id ORDER BY teacher_firstname DESC")->result();
  }
  public function GetAllTeachersEmailAsc()
  {
    return $this->db->query("SELECT * FROM `teachers` INNER JOIN fields ON teachers.field_id = fields.field_id ORDER BY teacher_email ASC")->result();
  }
  public function GetAllTeachersEmailDesc()
  {
    return $this->db->query("SELECT * FROM `teachers` INNER JOIN fields ON teachers.field_id = fields.field_id ORDER BY teacher_email DESC")->result();
  }
  public function GetAllTeachersFieldAsc()
  {
    return $this->db->query("SELECT * FROM `teachers` INNER JOIN fields ON teachers.field_id = fields.field_id ORDER BY field_name ASC")->result();
  }
  public function GetAllTeachersFieldDesc()
  {
    return $this->db->query("SELECT * FROM `teachers` INNER JOIN fields ON teachers.field_id = fields.field_id ORDER BY field_name DESC")->result();
  }

  public function GetSingleTeacher($id)
  {
    return $this->db->query("SELECT * FROM teachers WHERE teacher_id = '$id'")->result();
  }

  public function GetSingleTeacherByValues($teacherFirstName, $teacherLastname, $teacherEmail)
  {
    return $this->db->query("SELECT * FROM teachers WHERE teacher_firstname = '$teacherFirstName' AND teacher_lastname = '$teacherLastname' AND teacher_email = '$teacherEmail'")->result();
  }

  public function GetSingleTeacherByMail($teacherEmail)
  {
    return $this->db->query("SELECT * FROM teachers WHERE teacher_email = '$teacherEmail'")->result();
  }

  public function EditTeacher($id, $TeacherFirstName, $TeacherLastName, $TeacherPrefix, $TeacherEmail)
  {
    $this->db->query("UPDATE teachers SET teacher_firstname = '$TeacherFirstName', teacher_lastname = '$TeacherLastName', teacher_prefix = '$TeacherPrefix', teacher_email = '$TeacherEmail' WHERE teacher_id = '$id'");
  }

  public function DeleteTeacher($id)
  {
    $this->db->query("DELETE FROM teachers WHERE teacher_id = '$id'");
  }

  public function AddTeacher($teacherName, $teacherLastname, $teacherPassword, $teacherPrefix, $teacherEmail, $fieldId)
  {
    $this->db->query("INSERT INTO teachers(teacher_firstname, teacher_lastname, teacher_password, teacher_prefix, teacher_email, field_id) VALUES('$teacherName', '$teacherLastname', '$teacherPassword', '$teacherPrefix', '$teacherEmail', '$fieldId')");
  }

}
