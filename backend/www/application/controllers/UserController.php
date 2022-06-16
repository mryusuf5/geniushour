<?php
class UserController extends CI_CONTROLLER{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Usermodel');
        $this->load->helper("form");

        Header('Access-Control-Allow-Origin: *');
        Header('Access-Control-Allow-Headers: *');
        Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    }

    public function LoginStudent()
    {
        $json = file_get_contents("php://input");

        $data = json_decode($json);

        $result = [];
        $user = [];

        $student = $this->Usermodel->GetStudent($data[0]);

        if(count($student) == 0)
        {
          $teacher = $this->Usermodel->GetTeacher($data[0]);
          if(count($teacher) == 0)
          {
            $result["message"] = "Email is onjuist.";
            echo json_encode($result);
          }
          else
          {
            $teacherData = json_decode(json_encode($teacher[0]), true);
            if(password_verify($data[1], $teacherData["teacher_password"]))
            {
              $user["teacher"] = $this->Usermodel->LoginTeacher($data[0]);
              echo json_encode($user);
            }
            else
            {
              $result["message"] = "Wachtwoord onjuist.";
              echo json_encode($result);
            }
          }
        }
        else if(count($student) == 1)
        {
          $studentData = json_decode(json_encode($student), true);
          if(password_verify($data[1], $studentData[0]["student_password"]))
          {
            $user["user"] = $this->Usermodel->Login($data[0]);
            echo json_encode($user);
          }
          else
          {
            $result["message"] = "Wachtwoord onjuist.";
            echo json_encode($result);
          }
        }
        else
        {
          $result["message"] = "Email is onjuist.";
          echo json_encode($result);
        }
    }


  public function ChangeProfilePicture()
  {
    $fileName = $_FILES["profilePicture"]["name"];
    $fileName = str_replace(" ", "_", $fileName);
    $fileTmpName = $_FILES["profilePicture"]["tmp_name"];

    $fileExt = explode(".", $fileName);
    $fileActualExt = strtolower(end($fileExt));

    $allowed = [
      "jpg",
      "jpeg",
      "png",
      "gif"
    ];

    if(in_array($fileActualExt, $allowed))
    {
      $profilePictureData = "https://yusufyildiz.nl/genieshour/backend/www/assets/images/" . $fileName;
      $profilePicture = "./assets/images/" . $fileName;



      if(move_uploaded_file($fileTmpName, $profilePicture))
      {
        $result = ["success" => "Profiel foto aangepast."];
        $this->Usermodel->ChangeProfilePicture($_POST["userId"], $profilePictureData);
        echo json_encode($result);
      }
      else
      {
        $result = ["error" => "Er is iets fout gegaan, probeer een andere foto typen up te loaden."];
        echo json_encode($result);
      }
    }
    else
    {
      $result = ["error" => "Probeer een andere foto te uploaden."];
      echo json_encode($result);
    }
  }

  public function GetProfileImage()
  {
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    $image = $this->Usermodel->GetProfilePicture($data);

    echo json_encode($image);
  }

  public function ChangeProfilePictureTeacher()
  {
    $fileName = $_FILES["profilePicture"]["name"];
    $fileName = str_replace(" ", "_", $fileName);
    $fileTmpName = $_FILES["profilePicture"]["tmp_name"];

    $profilePictureData = "https://yusufyildiz.nl/genieshour/backend/www/assets/images/" . $fileName;
    $profilePicture = "./assets/images/" . $fileName;

    if(move_uploaded_file($fileTmpName, $profilePicture))
    {
      $result = ["success" => "Profiel foto aangepast."];
      $this->Usermodel->ChangeProfilePictureTeacher($_POST["teacherId"], $profilePictureData);
      echo json_encode($result);
    }
    else
    {
      $result = ["error" => "Er is iets fout gegaan, probeer een andere foto typen up te loaden."];
      echo json_encode($result);
    }
  }

  public function GetProfileImageTeacher()
  {
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    $image = $this->Usermodel->GetProfilePictureTeacher($data);

    echo json_encode($image);
  }

  public function UpdateUserPassword()
  {
    $json = file_get_contents("php://input");
    $data = json_decode($json);
    $teacher = $this->Usermodel->GetTeacher($data[2]);
    $student = $this->Usermodel->GetStudent($data[2]);
    $result = [];

    if(count($teacher) == 1)
    {
      $teacherData = json_decode(json_encode($teacher), true);
      if(password_verify($data[3], $teacherData[0]["teacher_password"]))
      {
        $hashedPassword = password_hash($data[1], PASSWORD_DEFAULT);
        $this->Usermodel->UpdateUserPassword($data[0], $hashedPassword, $data[2]);
        $result["success"] = "Wachtwoord opgeslagen.";
      }
      else
      {
        $result["error"] = "De ingevulde wachtwoord komt niet overeen met uw huidige wacthwoord.";
      }
    }
    else if(count($student) == 1)
    {
      $studentData = json_decode(json_encode($student), true);
      if(password_verify($data[3], $studentData[0]["student_password"]))
      {
        $hashedPassword = password_hash($data[1], PASSWORD_DEFAULT);
        $this->Usermodel->UpdateUserPassword($data[0], $hashedPassword, $data[2]);
        $result["success"] = "Wachtwoord opgeslagen.";
      }
      else
      {
        $result["error"] = "De ingevulde wachtwoord komt niet overeen met uw huidige wacthwoord.";
      }
    }

    echo json_encode($result);
  }
}
