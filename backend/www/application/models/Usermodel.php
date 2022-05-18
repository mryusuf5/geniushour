<?php
class Usermodel extends CI_Model{
    public function getUsers(){
        return $this->db->query("SELECT * FROM `users`;")->result();
    }
    public function LoginUser($email, $password){
        return $this->db->query("SELECT * FROM `users` WHERE `users`.`email` = '$email' LIMIT 1")->result();
    }

    public function Login($username, $password)
    {
        return $this->db->query("SELECT * FROM students WHERE student_email = '$username' AND student_password = '$password'")->result();
    }

    public function LoginTeacher($username, $password)
    {
        return $this->db->query("SELECT * FROM teachers WHERE teacher_email = '$username' AND teacher_password = '$password'")->result();
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
}
