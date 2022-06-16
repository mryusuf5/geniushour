<?php

class TeacherController extends CI_Controller
{
  public function __construct()
  {
    Parent::__construct();
    $this->load->model("Teachermodel");

    Header("Access-Control-Allow-Origin: *");
    Header('Access-Control-Allow-Headers: *');
    Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
  }

  public function GetAllTeachers()
  {
    $Teachers = $this->Teachermodel->GetAllTeachers();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersAsc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersAsc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersNameAsc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersNameAsc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersNameDesc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersNameDesc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersEmailAsc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersEmailAsc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersEmailDesc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersEmailDesc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersFieldAsc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersFieldAsc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersFieldDesc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersFieldDesc();

    echo json_encode($Teachers);
  }

  public function GetSingleTeacher()
  {
    $json = file_get_contents("php://input");
    $id = json_decode($json);

//      var_dump($id);
    $Teacher = $this->Teachermodel->GetSingleTeacher($id);

    echo json_encode($Teacher);
  }

  public function EditTeacher()
  {
    $json = file_get_contents("php://input");
    $data = json_decode($json);

//      var_dump($data);
    if(!empty($data[0]) && !empty($data[1]) && !empty($data[2]) && !empty($data[4]))
    {
      $this->Teachermodel->EditTeacher($data[0], $data[1], $data[2], $data[3], $data[4]);
    }
    else
    {
      $result = ["error" => "Vul alle velden in a.u.b. (voorvoegsel hoeft niet ingevult te worden)"];
      echo json_encode($result);
    }
  }

  public function DeleteTeacher()
  {
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    $this->Teachermodel->DeleteTeacher($data);
  }

  public function AddTeacher()
  {
    $json = file_get_contents("php://input");
    $data = json_decode($json);
    $teacherExists = $this->Teachermodel->GetSingleTeacherByValues($data[0], $data[1], $data[3]);
    $teacherExists2 = $this->Teachermodel->GetSingleTeacherByMail($data[3]);

    if(!empty($data[0]) && !empty($data[1]) && !empty($data[3]) && !empty($data[4]))
    {
      if(count($teacherExists) == 0 && count($teacherExists2) == 0)
      {
        $randomPass = $this->randomString(8);
        $hashedPassword = password_hash($randomPass, PASSWORD_DEFAULT);
        $result["success"] = "success";
        $this->SendMail($data[3], $randomPass);
        $this->Teachermodel->AddTeacher($data[0], $data[1], $hashedPassword, $data[2], $data[3], $data[4]);
        echo json_encode($result);
      }
      else
      {
        $result["error"] = "Deze leraar bestaat al.";
        echo json_encode($result);
      }
    }
    else
    {
      $result["error"] = "Vul alle velden in a.u.b.";
      echo json_encode($result);
    }
  }

  public function randomString($string = 8)
  {
    return substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), 10, $string);
  }

  public function SendMail($userEmail, $randomPass)
  {
    $this->load->library("email");

    $config = array();
    $config['smtp_host'] = 'smtp.transip.email';
    $config['smtp_user'] = 'genuishour@yusufyildiz.nl';
    $config['smtp_pass'] = 'MRyusuf12304560.';
    $config['smtp_port'] = 465;
    $config["mailtype"] = "html";
    $this->email->initialize($config);
    $this->email->set_newline("\r\n");

    $this->email->from("genuishour@yusufyildiz.nl");
    $this->email->to($userEmail);
    $this->email->subject("Welkom bij genuishour!");
    $this->email->message(
      "<html><body>Uw wachtwoord is" . " <b>" .$randomPass . "</b></body></html>"
    );
    $this->email->send();
  }
}
