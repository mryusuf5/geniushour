<?php
class Usermodel extends CI_Model{
    public function getUsers(){
        return $this->db->query("SELECT * FROM `users`;")->result();
    }
    public function LoginUser($email, $password){
        return $this->db->query("SELECT * FROM `users` WHERE `users`.`email` = '$email' LIMIT 1")->result();
    }

    public function GetStudent($studentMail)
    {
      return $this->db->query("SELECT * FROM students WHERE student_email = '$studentMail'")->result();
    }

    public function GetTeacher($teacherMail)
    {
      return $this->db->query("SELECT * FROM teachers WHERE teacher_email = '$teacherMail'")->result();
    }

    public function Login($username)
    {
        return $this->db->query("SELECT * FROM students INNER JOIN classes ON students.class_id = classes.class_id WHERE student_email = '$username'")->result();
    }

    public function LoginTeacher($username)
    {
        return $this->db->query("SELECT * FROM teachers WHERE teacher_email = '$username'")->result();
    }

    public function ChangeProfilePicture($id, $profilePicture)
    {
      $this->db->query("UPDATE students SET student_image = '$profilePicture' WHERE student_id = '$id'");
    }

    public function GetProfilePicture($id)
    {
      return $this->db->query("SELECT student_image FROM students WHERE student_id = '$id'")->result();
    }

  public function ChangeProfilePictureTeacher($id, $profilePicture)
  {
    $this->db->query("UPDATE teachers SET teacher_image = '$profilePicture' WHERE teacher_id = '$id'");
  }

  public function GetProfilePictureTeacher($id)
  {
    return $this->db->query("SELECT teacher_image FROM teachers WHERE teacher_id = '$id'")->result();
  }

  public function UpdateUserPassword($state, $password, $id)
  {
    if($state == "student")
    {
      $this->db->query("UPDATE students SET student_password = '$password' WHERE student_email = '$id'");
    }
    else if($state = "teacher")
    {
      $this->db->query("UPDATE teachers SET teacher_password = '$password' WHERE teacher_email = '$id'");
    }
  }
}
