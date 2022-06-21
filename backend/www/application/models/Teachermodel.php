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

  public function GetCurrentProjects($fieldId)
  {
      return $this->db->query("SELECT students.student_id, students.student_firstname, students.student_lastname, students.student_prefix, students.student_image, students.student_hours FROM student_projects INNER JOIN fields ON student_projects.field_id = fields.field_id INNER JOIN students ON student_projects.student_id = students.student_id INNER JOIN projects ON student_projects.project_id = projects.project_id WHERE fields.field_id = '$fieldId' GROUP BY students.student_id")->result();
  }

  public function GetCurrentStudentProjects($studentId)
  {
    return $this->db->query("SELECT * FROM student_projects INNER JOIN projects ON student_projects.project_id = projects.project_id WHERE student_projects.student_id = '$studentId' LIMIT 3")->result();
  }

  public function GetLatestProgress($studentId, $projectId)
  {
    return $this->db->query("SELECT * FROM saved_progress WHERE student_id = '$studentId' AND project_id = '$projectId' ORDER BY progress DESC LIMIT 1")->result();
  }

}
